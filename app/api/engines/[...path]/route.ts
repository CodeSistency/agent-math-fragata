import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Serve engine JavaScript files from books directory
 * Path format: MG/book/class/engines/cap_1/heightCurves.js
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> | { path: string[] } }
) {
  try {
    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = await Promise.resolve(params);
    
    // Validate path to prevent directory traversal
    const pathParts = resolvedParams.path;
    
    if (pathParts.length === 0) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 400 }
      );
    }

    // Ensure path starts with a valid book ID
    const bookId = pathParts[0];
    if (!bookId || !/^[A-Z0-9_]+$/.test(bookId)) {
      return NextResponse.json(
        { error: "Invalid book ID" },
        { status: 400 }
      );
    }

    // Build file path
    const relativePath = pathParts.join("/");
    const filePath = join(process.cwd(), "books", relativePath);

    // Security: Ensure the resolved path is within books directory
    const booksDir = join(process.cwd(), "books");
    const resolvedPath = join(booksDir, ...pathParts);
    
    if (!resolvedPath.startsWith(booksDir)) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 400 }
      );
    }

    // Check if file exists
    if (!existsSync(resolvedPath)) {
      return NextResponse.json(
        { error: "Engine file not found" },
        { status: 404 }
      );
    }

    // Ensure it's a JavaScript file
    if (!resolvedPath.endsWith(".js")) {
      return NextResponse.json(
        { error: "Only JavaScript files are allowed" },
        { status: 400 }
      );
    }

    // Read and serve the file
    const content = await readFile(resolvedPath, "utf-8");

    return new NextResponse(content, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error serving engine file:", error);
    return NextResponse.json(
      {
        error: "Failed to serve engine file",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

