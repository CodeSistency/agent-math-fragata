# Plan Integral para Corregir la API de Sincronización de Libros

## Visión General

Este plan detalla las correcciones necesarias para resolver los problemas críticos identificados en la API de sincronización, priorizando soluciones que restaurarán el funcionamiento completo del sistema RAG y la integración con los libros matemáticos.

## Fase 1: Correcciones Críticas (Alta Prioridad)

### 1.1 Normalización de Parseo para MG y NV

**Problema**: Formatos inconsistentes entre libros MG y NV

**Solución**:
```typescript
// lib/books/unified-parser.ts
export class UnifiedBookParser {
  async parseDefinitionFile(filePath: string): Promise<ParsedContent> {
    const content = await readFile(filePath, 'utf-8');
    
    // Detectar formato del archivo
    if (content.includes('textUtils')) {
      return this.parseNVFormat(content, filePath);
    } else if (content.includes('defBoards')) {
      return this.parseMGFormat(content, filePath);
    } else {
      return this.parseGenericFormat(content, filePath);
    }
  }
  
  private parseNVFormat(content: string, filePath: string): ParsedContent {
    // Extraer artifacts de textUtils
    // Generar ejercicios sintéticos para contenido textual
    // Inferir estructura visual desde defBoards si existe
  }
  
  private parseMGFormat(content: string, filePath: string): ParsedContent {
    // Mantener lógica existente para MG
    // Mejorar extracción de preguntas anidadas
  }
}
```

### 1.2 Extracción Inteligente de Ejercicios NV

**Problema**: NV no tiene preguntas explícitas, solo contenido textual

**Solución**:
```typescript
// lib/books/nv-exercise-generator.ts
export class NVExerciseGenerator {
  generateExercisesFromText(textUtils: any, context: PageContext): Exercise[] {
    const exercises: Exercise[] = [];
    
    for (const [artifactKey, artifact] of Object.entries(textUtils.artifacts)) {
      // Generar ejercicio de comprensión lectora
      if (artifact.nodo && artifact.nodo.length > 0) {
        exercises.push(this.generateComprehensionExercise(artifactKey, artifact, context));
      }
      
      // Generar ejercicio de identificación de conceptos
      exercises.push(this.generateConceptIdentificationExercise(artifactKey, artifact, context));
      
      // Generar ejercicio interactivo si hay engine
      if (artifact.engine) {
        exercises.push(this.generateInteractiveExercise(artifactKey, artifact, context));
      }
    }
    
    return exercises;
  }
  
  private generateComprehensionExercise(key: string, artifact: any, context: PageContext): Exercise {
    const textContent = artifact.nodo
      .filter((n: any) => n.texto && !n.etiqueta)
      .map((n: any) => n.texto)
      .join(' ');
    
    return {
      id: this.generateId(key, 'comprehension', textContent),
      tema: this.inferTopic(textContent, context),
      subtema: this.inferSubtopic(textContent, context),
      dificultad: this.inferDifficulty(textContent),
      enunciado: `Analiza el siguiente texto y responde: ${textContent.substring(0, 200)}...`,
      solucion: "Respuesta abierta basada en comprensión del texto",
      metadata: {
        ...context,
        artifactKey: key,
        exerciseType: 'comprehension',
        originalText: textContent
      }
    };
  }
}
```

### 1.3 Sincronización Robusta de Dimensiones Vectoriales

**Problema**: Race condition en detección de dimensiones de embeddings

**Solución**:
```typescript
// lib/rag/vector-store-v2.ts
export class VectorStoreV2 {
  private static embeddingDimension: number | null = null;
  private static dimensionPromise: Promise<number> | null = null;
  
  static async getEmbeddingDimension(): Promise<number> {
    if (this.embeddingDimension !== null) {
      return this.embeddingDimension;
    }
    
    if (this.dimensionPromise === null) {
      this.dimensionPromise = this.detectDimension();
    }
    
    return this.dimensionPromise;
  }
  
  private static async detectDimension(): Promise<number> {
    try {
      // Generar embedding de prueba para detectar dimensión
      const testEmbedding = await generateEmbeddings(['test']);
      this.embeddingDimension = testEmbedding[0].length;
      return this.embeddingDimension;
    } catch (error) {
      console.warn('Failed to detect embedding dimension, using default:', error);
      this.embeddingDimension = 768; // Default seguro
      return this.embeddingDimension;
    }
  }
  
  static async initializeBookVectorStore(bookId?: string): Promise<void> {
    const dimension = await this.getEmbeddingDimension();
    const indexName = this.getIndexName(bookId);
    
    // Implementar recreación segura de índices
    await this.ensureIndexExists(indexName, dimension);
  }
  
  private static async ensureIndexExists(indexName: string, dimension: number): Promise<void> {
    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
      try {
        const exists = await this.indexExists(indexName);
        if (!exists) {
          await vectorStore.createIndex({ indexName, dimension });
          return;
        }
        
        // Verificar dimensión del índice existente
        const isCompatible = await this.verifyIndexDimension(indexName, dimension);
        if (isCompatible) {
          return;
        }
        
        // Eliminar y recrear si hay incompatibilidad
        await this.safeDeleteIndex(indexName);
        await vectorStore.createIndex({ indexName, dimension });
        return;
      } catch (error) {
        attempt++;
        if (attempt >= maxRetries) {
          throw new Error(`Failed to initialize index ${indexName} after ${maxRetries} attempts: ${error}`);
        }
        await this.delay(1000 * attempt); // Backoff exponencial
      }
    }
  }
}
```

## Fase 2: Mejoras de Validación y Manejo de Errores

### 2.1 Validación Individual de Ejercicios

**Problema**: Validación se desactiva globalmente si falla una vez

**Solución**:
```typescript
// lib/validation/exercise-validator.ts
export class ExerciseValidator {
  private static validationEnabled = true;
  private static consecutiveFailures = 0;
  private static readonly MAX_CONSECUTIVE_FAILURES = 5;
  
  static validateExercise(exercise: any): { valid: boolean; errors: string[] } {
    if (!this.validationEnabled) {
      return { valid: true, errors: [] };
    }
    
    try {
      const result = ExerciseSchema.safeParse(exercise);
      
      if (result.success) {
        this.consecutiveFailures = 0; // Reset contador
        return { valid: true, errors: [] };
      } else {
        this.consecutiveFailures++;
        
        // Desactivar temporalmente si hay muchos fallos consecutivos
        if (this.consecutiveFailures >= this.MAX_CONSECUTIVE_FAILURES) {
          this.validationEnabled = false;
          console.warn(`Exercise validation temporarily disabled after ${this.consecutiveFailures} consecutive failures`);
          setTimeout(() => {
            this.validationEnabled = true;
            this.consecutiveFailures = 0;
            console.info('Exercise validation re-enabled after cooldown period');
          }, 60000); // Re-habilitar después de 1 minuto
        }
        
        return {
          valid: false,
          errors: result.error?.issues?.map(issue => issue.message) || ['Unknown validation error']
        };
      }
    } catch (error) {
      this.consecutiveFailures++;
      return {
        valid: false,
        errors: [`Validation exception: ${error instanceof Error ? error.message : String(error)}`]
      };
    }
  }
  
  static getValidationStatus(): { enabled: boolean; consecutiveFailures: number } {
    return {
      enabled: this.validationEnabled,
      consecutiveFailures: this.consecutiveFailures
    };
  }
}
```

### 2.2 Generación Mejorada de IDs

**Problema**: IDs pueden colisionar con hash MD5

**Solución**:
```typescript
// lib/utils/id-generator.ts
export class IdGenerator {
  private static usedIds = new Set<string>();
  
  static generateExerciseId(
    bookId: string,
    pageId: string,
    artifactKey: string,
    questionIndex: number,
    questionText: string
  ): string {
    // Usar timestamp + hash para garantizar unicidad
    const timestamp = Date.now();
    const hash = createHash("sha256")
      .update(`${bookId}_${pageId}_${artifactKey}_${questionIndex}_${questionText}_${timestamp}`)
      .digest("hex")
      .substring(0, 12);
    
    const id = `ej_${bookId}_${pageId}_${artifactKey}_q${questionIndex}_${hash}`;
    
    // Verificar unicidad (muy improbable con SHA256 + timestamp)
    if (this.usedIds.has(id)) {
      // Colisión extremadamente rara, añadir sufijo adicional
      return `${id}_${Math.random().toString(36).substring(2, 8)}`;
    }
    
    this.usedIds.add(id);
    return id;
  }
  
  static clearUsedIds(): void {
    this.usedIds.clear();
  }
}
```

## Fase 3: Extracción Inteligente de Metadata

### 3.1 Inferencia Contextual de Temas

**Problema**: Extracción de tema/subtema genérica o inexistente

**Solución**:
```typescript
// lib/metadata/topic-inference.ts
export class TopicInference {
  private static readonly TOPIC_KEYWORDS = {
    'geometría': ['triángulo', 'ángulo', 'figura', 'geometría', 'área', 'perímetro'],
    'álgebra': ['ecuación', 'incógnita', 'variable', 'polinomio', 'sistema'],
    'funciones': ['función', 'gráfica', 'dominio', 'rango', 'curva'],
    'cálculo': ['derivada', 'integral', 'límite', 'continuidad', 'máximo'],
    'estadística': ['media', 'desviación', 'frecuencia', 'probabilidad', 'distribución'],
    'trigonometría': ['seno', 'coseno', 'tangente', 'ángulo', 'radianes']
  };
  
  static inferTopic(text: string, chapterNumber: number, bookId: string): string {
    const lowerText = text.toLowerCase();
    
    // Búsqueda por palabras clave
    for (const [topic, keywords] of Object.entries(this.TOPIC_KEYWORDS)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return topic;
      }
    }
    
    // Inferencia por número de capítulo (contexto específico del libro)
    const chapterTopic = this.inferFromChapter(chapterNumber, bookId);
    if (chapterTopic) {
      return chapterTopic;
    }
    
    // Análisis de contenido matemático
    if (this.hasMathematicalSymbols(text)) {
      return 'matemáticas generales';
    }
    
    return 'contenido educativo';
  }
  
  private static inferFromChapter(chapterNumber: number, bookId: string): string | null {
    // Mapeo específico por libro y capítulo
    const chapterMappings = {
      'MG': {
        0: 'introducción',
        1: 'funciones y gráficas',
        2: 'geometría analítica',
        3: 'álgebra lineal',
        4: 'cálculo'
      },
      'NV': {
        1: 'fundamentos matemáticos',
        2: 'razonamiento lógico',
        3: 'resolución de problemas',
        4: 'pensamiento matemático',
        5: 'aplicaciones prácticas'
      }
    };
    
    return chapterMappings[bookId]?.[chapterNumber] || null;
  }
  
  private static hasMathematicalSymbols(text: string): boolean {
    const mathSymbols = /[∫∑∏π√±≤≥≠∞∂∇∆]/g;
    return mathSymbols.test(text) || /\b(?:sin|cos|tan|log|ln|exp)\b/gi.test(text);
  }
}
```

### 3.2 Inferencia Mejorada de Engines

**Problema**: Inferencia de engine incompleta para formatos NV

**Solución**:
```typescript
// lib/books/engine-inference-v2.ts
export class EngineInferenceV2 {
  static async inferEngine(
    defBoards: Record<string, any>,
    rDef: Record<string, any>,
    context: { chapterId: string; bookId: string; pageId: string }
  ): Promise<string | null> {
    // 1. Búsqueda explícita de engine
    const explicitEngine = this.findExplicitEngine(rDef);
    if (explicitEngine) {
      return explicitEngine;
    }
    
    // 2. Análisis de estructura de defBoards
    const boardInference = this.inferFromDefBoards(defBoards);
    if (boardInference) {
      return boardInference;
    }
    
    // 3. Análisis de contenido de artifacts
    const artifactInference = this.inferFromArtifacts(rDef);
    if (artifactInference) {
      return artifactInference;
    }
    
    // 4. Inferencia contextual por capítulo
    const contextualInference = await this.inferFromContext(context);
    if (contextualInference) {
      return contextualInference;
    }
    
    // 5. Fallback a engine genérico
    return 'generic-interactive';
  }
  
  private static findExplicitEngine(rDef: Record<string, any>): string | null {
    // Buscar engine explícito en diferentes formatos
    if (rDef.engine) return rDef.engine;
    if (rDef.textUtils?.artifacts) {
      for (const artifact of Object.values(rDef.textUtils.artifacts)) {
        if ((artifact as any).engine) {
          return (artifact as any).engine;
        }
      }
    }
    
    // Buscar en artifactHtml.datadefault
    if (rDef.artifactHtml?.datadefault) {
      for (const artifact of rDef.artifactHtml.datadefault) {
        if (artifact.engine) return artifact.engine;
        if (artifact.contents) {
          for (const content of Object.values(artifact.contents)) {
            if ((content as any).engine) return (content as any).engine;
          }
        }
      }
    }
    
    return null;
  }
  
  private static inferFromDefBoards(defBoards: Record<string, any>): string | null {
    if (!defBoards || Object.keys(defBoards).length === 0) {
      return null;
    }
    
    const boardCount = Object.keys(defBoards).length;
    
    // Análisis de elementos en defBoards
    let hasGeometry = false;
    let hasCurves = false;
    let hasPoints = false;
    let hasLines = false;
    
    for (const board of Object.values(defBoards)) {
      if (board.points?.length > 0) hasPoints = true;
      if (board.lines?.length > 0) hasLines = true;
      if (board.curves?.length > 0) hasCurves = true;
      if (board.polygons?.length > 0) hasGeometry = true;
    }
    
    // Inferencia basada en elementos presentes
    if (hasGeometry || (hasPoints && hasLines)) {
      return boardCount > 1 ? 'multi-geometry' : 'geometry';
    }
    
    if (hasCurves) {
      return 'function-plotter';
    }
    
    if (boardCount > 1) {
      return 'multi-board';
    }
    
    return 'single-board';
  }
}
```

## Fase 4: Manejo Robusto de Errores

### 4.1 Reintentos con Backoff Exponencial

**Problema**: Errores transitorios no se reintentan adecuadamente

**Solución**:
```typescript
// lib/utils/retry-handler.ts
export class RetryHandler {
  static async withRetry<T>(
    operation: () => Promise<T>,
    options: {
      maxRetries?: number;
      baseDelay?: number;
      maxDelay?: number;
      retryCondition?: (error: any) => boolean;
    } = {}
  ): Promise<T> {
    const {
      maxRetries = 3,
      baseDelay = 1000,
      maxDelay = 30000,
      retryCondition = this.defaultRetryCondition
    } = options;
    
    let lastError: any;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries || !retryCondition(error)) {
          throw error;
        }
        
        const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
        console.warn(`Operation failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1}):`, error);
        
        await this.delay(delay);
      }
    }
    
    throw lastError;
  }
  
  private static defaultRetryCondition(error: any): boolean {
    if (!error) return false;
    
    const message = error instanceof Error ? error.message : String(error);
    
    // Reintentar en errores de red, tiempo de espera, y cuota
    return (
      message.includes('ECONNRESET') ||
      message.includes('ETIMEDOUT') ||
      message.includes('RATE_LIMIT') ||
      message.includes('quota') ||
      message.includes('timeout') ||
      message.includes('429')
    );
  }
  
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### 4.2 Acumulación y Reporte de Errores

**Problema**: Errores individuales se pierden sin contexto global

**Solución**:
```typescript
// lib/error/sync-error-collector.ts
export class SyncErrorCollector {
  private errors: SyncError[] = [];
  private warnings: SyncWarning[] = [];
  
  addError(error: SyncError): void {
    this.errors.push({
      ...error,
      timestamp: new Date().toISOString(),
      id: this.generateErrorId()
    });
  }
  
  addWarning(warning: SyncWarning): void {
    this.warnings.push({
      ...warning,
      timestamp: new Date().toISOString(),
      id: this.generateWarningId()
    });
  }
  
  getSummary(): SyncSummary {
    return {
      totalErrors: this.errors.length,
      totalWarnings: this.warnings.length,
      errorsByType: this.groupErrorsByType(),
      warningsByType: this.groupWarningsByType(),
      criticalErrors: this.errors.filter(e => e.severity === 'critical'),
      recoverableErrors: this.errors.filter(e => e.severity === 'recoverable'),
      recommendations: this.generateRecommendations()
    };
  }
  
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.errors.some(e => e.type === 'embedding_quota')) {
      recommendations.push('Consider upgrading embedding service quota or implementing batch processing');
    }
    
    if (this.errors.some(e => e.type === 'dimension_mismatch')) {
      recommendations.push('Verify embedding service configuration and clear corrupted indices');
    }
    
    if (this.errors.some(e => e.type === 'validation_failure')) {
      recommendations.push('Review exercise schema validation rules and data format');
    }
    
    const nvExtractionErrors = this.errors.filter(e => 
      e.type === 'parsing' && e.context?.bookId === 'NV'
    );
    
    if (nvExtractionErrors.length > 0) {
      recommendations.push('Improve NV format parser to handle textUtils artifacts');
    }
    
    return recommendations;
  }
}
```

## Fase 5: Optimización de Rendimiento

### 5.1 Procesamiento por Lotes Optimizado

**Problema**: Procesamiento ineficiente de grandes volúmenes de datos

**Solución**:
```typescript
// lib/processing/batch-processor.ts
export class BatchProcessor {
  static async processWithBackpressure<T, R>(
    items: T[],
    processor: (batch: T[]) => Promise<R[]>,
    options: {
      batchSize?: number;
      concurrency?: number;
      memoryThreshold?: number;
    } = {}
  ): Promise<R[]> {
    const {
      batchSize = 10,
      concurrency = 3,
      memoryThreshold = 100 * 1024 * 1024 // 100MB
    } = options;
    
    const results: R[] = [];
    const activeBatches: Promise<void>[] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      
      // Control de concurrencia y memoria
      if (activeBatches.length >= concurrency) {
        await Promise.race(activeBatches);
      }
      
      // Verificar uso de memoria
      if (process.memoryUsage().heapUsed > memoryThreshold) {
        console.warn('Memory threshold reached, forcing garbage collection');
        await this.forceGarbageCollection();
      }
      
      const batchPromise = this.processBatch(batch, processor)
        .then(batchResults => {
          results.push(...batchResults);
        })
        .finally(() => {
          const index = activeBatches.indexOf(batchPromise);
          if (index > -1) {
            activeBatches.splice(index, 1);
          }
        });
      
      activeBatches.push(batchPromise);
    }
    
    await Promise.all(activeBatches);
    return results;
  }
  
  private static async forceGarbageCollection(): Promise<void> {
    if (global.gc) {
      global.gc();
    } else {
      // Forzar garbage collection en Node.js
      await new Promise(resolve => setImmediate(resolve));
    }
  }
}
```

## Plan de Implementación

### Semana 1: Fundamentos Críticos
1. Implementar `UnifiedBookParser` para manejar MG y NV
2. Crear `VectorStoreV2` con sincronización robusta
3. Desarrollar `ExerciseValidator` con validación individual

### Semana 2: Extracción y Metadata
4. Implementar `NVExerciseGenerator` para contenido textual
5. Crear `TopicInference` para metadata contextual
6. Desarrollar `EngineInferenceV2` para mejor detección

### Semana 3: Robustez y Rendimiento
7. Implementar `RetryHandler` con backoff exponencial
8. Crear `SyncErrorCollector` para reporte integral
9. Optimizar con `BatchProcessor` para grandes volúmenes

### Semana 4: Integración y Pruebas
10. Integrar todos los componentes en `sync/route.ts`
11. Crear suite de pruebas integrales
12. Realizar pruebas de carga con datos reales

## Métricas de Éxito

### Métricas Técnicas
- **Tasa de extracción de ejercicios**: >95% para MG, >80% para NV
- **Tiempo de sincronización**: <30 segundos para libro completo
- **Tasa de errores de validación**: <1%
- **Uso de memoria**: <500MB durante sincronización

### Métricas Funcionales
- **Precisión de búsqueda RAG**: >85% en consultas relevantes
- **Disponibilidad del sistema**: >99.5%
- **Recuperación ante errores**: <5 minutos para reestablecer

## Conclusión

Este plan aborda sistemáticamente todos los problemas críticos identificados en la API de sincronización. Las correcciones propuestas no solo solucionan los errores existentes, sino que también establecen una base robusta para futuros desarrollos y mejoras del sistema de libros matemáticos.

La implementación por fases permite una transición controlada, minimizando riesgos y permitiendo validación incremental de cada componente.