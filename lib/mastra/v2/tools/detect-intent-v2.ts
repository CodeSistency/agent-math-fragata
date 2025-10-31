import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { mastra } from "@/lib/mastra";
import { bookExists } from "../filesystem/book-scanner";
import { getChapterInfo } from "../filesystem/chapter-scanner";

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

export const detectIntentToolV2 = createTool({
  id: "detect-intent",
  description: "Detecta la intención del mensaje del usuario: consulta, generar ejercicio, o editar ejercicio existente. Valida que libros y capítulos existen en el filesystem.",
  inputSchema: z.object({
    mensaje: z.string().describe("Mensaje del usuario a analizar"),
  }),
  outputSchema: z.object({
    intent: z.enum(["consulta", "generar", "editar"]),
    params: z.record(z.string(), z.any()).optional(),
    confidence: z.number(),
    validation: z.object({
      bookExists: z.boolean().optional(),
      chapterExists: z.boolean().optional(),
      suggestions: z.array(z.string()).optional(),
    }).optional(),
  }),
  execute: async ({ context }) => {
    const { mensaje } = context;

    console.log("[detect-intent-v2] input:", { mensajeSample: (mensaje || "").slice(0, 120) });
    try {
      // Use Mastra agent for intent detection (same as v1)
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
      const inferredChapterId = capMatch ? `cap_${capMatch[1]}` : undefined;
      const inferredPageNumber = pagMatch ? Number(pagMatch[1]) : undefined;

      // Validate against filesystem
      const finalBookId = validated.params?.bookId || inferredBookId;
      const finalChapterId = validated.params?.chapterId || inferredChapterId;
      
      let bookExistsFlag: boolean | undefined;
      let chapterExistsFlag: boolean | undefined;
      const suggestions: string[] = [];

      if (finalBookId) {
        bookExistsFlag = await bookExists(finalBookId);
        if (!bookExistsFlag) {
          suggestions.push(`El libro "${finalBookId}" no existe. Libros disponibles: MG, NV`);
        }
      }

      if (finalChapterId && finalBookId && bookExistsFlag) {
        // Normalize chapterId: remove bookId prefix if present
        let normalizedChapterId = finalChapterId;
        if (finalChapterId.includes("_")) {
          const parts = finalChapterId.split("_");
          if (parts.length >= 3 && parts[0] === finalBookId) {
            normalizedChapterId = parts.slice(1).join("_");
          }
        }

        const chapter = await getChapterInfo(finalBookId, normalizedChapterId);
        chapterExistsFlag = chapter !== null;
        
        if (!chapterExistsFlag) {
          // Try to get available chapters to suggest
          const { scanChapters } = await import("../filesystem/chapter-scanner");
          const chapters = await scanChapters(finalBookId);
          if (chapters.length > 0) {
            const chapterList = chapters
              .map((c) => c.id.replace(`${finalBookId}_`, ""))
              .join(", ");
            suggestions.push(
              `El capítulo "${normalizedChapterId}" no existe en "${finalBookId}". Capítulos disponibles: ${chapterList}`
            );
          }
        }
      }

      const finalResult = {
        ...validated,
        params: {
          ...(validated.params || {}),
          ...(inferredBookId ? { bookId: inferredBookId } : {}),
          ...(inferredChapterId ? { chapterId: inferredChapterId } : {}),
          ...(inferredPageNumber ? { pageNumber: inferredPageNumber } : {}),
        },
        validation: {
          ...(bookExistsFlag !== undefined ? { bookExists: bookExistsFlag } : {}),
          ...(chapterExistsFlag !== undefined ? { chapterExists: chapterExistsFlag } : {}),
          ...(suggestions.length > 0 ? { suggestions } : {}),
        },
      };

      console.log("[detect-intent-v2] output:", finalResult);
      return finalResult;
    } catch (error) {
      // Fallback: default to consulta
      // Fallback con la misma heurística y validación filesystem
      const lower = (mensaje || "").toLowerCase();
      let inferredBookId: string | undefined;
      if (/(^|\b)mg(\b|$)/i.test(lower)) inferredBookId = "MG";
      if (/(^|\b)nv(\b|$)/i.test(lower)) inferredBookId = "NV";
      const capMatch = lower.match(/cap\s*(\d{1,3})/);
      const pagMatch = lower.match(/pag\s*(\d{1,3})/);
      const inferredChapterId = capMatch ? `cap_${capMatch[1]}` : undefined;
      const inferredPageNumber = pagMatch ? Number(pagMatch[1]) : undefined;

      // Validate in fallback too
      let bookExistsFlag: boolean | undefined;
      let chapterExistsFlag: boolean | undefined;
      const suggestions: string[] = [];

      if (inferredBookId) {
        bookExistsFlag = await bookExists(inferredBookId);
        if (!bookExistsFlag) {
          suggestions.push(`El libro "${inferredBookId}" no existe. Libros disponibles: MG, NV`);
        }
      }

      if (inferredChapterId && inferredBookId && bookExistsFlag) {
        let normalizedChapterId = inferredChapterId;
        if (inferredChapterId.includes("_")) {
          const parts = inferredChapterId.split("_");
          if (parts.length >= 3 && parts[0] === inferredBookId) {
            normalizedChapterId = parts.slice(1).join("_");
          }
        }

        const chapter = await getChapterInfo(inferredBookId, normalizedChapterId);
        chapterExistsFlag = chapter !== null;
        
        if (!chapterExistsFlag) {
          const { scanChapters } = await import("../filesystem/chapter-scanner");
          const chapters = await scanChapters(inferredBookId);
          if (chapters.length > 0) {
            const chapterList = chapters
              .map((c) => c.id.replace(`${inferredBookId}_`, ""))
              .join(", ");
            suggestions.push(
              `El capítulo "${normalizedChapterId}" no existe. Capítulos disponibles: ${chapterList}`
            );
          }
        }
      }

      const fallback = {
        intent: "consulta" as const,
        params: {
          ...(inferredBookId ? { bookId: inferredBookId } : {}),
          ...(inferredChapterId ? { chapterId: inferredChapterId } : {}),
          ...(inferredPageNumber ? { pageNumber: inferredPageNumber } : {}),
        },
        confidence: 0.5,
        validation: {
          ...(bookExistsFlag !== undefined ? { bookExists: bookExistsFlag } : {}),
          ...(chapterExistsFlag !== undefined ? { chapterExists: chapterExistsFlag } : {}),
          ...(suggestions.length > 0 ? { suggestions } : {}),
        },
      };
      console.warn("[detect-intent-v2] fallback:", fallback);
      return fallback;
    }
  },
});



