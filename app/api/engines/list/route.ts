import { NextRequest, NextResponse } from "next/server";
import { discoverAllEngines } from "@/lib/books/engine-discovery";
import { bookRepository } from "@/lib/db/repositories";
import { initializeDatabase } from "@/lib/db/init";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * GET /api/engines/list - List all available engines
 * Optional query params: bookId, chapterId
 */
export async function GET(request: NextRequest) {
  try {
    await initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");
    const chapterId = searchParams.get("chapterId");

    let engines: any[] = [];

    if (bookId && chapterId) {
      // Get engines for specific book/chapter
      const { discoverEngines } = await import("@/lib/books/engine-discovery");
      engines = await discoverEngines(bookId, chapterId);
    } else if (bookId) {
      // Get all engines for a book
      engines = await discoverAllEngines(bookId);
    } else {
      // Get engines from all books
      const books = await bookRepository.findAll();
      
      for (const book of books) {
        try {
          const bookEngines = await discoverAllEngines(book.id);
          engines.push(...bookEngines);
        } catch (err) {
          console.warn(`Failed to load engines for book ${book.id}:`, err);
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: engines,
    });
  } catch (error) {
    console.error("List Engines API error:", error);
    return NextResponse.json(
      {
        error: "Failed to list engines",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}



