import { readdir } from "fs/promises";
import { join } from "path";
import { isDirectory } from "./utils";

export interface Engine {
  id: string;
  name: string;
  file: string; // Relative path from books/ root
  description?: string;
  chapterId?: string;
}

// Cache for discovered engines
const engineCache = new Map<string, Engine[]>();

/**
 * Extract engine name from filename (e.g., "heightCurves.js" -> "Height Curves")
 */
function formatEngineName(fileName: string): string {
  const nameWithoutExt = fileName.replace(/\.js$/, "");
  // Convert camelCase to Title Case
  return nameWithoutExt
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

// Utilities moved to lib/books/utils.ts

/**
 * Discover engines for a specific chapter
 */
export async function discoverEngines(
  bookId: string,
  chapterId: string
): Promise<Engine[]> {
  const cacheKey = `${bookId}_${chapterId}`;
  
  // Check cache first
  if (engineCache.has(cacheKey)) {
    return engineCache.get(cacheKey)!;
  }

  const engines: Engine[] = [];
  
  // Extract chapter number from chapterId (e.g., "MG_cap_1" -> "cap_1")
  const chapterMatch = chapterId.match(/^.+_cap_(\d+)$/);
  if (!chapterMatch) {
    return engines;
  }
  
  const chapterFolder = `cap_${chapterMatch[1]}`;
  const enginesRootPath = join(process.cwd(), "books", bookId, "book", "class", "engines");
  const enginesPath = join(enginesRootPath, chapterFolder);
  
  // Check if engines directory exists
  if (!(await isDirectory(enginesPath))) {
    // 1) Fallback: check genericEngines folder
    const genericEnginesPath = join(enginesRootPath, "genericEngines");
    if (await isDirectory(genericEnginesPath)) {
      const genericFiles = await readdir(genericEnginesPath);
      const jsFiles = genericFiles.filter((f) => f.endsWith(".js"));
      for (const file of jsFiles) {
        engines.push({
          id: `generic_${file.replace(/\.js$/, "")}`,
          name: formatEngineName(file),
          file: `${bookId}/book/class/engines/genericEngines/${file}`,
          description: `Generic engine: ${formatEngineName(file)}`,
        });
      }
    }

    // 2) Fallback: scan other chapter folders (cap_*) and expose as cross-cap engines
    if (await isDirectory(enginesRootPath)) {
      const items = await readdir(enginesRootPath);
      for (const item of items) {
        // Skip non-cap folders and known non-executable folders
        if (
          item === "genericEngines" ||
          item === "abstract" ||
          item === "old-engines" ||
          item === "testing"
        ) {
          continue;
        }
        const capMatch = item.match(/^cap_(\d+)$/);
        if (!capMatch) {
          continue;
        }
        const otherCapPath = join(enginesRootPath, item);
        if (await isDirectory(otherCapPath)) {
          const files = await readdir(otherCapPath);
          const jsFiles = files.filter((f) => f.endsWith(".js"));
          for (const file of jsFiles) {
            engines.push({
              id: `cross_${item}_${file.replace(/\.js$/, "")}`,
              name: formatEngineName(file),
              file: `${bookId}/book/class/engines/${item}/${file}`,
              description: `Cross-cap engine from ${item}: ${formatEngineName(file)}`,
            });
          }
        }
      }
    }

    // 3) Fallback: scan flat files under engines root (excluding abstract and folders)
    if (await isDirectory(enginesRootPath)) {
      const rootItems = await readdir(enginesRootPath);
      for (const file of rootItems) {
        if (!file.endsWith(".js")) continue;
        if (file === "BaseEngine.js" || file === "baseBoards.js" || file === "NodeHtml.js") continue; // typical abstract/base
        engines.push({
          id: `root_${file.replace(/\.js$/, "")}`,
          name: formatEngineName(file),
          file: `${bookId}/book/class/engines/${file}`,
          description: `Root-level engine: ${formatEngineName(file)}`,
        });
      }
    }

    engineCache.set(cacheKey, engines);
    return engines;
  }

  // Read engine files in chapter folder
  const files = await readdir(enginesPath);
  const jsFiles = files.filter((f) => f.endsWith(".js"));

  for (const file of jsFiles) {
    engines.push({
      id: `${chapterId}_${file.replace(/\.js$/, "")}`,
      name: formatEngineName(file),
      file: `${bookId}/book/class/engines/${chapterFolder}/${file}`,
      description: `Engine for ${chapterId}: ${formatEngineName(file)}`,
      chapterId,
    });
  }

  // Also check genericEngines folder
  const genericEnginesPath = join(process.cwd(), "books", bookId, "book", "class", "engines", "genericEngines");
  if (await isDirectory(genericEnginesPath)) {
    const genericFiles = await readdir(genericEnginesPath);
    const jsFiles = genericFiles.filter((f) => f.endsWith(".js"));
    
    for (const file of jsFiles) {
      engines.push({
        id: `generic_${file.replace(/\.js$/, "")}`,
        name: formatEngineName(file),
        file: `${bookId}/book/class/engines/genericEngines/${file}`,
        description: `Generic engine: ${formatEngineName(file)}`,
      });
    }
  }

  // Cache results
  engineCache.set(cacheKey, engines);
  
  return engines;
}

/**
 * Discover all engines for a book
 */
export async function discoverAllEngines(bookId: string): Promise<Engine[]> {
  const enginesPath = join(process.cwd(), "books", bookId, "book", "class", "engines");
  
  if (!(await isDirectory(enginesPath))) {
    return [];
  }

  const allEngines: Engine[] = [];
  const items = await readdir(enginesPath);

  for (const item of items) {
    const itemPath = join(enginesPath, item);
    
    if (!(await isDirectory(itemPath))) {
      continue;
    }

    // Skip genericEngines (handled separately)
    if (item === "genericEngines" || item === "abstract" || item === "old-engines" || item === "testing") {
      continue;
    }

    // Extract chapter number
    const chapterMatch = item.match(/^cap_(\d+)$/);
    if (!chapterMatch) {
      continue;
    }

    const chapterId = `${bookId}_cap_${chapterMatch[1]}`;
    const chapterEngines = await discoverEngines(bookId, chapterId);
    allEngines.push(...chapterEngines);
  }

  return allEngines;
}

/**
 * Clear engine cache (useful for development/reload)
 */
export function clearEngineCache(): void {
  engineCache.clear();
}

/**
 * Clear cache for a specific book/chapter
 */
export function clearEngineCacheFor(bookId: string, chapterId?: string): void {
  if (chapterId) {
    engineCache.delete(`${bookId}_${chapterId}`);
  } else {
    // Clear all entries for this book
    for (const key of engineCache.keys()) {
      if (key.startsWith(`${bookId}_`)) {
        engineCache.delete(key);
      }
    }
  }
}

