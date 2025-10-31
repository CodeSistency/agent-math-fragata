export interface EngineMetadata {
  id: string;
  name: string;
  description: string;
  file: string;
  bookId: string;
  chapterId: string;
  css?: string[];
  dependencies?: string[];
  type?: 'jsxgraph' | 'mathlive' | 'general';
}

export class EngineRegistry {
  private static engines: Map<string, EngineMetadata> = new Map();
  
  /**
   * Register an engine with its metadata
   */
  static register(metadata: EngineMetadata): void {
    this.engines.set(metadata.id, metadata);
  }
  
  /**
   * Get engine metadata by ID
   */
  static get(id: string): EngineMetadata | undefined {
    return this.engines.get(id);
  }
  
  /**
   * Get all registered engines
   */
  static getAll(): EngineMetadata[] {
    return Array.from(this.engines.values());
  }
  
  /**
   * Get engines by book ID
   */
  static getByBookId(bookId: string): EngineMetadata[] {
    return Array.from(this.engines.values()).filter(engine => engine.bookId === bookId);
  }
  
  /**
   * Get engines by chapter ID
   */
  static getByChapterId(bookId: string, chapterId: string): EngineMetadata[] {
    return Array.from(this.engines.values()).filter(
      engine => engine.bookId === bookId && engine.chapterId === chapterId
    );
  }
  
  /**
   * Load engine metadata from file
   */
  static async loadFromFile(filePath: string): Promise<EngineMetadata | null> {
    // Check if we're in a browser environment (client-side)
    if (typeof window !== 'undefined') {
      console.warn('[EngineRegistry] loadFromFile is only available on server-side');
      return null;
    }
    
    try {
      const { readFile } = await import('fs/promises');
      const fileContent = await readFile(filePath, 'utf-8');
      
      // Try to extract metadata from the file content
      const metadata = this.extractMetadataFromContent(fileContent, filePath);
      
      if (metadata) {
        this.register(metadata);
        return metadata;
      }
      
      return null;
    } catch (error) {
      console.error(`Error loading engine metadata from ${filePath}:`, error);
      return null;
    }
  }
  
  /**
   * Extract metadata from engine file content
   */
  private static extractMetadataFromContent(fileContent: string, filePath: string): EngineMetadata | null {
    try {
      // Extract basic info from file path
      const pathParts = filePath.split('/');
      const fileName = pathParts[pathParts.length - 1];
      const baseName = fileName.replace('.js', '');
      
      // Determine book and chapter from path
      let bookId = 'unknown';
      let chapterId = 'unknown';
      
      if (filePath.includes('/MG/book/')) {
        bookId = 'MG';
        const match = filePath.match(/cap_(\d+)\//);
        if (match) chapterId = match[1];
      } else if (filePath.includes('/NV/book/')) {
        bookId = 'NV';
        const match = filePath.match(/cap_(\d+)\//);
        if (match) chapterId = match[1];
      }
      
      // Determine engine type based on content
      let type: EngineMetadata['type'] = 'general';
      if (fileContent.includes('JSXGraph') || fileContent.includes('JXG')) {
        type = 'jsxgraph';
      } else if (fileContent.includes('MathLive') || fileContent.includes('math-field')) {
        type = 'mathlive';
      }
      
      // Extract CSS dependencies
      const cssDependencies = this.extractCSSDependencies(fileContent);
      
      // Extract description from comments
      const description = this.extractDescription(fileContent);
      
      return {
        id: baseName,
        name: this.formatEngineName(baseName),
        description,
        file: `class/engines/cap_${chapterId}/${fileName}`,
        bookId,
        chapterId,
        css: cssDependencies,
        type,
        dependencies: undefined // Will be extracted separately if needed
      };
    } catch (error) {
      console.error(`Error extracting metadata from ${filePath}:`, error);
      return null;
    }
  }
  
  /**
   * Format engine name to be more readable
   */
  private static formatEngineName(baseName: string): string {
    return baseName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, '')
      .replace(/Engine$/, ' Engine')
      .replace(/([a-z])([A-Z])/g, '$1 $2');
  }
  
  /**
   * Extract CSS dependencies from file content
   */
  private static extractCSSDependencies(fileContent: string): string[] | undefined {
    const cssDependencies: string[] = [];
    
    // Look for CSS imports
    const cssImportRegex = /import\s+['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = cssImportRegex.exec(fileContent)) !== null) {
      const cssPath = match[1];
      if (cssPath.endsWith('.css')) {
        cssDependencies.push(cssPath);
      }
    }
    
    return cssDependencies.length > 0 ? cssDependencies : undefined;
  }
  
  /**
   * Extract description from comments
   */
  private static extractDescription(fileContent: string): string {
    // Look for JSDoc comments
    const descriptionMatch = fileContent.match(/\/\*\*\s*\s*Description:\s*(.+?)\s*\*\//);
    if (descriptionMatch) {
      return descriptionMatch[1].trim();
    }
    
    // Look for simple comment patterns
    const commentMatch = fileContent.match(/\/\/\s*(.+?)\s*$/);
    if (commentMatch) {
      return commentMatch[1].trim();
    }
    
    return '';
  }
}