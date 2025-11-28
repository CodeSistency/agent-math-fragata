import { readFile, stat } from "fs/promises";
import { join, dirname, resolve, normalize } from "path";
import { getPageDetails } from "./page-scanner";

const BOOKS_ROOT = join(process.cwd(), "books");

/**
 * Configuration extracted from a view file
 */
export interface ViewConfiguration {
  engines: Array<{
    name: string;
    path: string; // Ruta relativa desde book/
    order: number; // Orden de carga
    type: 'abstract' | 'specific' | 'generic' | 'validation' | 'library';
  }>;
  cssFiles: Array<{
    path: string; // Ruta relativa desde book/
    order: number;
  }>;
  templates: Array<{
    id: string;
    content: string; // HTML completo del template
  }>;
  htmlStructure: {
    containers: string[]; // IDs de containers importantes
    dataAttributes: Record<string, string>; // data-board, data-artifact, etc.
  };
  definitionPath: string; // Ruta a la definición usada
  viewType: 'html' | 'ejs'; // Tipo de view procesado
  originalHTML?: string; // HTML original completo del archivo (para debugging)
}

/**
 * Normalizes a relative path from view location to book root path
 * Handles both regular paths and paths with dist/ prefix
 */
function normalizeViewPath(
  relativePath: string,
  viewPath: string,
  bookId: string
): string {
  const viewDir = dirname(viewPath);
  const resolvedPath = resolve(viewDir, relativePath);
  const bookPath = join(BOOKS_ROOT, bookId, "book");
  
  // Remove book path to get relative path
  let normalized = normalize(resolvedPath.replace(bookPath, "")).replace(/^[\\/]/, "");
  
  // If path contains dist/, convert to actual path (dist is a build output, map to source)
  // Example: dist/class/engines/cap_0/engineInterval.min.js -> class/engines/cap_0/engineInterval.js
  // Example: dist/css/generic/bootstrap.min.css -> css/generic/bootstrap.min.css (keep .min.css for CSS)
  if (normalized.includes('/dist/')) {
    normalized = normalized.replace(/^dist\//, '');
    // Remove .min.js but keep .min.css (some CSS files are minified)
    if (normalized.endsWith('.min.js')) {
      normalized = normalized.replace(/\.min\.js$/, '.js');
    }
  }
  
  return normalized;
}

/**
 * Classifies an engine/script based on its path
 */
function classifyScript(
  path: string,
  chapterId?: string
): { type: 'abstract' | 'specific' | 'generic' | 'validation' | 'library'; chapterId?: string } {
  // Libraries (not engines)
  if (
    path.includes("library") ||
    path.includes("jsxgraphcore") ||
    path.includes("mathLive") ||
    path.includes("computeEngine") ||
    path.includes("babel")
  ) {
    return { type: 'library' };
  }

  // Abstract engines
  if (path.includes("engines/abstract") || path.includes("class/engines/abstract")) {
    return { type: 'abstract' };
  }

  // Generic engines (check before generic classes to be more specific)
  if (path.includes("genericEngines") && !path.includes("generictClass")) {
    return { type: 'generic' };
  }
  
  // Generic classes (separate from genericEngines)
  if (path.includes("generictClass")) {
    return { type: 'generic' };
  }

  // Validation
  if (path.includes("validation")) {
    return { type: 'validation' };
  }

  // Chapter-specific engines
  const capMatch = path.match(/cap_(\d+)/);
  if (capMatch) {
    return {
      type: 'specific',
      chapterId: capMatch[0], // cap_2
    };
  }

  return { type: 'specific' };
}

/**
 * Extracts script name from file path
 */
function extractScriptName(filePath: string): string {
  const fileName = filePath.split("/").pop() || filePath;
  return fileName.replace(/\.min\.js$/, "").replace(/\.js$/, "");
}

/**
 * Extracts CSS files from HTML content
 */
function extractCSSFiles(htmlContent: string, viewPath: string, bookId: string): Array<{ path: string; order: number }> {
  const cssFiles: Array<{ path: string; order: number }> = [];
  
  // Match <link rel="stylesheet" href="...">
  const cssRegex = /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  let order = 0;
  
  while ((match = cssRegex.exec(htmlContent)) !== null) {
    const href = match[1];
    // Skip external CDN URLs
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
      continue;
    }
    
    const normalizedPath = normalizeViewPath(href, viewPath, bookId);
    cssFiles.push({ path: normalizedPath, order: order++ });
  }
  
  return cssFiles;
}

/**
 * Extracts script references from HTML content
 */
function extractScripts(htmlContent: string, viewPath: string, bookId: string): Array<{ name: string; path: string; order: number; type: 'abstract' | 'specific' | 'generic' | 'validation' | 'library' }> {
  const scripts: Array<{ name: string; path: string; order: number; type: 'abstract' | 'specific' | 'generic' | 'validation' | 'library' }> = [];
  
  // Match <script src="..."></script>
  const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi;
  let match;
  let order = 0;
  
  while ((match = scriptRegex.exec(htmlContent)) !== null) {
    const src = match[1];
    // Skip external CDN URLs
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
      continue;
    }
    
    // Skip definition scripts (they are handled separately via definitionPath)
    if (src.includes('definitions')) {
      continue;
    }
    
    const normalizedPath = normalizeViewPath(src, viewPath, bookId);
    const classification = classifyScript(normalizedPath);
    const name = extractScriptName(normalizedPath);
    
    scripts.push({
      name,
      path: normalizedPath,
      order: order++,
      type: classification.type,
    });
  }
  
  return scripts;
}

/**
 * Extracts HTML templates from content
 */
function extractTemplates(htmlContent: string): Array<{ id: string; content: string }> {
  const templates: Array<{ id: string; content: string }> = [];
  
  // Match <template id="...">...</template>
  const templateRegex = /<template[^>]*id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/template>/gi;
  let match;
  
  while ((match = templateRegex.exec(htmlContent)) !== null) {
    const id = match[1];
    const content = match[0]; // Full template tag including opening and closing
    templates.push({ id, content });
  }
  
  return templates;
}

/**
 * Extracts HTML structure (containers, data attributes)
 */
function extractHTMLStructure(htmlContent: string): {
  containers: string[];
  dataAttributes: Record<string, string>;
} {
  const containers: string[] = [];
  const dataAttributes: Record<string, string> = {};
  
  // Extract container IDs (divs with id attribute)
  const containerRegex = /<div[^>]*id=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = containerRegex.exec(htmlContent)) !== null) {
    const id = match[1];
    if (id && !containers.includes(id)) {
      containers.push(id);
    }
  }
  
  // Prioritize known artifact containers (container-all-artifact is most important)
  const priorityContainers = ['container-all-artifact', 'containerBasePage'];
  const prioritized: string[] = [];
  const others: string[] = [];
  
  for (const container of containers) {
    if (priorityContainers.includes(container)) {
      prioritized.push(container);
    } else {
      others.push(container);
    }
  }
  
  // Reorder: priority containers first, then others
  const reorderedContainers = [...prioritized, ...others];
  
  // Extract data attributes from boards and artifacts
  const dataAttrRegex = /data-(board|artifact)=["']([^"']+)["']/gi;
  while ((match = dataAttrRegex.exec(htmlContent)) !== null) {
    const attrName = `data-${match[1]}`;
    const attrValue = match[2];
    dataAttributes[attrName] = attrValue;
  }
  
  return { containers: reorderedContainers, dataAttributes };
}

/**
 * Extracts definition path from HTML content
 */
function extractDefinitionPath(htmlContent: string, viewPath: string, bookId: string): string {
  // Look for definition script (last script tag that references definitions)
  const defRegex = /<script[^>]*src=["']([^"']*definitions[^"']+)["'][^>]*><\/script>/gi;
  let match;
  let lastMatch: string | null = null;
  
  // Find the last match (definitions are usually loaded last)
  while ((match = defRegex.exec(htmlContent)) !== null) {
    if (match[1]) {
      lastMatch = match[1];
    }
  }
  
  if (lastMatch) {
    const normalized = normalizeViewPath(lastMatch, viewPath, bookId);
    console.log(`[view-config-extractor] Extracted definition path: ${lastMatch} -> ${normalized}`);
    return normalized;
  }
  
  console.log(`[view-config-extractor] No definition path found in HTML`);
  return '';
}

/**
 * Parses HTML view file
 */
async function parseHTMLView(viewPath: string, bookId: string): Promise<ViewConfiguration | null> {
  try {
    const htmlContent = await readFile(viewPath, "utf-8");
    
    console.log(`[view-config-extractor] Parsing HTML view: ${viewPath}`);
    
    const cssFiles = extractCSSFiles(htmlContent, viewPath, bookId);
    const scripts = extractScripts(htmlContent, viewPath, bookId);
    const templates = extractTemplates(htmlContent);
    const htmlStructure = extractHTMLStructure(htmlContent);
    const definitionPath = extractDefinitionPath(htmlContent, viewPath, bookId);
    
    console.log(`[view-config-extractor] Extracted from HTML:`, {
      cssFilesCount: cssFiles.length,
      scriptsCount: scripts.length,
      templatesCount: templates.length,
      containersCount: htmlStructure.containers.length,
      definitionPath,
      scripts: scripts.map(s => ({ name: s.name, path: s.path, type: s.type, order: s.order })),
    });
    
    // Filter out library scripts (keep only engines)
    const engines = scripts.filter(s => s.type !== 'library');
    
    console.log(`[view-config-extractor] Filtered engines (non-library):`, {
      enginesCount: engines.length,
      engines: engines.map(e => ({ name: e.name, path: e.path, type: e.type, order: e.order })),
    });
    
    // Determine suggested engine (first specific engine by order)
    const suggestedEngine = engines
      .filter(e => e.type === 'specific')
      .sort((a, b) => a.order - b.order)[0]?.name ||
      engines
        .filter(e => e.type !== 'library')
        .sort((a, b) => a.order - b.order)[0]?.name;
    
    console.log(`[view-config-extractor] Suggested engine from view:`, suggestedEngine);
    
    return {
      engines,
      cssFiles,
      templates,
      htmlStructure,
      definitionPath,
      viewType: 'html',
      originalHTML: htmlContent, // Guardar HTML original para debugging
    };
  } catch (error) {
    console.error(`[view-config-extractor] Error parsing HTML view ${viewPath}:`, error);
    return null;
  }
}

/**
 * Resolves EJS includes by reading included files
 */
async function resolveEJSIncludes(
  ejsContent: string,
  ejsPath: string,
  bookId: string
): Promise<string> {
  let resolved = ejsContent;
  
  // Match <%- include(...) %>
  const includeRegex = /<%-?\s*include\s*\(([^)]+)\)\s*%>/g;
  const matches = Array.from(ejsContent.matchAll(includeRegex));
  
  for (const match of matches) {
    const includePathExpr = match[1].trim();
    // Handle cases like: rutes+'/head.min.ejs'
    // For now, we'll try to resolve common patterns
    if (includePathExpr.includes("head.min.ejs") || includePathExpr.includes("head.ejs")) {
      // Try to find head template
      const ejsDir = dirname(ejsPath);
      const headPath = join(ejsDir, "..", "templates", "http", "head.ejs");
      try {
        const headContent = await readFile(headPath, "utf-8");
        resolved = resolved.replace(match[0], headContent);
      } catch {
        // Try tcp template
        const tcpHeadPath = join(ejsDir, "..", "templates", "tcp", "head.ejs");
        try {
          const tcpHeadContent = await readFile(tcpHeadPath, "utf-8");
          resolved = resolved.replace(match[0], tcpHeadContent);
        } catch {
          console.warn(`[view-config-extractor] Could not resolve head include: ${includePathExpr}`);
        }
      }
    } else if (includePathExpr.includes("bodyClose.min.ejs") || includePathExpr.includes("bodyClose.ejs")) {
      // Try to find bodyClose template
      const ejsDir = dirname(ejsPath);
      const bodyClosePath = join(ejsDir, "..", "templates", "http", "bodyClose.ejs");
      try {
        const bodyCloseContent = await readFile(bodyClosePath, "utf-8");
        resolved = resolved.replace(match[0], bodyCloseContent);
      } catch {
        // Try tcp template
        const tcpBodyClosePath = join(ejsDir, "..", "templates", "tcp", "bodyClose.ejs");
        try {
          const tcpBodyCloseContent = await readFile(tcpBodyClosePath, "utf-8");
          resolved = resolved.replace(match[0], tcpBodyCloseContent);
        } catch {
          console.warn(`[view-config-extractor] Could not resolve bodyClose include: ${includePathExpr}`);
        }
      }
    }
  }
  
  return resolved;
}

/**
 * Extracts configuration from EJS template (static analysis)
 * Since EJS uses server variables, we extract what we can statically
 */
async function parseEJSView(viewPath: string, bookId: string): Promise<ViewConfiguration | null> {
  try {
    let ejsContent = await readFile(viewPath, "utf-8");
    
    // Resolve includes
    ejsContent = await resolveEJSIncludes(ejsContent, viewPath, bookId);
    
    // Now treat it like HTML for extraction
    const cssFiles = extractCSSFiles(ejsContent, viewPath, bookId);
    
    // For EJS, scripts are in bodyClose template via sources variables
    // We need to extract what we can from the bodyClose template we just resolved
    // But also check for hardcoded script references in the main EJS
    
    const allScripts = extractScripts(ejsContent, viewPath, bookId);
    
    // EJS variables like sources.engine are not extractable statically
    // We'll return what we can and let the system handle the rest
    const templates = extractTemplates(ejsContent);
    const htmlStructure = extractHTMLStructure(ejsContent);
    
    // Try to extract definition path from EJS patterns
    let definitionPath = '';
    const defMatch = ejsContent.match(/<%-?\s*sources\?\.definition\s*%>/i) || 
                     ejsContent.match(/definitions\/cap_\d+\/pag_\d+\.js/i);
    if (defMatch) {
      // Try to construct from context
      const capMatch = viewPath.match(/cap_(\d+)/);
      const pagMatch = viewPath.match(/pag_(\d+(?:_\d+)?)/);
      if (capMatch && pagMatch) {
        definitionPath = `definitions/cap_${capMatch[1]}/pag_${pagMatch[1]}.js`;
      }
    } else {
      definitionPath = extractDefinitionPath(ejsContent, viewPath, bookId);
    }
    
    // Filter out library scripts
    const engines = allScripts.filter(s => s.type !== 'library');
    
    return {
      engines,
      cssFiles,
      templates,
      htmlStructure,
      definitionPath,
      viewType: 'ejs',
      originalHTML: ejsContent, // Guardar EJS resuelto para debugging
    };
  } catch (error) {
    console.error(`[view-config-extractor] Error parsing EJS view ${viewPath}:`, error);
    return null;
  }
}

/**
 * Main function to extract view configuration
 * Prioritizes mobile/view HTML over views EJS
 */
export async function extractViewConfig(
  bookId: string,
  chapterId: string,
  pageId: string
): Promise<ViewConfiguration | null> {
  console.log(`[view-config-extractor] extractViewConfig called:`, { bookId, chapterId, pageId });
  
  const page = await getPageDetails(bookId, chapterId, pageId);
  console.log(`[view-config-extractor] getPageDetails result:`, {
    hasPage: !!page,
    viewPath: page?.viewPath,
    pageId: page?.pageId,
  });
  
  // Prioritize mobile/view HTML from page.viewPath
  if (page?.viewPath && page.viewPath.includes('mobile/view')) {
    const viewPath = join(BOOKS_ROOT, bookId, "book", page.viewPath);
    console.log(`[view-config-extractor] Trying page.viewPath: ${viewPath}`);
    try {
      await stat(viewPath);
      console.log(`[view-config-extractor] ✅ Found view at page.viewPath`);
      return await parseHTMLView(viewPath, bookId);
    } catch (err) {
      console.log(`[view-config-extractor] View at page.viewPath doesn't exist, trying alternatives`);
      
      // Try alternative variations if the exact view doesn't exist
      const viewDir = dirname(viewPath);
      const viewFileName = viewPath.split('/').pop() || '';
      const viewBase = viewFileName.replace(/\.html$/, '');
      
      // Try pags_X if it was pag_X and vice versa
      const alternatives = [
        viewBase.replace(/^pag_/, 'pags_'),
        viewBase.replace(/^pags_/, 'pag_'),
      ].filter(alt => alt !== viewBase);
      
      for (const alt of alternatives) {
        const altPath = join(viewDir, `${alt}.html`);
        console.log(`[view-config-extractor] Trying alternative: ${altPath}`);
        try {
          await stat(altPath);
          console.log(`[view-config-extractor] ✅ Found alternative view at: ${altPath}`);
          return await parseHTMLView(altPath, bookId);
        } catch {
          console.log(`[view-config-extractor] Alternative not found: ${alt}.html`);
          // Continue
        }
      }
    }
  }
  
  // If no page found, or page.viewPath didn't work, try manual construction
  if (!page || !page.viewPath || !page.viewPath.includes('mobile/view')) {
    console.log(`[view-config-extractor] No valid page.viewPath, will try manual path construction`);
  }

  // Fallback to EJS views
  if (page?.viewPath && page.viewPath.includes('views')) {
    const viewPath = join(BOOKS_ROOT, bookId, "book", page.viewPath);
    try {
      await stat(viewPath);
      return await parseEJSView(viewPath, bookId);
    } catch {
      // View doesn't exist
    }
  }

  // Try to construct view path manually if not in page.viewPath or if page.viewPath didn't work
  // Normalize chapterId: if it's just a number, add "cap_" prefix
  let normalizedChapterId = chapterId.replace(/^.+_/, ""); // Extract number from cap_X format
  // If it's just a number, ensure it has cap_ prefix for directory structure
  if (!normalizedChapterId.startsWith('cap_') && /^\d+$/.test(normalizedChapterId)) {
    normalizedChapterId = `cap_${normalizedChapterId}`;
  }
  
  let normalizedPageId = pageId.replace(/^cap_\d+_/, "");
  
  console.log(`[view-config-extractor] Trying manual path construction:`, {
    normalizedChapterId,
    normalizedPageId,
    originalPageId: pageId,
    originalChapterId: chapterId,
  });
  
  // Try mobile/view first - try multiple variations
  const variations: string[] = [
    normalizedPageId, // pag_1
    normalizedPageId.replace(/^pag_/, 'pags_'), // pags_1 (if it was pag_1)
    normalizedPageId.replace(/^pags_/, 'pag_'), // pag_1 (if it was pags_1)
  ];
  
  // Remove duplicates
  const uniqueVariations = [...new Set(variations)];
  
  console.log(`[view-config-extractor] Trying variations:`, uniqueVariations);
  
  for (const variation of uniqueVariations) {
    const mobileViewPath = join(BOOKS_ROOT, bookId, "book", "mobile", "view", normalizedChapterId, `${variation}.html`);
    console.log(`[view-config-extractor] Trying variation: ${mobileViewPath}`);
    try {
      await stat(mobileViewPath);
      console.log(`[view-config-extractor] ✅ Found view at: ${mobileViewPath}`);
      return await parseHTMLView(mobileViewPath, bookId);
    } catch (err) {
      console.log(`[view-config-extractor] Variation not found: ${variation}.html`);
      // Continue to next variation
    }
  }
  
  console.log(`[view-config-extractor] ❌ No view found after trying all variations`);
  
  // Try views EJS
  const ejsViewPath = join(BOOKS_ROOT, bookId, "book", "views", normalizedChapterId, `${normalizedPageId}.ejs`);
  try {
    await stat(ejsViewPath);
    return await parseEJSView(ejsViewPath, bookId);
  } catch {
    // No view found
  }

  return null;
}
