import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { mastra } from "@/lib/mastra";
import { ExerciseSchema } from "@/types/exercise";
import { readEnginesForPage } from "../filesystem/engine-code-reader";
import { getPageEngines } from "../filesystem/engine-extractor";
import { searchDefinitionsByStructure, readDefinitionByPage, type ParsedDefinition } from "../filesystem/definition-reader";
import { buildArtifactGenerationPromptV2 } from "../prompts/artifact-generation-template-v2";

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
  suggestedEngine: z.string().nullable().optional().describe("Nombre del engine sugerido (debe existir en available_engines)"),
  confidence: z.number().min(0).max(1).describe("Confianza en que el ejercicio necesita artefacto visual"),
  reasoning: z.string().optional().describe("Razón por la que se genera o no el artefacto"),
  patternUsed: z.string().nullable().optional().describe("Tipo de patrón usado de los ejemplos similares"),
  adaptations: z.array(z.string()).optional().describe("Lista de adaptaciones realizadas respecto a los ejemplos"),
});

export const generateArtifactDefinitionToolV2 = createTool({
  id: "generate-artifact-definition",
  description: "Genera una definición de artefacto interactivo (defBoards y rDef) usando engines reales del filesystem y definitions reales del capítulo. Solo genera artefacto si el ejercicio requiere visualización gráfica.",
  inputSchema: z.object({
    exerciseJson: z.string().describe("JSON del ejercicio para el cual generar la definición de artefacto"),
    bookId: z.string().optional().describe("Book ID para obtener engines y definitions reales"),
    chapterId: z.string().optional().describe("Chapter ID para obtener engines y definitions reales"),
    pageId: z.string().optional().describe("Page ID para obtener engines específicos de la página"),
    ragOptions: z.object({
      topK: z.number().default(5).describe("Número de definiciones similares a buscar"),
      minSimilarity: z.number().default(0.3).describe("Similitud mínima estructural para considerar una definición"),
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
    const { exerciseJson, bookId, chapterId, pageId, ragOptions } = context;
    const topK = ragOptions?.topK ?? 5;
    const minSimilarity = ragOptions?.minSimilarity ?? 0.3;

    try {
      // Parse exercise JSON
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
        console.warn("[generate-artifact-definition-v2] Primary JSON.parse failed. Applying normalization. Sample:", sample);
        const normalized = normalizeJson(exerciseJson || "");
        exerciseData = JSON.parse(normalized);
      }
      const exercise = ExerciseSchema.parse(exerciseData);

      // ===== FASE 1: OBTENER ENGINES REALES Y DEFINITIONS =====
      
      let availableEngines: Array<import("../filesystem/engine-code-reader").EngineCode> = [];
      let similarDefinitions: ParsedDefinition[] = [];
      let effectiveChapterId = chapterId || exercise.metadata?.chapterId;

      if (bookId && effectiveChapterId && pageId) {
        // Get engines for specific page (chapter-specific + genericEngines only)
        const normalizedChapterId = effectiveChapterId.replace(/^.+_/, "");
        availableEngines = await readEnginesForPage(bookId, normalizedChapterId, pageId);
        
        // Search for similar definitions in the chapter
        // First, read the current page definition to use as target structure
        const targetDefinition = await readDefinitionByPage(bookId, normalizedChapterId, pageId);
        if (targetDefinition) {
          const searchResults = await searchDefinitionsByStructure(
            bookId,
            normalizedChapterId,
            targetDefinition
          );
          similarDefinitions = searchResults
            .filter((r) => r.similarity >= minSimilarity)
            .slice(0, topK)
            .map((r) => r.definition);
        }
      } else if (bookId && effectiveChapterId) {
        // Get engines for chapter (fallback)
        const normalizedChapterId = effectiveChapterId.replace(/^.+_/, "");
        const pageEngines = await getPageEngines(bookId, normalizedChapterId, `pag_1`); // Use first page as sample
        if (pageEngines) {
          const { readEnginesForPage: readEngines } = await import("../filesystem/engine-code-reader");
          availableEngines = await readEngines(bookId, normalizedChapterId, pageEngines.pageId);
        }

        // Search for similar definitions in chapter
        // Create a minimal target structure from exercise
        const targetStructure: ParsedDefinition = {
          defBoards: {},
          rDef: {},
          rawContent: "",
          filePath: "",
        };
        const searchResults = await searchDefinitionsByStructure(
          bookId,
          normalizedChapterId,
          targetStructure
        );
        similarDefinitions = searchResults
          .filter((r) => r.similarity >= minSimilarity)
          .slice(0, topK)
          .map((r) => r.definition);
      }

      // ===== FASE 2: GENERACIÓN CON PROMPT ENRIQUECIDO =====
      
      const agent = mastra.getAgent("artifactGenerationAgent");
      const enhancedPrompt = buildArtifactGenerationPromptV2(exercise, {
        availableEngines,
        similarDefinitions,
        chapterContext: effectiveChapterId || "unknown",
      });

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

      let parsed: any;
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.warn("[generate-artifact-definition-v2] Primary JSON.parse (LLM output) failed. Applying normalization.");
        const normalized = normalizeJson(jsonMatch[0]);
        parsed = JSON.parse(normalized);
      }

      // ===== FASE 3: VALIDACIÓN Y REPARACIÓN =====
      
      // Validate that suggested engine exists in available engines
      if (parsed.suggestedEngine && availableEngines.length > 0) {
        const engineExists = availableEngines.some(
          (e) => e.name === parsed.suggestedEngine || e.name.toLowerCase() === parsed.suggestedEngine.toLowerCase()
        );
        
        if (!engineExists) {
          // Try to find closest match
          const closestEngine = availableEngines.find((e) =>
            e.name.toLowerCase().includes(parsed.suggestedEngine.toLowerCase()) ||
            parsed.suggestedEngine.toLowerCase().includes(e.name.toLowerCase())
          );
          
          if (closestEngine) {
            parsed.suggestedEngine = closestEngine.name;
            parsed.reasoning = `${parsed.reasoning || ""} [Engine ajustado a: ${closestEngine.name}]`;
          } else {
            // If no match, use null
            parsed.suggestedEngine = null;
            parsed.confidence = Math.min(parsed.confidence || 0.5, 0.5);
          }
        }
      }

      // Repair structure (ensure legacy compatibility)
      const repairDefinition = (def: any): any => {
        if (!def || typeof def !== "object") return def;

        def.defBoards = def.defBoards || {};
        def.defBoards.board_1 = def.defBoards.board_1 || {};
        def.defBoards.board_1.style = def.defBoards.board_1.style || {
          boundingbox: [-10, 10, 10, -10],
          axis: true,
          grid: true,
        };

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

      const validated = ArtifactDefinitionSchema.parse(repairedParsed);

      // Add uiHints
      try {
        if (validated?.definition && (validated.definition.defBoards || validated.definition.rDef)) {
          (validated as any).uiHints = { openCanvas: true };
        }
      } catch {}

      return validated;
    } catch (error) {
      console.error("Error in generate-artifact-definition-v2 tool:", error);
      
      // Return empty definition with low confidence
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



