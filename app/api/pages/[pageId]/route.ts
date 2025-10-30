import { NextRequest, NextResponse } from "next/server";
import { pageRepository } from "@/lib/db/repositories";
import { exerciseRepository } from "@/lib/db/repositories";
import { initializeDatabase } from "@/lib/db/init";
import { readFile } from "fs/promises";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * GET /api/pages/[pageId] - Get page details with content and exercises
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pageId: string }> | { pageId: string } }
) {
  try {
    await initializeDatabase();
    
    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = await Promise.resolve(params);
    const pageId = decodeURIComponent(resolvedParams.pageId);
    
    console.log(`[GET /api/pages/${pageId}] Looking for page with ID: "${pageId}"`);
    
    const page = await pageRepository.findById(pageId);
    
    if (!page) {
      console.log(`[GET /api/pages/${pageId}] Page not found in database`);
      return NextResponse.json(
        { 
          error: "Page not found",
          message: `Page with ID "${pageId}" not found`,
        },
        { status: 404 }
      );
    }

    // Get exercises for this page
    const exercises = await exerciseRepository.findByPageId(pageId);

    // Load file content if available
    let fileContent: string | null = null;
    try {
      if (page.filePath) {
        fileContent = await readFile(page.filePath, "utf-8");
      }
    } catch (error) {
      console.warn(`Could not read file ${page.filePath}:`, error);
    }

    return NextResponse.json({
      success: true,
      data: {
        ...page,
        fileContent,
        exercises,
        exercisesCount: exercises.length,
      },
    });
  } catch (error) {
    console.error("Page API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch page",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

