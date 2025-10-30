import { NextRequest, NextResponse } from "next/server";
import { parseBookStructure, validateBookStructure } from "@/lib/books/parser";
import { processDefinitionFiles } from "@/lib/books/definition-processor";
import { clearEngineCacheFor } from "@/lib/books/engine-discovery";
import { bookRepository, chapterRepository, pageRepository, exerciseRepository } from "@/lib/db/repositories";
import { deleteBookVectorStore, initializeBookVectorStore, upsertExercises } from "@/lib/rag/vector-store";
import { initializeDatabase } from "@/lib/db/init";
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 minutes for full book processing

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
 * POST /api/books/upload - Upload and process a complete book
 * 
 * Accepts bookId in form data and processes the book from books/{bookId}/book/
 * This will overwrite all existing data for the book
 */
export async function POST(request: NextRequest) {
  try {
    // Ensure database is initialized
    await initializeDatabase();
    
    const formData = await request.formData();
    const bookId = formData.get("bookId") as string;
    const bookName = formData.get("bookName") as string;
    const bookCode = formData.get("bookCode") as string || bookId;

    if (!bookId) {
      return NextResponse.json(
        { error: "bookId is required" },
        { status: 400 }
      );
    }

    if (!bookName) {
      return NextResponse.json(
        { error: "bookName is required" },
        { status: 400 }
      );
    }

    // Validate bookId format (only alphanumeric and underscores)
    if (!/^[A-Z0-9_]+$/.test(bookId)) {
      return NextResponse.json(
        { error: "Invalid bookId format. Use only uppercase letters, numbers, and underscores" },
        { status: 400 }
      );
    }

    // Path to book directory
    const bookPath = join(process.cwd(), "books", bookId);

    // Check if book directory exists
    if (!existsSync(bookPath) || !(await isDirectory(bookPath))) {
      return NextResponse.json(
        { error: `Book directory not found: books/${bookId}` },
        { status: 404 }
      );
    }

    // Check if book/book structure exists
    const bookBookPath = join(bookPath, "book");
    if (!existsSync(bookBookPath) || !(await isDirectory(bookBookPath))) {
      return NextResponse.json(
        { error: `Book structure not found: books/${bookId}/book/` },
        { status: 404 }
      );
    }

    // Parse book structure
    console.log(`Parsing book structure for ${bookId}...`);
    const structure = await parseBookStructure(bookPath, bookId);

    // Validate structure
    const validation = validateBookStructure(structure);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: "Invalid book structure",
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    // Check if book already exists
    const existingBook = await bookRepository.findById(bookId);
    
    // If book exists, delete old data (overwrite mode)
    if (existingBook) {
      console.log(`Deleting existing book data for ${bookId}...`);
      
      // Clear engine cache for this book
      clearEngineCacheFor(bookId);
      
      // Delete vector store index
      await deleteBookVectorStore(bookId);
      
      // Delete exercises
      await exerciseRepository.deleteByBookId(bookId);
      
      // Delete book (cascades to chapters and pages)
      await bookRepository.delete(bookId);
    }

    // Create new book record
    const book = await bookRepository.create({
      id: bookId,
      name: bookName,
      code: bookCode,
      metadata: {
        totalChapters: structure.chapters.length,
        totalPages: structure.pages.length,
      },
    });

    // Create chapters
    console.log(`Creating ${structure.chapters.length} chapters...`);
    for (const chapter of structure.chapters) {
      await chapterRepository.create(chapter);
    }

    // Create pages
    console.log(`Creating ${structure.pages.length} pages...`);
    for (const page of structure.pages) {
      await pageRepository.create(page);
    }

    // Process definition files and extract exercises
    console.log(`Processing definition files...`);
    const processedPages = await processDefinitionFiles(
      structure.pages,
      bookId,
      bookName,
      structure.chapters.map((c) => ({ id: c.id, chapterNumber: c.chapterNumber }))
    );

    // Initialize vector store for this book
    await initializeBookVectorStore(bookId);

    // Collect all exercises with book context
    const allExercises: Array<{ id: string; exercise: any; text: string }> = [];
    let totalExercisesExtracted = 0;

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
            // Parse and validate with Zod schema
            ExerciseSchema.parse(exercise);
            
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
            console.warn(`[upload] Invalid exercise structure for ${exercise.id}:`, validationError);
            // Skip invalid exercises but continue processing
            continue;
          }
        }
      }
    }

    // Upsert exercises to vector store in batches
    if (allExercises.length > 0) {
      console.log(`Indexing ${allExercises.length} exercises in vector store...`);
      await upsertExercises(allExercises, bookId);
    }

    return NextResponse.json({
      success: true,
      data: {
        book,
        summary: {
          chaptersCreated: structure.chapters.length,
          pagesCreated: structure.pages.length,
          pagesProcessed: processedPages.filter((p) => !p.error).length,
          pagesWithErrors: processedPages.filter((p) => p.error).length,
          exercisesExtracted: totalExercisesExtracted,
          exercisesIndexed: allExercises.length,
        },
      },
    });
  } catch (error) {
    console.error("Book upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to process book",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

