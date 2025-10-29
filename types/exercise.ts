import { z } from "zod";

export const ExerciseSchema = z.object({
  id: z.string(),
  tema: z.string().describe("Tema matemático del ejercicio (ej: Álgebra lineal, Cálculo)"),
  subtema: z.string().optional().describe("Subtema específico (ej: Sistemas de ecuaciones)"),
  dificultad: z.enum(["básica", "media", "avanzada"]).describe("Nivel de dificultad"),
  enunciado: z.string().describe("Enunciado del ejercicio en formato LaTeX para MathJax"),
  solucion: z.string().describe("Solución del ejercicio en formato LaTeX"),
  variables: z.record(z.string()).optional().describe("Variables para generación dinámica con valores aleatorios"),
  image_ref: z.string().optional().describe("Referencia a la imagen original del libro"),
  metadata: z.object({
    pagina: z.number().optional(),
    seccion: z.string().optional(),
    capitulo: z.string().optional(),
    // Book context fields (optional for backward compatibility)
    bookId: z.string().optional(),
    bookName: z.string().optional(),
    chapterId: z.string().optional(),
    chapterNumber: z.number().optional(),
    pageId: z.string().optional(),
    pageNumber: z.number().optional(),
    variant: z.number().optional(),
  }).optional(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;



