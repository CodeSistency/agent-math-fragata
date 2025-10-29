import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { mastra } from "@/lib/mastra";
import { ExerciseSchema, type Exercise } from "@/types/exercise";

export const generateVariationTool = createTool({
  id: "generate-variation",
  description: "Genera una variación de un ejercicio matemático manteniendo la misma estructura y dificultad pero cambiando valores numéricos",
  inputSchema: z.object({
    exerciseJson: z.string().describe("JSON del ejercicio base a variar"),
  }),
  outputSchema: z.object({
    exercise: ExerciseSchema,
  }),
  execute: async ({ context }) => {
    const { exerciseJson } = context;

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

      return {
        exercise: validated,
      };
    } catch (error) {
      throw new Error(`Failed to generate variation: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
});

