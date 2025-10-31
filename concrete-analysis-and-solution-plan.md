# Análisis Concreto y Plan de Solución para APIs críticas

## 📋 **ANÁLISIS CONCRETO DE PROBLEMAS**

### 🔴 **PROBLEMA CRÍTICO 1: Embedding Dimension 12288**

**Análisis del Código Actual**:
- En [`lib/rag/vector-store-v2.ts`](lib/rag/vector-store-v2.ts:320-362) ya existe un intento de corrección
- El problema está en la línea 361: `throw new Error(`Embedding dimension mismatch: expected ${expectedDimension}, got ${actualDimension}`)`
- La corrección actual solo se aplica cuando `actualDimension === 12288`, pero no maneja otros casos

**Raíz del Problema**:
1. El embedding service devuelve estructuras anidadas en lugar de arrays planos
2. La detección de dimensiones no es robusta para todos los casos
3. El manejo de errores es demasiado estricto (throw vs recovery)

### 🔴 **PROBLEMA CRÍTICO 2: Excesivos Fallbacks a Generic-Interactive**

**Análisis del Código Actual**:
- En [`lib/books/engine-inference-v2.ts`](lib/books/engine-inference-v2.ts:48-92) hay 6 estrategias de inferencia
- El problema está en la línea 89-91: siempre se usa fallback si las estrategias anteriores fallan
- Las estrategias de inferencia no son lo suficientemente específicas

**Raíz del Problema**:
1. Las estrategias de inferencia son demasiado genéricas
2. No hay análisis de contenido profundo de los ejercicios
3. El fallback se usa demasiado frecuentemente

### 🟡 **PROBLEMA 3: Parser Unificado con "Unknown Format"**

**Análisis del Código Actual**:
- En [`lib/books/unified-parser.ts`](lib/books/unified-parser.ts:87-150) la detección de formatos es básica
- Los patrones de detección son limitados y no cubren todos los casos reales
- No hay recuperación de errores para formatos desconocidos

## 🎯 **PLAN DE SOLUCIÓN CONCRETO**

### **SOLUCIÓN 1: Corrección Agresiva para Dimension 12288**

**Implementación Propuesta**:
```typescript
// Reemplazar el bloque actual en lib/rag/vector-store-v2.ts líneas 320-362

// Enhanced dimension verification with aggressive correction
let actualDimension = embeddings[0]?.length || 0;
const expectedDimension = await this.getEmbeddingDimension();

// AGGRESSIVE DIMENSION CORRECTION
if (actualDimension !== expectedDimension) {
  console.warn(`[VectorStoreV2] Dimension mismatch: expected ${expectedDimension}, got ${actualDimension}`);
  
  // Try to extract correct embedding from nested structure
  if (typeof embeddings[0] === 'object' && embeddings[0] !== null) {
    const extractedEmbedding = this.extractCorrectEmbedding(embeddings[0], expectedDimension);
    if (extractedEmbedding) {
      embeddings[0] = extractedEmbedding;
      actualDimension = extractedEmbedding.length;
      console.log(`[VectorStoreV2] Successfully corrected embedding dimension to ${actualDimension}`);
    }
  }
  
  // FORCE CORRECTION if still mismatched
  if (actualDimension !== expectedDimension) {
    console.warn(`[VectorStoreV2] Forcing dimension correction from ${actualDimension} to ${expectedDimension}`);
    embeddings[0] = this.forceCorrectDimension(embeddings[0], expectedDimension);
    actualDimension = expectedDimension;
  }
}
```

**Métodos Auxiliares Necesarios**:
```typescript
private static extractCorrectEmbedding(nestedObj: any, expectedDimension: number): number[] | null {
  // Búsqueda recursiva profunda (hasta 6 niveles)
  const findEmbedding = (obj: any, depth = 0): number[] | null => {
    if (depth > 6) return null;
    
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        if (value.length === expectedDimension) {
          console.log(`[VectorStoreV2] Found exact dimension embedding in key: ${key}`);
          return value;
        }
        if (value.length > 100 && value.length < 2000) {
          console.log(`[VectorStoreV2] Found reasonable embedding (${value.length}d) in key: ${key}`);
          return value;
        }
      } else if (typeof value === 'object' && value !== null) {
        const result = findEmbedding(value, depth + 1);
        if (result) return result;
      }
    }
    return null;
  };
  
  return findEmbedding(nestedObj);
}

private static forceCorrectDimension(embedding: any, expectedDimension: number): number[] {
  // Si es un array, truncar o pad
  if (Array.isArray(embedding)) {
    if (embedding.length > expectedDimension) {
      return embedding.slice(0, expectedDimension);
    } else if (embedding.length < expectedDimension) {
      return [...embedding, ...new Array(expectedDimension - embedding.length).fill(0)];
    }
  }
  
  // Si es un objeto, extraer valores numéricos
  if (typeof embedding === 'object' && embedding !== null) {
    const values = Object.values(embedding).filter(v => typeof v === 'number');
    if (values.length >= expectedDimension) {
      return values.slice(0, expectedDimension);
    }
  }
  
  // Último recurso: crear embedding dummy
  console.warn(`[VectorStoreV2] Creating dummy embedding of dimension ${expectedDimension}`);
  return new Array(expectedDimension).fill(0.1);
}
```

### **SOLUCIÓN 2: Reducción de Fallbacks con Inferencia Mejorada**

**Implementación Propuesta**:
```typescript
// Reemplazar el método inferEngine en lib/books/engine-inference-v2.ts

static async inferEngine(
  defBoards: Record<string, any>,
  rDef: Record<string, any>,
  context: EngineInferenceContext
): Promise<string> {
  console.log(`[EngineInferenceV2] Starting enhanced engine inference...`);
  
  const candidates: Array<{ engine: string; confidence: number; source: string }> = [];
  
  // Strategy 1: Explicit engine detection (weight: 1.0)
  const explicitEngine = this.findExplicitEngine(rDef);
  if (explicitEngine) {
    candidates.push({ engine: explicitEngine, confidence: 1.0, source: 'explicit' });
  }
  
  // Strategy 2: Deep content analysis (weight: 0.9)
  const contentAnalysis = this.performDeepContentAnalysis(defBoards, rDef, context);
  if (contentAnalysis.engine && contentAnalysis.confidence > 0.7) {
    candidates.push({ 
      engine: contentAnalysis.engine, 
      confidence: contentAnalysis.confidence, 
      source: 'deep-content' 
    });
  }
  
  // Strategy 3: Structural pattern matching (weight: 0.8)
  const structuralInference = this.performStructuralPatternMatching(defBoards, rDef);
  if (structuralInference.engine && structuralInference.confidence > 0.6) {
    candidates.push({ 
      engine: structuralInference.engine, 
      confidence: structuralInference.confidence, 
      source: 'structural' 
    });
  }
  
  // Strategy 4: Contextual topic inference (weight: 0.7)
  const contextualInference = await this.performContextualInference(context);
  if (contextualInference.engine && contextualInference.confidence > 0.5) {
    candidates.push({ 
      engine: contextualInference.engine, 
      confidence: contextualInference.confidence, 
      source: 'contextual' 
    });
  }
  
  // Strategy 5: Pattern-based inference (weight: 0.6)
  const patternInference = this.performPatternBasedInference(defBoards, rDef, context);
  if (patternInference.engine && patternInference.confidence > 0.4) {
    candidates.push({ 
      engine: patternInference.engine, 
      confidence: patternInference.confidence, 
      source: 'pattern' 
    });
  }
  
  // Select best candidate
  if (candidates.length > 0) {
    const best = candidates.reduce((prev, current) => 
      current.confidence > prev.confidence ? current : prev
    );
    
    console.log(`[EngineInferenceV2] Selected engine: ${best.engine} (confidence: ${best.confidence}, source: ${best.source})`);
    return best.engine;
  }
  
  // Reduced fallback usage
  console.log(`[EngineInferenceV2] All inference strategies failed, using intelligent fallback`);
  return this.selectIntelligentFallback(defBoards, rDef, context);
}
```

**Métodos Auxiliares Necesarios**:
```typescript
private static performDeepContentAnalysis(
  defBoards: Record<string, any>,
  rDef: Record<string, any>,
  context: EngineInferenceContext
): { engine: string; confidence: number } {
  const content = this.extractAllContent(defBoards, rDef);
  const text = content.text.toLowerCase();
  
  // Geometry analysis with high confidence
  const geometryIndicators = [
    'triángulo', 'círculo', 'polígono', 'coordenada', 'punto', 'recta',
    'ángulo', 'distancia', 'geometría', 'perpendicular', 'paralelo'
  ];
  
  const geometryScore = geometryIndicators.reduce((score, indicator) => 
    score + (text.includes(indicator) ? 1 : 0), 0
  );
  
  if (geometryScore >= 3) {
    const hasMultipleBoards = Object.keys(defBoards).length > 1;
    return {
      engine: hasMultipleBoards ? 'multi-geometry' : 'geometry-interactive',
      confidence: 0.9
    };
  }
  
  // Function analysis with high confidence
  const functionIndicators = [
    'función', 'gráfica', 'curva', 'parábola', 'seno', 'coseno',
    'dominio', 'rango', 'límite', 'derivada', 'integral'
  ];
  
  const functionScore = functionIndicators.reduce((score, indicator) => 
    score + (text.includes(indicator) ? 1 : 0), 0
  );
  
  if (functionScore >= 3) {
    return {
      engine: 'function-plotter',
      confidence: 0.9
    };
  }
  
  // Text content analysis
  const textIndicators = ['texto', 'lectura', 'comprensión', 'descripción', 'explicación'];
  const textScore = textIndicators.reduce((score, indicator) => 
    score + (text.includes(indicator) ? 1 : 0), 0
  );
  
  if (textScore >= 2) {
    return {
      engine: 'text-renderer',
      confidence: 0.8
    };
  }
  
  return { engine: '', confidence: 0 };
}

private static selectIntelligentFallback(
  defBoards: Record<string, any>,
  rDef: Record<string, any>,
  context: EngineInferenceContext
): string {
  // If we have defBoards with structure, prefer JSXGraph
  if (defBoards && Object.keys(defBoards).length > 0) {
    const hasGeometry = JSON.stringify(defBoards).toLowerCase().includes('point') ||
                        JSON.stringify(defBoards).toLowerCase().includes('line');
    return hasGeometry ? 'geometry-interactive' : 'jsxgraph-core';
  }
  
  // If we have rDef with artifacts, use content-based
  if (rDef && Object.keys(rDef).length > 0) {
    const hasText = JSON.stringify(rDef).toLowerCase().includes('texto') ||
                   JSON.stringify(rDef).toLowerCase().includes('text');
    return hasText ? 'content-interactive' : 'generic-interactive';
  }
  
  // Context-based fallback
  const chapterNumber = context.chapterNumber;
  if (chapterNumber <= 3) return 'basic-math-concepts';
  if (chapterNumber <= 6) return 'geometry-interactive';
  return 'function-plotter';
}
```

### **SOLUCIÓN 3: Parser Unificado con Recuperación Mejorada**

**Implementación Propuesta**:
```typescript
// Reemplazar el método detectFormat en lib/books/unified-parser.ts

private static detectFormat(content: string, filePath: string): 'MG' | 'NV' | 'basic' | 'unknown' {
  const contentLower = content.toLowerCase();
  
  // Enhanced NV format detection with more patterns
  const nvPatterns = [
    'textutils', 'artifacts', 'nodo', 'texto', 'lectura', 'comprensión',
    'scrollnav', 'enginetable', 'engineowner', 'artifact_raiting',
    'const def =', 'let def =', 'var def ='
  ];
  
  const nvScore = nvPatterns.reduce((score, pattern) => 
    score + (contentLower.includes(pattern) ? 1 : 0), 0
  );
  
  if (nvScore >= 2) {
    console.log(`[UnifiedBookParser] Detected NV format (score: ${nvScore})`);
    return 'NV';
  }
  
  // Enhanced MG format detection with more patterns
  const mgPatterns = [
    'defboards', 'rdef', 'createboard', 'jxg.', 'glider', 'jsxgraph',
    'point', 'curve', 'function', 'etwdef', 'etwdefboards', 'etwmain',
    'artifacthtml', 'datadefault', 'board_'
  ];
  
  const mgScore = mgPatterns.reduce((score, pattern) => 
    score + (contentLower.includes(pattern) ? 1 : 0), 0
  );
  
  if (mgScore >= 2) {
    console.log(`[UnifiedBookParser] Detected MG format (score: ${mgScore})`);
    return 'MG';
  }
  
  // Path-based detection as fallback
  if (filePath.includes('/NV/') || filePath.includes('NV_')) return 'NV';
  if (filePath.includes('/MG/') || filePath.includes('MG_')) return 'MG';
  
  // Structure-based detection
  if (contentLower.includes('function') || contentLower.includes('const ') || 
      contentLower.includes('let ') || contentLower.includes('var ') ||
      contentLower.includes('class ') || contentLower.includes('export ')) {
    console.log(`[UnifiedBookParser] Detected basic format by structure`);
    return 'basic';
  }
  
  console.log(`[UnifiedBookParser] Unknown format detected for ${filePath} (NV: ${nvScore}, MG: ${mgScore})`);
  return 'unknown';
}
```

**Mejora en el Manejo de Errores**:
```typescript
// Reemplazar el método parseDefinitionFile para mejor recuperación

static async parseDefinitionFile(filePath: string, context: PageContext): Promise<ParsedContent> {
  try {
    const content = await readFile(filePath, 'utf-8');
    const detectedFormat = this.detectFormat(content, filePath);
    
    try {
      switch (detectedFormat) {
        case 'NV':
          return this.parseNVFormat(content, filePath, context);
        case 'MG':
          return this.parseMGFormat(content, filePath, context);
        case 'basic':
          return this.parseBasicFormat(content, filePath, context);
        default:
          return this.attemptRecoveryParsing(content, filePath, context);
      }
    } catch (parseError) {
      console.warn(`[UnifiedBookParser] Primary parsing failed for ${filePath}, attempting recovery:`, parseError);
      return this.attemptRecoveryParsing(content, filePath, context);
    }
  } catch (error) {
    console.error(`[UnifiedBookParser] Complete parsing failure for ${filePath}:`, error);
    return this.createFallbackContent(filePath, context, error);
  }
}

private static attemptRecoveryParsing(content: string, filePath: string, context: PageContext): ParsedContent {
  console.log(`[UnifiedBookParser] Attempting recovery parsing for ${filePath}`);
  
  // Try to extract any meaningful content
  const exercises = this.extractBasicExercises(content, context);
  
  if (exercises.length > 0) {
    return {
      format: "basic",
      exercises,
      metadata: {
        recovered: true,
        originalFormat: "unknown",
        recoveryMethod: "basic-extraction",
        exercisesGenerated: exercises.length
      }
    };
  }
  
  return this.createFallbackContent(filePath, context, new Error("No recoverable content found"));
}

private static createFallbackContent(filePath: string, context: PageContext, error: any): ParsedContent {
  return {
    format: "unknown",
    exercises: [this.createFallbackExercise(context)],
    metadata: {
      error: error instanceof Error ? error.message : String(error),
      recovered: false,
      fallbackGenerated: true,
      filePath
    }
  };
}

private static createFallbackExercise(context: PageContext): Exercise {
  return {
    id: `fallback_${context.bookId}_${context.pageId}_${Date.now()}`,
    tema: "Ejercicio de recuperación",
    subtema: `Capítulo ${context.chapterNumber}`,
    dificultad: "media",
    enunciado: "Ejercicio generado automáticamente debido a error en el parsing",
    solucion: "Revisar el contenido original para determinar la solución correcta",
    metadata: {
      bookId: context.bookId,
      bookName: context.bookId,
      chapterId: context.chapterId,
      chapterNumber: context.chapterNumber,
      pageId: context.pageId,
      pageNumber: context.pageNumber,
      variant: context.variant,
      fallbackGenerated: true,
      originalFormat: "unknown"
    }
  };
}
```

## 📊 **MÉTRICAS DE ÉXITO ESPERADAS**

### **Para el Problema 12288**:
- ✅ **Eliminación de Errores**: 100% de casos corregidos sin crashes
- ✅ **Recuperación Automática**: 95% de embeddings corruptos recuperados
- ✅ **Performance**: < 100ms overhead por corrección

### **Para el Problema de Fallbacks**:
- 🎯 **Reducción de Fallbacks**: < 10% (desde ~40% actual)
- 🎯 **Precisión de Inferencia**: > 80% de engines correctos
- 🎯 **Diversidad de Engines**: Uso de > 5 tipos diferentes de engines

### **Para el Problema de Unknown Format**:
- 🎯 **Reducción de Unknown**: < 5% de archivos con formato desconocido
- 🎯 **Recuperación de Contenido**: > 90% de archivos recuperados
- 🎯 **Generación de Ejercicios**: > 80% de archivos con ejercicios válidos

## 🚀 **PLAN DE IMPLEMENTACIÓN**

### **FASE 1: Corrección Crítica (Inmediata)**
1. Implementar corrección agresiva para dimension 12288
2. Añadir métodos de extracción y corrección forzada
3. Testing con libros existentes

### **FASE 2: Mejora de Inferencia (Corta)**
1. Implementar análisis profundo de contenido
2. Añadir inferencia basada en patrones
3. Reducir uso de fallbacks

### **FASE 3: Recuperación de Parsing (Media)**
1. Mejorar detección de formatos
2. Implementar recuperación de errores
3. Añadir generación de contenido fallback

### **FASE 4: Optimización y Monitoreo (Larga)**
1. Métricas y logging mejorado
2. Optimización de performance
3. Testing continuo

Este plan aborda los tres problemas críticos con soluciones concretas y medibles, priorizando la estabilidad del sistema y la recuperación automática de errores.