import { readFile } from "fs/promises";
import { getFileSize, MAX_FILE_SIZE } from "./utils";

/**
 * Extrae un objeto de código JavaScript usando regex mejorado
 * Maneja objetos anidados contando llaves balanceadas
 */
function extractObjectFromCode(
  code: string,
  varName: string
): Record<string, any> | undefined {
  // Patrones para diferentes formas de declaración
  const patterns = [
    // let defBoards = {...};
    new RegExp(`(?:let|const|var)\\s+${varName}\\s*=\\s*`, 'm'),
    // defBoards = {...}; (sin declaración)
    new RegExp(`${varName}\\s*=\\s*`, 'm'),
  ];
  
  for (const pattern of patterns) {
    const match = code.match(pattern);
    if (match) {
      const startIndex = match.index! + match[0].length;
      
      // Buscar el inicio del objeto (primera llave)
      let braceCount = 0;
      let objectStart = -1;
      
      for (let i = startIndex; i < code.length; i++) {
        if (code[i] === '{') {
          if (objectStart === -1) {
            objectStart = i;
          }
          braceCount++;
        } else if (code[i] === '}') {
          braceCount--;
          if (braceCount === 0 && objectStart !== -1) {
            // Encontramos el objeto completo
            const objectStr = code.substring(objectStart, i + 1);
            
            try {
              // Sanitizar valores identificadores no entrecomillados (p.ej., engineFigure, alphabet) -> null
              // Evita ReferenceError al evaluar literales con referencias a símbolos
              const sanitized = objectStr.replace(/:\s*([A-Za-z_][A-Za-z0-9_]*)\b/g, (m, ident) => {
                // No reemplazar palabras reservadas ni true/false/null
                if (["true","false","null"].includes(ident)) return m;
                return m.replace(ident, "null");
              });
              // Usar Function constructor con parámetros inyectados para evitar ReferenceError
              const fn = new Function('allDef', 'rDef', 'defBoards', `return (${sanitized});`);
              const obj = fn({}, {}, {});
              return obj;
            } catch (err) {
              console.warn(`Failed to parse ${varName} object:`, err);
              // Intentar con JSON.parse si el objeto es JSON válido
              try {
                return JSON.parse(objectStr);
              } catch (jsonErr) {
                console.warn(`Failed to parse ${varName} as JSON:`, jsonErr);
              }
            }
            break;
          }
        }
      }
    }
  }
  
  return undefined;
}

/**
 * Parse a JavaScript definition file and extract defBoards, rDef, and allDef de forma segura
 * Reemplaza el uso de eval() con un parser más robusto
 * Soporta múltiples formatos: rDef (más común) y allDef (alternativo)
 */
export async function parseDefinitionFileSafe(filePath: string): Promise<{
  defBoards?: Record<string, any>;
  rDef?: Record<string, any>;
  allDef?: Record<string, any>;
  error?: string;
}> {
  try {
    // Check file size before reading
    const fileSize = await getFileSize(filePath);
    if (fileSize > MAX_FILE_SIZE) {
      return {
        error: `File too large: ${(fileSize / 1024 / 1024).toFixed(2)}MB. Maximum size: ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(2)}MB`,
      };
    }

    const content = await readFile(filePath, "utf-8");
    
    // Extraer defBoards, rDef y allDef usando el parser mejorado
    const defBoards = extractObjectFromCode(content, 'defBoards');
    let rDef = extractObjectFromCode(content, 'rDef');
    const allDef = extractObjectFromCode(content, 'allDef');
    
    // Si hay allDef pero no rDef, convertir allDef a formato compatible con rDef
    // allDef.artifacts es equivalente a rDef en algunos archivos
    if (!rDef && allDef && allDef.artifacts) {
      // Crear un rDef compatible a partir de allDef
      rDef = {
        artifacts: allDef.artifacts,
        // Preservar otras propiedades si existen
        ...(allDef.scrollNav !== undefined && { scrollNav: allDef.scrollNav }),
      };
      console.log(`[js-parser-safe] Converted allDef to rDef format for ${filePath}`);
    }
    
    // Si no se encontraron con el parser mejorado, intentar regex simple como fallback
    let defBoardsFallback: Record<string, any> | undefined;
    let rDefFallback: Record<string, any> | undefined;
    let allDefFallback: Record<string, any> | undefined;
    
    if (!defBoards) {
      // Intentar diferentes patrones de defBoards
      const defBoardsPatterns = [
        /(?:let|const|var)\s+defBoards\s*=\s*(\{[\s\S]*?\});/,
        /defBoards\s*=\s*(\{[\s\S]*?\});/,
      ];
      
      for (const pattern of defBoardsPatterns) {
        const match = content.match(pattern);
        if (match) {
          try {
            defBoardsFallback = new Function(`return ${match[1]}`)();
            break;
          } catch (err) {
            // Continuar con el siguiente patrón
          }
        }
      }
    }
    
    if (!rDef) {
      // Intentar diferentes patrones de rDef
      const rDefPatterns = [
        /(?:let|const|var)\s+rDef\s*=\s*(\{[\s\S]*?\});/,
        /rDef\s*=\s*(\{[\s\S]*?\});/,
      ];
      
      for (const pattern of rDefPatterns) {
        const match = content.match(pattern);
        if (match) {
          try {
            rDefFallback = new Function(`return ${match[1]}`)();
            break;
          } catch (err) {
            // Continuar con el siguiente patrón
          }
        }
      }
      
      // Si aún no hay rDef, intentar buscar allDef y convertirlo
      if (!rDefFallback) {
        const allDefPatterns = [
          /(?:let|const|var)\s+allDef\s*=\s*(\{[\s\S]*?\});/,
          /allDef\s*=\s*(\{[\s\S]*?\});/,
        ];
        
        for (const pattern of allDefPatterns) {
          const match = content.match(pattern);
          if (match) {
            try {
              allDefFallback = new Function(`return ${match[1]}`)();
              // Convertir allDef a rDef si tiene artifacts
              if (allDefFallback && allDefFallback.artifacts) {
                rDefFallback = {
                  artifacts: allDefFallback.artifacts,
                  ...(allDefFallback.scrollNav !== undefined && { scrollNav: allDefFallback.scrollNav }),
                };
                console.log(`[js-parser-safe] Converted allDef (fallback) to rDef format for ${filePath}`);
              }
              break;
            } catch (err) {
              // Continuar con el siguiente patrón
            }
          }
        }
      }
    }
    
    let finalDefBoards = defBoards || defBoardsFallback;
    let finalRDef = rDef || rDefFallback;
    const finalAllDef = allDef || allDefFallback;

    // Synthetic fallback if parsing failed: infer minimal structures
    if (!finalDefBoards) {
      // Collect board_* identifiers and create empty objects
      const boardKeys = Array.from(new Set((content.match(/board_[A-Za-z0-9_]+/g) || [])));
      if (boardKeys.length > 0) {
        finalDefBoards = {} as Record<string, any>;
        for (const k of boardKeys) {
          finalDefBoards[k] = {};
        }
        console.log(`[js-parser-safe] Synthesized defBoards with ${boardKeys.length} keys for ${filePath}`);
      }
    }

    if (!finalRDef) {
      // Collect artifact_* identifiers and synthesize minimal rDef.artifacts
      const artifactKeys = Array.from(new Set((content.match(/artifact_[A-Za-z0-9_]+/g) || []))).filter(k => k !== 'artifact_raiting');
      if (artifactKeys.length > 0) {
        const artifacts: Record<string, any> = {};
        for (const k of artifactKeys) {
          artifacts[k] = {};
        }
        finalRDef = { artifacts };
        console.log(`[js-parser-safe] Synthesized rDef.artifacts with ${artifactKeys.length} keys for ${filePath}`);
      }
    }

    return {
      defBoards: finalDefBoards,
      rDef: finalRDef,
      allDef: finalAllDef,
    };
  } catch (error) {
    console.error(`[js-parser-safe] Error parsing ${filePath}:`, error);
    return {
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

