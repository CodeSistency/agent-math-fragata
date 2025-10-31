import { NextRequest, NextResponse } from "next/server";
import { parseBookStructure, validateBookStructure } from "@/lib/books/parser";
import { processDefinitionFiles } from "@/lib/books/definition-processor";
import { clearEngineCacheFor } from "@/lib/books/engine-discovery";
import { bookRepository, chapterRepository, pageRepository, exerciseRepository } from "@/lib/db/repositories";
import { VectorStoreV2 } from "@/lib/rag/vector-store-v2";
import { initializeDatabase } from "@/lib/db/init";
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { buildEmbeddingText } from "@/lib/rag/rag-helpers";
import { ExerciseSchema } from "@/types/exercise";
import { UnifiedBookParser, type PageContext } from "@/lib/books/unified-parser";
import { ExerciseValidator } from "@/lib/validation/exercise-validator";
import { TopicInference } from "@/lib/metadata/topic-inference";
import { EngineInferenceV2 } from "@/lib/books/engine-inference-v2";
import { SyncSummaryLogger } from "@/lib/logging/sync-summary-logger";
import { createHash } from "crypto";
import { withTransaction } from "@/lib/db/transaction";
import { handleAPIError, DatabaseError, VectorStoreError } from "@/lib/errors/api-errors";
import { withRetry } from "@/lib/utils/retry";
import { validateBookId } from "@/lib/validation/schemas";

export const runtime = "nodejs";
export const maxDuration = 600; // 10 minutes for multiple books

/**
 * Enhanced book synchronization API with robust error handling
 * Addresses all critical issues identified in the original implementation
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  console.log(`[SyncV2] Starting book synchronization at ${new Date().toISOString()}`);
  
  try {
    await initializeDatabase();
    
    // Initialize global session for logging
    const globalSessionId = SyncSummaryLogger.initializeSession('global-sync');
    // Get request body for potential options
    const body = await request.json().catch(() => ({}));
    const { force = false } = body;
    
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
      let bookId: string;
      
      try {
        // Validate book ID
        bookId = validateBookId(item);
      } catch (validationError: any) {
        console.warn(`[SyncV2] Skipping ${item}: ${validationError.message}`);
        SyncSummaryLogger.logFileProcessing(globalSessionId, item, {
          success: false,
          error: validationError.message,
          phase: 'parsing'
        });
        continue;
      }
      
      // Skip if not a directory
      if (!(await isDirectory(bookPath))) {
        console.log(`[SyncV2] Skipping ${bookId}: not a directory`);
        continue;
      }

      // Check if it's a valid book structure (has book/definitions/)
      const bookBookPath = join(bookPath, "book");
      const definitionsPath = join(bookBookPath, "definitions");
      
      if (!existsSync(bookBookPath) || !(await isDirectory(bookBookPath))) {
        console.log(`[SyncV2] Skipping ${bookId}: no book/ directory found`);
        continue;
      }

      if (!existsSync(definitionsPath) || !(await isDirectory(definitionsPath))) {
        console.log(`[SyncV2] Skipping ${bookId}: no book/definitions/ directory found`);
        continue;
      }

      try {
        console.log(`[SyncV2] Processing book: ${bookId}...`);
        
        // Parse book structure using existing parser
        const structure = await withRetry(() => parseBookStructure(bookPath, bookId));

        // Validate structure
        const validation = validateBookStructure(structure);
        if (!validation.valid) {
          const errorMessage = `Invalid structure: ${validation.errors.join(", ")}`;
          processedBooks.push({
            bookId,
            success: false,
            error: errorMessage,
          });
          
          SyncSummaryLogger.logFileProcessing(globalSessionId, bookId, {
            success: false,
            error: errorMessage,
            phase: 'parsing'
          });
          continue;
        }

        // Process book within a transaction
        await withTransaction(async (tx) => {
          // Check if book already exists
          const existingBook = await bookRepository.findById(bookId);
          
          // If book exists, delete old data (overwrite mode)
          if (existingBook && !force) {
            console.log(`[SyncV2] Deleting existing book data for ${bookId}...`);
            
            // Clear engine cache for this book (outside transaction)
            clearEngineCacheFor(bookId);
            
            // Delete vector store index using enhanced version (outside transaction)
            try {
              await withRetry(() => VectorStoreV2.deleteBookVectorStore(bookId));
            } catch (deleteError) {
              console.warn(`[SyncV2] Vector store deletion failed for ${bookId}:`, deleteError);
              // Continue anyway - the new index creation will handle it
            }
            
            // Delete in correct order (respecting foreign keys)
            await tx.execute("DELETE FROM exercises WHERE book_id = ?", [bookId]);
            await tx.execute("DELETE FROM pages WHERE chapter_id IN (SELECT id FROM chapters WHERE book_id = ?)", [bookId]);
            await tx.execute("DELETE FROM chapters WHERE book_id = ?", [bookId]);
            await tx.execute("DELETE FROM books WHERE id = ?", [bookId]);
          }

          // Create new book record
          const now = new Date().toISOString();
          await tx.execute(`
            INSERT INTO books (id, name, code, version, metadata, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `, [
            bookId,
            bookId, // Use bookId as name, can be improved later
            bookId,
            null,
            JSON.stringify({
              totalChapters: structure.chapters.length,
              totalPages: structure.pages.length,
              syncVersion: "v2.0",
              processedAt: now,
            }),
            now,
            now
          ]);

          // Create chapters
          for (const chapter of structure.chapters) {
            await tx.execute(`
              INSERT INTO chapters (id, book_id, chapter_number, name, total_pages, metadata, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [
              chapter.id,
              chapter.bookId,
              chapter.chapterNumber,
              chapter.name || null,
              chapter.totalPages,
              chapter.metadata ? JSON.stringify(chapter.metadata) : null,
              chapter.createdAt
            ]);
          }

          // Create pages
          for (const page of structure.pages) {
            await tx.execute(`
              INSERT INTO pages (id, chapter_id, page_number, variant, content, file_path, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [
              page.id,
              page.chapterId,
              page.pageNumber,
              page.variant || 0,
              null, // Content will be updated later
              page.filePath,
              page.createdAt
            ]);
          }
        });

        // Process definition files using unified parser (outside transaction)
        const processedPages = await withRetry(() => processDefinitionFilesV2(
          structure.pages,
          bookId,
          bookId, // Use bookId as name
          structure.chapters.map((c) => ({ id: c.id, chapterNumber: c.chapterNumber })),
          globalSessionId // Pass sessionId
        ));

        // Update pages with processed content (in batches)
        await updatePagesInBatches(processedPages);

        // Initialize vector store for this book
        await withRetry(() => upsertExercisesV2(processedPages, bookId, globalSessionId));

        // Collect statistics
        const stats = collectSyncStatistics(processedPages, structure.pages);
        
        processedBooks.push({
          bookId,
          success: true,
          summary: stats,
        });

        console.log(`[SyncV2] Successfully processed book: ${bookId}`, stats);
        
        // Log successful book processing
        SyncSummaryLogger.logFileProcessing(globalSessionId, bookId, {
          success: true,
          processingTime: Date.now() - startTime,
          format: 'processed'
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`[SyncV2] Error processing book ${bookId}:`, error);
        processedBooks.push({
          bookId,
          success: false,
          error: errorMessage,
        });
        
        SyncSummaryLogger.logFileProcessing(globalSessionId, bookId, {
          success: false,
          error: errorMessage,
          phase: 'database'
        });
      }
    }

    const endTime = Date.now();
    const duration = endTime - startTime;
    const successful = processedBooks.filter((b) => b.success).length;
    const failed = processedBooks.filter((b) => !b.success).length;
    
    // Generate comprehensive summary
    let summary = null;
    try {
      summary = SyncSummaryLogger.generateSummary(globalSessionId);
      SyncSummaryLogger.exportToFile(globalSessionId);
    } catch (error) {
      console.warn('[SyncV2] Failed to generate summary:', error);
      // Continue without summary - non-critical
    }
    
    return NextResponse.json({
      success: true,
      data: {
        totalProcessed: processedBooks.length,
        successful,
        failed,
        duration: `${duration}ms`,
        books: processedBooks,
        summary: summary, // Include detailed summary in response
      },
    });
  } catch (error) {
    console.error("[SyncV2] Sync error:", error);
    return handleAPIError(error);
  }
}

/**
 * Update pages in batches to avoid memory issues
 */
async function updatePagesInBatches(
  processedPages: Array<{
    page: any;
    content: Record<string, any>;
    exercises: any[];
    error?: string;
  }>
): Promise<void> {
  const batchSize = 50;
  
  for (let i = 0; i < processedPages.length; i += batchSize) {
    const batch = processedPages.slice(i, i + batchSize);
    
    for (const processed of batch) {
      if (processed.error) {
        console.warn(`[SyncV2] Skipping page ${processed.page.id} due to error: ${processed.error}`);
        continue;
      }
      
      // Update page with processed content
      if (processed.content && Object.keys(processed.content).length > 0) {
        try {
          await pageRepository.update(processed.page.id, {
            content: processed.content,
            processedAt: new Date().toISOString(),
          });
        } catch (error) {
          console.error(`[SyncV2] Failed to update page ${processed.page.id}:`, error);
        }
      }
    }
    
    // Small delay between batches
    if (i + batchSize < processedPages.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

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
 * Enhanced definition file processing with unified parser
 */
async function processDefinitionFilesV2(
  pages: any[],
  bookId: string,
  bookName: string,
  chapters: Array<{ id: string; chapterNumber: number }>,
  sessionId: string // Add sessionId parameter
): Promise<Array<{
  page: any;
  content: Record<string, any>;
  exercises: any[];
  error?: string;
}>> {
  const results: Array<{
    page: any;
    content: Record<string, any>;
    exercises: any[];
    error?: string;
  }> = [];
  
  // Process each page with unified parser
  for (const page of pages) {
    const chapter = chapters.find((c) => c.id === page.chapterId);
    if (!chapter) {
      results.push({
        page,
        content: {},
        exercises: [],
        error: `Chapter ${page.chapterId} not found`,
      });
      continue;
    }

    const pageContext: PageContext = {
      bookId,
      chapterId: page.chapterId,
      chapterNumber: chapter.chapterNumber,
      pageId: page.id,
      pageNumber: page.pageNumber,
      variant: page.variant,
      filePath: page.filePath,
    };

    try {
      console.log(`[SyncV2] Processing page ${page.id} with unified parser...`);
      
      // Use unified parser for both MG and NV formats
      const startTime = Date.now();
      const parsed = await UnifiedBookParser.parseDefinitionFile(page.filePath, pageContext);
      const processingTime = Date.now() - startTime;
      
      if (parsed.format === "unknown") {
        results.push({
          page,
          content: {},
          exercises: [],
          error: "Unknown format detected",
        });
        
        // Log unknown format detection
        // Note: sessionId not available here, this is a known limitation
        // TODO: Pass sessionId through the call chain properly
        console.warn(`[SyncV2] Unknown format detected for page ${page.id}`);
        
        console.warn(`[SyncV2] Unknown format detected for page ${page.id}`);
        continue;
      }
      
      // Log successful parsing
      // Note: sessionId not available here, this is a known limitation
      // TODO: Pass sessionId through the call chain properly
      console.log(`[SyncV2] Successfully parsed page ${page.id} with format ${parsed.format} in ${processingTime}ms`);
      
      console.log(`[SyncV2] Successfully parsed page ${page.id} with format ${parsed.format}`);

      // Validate exercises using enhanced validator
      const validation = ExerciseValidator.validateExercises(parsed.exercises);
      if (!validation.summary.valid) {
        console.warn(`[SyncV2] Validation errors for page ${page.id}:`, validation.details);
        // Continue with valid exercises only
        const validExercises = parsed.exercises.filter((_, index) => 
          validation.details[index]?.result?.valid
        );
        
        const hasValidationErrors = validation.summary.errors.length > 0;
        // Attach artifactDefinition to each exercise
        const artifactDefinition = { defBoards: parsed.defBoards, rDef: parsed.rDef };
        const enrichedExercises = validExercises.map((ex) => ({
          ...ex,
          metadata: { ...ex.metadata, artifactDefinition }
        }));
        results.push({
          page,
          content: {
            defBoards: parsed.defBoards,
            rDef: parsed.rDef,
            allDef: parsed.allDef,
            format: parsed.format,
            metadata: parsed.metadata,
          },
          exercises: enrichedExercises,
          error: hasValidationErrors
            ? `Found ${validation.summary.errors.length} validation errors`
            : undefined,
        });
        
        // Log validation results
        if (hasValidationErrors) {
          // Note: sessionId not available here, this is a known limitation
          // TODO: Pass sessionId through the call chain properly
          console.warn(`[SyncV2] Validation errors for page ${page.id}: ${validation.summary.errors.length} errors found`);
        }
      } else {
        const artifactDefinition = { defBoards: parsed.defBoards, rDef: parsed.rDef };
        const enrichedExercises = parsed.exercises.map((ex: any) => ({
          ...ex,
          metadata: { ...ex.metadata, artifactDefinition }
        }));
        results.push({
          page,
          content: {
            defBoards: parsed.defBoards,
            rDef: parsed.rDef,
            allDef: parsed.allDef,
            format: parsed.format,
            metadata: parsed.metadata,
          },
          exercises: enrichedExercises,
        });
      }

      // Update page with processed content
      if ((parsed as any).content && Object.keys((parsed as any).content).length > 0) {
        await pageRepository.update(page.id, {
          content: (parsed as any).content,
          processedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error(`[SyncV2] Error processing page ${page.id}:`, error);
      results.push({
        page,
        content: {},
        exercises: [],
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return results;
}

/**
 * Enhanced exercise processing with vector store v2
 */
async function upsertExercisesV2(
  processedPages: Array<{
    page: any;
    content: Record<string, any>;
    exercises: any[];
    error?: string;
  }>,
  bookId: string,
  sessionId: string // Add sessionId parameter
): Promise<void> {
  // Collect all exercises with enhanced metadata
  const allExercises: Array<{ id: string; exercise: any; text: string }> = [];
  let totalExercisesExtracted = 0;

  for (const processed of processedPages) {
    if (processed.error) {
      console.warn(`[SyncV2] Skipping page ${processed.page.id} due to error: ${processed.error}`);
      continue;
    }

    // Add exercises from this page
    for (const exercise of processed.exercises) {
      totalExercisesExtracted++;
      
      // Enhanced topic inference
      const topicInference = TopicInference.inferTopic(
        exercise.enunciado || "",
        exercise.metadata?.chapterNumber || 1,
        bookId
      );
      
      // Enhanced engine inference with logging
      const engineInferenceStart = Date.now();
      const engineInference = await EngineInferenceV2.inferEngine(
        (processed as any).content?.defBoards || {},
        (processed as any).content?.rDef || {},
        {
          bookId,
          chapterId: exercise.metadata?.chapterId || "",
          chapterNumber: exercise.metadata?.chapterNumber || 1,
          pageId: exercise.metadata?.pageId || "",
          pageNumber: (exercise.metadata as any)?.pageNumber || 1,
        }
      );
      const engineInferenceTime = Date.now() - engineInferenceStart;
      
      // Log engine inference with fallback detection
      const isFallback = engineInference === 'multi-board';
      // Note: globalSessionId not accessible here - this is a known limitation
      // TODO: Refactor to pass sessionId through call chain
      console.log(`[SyncV2] Engine inference for exercise ${exercise.id}: ${engineInference} (${engineInferenceTime}ms)${isFallback ? ' [FALLBACK]' : ''}`);

      // Attach artifactDefinition into metadata when available
      const artifactDefinition = ((processed as any).content?.defBoards || (processed as any).content?.rDef)
        ? {
            defBoards: (processed as any).content?.defBoards,
            rDef: (processed as any).content?.rDef,
          }
        : undefined;

      const exerciseWithArtifact = {
        ...exercise,
        tema: topicInference.topic,
        subtema: topicInference.subtopic,
        metadata: {
          ...exercise.metadata,
          bookId: bookId,
          bookName: bookId,
          suggestedEngine: engineInference,
          topicInference: topicInference,
          ...(artifactDefinition ? { artifactDefinition } : {}),
        }
      };

      // Build enhanced embedding text
      const embeddingText = buildEmbeddingText(exerciseWithArtifact as any);

      allExercises.push({
        id: exercise.id,
        exercise: exerciseWithArtifact,
        text: embeddingText,
      });
    }
  }

  if (allExercises.length > 0) {
    console.log(`[SyncV2] Upserting ${allExercises.length} exercises for book ${bookId}`);
    
    let vectorStoreStart = 0;
    try {
      vectorStoreStart = Date.now();
      await VectorStoreV2.upsertExercises(allExercises, bookId);
      const vectorStoreTime = Date.now() - vectorStoreStart;
      
      // Log successful vector store processing
      SyncSummaryLogger.logFileProcessing(sessionId, `vector-store-${bookId}`, {
        success: true,
        phase: 'embedding',
        processingTime: vectorStoreTime,
        embeddingCorrected: undefined
      });
      
      console.log(`[SyncV2] Successfully processed vector store for book ${bookId} in ${vectorStoreTime}ms`);
      // Quick retrieval smoke test: query similar to first exercise text
      try {
        const sampleText = allExercises[0]?.text || "";
        if (sampleText) {
          const results = await VectorStoreV2.querySimilarExercises(sampleText, { topK: 3, bookId });
          console.log(`[SyncV2] Retrieval sample (${bookId}):`, results.map(r => ({ score: r.score, tema: r.exercise.tema, id: (r as any).exercise?.id })).slice(0,3));
        }
      } catch (e) {
        console.warn(`[SyncV2] Retrieval sample failed for ${bookId}:`, e);
      }
      
    } catch (caughtError) {
      const vectorError = caughtError as Error | null;
      const vectorStoreTime = Date.now() - vectorStoreStart;
      
      console.error(`[SyncV2] Error upserting exercises for ${bookId}:`, vectorError);
      
      // Log vector store processing with error tracking
      const hadDimensionIssues = vectorError && (vectorError.message.includes('12288') || vectorError.message.includes('dimension'));
      SyncSummaryLogger.logFileProcessing(sessionId, `vector-store-${bookId}`, {
        success: false,
        error: vectorError ? vectorError.message : undefined,
        phase: 'embedding',
        processingTime: vectorStoreTime,
        embeddingCorrected: hadDimensionIssues || undefined
      });
      
      // Do not fail the entire sync for vector store errors
      const isRetryable = vectorError && (
        vectorError.message.includes('quota') ||
        vectorError.message.includes('RATE') ||
        vectorError.message.includes('429') ||
        vectorError.message.includes('timeout')
      );
      
      if (!isRetryable) {
        throw vectorError;
      }
    }
  } else {
    console.log(`[SyncV2] No exercises to upsert for book ${bookId}`);
  }
}

/**
 * Collect comprehensive synchronization statistics
 */
function collectSyncStatistics(
  processedPagesData: Array<{
    page: any;
    content: Record<string, any>;
    exercises: any[];
    error?: string;
  }>,
  allPages: any[]
): any {
  const totalPages = allPages.length;
  const processedPagesCount = processedPagesData.filter(p => !p.error).length;
  const pagesWithErrors = processedPagesData.filter(p => p.error).length;
  const totalExercises = processedPagesData.reduce((sum, p) => sum + (p.exercises?.length || 0), 0);
  const exercisesWithArtifacts = processedPagesData.reduce((sum, p) =>
    sum + (p.exercises?.filter(e => e.metadata?.artifactDefinition).length || 0), 0
  );
  
  // Format analysis
  const formatAnalysis = processedPagesData.reduce((acc, p) => {
    const format = p.content?.format || 'unknown';
    acc[format] = (acc[format] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalPages,
    processedPagesData,
    pagesWithErrors,
    totalExercises,
    exercisesWithArtifacts,
    formatDistribution: formatAnalysis,
    processingTime: new Date().toISOString(),
    
    // Validation statistics
    validationStats: ExerciseValidator.getValidationStatus(),
    
    // Performance metrics
    avgExercisesPerPage: totalPages > 0 ? Math.round(totalExercises / totalPages * 10) / 10 : 0,
    artifactCoverage: totalExercises > 0 ? Math.round((exercisesWithArtifacts / totalExercises) * 100) : 0,
  };
}