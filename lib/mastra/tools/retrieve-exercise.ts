import { createVectorQueryTool } from "@mastra/rag";
import { vectorStore, INDEX_NAME } from "@/lib/rag/vector-store";
import { embeddingModel } from "@/lib/rag/embeddings";

export const retrieveExerciseTool = createVectorQueryTool({
  vectorStore: vectorStore,
  indexName: INDEX_NAME,
  model: embeddingModel,
  description: "Busca ejercicios matemáticos similares en la base de datos usando búsqueda semántica. Úsalo cuando el usuario quiera encontrar ejercicios sobre un tema específico o consultar ejercicios existentes.",
});

