# Análisis de Logs y Plan de Mejoras para Sync-V2

## Problemas Críticos Identificados

### 1. 🔴 **Error Crítico: Dimension Mismatch en Vector Store**
```
Embedding dimension mismatch: expected 384, got 12288
```

**Causa Raíz**: El sistema está generando embeddings con dimensiones diferentes (384 vs 12288)
**Impact**: Falla completa del sincronización para ambos libros (MG y NV)
**Prioridad**: CRÍTICA

### 2. 🟡 **Error de Importación en Cliente**
```
Module not found: Can't resolve 'fs/promises'
```

**Causa Raíz**: Importación de módulo de Node.js en código del cliente
**Impact**: Error de compilación en el navegador
**Prioridad**: ALTA

### 3. 🟡 **Excesivos Páginas con "Unknown Format"**
```
Skipping page MG_cap_X_pag_Y due to error: Unknown format detected
```

**Estadísticas**:
- MG: ~40 páginas con "Unknown format"
- NV: ~60 páginas con "Unknown format"

**Impact**: Pérdida de contenido significativa
**Prioridad**: ALTA

### 4. 🟡 **Inferencia de Engine Poco Precisa**
```
Using fallback engine: generic-interactive (repetido excesivamente)
```

**Problema**: Demasiados fallbacks en lugar de inferencia precisa
**Impact**: Motores no optimizados para el contenido
**Prioridad**: MEDIA

## Plan de Mejoras Detallado

### Fase 1: Solución Inmediata (Crítica)

#### 1.1 Corregir Dimension Mismatch en Vector Store
**Archivo**: `lib/rag/vector-store-v2.ts`

**Problema**: La detección de dimensiones no funciona correctamente
**Solución**:
```typescript
// Mejorar detección de dimensiones
private static async detectEmbeddingDimension(sampleText: string): Promise<number> {
  try {
    const sampleEmbedding = await this.embeddings.embedDocuments([sampleText]);
    const dimension = Array.isArray(sampleEmbedding[0]) 
      ? sampleEmbedding[0].length 
      : sampleEmbedding[0]?.embedding?.length || 384;
    
    console.log(`[VectorStoreV2] Detected embedding dimension: ${dimension}`);
    return dimension;
  } catch (error) {
    console.warn(`[VectorStoreV2] Error detecting dimension, using default:`, error);
    return 384; // Default seguro
  }
}
```

#### 1.2 Corregir Importación de fs/promises
**Archivo**: `lib/books/engine-registry.ts`

**Problema**: Importación de módulo Node.js en código del cliente
**Solución**:
```typescript
// Verificar si estamos en el servidor antes de importar
static async loadFromFile(filePath: string): Promise<EngineMetadata | null> {
  // Solo ejecutar en el servidor
  if (typeof window !== 'undefined') {
    console.warn('[EngineRegistry] loadFromFile solo disponible en servidor');
    return null;
  }
  
  try {
    const { readFile } = await import('fs/promises');
    const fileContent = await readFile(filePath, 'utf-8');
    // ... resto del código
  } catch (error) {
    console.error(`Error loading engine metadata from ${filePath}:`, error);
    return null;
  }
}
```

### Fase 2: Mejora de Parser (Alta)

#### 2.1 Mejorar Unified Parser
**Archivo**: `lib/books/unified-parser.ts`

**Problema**: Muchas páginas no reconocidas
**Solución**:
```typescript
// Añadir más patrones de detección
private static detectFormat(content: string, filePath: string): 'mg' | 'nv' | 'unknown' {
  // Patrones mejorados para MG
  if (content.includes('defBoards') || 
      content.includes('createBoard') ||
      content.includes('JXG.') ||
      content.includes('glider')) {
    return 'mg';
  }
  
  // Patrones mejorados para NV
  if (content.includes('textUtils') ||
      content.includes('artifacts') ||
      content.includes('nodo') ||
      content.includes('texto')) {
    return 'nv';
  }
  
  // Intentar detectar por nombre de archivo
  if (filePath.includes('MG/')) return 'mg';
  if (filePath.includes('NV/')) return 'nv';
  
  return 'unknown';
}
```

#### 2.2 Añadir Modo de Recuperación
```typescript
// Para páginas con formato desconocido, intentar recuperación
private static async recoverUnknownFormat(filePath: string): Promise<any> {
  try {
    // Intentar leer como texto plano
    const content = await readFile(filePath, 'utf-8');
    
    // Extraer ejercicios básicos de texto plano
    const exercises = this.extractBasicExercises(content);
    
    return {
      format: 'basic',
      exercises,
      defBoards: {},
      rDef: { textUtils: { artifacts: {} } },
      metadata: { recovered: true }
    };
  } catch (error) {
    throw new Error(`No se pudo recuperar formato: ${error}`);
  }
}
```

### Fase 3: Optimización de Engine Inference (Media)

#### 3.1 Mejorar Inferencia Contextual
**Archivo**: `lib/books/engine-inference-v2.ts`

**Problema**: Demasiados fallbacks genéricos
**Solución**:
```typescript
// Mejorar inferencia por contenido
private static inferFromContent(exercises: any[]): string | null {
  if (!exercises || exercises.length === 0) return null;
  
  // Analizar tipos de ejercicios
  const hasGeometry = exercises.some(e => 
    e.enunciado?.includes('punto') || 
    e.enunciado?.includes('línea') ||
    e.enunciado?.includes('círculo')
  );
  
  const hasGraphs = exercises.some(e => 
    e.enunciado?.includes('gráfica') || 
    e.enunciado?.includes('curva') ||
    e.enunciado?.includes('función')
  );
  
  const hasTextOnly = exercises.every(e => 
    !e.metadata?.artifactDefinition
  );
  
  if (hasGeometry) return 'jsxgraph-core';
  if (hasGraphs) return 'function-plotter';
  if (hasTextOnly) return 'text-renderer';
  
  return null;
}
```

### Fase 4: Monitoreo y Logging (Media)

#### 4.1 Métricas Detalladas
**Archivo**: `app/api/books/sync-v2/route.ts`

```typescript
// Añadir métricas detalladas
const syncMetrics = {
  startTime: Date.now(),
  pagesProcessed: 0,
  pagesSkipped: 0,
  pagesWithErrors: 0,
  formatDistribution: {} as Record<string, number>,
  engineDistribution: {} as Record<string, number>,
  errors: [] as string[]
};

// En cada página
syncMetrics.pagesProcessed++;
if (error) syncMetrics.pagesWithErrors++;
if (format) syncMetrics.formatDistribution[format] = (syncMetrics.formatDistribution[format] || 0) + 1;

// Al final
console.log(`[SyncV2] Metrics:`, {
  ...syncMetrics,
  duration: Date.now() - syncMetrics.startTime,
  successRate: ((syncMetrics.pagesProcessed - syncMetrics.pagesWithErrors) / syncMetrics.pagesProcessed * 100).toFixed(2) + '%'
});
```

### Fase 5: Validación y Recuperación (Baja)

#### 5.1 Validación Pre-Sincronización
```typescript
// Validar estructura antes de procesar
async function validateBookStructure(bookPath: string, bookId: string): Promise<{
  valid: boolean;
  errors: string[];
  warnings: string[];
}> {
  const result = { valid: true, errors: [], warnings: [] };
  
  // Verificar directorios requeridos
  const requiredDirs = ['book/definitions', 'book/class'];
  for (const dir of requiredDirs) {
    const dirPath = join(bookPath, dir);
    if (!existsSync(dirPath)) {
      result.errors.push(`Missing directory: ${dir}`);
    }
  }
  
  // Verificar archivos de definición
  const definitionsPath = join(bookPath, 'book/definitions');
  const definitionFiles = await readdir(definitionsPath);
  const jsFiles = definitionFiles.filter(f => f.endsWith('.js'));
  
  if (jsFiles.length === 0) {
    result.warnings.push('No JavaScript definition files found');
  }
  
  result.valid = result.errors.length === 0;
  return result;
}
```

## Implementación Prioritaria

### Orden de Ejecución:
1. **Inmediato**: Corregir dimension mismatch (CRÍTICO)
2. **Inmediato**: Corregir importación fs/promises (CRÍTICO)
3. **Corto Plazo**: Mejorar unified parser (ALTO)
4. **Medio Plazo**: Optimizar engine inference (MEDIO)
5. **Largo Plazo**: Añadir métricas y validación (BAJO)

### Métricas de Éxito:
- **Reducción de "Unknown format"**: < 5% de páginas
- **Dimension consistency**: 100% de embeddings con misma dimensión
- **Engine accuracy**: > 80% de inferencias correctas
- **Compilation success**: 0 errores de importación

## Archivos a Modificar

1. `lib/rag/vector-store-v2.ts` - Corregir detección de dimensiones
2. `lib/books/engine-registry.ts` - Corregir importación cliente/servidor
3. `lib/books/unified-parser.ts` - Mejorar detección de formatos
4. `lib/books/engine-inference-v2.ts` - Mejorar inferencia
5. `app/api/books/sync-v2/route.ts` - Añadir métricas

## Testing Plan

### Tests Unitarios:
- Vector store dimension detection
- Format detection accuracy
- Engine inference precision

### Tests Integración:
- Full sync process with mock data
- Error recovery scenarios
- Performance benchmarks

### Tests de Carga:
- Large book processing
- Concurrent sync operations
- Memory usage monitoring