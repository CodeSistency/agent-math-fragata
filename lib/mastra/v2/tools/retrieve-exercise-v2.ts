import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { join } from "path";
import { promises as fs } from "fs";
import { getPageDetails, resolveAmbiguousPage } from "../filesystem/page-scanner";
import { readDefinitionByPage, searchDefinitionsByStructure, type ParsedDefinition } from "../filesystem/definition-reader";
import { scanChapters, getChapterInfo } from "../filesystem/chapter-scanner";
import { scanBooks } from "../filesystem/book-scanner";
import { getPageEngines } from "../filesystem/engine-extractor";
import { extractViewConfig, type ViewConfiguration } from "../filesystem/view-config-extractor";

export const retrieveExerciseToolV2 = createTool({
  id: "retrieve-exercise",
  description:
    "Recupera ejercicios o información desde el filesystem. Busca directamente en definitions sin usar RAG vectorial.",
  inputSchema: z.object({
    query: z.string().optional().describe("Texto de consulta opcional"),
    topK: z.number().int().min(1).max(20).optional(),
    bookId: z.string().optional(),
    bookName: z.string().optional(),
    chapterId: z.string().optional(),
    pageNumber: z.number().int().positive().optional(),
    hasArtifact: z.boolean().optional(),
    artifactType: z.string().optional(),
  }),
  outputSchema: z.object({
      results: z.array(
      z.object({
        score: z.number(),
        bookId: z.string().optional(),
        chapterId: z.string().optional(),
        pageId: z.string().optional(),
        pageNumber: z.number().optional(),
        filePath: z.string().optional(),
        hasArtifact: z.boolean().optional(),
        text: z.string(),
        exercise: z.record(z.string(), z.any()).optional(),
        definition: z.record(z.string(), z.any()).optional(),
        rawContent: z.string().optional().describe("Contenido crudo completo del archivo de definición"),
        engines: z.array(z.object({
          name: z.string(),
          path: z.string(),
          type: z.enum(["generic", "chapter-specific"]),
          chapterId: z.string().optional(),
        })).optional(),
        suggestedEngine: z.string().optional(),
        cssFiles: z.array(z.string()).optional(),
        viewConfig: z.object({
          engines: z.array(z.object({
            name: z.string(),
            path: z.string(),
            order: z.number(),
            type: z.enum(["abstract", "specific", "generic", "validation", "library"]),
          })),
          cssFiles: z.array(z.object({
            path: z.string(),
            order: z.number(),
          })),
          templates: z.array(z.object({
            id: z.string(),
            content: z.string(),
          })),
          htmlStructure: z.object({
            containers: z.array(z.string()),
            dataAttributes: z.record(z.string(), z.string()),
          }),
          definitionPath: z.string(),
          viewType: z.enum(["html", "ejs"]),
        }).optional(),
        uiHints: z.object({
          openCanvas: z.boolean().optional(),
          width: z.number().optional(),
        }).optional(),
        type: z.enum(["page", "chapter", "book", "search"]),
      })
    ),
    ambiguous: z.boolean().optional().describe("True if multiple pages match and need disambiguation"),
  }),
  execute: async ({ context }) => {
    const { query, topK, bookId, bookName, chapterId, pageNumber, hasArtifact } = context as {
      query?: string;
      topK?: number;
      bookId?: string;
      bookName?: string;
      chapterId?: string;
      pageNumber?: number;
      hasArtifact?: boolean;
      artifactType?: string;
    };

    // Alias de libros (MG/NV)
    const aliasToBookId: Record<string, string> = { mg: "MG", nv: "NV" };
    let effectiveBookId = bookId;
    if (!effectiveBookId && typeof bookName === "string") {
      const key = bookName.trim().toLowerCase();
      effectiveBookId = aliasToBookId[key];
    }

    const k = topK ?? 5;

    console.log("[retrieve-exercise-v2] input:", {
      query,
      topK: k,
      bookId,
      bookName,
      effectiveBookId,
      chapterId,
      pageNumber,
      hasArtifact,
    });

    // Helper function to infer engine from definition structure
    const inferEngineFromDefinition = (definition: ParsedDefinition | null): string | null => {
      if (!definition) return null;
      
      // Check if it's a Cartesian engine (has artifactHtml with defCartesian)
      if (definition.rDef?.artifactHtml?.datadefault?.some?.((item: any) => 
        item.classGlobal === 'defCartesian' || item.type === 10
      )) {
        return 'engineCartesian';
      }
      
      // Check if it's an Interval engine (has defBoards with interval-like structure)
      const defBoardsStr = JSON.stringify(definition.defBoards || {}).toLowerCase();
      if (defBoardsStr.match(/interval|board_/i) || 
          Object.keys(definition.defBoards || {}).some(key => key.startsWith('board_'))) {
        // Check if it has interval-specific patterns
        if (defBoardsStr.match(/point|pares|boundingbox|axis/i)) {
          return 'engineInterval';
        }
      }
      
      // Check for Comment engine (simple text structure)
      if (definition.rDef && !definition.defBoards && 
          Object.keys(definition.rDef).every(key => 
            key.includes('text') || key.includes('Text') || key.includes('simple')
          )) {
        return 'engineComment';
      }
      
      return null;
    };

    // Helper function to get engines and CSS for a page
    const getEnginesAndCSS = async (
      bookId: string,
      normalizedChapterId: string,
      pageId: string,
      definition?: ParsedDefinition | null
    ) => {
      // First, try to extract view configuration (most accurate)
      let viewConfig: ViewConfiguration | null = null;
      try {
        viewConfig = await extractViewConfig(bookId, normalizedChapterId, pageId);
        console.log(`[retrieve-exercise-v2] extractViewConfig result:`, {
          hasViewConfig: !!viewConfig,
          enginesCount: viewConfig?.engines.length || 0,
          cssFilesCount: viewConfig?.cssFiles.length || 0,
          templatesCount: viewConfig?.templates.length || 0,
          viewType: viewConfig?.viewType,
        });
      } catch (err) {
        console.warn(`[retrieve-exercise-v2] Error extracting view config:`, err);
      }
      
      // If viewConfig exists, use it as primary source
      if (viewConfig && viewConfig.engines.length > 0) {
        // Map viewConfig engines to expected format
        const engines = viewConfig.engines
          .filter(e => e.type !== 'library') // Exclude libraries
          .map(e => ({
            name: e.name,
            path: e.path,
            type: (e.type === 'specific' ? 'chapter-specific' : 'generic') as 'generic' | 'chapter-specific',
            chapterId: normalizedChapterId,
          }));
        
        const cssFiles = viewConfig.cssFiles.map(cf => `/books/${bookId}/book/${cf.path}`);
        
        // Determine suggestedEngine from viewConfig (first specific engine)
        const suggestedEngine = viewConfig.engines
          .filter(e => e.type === 'specific')
          .sort((a, b) => a.order - b.order)[0]?.name || 
          viewConfig.engines
            .filter(e => e.type !== 'library')
            .sort((a, b) => a.order - b.order)[0]?.name ||
          undefined;
        
        console.log(`[retrieve-exercise-v2] Using viewConfig:`, {
          enginesCount: engines.length,
          cssFilesCount: cssFiles.length,
          suggestedEngine,
        });
        
        return {
          engines,
          suggestedEngine,
          cssFiles,
          viewConfig, // Include full viewConfig
        };
      }
      
      // Fallback to existing logic if no viewConfig
      let pageEngines = await getPageEngines(bookId, normalizedChapterId, pageId);
      
      console.log(`[retrieve-exercise-v2] getEnginesAndCSS (fallback) for ${bookId}/${normalizedChapterId}/${pageId}:`, {
        hasPageEngines: !!pageEngines,
        enginesCount: pageEngines?.engines.length || 0,
        chapterEnginesCount: pageEngines?.chapterEngines.length || 0,
        genericEnginesCount: pageEngines?.genericEngines.length || 0,
      });
      
      // If no engines found from HTML, try to get all engines for the chapter
      if (!pageEngines || pageEngines.engines.length === 0) {
        console.log(`[retrieve-exercise-v2] No engines from HTML, trying to get all engines for chapter`);
        try {
          const { getAllEnginesForChapter } = await import("../filesystem/engine-extractor");
          const allEngines = await getAllEnginesForChapter(bookId, normalizedChapterId);
          
          if (allEngines.length > 0) {
            const genericEngines = allEngines.filter(e => e.type === "generic");
            const chapterEngines = allEngines.filter(e => e.type === "chapter-specific");
            
            pageEngines = {
              pageId,
              engines: allEngines,
              genericEngines,
              chapterEngines,
            };
            
            console.log(`[retrieve-exercise-v2] Found ${allEngines.length} engines for chapter (${chapterEngines.length} chapter-specific, ${genericEngines.length} generic)`);
          }
        } catch (err) {
          console.warn(`[retrieve-exercise-v2] Error getting engines for chapter:`, err);
        }
      }
      
      // Infer CSS files based on bookId and chapterId
      const cssFiles: string[] = [];
      
      // Add generic CSS files (different for MG vs NV)
      if (bookId === "MG") {
        cssFiles.push(`/books/${bookId}/book/css/generic/jsxgraph.min.css`);
        cssFiles.push(`/books/${bookId}/book/css/generic/styles.min.css`);
      } else if (bookId === "NV") {
        cssFiles.push(`/books/${bookId}/book/css/generic/jsxgraph.css`);
        cssFiles.push(`/books/${bookId}/book/css/generic/styles.css`);
      }
      
      // Try to add chapter-specific CSS if it exists
      const chapterCssPath = join(process.cwd(), 'books', bookId, 'book', 'css', `cap_${normalizedChapterId}`, 'styles.css');
      try {
        await fs.access(chapterCssPath);
        cssFiles.push(`/books/${bookId}/book/css/cap_${normalizedChapterId}/styles.css`);
      } catch {
        // Chapter CSS doesn't exist, skip
      }
      
      // Determine suggestedEngine
      let suggestedEngine: string | undefined = undefined;
      
      // First priority: engines from HTML/page
      if (pageEngines && pageEngines.chapterEngines && pageEngines.chapterEngines.length > 0) {
        suggestedEngine = pageEngines.chapterEngines[0].name;
      } else if (pageEngines && pageEngines.engines && pageEngines.engines.length > 0) {
        suggestedEngine = pageEngines.engines[0].name;
      }
      
      // Second priority: infer from definition structure if no engine found
      if (!suggestedEngine && definition) {
        const inferred = inferEngineFromDefinition(definition);
        if (inferred) {
          console.log(`[retrieve-exercise-v2] Inferred engine from definition: ${inferred}`);
          suggestedEngine = inferred;
          
          // If we inferred an engine but it's not in the engines list, add it
          if (pageEngines && !pageEngines.engines.some(e => e.name === inferred)) {
            const inferredEnginePath = `class/engines/cap_${normalizedChapterId}/${inferred}.js`;
            pageEngines.engines.push({
              name: inferred,
              path: inferredEnginePath,
              type: "chapter-specific",
              chapterId: normalizedChapterId,
              fullPath: join(process.cwd(), 'books', bookId, 'book', inferredEnginePath),
            });
          }
        }
      }
      
      console.log(`[retrieve-exercise-v2] Final suggestedEngine: ${suggestedEngine}, total engines: ${pageEngines?.engines.length || 0}`);
      
      return {
        engines: pageEngines?.engines.map(e => ({
          name: e.name,
          path: e.path,
          type: e.type,
          chapterId: e.chapterId,
        })) || [],
        suggestedEngine,
        cssFiles,
        viewConfig: undefined, // No viewConfig available in fallback
      };
    };

    // Case 1: Exact page number specified
    if (pageNumber && effectiveBookId) {
      if (chapterId) {
        // Specific chapter and page
        const normalizedChapterId = chapterId.replace(/^.+_/, ""); // Remove bookId prefix if present
        const pageId = `pag_${pageNumber}`;
        const pageDetails = await getPageDetails(effectiveBookId, normalizedChapterId, pageId);

        if (pageDetails && pageDetails.hasDefinition) {
          const definition = await readDefinitionByPage(
            effectiveBookId,
            normalizedChapterId,
            pageDetails.pageId
          );

          if (definition) {
            // Extract text representation from definition
            const text = `Página ${pageNumber} del capítulo ${normalizedChapterId}: ${JSON.stringify(definition.defBoards).substring(0, 200)}...`;
            
            // Get engines and CSS (pass definition for inference)
            const { engines, suggestedEngine, cssFiles, viewConfig } = await getEnginesAndCSS(
              effectiveBookId,
              normalizedChapterId,
              pageDetails.pageId,
              definition
            );
            
            // Determine if there are artifacts
            const hasArtifacts = !!definition.artifacts || Object.keys(definition.defBoards).length > 0;
            
            return {
              results: [
                {
                  score: 1.0,
                  bookId: effectiveBookId,
                  chapterId: pageDetails.chapterId,
                  pageId: pageDetails.pageId,
                  pageNumber: pageDetails.pageNumber,
                  filePath: definition.filePath,
                  hasArtifact: hasArtifacts,
                  text,
                  definition: {
                    defBoards: definition.defBoards,
                    rDef: definition.rDef,
                    artifacts: definition.artifacts,
                  },
                  rawContent: definition.rawContent,
                  engines,
                  suggestedEngine,
                  cssFiles,
                  viewConfig,
                  uiHints: hasArtifacts ? {
                    openCanvas: true,
                    width: 600,
                  } : undefined,
                  type: "page" as const,
                },
              ],
              ambiguous: false,
            };
          }
        }

        return { results: [], ambiguous: false };
      } else {
        // Page number without chapter - might be ambiguous
        const ambiguousPages = await resolveAmbiguousPage(
          effectiveBookId,
          pageNumber,
          undefined
        );

        if (ambiguousPages.length === 0) {
          return { results: [], ambiguous: false };
        }

        if (ambiguousPages.length === 1) {
          // Only one page found, return it
          const page = ambiguousPages[0];
          const normalizedChapterId = page.chapterId.replace(/^.+_/, "");
          const definition = await readDefinitionByPage(
            effectiveBookId,
            normalizedChapterId,
            page.pageId
          );

          if (definition) {
            const text = `Página ${pageNumber} (${page.chapterId}): ${JSON.stringify(definition.defBoards).substring(0, 200)}...`;
            
            // Get engines and CSS (pass definition for inference)
            const { engines, suggestedEngine, cssFiles, viewConfig } = await getEnginesAndCSS(
              effectiveBookId,
              normalizedChapterId,
              page.pageId,
              definition
            );
            
            // Determine if there are artifacts
            const hasArtifacts = !!definition.artifacts || Object.keys(definition.defBoards).length > 0;
            
            return {
              results: [
                {
                  score: 1.0,
                  bookId: effectiveBookId,
                  chapterId: page.chapterId,
                  pageId: page.pageId,
                  pageNumber: page.pageNumber,
                  filePath: definition.filePath,
                  hasArtifact: hasArtifacts,
                  text,
                  definition: {
                    defBoards: definition.defBoards,
                    rDef: definition.rDef,
                    artifacts: definition.artifacts,
                  },
                  rawContent: definition.rawContent,
                  engines,
                  suggestedEngine,
                  cssFiles,
                  viewConfig,
                  uiHints: hasArtifacts ? {
                    openCanvas: true,
                    width: 600,
                  } : undefined,
                  type: "page" as const,
                },
              ],
              ambiguous: false,
            };
          }
        }

        // Multiple pages found - return all with ambiguous flag
        const results = await Promise.all(
          ambiguousPages.map(async (page) => {
            const normalizedChapterId = page.chapterId.replace(/^.+_/, "");
            const definition = await readDefinitionByPage(
              effectiveBookId,
              normalizedChapterId,
              page.pageId
            );

            // Get engines and CSS (pass definition for inference)
            const { engines, suggestedEngine, cssFiles, viewConfig } = definition
              ? await getEnginesAndCSS(
                  effectiveBookId,
                  normalizedChapterId,
                  page.pageId,
                  definition
                )
              : { engines: [], suggestedEngine: undefined, cssFiles: [], viewConfig: undefined };

            return {
              score: 1.0,
              bookId: effectiveBookId,
              chapterId: page.chapterId,
              pageId: page.pageId,
              pageNumber: page.pageNumber,
              filePath: definition?.filePath,
              hasArtifact: definition ? (!!definition.artifacts || Object.keys(definition.defBoards).length > 0) : false,
              text: `Página ${pageNumber} del ${page.chapterId}`,
              definition: definition ? {
                defBoards: definition.defBoards,
                rDef: definition.rDef,
                artifacts: definition.artifacts,
              } : undefined,
              rawContent: definition?.rawContent,
              engines,
              suggestedEngine,
              cssFiles,
              viewConfig,
              type: "page" as const,
            };
          })
        );

        return {
          results,
          ambiguous: true,
        };
      }
    }

    // Case 2: Chapter specified but no page
    if (chapterId && effectiveBookId) {
      const normalizedChapterId = chapterId.replace(/^.+_/, "");
      const chapter = await getChapterInfo(effectiveBookId, normalizedChapterId);

      if (chapter) {
        return {
          results: chapter.pages.map((page) => ({
            score: 0.8,
            bookId: effectiveBookId,
            chapterId: chapter.id,
            pageId: page.id,
            pageNumber: page.number,
            filePath: page.definitionPath,
            text: `Página ${page.number}${page.variant ? ` (variante ${page.variant})` : ""} del capítulo ${normalizedChapterId}`,
            type: "chapter" as const,
          })),
          ambiguous: false,
        };
      }

      return { results: [], ambiguous: false };
    }

    // Case 3: Query string provided - search by structure
    if (query && effectiveBookId) {
      // For structure search, we need a target structure
      // For now, we'll do a simple text search in definitions
      // This is a simplified version - could be enhanced
      const chapters = chapterId 
        ? [await getChapterInfo(effectiveBookId, chapterId.replace(/^.+_/, ""))]
        : await scanChapters(effectiveBookId);

      const matchingResults: Array<{
        definition: ParsedDefinition;
        similarity: number;
        chapterId: string;
      }> = [];

      for (const chapter of chapters) {
        if (!chapter) continue;

        const normalizedChapterId = chapter.id.replace(/^.+_/, "");
        
        // Read all definitions in chapter
        for (const page of chapter.pages) {
          if (!page.definitionPath) continue;

          const definition = await readDefinitionByPage(
            effectiveBookId,
            normalizedChapterId,
            page.id
          );

          if (definition) {
            // Simple text matching in definition content
            const content = JSON.stringify(definition.defBoards) + JSON.stringify(definition.rDef || {});
            const queryLower = query.toLowerCase();
            const contentLower = content.toLowerCase();

            // Calculate simple similarity (presence of query terms)
            const queryTerms = queryLower.split(/\s+/);
            const matches = queryTerms.filter((term) => contentLower.includes(term)).length;
            const similarity = matches / queryTerms.length;

            if (similarity > 0.1) {
              matchingResults.push({
                definition,
                similarity,
                chapterId: chapter.id,
              });
            }
          }
        }
      }

      // Sort by similarity and take topK
      matchingResults.sort((a, b) => b.similarity - a.similarity);
      const topResults = matchingResults.slice(0, k);

      // Get engines for each result
      const resultsWithEngines = await Promise.all(
        topResults.map(async ({ definition, similarity, chapterId }) => {
          const normalizedChapterId = chapterId.replace(/^.+_/, "");
          // Extract pageId from definition filePath
          const pageIdMatch = definition.filePath.match(/pag_(\d+(?:_\d+)?)/);
          const pageId = pageIdMatch ? pageIdMatch[0] : `pag_${similarity}`;
          
          const { engines, suggestedEngine, cssFiles, viewConfig } = await getEnginesAndCSS(
            effectiveBookId,
            normalizedChapterId,
            pageId,
            definition
          );

          return {
            score: similarity,
            bookId: effectiveBookId,
            chapterId,
            filePath: definition.filePath,
            hasArtifact: !!definition.artifacts || Object.keys(definition.defBoards).length > 0,
            text: `Resultado de búsqueda: ${definition.filePath.substring(definition.filePath.length - 50)}`,
            definition: {
              defBoards: definition.defBoards,
              rDef: definition.rDef,
              artifacts: definition.artifacts,
            },
            rawContent: definition.rawContent,
            engines,
            suggestedEngine,
            cssFiles,
            viewConfig,
            type: "search" as const,
          };
        })
      );

      return {
        results: resultsWithEngines,
        ambiguous: false,
      };
    }

    // Case 4: Only bookId - return list of chapters
    if (effectiveBookId) {
      const chapters = await scanChapters(effectiveBookId);
      
      return {
        results: chapters.map((chapter) => ({
          score: 1.0,
          bookId: effectiveBookId,
          chapterId: chapter.id,
          text: `Capítulo ${chapter.number}: ${chapter.id} (${chapter.pages.length} páginas)`,
          type: "book" as const,
        })),
        ambiguous: false,
      };
    }

    // Case 5: No filters - return list of books
    const books = await scanBooks();
    
    return {
      results: books.map((book) => ({
        score: 1.0,
        bookId: book.id,
        text: `Libro ${book.id}: ${book.chapters.length} capítulos`,
        type: "book" as const,
      })),
      ambiguous: false,
    };
  },
});

