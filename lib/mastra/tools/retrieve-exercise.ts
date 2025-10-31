import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { retrieveAndHydrate } from "@/lib/rag/retrieve-and-hydrate";

export const retrieveExerciseTool = createTool({
  id: "retrieve-exercise",
  description:
    "Recupera ejercicios similares con RAG y devuelve pasajes hidratados con citas y metadatos.",
  inputSchema: z.object({
    query: z.string().describe("Texto de la consulta"),
    topK: z.number().int().min(1).max(20).optional(),
    bookId: z.string().optional(),
    bookName: z.string().optional(),
    chapterId: z.string().optional(),
    pageNumber: z.number().int().positive().optional(),
    hasArtifact: z.boolean().optional(),
    artifactType: z.string().optional(),
  }),
  outputSchema: z.object({
    results: z.array(
      z.object({
        score: z.number(),
        bookId: z.string().optional(),
        chapterId: z.string().optional(),
        pageId: z.string().optional(),
        pageNumber: z.number().optional(),
        filePath: z.string().optional(),
        hasArtifact: z.boolean().optional(),
        text: z.string(),
        exercise: z.record(z.string(), z.any()),
      })
    ),
  }),
  execute: async ({ context }) => {
    const { query, topK, bookId, bookName, chapterId, pageNumber, hasArtifact, artifactType } = context as {
      query?: string;
      topK?: number;
      bookId?: string;
      bookName?: string;
      chapterId?: string;
      pageNumber?: number;
      hasArtifact?: boolean;
      artifactType?: string;
    };

    // 1) Defaults para query y topK
    let q = (query ?? "").trim();
    if (q.length < 2) q = "fundamentos matemáticos";
    const k = topK ?? 5;

    // 2) Alias de libros (MG/NV)
    const aliasToBookId: Record<string, string> = { mg: "MG", nv: "NV" };
    let effectiveBookId = bookId;
    if (!effectiveBookId && typeof bookName === "string") {
      const key = bookName.trim().toLowerCase();
      effectiveBookId = aliasToBookId[key];
    }

    console.log("[retrieve-exercise] input:", {
      query: q,
      topK: k,
      bookId,
      bookName,
      effectiveBookId,
      chapterId,
      pageNumber,
      hasArtifact,
      artifactType,
    });

    // 3) Retrieve + hidratar
    const results = await retrieveAndHydrate(q, {
      topK: k,
      bookId: effectiveBookId,
      chapterId,
      pageNumber,
      hasArtifact,
      artifactType,
    });

    // 4) Fallback si no hay resultados
    if (!results.length) {
      console.warn("[retrieve-exercise] no results, returning generated fallback");
      return {
        results: [
          {
            score: 0,
            bookId: effectiveBookId,
            text: "Ejercicio (generado): Resuelve 2x + 3 = 11.",
            exercise: {
              tema: "fundamentos matemáticos",
              dificultad: "básica",
              enunciado: "Resuelve 2x + 3 = 11.",
              solucion: "x = 4",
              metadata: { bookId: effectiveBookId, generated: true },
            },
          },
        ],
      };
    }

    console.log("[retrieve-exercise] results:", {
      count: results.length,
      sample: results.slice(0, Math.min(2, results.length)).map((r) => ({
        score: r.score,
        bookId: r.bookId || r.exercise?.metadata?.bookId,
        pageId: r.pageId || r.exercise?.metadata?.pageId,
        pageNumber: r.pageNumber,
        hasArtifact: r.hasArtifact,
      })),
    });

    return { results };
  },
});

