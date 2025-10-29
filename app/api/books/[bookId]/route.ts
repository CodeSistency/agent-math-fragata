import { NextRequest, NextResponse } from "next/server";
import { bookRepository } from "@/lib/db/repositories";
import { chapterRepository } from "@/lib/db/repositories";
import { exerciseRepository } from "@/lib/db/repositories";
import { deleteBookVectorStore } from "@/lib/rag/vector-store";
import { initializeDatabase } from "@/lib/db/init";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * GET /api/books/[bookId] - Get book details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    await initializeDatabase();
    const book = await bookRepository.findById(params.bookId);
    
    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    // Get chapters count and pages count
    const chapters = await chapterRepository.findByBookId(params.bookId);
    let totalPages = 0;
    for (const chapter of chapters) {
      totalPages += chapter.totalPages;
    }

    return NextResponse.json({
      success: true,
      data: {
        ...book,
        chaptersCount: chapters.length,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Book API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch book",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/books/[bookId] - Delete book and all related data
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    await initializeDatabase();
    const book = await bookRepository.findById(params.bookId);
    
    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    // Delete vector store index for this book
    await deleteBookVectorStore(params.bookId);

    // Delete exercises for this book (will cascade from pages, but let's be explicit)
    await exerciseRepository.deleteByBookId(params.bookId);

    // Delete book (cascades to chapters and pages)
    await bookRepository.delete(params.bookId);

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Book deletion error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete book",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

