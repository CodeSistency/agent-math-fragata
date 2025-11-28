import { readdir, stat } from "fs/promises";
import { join } from "path";

/**
 * Information about a book discovered in the filesystem
 */
export interface BookInfo {
  id: string; // "MG", "NV", etc.
  path: string; // Relative path from project root: "books/MG/book"
  chapters: string[]; // Chapter IDs: ["cap_0", "cap_1", ...]
}

const BOOKS_ROOT = join(process.cwd(), "books");

/**
 * Scans the books/ directory to discover available books
 * @returns Array of book information
 */
export async function scanBooks(): Promise<BookInfo[]> {
  try {
    const entries = await readdir(BOOKS_ROOT);
    const books: BookInfo[] = [];

    for (const entry of entries) {
      const bookPath = join(BOOKS_ROOT, entry);
      const stats = await stat(bookPath);

      // Only process directories
      if (!stats.isDirectory()) {
        continue;
      }

      // Check if it has a book/ subdirectory (indicating it's a valid book)
      const bookSubdirPath = join(bookPath, "book");
      try {
        const bookSubdirStats = await stat(bookSubdirPath);
        if (!bookSubdirStats.isDirectory()) {
          continue;
        }
      } catch {
        // book/ subdirectory doesn't exist, skip
        continue;
      }

      // Try to get chapters from definitions/ directory
      const definitionsPath = join(bookSubdirPath, "definitions");
      let chapters: string[] = [];

      try {
        const definitionsStats = await stat(definitionsPath);
        if (definitionsStats.isDirectory()) {
          const chapterDirs = await readdir(definitionsPath);
          chapters = chapterDirs
            .filter((dir) => {
              // Filter for directories matching cap_X pattern
              return /^cap_\d+$/.test(dir);
            })
            .sort((a, b) => {
              // Sort numerically: cap_0, cap_1, cap_2, ...
              const numA = parseInt(a.replace("cap_", ""), 10);
              const numB = parseInt(b.replace("cap_", ""), 10);
              return numA - numB;
            });
        }
      } catch {
        // definitions/ doesn't exist, try mobile/view/ as fallback
        const mobileViewPath = join(bookSubdirPath, "mobile", "view");
        try {
          const mobileViewStats = await stat(mobileViewPath);
          if (mobileViewStats.isDirectory()) {
            const chapterDirs = await readdir(mobileViewPath);
            chapters = chapterDirs
              .filter((dir) => {
                return /^cap_\d+$/.test(dir);
              })
              .sort((a, b) => {
                const numA = parseInt(a.replace("cap_", ""), 10);
                const numB = parseInt(b.replace("cap_", ""), 10);
                return numA - numB;
              });
          }
        } catch {
          // Neither definitions/ nor mobile/view/ exists
          // Continue with empty chapters array
        }
      }

      books.push({
        id: entry, // Use directory name as book ID (MG, NV, etc.)
        path: `books/${entry}/book`,
        chapters,
      });
    }

    return books.sort((a, b) => a.id.localeCompare(b.id));
  } catch (error) {
    console.error("[book-scanner] Error scanning books:", error);
    return [];
  }
}

/**
 * Gets information about a specific book
 * @param bookId The book ID (e.g., "MG", "NV")
 * @returns Book info if found, null otherwise
 */
export async function getBookInfo(bookId: string): Promise<BookInfo | null> {
  const books = await scanBooks();
  return books.find((book) => book.id === bookId) || null;
}

/**
 * Checks if a book exists
 * @param bookId The book ID to check
 * @returns True if book exists, false otherwise
 */
export async function bookExists(bookId: string): Promise<boolean> {
  const book = await getBookInfo(bookId);
  return book !== null;
}
















































