import { createWorker } from "tesseract.js";
import { z } from "zod";
import { mastra } from "@/lib/mastra";
import { ExerciseSchema, type Exercise } from "@/types/exercise";

/**
 * Process an image file and extract text using OCR
 */
export async function extractTextFromImage(imageFile: File | Buffer): Promise<string> {
  const worker = await createWorker("spa+eng"); // Spanish and English
  try {
    const { data } = await worker.recognize(imageFile);
    await worker.terminate();
    return data.text;
  } catch (error) {
    await worker.terminate();
    throw new Error(`OCR failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Clean OCR text - normalize LaTeX and remove common OCR errors
 */
export function cleanOcrText(text: string): string {
  return text
    // Normalize whitespace
    .replace(/\s+/g, " ")
    // Fix common OCR mistakes for math symbols
    .replace(/0/g, "O") // Be careful with this - might need more context
    .replace(/l/g, "I") // Another common mistake
    // Remove excessive newlines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Extract structured exercises from OCR text using Mastra agent
 */
export async function extractExercisesFromOcr(ocrText: string): Promise<Exercise[]> {
  const cleanedText = cleanOcrText(ocrText);
  
  try {
    const extractionAgent = mastra.getAgent("exerciseExtractionAgent");
    
    // Use Mastra agent to extract exercises with structured output
    const result = await extractionAgent.generate(
      `Extrae todos los ejercicios matemáticos del siguiente texto OCR:\n\n${cleanedText}`,
      {
        format: "mastra",
        structuredOutput: {
          schema: z.array(ExerciseSchema),
          errorStrategy: "warn",
        },
      }
    );

    // Extract exercises from structured output
    let exercises: Exercise[] = [];
    
    if (result.object && Array.isArray(result.object)) {
      exercises = result.object as Exercise[];
    } else if (result.text) {
      // Fallback: try to parse JSON from text response
      const jsonMatch = result.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        exercises = JSON.parse(jsonMatch[0]);
      } else {
        const singleMatch = result.text.match(/\{[\s\S]*\}/);
        if (singleMatch) {
          exercises = [JSON.parse(singleMatch[0])];
        }
      }
    }

    // Add unique IDs and validate each exercise
    const validatedExercises: Exercise[] = exercises.map((ex: any) => {
      if (!ex.id) {
        ex.id = `ej_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      return ExerciseSchema.parse(ex);
    });

    return validatedExercises;
  } catch (error) {
    console.error("Failed to extract exercises from OCR:", error);
    return [];
  }
}

/**
 * Process image file and extract structured exercises
 */
export async function processImageToExercises(
  imageFile: File | Buffer,
  imageRef?: string
): Promise<Exercise[]> {
  // Step 1: Extract text with OCR
  const ocrText = await extractTextFromImage(imageFile);
  
  if (!ocrText || ocrText.trim().length < 10) {
    throw new Error("No text extracted from image");
  }

  // Step 2: Extract structured exercises
  const exercises = await extractExercisesFromOcr(ocrText);

  // Step 3: Add image reference if provided
  if (imageRef) {
    exercises.forEach((ex) => {
      if (!ex.image_ref) {
        ex.image_ref = imageRef;
      }
    });
  }

  return exercises;
}

