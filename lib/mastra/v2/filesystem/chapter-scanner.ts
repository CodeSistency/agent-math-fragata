import { readdir, stat } from "fs/promises";
import { join } from "path";
import { getBookInfo } from "./book-scanner";

/**
 * Information about a page in a chapter
 */
export interface PageInfo {
  id: string; // "pag_1", "pag_1_1", etc.
  number: number; // Page number: 1, 2, 3...
  variant?: number; // Variant number: 1 if pag_1_1, undefined if pag_1
  definitionPath?: string; // Path to definition file: "definitions/cap_2/pag_1_1.js"
  viewPath?: string; // Path to HTML view: "mobile/view/cap_2/pag_1_1.html"
}

/**
 * Information about a chapter
 */
export interface ChapterInfo {
  id: string; // "cap_0", "cap_1", etc.
  number: number; // Chapter number: 0, 1, 2...
  pages: PageInfo[];
}

const BOOKS_ROOT = join(process.cwd(), "books");

/**
 * Extracts page number and variant from filename
 * Examples:
 * - "pag_1.js" -> { number: 1, variant: undefined }
 * - "pag_1_1.js" -> { number: 1, variant: 1 }
 * - "pag_10.js" -> { number: 10, variant: undefined }
 * - "pags_1.html" -> { number: 1, variant: undefined }
 * - "pags_1_1.html" -> { number: 1, variant: 1 }
 */
function parsePageFilename(filename: string): { number: number; variant?: number } | null {
  // Remove extension
  const withoutExt = filename.replace(/\.(js|html)$/, "");
  
  // Match pag_X, pag_X_Y, pags_X, or pags_X_Y pattern
  const match = withoutExt.match(/^pags?_(\d+)(?:_(\d+))?$/);
  if (!match) {
    return null;
  }

  const number = parseInt(match[1], 10);
  const variant = match[2] ? parseInt(match[2], 10) : undefined;

  return { number, variant };
}

/**
 * Scans all chapters for a book
 * @param bookId The book ID (e.g., "MG", "NV")
 * @returns Array of chapter information
 */
export async function scanChapters(bookId: string): Promise<ChapterInfo[]> {
  const book = await getBookInfo(bookId);
  if (!book) {
    return [];
  }

  const chapters: ChapterInfo[] = [];
  const bookPath = join(BOOKS_ROOT, bookId, "book");

  // Scan definitions/ directory
  const definitionsPath = join(bookPath, "definitions");
  let chapterDirs: string[] = [];

  try {
    const stats = await stat(definitionsPath);
    if (stats.isDirectory()) {
      chapterDirs = await readdir(definitionsPath);
    }
  } catch {
    // definitions/ doesn't exist, try mobile/view/
    const mobileViewPath = join(bookPath, "mobile", "view");
    try {
      const stats = await stat(mobileViewPath);
      if (stats.isDirectory()) {
        chapterDirs = await readdir(mobileViewPath);
      }
    } catch {
      return []; // No chapters found
    }
  }

  // Filter and sort chapter directories
  chapterDirs = chapterDirs
    .filter((dir) => /^cap_\d+$/.test(dir))
    .sort((a, b) => {
      const numA = parseInt(a.replace("cap_", ""), 10);
      const numB = parseInt(b.replace("cap_", ""), 10);
      return numA - numB;
    });

  // Process each chapter
  for (const chapterDir of chapterDirs) {
    const chapterMatch = chapterDir.match(/^cap_(\d+)$/);
    if (!chapterMatch) {
      continue;
    }

    const chapterNumber = parseInt(chapterMatch[1], 10);
    const chapterId = `${bookId}_${chapterDir}`;

    // Try to get pages from definitions/ first
    const definitionsChapterPath = join(definitionsPath, chapterDir);
    const pages: PageInfo[] = [];
    const pageMap = new Map<string, PageInfo>(); // Map by page id to avoid duplicates

    try {
      const chapterStats = await stat(definitionsChapterPath);
      if (chapterStats.isDirectory()) {
        const files = await readdir(definitionsChapterPath);
        const jsFiles = files.filter((f) => f.endsWith(".js"));

        for (const file of jsFiles) {
          const parsed = parsePageFilename(file);
          if (!parsed) {
            continue;
          }

          const pageId = `${chapterDir}_${file.replace(/\.js$/, "")}`;
          const existing = pageMap.get(pageId);
          
          if (!existing) {
            pageMap.set(pageId, {
              id: pageId,
              number: parsed.number,
              variant: parsed.variant,
              definitionPath: `definitions/${chapterDir}/${file}`,
            });
          } else {
            // Update existing with definition path
            existing.definitionPath = `definitions/${chapterDir}/${file}`;
          }
        }
      }
    } catch {
      // definitions chapter path doesn't exist
    }

    // Also check mobile/view/ for HTML files
    const mobileViewChapterPath = join(bookPath, "mobile", "view", chapterDir);
    try {
      const chapterStats = await stat(mobileViewChapterPath);
      if (chapterStats.isDirectory()) {
        const files = await readdir(mobileViewChapterPath);
        const htmlFiles = files.filter((f) => f.endsWith(".html"));

        for (const file of htmlFiles) {
          const parsed = parsePageFilename(file);
          if (!parsed) {
            continue;
          }

          const pageId = `${chapterDir}_${file.replace(/\.html$/, "")}`;
          const existing = pageMap.get(pageId);
          
          if (!existing) {
            pageMap.set(pageId, {
              id: pageId,
              number: parsed.number,
              variant: parsed.variant,
              viewPath: `mobile/view/${chapterDir}/${file}`,
            });
          } else {
            // Update existing with view path
            existing.viewPath = `mobile/view/${chapterDir}/${file}`;
          }
        }
      }
    } catch {
      // mobile/view chapter path doesn't exist
    }

    // Convert map to array and sort by page number, then variant
    const sortedPages = Array.from(pageMap.values()).sort((a, b) => {
      if (a.number !== b.number) {
        return a.number - b.number;
      }
      const variantA = a.variant ?? 0;
      const variantB = b.variant ?? 0;
      return variantA - variantB;
    });

    chapters.push({
      id: chapterId,
      number: chapterNumber,
      pages: sortedPages,
    });
  }

  return chapters;
}

/**
 * Gets information about a specific chapter
 * @param bookId The book ID
 * @param chapterId The chapter ID (e.g., "MG_cap_1" or "cap_1")
 * @returns Chapter info if found, null otherwise
 */
export async function getChapterInfo(
  bookId: string,
  chapterId: string
): Promise<ChapterInfo | null> {
  // Normalize chapterId: remove bookId prefix if present
  let normalizedChapterId = chapterId;
  if (chapterId.includes("_")) {
    const parts = chapterId.split("_");
    if (parts.length >= 3 && parts[0] === bookId) {
      // Format: MG_cap_1
      normalizedChapterId = parts.slice(1).join("_"); // cap_1
    }
  }

  const chapters = await scanChapters(bookId);
  return (
    chapters.find((chapter) => {
      // Match by full chapterId or just the cap_X part
      return (
        chapter.id === chapterId ||
        chapter.id === `${bookId}_${normalizedChapterId}` ||
        chapter.id.endsWith(`_${normalizedChapterId}`)
      );
    }) || null
  );
}

/**
 * Finds all pages with a given page number (handles ambiguity)
 * @param bookId The book ID
 * @param pageNumber The page number to search for
 * @returns Array of page info from different chapters
 */
export async function findPagesByNumber(
  bookId: string,
  pageNumber: number
): Promise<PageInfo[]> {
  const chapters = await scanChapters(bookId);
  const matchingPages: PageInfo[] = [];

  for (const chapter of chapters) {
    const pages = chapter.pages.filter((page) => page.number === pageNumber);
    matchingPages.push(...pages);
  }

  return matchingPages;
}



