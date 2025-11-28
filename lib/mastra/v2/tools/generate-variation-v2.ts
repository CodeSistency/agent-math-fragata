import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { mastra } from "@/lib/mastra";
import { ExerciseSchema, type Exercise } from "@/types/exercise";
import { readDefinitionByPage } from "../filesystem/definition-reader";
import { generateArtifactDefinitionToolV2 } from "./generate-artifact-definition-v2";
import { extractViewConfig } from "../filesystem/view-config-extractor";
import { getPageEngines } from "../filesystem/engine-extractor";

export const generateVariationToolV2 = createTool({
  id: "generate-variation",
  description: "Genera una variación de un ejercicio matemático o definición de artefacto manteniendo la misma estructura pero cambiando valores numéricos. Acepta tanto ejercicios completos (Exercise) como definiciones de artefactos (defBoards + artifacts). Usa definitions reales del filesystem como contexto si se proporciona pageId.",
  inputSchema: z.object({
    definitionJson: z.string().optional().describe("JSON de definición (defBoards + artifacts/rDef) del libro. Usa esto cuando tengas solo la definición del archivo .js sin Exercise completo."),
    exerciseJson: z.string().optional().describe("JSON del ejercicio base a variar (Exercise completo con tema, enunciado, etc.). Usa esto cuando venga de RAG o sistema v1."),
    includeArtifact: z.boolean().optional().default(false).describe("Si es true, también genera la definición de artefacto para visualización interactiva"),
    grounding: z.array(z.object({
      enunciado: z.string().optional(),
      solucion: z.string().optional(),
      metadata: z.record(z.string(), z.any()).optional(),
    })).optional().describe("Contexto recuperado por RAG para guiar la variación"),
    bookId: z.string().optional().describe("Book ID para obtener contexto del filesystem"),
    chapterId: z.string().optional().describe("Chapter ID para obtener contexto del filesystem"),
    pageId: z.string().optional().describe("Page ID para obtener definition real como contexto"),
  }).refine(
    (data) => data.definitionJson || data.exerciseJson,
    { message: "Debe proporcionar definitionJson O exerciseJson (al menos uno)" }
  ),
  outputSchema: z.object({
    exercise: ExerciseSchema.optional().describe("Ejercicio completo (solo si se proporcionó exerciseJson o si se generó desde definitionJson)"),
    definition: z.object({
      defBoards: z.record(z.string(), z.any()),
      artifacts: z.record(z.string(), z.any()).optional(),
      rDef: z.record(z.string(), z.any()).optional(),
    }).optional().describe("Definición variada (solo si se proporcionó definitionJson)"),
    artifactDefinition: z.object({
      defBoards: z.record(z.string(), z.any()),
      rDef: z.record(z.string(), z.any()),
    }).optional(),
    suggestedEngine: z.string().nullable().optional(),
    uiHints: z
      .object({
        openCanvas: z.boolean().default(true),
        width: z.number().int().min(240).max(1600).optional(),
      })
      .optional(),
  }),
  execute: async ({ context }) => {
    const { definitionJson, exerciseJson, includeArtifact, grounding, bookId, chapterId, pageId } = context as {
      definitionJson?: string;
      exerciseJson?: string;
      includeArtifact?: boolean;
      grounding?: Array<{ enunciado?: string; solucion?: string; metadata?: Record<string, any> }>;
      bookId?: string;
      chapterId?: string;
      pageId?: string;
    };

    try {
      // Normalizador: tolera JSON con True/False, claves sin comillas y comillas simples
      const normalizeJson = (s: string) => {
        let out = (s || "");
        // Fix Python booleans and unquoted keys/single quotes
        out = out
          .replace(/\bTrue\b/g, "true")
          .replace(/\bFalse\b/g, "false")
          .replace(/(['"])??([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
          .replace(/'/g, '"');
        // Normalize smart quotes to plain quotes
        out = out
          .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
          .replace(/[\u2018\u2019\u201A\u201B]/g, '"');
        // Remove JS/JSON5 comments
        out = out.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/.*$/gm, '');
        // Remove trailing commas before } or ]
        out = out.replace(/,\s*([}\]])/g, '$1');
        // Escape stray backslashes (e.g., LaTeX \\( ... \\))
        out = out.replace(/\\\\/g, "__BSLASH_DBL__");
        out = out.replace(/\\/g, "\\\\");
        out = out.replace(/__BSLASH_DBL__/g, "\\\\");
        return out;
      };

      // Detectar tipo de input: Definition o Exercise
      const inputJson = definitionJson || exerciseJson || "";
      let parsedInput: any;
      try {
        parsedInput = JSON.parse(inputJson);
      } catch (e) {
        try {
          parsedInput = JSON.parse(normalizeJson(inputJson));
        } catch (e2) {
          throw new Error(`Invalid JSON input: ${e2 instanceof Error ? e2.message : String(e2)}`);
        }
      }

      // Detectar si es Definition (tiene defBoards o artifacts) o Exercise (tiene tema y enunciado)
      const isDefinition = !!(parsedInput.defBoards || parsedInput.artifacts || parsedInput.rDef);
      const isExercise = !!(parsedInput.tema && parsedInput.enunciado);

      // If pageId is provided, read real definition as filesystem context
      let filesystemContext: string = "";
      if (bookId && chapterId && pageId) {
        try {
          const normalizedChapterId = chapterId.replace(/^.+_/, "");
          const definition = await readDefinitionByPage(bookId, normalizedChapterId, pageId);
          
          if (definition) {
            filesystemContext = `\n\nEjemplo real del sistema (${bookId}/${chapterId}/${pageId}):\n` +
              `defBoards: ${JSON.stringify(definition.defBoards, null, 2).substring(0, 1000)}...\n` +
              (definition.rDef ? `rDef: ${JSON.stringify(definition.rDef, null, 2).substring(0, 500)}...\n` : "") +
              (definition.artifacts ? `artifacts: ${JSON.stringify(definition.artifacts, null, 2).substring(0, 500)}...\n` : "");
          }
        } catch (error) {
          console.warn("[generate-variation-v2] Could not read definition for context:", error);
        }
      }

      const agent = mastra.getAgent("variationGenerationAgent");
      const groundingSnippet = Array.isArray(grounding) && grounding.length
        ? `\nContexto recuperado (grounding):\n${grounding.map((g, i) => `- [${i + 1}] ${g.enunciado ?? ""}`).join("\n")}\n`
        : "";

      let validated: Exercise | undefined;
      let definitionVariation: { defBoards: Record<string, any>; artifacts?: Record<string, any>; rDef?: Record<string, any> } | undefined;
      let artifactDefinition: { defBoards: Record<string, any>; rDef: Record<string, any> } | undefined;
      let suggestedEngine: string | null | undefined;
      let viewConfig: any = null;

      if (isDefinition) {
        // Caso 1: Generar variación de Definition directamente
        const prompt = `Eres un experto generando variaciones de definiciones de artefactos matemáticos.

CRÍTICO: La variación DEBE mantener la estructura EXACTA de la definición original. Solo cambia valores numéricos, NO la estructura.

REGLAS ESTRICTAS:
1. MANTÉN TODOS los campos y claves de la estructura original
2. MANTÉN el mismo formato de datos (arrays, objetos, strings, números)
3. MANTÉN las mismas claves en defBoards (ej: artifact_1, artifact_2, etc.)
4. MANTÉN las mismas claves en rDef/artifacts (ej: artifacts.artifact_1, etc.)
5. MANTÉN la misma estructura de conditions (valRepre, valInterval, board, etc.)
6. SOLO cambia valores numéricos dentro de los campos existentes
7. NO agregues campos nuevos que no existan en el original
8. NO elimines campos que existan en el original
9. NO cambies el tipo de dato de ningún campo

CAMPOS QUE PUEDES VARIAR (solo valores numéricos/textuales dentro de ellos):
- conditions.compare.values: cambia los números pero mantén el formato
- interval: cambia los rangos pero mantén el formato de string (ej: "[2,3]" -> "[5,7]")
- representation: cambia los valores pero mantén el formato de string
- preDefPar: cambia las coordenadas pero mantén el formato de array
- preDefPoint: cambia las coordenadas pero mantén el formato de array
- conditions.valRepre: cambia los valores pero mantén el formato de array de strings
- conditions.valInterval: cambia los valores pero mantén el formato de array de strings
- conditions.board: cambia los valores en pares/points pero mantén la estructura

Definición original:
${JSON.stringify(parsedInput, null, 2)}
${filesystemContext}

IMPORTANTE: 
- La respuesta DEBE ser un JSON válido con la MISMA estructura que el original
- Todos los campos del original DEBEN estar presentes en la variación
- Solo cambia los valores numéricos/textuales, NO la estructura
- Verifica que cada clave del original existe en tu respuesta

Responde SOLO con un JSON válido de la definición variada (mismo formato exacto: defBoards, artifacts/rDef, sin campos artificiales como tema, dificultad, enunciado, solucion).`;

        const result = await agent.generate(prompt, { format: "mastra" });
        const text = (result as any).text || "";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON found in response");
        
        let parsedDefinition: any;
        try {
          parsedDefinition = JSON.parse(jsonMatch[0]);
        } catch (e) {
          const normalized = normalizeJson(jsonMatch[0]);
          try {
            parsedDefinition = JSON.parse(normalized);
          } catch (e2) {
            const cleaned = normalized.replace(/[\u0000-\u001F\u007F]/g, "");
            parsedDefinition = JSON.parse(cleaned);
          }
        }

        // VALIDACIÓN: Verificar que la estructura se mantiene
        const originalKeys = {
          defBoards: Object.keys(parsedInput.defBoards || {}),
          artifacts: Object.keys(parsedInput.artifacts || parsedInput.rDef?.artifacts || {}),
          rDef: Object.keys(parsedInput.rDef || {}),
        };
        
        const variationKeys = {
          defBoards: Object.keys(parsedDefinition.defBoards || {}),
          artifacts: Object.keys(parsedDefinition.artifacts || parsedDefinition.rDef?.artifacts || {}),
          rDef: Object.keys(parsedDefinition.rDef || {}),
        };

        // Verificar que todas las claves principales se mantienen
        const missingDefBoardsKeys = originalKeys.defBoards.filter(k => !variationKeys.defBoards.includes(k));
        const missingArtifactKeys = originalKeys.artifacts.filter(k => !variationKeys.artifacts.includes(k));
        
        if (missingDefBoardsKeys.length > 0 || missingArtifactKeys.length > 0) {
          console.warn("[generate-variation-v2] Missing keys in variation, merging with original:", {
            missingDefBoardsKeys,
            missingArtifactKeys,
          });
          
          // Merge: mantener estructura original, usar valores de variación donde existan
          parsedDefinition.defBoards = {
            ...parsedInput.defBoards,
            ...parsedDefinition.defBoards,
          };
          
          if (parsedInput.artifacts || parsedInput.rDef?.artifacts) {
            const originalArtifacts = parsedInput.artifacts || parsedInput.rDef.artifacts;
            const variationArtifacts = parsedDefinition.artifacts || parsedDefinition.rDef?.artifacts || {};
            parsedDefinition.artifacts = {
              ...originalArtifacts,
              ...variationArtifacts,
            };
          }
        }

        definitionVariation = {
          defBoards: parsedDefinition.defBoards || parsedInput.defBoards || {},
          artifacts: parsedDefinition.artifacts || parsedDefinition.rDef?.artifacts || parsedInput.artifacts || parsedInput.rDef?.artifacts,
          rDef: parsedDefinition.rDef || parsedInput.rDef,
        };

        // Si includeArtifact, ya tenemos la definición
        if (includeArtifact) {
          artifactDefinition = {
            defBoards: definitionVariation.defBoards,
            rDef: definitionVariation.rDef || (definitionVariation.artifacts ? { artifacts: definitionVariation.artifacts } : {}),
          };
        }

        // Si tenemos bookId, chapterId, pageId, obtener suggestedEngine y engines del contexto
        if (bookId && chapterId && pageId && !suggestedEngine) {
          try {
            const normalizedChapterId = chapterId.replace(/^.+_/, "");
            // Intentar obtener viewConfig para obtener suggestedEngine
            const extractedViewConfig = await extractViewConfig(bookId, normalizedChapterId, pageId);
            if (extractedViewConfig && extractedViewConfig.engines.length > 0) {
              viewConfig = extractedViewConfig; // Guardar viewConfig para retornarlo
              // Obtener suggestedEngine del viewConfig (first specific engine)
              suggestedEngine = extractedViewConfig.engines
                .filter(e => e.type === 'specific')
                .sort((a, b) => a.order - b.order)[0]?.name || 
                extractedViewConfig.engines
                  .filter(e => e.type !== 'library')
                  .sort((a, b) => a.order - b.order)[0]?.name ||
                null;
              console.log("[generate-variation-v2] Obtained suggestedEngine from viewConfig:", suggestedEngine);
            } else {
              // Fallback: obtener engines directamente
              const pageEngines = await getPageEngines(bookId, normalizedChapterId, pageId);
              if (pageEngines?.engines && pageEngines.engines.length > 0) {
                // Obtener el primer engine específico del capítulo
                const chapterEngine = pageEngines.chapterEngines?.[0];
                if (chapterEngine) {
                  suggestedEngine = chapterEngine.name?.replace(/\.js$/, '') || null;
                  console.log("[generate-variation-v2] Obtained suggestedEngine from pageEngines:", suggestedEngine);
                }
              }
            }
          } catch (error) {
            console.warn("[generate-variation-v2] Could not obtain suggestedEngine from context:", error);
          }
        }

      } else if (isExercise) {
        // Caso 2: Generar variación de Exercise (lógica original)
        const result = await agent.generate(
          `Genera una variación del siguiente ejercicio respetando el estilo y dificultad.\n` +
            `${exerciseJson}\n${groundingSnippet}${filesystemContext}\n` +
            `Responde SOLO con un JSON válido del ejercicio (sin texto adicional).`,
          { format: "mastra" }
        );

        const text = (result as any).text || "";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON found in response");
        let parsed: any;
        try {
          parsed = JSON.parse(jsonMatch[0]);
        } catch (e) {
          const sample = jsonMatch[0].slice(0, 160);
          console.warn("[generate-variation-v2] Primary JSON.parse failed. Applying normalization. Sample:", sample);
          const normalized = normalizeJson(jsonMatch[0]);
          console.debug("[generate-variation-v2] Normalized JSON length:", normalized.length);
          try {
            parsed = JSON.parse(normalized);
          } catch (e2) {
            const cleaned = normalized.replace(/[\u0000-\u001F\u007F]/g, "");
            console.warn("[generate-variation-v2] Second JSON.parse failed, applying control-char cleanup. Cleaned length:", cleaned.length);
            parsed = JSON.parse(cleaned);
          }
        }
        if (!parsed.id) {
          parsed.id = `ej_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }
        validated = ExerciseSchema.parse(parsed);
      } else {
        throw new Error("Input no reconocido como Definition (defBoards/artifacts) ni Exercise (tema/enunciado)");
      }

      // Generate artifact definition if requested (solo para Exercise)
      if (includeArtifact && validated && isExercise) {
        try {
          const artifactResult = await generateArtifactDefinitionToolV2.execute({
            runtimeContext: undefined as any,
            context: {
              exerciseJson: JSON.stringify(validated),
              bookId,
              chapterId,
              pageId,
            },
          }, {} as any);

          if (artifactResult.confidence > 0.5) {
            artifactDefinition = artifactResult.definition;
            suggestedEngine = artifactResult.suggestedEngine || null;

            // Add artifact definition to exercise metadata
            validated.metadata = {
              ...validated.metadata,
              artifactDefinition: artifactResult.definition,
              suggestedEngine: artifactResult.suggestedEngine || undefined,
            };
          }
        } catch (artifactError) {
          // If artifact generation fails, continue without it
          console.warn("Failed to generate artifact definition:", artifactError);
        }
      }

      // Determinar si hay artefacto para uiHints
      const hasArtifact = !!(artifactDefinition || (isDefinition && definitionVariation && (definitionVariation.defBoards || definitionVariation.artifacts || definitionVariation.rDef)));

      return {
        ...(validated ? { exercise: validated } : {}),
        ...(definitionVariation ? { definition: definitionVariation } : {}),
        ...(artifactDefinition ? { artifactDefinition } : {}),
        ...(suggestedEngine !== undefined ? { suggestedEngine } : {}),
        ...(bookId ? { bookId } : {}),
        ...(chapterId ? { chapterId } : {}),
        ...(viewConfig ? { viewConfig } : {}),
        ...(hasArtifact ? { uiHints: { openCanvas: true } } : {}),
      };
    } catch (error) {
      throw new Error(`Failed to generate variation: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
});

