# Integration Plan: Dynamic Rendering System with Existing Mathematical Books

## Overview
This document outlines a plan to integrate the new dynamic rendering system (React components with JSON definitions) with the existing mathematical books system (MG and NV books).

## Phase 1: API Layer Development

### 1.1 Engine Discovery API
**File**: `app/api/engines/list.ts`
```typescript
export async function GET() {
  try {
    // Scan both MG and NV book directories for engines
    const mgEngines = await scanEngines('books/MG/book/class/engines');
    const nvEngines = await scanEngines('books/NV/book/class/engines');
    
    const allEngines = [...mgEngines, ...nvEngines];
    
    return Response.json({
      success: true,
      data: allEngines
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

async function scanEngines(basePath: string): Promise<Engine[]> {
  // Implementation to scan directories and extract engine metadata
}
```

### 1.2 Chapter-specific Engine Discovery
**File**: `app/api/engines/discover.ts`
```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get('bookId');
  const chapterId = searchParams.get('chapterId');
  
  // Scan specific chapter directory
  const chapterPath = `books/${bookId}/book/class/engines/cap_${chapterId}`;
  const engines = await scanEngines(chapterPath);
  
  return Response.json({
    success: true,
    data: engines
  });
}
```

### 1.3 Individual Engine Serving
**File**: `app/api/engines/[id]/route.ts`
```typescript
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const engineId = params.id;
  
  // Find engine file path
  const enginePath = await findEnginePath(engineId);
  const engineCode = await readFile(enginePath);
  
  return new Response(engineCode, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
```

## Phase 2: Engine Metadata Enhancement

### 2.1 Add Metadata to Existing Engines
Create a metadata system for existing engines:

**For MG Engines** (`books/MG/book/class/engines/cap_0/engineInterval.js`):
```javascript
// Add at the top of the file
const engineMetadata = {
  id: "engineInterval",
  name: "Interval Engine",
  description: "For working with mathematical intervals",
  file: "cap_0/engineInterval.js",
  bookId: "MG",
  chapterId: "0",
  css: [
    "css/generic/jsxgraph.min.css",
    "css/generic/styles.min.css",
    "css/cap_0/styles.css"
  ]
};

// Export for discovery
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ...existingExports, metadata: engineMetadata };
}
```

### 2.2 Create Engine Registry
**File**: `lib/books/engine-registry.ts`
```typescript
export interface EngineMetadata {
  id: string;
  name: string;
  description: string;
  file: string;
  bookId: string;
  chapterId: string;
  css?: string[];
  dependencies?: string[];
}

export class EngineRegistry {
  private static engines: Map<string, EngineMetadata> = new Map();
  
  static register(metadata: EngineMetadata) {
    this.engines.set(metadata.id, metadata);
  }
  
  static get(id: string): EngineMetadata | undefined {
    return this.engines.get(id);
  }
  
  static getAll(): EngineMetadata[] {
    return Array.from(this.engines.values());
  }
  
  static async loadFromFile(filePath: string): Promise<EngineMetadata> {
    // Load metadata from engine file
  }
}
```

## Phase 3: CSS Management System

### 3.1 Dynamic CSS Loading
**File**: `lib/books/css-loader.ts`
```typescript
export class CSSLoader {
  private loadedStyles: Set<string> = new Set();
  
  static async loadCSS(cssPath: string): Promise<void> {
    if (this.loadedStyles.has(cssPath)) return;
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    link.onload = () => this.loadedStyles.add(cssPath);
    
    document.head.appendChild(link);
  }
  
  static async loadEngineCSS(engine: EngineMetadata): Promise<void> {
    if (!engine.css) return;
    
    const promises = engine.css.map(cssPath => this.loadCSS(`/books/${engine.bookId}/book/${cssPath}`));
    await Promise.all(promises);
  }
}
```

### 3.2 CSS Dependency Resolution
**File**: `lib/books/css-resolver.ts`
```typescript
export class CSSResolver {
  static resolveDependencies(engine: EngineMetadata): string[] {
    const resolved: string[] = [];
    
    // Add base CSS
    resolved.push(...this.getBaseCSS());
    
    // Add engine-specific CSS
    if (engine.css) {
      resolved.push(...engine.css.map(css => `/books/${engine.bookId}/book/${css}`));
    }
    
    return resolved;
  }
  
  static getBaseCSS(): string[] {
    return [
      '/books/MG/book/css/generic/jsxgraph.min.css',
      '/books/MG/book/css/generic/styles.min.css',
      '/books/NV/book/css/generic/jsxgraph.css',
      '/books/NV/book/css/generic/styles.css'
    ];
  }
}
```

## Phase 4: Definition System Integration

### 4.1 Legacy Definition Parser
**File**: `lib/books/legacy-parser.ts`
```typescript
export class LegacyDefinitionParser {
  static parse(legacyDef: any): ArtifactDefinition {
    return {
      defBoards: legacyDef.defBoards || {},
      rDef: legacyDef.rDef || {},
      // Convert other properties as needed
    };
  }
  
  static validate(definition: ArtifactDefinition): ValidationResult {
    // Validate the structure matches expected format
    return {
      isValid: true,
      errors: []
    };
  }
}
```

### 4.2 Definition Converter
**File**: `lib/books/definition-converter.ts`
```typescript
export class DefinitionConverter {
  static toJSON(definition: any): string {
    return JSON.stringify(definition, null, 2);
  }
  
  static fromJSON(jsonString: string): ArtifactDefinition {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      throw new Error(`Invalid JSON: ${error.message}`);
    }
  }
  
  static merge(base: ArtifactDefinition, override: ArtifactDefinition): ArtifactDefinition {
    return {
      defBoards: { ...base.defBoards, ...override.defBoards },
      rDef: { ...base.rDef, ...override.rDef }
    };
  }
}
```

## Phase 5: Bridge Components

### 5.1 Legacy Engine Wrapper
**File**: `lib/books/legacy-engine-wrapper.ts`
```typescript
export class LegacyEngineWrapper {
  static async load(engineId: string): Promise<string> {
    // Load legacy engine code
    const engineCode = await fetch(`/api/engines/${engineId}`).then(res => res.text());
    
    // Wrap with modern initialization
    return `
      // Modern wrapper
      (function() {
        // Load dependencies
        await loadDependencies('${engineId}');
        
        // Legacy engine code
        ${engineCode}
        
        // Modern initialization
        if (typeof initializeModern === 'function') {
          initializeModern();
        }
      })();
    `;
  }
  
  static async loadDependencies(engineId: string): Promise<void> {
    const metadata = EngineRegistry.get(engineId);
    if (!metadata?.dependencies) return;
    
    // Load required CSS and JS dependencies
    await CSSLoader.loadEngineCSS(metadata);
    // Load other JS dependencies if needed
  }
}
```

### 5.2 Hybrid Renderer
**File**: `components/artifact/HybridRenderer.tsx`
```typescript
interface HybridRendererProps {
  definition: ArtifactDefinition;
  engineId: string;
  useLegacy?: boolean;
}

export function HybridRenderer({ definition, engineId, useLegacy }: HybridRendererProps) {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const initialize = async () => {
      if (useLegacy) {
        // Use legacy loading mechanism
        await LegacyEngineWrapper.load(engineId);
      } else {
        // Use modern loading mechanism
        const engineCode = await fetch(`/api/engines/${engineId}`).then(res => res.text());
        eval(engineCode);
      }
      
      setIsReady(true);
    };
    
    initialize();
  }, [engineId, useLegacy]);
  
  if (!isReady) {
    return <div>Loading...</div>;
  }
  
  return <div id="artifact-container" />;
}
```

## Phase 6: Migration Strategy

### 6.1 Gradual Migration Path
1. **Phase 1**: Implement API layer for existing engines
2. **Phase 2**: Add metadata to existing engines
3. **Phase 3**: Create hybrid renderer supporting both systems
4. **Phase 4**: Gradually migrate definitions to JSON format
5. **Phase 5**: Full modern system implementation

### 6.2 Backward Compatibility
- Maintain support for legacy HTML templates
- Provide fallback mechanisms for older browsers
- Ensure existing mobile views continue to work
- Preserve all existing functionality during transition

### 6.3 Testing Strategy
```typescript
// File: tests/integration/engine-loading.test.ts
describe('Engine Loading', () => {
  test('loads MG engine via API', async () => {
    const engine = await loadEngine('engineInterval');
    expect(engine).toBeDefined();
    expect(engine.id).toBe('engineInterval');
  });
  
  test('loads NV engine via API', async () => {
    const engine = await loadEngine('horizontalSegment');
    expect(engine).toBeDefined();
    expect(engine.bookId).toBe('NV');
  });
  
  test('renders with legacy definition', async () => {
    const legacyDef = getLegacyDefinition();
    const rendered = await renderWithLegacy(legacyDef);
    expect(rendered).toBeTruthy();
  });
});
```

## Phase 7: Implementation Timeline

### 7.1 Sprint 1 (2 weeks)
- Implement API endpoints for engine discovery
- Create engine metadata system
- Add metadata to MG book engines
- Basic CSS loading mechanism

### 7.2 Sprint 2 (2 weeks)
- Add metadata to NV book engines
- Implement legacy definition parser
- Create hybrid renderer component
- Basic integration testing

### 7.3 Sprint 3 (2 weeks)
- Complete CSS dependency resolution
- Implement definition converter
- Full integration testing
- Documentation updates

### 7.4 Sprint 4 (2 weeks)
- Performance optimization
- Error handling improvements
- Migration tools for existing definitions
- Production deployment

## Phase 8: Success Metrics

### 8.1 Technical Metrics
- Engine loading time < 500ms
- CSS loading completion rate > 99%
- Definition parsing success rate > 99.9%
- Memory usage < 50MB per page

### 8.2 User Experience Metrics
- Page load time < 2 seconds
- Time to interactive < 3 seconds
- Error rate < 0.1%
- Mobile performance score > 90

## Conclusion

This integration plan provides a comprehensive approach to merging the dynamic rendering system with the existing mathematical books. The phased approach ensures:

1. **Minimal Disruption**: Existing functionality remains intact
2. **Gradual Migration**: Smooth transition to new system
3. **Backward Compatibility**: Support for legacy content
4. **Future-proof**: Extensible architecture for new features

The implementation will enable the flexible JSON-based definition system while preserving all existing mathematical content and functionality.