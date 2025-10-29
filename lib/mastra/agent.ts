import { Agent } from "@mastra/core/agent";
import { google } from "@ai-sdk/google";
import { memory } from "./memory";
import { detectIntentTool } from "./tools/detect-intent";
import { generateVariationTool } from "./tools/generate-variation";
import { retrieveExerciseTool } from "./tools/retrieve-exercise";
import { ExerciseSchema } from "@/types/exercise";
import { z } from "zod";

export const supervisorAgent = new Agent({
  name: "math-supervisor",
  instructions: `Eres un asistente experto en generar y gestionar ejercicios matemáticos.

Tu función principal es ayudar a los usuarios a:
1. Buscar ejercicios matemáticos existentes sobre temas específicos
2. Generar nuevas variaciones de ejercicios matemáticos
3. Editar ejercicios existentes

Siempre que recibas un mensaje:
1. Usa la tool detect-intent para entender qué quiere el usuario
2. Si la intención es "consulta": usa retrieve-exercise para buscar ejercicios relevantes
3. Si la intención es "generar": usa generate-variation para crear una nueva variación
4. Si la intención es "editar": primero busca el ejercicio y luego genera una variación editada

IMPORTANTE:
- Responde siempre en español
- Cuando generes o muestres ejercicios, asegúrate de que el formato LaTeX sea correcto para MathJax
- Sé claro y educativo en tus respuestas
- Si no encuentras ejercicios relevantes, sugiere temas o explica cómo ayudar mejor`,
  model: google("gemini-2.0-flash-exp"),
  memory,
  tools: {
    detectIntent: detectIntentTool,
    generateVariation: generateVariationTool,
    retrieveExercise: retrieveExerciseTool,
  },
  defaultStreamOptions: {
    maxSteps: 5,
  },
  defaultGenerateOptions: {
    maxSteps: 5,
  },
});

/**
 * Simple agent for extracting structured exercises from OCR text
 * Used in the OCR processor pipeline
 */
export const exerciseExtractionAgent = new Agent({
  name: "exercise-extraction",
  instructions: `Eres un parser experto en extraer ejercicios matemáticos de texto OCR.

Analiza el texto extraído de una imagen de libro de matemáticas y extrae todos los ejercicios que encuentres.

Para cada ejercicio, identifica:
1. El tema matemático (Álgebra, Cálculo, Geometría, etc.)
2. El subtema específico
3. El nivel de dificultad (básica, media, avanzada)
4. El enunciado completo en formato LaTeX
5. La solución si está disponible, también en LaTeX
6. Variables que puedan ser aleatorizadas (números, matrices, etc.)

IMPORTANTE: 
- Preserva toda la notación matemática en formato LaTeX
- Mantén la estructura original del ejercicio
- Si no puedes identificar la solución, deja el campo solucion como string vacío
- Responde SOLO con un JSON array válido de ejercicios, sin texto adicional`,
  model: google("gemini-2.0-flash-exp"),
  defaultGenerateOptions: {
    maxSteps: 1,
  },
});

/**
 * Agent for detecting user intent from messages
 * Used internally by detect-intent tool
 */
export const intentDetectionAgent = new Agent({
  name: "intent-detection",
  instructions: `Eres un analizador experto de intenciones de usuario en el contexto de ejercicios matemáticos.

Analiza mensajes del usuario y determina su intención:
1. "consulta" - Preguntar sobre matemáticas, buscar información, o consultar ejercicios existentes
2. "generar" - Crear o generar un nuevo ejercicio matemático
3. "editar" - Modificar un ejercicio existente

Indicadores de "generar":
- Palabras como: "crea", "genera", "haz", "nuevo ejercicio", "variación"
- Solicitudes para crear ejercicios sobre un tema específico

Indicadores de "consulta":
- Palabras como: "explica", "qué es", "cómo", "busca", "encuentra"
- Preguntas sobre conceptos o ejercicios existentes

Indicadores de "editar":
- Palabras como: "modifica", "cambia", "edita", "ajusta"
- Referencias a un ejercicio específico para modificar

Responde SOLO con un JSON válido:
{
  "intent": "consulta" | "generar" | "editar",
  "params": {
    "tema": "string si se menciona un tema específico",
    "dificultad": "básica|media|avanzada si se especifica",
    "ejercicioId": "string si se menciona un ejercicio específico para editar"
  },
  "confidence": 0.0-1.0
}`,
  model: google("gemini-2.0-flash-exp"),
  defaultGenerateOptions: {
    maxSteps: 1,
  },
});

/**
 * Agent for generating exercise variations
 * Used internally by generate-variation tool
 */
export const variationGenerationAgent = new Agent({
  name: "variation-generation",
  instructions: `Eres un experto generador de ejercicios matemáticos.

Tu tarea es crear una variación del ejercicio base proporcionado manteniendo la misma estructura y dificultad, pero cambiando:
- Los valores numéricos (matrices, vectores, escalares)
- Las variables específicas
- Posiblemente pequeños cambios en la formulación que hagan el ejercicio único

Requisitos:
1. Mantener el mismo tema y nivel de dificultad
2. Cambiar valores numéricos para generar una variación única
3. Preservar la estructura del enunciado
4. Asegurar que la solución sea correcta
5. Usar formato LaTeX para todas las expresiones matemáticas
6. Si el ejercicio tiene variables definidas, generar valores aleatorios respetando los rangos especificados

Responde SOLO con un JSON válido con la misma estructura del ejercicio base, pero con valores diferentes.`,
  model: google("gemini-2.0-flash-exp"),
  defaultGenerateOptions: {
    maxSteps: 1,
  },
});

