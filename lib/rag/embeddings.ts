import { ModelRouterEmbeddingModel } from "@mastra/core";
import { embedMany } from "ai";
import { LRUCache } from "lru-cache";

// Using Google's free embedding model
const embeddingModel = new ModelRouterEmbeddingModel("google/gemini-embedding-001");

// LRU Cache for embeddings (max 1000 entries, 24h TTL)
const embeddingCache = new LRUCache<string, number[]>({
  max: 1000,
  ttl: 1000 * 60 * 60 * 24, // 24 hours
});

/**
 * Get the actual dimension of embeddings from the model
 * This will generate a test embedding to determine the dimension
 */
export async function getEmbeddingDimension(): Promise<number> {
  try {
    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: ["test"],
    });
    return embeddings[0]?.length || 768;
  } catch (error) {
    console.warn("Could not determine embedding dimension, defaulting to 768:", error);
    return 768;
  }
}

/**
 * Generate embeddings for multiple text chunks with caching
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  // Check cache for each text
  const cacheResults: (number[] | null)[] = texts.map((text) => {
    const cached = embeddingCache.get(text);
    return cached || null;
  });

  // Find texts that need embedding generation
  const textsToEmbed: { text: string; index: number }[] = [];
  cacheResults.forEach((cached, index) => {
    if (!cached) {
      textsToEmbed.push({ text: texts[index], index });
    }
  });

  // Generate embeddings only for uncached texts
  let newEmbeddings: number[][] = [];
  if (textsToEmbed.length > 0) {
    const textsToProcess = textsToEmbed.map((item) => item.text);
    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: textsToProcess,
    });
    newEmbeddings = embeddings;

    // Cache the new embeddings
    textsToEmbed.forEach((item, idx) => {
      embeddingCache.set(item.text, newEmbeddings[idx]);
    });
  }

  // Combine cached and new embeddings in correct order
  const result: number[][] = [];
  let newIdx = 0;
  cacheResults.forEach((cached) => {
    if (cached) {
      result.push(cached);
    } else {
      result.push(newEmbeddings[newIdx]);
      newIdx++;
    }
  });

  return result;
}

/**
 * Generate a single embedding with caching
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const cached = embeddingCache.get(text);
  if (cached) {
    return cached;
  }

  const embeddings = await generateEmbeddings([text]);
  return embeddings[0];
}

/**
 * Clear the embedding cache (useful for testing or memory management)
 */
export function clearEmbeddingCache(): void {
  embeddingCache.clear();
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    size: embeddingCache.size,
    calculatedSize: embeddingCache.calculatedSize,
  };
}

export { embeddingModel };
