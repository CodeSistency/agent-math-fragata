export const INTENT_DETECTION_PROMPT = `Analiza el siguiente mensaje del usuario y determina su intención.

El usuario puede querer:
1. "consulta" - Hacer una pregunta sobre matemáticas, buscar información, o consultar ejercicios existentes
2. "generar" - Crear o generar un nuevo ejercicio matemático
3. "editar" - Modificar un ejercicio existente

Mensaje del usuario:
{mensaje}

Indicadores de "generar":
- Palabras como: "crea", "genera", "haz", "nuevo ejercicio", "variación"
- Solicitudes para crear ejercicios sobre un tema específico

Indicadores de "consulta":
- Palabras como: "explica", "qué es", "cómo", "busca", "encuentra"
- Preguntas sobre conceptos o ejercicios existentes

Indicadores de "editar":
- Palabras como: "modifica", "cambia", "edita", "ajusta"
- Referencias a un ejercicio específico para modificar

Responde con un JSON válido:
{
  "intent": "consulta" | "generar" | "editar",
  "params": {
    "tema": "string si se menciona un tema específico",
    "dificultad": "básica|media|avanzada si se especifica",
    "ejercicioId": "string si se menciona un ejercicio específico para editar"
  },
  "confidence": 0.0-1.0
}`;



