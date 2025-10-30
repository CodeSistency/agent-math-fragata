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
  { params }: { params: Promise<{ bookId: string }> | { bookId: string } }
) {
  try {
    await initializeDatabase();
    
    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = await Promise.resolve(params);
    const bookId = resolvedParams.bookId;
    
    // Decode bookId in case it's URL encoded
    const decodedBookId = decodeURIComponent(bookId);
    
    console.log(`[GET /api/books/${bookId}] Looking for book with ID: "${decodedBookId}"`);
    
    const book = await bookRepository.findById(decodedBookId);
    
    if (!book) {
      console.log(`[GET /api/books/${bookId}] Book not found in database`);
      // Try to list all books to help debug
      const allBooks = await bookRepository.findAll();
      console.log(`[GET /api/books/${bookId}] Available books:`, allBooks.map(b => b.id));
      
      return NextResponse.json(
        { 
          error: "Book not found",
          message: `Book with ID "${decodedBookId}" not found. Available books: ${allBooks.map(b => b.id).join(", ")}`,
        },
        { status: 404 }
      );
    }

    // Get chapters count and pages count
    const chapters = await chapterRepository.findByBookId(decodedBookId);
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
  { params }: { params: Promise<{ bookId: string }> | { bookId: string } }
) {
  try {
    await initializeDatabase();
    
    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = await Promise.resolve(params);
    const bookId = decodeURIComponent(resolvedParams.bookId);
    
    const book = await bookRepository.findById(bookId);
    
    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    // Delete vector store index for this book
    await deleteBookVectorStore(bookId);

    // Delete exercises for this book (will cascade from pages, but let's be explicit)
    await exerciseRepository.deleteByBookId(bookId);

    // Delete book (cascades to chapters and pages)
    await bookRepository.delete(bookId);

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

