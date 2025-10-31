import type { Exercise } from "@/types/exercise";

/**
 * Contexto RAG para enriquecer la generación de artefactos
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
 * Construye un prompt enriquecido con tags semánticos XML-like
 * para generar definiciones de artefactos usando contexto RAG
 */
export function buildArtifactGenerationPrompt(
  exercise: Exercise,
  ragContext: RAGContext
): string {
  return `
<role>
Eres un experto en generar definiciones de artefactos interactivos para ejercicios matemáticos usando JSXGraph.
</role>

<task>
Analiza el ejercicio proporcionado y genera una definición de artefacto que incluya:
1. defBoards: Objetos que definen las tablas/boards gráficos necesarios
2. rDef: Definición reactiva con datos del ejercicio (valores, matrices, vectores, etc.)
</task>

<exercise>
${JSON.stringify(exercise, null, 2)}
</exercise>

<rag_context>
<similar_examples>
${ragContext.similarArtifacts.length > 0
  ? ragContext.similarArtifacts
      .map(
        (ex, idx) => `
<example id="${idx + 1}" similarity="${ex.similarity.toFixed(2)}" tema="${ex.tema}">
<metadata>
<tema>${ex.tema}</tema>
${ex.subtema ? `<subtema>${ex.subtema}</subtema>` : ""}
${ex.engine ? `<engine>${ex.engine}</engine>` : ""}
<similarity_score>${ex.similarity.toFixed(3)}</similarity_score>
</metadata>
<defBoards>
${JSON.stringify(ex.defBoards, null, 2)}
</defBoards>
<rDef>
${JSON.stringify(ex.rDef, null, 2)}
</rDef>
</example>
`
      )
      .join("\n")
  : "<example>No hay ejemplos similares disponibles</example>"}
</similar_examples>

<available_engines>
${ragContext.availableEngines.length > 0
  ? ragContext.availableEngines
      .map(
        (eng) => `
<engine id="${eng.id}" name="${eng.name}">
${eng.description ? `<description>${eng.description}</description>` : ""}
<tags>${eng.tags.join(", ")}</tags>
</engine>
`
      )
      .join("\n")
  : "<engine>No hay engines disponibles</engine>"}
</available_engines>

<common_patterns>
${Object.keys(ragContext.commonPatterns).length > 0
  ? Object.entries(ragContext.commonPatterns)
      .map(
        ([type, pattern]) => `
<pattern type="${type}">
<context>${pattern.usageContext}</context>
<usage_count>${pattern.count}</usage_count>
<topics>${pattern.topics.join(", ")}</topics>
<defBoards>
${JSON.stringify(pattern.defBoards, null, 2)}
</defBoards>
<rDef>
${JSON.stringify(pattern.rDef, null, 2)}
</rDef>
</pattern>
`
      )
      .join("\n")
  : "<pattern>No hay patrones comunes identificados</pattern>"}
</common_patterns>
</rag_context>

<analysis_guide>
Analiza el ejercicio paso a paso siguiendo estos pasos:

1. <determine_need>
   - ¿Requiere visualización gráfica? (geometría, gráficos, diagramas)
   - ¿Qué tipo de elementos necesita? (puntos, líneas, curvas, figuras, matrices)
   - ¿Qué elementos visuales están mencionados en el enunciado?
   - Confianza: 0.0-1.0 (si < 0.5, no generar artefacto)
</determine_need>

2. <extract_data>
   Identifica qué valores del ejercicio deben estar en rDef:
   - Números específicos mencionados en el enunciado
   - Matrices o vectores
   - Parámetros calculables (coordenadas, dimensiones, etc.)
   - Variables que el engine necesita para renderizar
   - Resultados intermedios o finales
</extract_data>

3. <select_pattern>
   Basándote en los ejemplos similares y patrones comunes:
   - ¿Qué patrón es más apropiado para este tipo de ejercicio?
   - ¿Cómo adaptar el patrón al ejercicio actual?
   - ¿Qué elementos específicos necesita este ejercicio que los ejemplos no tienen?
   - NO copies exactamente, adapta la estructura
</select_pattern>

4. <choose_engine>
   De los engines disponibles:
   - ¿Cuál es el más apropiado según el tema y tipo de visualización?
   - Considera los tags de cada engine (geometry, graph, matrix, etc.)
   - Si no hay match perfecto, elige el más genérico compatible
   - Razona tu elección basándote en el tema y subtema del ejercicio
</choose_engine>

5. <generate_structure>
   Genera defBoards considerando:
   - Estructura similar a los ejemplos más cercanos (similarity más alto)
   - Elementos específicos identificados en el análisis anterior
   - Compatibilidad con el engine seleccionado
   - Tipos de elementos JSXGraph necesarios (board, point, line, curve, etc.)
</generate_structure>
</analysis_guide>

<output_format>
Responde SOLO con un JSON válido siguiendo este formato exacto y LEGACY-COMPATIBLE:
{
  "definition": {
    "defBoards": {
      "board_1": {
        "style": {
          "boundingbox": [number, number, number, number],
          "axis": true,
          "grid": boolean
        }
      }
    },
    "rDef": {
      // SOLO datos (números, arrays, strings). NUNCA funciones ni código.
      // Ejemplos: "curvePoints": [[x1,y1],[x2,y2],...], "hLineY": number
    },
    "artifacts": {
      "artifact_1": {
        "board": "board_1",
        "statementBottom": string,
        "conditions": [] | [ { "compare": string, "with": string, "tolerance?": number } ]
      }
    }
  },
  "suggestedEngine": "id_del_engine_seleccionado o null si confidence < 0.5",
  "confidence": 0.0-1.0,
  "reasoning": "Explicación breve del porqué del engine y de la estructura",
  "patternUsed": "tipo_de_patrón_usado o null",
  "adaptations": [
    "Cambio 1: razón específica",
    "Cambio 2: razón específica"
  ]
}
</output_format>

<constraints>
- ESTRUCTURA OBLIGATORIA: defBoards.board_1.style con boundingbox, axis, grid
- ESTRUCTURA OBLIGATORIA: artifacts.artifact_1 con board:"board_1", statementBottom, conditions[]
- rDef debe contener SOLO datos (números, strings, arrays, objetos). PROHIBIDO: funciones, expresiones, "functiongraph", "elements"
- PROHIBIDO crear claves: "elements", "functiongraph", "curveFunction", o cualquier código JS
- Si confidence < 0.5, suggestedEngine debe ser null y definition mínima (sin inventar datos)
- Prioriza valores del enunciado en rDef (números, puntos, parámetros)
- Usa nombres estables y legibles; no inventes claves fuera de los ejemplos canónicos
</constraints>

<important_notes>
- Ajusta la salida al esquema legacy del runtime descrito arriba
- No generes funciones ni pseudocódigo en rDef; solo datos numéricos o arrays
- No uses claves desconocidas; si dudas, usa "curvePoints", "hLineY", "vLineX", "points" en rDef
- El engine sugerido debe existir en available_engines
- Si el ejercicio NO requiere visualización (álgebra puro), confidence < 0.5
</important_notes>
`.trim();
}



