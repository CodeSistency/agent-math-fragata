import { readFile } from "fs/promises";
import type { Page } from "@/types/book";
import type { Exercise } from "@/types/exercise";
import { createHash } from "crypto";
import {
  extractTemaFromContext,
  extractSubtemaFromContext,
  inferDificultadFromQuestion,
  extractSolutionFromQuestion
} from "./metadata-extraction";
import { inferEngineFromStructure } from "./engine-inference";

// Extended metadata interface for our custom fields
interface ExtendedExerciseMetadata {
  exerciseType?: string;
  recovered?: boolean;
  originalFormat?: string;
  exercisesGenerated?: number;
  artifactKey?: string;
  totalQuestions?: number;
  questionIndex?: number;
  questionData?: {
    type: number;
    answers_values: any[];
    conditions: Record<string, any>;
  };
  suggestedEngine?: string;
}

export interface ParsedContent {
  defBoards?: Record<string, any>;
  rDef?: Record<string, any>;
  allDef?: Record<string, any>;
  format: "MG" | "NV" | "basic" | "unknown";
  exercises: Exercise[];
  metadata: Record<string, any>;
}

export interface PageContext {
  bookId: string;
  chapterId: string;
  chapterNumber: number;
  pageId: string;
  pageNumber: number;
  variant?: number;
  filePath: string;
}

/**
 * Unified parser for both MG and NV book formats
 * Handles different structures and normalizes them for processing
 */
export class UnifiedBookParser {
  /**
   * Parse a definition file with enhanced error recovery
   */
  static async parseDefinitionFile(filePath: string, context: PageContext): Promise<ParsedContent> {
    try {
      const content = await readFile(filePath, 'utf-8');
      const detectedFormat = this.detectFormat(content, filePath);
      
      try {
        switch (detectedFormat) {
          case 'NV':
            return this.parseNVFormat(content, filePath, context);
          case 'MG':
            return this.parseMGFormat(content, filePath, context);
          case 'basic':
            return this.parseBasicFormat(content, filePath, context);
          default:
            return this.attemptRecoveryParsing(content, filePath, context);
        }
      } catch (parseError) {
        console.warn(`[UnifiedBookParser] Primary parsing failed for ${filePath}, attempting recovery:`, parseError);
        return this.attemptRecoveryParsing(content, filePath, context);
      }
    } catch (error) {
      console.error(`[UnifiedBookParser] Complete parsing failure for ${filePath}:`, error);
      return this.createFallbackContent(filePath, context, error);
    }
  }

  /**
   * Enhanced format detection with scoring system
   */
  private static detectFormat(content: string, filePath: string): 'MG' | 'NV' | 'basic' | 'unknown' {
    const contentLower = content.toLowerCase();
    
    // Enhanced NV format detection with more patterns
    const nvPatterns = [
      'textutils', 'artifacts', 'nodo', 'texto', 'lectura', 'comprensión',
      'scrollnav', 'enginetable', 'engineowner', 'artifact_raiting',
      'const def =', 'let def =', 'var def ='
    ];
    
    const nvScore = nvPatterns.reduce((score, pattern) =>
      score + (contentLower.includes(pattern) ? 1 : 0), 0
    );
    
    if (nvScore >= 2) {
      console.log(`[UnifiedBookParser] Detected NV format (score: ${nvScore})`);
      return 'NV';
    }
    
    // Enhanced MG format detection with more patterns
    const mgPatterns = [
      'defboards', 'rdef', 'createboard', 'jxg.', 'glider', 'jsxgraph',
      'point', 'curve', 'function', 'etwdef', 'etwdefboards', 'etwmain',
      'artifacthtml', 'datadefault', 'board_'
    ];
    
    const mgScore = mgPatterns.reduce((score, pattern) =>
      score + (contentLower.includes(pattern) ? 1 : 0), 0
    );
    
    if (mgScore >= 2) {
      console.log(`[UnifiedBookParser] Detected MG format (score: ${mgScore})`);
      return 'MG';
    }
    
    // Path-based detection as fallback
    if (filePath.includes('/NV/') || filePath.includes('NV_')) return 'NV';
    if (filePath.includes('/MG/') || filePath.includes('MG_')) return 'MG';
    
    // Structure-based detection
    if (contentLower.includes('function') || contentLower.includes('const ') ||
        contentLower.includes('let ') || contentLower.includes('var ') ||
        contentLower.includes('class ') || contentLower.includes('export ')) {
      console.log(`[UnifiedBookParser] Detected basic format by structure`);
      return 'basic';
    }
    
    console.log(`[UnifiedBookParser] Unknown format detected for ${filePath} (NV: ${nvScore}, MG: ${mgScore})`);
    return 'unknown';
  }

  /**
   * Parse basic JavaScript format (fallback)
   */
  private static parseBasicFormat(content: string, filePath: string, context: PageContext): ParsedContent {
    console.log(`[UnifiedBookParser] Attempting to parse as basic format: ${filePath}`);
    
    const exercises: Exercise[] = [];
    
    try {
      // Extract basic information from the content
      const lines = content.split('\n');
      let currentExercise: Partial<Exercise> | null = null;
      let exerciseIndex = 0;
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Look for potential exercise patterns
        if (trimmedLine.includes('function') ||
            trimmedLine.includes('const') ||
            trimmedLine.includes('let') ||
            trimmedLine.includes('var')) {
          
          if (currentExercise) {
            exercises.push(currentExercise as Exercise);
          }
          
          exerciseIndex++;
          currentExercise = {
            id: this.generateExerciseId(context.bookId, context.pageId, `basic_${exerciseIndex}`, exerciseIndex, `Ejercicio ${exerciseIndex}`),
            tema: extractTemaFromContext(context as any, context.chapterNumber) || "Ejercicio básico",
            subtema: extractSubtemaFromContext(context as any, context.chapterNumber) || `Capítulo ${context.chapterNumber}`,
            dificultad: "media",
            enunciado: trimmedLine || `Ejercicio ${exerciseIndex}`,
            solucion: "",
            metadata: {
              bookId: context.bookId,
              bookName: context.bookId,
              chapterId: context.chapterId,
              chapterNumber: context.chapterNumber,
              pageId: context.pageId,
              pageNumber: context.pageNumber,
              variant: context.variant,
              questionIndex: exerciseIndex,
              totalQuestions: 1,
              recovered: true
            }
          };
        }
      }
      
      // Add the last exercise if exists
      if (currentExercise) {
        exercises.push(currentExercise as Exercise);
      }
      
      return {
        format: "basic",
        exercises,
        metadata: {
          recovered: true,
          originalFormat: "unknown",
          exercisesGenerated: exercises.length
        }
      };
    } catch (error) {
      console.error(`[UnifiedBookParser] Basic format parsing error:`, error);
      return {
        format: "basic",
        exercises: [],
        metadata: {
          error: error instanceof Error ? error.message : String(error),
          recovered: false
        }
      };
    }
  }

  /**
   * Parse NV format (textUtils.artifacts structure and def pattern)
   */
  private static parseNVFormat(content: string, filePath: string, context: PageContext): ParsedContent {
    const parsed: ParsedContent = {
      format: "NV",
      exercises: [],
      metadata: {}
    };

    try {
      let artifacts: Record<string, any> = {};
      let source = "unknown";
      
      // Try textUtils pattern first
      const textUtilsMatch = content.match(/(?:let|const|var)\s+textUtils\s*=\s*(\{[\s\S]*?\});/);
      if (textUtilsMatch) {
        source = "textUtils";
        // Extract artifacts keys without executing code
        const artifactKeys = Array.from(
          new Set((content.match(/artifact_[A-Za-z0-9_]+/g) || []))
        );
        
        for (const key of artifactKeys) {
          artifacts[key] = { key, detected: true, source: "textUtils" };
        }
      }
      
      // Try def pattern (for cap_6 pages)
      const defMatch = content.match(/(?:let|const|var)\s+def\s*=\s*(\{[\s\S]*?\});/);
      if (defMatch) {
        source = "def";
        // Extract artifacts from def structure
        const artifactKeys = Array.from(
          new Set((content.match(/artifact_[A-Za-z0-9_]+/g) || []))
        );
        
        for (const key of artifactKeys) {
          artifacts[key] = { key, detected: true, source: "def" };
        }
      }

      if (Object.keys(artifacts).length > 0) {
        parsed.allDef = { artifacts };
        parsed.rDef = { artifacts };
        
        // Extract defBoards if present
        const defBoardsMatch = content.match(/(?:let|const|var)\s+defBoards\s*=\s*(\{[\s\S]*?\});/);
        if (defBoardsMatch) {
          // Extract board keys without executing
          const boardKeys = Array.from(
            new Set((content.match(/board_[A-Za-z0-9_]+/g) || []))
          );
          
          const defBoards: Record<string, any> = {};
          for (const key of boardKeys) {
            defBoards[key] = { key, detected: true };
          }
          parsed.defBoards = defBoards;
        }

        // Generate exercises from NV content
        parsed.exercises = this.generateNVExercises(artifacts, context, source);
        parsed.metadata.source = source;
        parsed.metadata.artifactCount = Object.keys(artifacts).length;
      } else {
        console.warn(`[UnifiedBookParser] No artifacts found in NV format for ${filePath}`);
        parsed.metadata.warning = "No artifacts detected";
      }
    } catch (error) {
      console.error(`[UnifiedBookParser] NV parsing error for ${filePath}:`, error);
      parsed.metadata.error = error instanceof Error ? error.message : String(error);
    }

    return parsed;
  }

  /**
   * Parse MG format (defBoards + rDef structure)
   */
  private static parseMGFormat(content: string, filePath: string, context: PageContext): ParsedContent {
    const parsed: ParsedContent = {
      format: "MG",
      exercises: [],
      metadata: {}
    };

    try {
      let source = "unknown";
      
      // Extract defBoards
      const defBoardsMatch = content.match(/(?:let|const|var)\s+defBoards\s*=\s*(\{[\s\S]*?\});/);
      if (defBoardsMatch) {
        source = "defBoards";
        // Safe extraction of board structure
        const boardKeys = Array.from(
          new Set((content.match(/board_[A-Za-z0-9_]+/g) || []))
        );
        
        const defBoards: Record<string, any> = {};
        for (const key of boardKeys) {
          defBoards[key] = { key, detected: true };
        }
        parsed.defBoards = defBoards;
      }

      // Extract etwDefBoards (for etwDef pattern)
      const etwDefBoardsMatch = content.match(/(?:let|const|var)\s+etwDefBoards\s*=\s*(\{[\s\S]*?\});/);
      if (etwDefBoardsMatch) {
        source = "etwDefBoards";
        // Safe extraction of etwDefBoards structure
        const boardKeys = Array.from(
          new Set((content.match(/board_[A-Za-z0-9_]+/g) || []))
        );
        
        const defBoards: Record<string, any> = {};
        for (const key of boardKeys) {
          defBoards[key] = { key, detected: true, source: "etwDefBoards" };
        }
        parsed.defBoards = defBoards;
      }

      // Extract rDef
      const rDefMatch = content.match(/(?:let|const|var)\s+rDef\s*=\s*(\{[\s\S]*?\});/);
      if (rDefMatch) {
        // Safe extraction of rDef structure
        const artifactKeys = Array.from(
          new Set((content.match(/artifact_[A-Za-z0-9_]+/g) || []))
        );
        
        const rDef: Record<string, any> = {};
        for (const key of artifactKeys) {
          rDef[key] = { key, detected: true };
        }
        parsed.rDef = rDef;
      }

      // Extract etwDef (for etwDef pattern)
      const etwDefMatch = content.match(/(?:let|const|var)\s+etwDef\s*=\s*(\{[\s\S]*?\});/);
      if (etwDefMatch) {
        source = "etwDef";
        // Safe extraction of etwDef structure
        const artifactKeys = Array.from(
          new Set((content.match(/artifact_[A-Za-z0-9_]+/g) || []))
        );
        
        const rDef: Record<string, any> = {};
        for (const key of artifactKeys) {
          rDef[key] = { key, detected: true, source: "etwDef" };
        }
        parsed.rDef = rDef;
      }

      // Extract exercises from MG structure
      parsed.exercises = this.generateMGExercises(content, context, parsed.defBoards, parsed.rDef, source);
      parsed.metadata.source = source;
    } catch (error) {
      console.error(`[UnifiedBookParser] MG parsing error for ${filePath}:`, error);
      parsed.metadata.error = error instanceof Error ? error.message : String(error);
    }

    return parsed;
  }

  /**
   * Parse generic/unknown format
   */
  private static parseGenericFormat(content: string, filePath: string, context: PageContext): ParsedContent {
    return {
      format: "unknown",
      exercises: [],
      metadata: { 
        error: "Unknown format detected",
        filePath,
        contentLength: content.length
      }
    };
  }

  /**
   * Generate exercises from NV format artifacts
   */
  private static generateNVExercises(artifacts: Record<string, any>, context: PageContext, source: string = "unknown"): Exercise[] {
    const exercises: Exercise[] = [];

    for (const [artifactKey, artifact] of Object.entries(artifacts)) {
      // Generate comprehension exercise for textual content
      if (artifact.detected) {
        const exercise = this.generateNVComprehensionExercise(artifactKey, context, source);
        exercises.push(exercise);
      }

      // Generate interactive exercise if engine is present
      const exercise = this.generateNVInteractiveExercise(artifactKey, context, source);
      exercises.push(exercise);
    }

    return exercises;
  }

  /**
   * Generate comprehension exercise for NV textual content
   */
  private static generateNVComprehensionExercise(artifactKey: string, context: PageContext, source: string = "unknown"): Exercise {
    const exerciseId = this.generateExerciseId(context.bookId, context.pageId, artifactKey, 0, "comprensión");
    
    return {
      id: exerciseId,
      tema: extractTemaFromContext(context as any, context.chapterNumber) || "Comprensión lectora",
      subtema: extractSubtemaFromContext(context as any, context.chapterNumber) || `Capítulo ${context.chapterNumber}`,
      dificultad: "media",
      enunciado: `Analiza el contenido del artifact ${artifactKey} (${source}) y responde las preguntas relacionadas.`,
      solucion: "Respuesta abierta basada en comprensión del texto proporcionado",
      metadata: {
        bookId: context.bookId,
        bookName: context.bookId,
        chapterId: context.chapterId,
        chapterNumber: context.chapterNumber,
        pageId: context.pageId,
        pageNumber: context.pageNumber,
        variant: context.variant,
        artifactKey,
        totalQuestions: 1,
        questionIndex: 0,
        // exerciseType: "nv-comprehension", // Commented out as it's not in the type
        questionData: {
          type: 3, // Open-ended
          answers_values: [],
          conditions: {}
        }
      }
    };
  }

  /**
   * Generate interactive exercise for NV artifacts
   */
  private static generateNVInteractiveExercise(artifactKey: string, context: PageContext, source: string = "unknown"): Exercise {
    const exerciseId = this.generateExerciseId(context.bookId, context.pageId, artifactKey, 1, "interactivo");
    
    return {
      id: exerciseId,
      tema: extractTemaFromContext(context as any, context.chapterNumber) || "Ejercicio interactivo",
      subtema: extractSubtemaFromContext(context as any, context.chapterNumber) || `Capítulo ${context.chapterNumber}`,
      dificultad: "media",
      enunciado: `Interactúa con el artifact ${artifactKey} (${source}) siguiendo las instrucciones proporcionadas.`,
      solucion: "Solución basada en la interacción con el artifact visual",
      metadata: {
        bookId: context.bookId,
        bookName: context.bookId,
        chapterId: context.chapterId,
        chapterNumber: context.chapterNumber,
        pageId: context.pageId,
        pageNumber: context.pageNumber,
        variant: context.variant,
        artifactKey,
        totalQuestions: 1,
        questionIndex: 1,
        // exerciseType: "nv-interactive", // Commented out as it's not in the type
        questionData: {
          type: 4, // Interactive
          answers_values: [],
          conditions: {}
        },
        suggestedEngine: "generic-interactive"
      }
    };
  }

  /**
   * Generate exercises from MG format with questions
   */
  private static generateMGExercises(
    content: string,
    context: PageContext,
    defBoards?: Record<string, any>,
    rDef?: Record<string, any>,
    source: string = "unknown"
  ): Exercise[] {
    const exercises: Exercise[] = [];

    try {
      // Extract questions from rDef.artifactHtml.datadefault structure
      const artifactHtmlMatch = content.match(/rDef\s*=\s*\{[\s\S]*?artifactHtml\s*:\s*\{[\s\S]*?datadefault\s*:\s*(\[[\s\S]*?\])/);
      
      if (artifactHtmlMatch) {
        // Safe extraction of questions using regex
        const questionMatches = content.match(/question\s*:\s*["']([^"']+)["']/g) || [];
        
        for (let i = 0; i < questionMatches.length; i++) {
          const questionText = questionMatches[i].match(/question\s*:\s*["']([^"']+)["']/)?.[1] || `Pregunta ${i + 1}`;
          
          const exerciseId = this.generateExerciseId(context.bookId, context.pageId, `artifact_${i}`, i, questionText);
          
          exercises.push({
            id: exerciseId,
            tema: extractTemaFromContext(context as any, context.chapterNumber) || "Matemáticas",
            subtema: extractSubtemaFromContext(context as any, context.chapterNumber) || `Capítulo ${context.chapterNumber}`,
            dificultad: inferDificultadFromQuestion(questionText) || "media",
            enunciado: questionText,
            solucion: extractSolutionFromQuestion({ question: questionText }) || "",
            metadata: {
              bookId: context.bookId,
              bookName: context.bookId,
              chapterId: context.chapterId,
              chapterNumber: context.chapterNumber,
              pageId: context.pageId,
              pageNumber: context.pageNumber,
              variant: context.variant,
              artifactKey: `artifact_${i}`,
              totalQuestions: questionMatches.length,
              questionIndex: i,
              // exerciseType: "mg-question", // Commented out as it's not in the type
              artifactDefinition: defBoards && rDef ? {
                defBoards,
                rDef
              } : undefined,
              questionData: {
                type: 2, // Multiple choice
                answers_values: [],
                conditions: {}
              }
            }
          });
        }
      }
    } catch (error) {
      console.error(`[UnifiedBookParser] MG exercise generation error:`, error);
    }

    return exercises;
  }

  /**
   * Generate unique exercise ID with timestamp and hash
   */
  private static generateExerciseId(
    bookId: string,
    pageId: string,
    artifactKey: string,
    questionIndex: number,
    questionText: string
  ): string {
    const timestamp = Date.now();
    const hash = createHash("sha256")
      .update(`${bookId}_${pageId}_${artifactKey}_${questionIndex}_${questionText}_${timestamp}`)
      .digest("hex")
      .substring(0, 12);
    
    return `ej_${bookId}_${pageId}_${artifactKey}_q${questionIndex}_${hash}`;
  }

  /**
   * Attempt recovery parsing for unknown formats
   */
  private static attemptRecoveryParsing(content: string, filePath: string, context: PageContext): ParsedContent {
    console.log(`[UnifiedBookParser] Attempting recovery parsing for ${filePath}`);
    
    // Try to extract any meaningful content
    const exercises = this.extractBasicExercises(content, context);
    
    if (exercises.length > 0) {
      return {
        format: "basic",
        exercises,
        metadata: {
          recovered: true,
          originalFormat: "unknown",
          recoveryMethod: "basic-extraction",
          exercisesGenerated: exercises.length
        }
      };
    }
    
    return this.createFallbackContent(filePath, context, new Error("No recoverable content found"));
  }

  /**
   * Create fallback content when parsing fails completely
   */
  private static createFallbackContent(filePath: string, context: PageContext, error: any): ParsedContent {
    return {
      format: "unknown",
      exercises: [this.createFallbackExercise(context)],
      metadata: {
        error: error instanceof Error ? error.message : String(error),
        recovered: false,
        fallbackGenerated: true,
        filePath
      }
    };
  }

  /**
   * Create fallback exercise for failed parsing
   */
  private static createFallbackExercise(context: PageContext): Exercise {
    return {
      id: `fallback_${context.bookId}_${context.pageId}_${Date.now()}`,
      tema: "Ejercicio de recuperación",
      subtema: `Capítulo ${context.chapterNumber}`,
      dificultad: "media",
      enunciado: "Ejercicio generado automáticamente debido a error en el parsing",
      solucion: "Revisar el contenido original para determinar la solución correcta",
      metadata: {
        bookId: context.bookId,
        bookName: context.bookId,
        chapterId: context.chapterId,
        chapterNumber: context.chapterNumber,
        pageId: context.pageId,
        pageNumber: context.pageNumber,
        variant: context.variant,
        recovered: true,
        originalFormat: "unknown"
      }
    };
  }

  /**
   * Extract basic exercises from content using regex patterns
   */
  private static extractBasicExercises(content: string, context: PageContext): Exercise[] {
    const exercises: Exercise[] = [];
    
    try {
      // Look for potential exercise patterns
      const lines = content.split('\n');
      let exerciseIndex = 0;
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Look for patterns that might indicate exercises
        if (trimmedLine.includes('function') ||
            trimmedLine.includes('const') ||
            trimmedLine.includes('let') ||
            trimmedLine.includes('var') ||
            trimmedLine.includes('ejercicio') ||
            trimmedLine.includes('pregunta') ||
            trimmedLine.includes('question')) {
          
          exerciseIndex++;
          const exercise = {
            id: this.generateExerciseId(context.bookId, context.pageId, `recovery_${exerciseIndex}`, exerciseIndex, `Ejercicio ${exerciseIndex}`),
            tema: extractTemaFromContext(context as any, context.chapterNumber) || "Ejercicio recuperado",
            subtema: extractSubtemaFromContext(context as any, context.chapterNumber) || `Capítulo ${context.chapterNumber}`,
            dificultad: "media" as const,
            enunciado: trimmedLine || `Ejercicio ${exerciseIndex}`,
            solucion: "",
            metadata: {
              bookId: context.bookId,
              bookName: context.bookId,
              chapterId: context.chapterId,
              chapterNumber: context.chapterNumber,
              pageId: context.pageId,
              pageNumber: context.pageNumber,
              variant: context.variant,
              questionIndex: exerciseIndex,
              totalQuestions: 1,
              recovered: true,
              recoveryMethod: "regex-extraction"
            }
          };
          
          exercises.push(exercise);
        }
      }
    } catch (error) {
      console.error(`[UnifiedBookParser] Error in basic exercise extraction:`, error);
    }
    
    return exercises;
  }
}