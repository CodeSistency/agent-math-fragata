import { stat } from "fs/promises";
import { join } from "path";
import { getBookInfo } from "./book-scanner";
import { getChapterInfo, findPagesByNumber, type PageInfo } from "./chapter-scanner";

const BOOKS_ROOT = join(process.cwd(), "books");

/**
 * Detailed information about a specific page
 */
export interface PageDetails {
  bookId: string;
  chapterId: string;
  pageId: string;
  pageNumber: number;
  variant?: number;
  definitionPath?: string;
  viewPath?: string;
  hasDefinition: boolean;
  hasView: boolean;
}

/**
 * Gets detailed information about a specific page
 * @param bookId The book ID (e.g., "MG")
 * @param chapterId The chapter ID (e.g., "cap_1" or "MG_cap_1")
 * @param pageId The page ID (e.g., "pag_1" or "cap_1_pag_1")
 * @returns Page details if found, null otherwise
 */
export async function getPageDetails(
  bookId: string,
  chapterId: string,
  pageId: string
): Promise<PageDetails | null> {
  // Normalize chapterId: remove bookId prefix if present
  let normalizedChapterId = chapterId;
  if (chapterId.includes("_")) {
    const parts = chapterId.split("_");
    if (parts.length >= 3 && parts[0] === bookId) {
      normalizedChapterId = parts.slice(1).join("_");
    }
  }

  // Normalize pageId: remove chapter prefix if present
  let normalizedPageId = pageId;
  if (pageId.includes("_") && pageId.startsWith("cap_")) {
    // Format: cap_1_pag_1 or cap_1_pag_1_1
    const match = pageId.match(/^cap_\d+_(pag_\d+(?:_\d+)?)$/);
    if (match) {
      normalizedPageId = match[1]; // Extract just pag_X or pag_X_Y
    }
  }

  const chapter = await getChapterInfo(bookId, normalizedChapterId);
  if (!chapter) {
    return null;
  }

  // Find the page in the chapter
  const page = chapter.pages.find((p) => {
    // Match by full pageId or just the pag_X part
    return (
      p.id === pageId ||
      p.id === `${normalizedChapterId}_${normalizedPageId}` ||
      p.id.endsWith(`_${normalizedPageId}`)
    );
  });

  if (!page) {
    return null;
  }

  // Build full paths
  const bookPath = join(BOOKS_ROOT, bookId, "book");
  const definitionFullPath = page.definitionPath
    ? join(bookPath, page.definitionPath)
    : null;
  const viewFullPath = page.viewPath ? join(bookPath, page.viewPath) : null;

  // Check if files actually exist
  let hasDefinition = false;
  let hasView = false;

  if (definitionFullPath) {
    try {
      const stats = await stat(definitionFullPath);
      hasDefinition = stats.isFile();
    } catch {
      hasDefinition = false;
    }
  }

  if (viewFullPath) {
    try {
      const stats = await stat(viewFullPath);
      hasView = stats.isFile();
    } catch {
      hasView = false;
    }
  }

  return {
    bookId,
    chapterId: chapter.id,
    pageId: page.id,
    pageNumber: page.number,
    variant: page.variant,
    definitionPath: page.definitionPath,
    viewPath: page.viewPath,
    hasDefinition,
    hasView,
  };
}

/**
 * Resolves ambiguous page requests when multiple pages with the same number exist
 * @param bookId The book ID
 * @param pageNumber The page number
 * @param chapterId Optional chapter ID to narrow down results
 * @returns Array of page details (multiple if ambiguous, single if chapterId specified)
 */
export async function resolveAmbiguousPage(
  bookId: string,
  pageNumber: number,
  chapterId?: string
): Promise<PageDetails[]> {
  // Verify book exists
  const book = await getBookInfo(bookId);
  if (!book) {
    return [];
  }

  // If chapterId is provided, get specific page
  if (chapterId) {
    const chapter = await getChapterInfo(bookId, chapterId);
    if (!chapter) {
      return [];
    }

    const page = chapter.pages.find((p) => p.number === pageNumber);
    if (!page) {
      return [];
    }

    const details = await getPageDetails(bookId, chapterId, page.id);
    return details ? [details] : [];
  }

  // Otherwise, find all pages with this number across all chapters
  const matchingPages = await findPagesByNumber(bookId, pageNumber);
  const details: PageDetails[] = [];

  for (const page of matchingPages) {
    // Extract chapter ID from page ID (format: cap_X_pag_Y)
    const match = page.id.match(/^(cap_\d+)_/);
    if (match) {
      const pageChapterId = match[1];
      const pageDetails = await getPageDetails(bookId, pageChapterId, page.id);
      if (pageDetails) {
        details.push(pageDetails);
      }
    }
  }

  return details;
}

/**
 * Checks if a page exists
 * @param bookId The book ID
 * @param chapterId The chapter ID
 * @param pageId The page ID
 * @returns True if page exists, false otherwise
 */
export async function pageExists(
  bookId: string,
  chapterId: string,
  pageId: string
): Promise<boolean> {
  const page = await getPageDetails(bookId, chapterId, pageId);
  return page !== null;
}



