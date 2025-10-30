import { LRUCache } from "lru-cache";
import type { Exercise } from "@/types/exercise";

/**
 * Contexto RAG almacenado en caché
 */
export interface RAGContext {
  similarArtifacts: Array<{
    tema: string;
    subtema?: string;
    defBoards: Record<string, any>;
    rDef: Record<string, any>;
    engine?: string;
    similarity: number;
  }>;
  availableEngines: Array<{
    id: string;
    name: string;
    description?: string;
    tags: string[];
  }>;
  commonPatterns: Record<string, {
    defBoards: Record<string, any>;
    rDef: Record<string, any>;
    usageContext: string;
    count: number;
    topics: string[];
  }>;
}

/**
 * Contexto RAG con metadata de caché
 */
export interface CachedRAGContext {
  querySignature: string;
  context: RAGContext;
  timestamp: number;
  hitCount: number;
}

/**
 * LRU Cache para contextos RAG
 * TTL: 1 hora, máximo 500 entradas
 */
const ragContextCache = new LRUCache<string, CachedRAGContext>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hora
  updateAgeOnGet: true,
});

/**
 * Obtiene un contexto RAG del caché si existe
 */
export function getCachedRAGContext(
  querySignature: string
): CachedRAGContext | undefined {
  const cached = ragContextCache.get(querySignature);
  
  if (cached) {
    // Incrementar contador de hits
    cached.hitCount++;
    ragContextCache.set(querySignature, cached);
    
    return cached;
  }
  
  return undefined;
}

/**
 * Guarda un contexto RAG en el caché
 */
export function setCachedRAGContext(
  querySignature: string,
  context: RAGContext
): void {
  const cached: CachedRAGContext = {
    querySignature,
    context,
    timestamp: Date.now(),
    hitCount: 0,
  };
  
  ragContextCache.set(querySignature, cached);
}

/**
 * Construye una firma única para el query basada en el ejercicio
 * Esta firma se usa como clave de caché
 */
export function buildQuerySignature(exercise: Exercise): string {
  const parts: string[] = [];
  
  // Incluir tema y subtema (si existe)
  if (exercise.tema) {
    parts.push(exercise.tema.toLowerCase().trim());
  }
  
  if (exercise.subtema) {
    parts.push(exercise.subtema.toLowerCase().trim());
  }
  
  // Incluir dificultad
  if (exercise.dificultad) {
    parts.push(exercise.dificultad.toLowerCase().trim());
  }
  
  // Incluir bookId y chapterId si existen (para contexto específico)
  if (exercise.metadata?.bookId) {
    parts.push(`book:${exercise.metadata.bookId}`);
  }
  
  if (exercise.metadata?.chapterId) {
    parts.push(`chapter:${exercise.metadata.chapterId}`);
  }
  
  // Crear firma combinando todas las partes
  return parts.join("|");
}

/**
 * Limpia el caché (útil para testing o reset)
 */
export function clearRAGContextCache(): void {
  ragContextCache.clear();
}

/**
 * Obtiene estadísticas del caché
 */
export function getRAGCacheStats() {
  return {
    size: ragContextCache.size,
    calculatedSize: ragContextCache.calculatedSize,
    remainingTTL: ragContextCache.remainingTTL ? ragContextCache.remainingTTL : undefined,
  };
}

/**
 * Verifica si una firma existe en el caché
 */
export function hasCachedRAGContext(querySignature: string): boolean {
  return ragContextCache.has(querySignature);
}



