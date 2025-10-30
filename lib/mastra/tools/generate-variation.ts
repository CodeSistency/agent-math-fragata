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
  }),
  outputSchema: z.object({
    exercise: ExerciseSchema,
    artifactDefinition: z.object({
      defBoards: z.record(z.any()),
      rDef: z.record(z.any()),
    }).optional(),
    suggestedEngine: z.string().nullable().optional(),
  }),
  execute: async ({ context }) => {
    const { exerciseJson, includeArtifact } = context;

    try {
      // Use Mastra agent for variation generation
      const agent = mastra.getAgent("variationGenerationAgent");
      const prompt = `Genera una variación del siguiente ejercicio:\n\n${exerciseJson}`;
      
      const result = await agent.generate(prompt, {
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
      
      // Add unique ID if not present
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
            context: { exerciseJson: JSON.stringify(validated) },
          });

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
      };
    } catch (error) {
      throw new Error(`Failed to generate variation: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
});

