import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { mastra } from "@/lib/mastra";
import { ExerciseSchema, type Exercise } from "@/types/exercise";
import { readDefinitionByPage } from "../filesystem/definition-reader";
import { generateArtifactDefinitionToolV2 } from "./generate-artifact-definition-v2";

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

      if (isDefinition) {
        // Caso 1: Generar variación de Definition directamente
        const prompt = `Genera una variación de la siguiente definición de artefacto matemático.
Mantén la misma estructura pero cambia los valores numéricos en:
- conditions.compare.values (valores a comparar)
- interval (rangos de intervalos)
- representation (representaciones textuales)
- statementBottom (enunciados de funciones)
- enumTop (títulos de ejercicios)
- preDefPar, preDefPoint (puntos predefinidos)

Definición original:
${JSON.stringify(parsedInput, null, 2)}
${filesystemContext}

Responde SOLO con un JSON válido de la definición variada (mismo formato: defBoards, artifacts/rDef, sin campos artificiales como tema, dificultad, enunciado, solucion).`;

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

        definitionVariation = {
          defBoards: parsedDefinition.defBoards || parsedInput.defBoards || {},
          artifacts: parsedDefinition.artifacts || parsedDefinition.rDef || parsedInput.artifacts || parsedInput.rDef,
          rDef: parsedDefinition.rDef || parsedInput.rDef,
        };

        // Si includeArtifact, ya tenemos la definición
        if (includeArtifact) {
          artifactDefinition = {
            defBoards: definitionVariation.defBoards,
            rDef: definitionVariation.rDef || (definitionVariation.artifacts ? { artifacts: definitionVariation.artifacts } : {}),
          };
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
        ...(hasArtifact ? { uiHints: { openCanvas: true } } : {}),
      };
    } catch (error) {
      throw new Error(`Failed to generate variation: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
});

