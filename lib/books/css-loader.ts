export class CSSLoader {
  private static loadedStyles: Set<string> = new Set();
  
  /**
   * Load a CSS file dynamically
   */
  static async loadCSS(cssPath: string): Promise<void> {
    if (this.loadedStyles.has(cssPath)) {
      return; // Already loaded
    }
    
    try {
      // Create link element
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssPath;
      link.onload = () => {
        this.loadedStyles.add(cssPath);
      };
      
      // Add to document head
      document.head.appendChild(link);
      
      // Return a promise that resolves when the CSS is loaded
      return new Promise<void>((resolve) => {
        link.onload = () => resolve();
      });
    } catch (error) {
      console.error(`Error loading CSS ${cssPath}:`, error);
      throw error;
    }
  }
  
  /**
   * Load multiple CSS files
   */
  static async loadMultipleCSS(cssPaths: string[]): Promise<void> {
    const promises = cssPaths.map(cssPath => this.loadCSS(cssPath));
    await Promise.all(promises);
  }
  
  /**
   * Load CSS for a specific engine
   */
  static async loadEngineCSS(engine: { css?: string[] }): Promise<void> {
    if (!engine.css || engine.css.length === 0) {
      return;
    }
    
    await this.loadMultipleCSS(engine.css);
  }
  
  /**
   * Check if a CSS file is already loaded
   */
  static isLoaded(cssPath: string): boolean {
    return this.loadedStyles.has(cssPath);
  }
  
  /**
   * Unload a CSS file
   */
  static unloadCSS(cssPath: string): void {
    this.loadedStyles.delete(cssPath);
    
    // Find and remove the link element
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    for (const link of links) {
      if (link.getAttribute('href') === cssPath) {
        link.remove();
        break;
      }
    }
  }
  
  /**
   * Unload all CSS files
   */
  static unloadAllCSS(): void {
    this.loadedStyles.clear();
    
    // Remove all dynamically loaded CSS
    const links = document.querySelectorAll('link[data-dynamic-css]');
    for (const link of links) {
      link.remove();
    }
  }
}