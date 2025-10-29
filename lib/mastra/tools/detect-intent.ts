import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { mastra } from "@/lib/mastra";

const IntentSchema = z.object({
  intent: z.enum(["consulta", "generar", "editar"]),
  params: z.object({
    tema: z.string().optional(),
    dificultad: z.enum(["básica", "media", "avanzada"]).optional(),
    ejercicioId: z.string().optional(),
  }).optional(),
  confidence: z.number().min(0).max(1),
});

export const detectIntentTool = createTool({
  id: "detect-intent",
  description: "Detecta la intención del mensaje del usuario: consulta, generar ejercicio, o editar ejercicio existente",
  inputSchema: z.object({
    mensaje: z.string().describe("Mensaje del usuario a analizar"),
  }),
  outputSchema: z.object({
    intent: z.enum(["consulta", "generar", "editar"]),
    params: z.record(z.string(), z.any()).optional(),
    confidence: z.number(),
  }),
  execute: async ({ context }) => {
    const { mensaje } = context;

    try {
      // Use Mastra agent for intent detection
      const agent = mastra.getAgent("intentDetectionAgent");
      const result = await agent.generate(mensaje, {
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
      const validated = IntentSchema.parse(parsed);

      return validated;
    } catch (error) {
      // Fallback: default to consulta
      return {
        intent: "consulta" as const,
        params: {},
        confidence: 0.5,
      };
    }
  },
});

