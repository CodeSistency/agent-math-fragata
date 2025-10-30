import { NextRequest, NextResponse } from "next/server";
import { discoverEngines } from "@/lib/books/engine-discovery";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * GET /api/engines/discover?bookId=X&chapterId=Y - Discover engines for a chapter
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");
    const chapterId = searchParams.get("chapterId");

    if (!bookId || !chapterId) {
      return NextResponse.json(
        { error: "bookId and chapterId are required" },
        { status: 400 }
      );
    }

    const engines = await discoverEngines(bookId, chapterId);

    return NextResponse.json({
      success: true,
      data: engines,
    });
  } catch (error) {
    console.error("Error discovering engines:", error);
    return NextResponse.json(
      {
        error: "Failed to discover engines",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}



