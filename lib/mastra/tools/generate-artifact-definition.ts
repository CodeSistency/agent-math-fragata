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
  }),
  suggestedEngine: z.string().nullable().optional().describe("ID del engine sugerido para renderizar"),
  confidence: z.number().min(0).max(1).describe("Confianza en que el ejercicio necesita artefacto visual"),
  reasoning: z.string().optional().describe("Razón por la que se genera o no el artefacto"),
  patternUsed: z.string().optional().describe("Tipo de patrón usado de los ejemplos similares"),
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
  outputSchema: ArtifactDefinitionSchema,
  execute: async ({ context }) => {
    const { exerciseJson, ragOptions } = context;
    const topK = ragOptions?.topK ?? 5;
    const minSimilarity = ragOptions?.minSimilarity ?? 0.7;
    const includePatterns = ragOptions?.includePatterns ?? true;

    try {
      // Parse exercise JSON
      const exerciseData = JSON.parse(exerciseJson);
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

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      const parsed = JSON.parse(jsonMatch[0]);
      const validated = ArtifactDefinitionSchema.parse(parsed);

      // ===== FASE 3: POST-PROCESAMIENTO =====
      
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

