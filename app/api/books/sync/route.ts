import { NextRequest, NextResponse } from "next/server";
import { parseBookStructure, validateBookStructure } from "@/lib/books/parser";
import { processDefinitionFiles } from "@/lib/books/definition-processor";
import { clearEngineCacheFor } from "@/lib/books/engine-discovery";
import { bookRepository, chapterRepository, pageRepository, exerciseRepository } from "@/lib/db/repositories";
import { deleteBookVectorStore, initializeBookVectorStore, upsertExercises } from "@/lib/rag/vector-store";
import { vectorStore } from "@/lib/rag/vector-store";
import { initializeDatabase } from "@/lib/db/init";
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { buildEmbeddingText } from "@/lib/rag/rag-helpers";
import { ExerciseSchema } from "@/types/exercise";

export const runtime = "nodejs";
export const maxDuration = 600; // 10 minutes for multiple books

/**
 * Check if a path is a directory
 */
async function isDirectory(path: string): Promise<boolean> {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * POST /api/books/sync - Synchronize all books from books/ directory
 * 
 * Scans books/ folder and processes all books found
 */
export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    
    const booksDir = join(process.cwd(), "books");
    
    // Check if books directory exists
    if (!existsSync(booksDir) || !(await isDirectory(booksDir))) {
      return NextResponse.json(
        { error: "Books directory not found: books/" },
        { status: 404 }
      );
    }

    // Read all items in books directory
    const items = await readdir(booksDir);
    const processedBooks: Array<{
      bookId: string;
      success: boolean;
      error?: string;
      summary?: any;
    }> = [];

    // Process each book directory
    for (const item of items) {
      const bookPath = join(booksDir, item);
      const bookId = item;
      
      // Skip if not a directory
      if (!(await isDirectory(bookPath))) {
        continue;
      }

      // Check if it's a valid book structure (has book/definitions/)
      const bookBookPath = join(bookPath, "book");
      const definitionsPath = join(bookBookPath, "definitions");
      
      if (!existsSync(bookBookPath) || !(await isDirectory(bookBookPath))) {
        console.log(`Skipping ${bookId}: no book/ directory found`);
        continue;
      }

      if (!existsSync(definitionsPath) || !(await isDirectory(definitionsPath))) {
        console.log(`Skipping ${bookId}: no book/definitions/ directory found`);
        continue;
      }

      try {
        console.log(`Processing book: ${bookId}...`);
        
        // Parse book structure
        const structure = await parseBookStructure(bookPath, bookId);

        // Validate structure
        const validation = validateBookStructure(structure);
        if (!validation.valid) {
          processedBooks.push({
            bookId,
            success: false,
            error: `Invalid structure: ${validation.errors.join(", ")}`,
          });
          continue;
        }

        // Check if book already exists
        const existingBook = await bookRepository.findById(bookId);
        
        // If book exists, delete old data (overwrite mode)
        if (existingBook) {
          console.log(`Deleting existing book data for ${bookId}...`);
          
          // Clear engine cache for this book
          clearEngineCacheFor(bookId);
          
          // Delete vector store index (force delete even if dimension mismatch)
          try {
            await deleteBookVectorStore(bookId);
          } catch (deleteError) {
            // If delete fails due to dimension mismatch, try to force delete
            if (deleteError instanceof Error && deleteError.message.includes("dimension")) {
              console.log(`Attempting to force delete index with dimension mismatch...`);
              const indexName = `${bookId}_exercises`;
              try {
                await vectorStore.deleteIndex({ indexName });
                await new Promise(resolve => setTimeout(resolve, 200));
              } catch (forceDeleteError) {
                console.warn(`Could not force delete index ${indexName}, will try to recreate during upsert`);
              }
            } else {
              throw deleteError;
            }
          }
          
          await exerciseRepository.deleteByBookId(bookId);
          await bookRepository.delete(bookId);
        }

        // Create new book record
        const book = await bookRepository.create({
          id: bookId,
          name: bookId, // Use bookId as name, can be improved later
          code: bookId,
          metadata: {
            totalChapters: structure.chapters.length,
            totalPages: structure.pages.length,
          },
        });

        // Create chapters
        for (const chapter of structure.chapters) {
          await chapterRepository.create(chapter);
        }

        // Create pages
        for (const page of structure.pages) {
          await pageRepository.create(page);
        }

        // Process definition files and extract exercises
        const processedPages = await processDefinitionFiles(
          structure.pages,
          bookId,
          bookId, // Use bookId as name
          structure.chapters.map((c) => ({ id: c.id, chapterNumber: c.chapterNumber }))
        );

        // Initialize vector store for this book
        await initializeBookVectorStore(bookId);

        // Collect all exercises with book context
        const allExercises: Array<{ id: string; exercise: any; text: string }> = [];
        let totalExercisesExtracted = 0;
        // Global flag to disable validation if schema is broken during this request
        let canValidateExercises = !!ExerciseSchema && typeof (ExerciseSchema as any).safeParse === "function";

        for (const processed of processedPages) {
          if (processed.error) {
            console.warn(`Error processing page ${processed.page.id}:`, processed.error);
            continue;
          }

          // Update page with processed content
          if (processed.content && Object.keys(processed.content).length > 0) {
            await pageRepository.update(processed.page.id, {
              content: processed.content,
              processedAt: new Date().toISOString(),
            });
          }

          // Add exercises from definition processing
          if (processed.exercises.length > 0) {
            totalExercisesExtracted += processed.exercises.length;
            
            for (const exercise of processed.exercises) {
              // Validate exercise structure before saving
              try {
                // Parse and validate with Zod schema (best-effort, non-blocking)
                if (!canValidateExercises) {
                  console.warn(`[sync] ExerciseSchema not available, skipping validation for ${exercise.id}`);
                } else {
                  let validationFailed = false;
                  try {
                    const result = (ExerciseSchema as any).safeParse(exercise);
                    if (!result.success) {
                      console.warn(`[sync] Invalid exercise structure for ${exercise.id}:`, result.error);
                      validationFailed = true;
                    }
                  } catch (schemaErr) {
                    console.warn(`[sync] ExerciseSchema threw during validation for ${exercise.id}, disabling further validation this run:`, schemaErr);
                    canValidateExercises = false;
                  }
                  if (validationFailed) {
                    continue;
                  }
                }
                
                // Usar buildEmbeddingText para incluir información de artefactos
                const text = buildEmbeddingText(exercise);

                allExercises.push({
                  id: exercise.id,
                  exercise,
                  text,
                });

                // Save to database
                await exerciseRepository.create({
                  ...exercise,
                  pageId: processed.page.id,
                  bookId,
                  chapterId: processed.page.chapterId,
                });
              } catch (validationError) {
                console.warn(`[sync] Invalid exercise structure for ${exercise.id}:`, validationError);
                // Skip invalid exercises but continue processing
                continue;
              }
            }
          }
        }

        // Upsert exercises to vector store (best-effort; skip on embedding quota/rate-limit errors)
        if (allExercises.length > 0) {
          try {
            await upsertExercises(allExercises, bookId);
          } catch (embedErr) {
            const msg = embedErr instanceof Error ? embedErr.message : String(embedErr);
            if (msg.includes("BatchEmbedContentsRequest") || msg.includes("quota") || msg.includes("RATE") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("429")) {
              console.warn(`[sync] Skipping vector indexing for ${bookId} due to embedding service limits/quota:`, msg);
            } else {
              throw embedErr;
            }
          }
        }

        processedBooks.push({
          bookId,
          success: true,
          summary: {
            chaptersCreated: structure.chapters.length,
            pagesCreated: structure.pages.length,
            pagesProcessed: processedPages.filter((p) => !p.error).length,
            pagesWithErrors: processedPages.filter((p) => p.error).length,
            exercisesExtracted: totalExercisesExtracted,
            exercisesIndexed: allExercises.length,
          },
        });

        console.log(`Successfully processed book: ${bookId}`);
      } catch (error) {
        console.error(`Error processing book ${bookId}:`, error);
        processedBooks.push({
          bookId,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    const successful = processedBooks.filter((b) => b.success).length;
    const failed = processedBooks.filter((b) => !b.success).length;

    return NextResponse.json({
      success: true,
      data: {
        totalProcessed: processedBooks.length,
        successful,
        failed,
        books: processedBooks,
      },
    });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json(
      {
        error: "Failed to synchronize books",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

