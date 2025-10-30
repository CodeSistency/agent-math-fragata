import type { Exercise } from "@/types/exercise";
import type { Page } from "@/types/book";
import { parseDefinitionFileSafe } from "./js-parser-safe";
import { inferEngineFromStructure } from "./engine-inference";
import {
  extractTemaFromContext,
  inferDificultadFromQuestion,
  extractSolutionFromQuestion,
  extractSubtemaFromContext,
} from "./metadata-extraction";
import { createHash } from "crypto";
import { readFile } from "fs/promises";

/**
 * Generate unique exercise ID without Date.now()
 * Uses hash of question content for uniqueness
 */
function generateExerciseId(
  bookId: string,
  pageId: string,
  artifactKey: string,
  questionIndex: number,
  questionText: string
): string {
  // Create a hash of the question text for uniqueness
  const hash = createHash("md5")
    .update(`${bookId}_${pageId}_${artifactKey}_${questionIndex}_${questionText}`)
    .digest("hex")
    .substring(0, 8);
  
  return `ej_${bookId}_${pageId}_${artifactKey}_q${questionIndex}_${hash}`;
}

/**
 * Extract artifact-specific rDef from the full rDef structure
 * This ensures each exercise only has the rDef relevant to its artifact
 */
function extractArtifactSpecificRDef(
  fullRDef: Record<string, any>,
  artifactKey: string,
  format: "artifactHtml" | "direct" | "allDef"
): Record<string, any> {
  const specificRDef: Record<string, any> = {};

  if (format === "artifactHtml") {
    // For artifactHtml.datadefault format, extract the specific artifact
    if (fullRDef.artifactHtml?.datadefault) {
      const artifacts = fullRDef.artifactHtml.datadefault;
      for (const artifact of artifacts) {
        if (artifact.contents?.[artifactKey]) {
          // Include the artifactHtml structure but only with this specific artifact
          specificRDef.artifactHtml = {
            datadefault: [
              {
                ...artifact,
                contents: {
                  [artifactKey]: artifact.contents[artifactKey],
                },
              },
            ],
          };
          break;
        }
      }
    }
    
    // Also include artifact_X definitions if they exist
    if (fullRDef[artifactKey]) {
      specificRDef[artifactKey] = fullRDef[artifactKey];
    }
  } else if (format === "direct") {
    // For direct rDef.artifact_X format
    if (fullRDef[artifactKey]) {
      specificRDef[artifactKey] = fullRDef[artifactKey];
    }
    
    // Include artifactHtml if it exists (might be shared)
    if (fullRDef.artifactHtml) {
      specificRDef.artifactHtml = fullRDef.artifactHtml;
    }
  } else if (format === "allDef") {
    // For allDef/def format (NV style)
    if (fullRDef.artifacts?.[artifactKey]) {
      specificRDef.artifacts = {
        [artifactKey]: fullRDef.artifacts[artifactKey],
      };
    }
    
    // Also check direct artifact_X
    if (fullRDef[artifactKey]) {
      specificRDef[artifactKey] = fullRDef[artifactKey];
    }
  }

  // Preserve other shared properties
  if (fullRDef.scrollNav !== undefined) {
    specificRDef.scrollNav = fullRDef.scrollNav;
  }

  return specificRDef;
}

/**
 * Map artifact to defBoard based on different file formats
 * Handles both MG style (rDef.artifact_X.defBoard) and NV style (defBoards.board_X.artifact)
 */
function findArtifactDefBoard(
  defBoards: Record<string, any>,
  rDef: Record<string, any>,
  artifactKey: string
): string | null {
  // NV style: defBoards.board_X.artifact = "artifact_X"
  for (const [boardKey, boardValue] of Object.entries(defBoards)) {
    if (boardValue && typeof boardValue === "object") {
      if (boardValue.artifact === artifactKey) {
        return boardKey;
      }
    }
  }

  // MG style: rDef.artifact_X.defBoard = "board_X"
  if (rDef[artifactKey]?.defBoard) {
    return rDef[artifactKey].defBoard;
  }

  // Check in artifactHtml.datadefault
  if (rDef.artifactHtml?.datadefault) {
    for (const artifact of rDef.artifactHtml.datadefault) {
      if (artifact.contents?.[artifactKey]) {
        // Try to find board reference in artifact content
        const artifactContent = artifact.contents[artifactKey];
        if (artifactContent.board) {
          return artifactContent.board;
        }
      }
    }
  }

  return null;
}

/**
 * Detect the format of the definition file
 */
function detectDefinitionFormat(
  defBoards: Record<string, any>,
  rDef: Record<string, any>,
  allDef?: Record<string, any>
): "artifactHtml" | "direct" | "allDef" | "unknown" {
  // Check for artifactHtml format (MG standard)
  if (rDef?.artifactHtml?.datadefault) {
    return "artifactHtml";
  }

  // Check for direct artifact_X format (MG alternative)
  const directArtifacts = Object.keys(rDef || {}).filter((key) =>
    key.startsWith("artifact_")
  );
  if (directArtifacts.length > 0) {
    return "direct";
  }

  // Check for allDef/def format (NV style)
  if (allDef?.artifacts || rDef?.artifacts) {
    return "allDef";
  }

  // Check NV style: defBoards.board_X.artifact
  const boardsWithArtifacts = Object.values(defBoards || {}).some(
    (board: any) => board && typeof board === "object" && board.artifact
  );
  if (boardsWithArtifacts) {
    return "allDef";
  }

  return "unknown";
}

/**
 * Process a definition file and extract exercises
 * For now, this extracts the structure but doesn't generate exercises from it
 * Exercises would need to be generated from OCR or manual input
 */
export async function processDefinitionFile(
  page: Page,
  bookId: string,
  bookName: string,
  chapterId: string,
  chapterNumber: number
): Promise<{
  content: Record<string, any>;
  exercises: Exercise[];
  error?: string;
}> {
  try {
    console.log(`[definition-processor] Processing file: ${page.filePath}`);
    
    // Parse the definition file usando parser seguro
    const parsed = await parseDefinitionFileSafe(page.filePath);
    
    if (parsed.error) {
      console.warn(`[definition-processor] Error parsing file ${page.filePath}:`, parsed.error);
      return {
        content: {},
        exercises: [],
        error: parsed.error,
      };
    }

    // Normalize different formats: handle 'def' as 'allDef' and convert to rDef if needed
    let normalizedRDef = parsed.rDef;
    let normalizedAllDef = parsed.allDef;
    
    // Check if there's a 'def' variable (MG format pag_14.js style)
    if (!normalizedRDef && !normalizedAllDef) {
      // Try to parse 'def' as allDef
      try {
        const content = await readFile(page.filePath, "utf-8");
        const defMatch = content.match(/(?:let|const|var)\s+def\s*=\s*(\{[\s\S]*?\});/);
        if (defMatch) {
          // Safe fallback: extract artifact_* keys without executing code
          const defObjectLiteral = defMatch[1];
          const artifactKeys = Array.from(
            new Set((defObjectLiteral.match(/artifact_[A-Za-z0-9_]+/g) || []))
          );

          if (artifactKeys.length > 0) {
            const artifacts: Record<string, any> = {};
            for (const key of artifactKeys) {
              artifacts[key] = {}; // minimal placeholder; structure se completará aguas arriba
            }
            normalizedAllDef = { artifacts };
            normalizedRDef = { artifacts };
            console.log(
              `[definition-processor] Found 'def' variable, synthesized artifacts from keys:`,
              { count: artifactKeys.length, keys: artifactKeys.slice(0, 10) }
            );
          } else {
            console.warn(
              `[definition-processor] 'def' found but no artifact_* keys detected, skipping normalization`
            );
          }
        }
      } catch (err) {
        console.warn(`[definition-processor] Failed to read file for 'def' check:`, err);
      }
    }

    const detectedFormat = detectDefinitionFormat(
      parsed.defBoards || {},
      normalizedRDef || {},
      normalizedAllDef
    );

    console.log(`[definition-processor] Parsed file ${page.filePath}:`, {
      hasDefBoards: !!parsed.defBoards,
      defBoardsKeys: parsed.defBoards ? Object.keys(parsed.defBoards) : [],
      hasRDef: !!normalizedRDef,
      rDefKeys: normalizedRDef ? Object.keys(normalizedRDef) : [],
      hasAllDef: !!normalizedAllDef,
      allDefKeys: normalizedAllDef ? Object.keys(normalizedAllDef) : [],
      detectedFormat,
    });

    // Store parsed content
    const content: Record<string, any> = {};
    if (parsed.defBoards) {
      content.defBoards = parsed.defBoards;
    }
    if (normalizedRDef) {
      content.rDef = normalizedRDef;
    }
    
    // Use normalizedRDef for processing (combines rDef, allDef, and def)
    const rDefForProcessing = normalizedRDef || parsed.rDef || {};

    // Extract exercises from rDef structure if available
    const exercises: Exercise[] = [];
    
    // Inferir engine preferentemente con defBoards, pero permitir inferir sin defBoards usando rDef
    let suggestedEngine: string | null = null;
    try {
      console.log(`[definition-processor] Inferring engine for page ${page.id}...`);
      suggestedEngine = await inferEngineFromStructure(
        parsed.defBoards || {},
        rDefForProcessing || {},
        chapterId,
        bookId
      );
      console.log(`[definition-processor] Inferred engine for page ${page.id}:`, suggestedEngine);
    } catch (err) {
      console.warn(`[definition-processor] Failed to infer engine for page ${page.id}:`, err);
    }
    
    // Extraer tema y subtema del contexto
    const extractedTema = extractTemaFromContext(page, chapterNumber);
    const extractedSubtema = extractSubtemaFromContext(page, chapterNumber);
    
    // Buscar ejercicios en rDef.artifactHtml.datadefault (formato estándar MG)
    if (rDefForProcessing?.artifactHtml?.datadefault) {
      // Iterate through artifacts and extract questions
      const artifacts = rDefForProcessing.artifactHtml.datadefault;
      
      for (const artifact of artifacts) {
        if (artifact.contents) {
          for (const [artifactKey, artifactContent] of Object.entries(artifact.contents)) {
            if (artifactContent && typeof artifactContent === 'object' && 'questions' in artifactContent) {
              const questions = (artifactContent as any).questions || [];
              
              // Find the defBoard associated with this artifact
              const artifactDefBoard = parsed.defBoards 
                ? findArtifactDefBoard(parsed.defBoards, rDefForProcessing, artifactKey)
                : null;
              
              // Extraer TODAS las preguntas, no solo la primera
              for (let qIndex = 0; qIndex < questions.length; qIndex++) {
                const question = questions[qIndex];
                const questionText = question?.question || "Ejercicio matemático";
                
                // Extraer solución si está disponible
                const solucion = extractSolutionFromQuestion(question);
                
                // Inferir dificultad del texto de la pregunta
                const dificultad = inferDificultadFromQuestion(questionText) || "media";
                
                // Generate unique ID without Date.now()
                const exerciseId = generateExerciseId(
                  bookId,
                  page.id,
                  artifactKey,
                  qIndex,
                  questionText
                );
                
                // Extract artifact-specific rDef (not the full rDef)
                const artifactSpecificRDef = extractArtifactSpecificRDef(
                  rDefForProcessing,
                  artifactKey,
                  "artifactHtml"
                );
                
                // Construir metadata con artifactDefinition si está disponible
                const exerciseMetadata: Exercise["metadata"] = {
                  bookId,
                  bookName,
                  chapterId,
                  chapterNumber,
                  pageId: page.id,
                  pageNumber: page.pageNumber,
                  variant: page.variant,
                  artifactKey,
                  totalQuestions: questions.length,
                  questionIndex: qIndex,
                  artifactDefBoard, // Add the associated board key
                  questionData: {
                    type: (question as any)?.type,
                    answers_values: (question as any)?.answers_values,
                    conditions: (question as any)?.conditions,
                  },
                };
                
                // CRÍTICO: Incluir artifactDefinition con rDef específico del artifact
                if (parsed.defBoards) {
                  // Use artifact-specific rDef instead of full rDef
                  exerciseMetadata.artifactDefinition = {
                    defBoards: parsed.defBoards,
                    rDef: Object.keys(artifactSpecificRDef).length > 0 
                      ? artifactSpecificRDef 
                      : rDefForProcessing, // Fallback to full rDef if extraction failed
                  };
                  
                  if (suggestedEngine) {
                    exerciseMetadata.suggestedEngine = suggestedEngine;
                  }
                  
                  console.log(`[definition-processor] ✅ Added artifactDefinition to exercise ${exerciseId}:`, {
                    exerciseId,
                    artifactKey,
                    questionIndex: qIndex,
                    artifactDefBoard,
                    hasDefBoards: !!exerciseMetadata.artifactDefinition.defBoards,
                    defBoardsKeys: exerciseMetadata.artifactDefinition.defBoards ? Object.keys(exerciseMetadata.artifactDefinition.defBoards) : [],
                    hasRDef: !!exerciseMetadata.artifactDefinition.rDef,
                    rDefKeys: exerciseMetadata.artifactDefinition.rDef ? Object.keys(exerciseMetadata.artifactDefinition.rDef) : [],
                    rDefIsSpecific: Object.keys(artifactSpecificRDef).length > 0,
                    suggestedEngine: exerciseMetadata.suggestedEngine || null,
                  });
                } else {
                  console.log(`[definition-processor] ⚠️ Exercise ${exerciseId} created WITHOUT artifactDefinition (missing defBoards)`);
                }
                
                exercises.push({
                  id: exerciseId,
                  tema: extractedTema || "Matemáticas",
                  subtema: extractedSubtema || `Capítulo ${chapterNumber}`,
                  dificultad,
                  enunciado: questionText,
                  solucion,
                  image_ref: page.filePath,
                  metadata: exerciseMetadata,
                });
              }
            }
          }
        }
      }
    }
    
    // También manejar otras estructuras posibles de rDef
    // Si rDef tiene artifacts directos (rDef.artifact_*) o rDef.artifacts.artifact_*
    // También manejar formato allDef/def (NV style)
    if (rDefForProcessing) {
      // Buscar en rDef.artifacts si existe (formato allDef convertido)
      const artifactsSource = rDefForProcessing.artifacts || rDefForProcessing;
      
      for (const [key, value] of Object.entries(artifactsSource)) {
        if (key.startsWith('artifact_') && value && typeof value === 'object') {
          // Buscar questions dentro del artifact
          const questions = (value as any).questions;
          
          // Si es un objeto con questions, extraer
          if (questions && typeof questions === 'object') {
            // Puede ser un objeto con question_1, question_2, etc. o un array
            let questionsArray: any[] = [];
            
            if (Array.isArray(questions)) {
              questionsArray = questions;
            } else if (typeof questions === 'object') {
              // Convertir objeto a array
              questionsArray = Object.values(questions);
            }
            
            if (questionsArray.length > 0) {
              // Find the defBoard associated with this artifact
              const artifactDefBoard = parsed.defBoards 
                ? findArtifactDefBoard(parsed.defBoards, rDefForProcessing, key)
                : null;
              
              // Determine format for rDef extraction
              const format = detectedFormat === "allDef" ? "allDef" : "direct";
              
              for (let qIndex = 0; qIndex < questionsArray.length; qIndex++) {
                const question = questionsArray[qIndex];
                // Manejar diferentes formatos de pregunta
                const questionText = question?.question || question?.value || "Ejercicio matemático";
                const solucion = extractSolutionFromQuestion(question);
                const dificultad = inferDificultadFromQuestion(questionText) || "media";
                
                // Generate unique ID without Date.now()
                const exerciseId = generateExerciseId(
                  bookId,
                  page.id,
                  key,
                  qIndex,
                  questionText
                );
                
                // Extract artifact-specific rDef
                const artifactSpecificRDef = extractArtifactSpecificRDef(
                  rDefForProcessing,
                  key,
                  format
                );
                
                const exerciseMetadata: Exercise["metadata"] = {
                  bookId,
                  bookName,
                  chapterId,
                  chapterNumber,
                  pageId: page.id,
                  pageNumber: page.pageNumber,
                  variant: page.variant,
                  artifactKey: key,
                  totalQuestions: questionsArray.length,
                  questionIndex: qIndex,
                  artifactDefBoard, // Add the associated board key
                  questionData: {
                    type: question.type,
                    answers_values: question.answers_values,
                    conditions: question.conditions,
                  },
                };
                
                // Incluir artifactDefinition con rDef específico del artifact
                if (parsed.defBoards) {
                  exerciseMetadata.artifactDefinition = {
                    defBoards: parsed.defBoards,
                    rDef: Object.keys(artifactSpecificRDef).length > 0 
                      ? artifactSpecificRDef 
                      : rDefForProcessing, // Fallback to full rDef if extraction failed
                  };
                  
                  if (suggestedEngine) {
                    exerciseMetadata.suggestedEngine = suggestedEngine;
                  }
                  
                  console.log(`[definition-processor] ✅ Added artifactDefinition to exercise ${exerciseId} (from artifact_*):`, {
                    exerciseId,
                    artifactKey: key,
                    questionIndex: qIndex,
                    artifactDefBoard,
                    format,
                    hasDefBoards: !!exerciseMetadata.artifactDefinition.defBoards,
                    hasRDef: !!exerciseMetadata.artifactDefinition.rDef && Object.keys(exerciseMetadata.artifactDefinition.rDef).length > 0,
                    rDefIsSpecific: Object.keys(artifactSpecificRDef).length > 0,
                    suggestedEngine: exerciseMetadata.suggestedEngine || null,
                  });
                } else {
                  console.log(`[definition-processor] ⚠️ Exercise ${exerciseId} created WITHOUT artifactDefinition (from artifact_*, missing defBoards)`);
                }
                
                exercises.push({
                  id: exerciseId,
                  tema: extractedTema || "Matemáticas",
                  subtema: extractedSubtema || `Capítulo ${chapterNumber}`,
                  dificultad,
                  enunciado: questionText,
                  solucion,
                  image_ref: page.filePath,
                  metadata: exerciseMetadata,
                });
              }
            }
          }
        }
      }
    }
    
    // Manejar casos donde no se extrajeron preguntas
    // 1) Con defBoards presentes: generar ejercicios sintéticos NV
    if (parsed.defBoards && exercises.length === 0) {
      // Intento adicional para NV: generar ejercicios a partir de artifacts con conditions
      try {
        const raw = await readFile(page.filePath, "utf-8");
        console.log(`[definition-processor] NV synthetic extraction attempt for ${page.id}`);
        // Extraer lexico si existe
        let lexico: string | undefined;
        const lexicoMatch = raw.match(/lexico\s*:\s*["'`]([\s\S]*?)["'`]/);
        if (lexicoMatch) {
          lexico = lexicoMatch[1];
        }
        // Recolectar artifacts existentes por nombre
        const artifactKeys: string[] = [];
        const artifactKeyMatches = raw.match(/artifact_[A-Za-z0-9_]+/g) || [];
        for (const k of artifactKeyMatches) {
          if (!artifactKeys.includes(k) && k !== "artifact_raiting") {
            artifactKeys.push(k);
          }
        }

        // Para cada artifact, intentar extraer conditions y engine
        for (const key of artifactKeys) {
          // Solo si hay un board asociado (para vincular defBoard)
          let artifactDefBoard = parsed.defBoards 
            ? findArtifactDefBoard(parsed.defBoards, rDefForProcessing, key)
            : null;
          // Buscar bloque del artifact
          const blockRegex = new RegExp(`${key}[^\n]*?\{[\s\S]*?\}`, 'm');
          const blockMatch = raw.match(blockRegex);
          if (!blockMatch) {
            continue;
          }
          const block = blockMatch[0];
          // Extraer conditions: [[...]] o [ [ ... ] ]
          let conditions: any[] | undefined;
          const condMatch = block.match(/conditions\s*:\s*(\[[\s\S]*?\])/);
          if (condMatch) {
            try {
              conditions = new Function(`return ${condMatch[1]}`)();
            } catch {}
          }
          // Extraer board explícito si no lo encontramos antes
          if (!artifactDefBoard) {
            const boardMatch = block.match(/board\s*:\s*["'`](.+?)["'`]/);
            if (boardMatch) {
              artifactDefBoard = boardMatch[1];
            }
          }
          // Extraer engine simbólico sin evaluar
          let engineName: string | undefined;
          const engineMatch = block.match(/engine\s*:\s*([A-Za-z_][A-Za-z0-9_]*)/);
          if (engineMatch) {
            engineName = engineMatch[1];
          }

          const questionText = (lexico && lexico.trim())
            ? lexico.trim()
            : `Resuelve el artifact ${key} considerando sus condiciones.`;

          const dificultad = inferDificultadFromQuestion(questionText) || "media";
          const exerciseId = generateExerciseId(
            bookId,
            page.id,
            key,
            0,
            questionText
          );

          const artifactSpecificRDef = extractArtifactSpecificRDef(
            rDefForProcessing,
            key,
            "allDef"
          );

          const exerciseMetadata: Exercise["metadata"] = {
            bookId,
            bookName,
            chapterId,
            chapterNumber,
            pageId: page.id,
            pageNumber: page.pageNumber,
            variant: page.variant,
            artifactKey: key,
            totalQuestions: 1,
            questionIndex: 0,
            artifactDefBoard,
            questionData: {
              conditions,
            },
          };

          if (parsed.defBoards) {
            exerciseMetadata.artifactDefinition = {
              defBoards: parsed.defBoards,
              rDef: Object.keys(artifactSpecificRDef).length > 0 
                ? artifactSpecificRDef 
                : rDefForProcessing,
            };
          }
          if (engineName) {
            exerciseMetadata.suggestedEngine = engineName;
          } else if (suggestedEngine) {
            exerciseMetadata.suggestedEngine = suggestedEngine;
          }

          console.log(`[definition-processor] ➕ NV synthetic exercise from artifact:`, {
            pageId: page.id,
            artifactKey: key,
            artifactDefBoard,
            hasConditions: !!conditions,
            engineName: exerciseMetadata.suggestedEngine || null,
          });

          exercises.push({
            id: exerciseId,
            tema: extractedTema || "Matemáticas",
            subtema: extractedSubtema || `Capítulo ${chapterNumber}`,
            dificultad,
            enunciado: questionText,
            solucion: "",
            image_ref: page.filePath,
            metadata: exerciseMetadata,
          });
        }

        if (exercises.length === 0) {
          console.log(`[definition-processor] ℹ️ File ${page.filePath} has defBoards but no exercises (visualization-only file)`);
        }
      } catch (nvErr) {
        console.log(`[definition-processor] NV synthetic extraction skipped due to read/parse error:`, nvErr);
        console.log(`[definition-processor] ℹ️ File ${page.filePath} has defBoards but no exercises (visualization-only file)`);
      }
    }

    // 2) Sin defBoards: si hay artifacts en rDef/allDef pero sin preguntas, crear ejercicios sintéticos mínimos por artifact
    if (!parsed.defBoards && exercises.length === 0 && rDefForProcessing) {
      const artifactsSource = rDefForProcessing.artifacts || rDefForProcessing;
      const artifactKeys = Object.keys(artifactsSource).filter(k => k.startsWith('artifact_') && k !== 'artifact_raiting');
      if (artifactKeys.length > 0) {
        console.log(`[definition-processor] ➕ Synthetic exercises without defBoards for ${page.id} (artifacts: ${artifactKeys.length})`);
        for (const key of artifactKeys) {
          const questionText = `Resuelve el artifact ${key}.`;
          const dificultad = inferDificultadFromQuestion(questionText) || "media";
          const exerciseId = generateExerciseId(
            bookId,
            page.id,
            key,
            0,
            questionText
          );
          const artifactSpecificRDef = extractArtifactSpecificRDef(
            rDefForProcessing,
            key,
            detectedFormat === 'allDef' ? 'allDef' : 'direct'
          );
          const exerciseMetadata: Exercise["metadata"] = {
            bookId,
            bookName,
            chapterId,
            chapterNumber,
            pageId: page.id,
            pageNumber: page.pageNumber,
            variant: page.variant,
            artifactKey: key,
            totalQuestions: 1,
            questionIndex: 0,
          };
          if (suggestedEngine) {
            exerciseMetadata.suggestedEngine = suggestedEngine;
          }
          // No defBoards, pero adjuntar rDef específico si existe
          if (Object.keys(artifactSpecificRDef).length > 0) {
            exerciseMetadata.artifactDefinition = {
              defBoards: undefined as any,
              rDef: artifactSpecificRDef,
            } as any;
          }
          exercises.push({
            id: exerciseId,
            tema: extractedTema || "Matemáticas",
            subtema: extractedSubtema || `Capítulo ${chapterNumber}`,
            dificultad,
            enunciado: questionText,
            solucion: "",
            image_ref: page.filePath,
            metadata: exerciseMetadata,
          });
        }
      }
    }

    console.log(`[definition-processor] ✅ Completed processing ${page.filePath}:`, {
      totalExercises: exercises.length,
      exercisesWithArtifact: exercises.filter(e => e.metadata?.artifactDefinition).length,
      exercisesWithoutArtifact: exercises.filter(e => !e.metadata?.artifactDefinition).length,
    });

    return {
      content,
      exercises,
    };
  } catch (error) {
    console.error(`[definition-processor] ❌ Error processing ${page.filePath}:`, error);
    return {
      content: {},
      exercises: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Process multiple definition files in batch
 * Procesa en batches para evitar sobrecarga del sistema
 */
export async function processDefinitionFiles(
  pages: Page[],
  bookId: string,
  bookName: string,
  chapters: Array<{ id: string; chapterNumber: number }>,
  options?: {
    batchSize?: number;
    batchDelay?: number;
  }
): Promise<Array<{
  page: Page;
  content: Record<string, any>;
  exercises: Exercise[];
  error?: string;
}>> {
  const batchSize = options?.batchSize ?? 10;
  const batchDelay = options?.batchDelay ?? 100;
  const results: Array<{
    page: Page;
    content: Record<string, any>;
    exercises: Exercise[];
    error?: string;
  }> = [];
  
  // Procesar en batches
  for (let i = 0; i < pages.length; i += batchSize) {
    const batch = pages.slice(i, i + batchSize);
    
    const batchResults = await Promise.all(
      batch.map(async (page) => {
        const chapter = chapters.find((c) => c.id === page.chapterId);
        if (!chapter) {
          return {
            page,
            content: {},
            exercises: [],
            error: `Chapter ${page.chapterId} not found`,
          };
        }

        try {
          const result = await processDefinitionFile(
            page,
            bookId,
            bookName,
            chapter.id,
            chapter.chapterNumber
          );

          console.log(`[definition-processor] Batch result for page ${page.id}:`, {
            exercisesCount: result.exercises.length,
            exercisesWithArtifact: result.exercises.filter(e => e.metadata?.artifactDefinition).length,
            hasError: !!result.error,
          });

          return {
            page,
            ...result,
          };
        } catch (error) {
          console.error(`[definition-processor] ❌ Batch error for page ${page.id}:`, error);
          return {
            page,
            content: {},
            exercises: [],
            error: error instanceof Error ? error.message : String(error),
          };
        }
      })
    );
    
    results.push(...batchResults);
    
    const batchStats = {
      batchNumber: Math.floor(i / batchSize) + 1,
      totalBatches: Math.ceil(pages.length / batchSize),
      exercisesInBatch: batchResults.reduce((sum, r) => sum + r.exercises.length, 0),
      exercisesWithArtifact: batchResults.reduce((sum, r) => sum + r.exercises.filter(e => e.metadata?.artifactDefinition).length, 0),
    };
    
    console.log(`[definition-processor] Batch ${batchStats.batchNumber}/${batchStats.totalBatches} completed:`, batchStats);
    
    // Pausa entre batches para no sobrecargar el sistema
    if (i + batchSize < pages.length) {
      await new Promise(resolve => setTimeout(resolve, batchDelay));
    }
  }

  const totalStats = {
    totalPages: pages.length,
    totalExercises: results.reduce((sum, r) => sum + r.exercises.length, 0),
    totalExercisesWithArtifact: results.reduce((sum, r) => sum + r.exercises.filter(e => e.metadata?.artifactDefinition).length, 0),
    totalErrors: results.filter(r => r.error).length,
  };
  
  console.log(`[definition-processor] 🎉 All batches completed:`, totalStats);

  return results;
}

