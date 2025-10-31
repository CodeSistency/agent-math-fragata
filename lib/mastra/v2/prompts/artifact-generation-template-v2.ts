import type { Exercise } from "@/types/exercise";
import type { EngineCode } from "../filesystem/engine-code-reader";
import type { ParsedDefinition } from "../filesystem/definition-reader";

/**
 * Contexto basado en filesystem para enriquecer la generación de artefactos
 */
export interface FilesystemContext {
  availableEngines: EngineCode[]; // Engines con código fuente completo
  similarDefinitions: ParsedDefinition[]; // Definitions reales del capítulo
  chapterContext: string; // Chapter ID para contexto
}

/**
 * Construye un prompt enriquecido con código fuente real de engines
 * para generar definiciones de artefactos usando filesystem directo
 */
export function buildArtifactGenerationPromptV2(
  exercise: Exercise,
  context: FilesystemContext
): string {
  return `
<role>
Eres un experto generando definiciones de artefactos usando engines REALES del sistema.
IMPORTANTE: Solo usa propiedades que existen en el código fuente real. NO inventes métodos, propiedades o parámetros.
</role>

<task>
Analiza el ejercicio proporcionado y genera una definición de artefacto que incluya:
1. defBoards: Objetos que definen las tablas/boards gráficos necesarios
2. rDef: Definición reactiva con datos del ejercicio (valores, matrices, vectores, etc.)
</task>

<exercise>
${JSON.stringify(exercise, null, 2)}
</exercise>

<available_engines_with_code>
${context.availableEngines.length > 0
  ? context.availableEngines
      .map(
        (eng) => `
<engine name="${eng.name}" path="${eng.path}">
<code>
${eng.code.substring(0, 5000)}${eng.code.length > 5000 ? "\n... (truncated)" : ""}
</code>
${eng.documentation ? `<documentation>${eng.documentation}</documentation>` : ""}
<exports>
${eng.exports.join(", ")}
</exports>
</engine>
`
      )
      .join("\n")
  : "<engine>No hay engines disponibles</engine>"}
</available_engines_with_code>

<similar_definitions_from_filesystem>
${context.similarDefinitions.length > 0
  ? context.similarDefinitions
      .map(
        (def, idx) => `
<definition id="${idx + 1}" source="${def.filePath.replace(/^.*books\//, "")}">
<defBoards>
${JSON.stringify(def.defBoards, null, 2)}
</defBoards>
<rDef>
${JSON.stringify(def.rDef || {}, null, 2)}
</rDef>
${def.artifacts ? `<artifacts>${JSON.stringify(def.artifacts, null, 2)}</artifacts>` : ""}
</definition>
`
      )
      .join("\n")
  : "<definition>No hay definiciones similares disponibles</definition>"}
</similar_definitions_from_filesystem>

<chapter_context>
Capítulo: ${context.chapterContext}
</chapter_context>

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

3. <review_engine_code>
   CRÍTICO: Revisa el código fuente de los engines disponibles:
   - ¿Qué funciones/clases exporta cada engine?
   - ¿Qué propiedades acepta cada engine?
   - ¿Qué estructura de datos espera?
   - SOLO usa propiedades que veas explícitamente en el código fuente
   - NO inventes métodos o propiedades que no existan
</review_engine_code>

4. <select_pattern>
   Basándote en las definiciones reales del capítulo:
   - ¿Qué patrón es más apropiado para este tipo de ejercicio?
   - ¿Cómo adaptar el patrón al ejercicio actual?
   - ¿Qué elementos específicos necesita este ejercicio que los ejemplos no tienen?
   - NO copies exactamente, adapta la estructura
</select_pattern>

5. <choose_engine>
   De los engines disponibles (revisa su código fuente):
   - ¿Cuál es el más apropiado según el tema y tipo de visualización?
   - Verifica que el engine tiene las funciones/propiedades que necesitas
   - Si no hay match perfecto, elige el más genérico compatible
   - El engine debe existir y estar en available_engines_with_code
</choose_engine>

6. <generate_structure>
   Genera defBoards considerando:
   - Estructura similar a las definiciones reales más cercanas
   - Elementos específicos identificados en el análisis anterior
   - Compatibilidad con el engine seleccionado (basado en su código fuente)
   - Tipos de elementos JSXGraph necesarios (board, point, line, curve, etc.)
   - SOLO usa propiedades que el engine realmente soporte
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
  "suggestedEngine": "nombre_del_engine_seleccionado o null si confidence < 0.5",
  "confidence": 0.0-1.0,
  "reasoning": "Explicación breve del porqué del engine y de la estructura, mencionando qué propiedades del código fuente usaste",
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
- SOLO usa propiedades que veas en el código fuente de los engines
- El engine sugerido DEBE existir en available_engines_with_code y ser el nombre exacto (name field)
</constraints>

<important_notes>
- Revisa el código fuente del engine antes de sugerirlo
- Verifica que las propiedades que uses existen en el código fuente
- NO inventes métodos, funciones o propiedades
- Usa las definiciones reales del capítulo como guía de estructura
- Si el ejercicio NO requiere visualización (álgebra puro), confidence < 0.5
- El suggestedEngine debe ser el nombre exacto del engine (campo "name"), no un ID
</important_notes>
`.trim();
}



