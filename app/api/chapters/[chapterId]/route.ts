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
  { params }: { params: Promise<{ chapterId: string }> | { chapterId: string } }
) {
  try {
    await initializeDatabase();
    
    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = await Promise.resolve(params);
    const chapterId = decodeURIComponent(resolvedParams.chapterId);
    
    console.log(`[GET /api/chapters/${chapterId}] Looking for chapter with ID: "${chapterId}"`);
    
    const chapter = await chapterRepository.findById(chapterId);
    
    if (!chapter) {
      console.log(`[GET /api/chapters/${chapterId}] Chapter not found in database`);
      return NextResponse.json(
        { 
          error: "Chapter not found",
          message: `Chapter with ID "${chapterId}" not found`,
        },
        { status: 404 }
      );
    }

    // Get pages for this chapter
    const pages = await pageRepository.findByChapterId(chapterId);

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

