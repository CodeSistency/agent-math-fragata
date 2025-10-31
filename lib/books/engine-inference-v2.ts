import type { Engine } from "@/lib/books/types";
import { TopicInference } from "@/lib/metadata/topic-inference";

export interface EngineInferenceContext {
  bookId: string;
  chapterId: string;
  chapterNumber: number;
  pageId: string;
  pageNumber?: number;
}

/**
 * Enhanced engine inference with multiple strategies
 * Handles MG, NV, and mixed formats intelligently
 */
export class EngineInferenceV2 {
  private static readonly ENGINE_PATTERNS = {
    'jsxgraph-geometry': {
      keywords: ['jsxgraph', 'geometría', 'triángulo', 'círculo', 'polígono'],
      elements: ['points', 'lines', 'polygons', 'circles'],
      engines: ['geometry-interactive', 'jsxgraph-core']
    },
    'jsxgraph-function': {
      keywords: ['función', 'gráfica', 'curva', 'parábola', 'seno', 'coseno'],
      elements: ['curves', 'points', 'gliders'],
      engines: ['function-plotter', 'graph-interactive']
    },
    'jsxgraph-matrix': {
      keywords: ['matriz', 'sistema', 'ecuaciones', 'determinante'],
      elements: ['points', 'lines', 'text'],
      engines: ['matrix-calculator', 'system-solver']
    },
    'text-content': {
      keywords: ['texto', 'lectura', 'comprensión', 'contenido'],
      elements: ['text', 'paragraph', 'heading'],
      engines: ['text-renderer', 'content-display']
    },
    'interactive-generic': {
      keywords: ['interactivo', 'arrastre', 'clic', 'selección'],
      elements: ['events', 'actions', 'feedback'],
      engines: ['generic-interactive', 'click-handler']
    }
  };

  /**
   * Enhanced engine inference with candidate selection
   */
  static async inferEngine(
    defBoards: Record<string, any>,
    rDef: Record<string, any>,
    context: EngineInferenceContext
  ): Promise<string> {
    console.log(`[EngineInferenceV2] Starting enhanced engine inference...`);
    
    const candidates: Array<{ engine: string; confidence: number; source: string }> = [];
    
    // Strategy 1: Explicit engine detection (weight: 1.0)
    const explicitEngine = this.findExplicitEngine(rDef);
    if (explicitEngine) {
      candidates.push({ engine: explicitEngine, confidence: 1.0, source: 'explicit' });
    }
    
    // Strategy 2: Deep content analysis (weight: 0.9)
    const contentAnalysis = this.performDeepContentAnalysis(defBoards, rDef, context);
    if (contentAnalysis.engine && contentAnalysis.confidence > 0.7) {
      candidates.push({
        engine: contentAnalysis.engine,
        confidence: contentAnalysis.confidence,
        source: 'deep-content'
      });
    }
    
    // Strategy 3: Structural pattern matching (weight: 0.8)
    const structuralInference = this.performStructuralPatternMatching(defBoards, rDef);
    if (structuralInference.engine && structuralInference.confidence > 0.6) {
      candidates.push({
        engine: structuralInference.engine,
        confidence: structuralInference.confidence,
        source: 'structural'
      });
    }
    
    // Strategy 3.5: Enhanced NV format detection for cap_6 pages
    if (context.chapterNumber === 6) {
      const nvInference = this.performNVCap6Inference(defBoards, rDef);
      if (nvInference.engine && nvInference.confidence > 0.7) {
        candidates.push({
          engine: nvInference.engine,
          confidence: nvInference.confidence,
          source: 'nv-cap6'
        });
      }
    }
    
    // Strategy 4: Contextual topic inference (weight: 0.7)
    const contextualInference = await this.performContextualInference(context);
    if (contextualInference.engine && contextualInference.confidence > 0.5) {
      candidates.push({
        engine: contextualInference.engine,
        confidence: contextualInference.confidence,
        source: 'contextual'
      });
    }
    
    // Strategy 5: Pattern-based inference (weight: 0.6)
    const patternInference = this.performPatternBasedInference(defBoards, rDef, context);
    if (patternInference.engine && patternInference.confidence > 0.4) {
      candidates.push({
        engine: patternInference.engine,
        confidence: patternInference.confidence,
        source: 'pattern'
      });
    }
    
    // Select best candidate
    if (candidates.length > 0) {
      const best = candidates.reduce((prev, current) =>
        current.confidence > prev.confidence ? current : prev
      );
      
      console.log(`[EngineInferenceV2] Selected engine: ${best.engine} (confidence: ${best.confidence}, source: ${best.source})`);
      return best.engine;
    }
    
    // Reduced fallback usage
    console.log(`[EngineInferenceV2] All inference strategies failed, using intelligent fallback`);
    return this.selectIntelligentFallback(defBoards, rDef, context);
  }

  /**
   * Enhanced content-based inference with better pattern recognition
   */
  private static inferFromEnhancedContent(
    defBoards: Record<string, any>,
    rDef: Record<string, any>,
    context: EngineInferenceContext
  ): string | null {
    // Analyze exercise content from both sources
    const exerciseContent = this.extractExerciseContent(defBoards, rDef);
    
    if (!exerciseContent) {
      return null;
    }
    
    // Geometry detection (enhanced)
    if (this.hasGeometryKeywords(exerciseContent)) {
      if (this.hasMultipleBoards(defBoards)) {
        return 'multi-geometry';
      }
      return this.hasComplexGeometry(exerciseContent) ? 'advanced-geometry' : 'geometry-interactive';
    }
    
    // Function/graph detection (enhanced)
    if (this.hasFunctionKeywords(exerciseContent)) {
      if (this.hasMultipleBoards(defBoards)) {
        return 'multi-graph';
      }
      return this.hasComplexFunctions(exerciseContent) ? 'advanced-function' : 'function-plotter';
    }
    
    // Text content detection
    if (this.isTextHeavyContent(exerciseContent)) {
      return 'text-renderer';
    }
    
    // Interactive content detection
    if (this.hasInteractiveElements(exerciseContent)) {
      return 'interactive-assessment';
    }
    
    // Matrix/system detection
    if (this.hasSystemKeywords(exerciseContent)) {
      return 'system-solver';
    }
    
    // Use contextual inference as final fallback
    return null; // Let contextual inference handle it
  }

  /**
   * Extract exercise content from defBoards and rDef
   */
  private static extractExerciseContent(
    defBoards: Record<string, any>,
    rDef: Record<string, any>
  ): { text: string; keywords: string[] } | null {
    const content = {
      text: '',
      keywords: [] as string[]
    };
    
    // Extract from defBoards
    if (defBoards) {
      for (const board of Object.values(defBoards)) {
        if (board.title) content.text += board.title + ' ';
        if (board.description) content.text += board.description + ' ';
        
        // Look for keywords in board structure
        const boardStr = JSON.stringify(board).toLowerCase();
        if (boardStr.includes('punto') || boardStr.includes('coordenada')) {
          content.keywords.push('geometry', 'point', 'coordinate');
        }
        if (boardStr.includes('función') || boardStr.includes('gráfica')) {
          content.keywords.push('function', 'graph', 'curve');
        }
      }
    }
    
    // Extract from rDef
  if (rDef) {
    if (rDef.textUtils?.artifacts) {
      for (const artifact of Object.values(rDef.textUtils.artifacts)) {
        const artifactAny = artifact as any;
        if (artifactAny?.titulo) content.text += artifactAny.titulo + ' ';
        if (artifactAny?.descripcion) content.text += artifactAny.descripcion + ' ';
        
        // Extract keywords from artifact content
        const artifactStr = JSON.stringify(artifact).toLowerCase();
        if (artifactStr.includes('pregunta') || artifactStr.includes('ejercicio')) {
          content.keywords.push('question', 'exercise', 'assessment');
        }
        if (artifactStr.includes('interactivo') || artifactStr.includes('interacción')) {
          content.keywords.push('interactive', 'activity');
        }
      }
    }
    
    // Extract from questions
    if (rDef.artifactHtml?.datadefault) {
      for (const artifact of rDef.artifactHtml.datadefault) {
        if (artifact.contents) {
          for (const [key, value] of Object.entries(artifact.contents)) {
            const contentAny = value as any;
            if (contentAny?.pregunta) {
              content.text += contentAny.pregunta + ' ';
              content.keywords.push('question', 'exercise');
            }
          }
        }
      }
    }
  }
    
    return content.text.trim() ? content : null;
  }

  /**
   * Check if content has geometry keywords
   */
  private static hasGeometryKeywords(content: { text: string; keywords: string[] }): boolean {
    const geometryKeywords = [
      'punto', 'coordenada', 'recta', 'línea', 'triángulo', 'círculo',
      'geometría', 'ángulo', 'distancia', 'perpendicular', 'paralelo'
    ];
    
    const text = content.text.toLowerCase();
    return geometryKeywords.some(keyword => text.includes(keyword)) ||
           content.keywords.some(keyword => keyword.includes('geometry'));
  }

  /**
   * Check if content has function keywords
   */
  private static hasFunctionKeywords(content: { text: string; keywords: string[] }): boolean {
    const functionKeywords = [
      'función', 'gráfica', 'curva', 'parábola', 'seno', 'coseno',
      'dominio', 'rango', 'límite', 'derivada', 'integral'
    ];
    
    const text = content.text.toLowerCase();
    return functionKeywords.some(keyword => text.includes(keyword)) ||
           content.keywords.some(keyword => keyword.includes('function'));
  }

  /**
   * Check if content has complex geometry
   */
  private static hasComplexGeometry(content: { text: string; keywords: string[] }): boolean {
    const complexKeywords = [
      'transformación', 'rotación', 'traslación', 'reflexión', 'simetría',
      'semejanza', 'congruencia', 'perímetro', 'área'
    ];
    
    const text = content.text.toLowerCase();
    return complexKeywords.some(keyword => text.includes(keyword));
  }

  /**
   * Check if content has complex functions
   */
  private static hasComplexFunctions(content: { text: string; keywords: string[] }): boolean {
    const complexKeywords = [
      'derivada', 'integral', 'límite', 'continuidad', 'máximo', 'mínimo',
      'optimización', 'raíz', 'polinomio'
    ];
    
    const text = content.text.toLowerCase();
    return complexKeywords.some(keyword => text.includes(keyword));
  }

  /**
   * Check if content is text-heavy
   */
  private static isTextHeavyContent(content: { text: string; keywords: string[] }): boolean {
    const text = content.text.toLowerCase();
    const textIndicators = ['texto', 'lectura', 'comprensión', 'descripción', 'explicación'];
    
    return textIndicators.some(indicator => text.includes(indicator)) ||
           content.keywords.some(keyword => keyword.includes('text'));
  }

  /**
   * Check if content has interactive elements
   */
  private static hasInteractiveElements(content: { text: string; keywords: string[] }): boolean {
    const interactiveKeywords = [
      'interactivo', 'arrastre', 'clic', 'selección', 'manipulación',
      'simulación', 'animación', 'juego', 'actividad'
    ];
    
    const text = content.text.toLowerCase();
    return interactiveKeywords.some(indicator => text.includes(indicator)) ||
           content.keywords.some(keyword => keyword.includes('interactive'));
  }

  /**
   * Check if content has system/math keywords
   */
  private static hasSystemKeywords(content: { text: string; keywords: string[] }): boolean {
    const systemKeywords = [
      'sistema', 'ecuaciones', 'matriz', 'álgebra', 'cálculo',
      'estadística', 'probabilidad', 'combinatoria'
    ];
    
    const text = content.text.toLowerCase();
    return systemKeywords.some(indicator => text.includes(indicator)) ||
           content.keywords.some(keyword => keyword.includes('system'));
  }

  /**
   * Check if there are multiple boards
   */
  private static hasMultipleBoards(defBoards: Record<string, any>): boolean {
    return Object.keys(defBoards).length > 1;
  }

  /**
   * Find explicitly defined engines in different formats
   */
  private static findExplicitEngine(rDef: Record<string, any>): string | null {
    // Check in rDef.engine
    if (rDef.engine) {
      return rDef.engine;
    }
    
    // Check in textUtils.artifacts
    if (rDef.textUtils?.artifacts) {
      for (const artifact of Object.values(rDef.textUtils.artifacts)) {
        if ((artifact as any).engine) {
          return (artifact as any).engine;
        }
      }
    }
    
    // Check in artifactHtml.datadefault
    if (rDef.artifactHtml?.datadefault) {
      for (const artifact of rDef.artifactHtml.datadefault) {
        if (artifact.engine) {
          return artifact.engine;
        }
        
        // Check in contents
        if (artifact.contents) {
          for (const content of Object.values(artifact.contents)) {
            if ((content as any).engine) {
              return (content as any).engine;
            }
          }
        }
      }
    }
    
    // Check in direct artifacts
    for (const [key, artifact] of Object.entries(rDef)) {
      if (key.startsWith('artifact_') && (artifact as any).engine) {
        return (artifact as any).engine;
      }
    }
    
    return null;
  }

  /**
   * Infer engine from defBoards structure
   */
  private static inferFromDefBoards(defBoards: Record<string, any>): string | null {
    if (!defBoards || Object.keys(defBoards).length === 0) {
      return null;
    }
    
    const boardCount = Object.keys(defBoards).length;
    const boardElements = this.analyzeBoardElements(defBoards);
    
    // Analyze element patterns
    if (boardElements.hasGeometry && boardElements.hasPoints) {
      return boardCount > 1 ? 'multi-geometry' : 'geometry-interactive';
    }
    
    if (boardElements.hasCurves && boardElements.hasPoints) {
      return boardCount > 1 ? 'multi-graph' : 'function-plotter';
    }
    
    if (boardElements.hasLines && boardElements.hasText) {
      return 'coordinate-system';
    }
    
    if (boardElements.hasPolygons && boardElements.hasCircles) {
      return 'advanced-geometry';
    }
    
    if (boardCount > 2) {
      return 'multi-board';
    }
    
    if (boardElements.hasAnimation) {
      return 'animated-geometry';
    }
    
    return 'jsxgraph-core';
  }

  /**
   * Analyze elements present in defBoards
   */
  private static analyzeBoardElements(defBoards: Record<string, any>): {
    hasGeometry: boolean;
    hasCurves: boolean;
    hasPoints: boolean;
    hasLines: boolean;
    hasText: boolean;
    hasPolygons: boolean;
    hasCircles: boolean;
    hasAnimation: boolean;
  } {
    const elements = {
      hasGeometry: false,
      hasCurves: false,
      hasPoints: false,
      hasLines: false,
      hasText: false,
      hasPolygons: false,
      hasCircles: false,
      hasAnimation: false
    };
    
    for (const board of Object.values(defBoards)) {
      if (board.points?.length > 0) elements.hasPoints = true;
      if (board.lines?.length > 0) elements.hasLines = true;
      if (board.curves?.length > 0) elements.hasCurves = true;
      if (board.polygons?.length > 0) elements.hasPolygons = true;
      if (board.circles?.length > 0) elements.hasCircles = true;
      if (board.text?.length > 0) elements.hasText = true;
      if (board.animation || board.animate) elements.hasAnimation = true;
      
      // Check for geometry indicators
      if (board.style?.axis || board.style?.grid || board.style?.boundingbox) {
        elements.hasGeometry = true;
      }
    }
    
    return elements;
  }

  /**
   * Infer engine from rDef content structure
   */
  private static inferFromRDef(rDef: Record<string, any>): string | null {
    // Check for textUtils (NV format)
    if (rDef.textUtils?.artifacts) {
      const artifacts = Object.values(rDef.textUtils.artifacts);
      
      // Check if all artifacts are text-based
      const allTextBased = artifacts.every(artifact => {
        const a = artifact as any;
        return a.nodo && Array.isArray(a.nodo) && 
               a.nodo.every((n: any) => n.texto && typeof n.texto === 'string');
      });
      
      if (allTextBased) {
        return 'text-renderer';
      }
      
      // Check for mixed content
      const hasInteractive = artifacts.some(artifact => (artifact as any).engine);
      if (hasInteractive) {
        return 'content-interactive';
      }
    }
    
    // Check for artifactHtml (MG format)
    if (rDef.artifactHtml?.datadefault) {
      const artifacts = rDef.artifactHtml.datadefault;
      
      // Analyze question types
      const questionTypes = new Set();
      for (const artifact of artifacts) {
        if (artifact.contents) {
          for (const content of Object.values(artifact.contents)) {
            const c = content as any;
            if (c.questions && Array.isArray(c.questions)) {
              for (const question of c.questions) {
                questionTypes.add(question.type);
              }
            }
          }
        }
      }
      
      // Infer based on question types
      if (questionTypes.has(1) || questionTypes.has(2)) {
        return 'quiz-engine';
      }
      
      if (questionTypes.has(3)) {
        return 'open-ended-engine';
      }
      
      if (questionTypes.has(4)) {
        return 'interactive-assessment';
      }
    }
    
    return null;
  }

  /**
   * Infer engine from contextual information
   */
  private static async inferFromContext(context: EngineInferenceContext): Promise<string | null> {
    // Use chapter information to infer appropriate engine
    const chapterTopic = TopicInference.inferTopic('', context.chapterNumber, context.bookId);
    
    // Map topics to engines
    const topicEngineMap: Record<string, string> = {
      'geometría': 'geometry-interactive',
      'álgebra': 'algebra-calculator',
      'funciones': 'function-plotter',
      'cálculo': 'calculus-visualizer',
      'estadística': 'statistics-visualizer',
      'trigonometría': 'trigonometry-explorer',
      'números': 'number-line-visualizer',
      'fundamentos matemáticos': 'basic-math-concepts',
      'razonamiento lógico': 'logic-puzzle-engine',
      'resolución de problemas': 'problem-solver',
      'pensamiento matemático': 'math-thinking-tools',
      'aplicaciones prácticas': 'practical-application'
    };
    
    return topicEngineMap[chapterTopic.topic] || null;
  }

  /**
   * Select appropriate fallback engine
   */
  private static selectFallbackEngine(
    defBoards: Record<string, any>,
    rDef: Record<string, any>
  ): string {
    // If we have defBoards, use JSXGraph
    if (defBoards && Object.keys(defBoards).length > 0) {
      return 'jsxgraph-core';
    }
    
    // If we have rDef with artifacts, use generic
    if (rDef && Object.keys(rDef).length > 0) {
      return 'generic-interactive';
    }
    
    // Default fallback
    return 'text-renderer';
  }

  /**
   * Get engine confidence score for debugging
   */
  static async getEngineConfidence(
    defBoards: Record<string, any>,
    rDef: Record<string, any>,
    context: EngineInferenceContext,
    suggestedEngine: string
  ): Promise<{
    engine: string;
    confidence: number;
    method: 'explicit' | 'structure' | 'content' | 'context' | 'fallback';
    reasons: string[];
  }> {
    // Check if explicit
    const explicitEngine = this.findExplicitEngine(rDef);
    if (explicitEngine === suggestedEngine) {
      return {
        engine: suggestedEngine,
        confidence: 1.0,
        method: 'explicit',
        reasons: ['Engine explicitly defined in content']
      };
    }
    
    // Check structure confidence
    const structureInference = this.inferFromDefBoards(defBoards);
    if (structureInference === suggestedEngine) {
      return {
        engine: suggestedEngine,
        confidence: 0.8,
        method: 'structure',
        reasons: ['Inferred from defBoards structure analysis']
      };
    }
    
    // Check content confidence
    const contentInference = this.inferFromRDef(rDef);
    if (contentInference === suggestedEngine) {
      return {
        engine: suggestedEngine,
        confidence: 0.7,
        method: 'content',
        reasons: ['Inferred from rDef content structure']
      };
    }
    
    // Check contextual confidence
    const contextualInference = await this.inferFromContext(context);
    if (contextualInference !== null && contextualInference === suggestedEngine) {
      return {
        engine: suggestedEngine,
        confidence: 0.6,
        method: 'context',
        reasons: [`Inferred from chapter ${context.chapterNumber} context`]
      };
    }
    
    // Low confidence fallback
    return {
      engine: suggestedEngine,
      confidence: 0.3,
      method: 'fallback',
      reasons: ['No strong evidence found, using fallback']
    };
  }

  /**
   * Get available engines for a book
   */
  static getAvailableEngines(bookId: string, chapterNumber: number): string[] {
    const topic = TopicInference.inferTopic('', chapterNumber, bookId);
    const pattern = this.ENGINE_PATTERNS[topic.topic as keyof typeof this.ENGINE_PATTERNS];
    
    if (pattern) {
      return pattern.engines;
    }
    
    return ['generic-interactive', 'text-renderer', 'jsxgraph-core'];
  }

  /**
   * Validate engine compatibility
   */
  static validateEngine(engine: string, defBoards: Record<string, any>): boolean {
    // Check if engine exists in our registry
    const availableEngines = this.getAllEngines();
    if (!availableEngines.includes(engine)) {
      return false;
    }
    
    // Check compatibility with defBoards
    if (engine.includes('jsxgraph') && (!defBoards || Object.keys(defBoards).length === 0)) {
      return false;
    }
    
    return true;
  }

  /**
   * Get all registered engines (mock implementation)
   */
  private static getAllEngines(): string[] {
    return [
      'jsxgraph-core',
      'geometry-interactive',
      'function-plotter',
      'matrix-calculator',
      'text-renderer',
      'generic-interactive',
      'quiz-engine',
      'open-ended-engine',
      'interactive-assessment',
      'content-interactive',
      'calculus-visualizer',
      'statistics-visualizer',
      'trigonometry-explorer',
      'number-line-visualizer',
      'basic-math-concepts',
      'logic-puzzle-engine',
      'problem-solver',
      'math-thinking-tools',
      'practical-application',
      'multi-geometry',
      'multi-graph',
      'coordinate-system',
      'animated-geometry'
    ];
  }

  /**
   * Perform deep content analysis for engine inference
   */
  private static performDeepContentAnalysis(
    defBoards: Record<string, any>,
    rDef: Record<string, any>,
    context: EngineInferenceContext
  ): { engine: string; confidence: number } {
    const content = this.extractAllContent(defBoards, rDef);
    const text = content.text.toLowerCase();
    
    // Geometry analysis with high confidence
    const geometryIndicators = [
      'triángulo', 'círculo', 'polígono', 'coordenada', 'punto', 'recta',
      'ángulo', 'distancia', 'geometría', 'perpendicular', 'paralelo'
    ];
    
    const geometryScore = geometryIndicators.reduce((score, indicator) =>
      score + (text.includes(indicator) ? 1 : 0), 0
    );
    
    if (geometryScore >= 3) {
      const hasMultipleBoards = Object.keys(defBoards).length > 1;
      return {
        engine: hasMultipleBoards ? 'multi-geometry' : 'geometry-interactive',
        confidence: 0.9
      };
    }
    
    // Function analysis with high confidence
    const functionIndicators = [
      'función', 'gráfica', 'curva', 'parábola', 'seno', 'coseno',
      'dominio', 'rango', 'límite', 'derivada', 'integral'
    ];
    
    const functionScore = functionIndicators.reduce((score, indicator) =>
      score + (text.includes(indicator) ? 1 : 0), 0
    );
    
    if (functionScore >= 3) {
      return {
        engine: 'function-plotter',
        confidence: 0.9
      };
    }
    
    // Text content analysis
    const textIndicators = ['texto', 'lectura', 'comprensión', 'descripción', 'explicación'];
    const textScore = textIndicators.reduce((score, indicator) =>
      score + (text.includes(indicator) ? 1 : 0), 0
    );
    
    if (textScore >= 2) {
      return {
        engine: 'text-renderer',
        confidence: 0.8
      };
    }
    
    return { engine: '', confidence: 0 };
  }

  /**
   * Enhanced structural pattern matching with better engine selection
   */
  private static performStructuralPatternMatching(
    defBoards: Record<string, any>,
    rDef: Record<string, any>
  ): { engine: string; confidence: number } {
    console.log(`[EngineInferenceV2] Performing enhanced structural pattern matching...`);
    
    // Enhanced defBoards analysis with more sophisticated patterns
    if (defBoards && Object.keys(defBoards).length > 0) {
      const analysis = this.analyzeDefBoardsStructure(defBoards);
      console.log(`[EngineInferenceV2] DefBoards analysis:`, analysis);
      
      // Strong geometry indicators
      if (analysis.hasGeometry && analysis.hasPoints && analysis.confidence >= 0.7) {
        console.log(`[EngineInferenceV2] Selected geometry engine: ${analysis.hasMultipleBoards ? 'multi-geometry' : 'geometry-interactive'} (confidence: ${analysis.confidence})`);
        return {
          engine: analysis.hasMultipleBoards ? 'multi-geometry' : 'geometry-interactive',
          confidence: analysis.confidence
        };
      }
      
      // Strong function/graph indicators
      if (analysis.hasFunctions && analysis.hasCurves && analysis.confidence >= 0.7) {
        return {
          engine: analysis.hasMultipleBoards ? 'multi-graph' : 'function-plotter',
          confidence: analysis.confidence
        };
      }
      
      // Text-heavy content
      if (analysis.hasText && analysis.textDominance > 0.6) {
        return { engine: 'text-renderer', confidence: 0.7 };
      }
      
      // Interactive elements
      if (analysis.hasInteractive && analysis.confidence >= 0.6) {
        return { engine: 'interactive-assessment', confidence: analysis.confidence };
      }
      
      // Multiple boards with mixed content - but with lower confidence
      if (analysis.hasMultipleBoards && analysis.mixedContent) {
        console.log(`[EngineInferenceV2] Using multi-board as fallback for mixed content (confidence: 0.5)`);
        return { engine: 'multi-board', confidence: 0.5 }; // Reduced from 0.7
      }
      
      // Single board with basic structure
      if (analysis.hasBasicStructure) {
        return { engine: 'jsxgraph-core', confidence: 0.6 };
      }
      
      // Fallback for defBoards with lower confidence
      console.log(`[EngineInferenceV2] Using jsxgraph-core as fallback for defBoards (confidence: 0.4)`);
      return { engine: 'jsxgraph-core', confidence: 0.4 };
    }
    
    // Enhanced rDef analysis
    if (rDef && Object.keys(rDef).length > 0) {
      const analysis = this.analyzeRDefStructure(rDef);
      console.log(`[EngineInferenceV2] RDef analysis:`, analysis);
      
      // NV format with textUtils
      if (analysis.hasTextUtils && analysis.textDominance > 0.7) {
        return { engine: 'text-renderer', confidence: 0.8 };
      }
      
      // NV format with mixed content
      if (analysis.hasTextUtils && analysis.hasInteractive) {
        return { engine: 'content-interactive', confidence: 0.7 };
      }
      
      // MG format with artifacts
      if (analysis.hasArtifactHtml && analysis.hasQuestions) {
        return { engine: 'quiz-engine', confidence: 0.7 };
      }
      
      // Generic interactive content
      if (analysis.hasArtifacts && analysis.hasInteractive) {
        return { engine: 'generic-interactive', confidence: 0.6 };
      }
      
      // Basic content
      if (analysis.hasContent) {
        return { engine: 'content-display', confidence: 0.5 };
      }
    }
    
    console.log(`[EngineInferenceV2] No strong structural patterns found`);
    return { engine: '', confidence: 0 };
  }

  /**
   * Analyze defBoards structure with enhanced pattern detection
   */
  private static analyzeDefBoardsStructure(defBoards: Record<string, any>): {
    hasGeometry: boolean;
    hasFunctions: boolean;
    hasPoints: boolean;
    hasCurves: boolean;
    hasText: boolean;
    hasInteractive: boolean;
    hasMultipleBoards: boolean;
    hasBasicStructure: boolean;
    mixedContent: boolean;
    textDominance: number;
    confidence: number;
  } {
    const boardCount = Object.keys(defBoards).length;
    const allContent = JSON.stringify(defBoards).toLowerCase();
    
    // Enhanced pattern detection
    const geometryPatterns = [
      'punto', 'coordenada', 'triángulo', 'círculo', 'recta', 'línea',
      'ángulo', 'distancia', 'perpendicular', 'paralelo', 'geometría'
    ];
    
    const functionPatterns = [
      'función', 'gráfica', 'curva', 'parábola', 'seno', 'coseno',
      'dominio', 'rango', 'límite', 'derivada', 'integral'
    ];
    
    const textPatterns = [
      'texto', 'text', 'title', 'description', 'label', 'etiqueta'
    ];
    
    const interactivePatterns = [
      'interactive', 'interactivo', 'click', 'clic', 'drag', 'arrastre',
      'event', 'evento', 'action', 'acción'
    ];
    
    const geometryScore = geometryPatterns.reduce((score, pattern) =>
      score + (allContent.includes(pattern) ? 1 : 0), 0
    );
    
    const functionScore = functionPatterns.reduce((score, pattern) =>
      score + (allContent.includes(pattern) ? 1 : 0), 0
    );
    
    const textScore = textPatterns.reduce((score, pattern) =>
      score + (allContent.includes(pattern) ? 1 : 0), 0
    );
    
    const interactiveScore = interactivePatterns.reduce((score, pattern) =>
      score + (allContent.includes(pattern) ? 1 : 0), 0
    );
    
    // Calculate confidence based on pattern strength
    const maxScore = Math.max(geometryScore, functionScore, textScore, interactiveScore);
    const confidence = maxScore >= 3 ? 0.8 : maxScore >= 2 ? 0.6 : maxScore >= 1 ? 0.4 : 0.2;
    
    // Check for specific structural elements
    const hasPoints = allContent.includes('point') || geometryScore > 0;
    const hasCurves = allContent.includes('curve') || functionScore > 0;
    const hasBasicStructure = hasPoints || hasCurves || textScore > 0;
    
    // Determine content type dominance
    const totalPatterns = geometryScore + functionScore + textScore + interactiveScore;
    const textDominance = totalPatterns > 0 ? textScore / totalPatterns : 0;
    
    // Check for mixed content
    const contentTypes = [
      geometryScore > 0,
      functionScore > 0,
      textScore > 0,
      interactiveScore > 0
    ].filter(Boolean).length;
    
    const mixedContent = contentTypes > 1;
    
    return {
      hasGeometry: geometryScore >= 2,
      hasFunctions: functionScore >= 2,
      hasPoints,
      hasCurves,
      hasText: textScore >= 1,
      hasInteractive: interactiveScore >= 1,
      hasMultipleBoards: boardCount > 1,
      hasBasicStructure,
      mixedContent,
      textDominance,
      confidence
    };
  }

  /**
   * Analyze rDef structure with enhanced pattern detection
   */
  private static analyzeRDefStructure(rDef: Record<string, any>): {
    hasTextUtils: boolean;
    hasArtifactHtml: boolean;
    hasArtifacts: boolean;
    hasInteractive: boolean;
    hasQuestions: boolean;
    hasContent: boolean;
    textDominance: number;
  } {
    const allContent = JSON.stringify(rDef).toLowerCase();
    
    // Check for NV format indicators
    const hasTextUtils = !!(rDef.textUtils && rDef.textUtils.artifacts);
    
    // Check for MG format indicators
    const hasArtifactHtml = !!(rDef.artifactHtml && rDef.artifactHtml.datadefault);
    
    // General artifact detection
    const hasArtifacts = hasTextUtils || hasArtifactHtml ||
                        Object.keys(rDef).some(key => key.includes('artifact'));
    
    // Interactive elements detection
    const interactivePatterns = ['engine', 'interactive', 'interactivo', 'event', 'action'];
    const hasInteractive = interactivePatterns.some(pattern => allContent.includes(pattern));
    
    // Questions detection
    const questionPatterns = ['question', 'pregunta', 'quiz', 'test', 'assessment'];
    const hasQuestions = questionPatterns.some(pattern => allContent.includes(pattern));
    
    // Content detection
    const contentPatterns = ['texto', 'text', 'content', 'contenido', 'titulo', 'description'];
    const hasContent = contentPatterns.some(pattern => allContent.includes(pattern));
    
    // Text dominance calculation
    const textPatterns = ['texto', 'text', 'nodo', 'contenido'];
    const textScore = textPatterns.reduce((score, pattern) =>
      score + (allContent.includes(pattern) ? 1 : 0), 0
    );
    
    const totalPatterns = textScore + (hasInteractive ? 2 : 0) + (hasQuestions ? 2 : 0);
    const textDominance = totalPatterns > 0 ? textScore / totalPatterns : 0;
    
    return {
      hasTextUtils,
      hasArtifactHtml,
      hasArtifacts,
      hasInteractive,
      hasQuestions,
      hasContent,
      textDominance
    };
  }

  /**
   * Perform contextual inference
   */
  private static async performContextualInference(
    context: EngineInferenceContext
  ): Promise<{ engine: string; confidence: number }> {
    const chapterTopic = TopicInference.inferTopic('', context.chapterNumber, context.bookId);
    
    const topicEngineMap: Record<string, { engine: string; confidence: number }> = {
      'geometría': { engine: 'geometry-interactive', confidence: 0.7 },
      'álgebra': { engine: 'algebra-calculator', confidence: 0.6 },
      'funciones': { engine: 'function-plotter', confidence: 0.7 },
      'cálculo': { engine: 'calculus-visualizer', confidence: 0.6 },
      'estadística': { engine: 'statistics-visualizer', confidence: 0.6 },
      'trigonometría': { engine: 'trigonometry-explorer', confidence: 0.6 },
      'números': { engine: 'number-line-visualizer', confidence: 0.5 },
      'fundamentos matemáticos': { engine: 'basic-math-concepts', confidence: 0.5 }
    };
    
    const mapped = topicEngineMap[chapterTopic.topic];
    return mapped || { engine: '', confidence: 0 };
  }

  /**
   * Perform pattern-based inference
   */
  private static performPatternBasedInference(
    defBoards: Record<string, any>,
    rDef: Record<string, any>,
    context: EngineInferenceContext
  ): { engine: string; confidence: number } {
    // Chapter-based patterns
    const chapterNumber = context.chapterNumber;
    
    if (chapterNumber <= 3) {
      return { engine: 'basic-math-concepts', confidence: 0.5 };
    }
    
    if (chapterNumber >= 4 && chapterNumber <= 6) {
      return { engine: 'geometry-interactive', confidence: 0.5 };
    }
    
    if (chapterNumber >= 7) {
      return { engine: 'function-plotter', confidence: 0.5 };
    }
    
    return { engine: '', confidence: 0 };
  }

  /**
   * Enhanced intelligent fallback with reduced multi-board usage
   */
  private static selectIntelligentFallback(
    defBoards: Record<string, any>,
    rDef: Record<string, any>,
    context: EngineInferenceContext
  ): string {
    console.log(`[EngineInferenceV2] Using enhanced intelligent fallback...`);
    
    // Enhanced defBoards analysis with specific engine selection
    if (defBoards && Object.keys(defBoards).length > 0) {
      const analysis = this.analyzeDefBoardsStructure(defBoards);
      
      if (analysis.hasGeometry && analysis.confidence >= 0.4) {
        return analysis.hasMultipleBoards ? 'multi-geometry' : 'geometry-interactive';
      }
      
      if (analysis.hasFunctions && analysis.confidence >= 0.4) {
        return analysis.hasMultipleBoards ? 'multi-graph' : 'function-plotter';
      }
      
      if (analysis.hasText && analysis.textDominance > 0.5) {
        return 'text-renderer';
      }
      
      if (analysis.hasInteractive) {
        return 'interactive-assessment';
      }
      
      // Prefer specific engines over generic multi-board
      if (analysis.hasBasicStructure) {
        return 'jsxgraph-core';
      }
      
      // Only use multi-board as last resort for defBoards
      if (analysis.hasMultipleBoards && analysis.mixedContent) {
        console.log(`[EngineInferenceV2] Using multi-board as last resort for mixed content`);
        return 'multi-board';
      }
    }
    
    // Enhanced rDef analysis with better fallbacks
    if (rDef && Object.keys(rDef).length > 0) {
      const analysis = this.analyzeRDefStructure(rDef);
      
      if (analysis.hasTextUtils && analysis.textDominance > 0.6) {
        return 'text-renderer';
      }
      
      if (analysis.hasTextUtils && analysis.hasInteractive) {
        return 'content-interactive';
      }
      
      if (analysis.hasArtifactHtml && analysis.hasQuestions) {
        return 'quiz-engine';
      }
      
      if (analysis.hasArtifacts && analysis.hasInteractive) {
        return 'generic-interactive';
      }
      
      if (analysis.hasContent) {
        return 'content-display';
      }
    }
    
    // Enhanced context-based fallback with book-specific logic
    const { chapterNumber, bookId, pageNumber } = context;
    
    // NV books have different patterns - avoid multi-board
    if (bookId === 'NV') {
      if (chapterNumber <= 2) return 'text-renderer';
      if (chapterNumber <= 4) return 'content-interactive';
      if (chapterNumber <= 6) return 'generic-interactive';
      return 'interactive-assessment';
    }
    
    // MG books fallback logic - prefer specific engines
    if (bookId === 'MG') {
      if (chapterNumber <= 2) return 'basic-math-concepts';
      if (chapterNumber <= 4) return 'geometry-interactive';
      if (chapterNumber <= 6) return 'function-plotter';
      if (chapterNumber <= 8) return 'algebra-calculator';
      return 'calculus-visualizer';
    }
    
    // Page-based fallback for early pages
    if (pageNumber && pageNumber <= 2) {
      return 'text-renderer';
    }
    
    // Chapter-based fallback with better engine selection
    if (chapterNumber <= 3) return 'basic-math-concepts';
    if (chapterNumber <= 5) return 'geometry-interactive';
    if (chapterNumber <= 7) return 'function-plotter';
    if (chapterNumber <= 9) return 'algebra-calculator';
    
    // Final fallback - avoid multi-board unless absolutely necessary
    console.log(`[EngineInferenceV2] Using final fallback: interactive-assessment`);
    return 'interactive-assessment';
  }

  /**
   * Enhanced NV format detection for cap_6 pages
   */
  private static performNVCap6Inference(
    defBoards: Record<string, any>,
    rDef: Record<string, any>
  ): { engine: string; confidence: number } {
    // Check for NV-specific patterns in cap_6
    if (rDef && Object.keys(rDef).length > 0) {
      const rDefStr = JSON.stringify(rDef).toLowerCase();
      
      // Look for NV cap_6 specific patterns
      if (rDefStr.includes('def') && rDefStr.includes('artifact')) {
        return { engine: 'content-interactive', confidence: 0.8 };
      }
      
      if (rDefStr.includes('nodo') && rDefStr.includes('texto')) {
        return { engine: 'text-renderer', confidence: 0.8 };
      }
      
      if (rDefStr.includes('interactivo') || rDefStr.includes('ejercicio')) {
        return { engine: 'interactive-assessment', confidence: 0.8 };
      }
    }
    
    return { engine: '', confidence: 0 };
  }

  /**
   * Extract all content from defBoards and rDef
   */
  private static extractAllContent(
    defBoards: Record<string, any>,
    rDef: Record<string, any>
  ): { text: string; keywords: string[] } {
    const content = {
      text: '',
      keywords: [] as string[]
    };
    
    // Extract from defBoards
    if (defBoards) {
      for (const board of Object.values(defBoards)) {
        if (board.title) content.text += board.title + ' ';
        if (board.description) content.text += board.description + ' ';
      }
    }
    
    // Extract from rDef
    if (rDef) {
      if (rDef.textUtils?.artifacts) {
        for (const artifact of Object.values(rDef.textUtils.artifacts)) {
          const artifactAny = artifact as any;
          if (artifactAny?.titulo) content.text += artifactAny.titulo + ' ';
          if (artifactAny?.descripcion) content.text += artifactAny.descripcion + ' ';
        }
      }
      
      if (rDef.artifactHtml?.datadefault) {
        for (const artifact of rDef.artifactHtml.datadefault) {
          if (artifact.contents) {
            for (const [key, value] of Object.entries(artifact.contents)) {
              const contentAny = value as any;
              if (contentAny?.pregunta) {
                content.text += contentAny.pregunta + ' ';
              }
            }
          }
        }
      }
    }
    
    return content;
  }
}