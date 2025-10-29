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
  { params }: { params: { bookId: string } }
) {
  try {
    await initializeDatabase();
    // Verify book exists
    const book = await bookRepository.findById(params.bookId);
    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    const chapters = await chapterRepository.findByBookId(params.bookId);

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

