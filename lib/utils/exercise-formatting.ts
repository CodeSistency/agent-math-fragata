import { Exercise } from "@/types/exercise";

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


