import { NextRequest, NextResponse } from "next/server";
import { chapterRepository } from "@/lib/db/repositories";
import { pageRepository } from "@/lib/db/repositories";
import { initializeDatabase } from "@/lib/db/init";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * GET /api/chapters/[chapterId] - Get chapter details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { chapterId: string } }
) {
  try {
    await initializeDatabase();
    const chapter = await chapterRepository.findById(params.chapterId);
    
    if (!chapter) {
      return NextResponse.json(
        { error: "Chapter not found" },
        { status: 404 }
      );
    }

    // Get pages for this chapter
    const pages = await pageRepository.findByChapterId(params.chapterId);

    return NextResponse.json({
      success: true,
      data: {
        ...chapter,
        pages,
      },
    });
  } catch (error) {
    console.error("Chapter API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch chapter",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

