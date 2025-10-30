import { ModelRouterEmbeddingModel } from "@mastra/core";
import { embedMany } from "ai";
import { LRUCache } from "lru-cache";

// Provider selection: 'local' (default), 'google', or 'hf'
const PROVIDER = process.env.EMBEDDINGS_PROVIDER?.toLowerCase() || "local";

// Remote model (google/hf)
const embeddingModel = new ModelRouterEmbeddingModel(
  PROVIDER === "google" ? "google/gemini-embedding-001" : (process.env.EMBEDDINGS_REMOTE_MODEL || "google/gemini-embedding-001")
);

// Local model configuration
const LOCAL_MODEL = process.env.EMBEDDINGS_MODEL || "Xenova/all-MiniLM-L6-v2"; // 384 dims
let localEmbedderPromise: Promise<(
  texts: string[]
) => Promise<number[][]>> | null = null;

async function getLocalEmbedder(): Promise<(texts: string[]) => Promise<number[][]>> {
  if (localEmbedderPromise) return localEmbedderPromise;
  localEmbedderPromise = (async () => {
    // Avoid optional image deps (e.g., sharp) pulled by image pipelines
    try { process.env.TRANSFORMERS_DISABLE_IMAGE = "1"; } catch {}
    // Dynamic import to avoid bundling in environments without wasm
    // @ts-ignore
    const { pipeline } = await import("@xenova/transformers");
    const extractor: any = await pipeline("feature-extraction", LOCAL_MODEL);
    const maxBatch = Number(process.env.EMBEDDINGS_LOCAL_BATCH || 32);

    return async (texts: string[]): Promise<number[][]> => {
      const outputs: number[][] = [];
      for (let i = 0; i < texts.length; i += maxBatch) {
        const slice = texts.slice(i, i + maxBatch);
        // extractor returns tensor or array; ensure array
        // Mean-pool over sequence dimension
        // @ts-ignore
        const feats: any = await extractor(slice, { pooling: "mean", normalize: true });
        // feats can be Float32Array[] or Tensor
        if (Array.isArray(feats)) {
          for (const v of feats as any[]) {
            outputs.push(Array.from(v as Float32Array));
          }
        } else if (feats?.data) {
          // Single input case (shouldn't happen with array), fallback
          outputs.push(Array.from(feats.data as Float32Array));
        }
      }
      return outputs;
    };
  })();
  return localEmbedderPromise;
}

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
    if (PROVIDER === "local") {
      try {
        const embed = await getLocalEmbedder();
        const vecs = await embed(["test"]);
        return vecs[0]?.length || 384;
      } catch (e) {
        console.warn("Local embeddings unavailable, defaulting dimension:", e);
        return 384;
      }
    } else {
      const { embeddings } = await embedMany({
        model: embeddingModel,
        values: ["test"],
      });
      return embeddings[0]?.length || 768;
    }
  } catch (error) {
    console.warn("Could not determine embedding dimension, defaulting:", error);
    return PROVIDER === "local" ? 384 : 768;
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
    if (PROVIDER === "local") {
      try {
        const embed = await getLocalEmbedder();
        newEmbeddings = await embed(textsToProcess);
      } catch (e) {
        console.warn("Local embeddings failed, skipping embedding generation for this batch:", e);
        throw e;
      }
    } else {
      // Remote provider batching (Gemini limit 100)
      const BATCH_LIMIT = Number(process.env.EMBEDDINGS_REMOTE_BATCH || 100);
      const batchedEmbeddings: number[][] = [];
      for (let i = 0; i < textsToProcess.length; i += BATCH_LIMIT) {
        const slice = textsToProcess.slice(i, i + BATCH_LIMIT);
        const { embeddings } = await embedMany({
          model: embeddingModel,
          values: slice,
        });
        batchedEmbeddings.push(...embeddings);
      }
      newEmbeddings = batchedEmbeddings;
    }

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
