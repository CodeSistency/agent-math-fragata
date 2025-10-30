import { NextRequest, NextResponse } from "next/server";
import { processImageToExercises } from "@/lib/ocr/processor";
import { upsertExercises, initializeVectorStore, initializeBookVectorStore } from "@/lib/rag/vector-store";
import { initializeDatabase } from "@/lib/db/init";
import { exerciseRepository } from "@/lib/db/repositories";
import { Exercise } from "@/types/exercise";
import { rateLimit, getClientIdentifier } from "@/lib/middleware/rate-limit";
import { buildEmbeddingText } from "@/lib/rag/rag-helpers";

export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds for OCR processing

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 10;

export async function POST(request: NextRequest) {
  try {
    // Ensure database is initialized
    await initializeDatabase();
    
    // Rate limiting: 5 upload requests per hour per IP (OCR is expensive)
    const clientId = getClientIdentifier(request);
    const rateLimitResult = rateLimit(clientId, { limit: 5, window: 3600000 });
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: "Too many upload requests. Please try again later.",
          resetAt: rateLimitResult.resetAt,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.resetAt).toISOString(),
            "Retry-After": Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("images") as File[];

    // Extract optional metadata from form data
    const bookId = formData.get("bookId") as string | null;
    const chapterId = formData.get("chapterId") as string | null;
    const pageId = formData.get("pageId") as string | null;
    const tema = formData.get("tema") as string | null;
    const subtema = formData.get("subtema") as string | null;
    const dificultad = (formData.get("dificultad") as "básica" | "media" | "avanzada") || "media";

    // Initialize vector store - use book-specific if bookId provided
    if (bookId) {
      await initializeBookVectorStore(bookId);
    } else {
      await initializeVectorStore();
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    // Validate file count
    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} files allowed` },
        { status: 400 }
      );
    }

    // Validate file sizes
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds maximum size of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
          { status: 400 }
        );
      }
      // Validate file type
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: `File ${file.name} is not an image` },
          { status: 400 }
        );
      }
    }

    const allExercises: Array<{ id: string; exercise: Exercise; text: string }> = [];

    // Process images in parallel for better performance
    const processImagePromises = files.map(async (file) => {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const imageRef = file.name;

        // Extract exercises from image
        const exercises = await processImageToExercises(buffer, imageRef);

        // Apply metadata to exercises if provided
        const exercisesWithMetadata = exercises.map((exercise) => {
          // Merge provided metadata with exercise metadata
          const exerciseWithMetadata: Exercise = {
            ...exercise,
            tema: tema || exercise.tema,
            subtema: subtema || exercise.subtema,
            dificultad: dificultad || exercise.dificultad,
            metadata: {
              ...exercise.metadata,
              bookId: bookId || exercise.metadata?.bookId,
              chapterId: chapterId || exercise.metadata?.chapterId,
              pageId: pageId || exercise.metadata?.pageId,
            },
          };

          return exerciseWithMetadata;
        });

        // Prepare exercises for vector store
        return exercisesWithMetadata.map((exercise) => {
          // Usar buildEmbeddingText para incluir información de artefactos
          const text = buildEmbeddingText(exercise);

          return {
            id: exercise.id,
            exercise,
            text,
          };
        });
      } catch (error) {
        console.error(`Error processing image ${file.name}:`, error);
        // Return empty array for failed images
        return [];
      }
    });

    // Wait for all images to be processed
    const results = await Promise.all(processImagePromises);
    
    // Flatten results into single array
    allExercises.push(...results.flat());

    if (allExercises.length === 0) {
      return NextResponse.json(
        { error: "No exercises extracted from images" },
        { status: 400 }
      );
    }

    // Store exercises in vector database (with book context if provided)
    await upsertExercises(allExercises, bookId || undefined);

    // Save exercises to database with metadata
    for (const { exercise } of allExercises) {
      await exerciseRepository.create({
        ...exercise,
        pageId: pageId || undefined,
        bookId: bookId || undefined,
        chapterId: chapterId || undefined,
      });
    }

    return NextResponse.json({
      success: true,
      count: allExercises.length,
      exercises: allExercises.map((e) => e.exercise),
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to process images",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}



