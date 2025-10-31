import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { mastra } from "@/lib/mastra";
import { ExerciseSchema } from "@/types/exercise";
import { querySimilarExercises } from "@/lib/rag/vector-store";
import { discoverEngines, discoverAllEngines } from "@/lib/books/engine-discovery";
import { buildSemanticQuery, inferEngineTags, findClosestEngine } from "@/lib/rag/rag-helpers";
import { extractCommonPatterns } from "@/lib/rag/pattern-extraction";
import { buildArtifactGenerationPrompt, type RAGContext } from "@/lib/mastra/prompts/artifact-generation-template";
import { getCachedRAGContext, setCachedRAGContext, buildQuerySignature } from "@/lib/rag/context-cache";

const ArtifactDefinitionSchema = z.object({
  definition: z.object({
    defBoards: z.record(z.string(), z.any()).describe("Definición de boards/tablas gráficas"),
    rDef: z.record(z.string(), z.any()).describe("Definición reactiva con datos del ejercicio"),
    artifacts: z
      .object({
        artifact_1: z
          .object({
            board: z.string(),
            statementBottom: z.string().default(""),
            conditions: z
              .array(
                z.object({
                  compare: z.string(),
                  with: z.string(),
                  tolerance: z.number().optional(),
                })
              )
              .default([]),
          })
          .optional(),
      })
      .partial()
      .optional(),
  }),
  suggestedEngine: z.string().nullable().optional().describe("ID del engine sugerido para renderizar"),
  confidence: z.number().min(0).max(1).describe("Confianza en que el ejercicio necesita artefacto visual"),
  reasoning: z.string().optional().describe("Razón por la que se genera o no el artefacto"),
  patternUsed: z.string().nullable().optional().describe("Tipo de patrón usado de los ejemplos similares"),
  adaptations: z.array(z.string()).optional().describe("Lista de adaptaciones realizadas respecto a los ejemplos"),
});

export const generateArtifactDefinitionTool = createTool({
  id: "generate-artifact-definition",
  description: "Genera una definición de artefacto interactivo (defBoards y rDef) usando RAG para aprender de ejemplos similares. Solo genera artefacto si el ejercicio requiere visualización gráfica.",
  inputSchema: z.object({
    exerciseJson: z.string().describe("JSON del ejercicio para el cual generar la definición de artefacto"),
    ragOptions: z.object({
      topK: z.number().default(5).describe("Número de ejemplos similares a buscar"),
      minSimilarity: z.number().default(0.7).describe("Similitud mínima para considerar un ejemplo"),
      includePatterns: z.boolean().default(true).describe("Si incluir extracción de patrones comunes"),
    }).optional(),
  }),
  outputSchema: ArtifactDefinitionSchema.extend({
    uiHints: z
      .object({
        openCanvas: z.boolean().default(true),
        width: z.number().int().min(240).max(1600).optional(),
      })
      .optional(),
  }),
  execute: async ({ context }) => {
    const { exerciseJson, ragOptions } = context;
    const topK = ragOptions?.topK ?? 5;
    const minSimilarity = ragOptions?.minSimilarity ?? 0.7;
    const includePatterns = ragOptions?.includePatterns ?? true;

    try {
      // Parse exercise JSON (tolerante a True/False, comillas simples y claves sin comillas)
      const normalizeJson = (s: string) =>
        (s || "")
          .replace(/\bTrue\b/g, "true")
          .replace(/\bFalse\b/g, "false")
          .replace(/(['"])??([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
          .replace(/'/g, '"');

      let exerciseData: any;
      try {
        exerciseData = JSON.parse(exerciseJson);
      } catch (e) {
        const sample = (exerciseJson || "").slice(0, 160);
        console.warn("[generate-artifact-definition] Primary JSON.parse failed. Applying normalization. Sample:", sample);
        const normalized = normalizeJson(exerciseJson || "");
        console.debug("[generate-artifact-definition] Normalized JSON length:", normalized.length);
        exerciseData = JSON.parse(normalized);
      }
      const exercise = ExerciseSchema.parse(exerciseData);

      // ===== FASE 1: RAG RETRIEVAL =====
      
      // Construir query semántica
      const queryText = buildSemanticQuery(exercise);
      const querySignature = buildQuerySignature(exercise);
      
      // Verificar caché primero
      let ragContext: RAGContext | undefined = getCachedRAGContext(querySignature)?.context;
      
      if (!ragContext) {
        // Buscar ejercicios similares con artefactos
        const similarExercises = await querySimilarExercises(queryText, {
          topK: topK * 2, // Buscar más para filtrar después
          tema: exercise.tema,
          bookId: exercise.metadata?.bookId,
          hasArtifact: true, // Filtrar solo ejercicios con artefacto
        });

        // Filtrar por similitud y existencia de artefacto
        const exercisesWithArtifacts = similarExercises
          .filter(
            (r) =>
              r.exercise.metadata?.artifactDefinition &&
              (r.score || 0) >= minSimilarity
          )
          .slice(0, topK)
          .map((r) => ({
            tema: r.exercise.tema,
            subtema: r.exercise.subtema,
            defBoards: r.exercise.metadata!.artifactDefinition!.defBoards,
            rDef: r.exercise.metadata!.artifactDefinition!.rDef,
            engine: r.exercise.metadata!.suggestedEngine,
            similarity: r.score || 0,
          }));

        // Descubrir engines disponibles
        let availableEngines: Array<{ id: string; name: string; description?: string }> = [];
        if (exercise.metadata?.bookId) {
          const discoveredEngines = exercise.metadata.chapterId
            ? await discoverEngines(
                exercise.metadata.bookId,
                exercise.metadata.chapterId
              )
            : await discoverAllEngines(exercise.metadata.bookId);
          
          availableEngines = discoveredEngines.map((e) => ({
            id: e.id,
            name: e.name,
            description: e.description,
          }));
        }

        // Extraer patrones comunes
        const commonPatterns = includePatterns && exercisesWithArtifacts.length > 0
          ? extractCommonPatterns(exercisesWithArtifacts)
          : {};

        // Construir contexto RAG
        ragContext = {
          similarArtifacts: exercisesWithArtifacts,
          availableEngines: availableEngines.map((e) => ({
            id: e.id,
            name: e.name,
            description: e.description,
            tags: inferEngineTags(e.name, e.description || ""),
          })),
          commonPatterns,
        };

        // Guardar en caché
        setCachedRAGContext(querySignature, ragContext);
      }

      // ===== FASE 2: GENERACIÓN CON PROMPT ENRIQUECIDO =====
      
      const agent = mastra.getAgent("artifactGenerationAgent");
      const enhancedPrompt = buildArtifactGenerationPrompt(exercise, ragContext);

      const result = await agent.generate(enhancedPrompt, {
        format: "mastra",
      });

      // Extract text from result
      const text = result.text || "";

      // Extract JSON from response (con normalización tolerante)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      const normalizeOutJson = (s: string) =>
        (s || "")
          .replace(/\bTrue\b/g, "true")
          .replace(/\bFalse\b/g, "false")
          .replace(/(['"])??([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
          .replace(/'/g, '"');

      let parsed: any;
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.warn("[generate-artifact-definition] Primary JSON.parse (LLM output) failed. Applying normalization.");
        const normalized = normalizeOutJson(jsonMatch[0]);
        parsed = JSON.parse(normalized);
      }

      // ===== FASE 3: REPARACIÓN DE ESTRUCTURA LEGACY =====
      const repairDefinition = (def: any): any => {
        if (!def || typeof def !== "object") return def;

        // Asegurar defBoards.board_1.style
        def.defBoards = def.defBoards || {};
        def.defBoards.board_1 = def.defBoards.board_1 || {};
        def.defBoards.board_1.style = def.defBoards.board_1.style || {
          boundingbox: [-10, 10, 10, -10],
          axis: true,
          grid: true,
        };

        // Mapear esquemas no legacy -> legacy rDef
        if (def.defBoards.elements || def.defBoards.functiongraph) {
          // Intentar extraer curvas/líneas simples a rDef
          const elements = def.defBoards.elements || {};
          // Curva definida por función: samplear puntos no es posible aquí sin función; eliminar y dejar hint vacío
          if (elements.curve && !def.rDef?.curvePoints) {
            // No podemos ejecutar funciones; preferimos datos. Omitimos.
          }
          // Líneas horizontales/verticales
          if (elements.horizontalLine && !def.rDef?.hLineY) {
            const y = elements.horizontalLine.y || elements.horizontalLine.value;
            if (typeof y === "number") {
              def.rDef = { ...(def.rDef || {}), hLineY: y };
            }
          }
          if (elements.verticalLine && !def.rDef?.vLineX) {
            const x = elements.verticalLine.x || elements.verticalLine.value;
            if (typeof x === "number") {
              def.rDef = { ...(def.rDef || {}), vLineX: x };
            }
          }
          // Eliminar claves no legacy
          delete def.defBoards.elements;
          delete def.defBoards.functiongraph;
        }

        // Asegurar artifacts.artifact_1
        def.artifacts = def.artifacts || {};
        if (!def.artifacts.artifact_1) {
          def.artifacts.artifact_1 = {
            board: "board_1",
            statementBottom: "",
            conditions: [],
          };
        }

        return def;
      };

      const repairedParsed = {
        ...parsed,
        definition: repairDefinition(parsed.definition),
      };

      // Validación de esquema legacy y avisos
      const validateAgainstEngine = (def: any): string[] => {
        const errors: string[] = [];
        if (!def?.defBoards?.board_1?.style) {
          errors.push("defBoards.board_1.style ausente");
        } else {
          const s = def.defBoards.board_1.style;
          if (!Array.isArray(s.boundingbox) || s.boundingbox.length !== 4) {
            errors.push("style.boundingbox inválido");
          }
          if (typeof s.axis !== "boolean") errors.push("style.axis debe ser booleano");
          if (typeof s.grid !== "boolean") errors.push("style.grid debe ser booleano");
        }
        if (!def?.artifacts?.artifact_1) {
          errors.push("artifacts.artifact_1 ausente");
        }
        // rDef: no funciones
        const hasFunction = JSON.stringify(def.rDef || {}).includes("function (") || JSON.stringify(def.rDef || {}).includes("=>");
        if (hasFunction) errors.push("rDef contiene funciones/código");
        return errors;
      };

      const validationWarnings = validateAgainstEngine(repairedParsed.definition);
      if (validationWarnings.length) {
        console.warn("[generate-artifact-definition] Legacy validation warnings:", validationWarnings);
      }

      const validated = ArtifactDefinitionSchema.parse(repairedParsed);

      // Añadir uiHints para abrir el canvas cuando hay definición válida
      try {
        if (validated?.definition && (validated.definition.defBoards || validated.definition.rDef)) {
          (validated as any).uiHints = { openCanvas: true };
        }
      } catch {}

      // Telemetría resumida
      try {
        console.log("[generate-artifact-definition] Summary", {
          querySignature,
          similarExamples: ragContext.similarArtifacts?.length || 0,
          engines: ragContext.availableEngines?.length || 0,
          hadValidationWarnings: validationWarnings.length > 0,
          suggestedEngine: validated.suggestedEngine,
          confidence: validated.confidence,
          defBoardsKeys: Object.keys(validated.definition.defBoards || {}).slice(0, 5),
          rDefKeys: Object.keys(validated.definition.rDef || {}).slice(0, 8),
          hasArtifact_1: !!validated.definition.artifacts?.artifact_1,
        });
      } catch {}

      // ===== FASE 4: POST-PROCESAMIENTO =====
      
      // Validar que el engine sugerido existe
      if (validated.suggestedEngine && ragContext.availableEngines.length > 0) {
        const engineExists = ragContext.availableEngines.some(
          (e) => e.id === validated.suggestedEngine
        );
        
        if (!engineExists) {
          // Buscar el engine más cercano
          const closestEngine = findClosestEngine(
            validated.suggestedEngine,
            ragContext.availableEngines.map((e) => ({
              id: e.id,
              name: e.name,
              description: e.description || "",
            }))
          );
          
          if (closestEngine) {
            validated.suggestedEngine = closestEngine;
            validated.reasoning = `${validated.reasoning || ""} [Engine ajustado a: ${closestEngine}]`;
          } else {
            // Si no hay match, usar null
            validated.suggestedEngine = null;
            validated.confidence = Math.min(validated.confidence, 0.5);
          }
        }
      }

      return validated;
    } catch (error) {
      // Log error pero retornar fallback
      console.error("Error in generate-artifact-definition tool:", error);
      
      // If generation fails, return empty definition with low confidence
      return {
        definition: {
          defBoards: {},
          rDef: {},
        },
        suggestedEngine: null,
        confidence: 0,
        reasoning: `Error al generar artefacto: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
});

