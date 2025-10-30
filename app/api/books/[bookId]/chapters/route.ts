import { NextRequest, NextResponse } from "next/server";
import { chapterRepository } from "@/lib/db/repositories";
import { bookRepository } from "@/lib/db/repositories";
import { initializeDatabase } from "@/lib/db/init";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * GET /api/books/[bookId]/chapters - List chapters for a book
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> | { bookId: string } }
) {
  try {
    await initializeDatabase();
    
    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = await Promise.resolve(params);
    const bookId = decodeURIComponent(resolvedParams.bookId);
    
    // Verify book exists
    const book = await bookRepository.findById(bookId);
    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    const chapters = await chapterRepository.findByBookId(bookId);

    return NextResponse.json({
      success: true,
      data: chapters,
    });
  } catch (error) {
    console.error("Chapters API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch chapters",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

