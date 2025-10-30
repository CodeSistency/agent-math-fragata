import type { Page } from "@/types/book";

/**
 * Extrae tema del contexto (nombre de archivo, path, etc.)
 */
export function extractTemaFromContext(
  page: Page,
  chapterNumber: number
): string | null {
  // Intentar inferir del nombre del archivo o path
  const fileName = page.filePath.toLowerCase();
  const filePathParts = fileName.split(/[/\\]/);
  const fileNameOnly = filePathParts[filePathParts.length - 1] || "";
  
  // Keywords por tema en nombre de archivo
  if (fileName.match(/algebra|lineal|ecuación|ecuacion/i)) {
    return "Álgebra";
  }
  
  if (fileName.match(/geometría|geometria|geometry|triángulo|triangulo|rectángulo|rectangulo/i)) {
    return "Geometría";
  }
  
  if (fileName.match(/cálculo|calculo|derivada|integral|limite|límite/i)) {
    return "Cálculo";
  }
  
  if (fileName.match(/estadística|estadistica|probabilidad|probability/i)) {
    return "Estadística";
  }
  
  if (fileName.match(/trigonometría|trigonometria|trigonometry|seno|coseno/i)) {
    return "Trigonometría";
  }
  
  // Intentar inferir del chapter number si hay patrones conocidos
  // Esto se puede expandir con conocimiento del dominio específico
  if (chapterNumber === 1) {
    // Comúnmente capítulo 1 tiene fundamentos/básicos
    return null; // No inferir por número de capítulo solo
  }
  
  return null;
}

/**
 * Infiere dificultad del texto de la pregunta
 */
export function inferDificultadFromQuestion(
  questionText: string
): "básica" | "media" | "avanzada" | null {
  if (!questionText) return null;
  
  const text = questionText.toLowerCase();
  
  // Palabras clave de dificultad básica
  const basicKeywords = [
    "calcular",
    "encontrar",
    "determinar",
    "simple",
    "básico",
    "basico",
    "hallar",
    "cuánto",
    "cuanto",
  ];
  
  // Palabras clave de dificultad avanzada
  const advancedKeywords = [
    "demostrar",
    "probar",
    "verificar",
    "teorema",
    "complejo",
    "compleja",
    "demuestre",
    "pruebe",
    "justificar",
    "deducir",
  ];
  
  // Palabras clave de dificultad media
  const mediumKeywords = [
    "resolver",
    "resuelva",
    "plantea",
    "plantear",
    "graficar",
    "representar",
  ];
  
  // Contar keywords encontradas
  const basicCount = basicKeywords.filter(kw => text.includes(kw)).length;
  const advancedCount = advancedKeywords.filter(kw => text.includes(kw)).length;
  const mediumCount = mediumKeywords.filter(kw => text.includes(kw)).length;
  
  // Determinar dificultad basado en keywords
  if (advancedCount > 0 && advancedCount >= basicCount) {
    return "avanzada";
  }
  
  if (basicCount > 0 && basicCount > advancedCount) {
    return "básica";
  }
  
  if (mediumCount > 0) {
    return "media";
  }
  
  // Análisis de longitud y complejidad del texto
  const wordCount = text.split(/\s+/).length;
  if (wordCount > 50) {
    // Preguntas muy largas suelen ser más complejas
    return "avanzada";
  }
  
  if (wordCount < 10) {
    // Preguntas muy cortas suelen ser básicas
    return "básica";
  }
  
  return null;
}

/**
 * Extrae solución de la estructura de pregunta si está disponible
 */
export function extractSolutionFromQuestion(question: any): string {
  if (!question || typeof question !== 'object') {
    return "";
  }
  
  // Intentar diferentes campos posibles donde puede estar la solución
  if (question.solution && typeof question.solution === 'string') {
    return question.solution;
  }
  
  if (question.answer && typeof question.answer === 'string') {
    return question.answer;
  }
  
  if (question.respuesta && typeof question.respuesta === 'string') {
    return question.respuesta;
  }
  
  if (question.solucion && typeof question.solucion === 'string') {
    return question.solucion;
  }
  
  // Si es un objeto con más información
  if (question.solution && typeof question.solution === 'object') {
    return JSON.stringify(question.solution);
  }
  
  return "";
}

/**
 * Extrae subtema específico del contexto
 */
export function extractSubtemaFromContext(
  page: Page,
  chapterNumber: number
): string | null {
  const fileName = page.filePath.toLowerCase();
  
  // Intentar inferir subtema del nombre de archivo
  if (fileName.match(/triángulo|triangulo|triangle/i)) {
    return "Triángulos";
  }
  
  if (fileName.match(/circunferencia|circle|circulo/i)) {
    return "Circunferencias";
  }
  
  if (fileName.match(/parábola|parabola/i)) {
    return "Parábolas";
  }
  
  if (fileName.match(/derivada|derivative/i)) {
    return "Derivadas";
  }
  
  if (fileName.match(/integral/i)) {
    return "Integrales";
  }
  
  if (fileName.match(/matriz|matrix/i)) {
    return "Matrices";
  }
  
  if (fileName.match(/sistema|system/i)) {
    return "Sistemas de ecuaciones";
  }
  
  // Si no se puede inferir, retornar null para usar el default del capítulo
  return null;
}



