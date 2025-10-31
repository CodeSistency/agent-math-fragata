import { LibSQLVector } from "@mastra/libsql";
import { SyncSummaryLogger } from "@/lib/logging/sync-summary-logger";
import { generateEmbeddings } from "./embeddings";
import type { Exercise } from "@/types/exercise";

export class VectorStoreV2 {
  private static embeddingDimension: number | null = null;
  private static dimensionPromise: Promise<number> | null = null;
  private static readonly DEFAULT_DIMENSION = 384;
  private static isDetecting = false; // Add flag to prevent race condition
  
  private static vectorStore = new LibSQLVector({
    connectionUrl: process.env.DATABASE_URL || "",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  /**
   * Get embedding dimension with caching and race condition protection
   */
  static async getEmbeddingDimension(): Promise<number> {
    // Return cached value if available
    if (this.embeddingDimension !== null) {
      return this.embeddingDimension;
    }
    
    // If detection is in progress, wait for it
    if (this.isDetecting && this.dimensionPromise) {
      return this.dimensionPromise;
    }
    
    // Start detection if not already in progress
    if (!this.isDetecting) {
      this.isDetecting = true;
      this.dimensionPromise = this.detectDimension();
      
      try {
        const dimension = await this.dimensionPromise;
        this.embeddingDimension = dimension;
        return dimension;
      } finally {
        this.isDetecting = false;
      }
    }
    
    // Fallback (shouldn't reach here)
    return this.dimensionPromise || this.DEFAULT_DIMENSION;
  }

  /**
   * Detect embedding dimension by generating a test embedding
   */
  private static async detectDimension(): Promise<number> {
    try {
      console.log('[VectorStoreV2] Detecting embedding dimension...');
      const testEmbedding = await generateEmbeddings(['test dimension detection']);
      
      // Handle different embedding response formats
      let detectedDimension = this.DEFAULT_DIMENSION;
      
      if (Array.isArray(testEmbedding) && testEmbedding.length > 0) {
        const firstEmbedding = testEmbedding[0];
        
        // Check if it's a direct vector array
        if (Array.isArray(firstEmbedding)) {
          detectedDimension = firstEmbedding.length;
        }
        // Check if it's an object with embedding property
        else if (firstEmbedding && typeof firstEmbedding === 'object' && 'embedding' in firstEmbedding) {
          const embeddingArray = (firstEmbedding as any).embedding;
          if (Array.isArray(embeddingArray)) {
            detectedDimension = embeddingArray.length;
          }
        }
        // Handle nested structure that might be causing 12288 dimension
        else if (firstEmbedding && typeof firstEmbedding === 'object') {
          // Look for nested arrays that might be the actual embedding
          const findNestedArray = (obj: any, depth = 0): number => {
            if (depth > 3) return 0; // Prevent infinite recursion
            
            for (const [key, value] of Object.entries(obj)) {
              if (Array.isArray(value)) {
                // Check if this looks like an embedding vector (reasonable size)
                if (value.length > 100 && value.length < 2000) {
                  console.log(`[VectorStoreV2] Found potential embedding array with ${value.length} dimensions in key: ${key}`);
                  return value.length;
                }
              } else if (typeof value === 'object' && value !== null) {
                const nestedResult = findNestedArray(value, depth + 1);
                if (nestedResult > 0) return nestedResult;
              }
            }
            return 0;
          };
          
          const nestedDimension = findNestedArray(firstEmbedding);
          if (nestedDimension > 0) {
            detectedDimension = nestedDimension;
          } else {
            // Fallback: try to find the largest array
            const findAllArrays = (obj: any): number[] => {
              const arrays: number[] = [];
              for (const value of Object.values(obj)) {
                if (Array.isArray(value)) {
                  arrays.push(value.length);
                } else if (typeof value === 'object' && value !== null) {
                  arrays.push(...findAllArrays(value));
                }
              }
              return arrays;
            };
            
            const allArrays = findAllArrays(firstEmbedding);
            if (allArrays.length > 0) {
              // Use the most common reasonable size
              const reasonableArrays = allArrays.filter(size => size > 100 && size < 2000);
              if (reasonableArrays.length > 0) {
                detectedDimension = reasonableArrays[0]; // Use first reasonable size
                console.log(`[VectorStoreV2] Using reasonable embedding dimension: ${detectedDimension} from ${allArrays.join(', ')}`);
              }
            }
          }
        }
      }
      
      // Validate dimension is reasonable
      if (detectedDimension < 10 || detectedDimension > 2000) {
        console.warn(`[VectorStoreV2] Unreasonable dimension detected: ${detectedDimension}, using fallback ${this.DEFAULT_DIMENSION}`);
        detectedDimension = this.DEFAULT_DIMENSION;
      }
      
      this.embeddingDimension = detectedDimension;
      console.log(`[VectorStoreV2] Detected embedding dimension: ${detectedDimension}`);
      
      return detectedDimension;
    } catch (error) {
      console.warn('[VectorStoreV2] Failed to detect embedding dimension, using default:', error);
      this.embeddingDimension = this.DEFAULT_DIMENSION;
      return this.DEFAULT_DIMENSION;
    }
  }

  /**
   * Get index name for a specific book
   */
  static getIndexName(bookId?: string): string {
    if (!bookId) {
      return "v2_exercises"; // Avoid collision with legacy structures
    }
    return `${bookId}_exercises`;
  }

  /**
   * Check if index exists
   */
  static async indexExists(indexName: string): Promise<boolean> {
    try {
      const indexes = await this.vectorStore.listIndexes();
      return indexes.includes(indexName);
    } catch (error) {
      console.warn(`[VectorStoreV2] Error checking if index exists ${indexName}:`, error);
      return false;
    }
  }

  /**
   * Verify if index has compatible dimension
   */
  static async verifyIndexDimension(indexName: string, expectedDimension: number): Promise<boolean> {
    try {
      // Try to query with a dummy vector to verify dimension
      const dummyVector = new Array(expectedDimension).fill(0);
      await this.vectorStore.query({
        indexName,
        queryVector: dummyVector,
        topK: 1,
      });
      return true;
    } catch (error) {
      if (error instanceof Error && error.message.includes("dimension")) {
        return false;
      }
      // Other errors might not be dimension-related
      return true;
    }
  }

  /**
   * Safe index deletion with retry
   */
  static async safeDeleteIndex(indexName: string): Promise<void> {
    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
      try {
        const exists = await this.indexExists(indexName);
        if (exists) {
          console.log(`[VectorStoreV2] Deleting index: ${indexName}`);
          await this.vectorStore.deleteIndex({ indexName });
          
          // Wait and verify deletion
          await this.delay(200);
          const stillExists = await this.indexExists(indexName);
          if (stillExists) {
            throw new Error(`Index ${indexName} still exists after deletion attempt`);
          }
        }
        return;
      } catch (error) {
        attempt++;
        console.warn(`[VectorStoreV2] Delete attempt ${attempt} failed for ${indexName}:`, error);
        
        if (attempt >= maxRetries) {
          throw new Error(`Failed to delete index ${indexName} after ${maxRetries} attempts: ${error}`);
        }
        
        await this.delay(1000 * attempt); // Backoff
      }
    }
  }

  /**
   * Ensure index exists with correct dimension
   */
  static async ensureIndexExists(indexName: string, dimension: number): Promise<void> {
    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
      try {
        const exists = await this.indexExists(indexName);
        if (!exists) {
          console.log(`[VectorStoreV2] Creating new index: ${indexName} with dimension ${dimension}`);
          await this.vectorStore.createIndex({ indexName, dimension });
          return;
        }
        
        // Verify dimension of existing index
        const isCompatible = await this.verifyIndexDimension(indexName, dimension);
        if (isCompatible) {
          console.log(`[VectorStoreV2] Index ${indexName} exists and is compatible`);
          return;
        }
        
        // Delete and recreate if incompatible
        console.log(`[VectorStoreV2] Index ${indexName} has incompatible dimension, recreating...`);
        await this.safeDeleteIndex(indexName);
        await this.vectorStore.createIndex({ indexName, dimension });
        console.log(`[VectorStoreV2] Successfully recreated index ${indexName} with dimension ${dimension}`);
        return;
      } catch (error) {
        attempt++;
        console.warn(`[VectorStoreV2] Index setup attempt ${attempt} failed for ${indexName}:`, error);
        
        if (attempt >= maxRetries) {
          throw new Error(`Failed to setup index ${indexName} after ${maxRetries} attempts: ${error}. If a legacy table or object named 'exercises' exists in your DB, it may conflict with LibSQLVector schema. Consider renaming the global index in getIndexName() (e.g., 'v2_exercises').`);
        }
        
        await this.delay(1000 * attempt); // Exponential backoff
      }
    }
  }

  /**
   * Initialize vector store for a specific book
   */
  static async initializeBookVectorStore(bookId?: string): Promise<void> {
    try {
      const dimension = await this.getEmbeddingDimension();
      const indexName = this.getIndexName(bookId);
      
      console.log(`[VectorStoreV2] Initializing vector store for ${indexName} with dimension ${dimension}`);
      await this.ensureIndexExists(indexName, dimension);
    } catch (error) {
      console.error(`[VectorStoreV2] Failed to initialize vector store for ${bookId}:`, error);
      throw error;
    }
  }

  /**
   * Delete vector store index for a specific book
   */
  static async deleteBookVectorStore(bookId: string): Promise<void> {
    const indexName = this.getIndexName(bookId);
    try {
      await this.safeDeleteIndex(indexName);
      console.log(`[VectorStoreV2] Successfully deleted vector store index: ${indexName}`);
    } catch (error) {
      console.error(`[VectorStoreV2] Failed to delete vector store index ${indexName}:`, error);
      throw error;
    }
  }

  /**
   * Upsert exercises with robust error handling
   */
  static async upsertExercises(
    exercises: Array<{ id: string; exercise: Exercise; text: string }>,
    bookId?: string,
    options: {
      maxRetries?: number;
      batchSize?: number;
    } = {}
  ): Promise<void> {
    const { maxRetries = 3, batchSize = 50 } = options;
    const indexName = this.getIndexName(bookId);
    
    // Ensure index exists
    await this.initializeBookVectorStore(bookId);
    
    // Process in batches to avoid memory issues
    for (let i = 0; i < exercises.length; i += batchSize) {
      const batch = exercises.slice(i, i + batchSize);
      
      let attempt = 0;
      while (attempt < maxRetries) {
        try {
          const texts = batch.map(e => e.text);
          const embeddings = await generateEmbeddings(texts);

          // Normalize ALL embeddings to the expected dimension
          const expectedDimension = await this.getEmbeddingDimension();
          let dimensionCorrected = false;
          let correctionsCount = 0;

          let normalizedCount = 0;
          for (let j = 0; j < embeddings.length; j++) {
            let current = embeddings[j] as any;
            let actualDimension = Array.isArray(current) ? current.length : 0;

            if (actualDimension !== expectedDimension) {
              // Try structured extraction first
              if (typeof current === 'object' && current !== null) {
                const extracted = this.extractCorrectEmbedding(current, expectedDimension);
                if (extracted) {
                  embeddings[j] = extracted;
                  actualDimension = extracted.length;
                  dimensionCorrected = true;
                  normalizedCount++;
                }
              }

              // Force-correct if still mismatched
              if (actualDimension !== expectedDimension) {
                const forced = this.forceCorrectDimension(current, expectedDimension);
                embeddings[j] = forced;
                dimensionCorrected = true;
                correctionsCount++;
                if (Array.isArray(forced) && forced.length === expectedDimension) {
                  normalizedCount++;
                }
              }
            }
          }
          
          // Log dimension correction summary for this batch
          if (dimensionCorrected) {
            console.log(`[VectorStoreV2] Normalized ${correctionsCount}/${embeddings.length} embeddings to ${expectedDimension}d`);
          }
          
          // Filter out invalid embeddings (empty or wrong size)
          const expectedSize = expectedDimension;
          const validPairs = embeddings
            .map((vec, idx) => ({ vec, meta: batch[idx] }))
            .filter(item => Array.isArray(item.vec) && item.vec.length === expectedSize);

          const skipped = embeddings.length - validPairs.length;
          if (skipped > 0) {
            console.warn(`[VectorStoreV2] Skipping ${skipped} invalid embeddings in this batch`);
          }

          if (validPairs.length === 0) {
            console.warn(`[VectorStoreV2] No valid embeddings to upsert for this batch; continuing`);
            break;
          }

          await this.vectorStore.upsert({
            indexName,
            vectors: validPairs.map(v => v.vec as number[]),
            metadata: validPairs.map(({ meta: e }) => ({
              id: e.id,
              text: e.text,
              exercise: JSON.stringify(e.exercise),
              tema: e.exercise.tema,
              subtema: e.exercise.subtema || "",
              dificultad: e.exercise.dificultad,
              pagina: e.exercise.metadata?.pageNumber || 0,
              seccion: e.exercise.metadata?.seccion || "",
              // Book context metadata
              bookId: bookId || e.exercise.metadata?.bookId || null,
              bookName: e.exercise.metadata?.bookName || null,
              chapterId: e.exercise.metadata?.chapterId || null,
              chapterNumber: e.exercise.metadata?.chapterNumber || null,
              pageId: e.exercise.metadata?.pageId || null,
              pageNumber: e.exercise.metadata?.pageNumber || null,
              variant: e.exercise.metadata?.variant || null,
              // Artifact metadata
              hasArtifact: !!(e.exercise.metadata?.artifactDefinition),
              artifactEngine: e.exercise.metadata?.suggestedEngine || null,
              artifactType: e.exercise.metadata?.artifactDefinition 
                ? this.inferArtifactType(e.exercise.metadata.artifactDefinition.defBoards)
                : null,
            })),
          });
          
          console.log(`[VectorStoreV2] Upserted ${validPairs.length}/${batch.length} vectors for batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(exercises.length/batchSize)}`);
          // Accumulate embedding quality metrics if available via session context (bookId used as sessionId here only if matches)
          try {
            if (bookId) {
              SyncSummaryLogger.logEmbeddingQuality(bookId, {
                normalized: normalizedCount,
                skipped,
                upserted: validPairs.length,
              });
            }
          } catch {}
          
          // Log batch completion with dimension info
          if (dimensionCorrected) {
            console.log(`[VectorStoreV2] Batch ${Math.floor(i/batchSize) + 1} completed with dimension corrections applied`);
          }
          
          break; // Success, exit retry loop
        } catch (error) {
          attempt++;
          
          if (attempt >= maxRetries) {
            console.error(`[VectorStoreV2] Failed to upsert batch after ${maxRetries} attempts:`, error);
            throw error;
          }
          
          // Check if error is retryable
          const isRetryable = this.isRetryableError(error);
          if (!isRetryable) {
            console.error(`[VectorStoreV2] Non-retryable error in batch upsert:`, error);
            throw error;
          }
          
          const delay = 1000 * Math.pow(2, attempt - 1); // Exponential backoff
          console.warn(`[VectorStoreV2] Batch upsert attempt ${attempt} failed, retrying in ${delay}ms:`, error);
          await this.delay(delay);
        }
      }
    }
  }

  /**
   * Query similar exercises with improved filtering
   */
  static async querySimilarExercises(
    queryText: string,
    options: {
      topK?: number;
      tema?: string;
      dificultad?: string;
      bookId?: string;
      chapterId?: string;
      pageId?: string;
      hasArtifact?: boolean;
      artifactType?: string;
    } = {}
  ): Promise<Array<{ score: number; exercise: Exercise }>> {
    const { topK = 5, tema, dificultad, bookId, chapterId, pageId, hasArtifact, artifactType } = options;
    const indexName = this.getIndexName(bookId);

    try {
      // Ensure index exists
      const exists = await this.indexExists(indexName);
      if (!exists) {
        console.warn(`[VectorStoreV2] Index ${indexName} does not exist, cannot query`);
        return [];
      }

      const queryEmbedding = await generateEmbeddings([queryText]);
      // Ensure query vector has expected dimension
      const expectedDimension = await this.getEmbeddingDimension();
      let queryVector: any = queryEmbedding[0];
      if (!Array.isArray(queryVector) || queryVector.length !== expectedDimension) {
        const extracted = typeof queryVector === 'object' && queryVector !== null
          ? this.extractCorrectEmbedding(queryVector, expectedDimension)
          : null;
        queryVector = extracted || this.forceCorrectDimension(queryVector, expectedDimension);
      }
      
      const filter: Record<string, any> = {};
      if (tema) filter.tema = tema;
      if (dificultad) filter.dificultad = dificultad;
      if (bookId) filter.bookId = bookId;
      if (chapterId) filter.chapterId = chapterId;
      if (pageId) filter.pageId = pageId;
      if (hasArtifact !== undefined) filter.hasArtifact = hasArtifact;
      if (artifactType) filter.artifactType = artifactType;

      const results = await this.vectorStore.query({
        indexName,
        queryVector,
        topK,
        filter: Object.keys(filter).length > 0 ? filter : undefined,
      });

      return results.map((result) => ({
        score: result.score || 0,
        exercise: JSON.parse(result.metadata?.exercise as string) as Exercise,
      }));
    } catch (error) {
      console.error(`[VectorStoreV2] Query error for ${indexName}:`, error);
      return [];
    }
  }

  /**
   * Infer artifact type from defBoards structure
   */
  private static inferArtifactType(defBoards: Record<string, any>): string | null {
    if (!defBoards || Object.keys(defBoards).length === 0) return null;
    
    const defBoardsStr = JSON.stringify(defBoards).toLowerCase();
    
    if (defBoardsStr.match(/geometry|geometría|geometria|triangle|rect|shape|figure/i)) return "geometry";
    if (defBoardsStr.match(/curve|curva|function|función|funcion|graph|gráfico|grafico/i)) return "graph";
    if (defBoardsStr.match(/matrix|matriz|system|sistema|table|tabla/i)) return "matrix";
    if (defBoardsStr.match(/3d|three|dimensional|tridimensional/i)) return "3d";
    
    return "generic";
  }

  /**
   * Check if error is retryable
   */
  private static isRetryableError(error: any): boolean {
    if (!error) return false;
    
    const message = error instanceof Error ? error.message : String(error);
    
    return (
      message.includes('ECONNRESET') ||
      message.includes('ETIMEDOUT') ||
      message.includes('RATE_LIMIT') ||
      message.includes('quota') ||
      message.includes('timeout') ||
      message.includes('429') ||
      message.includes('503') ||
      message.includes('502') ||
      message.includes('connection')
    );
  }

  /**
   * Extract correct embedding from nested structure
   */
  private static extractCorrectEmbedding(nestedObj: any, expectedDimension: number): number[] | null {
    // Enhanced recursive search with 12288-dimension specific handling
    const findEmbedding = (obj: any, depth = 0): number[] | null => {
      if (depth > 8) return null; // Increased depth for better detection
      
      for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
          // Special handling for 12288-dimension embeddings (likely 32x384 structure)
          if (value.length === 12288) {
            console.log(`[VectorStoreV2] Detected 12288-dimension embedding in key: ${key}, attempting to extract correct 384-dimension vector`);
            
            // Try to extract the correct 384-dimension vector from the 12288 structure
            // Common patterns: it might be 32 chunks of 384, or have specific indices
            const extracted384 = this.extractFrom12288Dimension(value, expectedDimension);
            if (extracted384) {
              return extracted384;
            }
          }
          
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

  /**
   * Extract correct 384-dimension vector from 12288-dimension embedding
   * Handles common embedding structure patterns
   */
  private static extractFrom12288Dimension(largeEmbedding: number[], expectedDimension: number): number[] | null {
    try {
      // Pattern 1: First 384 elements (most common)
      if (largeEmbedding.length >= expectedDimension) {
        const first384 = largeEmbedding.slice(0, expectedDimension);
        console.log(`[VectorStoreV2] Extracted first ${expectedDimension} elements from 12288-dimension embedding`);
        return first384;
      }
      
      // Pattern 2: Check if it's 32 chunks of 384 (12288 / 384 = 32)
      if (largeEmbedding.length === 12288 && expectedDimension === 384) {
        const chunkSize = 384;
        const numChunks = 32;
        
        // Try different chunk selection strategies
        const strategies = [
          0,  // First chunk
          8,  // Middle chunk
          16, // Later chunk
          31  // Last chunk
        ];
        
        for (const chunkIndex of strategies) {
          const startIdx = chunkIndex * chunkSize;
          const endIdx = startIdx + chunkSize;
          const chunk = largeEmbedding.slice(startIdx, endIdx);
          
          // Validate this chunk looks like a reasonable embedding
          if (this.isValidEmbeddingChunk(chunk)) {
            console.log(`[VectorStoreV2] Extracted chunk ${chunkIndex} (${expectedDimension}d) from 12288-dimension embedding`);
            return chunk;
          }
        }
      }
      
      // Pattern 3: Average pooling across 32 chunks (12288 / 384 = 32)
      if (largeEmbedding.length === 12288 && expectedDimension === 384) {
        const pooled: number[] = new Array(384).fill(0);
        const chunkSize = 384; const numChunks = 32;
        for (let i = 0; i < chunkSize; i++) {
          let sum = 0;
          for (let k = 0; k < numChunks; k++) {
            sum += largeEmbedding[k * chunkSize + i] || 0;
          }
          pooled[i] = sum / numChunks;
        }
        console.log(`[VectorStoreV2] Created averaged pooled embedding (${expectedDimension}d) from 12288-dimension embedding`);
        return pooled;
      }
      
      return null;
    } catch (error) {
      console.error(`[VectorStoreV2] Error extracting from 12288-dimension embedding:`, error);
      return null;
    }
  }

  /**
   * Validate if an embedding chunk looks reasonable
   */
  private static isValidEmbeddingChunk(chunk: number[]): boolean {
    if (!Array.isArray(chunk) || chunk.length === 0) return false;
    
    // Check for reasonable value ranges (embeddings usually have small float values)
    const hasValidValues = chunk.some(val =>
      typeof val === 'number' &&
      !isNaN(val) &&
      isFinite(val) &&
      Math.abs(val) < 10
    );
    
    // Check for variance (not all zeros or identical values)
    const uniqueValues = new Set(chunk);
    const hasVariance = uniqueValues.size > chunk.length * 0.1; // At least 10% unique values
    
    return hasValidValues && hasVariance;
  }

  /**
   * Force correct dimension for embedding
   */
  private static forceCorrectDimension(embedding: any, expectedDimension: number): number[] {
    // Si es un array, truncar o pad
    if (Array.isArray(embedding)) {
      if (embedding.length > expectedDimension) {
        console.log(`[VectorStoreV2] Truncating embedding from ${embedding.length} to ${expectedDimension}`);
        return embedding.slice(0, expectedDimension);
      } else if (embedding.length < expectedDimension) {
        console.log(`[VectorStoreV2] Padding embedding from ${embedding.length} to ${expectedDimension}`);
        return [...embedding, ...new Array(expectedDimension - embedding.length).fill(0)];
      }
      return embedding;
    }
    
    // Si es un objeto, extraer valores numéricos
    if (typeof embedding === 'object' && embedding !== null) {
      const values = Object.values(embedding).filter(v => typeof v === 'number');
      if (values.length >= expectedDimension) {
        console.log(`[VectorStoreV2] Extracting ${expectedDimension} numeric values from object`);
        return values.slice(0, expectedDimension);
      } else if (values.length > 0) {
        console.log(`[VectorStoreV2] Padding ${values.length} numeric values to ${expectedDimension}`);
        return [...values, ...new Array(expectedDimension - values.length).fill(0)];
      }
    }
    
    // Último recurso: inválido; devolver vector vacío para ser filtrado aguas arriba
    console.warn(`[VectorStoreV2] Invalid embedding; will skip vector`);
    return [];
  }

  /**
   * Simple delay utility
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}