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
Responde SOLO con un JSON válido siguiendo este formato exacto:
{
  "definition": {
    "defBoards": {
      // Estructura basada en ejemplos similares, adaptada al ejercicio actual
      // Debe ser compatible con JSXGraph
    },
    "rDef": {
      // Datos extraídos del ejercicio
      // Solo valores, no lógica de programación
    }
  },
  "suggestedEngine": "id_del_engine_seleccionado o null si confidence < 0.5",
  "confidence": 0.0-1.0,
  "reasoning": "Explicación detallada del proceso de decisión paso a paso",
  "patternUsed": "tipo_de_patrón_usado o null",
  "adaptations": [
    "Cambio 1: razón específica",
    "Cambio 2: razón específica"
  ]
}
</output_format>

<constraints>
- defBoards debe ser compatible con JSXGraph y el engine seleccionado
- rDef debe contener solo datos (números, strings, arrays, objetos), NO funciones ni lógica
- Si confidence < 0.5, suggestedEngine debe ser null y defBoards/rDef pueden estar vacíos
- Mantén consistencia con los ejemplos similares pero adapta la estructura
- NO copies exactamente los ejemplos, adapta según las necesidades del ejercicio actual
- Asegúrate de que todos los valores numéricos mencionados en el enunciado estén en rDef
- Los nombres de elementos en defBoards deben ser descriptivos y únicos
</constraints>

<important_notes>
- Usa los ejemplos similares como guía de estructura, no como copia exacta
- Si hay múltiples ejemplos similares, combina las mejores prácticas de todos
- Los patrones comunes te muestran estructuras probadas, úsalas como base pero adapta
- El engine sugerido debe existir en la lista de available_engines
- Si el ejercicio NO requiere visualización (ej: algebra puro), confidence debe ser < 0.5
</important_notes>
`.trim();
}



