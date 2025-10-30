import { NextRequest, NextResponse } from "next/server";
import { pageRepository } from "@/lib/db/repositories";
import { parseDefinitionFileSafe } from "@/lib/books/js-parser-safe";

/**
 * GET /api/pages/[pageId]/parse - Parse definition file safely from server
 * Returns defBoards and rDef without exposing the parsing logic to client
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pageId: string }> | { pageId: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const { pageId } = resolvedParams;

    // Get page from database
    const page = await pageRepository.findById(pageId);
    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    // If page already has content, return it
    if (page.content && (page.content.defBoards || page.content.rDef)) {
      return NextResponse.json({
        success: true,
        data: {
          defBoards: page.content.defBoards || {},
          rDef: page.content.rDef || {},
        },
      });
    }

    // Parse file if filePath exists
    if (page.filePath) {
      const parsed = await parseDefinitionFileSafe(page.filePath);
      
      if (parsed.error) {
        return NextResponse.json(
          { error: parsed.error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          defBoards: parsed.defBoards || {},
          rDef: parsed.rDef || {},
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        defBoards: {},
        rDef: {},
      },
    });
  } catch (error) {
    console.error("Error parsing page definition:", error);
    return NextResponse.json(
      {
        error: "Failed to parse page definition",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
