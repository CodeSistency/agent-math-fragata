import { NextRequest, NextResponse } from "next/server";
import { pageRepository } from "@/lib/db/repositories";
import { chapterRepository } from "@/lib/db/repositories";
import { processImageToExercises } from "@/lib/ocr/processor";
import { upsertExercises } from "@/lib/rag/vector-store";
import { exerciseRepository } from "@/lib/db/repositories";
import { initializeBookVectorStore } from "@/lib/rag/vector-store";
import { initializeDatabase } from "@/lib/db/init";
import type { Exercise } from "@/types/exercise";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * GET /api/chapters/[chapterId]/pages - List pages for a chapter
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { chapterId: string } }
) {
  try {
    await initializeDatabase();
    // Verify chapter exists
    const chapter = await chapterRepository.findById(params.chapterId);
    if (!chapter) {
      return NextResponse.json(
        { error: "Chapter not found" },
        { status: 404 }
      );
    }

    const pages = await pageRepository.findByChapterId(params.chapterId);

    return NextResponse.json({
      success: true,
      data: pages,
    });
  } catch (error) {
    console.error("Pages API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch pages",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/chapters/[chapterId]/pages - Upload files to specific pages
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { chapterId: string } }
) {
  try {
    await initializeDatabase();
    // Verify chapter exists
    const chapter = await chapterRepository.findById(params.chapterId);
    if (!chapter) {
      return NextResponse.json(
        { error: "Chapter not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("images") as File[];
    const pageId = formData.get("pageId") as string;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    if (!pageId) {
      return NextResponse.json(
        { error: "pageId is required" },
        { status: 400 }
      );
    }

    // Verify page exists
    const page = await pageRepository.findById(pageId);
    if (!page || page.chapterId !== params.chapterId) {
      return NextResponse.json(
        { error: "Page not found or doesn't belong to this chapter" },
        { status: 404 }
      );
    }

    // Initialize vector store for this book
    await initializeBookVectorStore(chapter.bookId);

    // Process images in parallel
    const allExercises: Array<{ id: string; exercise: Exercise; text: string }> = [];
    
    const processImagePromises = files.map(async (file) => {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const exercises = await processImageToExercises(buffer, file.name);

        return exercises.map((exercise) => {
          // Add book context to exercise
          const exerciseWithContext: Exercise = {
            ...exercise,
            metadata: {
              ...exercise.metadata,
              bookId: chapter.bookId,
              chapterId: params.chapterId,
              chapterNumber: chapter.chapterNumber,
              pageId: page.id,
              pageNumber: page.pageNumber,
              variant: page.variant,
            },
          };

          const text = [
            exercise.tema,
            exercise.subtema || "",
            exercise.enunciado,
            exercise.solucion,
          ]
            .filter(Boolean)
            .join(" ");

          return {
            id: exerciseWithContext.id,
            exercise: exerciseWithContext,
            text,
          };
        });
      } catch (error) {
        console.error(`Error processing image ${file.name}:`, error);
        return [];
      }
    });

    const results = await Promise.all(processImagePromises);
    allExercises.push(...results.flat());

    if (allExercises.length === 0) {
      return NextResponse.json(
        { error: "No exercises extracted from images" },
        { status: 400 }
      );
    }

    // Upsert exercises to vector store
    await upsertExercises(allExercises, chapter.bookId);

    // Save exercises to database
    for (const { exercise } of allExercises) {
      await exerciseRepository.create({
        ...exercise,
        pageId: page.id,
        bookId: chapter.bookId,
        chapterId: params.chapterId,
      });
    }

    return NextResponse.json({
      success: true,
      count: allExercises.length,
      exercises: allExercises.map((e) => e.exercise),
    });
  } catch (error) {
    console.error("Pages upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to process pages",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

