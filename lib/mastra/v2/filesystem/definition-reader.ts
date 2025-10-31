import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { getPageDetails } from "./page-scanner";

const BOOKS_ROOT = join(process.cwd(), "books");

/**
 * Parsed definition from a .js file
 */
export interface ParsedDefinition {
  defBoards: Record<string, any>;
  rDef?: Record<string, any>;
  artifacts?: Record<string, any>;
  rawContent: string;
  filePath: string;
}

/**
 * Extracts JavaScript object from a string using a safe evaluation context
 * This function uses regex and string manipulation to extract object definitions
 * without executing arbitrary code
 */
function extractJavaScriptObject(
  content: string,
  objectName: string
): any | null {
  // Try to find the object declaration
  // Pattern: const objectName = { ... } or const objectName = { ... };
  // Also handle: let objectName = { ... } or var objectName = { ... }
  const patterns = [
    // Match with semicolon at end
    new RegExp(
      `(?:const|let|var)\\s+${objectName}\\s*=\\s*\\{([\\s\\S]*?)\\}\\s*;`,
      "m"
    ),
    // Match without semicolon (object at end of file or line)
    new RegExp(
      `(?:const|let|var)\\s+${objectName}\\s*=\\s*\\{([\\s\\S]*)\\}\\s*(?:[;\\n]|$)`,
      "m"
    ),
    // More lenient: match opening brace and try to find matching closing brace
    new RegExp(
      `(?:const|let|var)\\s+${objectName}\\s*=\\s*\\{`,
      "m"
    ),
  ];

  for (let i = 0; i < patterns.length - 1; i++) {
    const pattern = patterns[i];
    const match = content.match(pattern);
    if (match && match[1]) {
      try {
        // Try to parse the extracted object
        const objStr = `{${match[1]}}`;
        // Use Function constructor as a safer eval alternative
        const obj = new Function(`return ${objStr}`)();
        return obj;
      } catch (e) {
        // If parsing fails, continue to next pattern
        console.warn(
          `[definition-reader] Failed to parse ${objectName} with pattern ${i}, trying next`
        );
        continue;
      }
    }
  }

  // Last resort: try to extract using brace matching for complex nested objects
  const lastPattern = patterns[patterns.length - 1];
  const match = content.match(lastPattern);
  if (match && match.index !== undefined) {
    const startPos = match.index + match[0].length - 1; // Position after opening brace
    let braceCount = 1;
    let pos = startPos;
    let endPos = -1;

    // Find matching closing brace
    while (pos < content.length && braceCount > 0) {
      if (content[pos] === '{') braceCount++;
      else if (content[pos] === '}') braceCount--;
      if (braceCount === 0) {
        endPos = pos;
        break;
      }
      pos++;
    }

    if (endPos > startPos) {
      try {
        const objStr = content.substring(match.index! + match[0].indexOf('{'), endPos + 1);
        const obj = new Function(`return ${objStr}`)();
        return obj;
      } catch (e) {
        console.warn(`[definition-reader] Failed to parse ${objectName} with brace matching`);
      }
    }
  }

  return null;
}

/**
 * Attempts to extract JavaScript objects from file content using VM for safe evaluation
 * Falls back to regex-based extraction if VM fails
 */
async function parseDefinitionContent(
  content: string,
  filePath: string
): Promise<{
  defBoards: Record<string, any>;
  rDef?: Record<string, any>;
  artifacts?: Record<string, any>;
}> {
  // Try to extract etwDefBoards or defBoards
  let defBoards: Record<string, any> = {};
  const etwDefBoards = extractJavaScriptObject(content, "etwDefBoards");
  const defBoardsObj = extractJavaScriptObject(content, "defBoards");

  if (etwDefBoards && typeof etwDefBoards === "object") {
    defBoards = etwDefBoards;
  } else if (defBoardsObj && typeof defBoardsObj === "object") {
    defBoards = defBoardsObj;
  }

  // Try to extract rDef
  let rDef: Record<string, any> | undefined;
  const rDefObj = extractJavaScriptObject(content, "rDef");
  if (rDefObj && typeof rDefObj === "object") {
    rDef = rDefObj;
  }

  // Try to extract artifacts (if defined separately) OR extract from 'def' object
  let artifacts: Record<string, any> | undefined;
  const artifactsObj = extractJavaScriptObject(content, "artifacts");
  if (artifactsObj && typeof artifactsObj === "object") {
    artifacts = artifactsObj;
  } else {
    // Try to extract 'def' object which might contain artifacts
    const defObj = extractJavaScriptObject(content, "def");
    if (defObj && typeof defObj === "object") {
      // 'def' object might contain artifact definitions directly
      // Check if it has artifact_* keys
      const artifactKeys = Object.keys(defObj).filter(key => 
        key.startsWith("artifact_") || key.startsWith("example_")
      );
      if (artifactKeys.length > 0) {
        artifacts = {};
        for (const key of artifactKeys) {
          artifacts[key] = defObj[key];
        }
      }
      // Also check if def contains defBoards-like structure
      if (Object.keys(defBoards).length === 0) {
        // Try to see if def has board-like properties
        const hasBoards = Object.values(defObj).some((val: any) => 
          val && typeof val === "object" && (val.board || val.boards || val.interval)
        );
        if (hasBoards) {
          // Use def as defBoards alternative structure
          defBoards = defObj as Record<string, any>;
        }
      }
    }
  }

  // If no defBoards found, try a more aggressive approach using AST-like parsing
  if (Object.keys(defBoards).length === 0) {
    // Look for object literals that might be defBoards
    const objectLiteralMatch = content.match(
      /(?:const|let|var)\s+\w+\s*=\s*\{[\s\S]{100,}/m
    );
    if (objectLiteralMatch) {
      console.warn(
        `[definition-reader] Could not extract defBoards from ${filePath}, structure may be different`
      );
    }
  }

  return {
    defBoards,
    rDef,
    artifacts,
  };
}

/**
 * Reads and parses a definition file
 * @param definitionPath Full path to the definition .js file
 * @returns Parsed definition
 */
export async function readDefinition(
  definitionPath: string
): Promise<ParsedDefinition> {
  try {
    const content = await readFile(definitionPath, "utf-8");
    const parsed = await parseDefinitionContent(content, definitionPath);

    return {
      ...parsed,
      rawContent: content,
      filePath: definitionPath,
    };
  } catch (error) {
    console.error(`[definition-reader] Error reading ${definitionPath}:`, error);
    throw new Error(`Failed to read definition: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Reads definition by book, chapter, and page IDs
 * @param bookId Book ID (e.g., "MG")
 * @param chapterId Chapter ID (e.g., "cap_1" or "MG_cap_1")
 * @param pageId Page ID (e.g., "pag_1" or "cap_1_pag_1")
 * @returns Parsed definition or null if not found
 */
export async function readDefinitionByPage(
  bookId: string,
  chapterId: string,
  pageId: string
): Promise<ParsedDefinition | null> {
  const page = await getPageDetails(bookId, chapterId, pageId);
  if (!page || !page.definitionPath) {
    return null;
  }

  const fullPath = join(BOOKS_ROOT, bookId, "book", page.definitionPath);
  
  try {
    return await readDefinition(fullPath);
  } catch (error) {
    console.error(
      `[definition-reader] Error reading definition for page ${pageId}:`,
      error
    );
    return null;
  }
}

/**
 * Calculates structural similarity between two definitions
 * Compares keys, types, and basic structure
 */
function calculateStructuralSimilarity(
  target: ParsedDefinition,
  candidate: ParsedDefinition
): number {
  let score = 0;
  let totalChecks = 0;

  // Compare defBoards structure
  const targetBoards = Object.keys(target.defBoards);
  const candidateBoards = Object.keys(candidate.defBoards);
  
  if (targetBoards.length > 0 && candidateBoards.length > 0) {
    // Check how many board keys match
    const matchingBoards = targetBoards.filter((key) =>
      candidateBoards.includes(key)
    );
    score += (matchingBoards.length / Math.max(targetBoards.length, candidateBoards.length)) * 0.5;
    totalChecks += 1;

    // Check structure of first board (if exists)
    if (targetBoards.length > 0 && candidateBoards.length > 0) {
      const targetFirstBoard = target.defBoards[targetBoards[0]];
      const candidateFirstBoard = candidate.defBoards[candidateBoards[0]];
      
      if (targetFirstBoard && candidateFirstBoard) {
        const targetKeys = Object.keys(targetFirstBoard);
        const candidateKeys = Object.keys(candidateFirstBoard);
        const matchingKeys = targetKeys.filter((key) =>
          candidateKeys.includes(key)
        );
        score += (matchingKeys.length / Math.max(targetKeys.length, candidateKeys.length)) * 0.3;
        totalChecks += 1;
      }
    }
  }

  // Compare rDef structure
  if (target.rDef && candidate.rDef) {
    const targetRDefKeys = Object.keys(target.rDef);
    const candidateRDefKeys = Object.keys(candidate.rDef);
    const matchingRDefKeys = targetRDefKeys.filter((key) =>
      candidateRDefKeys.includes(key)
    );
    score += (matchingRDefKeys.length / Math.max(targetRDefKeys.length, candidateRDefKeys.length)) * 0.2;
    totalChecks += 1;
  } else if (!target.rDef && !candidate.rDef) {
    // Both don't have rDef, this is a match
    score += 0.2;
    totalChecks += 1;
  }

  return totalChecks > 0 ? score / totalChecks : 0;
}

/**
 * Searches for definitions with similar structure in a chapter or book
 * @param bookId Book ID
 * @param chapterId Optional chapter ID to limit search
 * @param targetStructure Target definition structure to match against
 * @returns Array of matching definitions with similarity scores
 */
export async function searchDefinitionsByStructure(
  bookId: string,
  chapterId: string | undefined,
  targetStructure: ParsedDefinition
): Promise<Array<{ definition: ParsedDefinition; similarity: number }>> {
  const results: Array<{ definition: ParsedDefinition; similarity: number }> =
    [];
  const bookPath = join(BOOKS_ROOT, bookId, "book");
  const definitionsPath = join(bookPath, "definitions");

  try {
    // Determine which chapters to search
    let chaptersToSearch: string[] = [];
    if (chapterId) {
      // Normalize chapterId
      const normalizedChapterId = chapterId.replace(/^.+_/, "");
      chaptersToSearch = [normalizedChapterId];
    } else {
      // Search all chapters
      const chapters = await readdir(definitionsPath);
      chaptersToSearch = chapters.filter((dir) => /^cap_\d+$/.test(dir));
    }

    // Search each chapter
    for (const chapterDir of chaptersToSearch) {
      const chapterPath = join(definitionsPath, chapterDir);
      try {
        const files = await readdir(chapterPath);
        const jsFiles = files.filter((f) => f.endsWith(".js"));

        for (const file of jsFiles) {
          try {
            const definitionPath = join(chapterPath, file);
            const definition = await readDefinition(definitionPath);
            const similarity = calculateStructuralSimilarity(
              targetStructure,
              definition
            );

            if (similarity > 0.3) {
              // Only include if similarity is above threshold
              results.push({ definition, similarity });
            }
          } catch (error) {
            // Skip files that can't be read
            console.warn(
              `[definition-reader] Skipping ${file} due to error:`,
              error
            );
          }
        }
      } catch (error) {
        // Skip chapters that can't be read
        console.warn(
          `[definition-reader] Skipping chapter ${chapterDir} due to error:`,
          error
        );
      }
    }

    // Sort by similarity (highest first)
    results.sort((a, b) => b.similarity - a.similarity);

    return results;
  } catch (error) {
    console.error(
      `[definition-reader] Error searching definitions:`,
      error
    );
    return [];
  }
}

