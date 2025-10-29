export const GENERATION_PROMPT = `Eres un experto generador de ejercicios matemáticos.

Tu tarea es crear una variación del siguiente ejercicio base manteniendo la misma estructura y dificultad, pero cambiando:
- Los valores numéricos (matrices, vectores, escalares)
- Las variables específicas
- Posiblemente pequeños cambios en la formulación que hagan el ejercicio único

Ejercicio base:
{exerciseJson}

Requisitos:
1. Mantener el mismo tema y nivel de dificultad
2. Cambiar valores numéricos para generar una variación única
3. Preservar la estructura del enunciado
4. Asegurar que la solución sea correcta
5. Usar formato LaTeX para todas las expresiones matemáticas
6. Si el ejercicio tiene variables definidas, generar valores aleatorios respetando los rangos especificados

Retorna solo un JSON válido con la misma estructura del ejercicio base, pero con valores diferentes.`;



