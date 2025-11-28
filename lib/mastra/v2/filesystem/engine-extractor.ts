import { readFile, stat } from "fs/promises";
import { join, dirname, resolve, normalize } from "path";
import { getPageDetails } from "./page-scanner";

const BOOKS_ROOT = join(process.cwd(), "books");

/**
 * Reference to an engine found in HTML
 */
export interface EngineReference {
  name: string; // "engineToWay", "mathKeyboard", etc.
  path: string; // Relative path from book/: "dist/class/engines/cap_2/engineToWay.min.js"
  type: "generic" | "chapter-specific";
  chapterId?: string; // Chapter ID if chapter-specific: "cap_2"
  fullPath: string; // Full absolute path to the engine file
}

/**
 * Engines found for a specific page
 */
export interface PageEngines {
  pageId: string;
  engines: EngineReference[];
  genericEngines: EngineReference[];
  chapterEngines: EngineReference[];
}

/**
 * Extracts engine script references from HTML content
 * Looks for <script src="...engines/..."> tags
 */
function extractEngineScripts(htmlContent: string): string[] {
  const engineScripts: string[] = [];
  
  // Regex to match script tags with engines in the path
  // Pattern: <script src="...engines..."></script>
  const scriptRegex = /<script[^>]*src=["']([^"']*engines[^"']*)["'][^>]*><\/script>/gi;
  
  let match;
  while ((match = scriptRegex.exec(htmlContent)) !== null) {
    const scriptPath = match[1];
    // Filter out library scripts (like jsxgraphcore, mathLive)
    // Only include scripts that are specifically engine files
    if (
      scriptPath.includes("engines") &&
      !scriptPath.includes("library") &&
      !scriptPath.includes("jsxgraphcore") &&
      !scriptPath.includes("mathLive") &&
      !scriptPath.includes("computeEngine") &&
      !scriptPath.includes("babel")
    ) {
      engineScripts.push(scriptPath);
    }
  }
  
  return engineScripts;
}

/**
 * Normalizes relative path to absolute path from book root
 * Handles paths like: ../../../dist/class/engines/cap_2/engineToWay.min.js
 */
function normalizeEnginePath(
  relativePath: string,
  htmlPath: string,
  bookId: string
): string {
  // Get the directory of the HTML file
  const htmlDir = dirname(htmlPath);
  
  // Resolve the relative path from HTML location
  const resolvedPath = resolve(htmlDir, relativePath);
  
  // Convert to relative path from book root
  const bookPath = join(BOOKS_ROOT, bookId, "book");
  const normalized = normalize(resolvedPath.replace(bookPath, "")).replace(/^[\\/]/, "");
  
  return normalized;
}

/**
 * Classifies an engine as generic or chapter-specific based on its path
 */
function classifyEngine(
  path: string,
  chapterId?: string
): { type: "generic" | "chapter-specific"; chapterId?: string } {
  if (path.includes("genericEngines")) {
    return { type: "generic" };
  }
  
  // Check if path contains a cap_X pattern
  const capMatch = path.match(/cap_(\d+)/);
  if (capMatch) {
    return {
      type: "chapter-specific",
      chapterId: capMatch[0], // cap_2
    };
  }
  
  // Default to generic if unclear
  return { type: "generic" };
}

/**
 * Extracts engine name from file path
 * Examples:
 * - "engineToWay.min.js" -> "engineToWay"
 * - "mathKeyboard.min.js" -> "mathKeyboard"
 */
function extractEngineName(filePath: string): string {
  const fileName = filePath.split("/").pop() || filePath;
  // Remove .min.js or .js extension
  return fileName.replace(/\.min\.js$/, "").replace(/\.js$/, "");
}

/**
 * Extracts engine references from an HTML file
 * @param htmlPath Full path to the HTML file
 * @param bookId Book ID for path resolution
 * @returns Array of engine references
 */
export async function extractEnginesFromHTML(
  htmlPath: string,
  bookId: string
): Promise<EngineReference[]> {
  try {
    const htmlContent = await readFile(htmlPath, "utf-8");
    const scriptPaths = extractEngineScripts(htmlContent);
    const engines: EngineReference[] = [];

    for (const scriptPath of scriptPaths) {
      const normalizedPath = normalizeEnginePath(scriptPath, htmlPath, bookId);
      const fullPath = join(BOOKS_ROOT, bookId, "book", normalizedPath);
      
      // Check if file exists (try both .min.js and .js versions)
      let actualPath = fullPath;
      let exists = false;
      
      try {
        await stat(fullPath);
        exists = true;
      } catch {
        // Try without .min
        const withoutMin = fullPath.replace(/\.min\.js$/, ".js");
        try {
          await stat(withoutMin);
          actualPath = withoutMin;
          exists = true;
        } catch {
          // File doesn't exist, skip
          console.warn(
            `[engine-extractor] Engine file not found: ${normalizedPath}`
          );
        }
      }

      if (exists) {
        const name = extractEngineName(normalizedPath);
        const classification = classifyEngine(normalizedPath);
        
        engines.push({
          name,
          path: normalizedPath,
          type: classification.type,
          chapterId: classification.chapterId,
          fullPath: actualPath,
        });
      }
    }

    return engines;
  } catch (error) {
    console.error(`[engine-extractor] Error extracting engines from ${htmlPath}:`, error);
    return [];
  }
}

/**
 * Gets all engines for a specific page
 * @param bookId Book ID
 * @param chapterId Chapter ID
 * @param pageId Page ID
 * @returns Page engines information
 */
export async function getPageEngines(
  bookId: string,
  chapterId: string,
  pageId: string
): Promise<PageEngines | null> {
  const page = await getPageDetails(bookId, chapterId, pageId);
  if (!page || !page.viewPath) {
    return null;
  }

  const htmlPath = join(BOOKS_ROOT, bookId, "book", page.viewPath);
  const engines = await extractEnginesFromHTML(htmlPath, bookId);

  // Separate into generic and chapter-specific
  const genericEngines = engines.filter((e) => e.type === "generic");
  const chapterEngines = engines.filter((e) => e.type === "chapter-specific");

  return {
    pageId: page.pageId,
    engines,
    genericEngines,
    chapterEngines,
  };
}

/**
 * Gets all engines available for a chapter
 * This includes engines from all pages in the chapter plus generic engines
 * @param bookId Book ID
 * @param chapterId Chapter ID
 * @returns Array of all engine references
 */
export async function getAllEnginesForChapter(
  bookId: string,
  chapterId: string
): Promise<EngineReference[]> {
  const engines: EngineReference[] = [];
  const engineMap = new Map<string, EngineReference>(); // Deduplicate by name

  // Normalize chapterId
  const normalizedChapterId = chapterId.replace(/^.+_/, ""); // Remove bookId prefix if present

  // Get generic engines from any page (they're the same)
  // Try to find a sample page in the chapter
  const bookPath = join(BOOKS_ROOT, bookId, "book");
  const mobileViewPath = join(bookPath, "mobile", "view", normalizedChapterId);

  try {
    const { readdir } = await import("fs/promises");
    const htmlFiles = (await readdir(mobileViewPath)).filter((f) =>
      f.endsWith(".html")
    );

    // Get engines from first available page
    if (htmlFiles.length > 0) {
      const sampleHtmlPath = join(mobileViewPath, htmlFiles[0]);
      const pageEngines = await extractEnginesFromHTML(sampleHtmlPath, bookId);

      for (const engine of pageEngines) {
        // Only add generic engines here (chapter-specific will be added separately)
        if (engine.type === "generic") {
          if (!engineMap.has(engine.name)) {
            engineMap.set(engine.name, engine);
          }
        }
      }
    }
  } catch (error) {
    console.warn(
      `[engine-extractor] Could not scan chapter for generic engines:`,
      error
    );
  }

  // Add chapter-specific engines from class/engines directory
  const enginesPath = join(bookPath, "class", "engines", normalizedChapterId);
  try {
    const { readdir, stat } = await import("fs/promises");
    const stats = await stat(enginesPath);
    if (stats.isDirectory()) {
      const files = await readdir(enginesPath);
      const jsFiles = files.filter((f) => f.endsWith(".js") || f.endsWith(".min.js"));

      for (const file of jsFiles) {
        const engineName = extractEngineName(file);
        const enginePath = `class/engines/${normalizedChapterId}/${file}`;
        const fullPath = join(enginesPath, file);

        if (!engineMap.has(engineName)) {
          engineMap.set(engineName, {
            name: engineName,
            path: enginePath,
            type: "chapter-specific",
            chapterId: normalizedChapterId,
            fullPath,
          });
        }
      }
    }
  } catch (error) {
    // Chapter engines directory doesn't exist, that's okay
  }

  // Also check genericEngines directory
  const genericEnginesPath = join(bookPath, "class", "engines", "genericEngines");
  try {
    const { readdir } = await import("fs/promises");
    const stats = await stat(genericEnginesPath);
    if (stats.isDirectory()) {
      const files = await readdir(genericEnginesPath);
      const jsFiles = files.filter((f) => f.endsWith(".js") || f.endsWith(".min.js"));

      for (const file of jsFiles) {
        const engineName = extractEngineName(file);
        const enginePath = `class/engines/genericEngines/${file}`;
        const fullPath = join(genericEnginesPath, file);

        if (!engineMap.has(engineName)) {
          engineMap.set(engineName, {
            name: engineName,
            path: enginePath,
            type: "generic",
            fullPath,
          });
        }
      }
    }
  } catch (error) {
    // genericEngines directory doesn't exist, that's okay
  }

  return Array.from(engineMap.values());
}
















































