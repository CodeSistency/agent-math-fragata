import { NextRequest, NextResponse } from "next/server";
import { bookRepository } from "@/lib/db/repositories";
import { initializeDatabase } from "@/lib/db/init";
import { BookSchema } from "@/types/book";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * GET /api/books - List all books
 */
export async function GET(request: NextRequest) {
  try {
    await initializeDatabase();
    const books = await bookRepository.findAll();
    
    return NextResponse.json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.error("Books API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch books",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/books - Create a new book (not used for full upload, see /api/books/upload)
 */
export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const body = await request.json();
    
    // Validate input
    const bookData = BookSchema.parse({
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Check if book with same code already exists
    const existing = await bookRepository.findByCode(bookData.code);
    if (existing) {
      return NextResponse.json(
        { error: `Book with code ${bookData.code} already exists` },
        { status: 409 }
      );
    }

    const book = await bookRepository.create(bookData);

    return NextResponse.json({
      success: true,
      data: book,
    }, { status: 201 });
  } catch (error) {
    console.error("Books API error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid book data",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create book",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

