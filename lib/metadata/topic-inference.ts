/**
 * Intelligent topic inference for mathematical content
 * Uses multiple strategies: keywords, chapter mapping, and content analysis
 */

export interface ChapterTopicMapping {
  [bookId: string]: {
    [chapterNumber: number]: string;
  };
}

export interface TopicInferenceResult {
  topic: string;
  subtopic: string;
  confidence: number;
  method: 'keywords' | 'chapter' | 'content' | 'fallback';
}

export class TopicInference {
  private static readonly TOPIC_KEYWORDS = {
    'geometría': ['triángulo', 'ángulo', 'figura', 'geometría', 'área', 'perímetro', 'polígono', 'círculo', 'rectángulo', 'cuadrado', 'esfera', 'cubo', 'prisma'],
    'álgebra': ['ecuación', 'incógnita', 'variable', 'polinomio', 'sistema', 'matriz', 'determinante', 'vector'],
    'funciones': ['función', 'gráfica', 'dominio', 'rango', 'curva', 'parábola', 'hipérbola', 'seno', 'coseno', 'tangente'],
    'cálculo': ['derivada', 'integral', 'límite', 'continuidad', 'máximo', 'mínimo', 'punto crítico', 'tasa', 'área bajo curva'],
    'estadística': ['media', 'desviación', 'frecuencia', 'probabilidad', 'distribución', 'histograma', 'gráfica de barras'],
    'trigonometría': ['seno', 'coseno', 'tangente', 'ángulo', 'radianes', 'circunferencia', 'arco', 'cuerda'],
    'números': ['número', 'entero', 'decimal', 'fracción', 'racional', 'irracional', 'potencia', 'raíz', 'logaritmo'],
    'medidas': ['longitud', 'masa', 'tiempo', 'velocidad', 'aceleración', 'fuerza', 'densidad', 'volumen']
  };

  private static readonly CHAPTER_MAPPINGS: ChapterTopicMapping = {
    'MG': {
      0: 'introducción a las matemáticas',
      1: 'funciones y sus gráficas',
      2: 'geometría analítica',
      3: 'álgebra lineal',
      4: 'cálculo diferencial',
      5: 'temas avanzados'
    },
    'NV': {
      1: 'fundamentos matemáticos',
      2: 'razonamiento lógico-matemático',
      3: 'resolución de problemas',
      4: 'pensamiento matemático',
      5: 'aplicaciones prácticas',
      6: 'proyectos integradores'
    }
  };

  private static readonly MATHEMATICAL_SYMBOLS = /[∫∑∏π√±≤≥≠∞∂∇∆αβγδδεζηθικλμνξοπρστυφχψω]/g;

  /**
   * Infer topic from text using multiple strategies
   */
  static inferTopic(text: string, chapterNumber: number, bookId: string): TopicInferenceResult {
    const lowerText = text.toLowerCase();
    
    // Strategy 1: Keyword matching (highest confidence)
    const keywordResult = this.inferFromKeywords(lowerText);
    if (keywordResult.confidence > 0.7) {
      return keywordResult;
    }
    
    // Strategy 2: Chapter mapping (medium confidence)
    const chapterResult = this.inferFromChapter(chapterNumber, bookId);
    if (chapterResult.confidence > 0.5) {
      return chapterResult;
    }
    
    // Strategy 3: Content analysis (lower confidence)
    const contentResult = this.inferFromContent(lowerText);
    if (contentResult.confidence > 0.3) {
      return contentResult;
    }
    
    // Fallback: generic mathematical content
    return {
      topic: 'matemáticas generales',
      subtopic: `capítulo ${chapterNumber}`,
      confidence: 0.1,
      method: 'fallback'
    };
  }

  /**
   * Infer topic from keyword matching
   */
  private static inferFromKeywords(text: string): TopicInferenceResult {
    const topicScores: Array<{ topic: string; score: number }> = [];
    
    for (const [topic, keywords] of Object.entries(this.TOPIC_KEYWORDS)) {
      const matchedKeywords = keywords.filter(keyword => text.includes(keyword));
      const score = matchedKeywords.length / keywords.length;
      
      if (score > 0) {
        topicScores.push({ topic, score });
      }
    }
    
    if (topicScores.length === 0) {
      return {
        topic: 'matemáticas generales',
        subtopic: '',
        confidence: 0,
        method: 'keywords'
      };
    }
    
    // Sort by score and take the best match
    topicScores.sort((a, b) => b.score - a.score);
    const bestMatch = topicScores[0];
    
    return {
      topic: bestMatch.topic,
      subtopic: this.generateSubtopic(bestMatch.topic, text),
      confidence: Math.min(bestMatch.score, 1.0),
      method: 'keywords'
    };
  }

  /**
   * Infer topic from chapter mapping
   */
  private static inferFromChapter(chapterNumber: number, bookId: string): TopicInferenceResult {
    const bookMapping = this.CHAPTER_MAPPINGS[bookId];
    if (!bookMapping) {
      return {
        topic: 'matemáticas generales',
        subtopic: `capítulo ${chapterNumber}`,
        confidence: 0.3,
        method: 'chapter'
      };
    }
    
    const topic = bookMapping[chapterNumber];
    if (!topic) {
      return {
        topic: 'matemáticas generales',
        subtopic: `capítulo ${chapterNumber}`,
        confidence: 0.2,
        method: 'chapter'
      };
    }
    
    return {
      topic,
      subtopic: this.generateSubtopic(topic, ''),
      confidence: 0.6,
      method: 'chapter'
    };
  }

  /**
   * Infer topic from content analysis
   */
  private static inferFromContent(text: string): TopicInferenceResult {
    let topic = 'matemáticas generales';
    let confidence = 0.1;
    
    // Check for mathematical symbols
    if (this.MATHEMATICAL_SYMBOLS.test(text)) {
      confidence += 0.2;
    }
    
    // Check for mathematical operations
    const operations = ['sumar', 'restar', 'multiplicar', 'dividir', 'elevar', 'raíz', 'logaritmo'];
    const foundOperations = operations.filter(op => text.includes(op));
    if (foundOperations.length > 0) {
      confidence += 0.1;
      topic = 'operaciones matemáticas';
    }
    
    // Check for problem-solving patterns
    const problemPatterns = ['problema', 'ejercicio', 'calcular', 'encontrar', 'determinar', 'resolver'];
    const foundPatterns = problemPatterns.filter(pattern => text.includes(pattern));
    if (foundPatterns.length > 0) {
      confidence += 0.1;
      topic = 'resolución de problemas';
    }
    
    return {
      topic,
      subtopic: this.generateSubtopic(topic, text),
      confidence: Math.min(confidence, 0.4),
      method: 'content'
    };
  }

  /**
   * Generate subtopic based on topic and content
   */
  private static generateSubtopic(topic: string, content: string): string {
    if (!content) return '';
    
    // Extract key concepts from content
    const concepts = this.extractKeyConcepts(content);
    if (concepts.length > 0) {
      return concepts.slice(0, 3).join(', ');
    }
    
    // Generate subtopic based on topic
    const subtopicMappings: Record<string, string[]> = {
      'geometría': ['figuras', 'áreas', 'perímetros', 'volúmenes'],
      'álgebra': ['ecuaciones', 'sistemas', 'matrices'],
      'funciones': ['gráficas', 'dominios', 'rangos'],
      'cálculo': ['derivadas', 'integrales', 'límites'],
      'estadística': ['medias', 'desviaciones', 'distribuciones'],
      'trigonometría': ['ángulos', 'funciones trigonométricas'],
      'números': ['operaciones', 'propiedades', 'conjuntos'],
      'medidas': ['unidades', 'conversiones', 'magnitudes']
    };
    
    const possibleSubtopics = subtopicMappings[topic] || [];
    const foundSubtopics = possibleSubtopics.filter(subtopic => 
      concepts.some(concept => content.toLowerCase().includes(subtopic))
    );
    
    return foundSubtopics.length > 0 ? foundSubtopics[0] : '';
  }

  /**
   * Extract key mathematical concepts from text
   */
  private static extractKeyConcepts(text: string): string[] {
    const concepts: string[] = [];
    
    // Mathematical objects
    const objectPatterns = [
      /\b(triángulo|rectángulo|círculo|cuadrado|polígono)\b/g,
      /\b(función|gráfica|curva|parábola)\b/g,
      /\b(matriz|vector|sistema|ecuación)\b/g,
      /\b(derivada|integral|límite)\b/g
    ];
    
    for (const pattern of objectPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        concepts.push(...matches.map(m => m.replace(/[^\wáéíóúñ\s]/g, '').toLowerCase()));
      }
    }
    
    // Remove duplicates and return
    return [...new Set(concepts)];
  }

  /**
   * Infer difficulty from content complexity
   */
  static inferDifficulty(text: string, topic?: string): 'básica' | 'media' | 'avanzada' {
    const lowerText = text.toLowerCase();
    
    // Count complexity indicators
    let complexityScore = 0;
    
    // Mathematical operations
    const advancedOps = ['integral', 'derivada', 'límite', 'matriz', 'determinante'];
    const foundAdvancedOps = advancedOps.filter(op => lowerText.includes(op));
    complexityScore += foundAdvancedOps.length * 2;
    
    // Mathematical symbols
    const symbolMatches = (lowerText.match(this.MATHEMATICAL_SYMBOLS) || []).length;
    complexityScore += symbolMatches;
    
    // Problem complexity indicators
    const complexityIndicators = ['demuestre', 'pruebe', 'verifique', 'analice', 'calcule'];
    const foundIndicators = complexityIndicators.filter(indicator => lowerText.includes(indicator));
    complexityScore += foundIndicators.length;
    
    // Determine difficulty based on score
    if (complexityScore >= 5) {
      return 'avanzada';
    } else if (complexityScore >= 2) {
      return 'media';
    } else {
      return 'básica';
    }
  }

  /**
   * Check if text contains mathematical content
   */
  static hasMathematicalContent(text: string): boolean {
    const lowerText = text.toLowerCase();
    
    // Check for mathematical symbols
    if (this.MATHEMATICAL_SYMBOLS.test(lowerText)) {
      return true;
    }
    
    // Check for mathematical operations
    const mathOperations = ['sumar', 'restar', 'multiplicar', 'dividir', 'calcular', 'resolver'];
    if (mathOperations.some(op => lowerText.includes(op))) {
      return true;
    }
    
    // Check for mathematical objects
    const mathObjects = ['número', 'ecuación', 'función', 'gráfica', 'ángulo', 'triángulo'];
    if (mathObjects.some(obj => lowerText.includes(obj))) {
      return true;
    }
    
    return false;
  }

  /**
   * Get all available topics for a book
   */
  static getAvailableTopics(bookId: string): string[] {
    const bookMapping = this.CHAPTER_MAPPINGS[bookId];
    if (!bookMapping) {
      return Object.keys(this.TOPIC_KEYWORDS);
    }
    
    return Object.values(bookMapping).filter(Boolean);
  }

  /**
   * Get topic statistics for analysis
   */
  static getTopicStatistics(texts: string[]): {
    mostCommonTopic: string;
    topicDistribution: Record<string, number>;
    totalAnalyzed: number;
  } {
    const topicCounts: Record<string, number> = {};
    let totalAnalyzed = 0;
    
    for (const text of texts) {
      const result = this.inferTopic(text, 0, 'unknown');
      topicCounts[result.topic] = (topicCounts[result.topic] || 0) + 1;
      totalAnalyzed++;
    }
    
    const mostCommonTopic = Object.entries(topicCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'desconocido';
    
    return {
      mostCommonTopic,
      topicDistribution: topicCounts,
      totalAnalyzed
    };
  }
}