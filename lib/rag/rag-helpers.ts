import type { Exercise } from "@/types/exercise";
import type { Engine } from "@/lib/books/engine-discovery";

/**
 * Keywords matemáticos comunes para extracción semántica
 */
const MATH_KEYWORDS = [
  // Geometría
  'geometría', 'geometria', 'geometry',
  'triángulo', 'triangulo', 'triangle',
  'circunferencia', 'circle', 'círculo',
  'rectángulo', 'rectangulo', 'rectangle',
  'cuadrado', 'square',
  'paralelogramo', 'parallelogram',
  'polígono', 'poligono', 'polygon',
  'ángulo', 'angulo', 'angle',
  'perímetro', 'perimetro', 'perimeter',
  'área', 'area',
  'volumen', 'volume',
  
  // Gráficos y funciones
  'gráfico', 'grafico', 'graph', 'gráfica', 'grafica',
  'función', 'funcion', 'function',
  'curva', 'curve',
  'parábola', 'parabola', 'parabola',
  'elipse', 'ellipse',
  'hipérbola', 'hiperbola', 'hyperbola',
  'seno', 'sin', 'sen',
  'coseno', 'cos',
  'tangente', 'tan',
  
  // Álgebra y matrices
  'matriz', 'matrix', 'matrices',
  'sistema', 'system',
  'ecuación', 'ecuacion', 'equation',
  'vector', 'vectores',
  'determinante', 'determinant',
  'transformación', 'transformacion', 'transformation',
  
  // Cálculo
  'derivada', 'derivative',
  'integral', 'integral',
  'límite', 'limite', 'limit',
  'continuidad', 'continuity',
  'máximo', 'maximo', 'maximum',
  'mínimo', 'minimo', 'minimum',
  'punto crítico', 'critical point',
  
  // Visual y dibujo
  'dibujar', 'draw', 'drawing',
  'visualizar', 'visualize',
  'representar', 'represent',
  'mostrar', 'show',
  'graficar', 'plot',
];

/**
 * Construye el texto optimizado para embeddings incluyendo información de artefactos
 * Esta función es crítica para que el RAG pueda encontrar ejercicios similares con artefactos
 */
export function buildEmbeddingText(exercise: Exercise): string {
  const parts: string[] = [];
  
  // Información básica del ejercicio
  if (exercise.tema) parts.push(exercise.tema);
  if (exercise.subtema) parts.push(exercise.subtema || "");
  if (exercise.enunciado) parts.push(exercise.enunciado);
  if (exercise.solucion) parts.push(exercise.solucion);
  
  // CRÍTICO: Información sobre artefacto si existe
  if (exercise.metadata?.artifactDefinition) {
    parts.push("artefacto visual");
    parts.push("interactivo");
    
    // Incluir estructura de defBoards (solo keys y tipos, no valores específicos)
    const defBoards = exercise.metadata.artifactDefinition.defBoards;
    if (defBoards && Object.keys(defBoards).length > 0) {
      const boardTypes = Object.entries(defBoards).map(([key, value]: [string, any]) => {
        if (value && typeof value === 'object') {
          const type = value.type || value.kind || 'board';
          return `${key}:${type}`;
        }
        return key;
      }).join(" ");
      parts.push(`estructura gráfica: ${boardTypes}`);
    }
    
    // Incluir tipo de elementos en rDef
    const rDef = exercise.metadata.artifactDefinition.rDef;
    if (rDef && Object.keys(rDef).length > 0) {
      const dataTypes = Object.keys(rDef).join(" ");
      parts.push(`datos: ${dataTypes}`);
    }
    
    // Incluir engine sugerido
    if (exercise.metadata.suggestedEngine) {
      parts.push(`engine: ${exercise.metadata.suggestedEngine}`);
    }
  }
  
  // Keywords extraídas del enunciado
  const keywords = extractKeywords(exercise.enunciado);
  if (keywords.length > 0) {
    parts.push(...keywords);
  }
  
  return parts.filter(Boolean).join(" ");
}

/**
 * Construye una query semántica optimizada para búsqueda vectorial
 * basada en el ejercicio proporcionado
 */
export function buildSemanticQuery(exercise: Exercise): string {
  const parts: string[] = [];
  
  // Añadir tema y subtema
  if (exercise.tema) {
    parts.push(exercise.tema);
  }
  
  if (exercise.subtema) {
    parts.push(exercise.subtema);
  }
  
  // Extraer keywords del enunciado
  const keywords = extractKeywords(exercise.enunciado);
  if (keywords.length > 0) {
    parts.push(...keywords);
  }
  
  // Añadir dificultad como contexto
  if (exercise.dificultad) {
    parts.push(exercise.dificultad);
  }
  
  return parts.filter(Boolean).join(" ");
}

/**
 * Extrae palabras clave matemáticas relevantes de un texto
 * para mejorar la búsqueda semántica
 */
export function extractKeywords(text: string): string[] {
  if (!text) return [];
  
  const lowerText = text.toLowerCase();
  const found: string[] = [];
  
  // Buscar keywords en el texto
  for (const keyword of MATH_KEYWORDS) {
    if (lowerText.includes(keyword.toLowerCase())) {
      found.push(keyword);
    }
  }
  
  // Remover duplicados y retornar
  return [...new Set(found)];
}

/**
 * Infiere tags semánticos para un engine basado en su nombre y descripción
 */
export function inferEngineTags(name: string, description?: string): string[] {
  const tags: string[] = [];
  const text = `${name} ${description || ""}`.toLowerCase();
  
  // Detectar tipo de engine
  if (text.match(/geometry|geometría|geometria|triangle|rect|shape|figure/i)) {
    tags.push("geometry");
  }
  
  if (text.match(/curve|curva|function|función|funcion|graph|gráfico|grafico/i)) {
    tags.push("graph");
  }
  
  if (text.match(/matrix|matriz|system|sistema|linear|lineal/i)) {
    tags.push("matrix");
  }
  
  if (text.match(/interactive|interactivo|draggable|movable/i)) {
    tags.push("interactive");
  }
  
  if (text.match(/3d|three|dimensional|tridimensional/i)) {
    tags.push("3d");
  }
  
  if (text.match(/animation|animación|animacion|animate/i)) {
    tags.push("animation");
  }
  
  // Si no hay tags específicos, usar genérico
  if (tags.length === 0) {
    tags.push("generic");
  }
  
  return tags;
}

/**
 * Encuentra el engine más cercano al ID sugerido
 * Usa matching por nombre, ID parcial, o tags
 */
export function findClosestEngine(
  suggestedId: string,
  availableEngines: Array<{ id: string; name: string; description?: string }>
): string | null {
  if (!suggestedId || availableEngines.length === 0) {
    return null;
  }
  
  const suggested = suggestedId.toLowerCase();
  
  // 1. Buscar match exacto (case insensitive)
  const exactMatch = availableEngines.find(
    eng => eng.id.toLowerCase() === suggested
  );
  if (exactMatch) {
    return exactMatch.id;
  }
  
  // 2. Buscar match parcial en ID
  const partialMatch = availableEngines.find(
    eng => eng.id.toLowerCase().includes(suggested) ||
           suggested.includes(eng.id.toLowerCase())
  );
  if (partialMatch) {
    return partialMatch.id;
  }
  
  // 3. Buscar match por nombre
  const nameMatch = availableEngines.find(
    eng => eng.name.toLowerCase().includes(suggested) ||
           suggested.includes(eng.name.toLowerCase())
  );
  if (nameMatch) {
    return nameMatch.id;
  }
  
  // 4. Buscar por tags inferidos
  for (const eng of availableEngines) {
    const tags = inferEngineTags(eng.name, eng.description);
    if (tags.some(tag => suggested.includes(tag))) {
      return eng.id;
    }
  }
  
  // 5. Si no hay match, buscar engines genéricos
  const generic = availableEngines.find(
    e => e.id.toLowerCase().includes("generic") ||
         e.name.toLowerCase().includes("generic")
  );
  if (generic) {
    return generic.id;
  }
  
  // 6. Último recurso: retornar el primer engine disponible
  return availableEngines[0]?.id || null;
}

