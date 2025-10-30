import { discoverEngines } from "./engine-discovery";
import { inferEngineTags } from "@/lib/rag/rag-helpers";

/**
 * Analiza la estructura de defBoards y rDef para inferir tipos de visualización
 */
function analyzeStructure(
  defBoards: Record<string, any>,
  rDef: Record<string, any>
): { types: string[] } {
  const types: string[] = [];
  const defBoardsStr = JSON.stringify(defBoards).toLowerCase();
  const rDefStr = JSON.stringify(rDef).toLowerCase();
  
  // Detectar tipos basado en contenido de defBoards
  if (defBoardsStr.match(/geometry|geometría|geometria|triangle|triángulo|rect|rectángulo|shape|figure|figura/i)) {
    types.push("geometry");
  }
  
  if (defBoardsStr.match(/curve|curva|function|función|funcion|graph|gráfico|grafico|plot/i)) {
    types.push("graph");
  }
  
  if (defBoardsStr.match(/point|punto|points|puntos/i) && defBoardsStr.match(/line|linea|línea/i)) {
    types.push("geometry");
  }
  
  // Detectar tipos basado en contenido de rDef
  if (rDefStr.match(/matrix|matriz|system|sistema|table|tabla/i)) {
    types.push("matrix");
  }
  
  if (rDefStr.match(/3d|three|dimensional|tridimensional/i)) {
    types.push("3d");
  }

  // Detect diagram/table cues often present in NV engines
  if (rDefStr.match(/diagram|diagrama|escala|scale|tabla|table/i)) {
    if (!types.includes("matrix")) types.push("matrix");
  }

  // If artifacts are present, prefer generic visualization tags
  if (rDefStr.match(/artifact_/i)) {
    if (!types.includes("graph")) types.push("graph");
  }
  
  // Si no hay tipos detectados, usar genérico
  if (types.length === 0) {
    types.push("generic");
  }
  
  return { types };
}

/**
 * Infiere el engine más apropiado basado en defBoards y rDef
 * 
 * @param defBoards Estructura de boards gráficos
 * @param rDef Definición reactiva con datos
 * @param chapterId ID del capítulo para buscar engines disponibles
 * @param bookId ID del libro
 * @returns ID del engine más apropiado o null si no hay match
 */
export async function inferEngineFromStructure(
  defBoards: Record<string, any>,
  rDef: Record<string, any>,
  chapterId: string,
  bookId: string
): Promise<string | null> {
  // 1. Obtener engines disponibles para este capítulo
  const availableEngines = await discoverEngines(bookId, chapterId);
  
  console.log(`[engine-inference] Found ${availableEngines.length} engines for book ${bookId}, chapter ${chapterId}`);
  
  if (availableEngines.length === 0) {
    console.log(`[engine-inference] No engines available, returning null`);
    return null;
  }
  
  // 2. Analizar estructura para inferir tipos
  const structureAnalysis = analyzeStructure(defBoards, rDef);
  console.log(`[engine-inference] Structure analysis:`, {
    inferredTypes: structureAnalysis.types,
    defBoardsKeys: Object.keys(defBoards),
    rDefKeys: Object.keys(rDef),
  });
  
  // 3. Buscar engine que coincida con los tags inferidos
  for (const engine of availableEngines) {
    const engineTags = inferEngineTags(engine.name, engine.description);
    
    console.log(`[engine-inference] Checking engine ${engine.id}:`, {
      name: engine.name,
      tags: engineTags,
      matches: engineTags.some(tag => structureAnalysis.types.includes(tag)),
    });
    
    // Verificar si algún tag del engine coincide con los tipos inferidos
    if (engineTags.some(tag => structureAnalysis.types.includes(tag))) {
      console.log(`[engine-inference] ✅ Matched engine ${engine.id} for types ${structureAnalysis.types.join(", ")}`);
      return engine.id;
    }
  }
  
  // 4. Si no hay match, buscar engine genérico
  const genericEngine = availableEngines.find(e => 
    e.id.toLowerCase().includes("generic") ||
    e.name.toLowerCase().includes("generic")
  );
  
  if (genericEngine) {
    console.log(`[engine-inference] Using generic engine: ${genericEngine.id}`);
    return genericEngine.id;
  }
  
  // 5. Último recurso: retornar el primer engine disponible
  const fallbackEngine = availableEngines[0]?.id || null;
  console.log(`[engine-inference] Using fallback engine: ${fallbackEngine}`);
  return fallbackEngine;
}

