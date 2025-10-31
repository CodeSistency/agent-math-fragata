import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { mastra } from "@/lib/mastra";

const IntentSchema = z.object({
  intent: z.enum(["consulta", "generar", "editar"]),
  params: z.object({
    tema: z.string().optional(),
    dificultad: z.enum(["básica", "media", "avanzada"]).optional(),
    ejercicioId: z.string().optional(),
    bookId: z.string().optional(),
    chapterId: z.string().optional(),
    pageNumber: z.number().int().positive().optional(),
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

    console.log("[detect-intent] input:", { mensajeSample: (mensaje || "").slice(0, 120) });
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

      // Heurística: inferir bookId por alias (MG/NV) si no vino en params
      const lower = (mensaje || "").toLowerCase();
      let inferredBookId: string | undefined;
      if (/(^|\b)mg(\b|$)/i.test(lower)) inferredBookId = "MG";
      if (/(^|\b)nv(\b|$)/i.test(lower)) inferredBookId = "NV";

      // Heurísticas: chapter/page
      const capMatch = lower.match(/cap\s*(\d{1,3})/);
      const pagMatch = lower.match(/pag\s*(\d{1,3})/);
      const inferredChapterId = capMatch ? capMatch[1] : undefined;
      const inferredPageNumber = pagMatch ? Number(pagMatch[1]) : undefined;

      const finalResult = {
        ...validated,
        params: {
          ...(validated.params || {}),
          ...(inferredBookId ? { bookId: inferredBookId } : {}),
          ...(inferredChapterId ? { chapterId: inferredChapterId } : {}),
          ...(inferredPageNumber ? { pageNumber: inferredPageNumber } : {}),
        },
      } as z.infer<typeof IntentSchema>;

      console.log("[detect-intent] output:", finalResult);
      return finalResult;
    } catch (error) {
      // Fallback: default to consulta
      // Fallback con la misma heurística
      const lower = (mensaje || "").toLowerCase();
      let inferredBookId: string | undefined;
      if (/(^|\b)mg(\b|$)/i.test(lower)) inferredBookId = "MG";
      if (/(^|\b)nv(\b|$)/i.test(lower)) inferredBookId = "NV";
      const capMatch = lower.match(/cap\s*(\d{1,3})/);
      const pagMatch = lower.match(/pag\s*(\d{1,3})/);
      const inferredChapterId = capMatch ? capMatch[1] : undefined;
      const inferredPageNumber = pagMatch ? Number(pagMatch[1]) : undefined;
      const fallback = {
        intent: "consulta" as const,
        params: {
          ...(inferredBookId ? { bookId: inferredBookId } : {}),
          ...(inferredChapterId ? { chapterId: inferredChapterId } : {}),
          ...(inferredPageNumber ? { pageNumber: inferredPageNumber } : {}),
        },
        confidence: 0.5,
      };
      console.warn("[detect-intent] fallback:", fallback);
      return fallback;
    }
  },
});

