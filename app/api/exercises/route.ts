import { NextRequest, NextResponse } from "next/server";
import { listExercises } from "@/lib/rag/vector-store";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 30;

const querySchema = z.object({
  tema: z.string().optional(),
  dificultad: z.enum(["básica", "media", "avanzada"]).optional(),
  bookId: z.string().optional(),
  chapterId: z.string().optional(),
  pageId: z.string().optional(),
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 20)),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const params = querySchema.parse({
      tema: searchParams.get("tema") || undefined,
      dificultad: searchParams.get("dificultad") || undefined,
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
    });

    // Validate pagination params
    if (params.page < 1) {
      return NextResponse.json(
        { error: "Page must be greater than 0" },
        { status: 400 }
      );
    }
    if (params.limit < 1 || params.limit > 100) {
      return NextResponse.json(
        { error: "Limit must be between 1 and 100" },
        { status: 400 }
      );
    }

    try {
      const result = await listExercises({
        tema: params.tema,
        dificultad: params.dificultad,
        bookId: params.bookId,
        chapterId: params.chapterId,
        pageId: params.pageId,
        page: params.page,
        limit: params.limit,
      });

      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (error) {
      // If it's a "no such table" error, return empty result instead of error
      if (error instanceof Error && error.message.includes("no such table")) {
        return NextResponse.json({
          success: true,
          data: {
            exercises: [],
            total: 0,
            page: params.page,
            limit: params.limit,
            totalPages: 0,
          },
        });
      }
      throw error;
    }
  } catch (error) {
    console.error("Exercises API error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to fetch exercises",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

