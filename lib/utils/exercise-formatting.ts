import { Exercise } from "@/types/exercise";
import type { Engine } from "@/lib/books/types";

/**
 * Formatea un ejercicio para su visualización en la UI
 */
export function formatExerciseForDisplay(exercise: Exercise) {
  return {
    ...exercise,
    formattedEnunciado: latexToMathJax(exercise.enunciado),
    formattedSolucion: latexToMathJax(exercise.solucion),
    temaLabel: exercise.tema,
    subtemaLabel: exercise.subtema || "Sin subtema",
    dificultadLabel: getDificultadLabel(exercise.dificultad),
    metadataSummary: formatMetadataSummary(exercise.metadata),
  };
}

/**
 * Convierte LaTeX a formato MathJax compatible
 * Reemplaza patrones comunes de LaTeX a formato que MathJax puede procesar
 */
export function latexToMathJax(latex: string): string {
  if (!latex) return "";
  
  // MathJax ya procesa LaTeX directamente, pero podemos hacer algunas normalizaciones
  let formatted = latex;
  
  // Asegurar que las ecuaciones en display están en formato correcto
  // Convertir \[ \] a $$ $$
  formatted = formatted.replace(/\\\[/g, "$$");
  formatted = formatted.replace(/\\\]/g, "$$");
  
  // Convertir \( \) a $ $ (inline)
  formatted = formatted.replace(/\\\(/g, "$");
  formatted = formatted.replace(/\\\)/g, "$");
  
  // Limpiar espacios extra alrededor de los delimitadores
  formatted = formatted.replace(/\$\$\s+/g, "$$ ");
  formatted = formatted.replace(/\s+\$\$/g, " $$");
  
  return formatted;
}

/**
 * Obtiene una etiqueta legible para el nivel de dificultad
 */
function getDificultadLabel(dificultad: "básica" | "media" | "avanzada"): string {
  const labels = {
    "básica": "Básica",
    "media": "Media",
    "avanzada": "Avanzada",
  };
  return labels[dificultad] || dificultad;
}

/**
 * Formatea el resumen de metadata del ejercicio
 */
function formatMetadataSummary(metadata?: Exercise["metadata"]): string {
  if (!metadata) return "";
  
  const parts: string[] = [];
  
  if (metadata.pagina) {
    parts.push(`Página ${metadata.pagina}`);
  }
  
  if (metadata.capitulo) {
    parts.push(`Cap. ${metadata.capitulo}`);
  }
  
  if (metadata.seccion) {
    parts.push(`Sec. ${metadata.seccion}`);
  }
  
  return parts.join(" • ");
}

/**
 * Formatea información de tool calls para mostrar en la UI
 */
export function formatToolCallInfo(toolCall: any): {
  toolName: string;
  displayName: string;
  status: "executing" | "completed" | "error";
  summary?: string;
  details?: any;
} {
  const toolName = toolCall.toolName || toolCall.name || "unknown";
  
  const displayNames: Record<string, string> = {
    detectIntent: "Detectando intención",
    "detect-intent": "Detectando intención",
    generateVariation: "Generando variación",
    "generate-variation": "Generando variación",
    retrieveExercise: "Buscando ejercicios",
    "retrieve-exercise": "Buscando ejercicios",
  };
  
  const displayName = displayNames[toolName] || `Ejecutando ${toolName}`;
  
  let status: "executing" | "completed" | "error" = "executing";
  let summary: string | undefined;
  let details: any;
  
  if (toolCall.result) {
    status = "completed";
    details = toolCall.result;
    
    // Generar resumen basado en el tipo de tool
    if (toolName === "detectIntent" || toolName === "detect-intent") {
      const intent = toolCall.result.intent;
      const confidence = toolCall.result.confidence;
      summary = `Intención detectada: ${intent} (${(confidence * 100).toFixed(0)}% confianza)`;
    } else if (toolName === "generateVariation" || toolName === "generate-variation") {
      summary = "Variación generada exitosamente";
    } else if (toolName === "retrieveExercise" || toolName === "retrieve-exercise") {
      const count = Array.isArray(toolCall.result.sources) 
        ? toolCall.result.sources.length 
        : 0;
      summary = `${count} ejercicio(s) encontrado(s)`;
    }
  } else if (toolCall.error) {
    status = "error";
    summary = `Error: ${toolCall.error}`;
  }
  
  return {
    toolName,
    displayName,
    status,
    summary,
    details,
  };
}

/**
 * Extrae ejercicios de las tool calls para mostrar en la UI
 */
export function extractExercisesFromToolResults(toolResults: any[]): Exercise[] {
  const exercises: Exercise[] = [];
  
  for (const result of toolResults) {
    if (result.toolName === "retrieveExercise" || result.toolName === "retrieve-exercise") {
      if (result.result?.sources && Array.isArray(result.result.sources)) {
        for (const source of result.result.sources) {
          // Intentar extraer el ejercicio del metadata del source
          if (source.metadata?.exercise) {
            exercises.push(source.metadata.exercise);
          } else if (source.document) {
            // Si solo hay documento de texto, intentar parsearlo
            try {
              const parsed = JSON.parse(source.document);
              if (parsed && typeof parsed === "object" && parsed.tema) {
                exercises.push(parsed);
              }
            } catch {
              // Ignorar si no se puede parsear
            }
          }
        }
      }
    } else if (result.toolName === "generateVariation" || result.toolName === "generate-variation") {
      if (result.result?.exercise) {
        exercises.push(result.result.exercise);
      }
    }
  }
  
  return exercises;
}

/**
 * Extrae información de ejercicio con artefacto de un mensaje del chat
 * Retorna null si no hay ejercicio con artefacto, o un objeto con la información completa
 */
export function extractExerciseWithArtifact(message: any): {
  exercise?: Exercise;
  definition?: { defBoards?: Record<string, any>; artifacts?: Record<string, any>; rDef?: Record<string, any> };
  artifactDefinition: { defBoards: Record<string, any>; rDef: Record<string, any> };
  suggestedEngine?: string;
  engines?: Engine[];
  bookId?: string;
  chapterId?: string;
  viewConfig?: any; // ViewConfiguration from view-config-extractor
} | null {
  if (!message.parts || !Array.isArray(message.parts)) {
    return null;
  }

  // Buscar en tool calls
  for (const part of message.parts) {
    // Handle AI SDK v5 tool parts: type like "tool-generateVariation" or "tool-generate-variation"
    const isToolV5 = typeof part.type === "string" && part.type.startsWith("tool-");
    const isToolCall = part.type === "tool-call" || part.type === "tool" || isToolV5;
    
    if (isToolCall) {
      // Extract tool name from different formats
      let toolName: string | undefined;
      if (isToolV5) {
        // Extract from "tool-generateVariation" -> "generateVariation"
        toolName = part.type.slice("tool-".length);
      } else {
        toolName = part.toolName || part.name;
      }

      console.log("[extractExerciseWithArtifact] Checking tool part:", {
        type: part.type,
        toolName,
        hasOutput: !!(part.output || part.result),
        outputKeys: part.output ? Object.keys(part.output) : [],
        resultKeys: part.result ? Object.keys(part.result) : [],
      });

      // Buscar generate-variation tool
      if (toolName === "generateVariation" || toolName === "generate-variation" || toolName === "generateVariation-v2" || toolName === "generate-variation-v2") {
        const output = part.result || part.output;
        
        console.log("[extractExerciseWithArtifact] generateVariation tool found, output:", {
          hasOutput: !!output,
          hasExercise: !!(output?.exercise),
          hasDefinition: !!(output?.definition),
          hasArtifactDefinition: !!(output?.artifactDefinition),
          outputKeys: output ? Object.keys(output) : [],
        });
        
        // Caso 1: Tiene exercise con artifactDefinition (mantener lógica actual)
        if (output?.exercise) {
          const exercise = output.exercise as Exercise;
          
          // Verificar si tiene artifactDefinition en metadata o en el resultado directo
          const artifactDef = 
            output.artifactDefinition ||
            exercise.metadata?.artifactDefinition;
          
          const suggestedEngine = 
            output.suggestedEngine ||
            exercise.metadata?.suggestedEngine;

          if (artifactDef && (artifactDef.defBoards || artifactDef.rDef)) {
            return {
              exercise,
              artifactDefinition: {
                defBoards: artifactDef.defBoards || {},
                rDef: artifactDef.rDef || {},
              },
              suggestedEngine: suggestedEngine || undefined,
              bookId: exercise.metadata?.bookId,
              chapterId: exercise.metadata?.chapterId,
            };
          }
        }
        
        // Caso 2: Tiene definition directamente (sin exercise)
        if (output?.definition) {
          const definition = output.definition;
          const artifactDef = output.artifactDefinition || {
            defBoards: definition.defBoards || {},
            rDef: definition.rDef || (definition.artifacts ? { artifacts: definition.artifacts } : {}),
          };
          
          if (artifactDef && (artifactDef.defBoards || artifactDef.rDef || definition.artifacts)) {
            return {
              definition,
              artifactDefinition: {
                defBoards: artifactDef.defBoards || definition.defBoards || {},
                rDef: artifactDef.rDef || definition.rDef || (definition.artifacts ? { artifacts: definition.artifacts } : {}),
              },
              suggestedEngine: output.suggestedEngine,
              bookId: output.bookId,
              chapterId: output.chapterId,
            };
          }
        }
      }

      // Buscar generate-artifact-definition tool
      if (toolName === "generateArtifactDefinition" || toolName === "generate-artifact-definition") {
        if (part.result?.definition) {
          // En este caso necesitamos encontrar el ejercicio asociado
          // Podría estar en otro tool call o en el contexto del mensaje
          // Por ahora retornamos null ya que necesitamos el ejercicio completo
          // Esto se manejará mejor cuando se integre con el chat
        }
      }

      // Buscar retrieve-exercise tool
      if (toolName === "retrieveExercise" || toolName === "retrieve-exercise" || toolName === "retrieveExercise-v2" || toolName === "retrieve-exercise-v2") {
        // Intentar múltiples formatos posibles del output
        const output = part.result || part.output || {};
        
        // El tool retorna { results: [...], ambiguous: boolean }
        const results = output.results || (Array.isArray(output) ? output : []);
        
        console.log("[extractExerciseWithArtifact] retrieve-exercise tool found, output structure:", {
          hasResult: !!part.result,
          hasOutput: !!part.output,
          resultKeys: part.result ? Object.keys(part.result) : [],
          outputKeys: part.output ? Object.keys(part.output) : [],
          resultsIsArray: Array.isArray(results),
          resultsCount: Array.isArray(results) ? results.length : 0,
          firstResultKeys: Array.isArray(results) && results.length > 0 ? Object.keys(results[0]) : [],
        });
        
        // Buscar el primer resultado que tenga definition con artefactos
        for (const result of results) {
          const artifactDef = result.definition || result.artifactDefinition;
          if (artifactDef && (artifactDef.defBoards || artifactDef.rDef || artifactDef.artifacts)) {
            // Normalizar chapterId: "MG_cap_0" -> "0" o extraer número
            let normalizedChapterId = result.chapterId;
            if (normalizedChapterId && typeof normalizedChapterId === 'string' && normalizedChapterId.includes('_cap_')) {
              // Extraer el número: "MG_cap_0" -> "0"
              const match = normalizedChapterId.match(/cap_(\d+)/);
              normalizedChapterId = match ? match[1] : normalizedChapterId.replace(/.*cap_/, '');
            }
            
            // Crear un ejercicio mínimo basado en la información disponible
            const exercise: Exercise = {
              id: result.pageId || `page_${Date.now()}`,
              tema: result.text?.split(':')[0]?.trim() || 'Ejercicio matemático',
              dificultad: 'media',
              enunciado: `Ejercicio de ${result.bookId || 'libro'} - ${normalizedChapterId || 'capítulo'} - Página ${result.pageNumber || '?'}`,
              solucion: '',
            };
            
            // Convertir engines del formato del tool al formato Engine
            const enginesRaw = result.engines;
            console.log("[extractExerciseWithArtifact] Raw engines from result:", {
              enginesRaw,
              isArray: Array.isArray(enginesRaw),
              count: Array.isArray(enginesRaw) ? enginesRaw.length : 0,
              firstEngine: Array.isArray(enginesRaw) && enginesRaw.length > 0 ? enginesRaw[0] : null,
            });
            
            const engines = enginesRaw?.map((eng: any) => {
              // El tool retorna: { name, path, type, chapterId }
              const engineId = eng.name?.replace(/\.js$/, '') || 
                             eng.path?.split('/').pop()?.replace(/\.js$/, '') || 
                             'unknown';
              const engineName = eng.name || eng.path?.split('/').pop() || 'unknown';
              const engineFile = eng.path || 
                               `class/engines/cap_${normalizedChapterId}/${eng.name || 'unknown.js'}`;
              
              return {
                id: engineId,
                name: engineName,
                file: engineFile,
                description: `${eng.type === 'generic' ? 'Generic' : 'Chapter-specific'} engine`,
                chapterId: normalizedChapterId,
                // Campos adicionales para compatibilidad
                bookId: result.bookId,
                type: eng.type === 'generic' ? 'general' : (eng.type || 'general'),
              } as Engine & { bookId?: string; type?: string };
            }) || [];
            
            console.log("[extractExerciseWithArtifact] retrieve-exercise engines extracted:", {
              enginesCount: engines.length,
              engines: engines.map(e => ({ id: e.id, name: e.name, file: e.file })),
              suggestedEngine: result.suggestedEngine,
              bookId: result.bookId,
              chapterId: normalizedChapterId,
              hasEnginesInResult: !!result.engines,
              hasSuggestedEngineInResult: !!result.suggestedEngine,
            });
            
            return {
              exercise,
              artifactDefinition: {
                defBoards: artifactDef.defBoards || {},
                rDef: artifactDef.rDef || (artifactDef.artifacts ? { artifacts: artifactDef.artifacts } : {}),
              },
              suggestedEngine: result.suggestedEngine,
              engines,
              bookId: result.bookId,
              chapterId: normalizedChapterId,
              viewConfig: result.viewConfig, // Include viewConfig if available
            };
          }
        }
      }
    }
  }

  console.log("[extractExerciseWithArtifact] No artifact data found in message parts");
  return null;
}


