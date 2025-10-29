import { readFile } from "fs/promises";
import { processImageToExercises } from "@/lib/ocr/processor";
import type { Exercise } from "@/types/exercise";
import type { Page } from "@/types/book";

/**
 * Parse a JavaScript definition file and extract defBoards and rDef
 * This is a simple parser that evaluates the file in a controlled way
 */
async function parseDefinitionFile(filePath: string): Promise<{
  defBoards?: Record<string, any>;
  rDef?: Record<string, any>;
  error?: string;
}> {
  try {
    const content = await readFile(filePath, "utf-8");
    
    // Try to extract defBoards and rDef using regex/parsing
    // This is a simplified approach - in production you might want a more robust parser
    
    const defBoardsMatch = content.match(/let\s+defBoards\s*=\s*(\{[\s\S]*?\});/);
    const rDefMatch = content.match(/const\s+rDef\s*=\s*(\{[\s\S]*?\});/);
    
    let defBoards: Record<string, any> | undefined;
    let rDef: Record<string, any> | undefined;
    
    if (defBoardsMatch) {
      try {
        // Evaluate the defBoards object (safe for trusted files)
        defBoards = eval(`(${defBoardsMatch[1]})`);
      } catch (err) {
        console.warn(`Failed to parse defBoards from ${filePath}:`, err);
      }
    }
    
    if (rDefMatch) {
      try {
        // Evaluate the rDef object
        rDef = eval(`(${rDefMatch[1]})`);
      } catch (err) {
        console.warn(`Failed to parse rDef from ${filePath}:`, err);
      }
    }
    
    return { defBoards, rDef };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Process a definition file and extract exercises
 * For now, this extracts the structure but doesn't generate exercises from it
 * Exercises would need to be generated from OCR or manual input
 */
export async function processDefinitionFile(
  page: Page,
  bookId: string,
  bookName: string,
  chapterId: string,
  chapterNumber: number
): Promise<{
  content: Record<string, any>;
  exercises: Exercise[];
  error?: string;
}> {
  try {
    // Parse the definition file
    const parsed = await parseDefinitionFile(page.filePath);
    
    if (parsed.error) {
      return {
        content: {},
        exercises: [],
        error: parsed.error,
      };
    }

    // Store parsed content
    const content: Record<string, any> = {};
    if (parsed.defBoards) {
      content.defBoards = parsed.defBoards;
    }
    if (parsed.rDef) {
      content.rDef = parsed.rDef;
    }

    // Extract exercises from rDef structure if available
    const exercises: Exercise[] = [];
    
    if (parsed.rDef?.artifactHtml?.datadefault) {
      // Iterate through artifacts and extract questions
      const artifacts = parsed.rDef.artifactHtml.datadefault;
      
      for (const artifact of artifacts) {
        if (artifact.contents) {
          for (const [artifactKey, artifactContent] of Object.entries(artifact.contents)) {
            if (artifactContent && typeof artifactContent === 'object' && 'questions' in artifactContent) {
              const questions = (artifactContent as any).questions || [];
              
              // Create an exercise for each question or group of questions
              if (questions.length > 0) {
                const exerciseId = `ej_${bookId}_${page.id}_${artifactKey}_${Date.now()}`;
                
                // Extract question text (use first question as example)
                const firstQuestion = questions[0];
                const questionText = firstQuestion?.question || "Ejercicio matemático";
                
                exercises.push({
                  id: exerciseId,
                  tema: "Matemáticas", // Default, should be extracted from context
                  subtema: `Capítulo ${chapterNumber}`,
                  dificultad: "media", // Default
                  enunciado: questionText,
                  solucion: "", // Would need to be extracted or generated
                  image_ref: page.filePath,
                  metadata: {
                    bookId,
                    bookName,
                    chapterId,
                    chapterNumber,
                    pageId: page.id,
                    pageNumber: page.pageNumber,
                    variant: page.variant,
                    artifactKey,
                    totalQuestions: questions.length,
                  },
                });
              }
            }
          }
        }
      }
    }

    return {
      content,
      exercises,
    };
  } catch (error) {
    return {
      content: {},
      exercises: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Process multiple definition files in batch
 */
export async function processDefinitionFiles(
  pages: Page[],
  bookId: string,
  bookName: string,
  chapters: Array<{ id: string; chapterNumber: number }>
): Promise<Array<{
  page: Page;
  content: Record<string, any>;
  exercises: Exercise[];
  error?: string;
}>> {
  const results = await Promise.all(
    pages.map(async (page) => {
      const chapter = chapters.find((c) => c.id === page.chapterId);
      if (!chapter) {
        return {
          page,
          content: {},
          exercises: [],
          error: `Chapter ${page.chapterId} not found`,
        };
      }

      const result = await processDefinitionFile(
        page,
        bookId,
        bookName,
        chapter.id,
        chapter.chapterNumber
      );

      return {
        page,
        ...result,
      };
    })
  );

  return results;
}

