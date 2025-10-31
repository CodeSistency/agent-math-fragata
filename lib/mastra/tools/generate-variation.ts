import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { mastra } from "@/lib/mastra";
import { ExerciseSchema, type Exercise } from "@/types/exercise";
import { generateArtifactDefinitionTool } from "./generate-artifact-definition";

export const generateVariationTool = createTool({
  id: "generate-variation",
  description: "Genera una variación de un ejercicio matemático manteniendo la misma estructura y dificultad pero cambiando valores numéricos. Opcionalmente puede generar también la definición de artefacto para visualización interactiva.",
  inputSchema: z.object({
    exerciseJson: z.string().describe("JSON del ejercicio base a variar"),
    includeArtifact: z.boolean().optional().default(false).describe("Si es true, también genera la definición de artefacto para visualización interactiva"),
    grounding: z.array(z.object({
      enunciado: z.string().optional(),
      solucion: z.string().optional(),
      metadata: z.record(z.string(), z.any()).optional(),
    })).optional().describe("Contexto recuperado por RAG para guiar la variación"),
  }),
  outputSchema: z.object({
    exercise: ExerciseSchema,
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
    const { exerciseJson, includeArtifact, grounding } = context as {
      exerciseJson: string;
      includeArtifact?: boolean;
      grounding?: Array<{ enunciado?: string; solucion?: string; metadata?: Record<string, any> }>;
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
        // Temporarily protect already escaped sequences \\\\ by marking them
        out = out.replace(/\\\\/g, "__BSLASH_DBL__");
        // Then escape any remaining single backslashes
        out = out.replace(/\\/g, "\\\\");
        // Restore the original double backslashes
        out = out.replace(/__BSLASH_DBL__/g, "\\\\");
        return out;
      };

      const agent = mastra.getAgent("variationGenerationAgent");
      const groundingSnippet = Array.isArray(grounding) && grounding.length
        ? `\nContexto recuperado (grounding):\n${grounding.map((g, i) => `- [${i + 1}] ${g.enunciado ?? ""}`).join("\n")}\n`
        : "";

      // Volver a texto + normalización para compatibilidad con Gemini
      const result = await agent.generate(
        `Genera una variación del siguiente ejercicio respetando el estilo y dificultad.\n` +
          `${exerciseJson}\n${groundingSnippet}\n` +
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
        console.warn("[generate-variation] Primary JSON.parse failed. Applying normalization. Sample:", sample);
        const normalized = normalizeJson(jsonMatch[0]);
        console.debug("[generate-variation] Normalized JSON length:", normalized.length);
        try {
          parsed = JSON.parse(normalized);
        } catch (e2) {
          const cleaned = normalized.replace(/[\u0000-\u001F\u007F]/g, "");
          console.warn("[generate-variation] Second JSON.parse failed, applying control-char cleanup. Cleaned length:", cleaned.length);
          parsed = JSON.parse(cleaned);
        }
      }
      if (!parsed.id) {
        parsed.id = `ej_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      const validated = ExerciseSchema.parse(parsed);

      // Generate artifact definition if requested
      let artifactDefinition: { defBoards: Record<string, any>; rDef: Record<string, any> } | undefined;
      let suggestedEngine: string | null | undefined;

      if (includeArtifact) {
        try {
          const artifactResult = await generateArtifactDefinitionTool.execute({
            runtimeContext: undefined as any,
            context: { exerciseJson: JSON.stringify(validated) },
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

      return {
        exercise: validated,
        artifactDefinition,
        suggestedEngine,
        ...(artifactDefinition ? { uiHints: { openCanvas: true } } : {}),
      };
    } catch (error) {
      throw new Error(`Failed to generate variation: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
});

