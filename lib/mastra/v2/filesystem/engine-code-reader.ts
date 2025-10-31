import { readFile, stat } from "fs/promises";
import { join } from "path";
import { EngineReference, getPageEngines } from "./engine-extractor";

const BOOKS_ROOT = join(process.cwd(), "books");

/**
 * Engine code with metadata
 */
export interface EngineCode {
  name: string;
  path: string;
  code: string;
  exports: string[]; // Names of exported classes/functions
  documentation?: string; // JSDoc comments if present
}

/**
 * Reads engine code from file system
 * Prefers non-minified .js over .min.js if both exist
 * @param enginePath Full path to engine file
 * @returns Engine code or null if not found
 */
export async function readEngineCode(
  enginePath: string
): Promise<EngineCode | null> {
  // Try to read non-minified version first
  let actualPath = enginePath;
  let code = "";

  // If path ends with .min.js, try to find .js version first
  if (enginePath.endsWith(".min.js")) {
    const nonMinPath = enginePath.replace(/\.min\.js$/, ".js");
    try {
      await stat(nonMinPath);
      actualPath = nonMinPath;
    } catch {
      // Non-minified doesn't exist, use minified
      actualPath = enginePath;
    }
  }

  try {
    code = await readFile(actualPath, "utf-8");
  } catch (error) {
    console.error(`[engine-code-reader] Error reading ${actualPath}:`, error);
    return null;
  }

  // Extract exports
  const exports = extractExports(code);

  // Extract documentation
  const documentation = extractDocumentation(code);

  return {
    name: extractEngineNameFromPath(actualPath),
    path: actualPath,
    code,
    exports,
    documentation,
  };
}

/**
 * Extracts engine name from file path
 */
function extractEngineNameFromPath(path: string): string {
  const fileName = path.split(/[/\\]/).pop() || path;
  return fileName.replace(/\.min\.js$/, "").replace(/\.js$/, "");
}

/**
 * Extracts exported classes, functions, and constants from code
 * Supports: export class, export function, export const, module.exports
 */
function extractExports(code: string): string[] {
  const exports: string[] = [];

  // Match export class X
  const classExports = code.match(/export\s+class\s+(\w+)/g);
  if (classExports) {
    classExports.forEach((match) => {
      const className = match.match(/export\s+class\s+(\w+)/)?.[1];
      if (className) exports.push(className);
    });
  }

  // Match export function X
  const functionExports = code.match(/export\s+function\s+(\w+)/g);
  if (functionExports) {
    functionExports.forEach((match) => {
      const functionName = match.match(/export\s+function\s+(\w+)/)?.[1];
      if (functionName) exports.push(functionName);
    });
  }

  // Match export const X = ...
  const constExports = code.match(/export\s+const\s+(\w+)\s*=/g);
  if (constExports) {
    constExports.forEach((match) => {
      const constName = match.match(/export\s+const\s+(\w+)/)?.[1];
      if (constName) exports.push(constName);
    });
  }

  // Match module.exports.X = ... or module.exports = ...
  const moduleExports = code.match(/module\.exports\s*=\s*(\w+)/g);
  if (moduleExports) {
    moduleExports.forEach((match) => {
      const exportName = match.match(/module\.exports\s*=\s*(\w+)/)?.[1];
      if (exportName) exports.push(exportName);
    });
  }

  // Also check for module.exports = { X, Y, Z }
  const objectExports = code.match(/module\.exports\s*=\s*\{([^}]+)\}/);
  if (objectExports && objectExports[1]) {
    const exportKeys = objectExports[1]
      .split(",")
      .map((key) => key.trim().split(/[:=]/)[0].trim())
      .filter((key) => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key));
    exports.push(...exportKeys);
  }

  // Match function declarations that might be used globally
  // (common pattern in legacy engines)
  const globalFunctions = code.match(/^(?:function\s+|const\s+|let\s+|var\s+)(\w+)\s*[=(]/gm);
  if (globalFunctions) {
    globalFunctions.forEach((match) => {
      const funcName = match.match(/(?:function\s+|const\s+|let\s+|var\s+)(\w+)/)?.[1];
      if (funcName && !exports.includes(funcName)) {
        // Only add if it looks like a main function (common patterns)
        if (
          funcName.toLowerCase().includes("main") ||
          funcName.toLowerCase().includes("engine") ||
          funcName.toLowerCase().includes("etw") ||
          funcName.startsWith("etw")
        ) {
          exports.push(funcName);
        }
      }
    });
  }

  return [...new Set(exports)]; // Remove duplicates
}


function extractDocumentation(code: string): string | undefined {
  const jsDocPattern = /\/\*\*([\s\S]*?)\*\//g;
  const matches: string[] = [];
  let match;

  while ((match = jsDocPattern.exec(code)) !== null) {
    matches.push(match[1].trim());
  }

  if (matches.length > 0) {
    // Combine all JSDoc comments
    return matches.join("\n\n");
  }

  return undefined;
}

/**
 * Reads engines for a specific page
 * @param bookId Book ID
 * @param chapterId Chapter ID
 * @param pageId Page ID
 * @returns Array of engine code (only engines used in that page + genericEngines)
 */
export async function readEnginesForPage(
  bookId: string,
  chapterId: string,
  pageId: string
): Promise<EngineCode[]> {
  const pageEngines = await getPageEngines(bookId, chapterId, pageId);
  if (!pageEngines) {
    return [];
  }

  // Only read engines for the page (chapter-specific + generic)
  // This matches the requirement: "solo página específica + genericEngines"
  const enginesToRead: EngineReference[] = [
    ...pageEngines.chapterEngines,
    ...pageEngines.genericEngines,
  ];

  const engineCodes: EngineCode[] = [];

  for (const engineRef of enginesToRead) {
    const engineCode = await readEngineCode(engineRef.fullPath);
    if (engineCode) {
      engineCodes.push(engineCode);
    }
  }

  return engineCodes;
}

/**
 * Gets engine documentation by name
 * Searches for the engine file in the book's engines directory
 * @param bookId Book ID
 * @param engineName Engine name (e.g., "engineToWay")
 * @returns Engine code or null if not found
 */
export async function getEngineDocumentation(
  bookId: string,
  engineName: string
): Promise<EngineCode | null> {
  const bookPath = join(BOOKS_ROOT, bookId, "book");
  const enginesPath = join(bookPath, "class", "engines");

  // Try to find in genericEngines first
  let enginePath = join(enginesPath, "genericEngines", `${engineName}.js`);
  try {
    await stat(enginePath);
    return await readEngineCode(enginePath);
  } catch {
    // Try .min.js
    try {
      enginePath = join(enginesPath, "genericEngines", `${engineName}.min.js`);
      await stat(enginePath);
      return await readEngineCode(enginePath);
    } catch {
      // Not in genericEngines, search in chapter directories
    }
  }

  // Search in chapter directories
  try {
    const { readdir } = await import("fs/promises");
    const chapters = await readdir(enginesPath);
    const chapterDirs = chapters.filter((dir) => /^cap_\d+$/.test(dir));

    for (const chapterDir of chapterDirs) {
      // Try .js
      enginePath = join(enginesPath, chapterDir, `${engineName}.js`);
      try {
        await stat(enginePath);
        return await readEngineCode(enginePath);
      } catch {
        // Try .min.js
        try {
          enginePath = join(enginesPath, chapterDir, `${engineName}.min.js`);
          await stat(enginePath);
          return await readEngineCode(enginePath);
        } catch {
          // Continue searching
        }
      }
    }
  } catch (error) {
    console.error(
      `[engine-code-reader] Error searching for engine ${engineName}:`,
      error
    );
  }

  return null;
}

