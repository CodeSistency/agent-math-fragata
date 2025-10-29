import { readdir, stat } from "fs/promises";
import { join, basename } from "path";
import type { Chapter, Page } from "@/types/book";

interface ParsedBookStructure {
  chapters: Chapter[];
  pages: Page[];
}

/**
 * Extract chapter number from folder name (e.g., "cap_1" -> 1)
 */
function extractChapterNumber(folderName: string): number | null {
  const match = folderName.match(/^cap_(\d+)$/);
  if (!match) return null;
  return parseInt(match[1], 10);
}

/**
 * Extract page number and variant from filename (e.g., "pag_1.js" -> {page: 1, variant: 0}, "pag_1_2.js" -> {page: 1, variant: 2})
 */
function extractPageInfo(fileName: string): { page: number; variant: number } | null {
  // Remove .js extension
  const nameWithoutExt = fileName.replace(/\.js$/, "");
  
  // Match pag_X or pag_X_Y pattern
  const match = nameWithoutExt.match(/^pag_(\d+)(?:_(\d+))?$/);
  if (!match) return null;
  
  const page = parseInt(match[1], 10);
  const variant = match[2] ? parseInt(match[2], 10) : 0;
  
  return { page, variant };
}

/**
 * Check if a path is a directory
 */
async function isDirectory(path: string): Promise<boolean> {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Check if a path is a file
 */
async function isFile(path: string): Promise<boolean> {
  try {
    const stats = await stat(path);
    return stats.isFile();
  } catch {
    return false;
  }
}

/**
 * Parse book structure from filesystem
 * Scans books/{bookId}/book/definitions/ for chapters and pages
 */
export async function parseBookStructure(
  bookPath: string,
  bookId: string
): Promise<ParsedBookStructure> {
  const definitionsPath = join(bookPath, "book", "definitions");
  
  // Check if definitions directory exists
  if (!(await isDirectory(definitionsPath))) {
    throw new Error(`Definitions directory not found: ${definitionsPath}`);
  }

  const chapters: Chapter[] = [];
  const pages: Page[] = [];

  // Read all items in definitions directory
  const items = await readdir(definitionsPath);

  // Process each item (should be chapter folders)
  for (const item of items) {
    const itemPath = join(definitionsPath, item);
    
    // Skip if not a directory
    if (!(await isDirectory(itemPath))) {
      continue;
    }

    // Extract chapter number
    const chapterNumber = extractChapterNumber(item);
    if (chapterNumber === null) {
      console.warn(`Skipping invalid chapter folder: ${item}`);
      continue;
    }

    // Read files in chapter directory
    const chapterFiles = await readdir(itemPath);
    const pageFiles = chapterFiles.filter((f) => f.endsWith(".js"));
    
    // Create chapter
    const chapterId = `${bookId}_cap_${chapterNumber}`;
    const chapter: Chapter = {
      id: chapterId,
      bookId,
      chapterNumber,
      name: `Capítulo ${chapterNumber}`,
      totalPages: pageFiles.length,
      createdAt: new Date().toISOString(),
    };
    chapters.push(chapter);

    // Process each page file
    for (const pageFile of pageFiles) {
      const pageInfo = extractPageInfo(pageFile);
      if (!pageInfo) {
        console.warn(`Skipping invalid page file: ${pageFile}`);
        continue;
      }

      const pageId = `${chapterId}_pag_${pageInfo.page}${pageInfo.variant > 0 ? `_${pageInfo.variant}` : ""}`;
      const filePath = join(itemPath, pageFile);
      
      // Create page (content will be loaded later)
      const page: Page = {
        id: pageId,
        chapterId,
        pageNumber: pageInfo.page,
        variant: pageInfo.variant > 0 ? pageInfo.variant : undefined,
        filePath,
        createdAt: new Date().toISOString(),
      };
      pages.push(page);
    }
  }

  // Sort chapters by number
  chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);

  // Sort pages by chapter, then page number, then variant
  pages.sort((a, b) => {
    const aChapter = chapters.find((c) => c.id === a.chapterId);
    const bChapter = chapters.find((c) => c.id === b.chapterId);
    
    if (!aChapter || !bChapter) return 0;
    
    if (aChapter.chapterNumber !== bChapter.chapterNumber) {
      return aChapter.chapterNumber - bChapter.chapterNumber;
    }
    
    if (a.pageNumber !== b.pageNumber) {
      return a.pageNumber - b.pageNumber;
    }
    
    const aVariant = a.variant || 0;
    const bVariant = b.variant || 0;
    return aVariant - bVariant;
  });

  return { chapters, pages };
}

/**
 * Validate book structure
 */
export function validateBookStructure(structure: ParsedBookStructure): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (structure.chapters.length === 0) {
    errors.push("No chapters found in book structure");
  }

  if (structure.pages.length === 0) {
    errors.push("No pages found in book structure");
  }

  // Check for duplicate chapter numbers
  const chapterNumbers = structure.chapters.map((c) => c.chapterNumber);
  const uniqueChapterNumbers = new Set(chapterNumbers);
  if (chapterNumbers.length !== uniqueChapterNumbers.size) {
    errors.push("Duplicate chapter numbers found");
  }

  // Check for duplicate page IDs
  const pageIds = structure.pages.map((p) => p.id);
  const uniquePageIds = new Set(pageIds);
  if (pageIds.length !== uniquePageIds.size) {
    errors.push("Duplicate page IDs found");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

