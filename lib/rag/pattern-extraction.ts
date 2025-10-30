/**
 * Extrae patrones comunes de estructuras de artefactos
 * para crear plantillas reutilizables basadas en ejemplos similares
 */

interface ArtifactExample {
  tema: string;
  subtema?: string;
  defBoards: Record<string, any>;
  rDef: Record<string, any>;
  engine?: string;
}

interface Pattern {
  defBoards: Record<string, any>;
  rDef: Record<string, any>;
  usageContext: string;
  count: number;
  topics: string[];
}

/**
 * Extrae patrones comunes agrupando ejemplos por estructura de defBoards
 * 
 * @param examples Array de ejemplos de artefactos con defBoards y rDef
 * @returns Objeto con patrones agrupados por estructura
 */
export function extractCommonPatterns(
  examples: ArtifactExample[]
): Record<string, Pattern> {
  if (examples.length === 0) {
    return {};
  }

  // Agrupar ejemplos por estructura de defBoards
  const patternMap = new Map<string, ArtifactExample[]>();

  for (const example of examples) {
    // Crear una firma única basada en la estructura de defBoards
    const signature = createStructureSignature(example.defBoards);
    
    if (!patternMap.has(signature)) {
      patternMap.set(signature, []);
    }
    patternMap.get(signature)!.push(example);
  }

  // Convertir a objeto de patrones
  const patterns: Record<string, Pattern> = {};

  for (const [signature, group] of patternMap.entries()) {
    // Solo considerar patrones que aparecen al menos 2 veces
    if (group.length >= 2) {
      const firstExample = group[0];
      
      // Extraer temas únicos
      const topics = [...new Set(group.map(ex => ex.tema))];
      
      // Crear contexto de uso
      const usageContext = group.length === 1
        ? `Usado en ejercicios de ${firstExample.tema}`
        : `Usado en ${group.length} ejercicios de: ${topics.join(", ")}`;

      patterns[signature] = {
        defBoards: normalizePatternDefBoards(firstExample.defBoards),
        rDef: normalizePatternRDef(firstExample.rDef),
        usageContext,
        count: group.length,
        topics,
      };
    }
  }

  return patterns;
}

/**
 * Crea una firma única para la estructura de defBoards
 * ignorando valores específicos pero manteniendo la estructura
 */
function createStructureSignature(defBoards: Record<string, any>): string {
  // Convertir a JSON normalizando valores
  const normalized = JSON.stringify(defBoards, (key, value) => {
    // Normalizar números a placeholder
    if (typeof value === 'number') {
      return '<number>';
    }
    // Normalizar strings específicos pero mantener tipos
    if (typeof value === 'string' && !key.includes('type') && !key.includes('name')) {
      return '<string>';
    }
    // Mantener estructura de objetos y arrays
    return value;
  });
  
  // Usar hash simple de la estructura (ordenar keys para consistencia)
  const sorted = JSON.parse(normalized);
  const sortedJson = JSON.stringify(sorted, Object.keys(sorted).sort());
  
  return sortedJson;
}

/**
 * Normaliza defBoards removiendo valores específicos pero manteniendo estructura
 */
function normalizePatternDefBoards(defBoards: Record<string, any>): Record<string, any> {
  return JSON.parse(
    JSON.stringify(defBoards, (key, value) => {
      // Remover valores específicos pero mantener tipos y estructura
      if (typeof value === 'number') {
        return 0; // Placeholder numérico
      }
      if (typeof value === 'string' && !['type', 'name', 'id'].some(k => key.toLowerCase().includes(k))) {
        return ''; // Placeholder string
      }
      return value;
    })
  );
}

/**
 * Normaliza rDef removiendo valores específicos pero manteniendo estructura
 */
function normalizePatternRDef(rDef: Record<string, any>): Record<string, any> {
  return JSON.parse(
    JSON.stringify(rDef, (key, value) => {
      // Mantener estructura pero usar placeholders
      if (typeof value === 'number') {
        return 0;
      }
      if (typeof value === 'string') {
        return '';
      }
      if (Array.isArray(value)) {
        return [];
      }
      return value;
    })
  );
}

/**
 * Agrupa patrones por tipo temático (geometría, gráficos, matrices, etc.)
 */
export function groupPatternsByType(
  patterns: Record<string, Pattern>
): Record<string, Pattern[]> {
  const grouped: Record<string, Pattern[]> = {};

  for (const [signature, pattern] of Object.entries(patterns)) {
    // Determinar tipo basado en temas
    const type = inferPatternType(pattern.topics);
    
    if (!grouped[type]) {
      grouped[type] = [];
    }
    grouped[type].push(pattern);
  }

  return grouped;
}

/**
 * Infiere el tipo de patrón basado en los temas asociados
 */
function inferPatternType(topics: string[]): string {
  const topicStr = topics.join(' ').toLowerCase();
  
  if (topicStr.match(/geometría|geometria|geometry|triángulo|rectángulo|cuadrado/i)) {
    return 'geometry';
  }
  
  if (topicStr.match(/gráfico|grafico|graph|función|funcion|function|curva|curve/i)) {
    return 'graph';
  }
  
  if (topicStr.match(/matriz|matrix|sistema|system|ecuación|ecuacion/i)) {
    return 'matrix';
  }
  
  if (topicStr.match(/cálculo|calculo|derivada|integral|limite/i)) {
    return 'calculus';
  }
  
  return 'generic';
}



