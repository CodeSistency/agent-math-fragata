export const EXTRACTION_PROMPT = `Eres un parser experto en extraer ejercicios matemáticos de texto OCR.

Analiza el siguiente texto extraído de una imagen de libro de matemáticas y extrae todos los ejercicios que encuentres.

Para cada ejercicio, identifica:
1. El tema matemático (Álgebra, Cálculo, Geometría, etc.)
2. El subtema específico
3. El nivel de dificultad (básica, media, avanzada)
4. El enunciado completo en formato LaTeX
5. La solución si está disponible, también en LaTeX
6. Variables que puedan ser aleatorizadas (números, matrices, etc.)

Formato de salida: JSON array donde cada elemento es un ejercicio con esta estructura:
{
  "tema": "string",
  "subtema": "string (opcional)",
  "dificultad": "básica|media|avanzada",
  "enunciado": "string en LaTeX con \\$\\$ para bloques y \\$ para inline",
  "solucion": "string en LaTeX",
  "variables": {"nombre": "descripción del rango o valores"},
  "metadata": {"pagina": number, "seccion": "string"}
}

Si hay múltiples ejercicios, retorna un array. Si hay un solo ejercicio, retorna un array con un elemento.

IMPORTANTE: 
- Preserva toda la notación matemática en formato LaTeX
- Mantén la estructura original del ejercicio
- Si no puedes identificar la solución, deja el campo solucion como string vacío
- Asegúrate de que el JSON sea válido

Texto OCR:
{ocrText}`;



