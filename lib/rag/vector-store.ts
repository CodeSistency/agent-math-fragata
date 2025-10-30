import { LibSQLVector } from "@mastra/libsql";
import { generateEmbeddings, getEmbeddingDimension } from "./embeddings";
import type { Exercise } from "@/types/exercise";

// Get actual embedding dimension dynamically
let EMBEDDING_DIMENSION = 768; // Default, will be updated on first use

// Initialize dimension on module load
getEmbeddingDimension().then((dim) => {
  EMBEDDING_DIMENSION = dim;
  console.log(`Embedding dimension detected: ${EMBEDDING_DIMENSION}`);
}).catch((err) => {
  console.warn(`Could not detect embedding dimension, using default 768:`, err);
});

import { env } from "@/lib/env";

const vectorStore = new LibSQLVector({
  connectionUrl: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

const INDEX_NAME = "exercises";

/**
 * Generate index name for a specific book
 */
export function getIndexName(bookId?: string): string {
  if (!bookId) {
    return INDEX_NAME; // Default global index
  }
  return `${bookId}_exercises`;
}

/**
 * Check if index exists
 */
async function indexExists(indexName: string): Promise<boolean> {
  try {
    const indexes = await vectorStore.listIndexes();
    return indexes.includes(indexName);
  } catch (error) {
    // If listIndexes fails, assume index doesn't exist
    return false;
  }
}

/**
 * Initialize the vector store index (global default)
 */
export async function initializeVectorStore() {
  return initializeBookVectorStore();
}

/**
 * Initialize vector store index for a specific book
 */
export async function initializeBookVectorStore(bookId?: string) {
  const indexName = getIndexName(bookId);
  
  // Ensure we have the correct dimension
  const actualDimension = await getEmbeddingDimension();
  if (actualDimension !== EMBEDDING_DIMENSION) {
    console.log(`Updating embedding dimension from ${EMBEDDING_DIMENSION} to ${actualDimension}`);
    EMBEDDING_DIMENSION = actualDimension;
  }
  
  try {
    const exists = await indexExists(indexName);
    if (!exists) {
      await vectorStore.createIndex({
        indexName,
        dimension: EMBEDDING_DIMENSION,
      });
    } else {
      // Verify the dimension matches by checking if we can query with correct dimension
      // This is a workaround - if dimension mismatch, we'll catch it during upsert
      console.log(`Index ${indexName} already exists`);
    }
  } catch (error) {
    // If error is about dimension mismatch, try to delete and recreate
    if (error instanceof Error && error.message.includes("dimension")) {
      console.log(`Dimension mismatch detected for ${indexName}, attempting to delete and recreate...`);
      if (bookId) {
        try {
          await vectorStore.deleteIndex({ indexName });
          await new Promise(resolve => setTimeout(resolve, 100));
          await vectorStore.createIndex({
            indexName,
            dimension: EMBEDDING_DIMENSION,
          });
          console.log(`Successfully recreated index ${indexName} with correct dimension ${EMBEDDING_DIMENSION}`);
        } catch (recreateError) {
          throw new Error(`Failed to recreate index ${indexName}: ${recreateError instanceof Error ? recreateError.message : String(recreateError)}`);
        }
      } else {
        throw error;
      }
    } else if (error instanceof Error && !error.message.includes("already exists")) {
      throw error;
    }
  }
}

/**
 * Delete vector store index for a specific book
 */
export async function deleteBookVectorStore(bookId: string): Promise<void> {
  const indexName = getIndexName(bookId);
  try {
    const exists = await indexExists(indexName);
    if (exists) {
      console.log(`Deleting vector store index: ${indexName}`);
      await vectorStore.deleteIndex({ indexName });
      // Wait a bit to ensure deletion is complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Verify deletion
      const stillExists = await indexExists(indexName);
      if (stillExists) {
        console.warn(`Index ${indexName} still exists after deletion attempt`);
        // Try to force delete by recreating with correct dimension
        throw new Error(`Failed to delete index ${indexName}. Please delete it manually.`);
      }
    }
  } catch (error) {
    // If error is about index not found, that's fine
    if (error instanceof Error && error.message.includes("not found")) {
      return;
    }
    // If error is about dimension mismatch, we need to delete it differently
    if (error instanceof Error && error.message.includes("dimension")) {
      throw error;
    }
    // Re-throw other errors
    throw error;
  }
}

/**
 * Infiere el tipo de artefacto basado en la estructura de defBoards
 */
function inferArtifactType(defBoards: Record<string, any>): string | null {
  if (!defBoards || Object.keys(defBoards).length === 0) return null;
  
  const defBoardsStr = JSON.stringify(defBoards).toLowerCase();
  
  if (defBoardsStr.match(/geometry|geometría|geometria|triangle|rect|shape|figure/i)) return "geometry";
  if (defBoardsStr.match(/curve|curva|function|función|funcion|graph|gráfico|grafico|plot/i)) return "graph";
  if (defBoardsStr.match(/matrix|matriz|system|sistema|table|tabla/i)) return "matrix";
  if (defBoardsStr.match(/3d|three|dimensional|tridimensional/i)) return "3d";
  
  return "generic";
}

/**
 * Upsert exercises into the vector store
 */
export async function upsertExercises(
  exercises: Array<{ id: string; exercise: Exercise; text: string }>,
  bookId?: string
) {
  const indexName = getIndexName(bookId);
  
  // Ensure we have the correct dimension
  const actualDimension = await getEmbeddingDimension();
  if (actualDimension !== EMBEDDING_DIMENSION) {
    console.log(`Updating embedding dimension from ${EMBEDDING_DIMENSION} to ${actualDimension}`);
    EMBEDDING_DIMENSION = actualDimension;
  }
  
  // Ensure index exists
  await initializeBookVectorStore(bookId);
  
  const texts = exercises.map((e) => e.text);
  const embeddings = await generateEmbeddings(texts);

  // Verify embedding dimension matches
  if (embeddings.length > 0 && embeddings[0].length !== EMBEDDING_DIMENSION) {
    console.warn(`Embedding dimension mismatch: expected ${EMBEDDING_DIMENSION}, got ${embeddings[0].length}`);
    EMBEDDING_DIMENSION = embeddings[0].length;
  }

  try {
    await vectorStore.upsert({
      indexName,
      vectors: embeddings,
      metadata: exercises.map((e) => ({
        id: e.id,
        text: e.text,
        exercise: JSON.stringify(e.exercise),
        tema: e.exercise.tema,
        subtema: e.exercise.subtema || "",
        dificultad: e.exercise.dificultad,
        pagina: e.exercise.metadata?.pagina || 0,
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
          ? inferArtifactType(e.exercise.metadata.artifactDefinition.defBoards)
          : null,
      })),
    });
  } catch (error) {
    // If error is about dimension mismatch, try to fix it
    if (error instanceof Error && error.message.includes("dimension")) {
      console.warn(`Dimension mismatch detected for ${indexName}, attempting to fix...`);
      
      if (bookId) {
        // Delete the index with wrong dimension
        try {
          await vectorStore.deleteIndex({ indexName });
          await new Promise(resolve => setTimeout(resolve, 200));
          
          // Verify deletion
          const stillExists = await indexExists(indexName);
          if (stillExists) {
            throw new Error(`Failed to delete index ${indexName} with wrong dimension`);
          }
          
          // Create new index with correct dimension
          await vectorStore.createIndex({
            indexName,
            dimension: EMBEDDING_DIMENSION,
          });
          
          console.log(`Successfully recreated index ${indexName} with correct dimension ${EMBEDDING_DIMENSION}`);
          
          // Retry upsert
          await vectorStore.upsert({
            indexName,
            vectors: embeddings,
            metadata: exercises.map((e) => ({
              id: e.id,
              text: e.text,
              exercise: JSON.stringify(e.exercise),
              tema: e.exercise.tema,
              subtema: e.exercise.subtema || "",
              dificultad: e.exercise.dificultad,
              pagina: e.exercise.metadata?.pagina || 0,
              seccion: e.exercise.metadata?.seccion || "",
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
                ? inferArtifactType(e.exercise.metadata.artifactDefinition.defBoards)
                : null,
            })),
          });
        } catch (fixError) {
          throw new Error(`Failed to fix dimension mismatch for ${indexName}: ${fixError instanceof Error ? fixError.message : String(fixError)}`);
        }
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
}

/**
 * Query similar exercises
 */
export async function querySimilarExercises(
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
) {
  const { topK = 5, tema, dificultad, bookId, chapterId, pageId, hasArtifact, artifactType } = options;
  const indexName = getIndexName(bookId);

  // Ensure index exists before querying
  await initializeBookVectorStore(bookId);

  const exists = await indexExists(indexName);
  if (!exists) {
    return [];
  }

  const queryEmbedding = await generateEmbeddings([queryText]);
  
  const filter: Record<string, any> = {};
  if (tema) {
    filter.tema = tema;
  }
  if (dificultad) {
    filter.dificultad = dificultad;
  }
  if (bookId) {
    filter.bookId = bookId;
  }
  if (chapterId) {
    filter.chapterId = chapterId;
  }
  if (pageId) {
    filter.pageId = pageId;
  }
  if (hasArtifact !== undefined) {
    filter.hasArtifact = hasArtifact;
  }
  if (artifactType) {
    filter.artifactType = artifactType;
  }

  try {
    const results = await vectorStore.query({
      indexName,
      queryVector: queryEmbedding[0],
      topK,
      filter: Object.keys(filter).length > 0 ? filter : undefined,
    });

    return results.map((result) => ({
      ...result,
      exercise: JSON.parse(result.metadata?.exercise as string) as Exercise,
    }));
  } catch (error) {
    // If query fails (e.g., table doesn't exist), return empty array
    if (error instanceof Error && error.message.includes("no such table")) {
      return [];
    }
    throw error;
  }
}

/**
 * List all exercises with optional filters and pagination
 * Uses direct database query instead of vector search
 */
export async function listExercises(options: {
  tema?: string;
  dificultad?: "básica" | "media" | "avanzada";
  bookId?: string;
  chapterId?: string;
  pageId?: string;
  page?: number;
  limit?: number;
} = {}): Promise<{
  exercises: Exercise[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  const { tema, dificultad, bookId, chapterId, pageId, page = 1, limit = 20 } = options;
  const offset = (page - 1) * limit;
  const indexName = getIndexName(bookId);

  // Ensure index exists before querying
  await initializeBookVectorStore(bookId);

  const exists = await indexExists(indexName);
  if (!exists) {
    // Return empty result if index doesn't exist
    return {
      exercises: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  }

  try {
    // Query metadata table directly
    // LibSQLVector stores metadata in a table, we need to query it
    // Since we don't have direct access to the table structure, we'll use a workaround
    // by querying with a dummy vector and large topK, then filtering
    const allResults = await vectorStore.query({
      indexName,
      queryVector: new Array(EMBEDDING_DIMENSION).fill(0), // Dummy vector
      topK: 10000, // Large number to get all
    });

    // Filter and paginate results
    let filtered = allResults.map((result) => ({
      ...result,
      exercise: JSON.parse(result.metadata?.exercise as string) as Exercise,
    }));

    // Apply filters
    if (tema) {
      filtered = filtered.filter((r) =>
        r.exercise.tema.toLowerCase().includes(tema.toLowerCase())
      );
    }
    if (dificultad) {
      filtered = filtered.filter((r) => r.exercise.dificultad === dificultad);
    }
    if (bookId) {
      filtered = filtered.filter((r) => 
        r.exercise.metadata?.bookId === bookId
      );
    }
    if (chapterId) {
      filtered = filtered.filter((r) => 
        r.exercise.metadata?.chapterId === chapterId
      );
    }
    if (pageId) {
      filtered = filtered.filter((r) => 
        r.exercise.metadata?.pageId === pageId
      );
    }

    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);

    return {
      exercises: paginated.map((r) => r.exercise),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    // If query fails (e.g., table doesn't exist or is empty), return empty result
    if (error instanceof Error && error.message.includes("no such table")) {
      return {
        exercises: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
      };
    }
    throw error;
  }
}

export { vectorStore, INDEX_NAME, EMBEDDING_DIMENSION };



