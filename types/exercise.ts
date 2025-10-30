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
    // Artifact-specific fields
    artifactKey: z.string().optional(),
    totalQuestions: z.number().optional(),
    questionIndex: z.number().optional(),
    artifactDefBoard: z.string().optional(), // Associated board key for this artifact
    questionData: z.object({
      type: z.number().optional(),
      answers_values: z.array(z.any()).optional(),
      conditions: z.record(z.any()).optional(),
    }).optional(),
    // Artifact definition for visual/interactive exercises
    artifactDefinition: z.object({
      defBoards: z.record(z.any()),
      rDef: z.record(z.any()),
    }).optional(),
    suggestedEngine: z.string().optional(),
  }).optional(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;



