"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Code, Eye, X, Play, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Exercise } from "@/types/exercise";
import type { Engine } from "@/lib/books/types";

interface ArtifactDefinition {
  defBoards?: Record<string, any>;
  rDef?: Record<string, any>;
  [key: string]: any;
}

interface ExerciseCanvasProps {
  exercise: Exercise;
  artifactDefinition: ArtifactDefinition;
  suggestedEngine?: string;
  engines?: Engine[];
  bookId?: string;
  chapterId?: string;
  viewConfig?: any; // ViewConfiguration from view-config-extractor
  onClose: () => void;
  onUpdate?: (definition: ArtifactDefinition) => void;
}

type ViewMode = "preview" | "code" | "original" | "reconstruido";

export function ExerciseCanvas({
  exercise,
  artifactDefinition,
  suggestedEngine,
  engines: enginesFromProps,
  bookId,
  chapterId,
  viewConfig,
  onClose,
  onUpdate,
}: ExerciseCanvasProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [definitionJson, setDefinitionJson] = useState<string>("");
  const [definition, setDefinition] = useState<ArtifactDefinition>(artifactDefinition);
  const [selectedEngine, setSelectedEngine] = useState<string>(suggestedEngine || "");
  const [manualEnginePath, setManualEnginePath] = useState<string>("");
  const [useManualPath, setUseManualPath] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableEngines, setAvailableEngines] = useState<Engine[]>([]);
  const [loadingEngines, setLoadingEngines] = useState(false);
  const [reconstructedHTML, setReconstructedHTML] = useState<string>("");
  const previewIframeRef = useRef<HTMLIFrameElement>(null);
  
  // Stabilize enginesFromProps to prevent infinite loops
  const enginesRef = useRef<Engine[]>([]);
  const enginesStable = useMemo(() => {
    const current = enginesFromProps || [];
    const prev = enginesRef.current;
    
    // Compare by content (IDs and files), not by reference
    const currentKey = current.map(e => `${e.id}:${e.file || ''}:${e.bookId || ''}`).sort().join('|');
    const prevKey = prev.map(e => `${e.id}:${e.file || ''}:${e.bookId || ''}`).sort().join('|');
    
    if (currentKey !== prevKey || current.length !== prev.length) {
      enginesRef.current = current;
      return current;
    }
    return prev;
  }, [enginesFromProps?.map(e => `${e.id}:${e.file || ''}:${e.bookId || ''}`).join('|') || '']);

  // Debug: Log props on mount
  useEffect(() => {
    console.log("🟡 [ExerciseCanvas] ===== COMPONENT MOUNTED =====");
    console.log("🟡 [ExerciseCanvas] Props received:", {
      exerciseId: exercise?.id,
      exerciseTema: exercise?.tema,
      artifactDefinition: {
        hasDefBoards: !!artifactDefinition?.defBoards,
        defBoardsKeys: artifactDefinition?.defBoards ? Object.keys(artifactDefinition.defBoards) : [],
        defBoardsCount: artifactDefinition?.defBoards ? Object.keys(artifactDefinition.defBoards).length : 0,
        hasRDef: !!artifactDefinition?.rDef,
        rDefKeys: artifactDefinition?.rDef ? Object.keys(artifactDefinition.rDef) : [],
        rDefCount: artifactDefinition?.rDef ? Object.keys(artifactDefinition.rDef).length : 0,
        hasArtifacts: !!artifactDefinition?.artifacts,
        artifactsKeys: artifactDefinition?.artifacts ? Object.keys(artifactDefinition.artifacts) : [],
        artifactsCount: artifactDefinition?.artifacts ? Object.keys(artifactDefinition.artifacts).length : 0,
      },
      suggestedEngine,
      bookId,
      chapterId,
    });
    console.log("🟡 [ExerciseCanvas] Full artifactDefinition:", JSON.stringify(artifactDefinition, null, 2));
    console.log("🟡 [ExerciseCanvas] ===== END MOUNT LOG =====");
  }, []);

  // Initialize definition JSON and sync with definition prop changes
  useEffect(() => {
    console.log("[ExerciseCanvas] Syncing definition JSON from definition prop:", {
      hasDefinition: !!definition,
      defBoardsKeys: definition?.defBoards ? Object.keys(definition.defBoards) : [],
      rDefKeys: definition?.rDef ? Object.keys(definition.rDef) : [],
    });
    try {
      const json = JSON.stringify(definition, null, 2);
      setDefinitionJson(json);
      console.log("[ExerciseCanvas] Definition JSON synced, length:", json.length);
    } catch (err) {
      console.error("[ExerciseCanvas] Error serializing definition:", err);
    }
  }, [definition]);

  // Load available engines - usar engines de props si están disponibles
  useEffect(() => {
    const loadEngines = async () => {
      console.log("[ExerciseCanvas] Loading engines with params:", { 
        enginesFromProps: enginesStable?.length, 
        bookId, 
        chapterId, 
        suggestedEngine,
        selectedEngine
      });
      
      // Si vienen engines desde props (del tool), usarlos directamente
      if (enginesStable && enginesStable.length > 0) {
        console.log("[ExerciseCanvas] Using engines from tool output:", enginesStable.map(e => ({ 
          id: e.id, 
          name: e.name, 
          file: e.file,
          bookId: e.bookId,
          chapterId: e.chapterId,
        })));
        
        // Solo actualizar si realmente cambió
        setAvailableEngines(prev => {
          const prevKey = prev.map(e => `${e.id}:${e.file || ''}`).sort().join('|');
          const newKey = enginesStable.map(e => `${e.id}:${e.file || ''}`).sort().join('|');
          if (prevKey === newKey) return prev;
          return enginesStable;
        });
        
        // Auto-select suggested engine, inferred engine, or first available (solo si no hay seleccionado)
        if (!selectedEngine && enginesStable.length > 0) {
          let engineToSelect: string | null = null;
          let selectionReason = '';
          
          if (suggestedEngine) {
            // Priority 1: Use suggestedEngine from tool
            const found = enginesStable.find((e) => e.id === suggestedEngine);
            engineToSelect = found ? found.id : enginesStable[0].id;
            selectionReason = found ? 'suggestedEngine' : 'suggestedEngine (not found, using first)';
            console.log("[ExerciseCanvas] Auto-selecting engine:", engineToSelect, { suggestedEngine, found: !!found, reason: selectionReason });
          } else if (artifactDefinition && (artifactDefinition.defBoards || artifactDefinition.rDef) && bookId && chapterId) {
            // Priority 2: Infer from definition structure
            try {
              let normalizedChapterId = chapterId;
              if (typeof chapterId === 'string' && chapterId.includes('_cap_')) {
                const match = chapterId.match(/cap_(\d+)/);
                normalizedChapterId = match ? match[1] : chapterId.replace(/.*cap_/, '');
              }
              
              console.log("[ExerciseCanvas] No suggestedEngine, attempting inference from definition structure...");
              let inferredEngine: string | null = null;
              try {
                const response = await fetch('/api/engines/infer', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    defBoards: artifactDefinition.defBoards || {},
                    rDef: artifactDefinition.rDef || {},
                    chapterId: normalizedChapterId,
                    bookId,
                  }),
                });
                if (response.ok) {
                  const data = await response.json();
                  inferredEngine = data.data?.engineId || null;
                }
              } catch (apiError) {
                console.warn("[ExerciseCanvas] API inference error:", apiError);
              }
              
              if (inferredEngine) {
                const found = enginesStable.find((e) => e.id === inferredEngine);
                if (found) {
                  engineToSelect = found.id;
                  selectionReason = 'inferred from structure';
                  console.log("[ExerciseCanvas] Engine inferred from structure:", engineToSelect);
                } else {
                  console.log("[ExerciseCanvas] Inferred engine not in available engines, using first");
                  engineToSelect = enginesStable[0].id;
                  selectionReason = 'inferred (not available, using first)';
                }
              } else {
                console.log("[ExerciseCanvas] Inference returned null, using first engine");
                engineToSelect = enginesStable[0].id;
                selectionReason = 'inference failed, using first';
              }
            } catch (inferError) {
              console.warn("[ExerciseCanvas] Error during engine inference:", inferError);
              engineToSelect = enginesStable[0].id;
              selectionReason = 'inference error, using first';
            }
          } else {
            // Priority 3: Use first available (fallback)
            engineToSelect = enginesStable[0].id;
            selectionReason = 'first available (no suggestedEngine, no definition for inference)';
            console.log("[ExerciseCanvas] No suggestedEngine and no definition for inference, selecting first:", engineToSelect);
          }
          
          if (engineToSelect) {
            setSelectedEngine(engineToSelect);
            console.log("[ExerciseCanvas] Engine selected:", { engine: engineToSelect, reason: selectionReason });
          }
        }
        setLoadingEngines(false);
        return; // No hacer fetch, usar engines del tool
      }
      
      // Fallback: hacer fetch solo si no hay engines desde props
      setLoadingEngines(true);
      try {
        if (bookId && chapterId) {
          // Normalizar chapterId si viene con formato "MG_cap_0"
          let normalizedChapterId = chapterId;
          if (typeof chapterId === 'string' && chapterId.includes('_cap_')) {
            const match = chapterId.match(/cap_(\d+)/);
            normalizedChapterId = match ? match[1] : chapterId.replace(/.*cap_/, '');
          }
          
          const params = new URLSearchParams();
          params.set("bookId", bookId);
          params.set("chapterId", normalizedChapterId);
          const url = `/api/engines/discover?${params.toString()}`;
          
          console.log("[ExerciseCanvas] Fetching engines from API (fallback):", url);
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch engines: ${response.statusText}`);
          }

          const data = await response.json();
          console.log("[ExerciseCanvas] Engines response:", data);
          
          if (!data.success || !data.data) {
            throw new Error("Invalid response format");
          }

          const engines = data.data as Engine[];
          console.log("[ExerciseCanvas] Available engines from API:", engines.map(e => ({ 
            id: e.id, 
            name: e.name, 
            bookId: e.bookId, 
            chapterId: e.chapterId,
            file: e.file 
          })));
          setAvailableEngines(engines);

          // Auto-select suggested engine, inferred engine, or first available
          if (engines.length > 0) {
            if (!selectedEngine) {
              let engineToSelect: string | null = null;
              let selectionReason = '';
              
              if (suggestedEngine) {
                // Priority 1: Use suggestedEngine
                const found = engines.find((e) => e.id === suggestedEngine);
                engineToSelect = found ? found.id : engines[0].id;
                selectionReason = found ? 'suggestedEngine' : 'suggestedEngine (not found, using first)';
                console.log("[ExerciseCanvas] Auto-selecting engine:", engineToSelect, { suggestedEngine, found: !!found, reason: selectionReason });
              } else if (artifactDefinition && (artifactDefinition.defBoards || artifactDefinition.rDef) && bookId && chapterId) {
                // Priority 2: Infer from definition structure
                try {
                  let normalizedChapterId = chapterId;
                  if (typeof chapterId === 'string' && chapterId.includes('_cap_')) {
                    const match = chapterId.match(/cap_(\d+)/);
                    normalizedChapterId = match ? match[1] : chapterId.replace(/.*cap_/, '');
                  }
                  
                  console.log("[ExerciseCanvas] No suggestedEngine, attempting inference from definition structure...");
                  let inferredEngine: string | null = null;
                  try {
                    const response = await fetch('/api/engines/infer', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        defBoards: definition.defBoards || {},
                        rDef: definition.rDef || {},
                        chapterId: normalizedChapterId,
                        bookId,
                      }),
                    });
                    if (response.ok) {
                      const data = await response.json();
                      inferredEngine = data.data?.engineId || null;
                    }
                  } catch (apiError) {
                    console.warn("[ExerciseCanvas] API inference error:", apiError);
                  }
                  
                  if (inferredEngine) {
                    const found = engines.find((e) => e.id === inferredEngine);
                    if (found) {
                      engineToSelect = found.id;
                      selectionReason = 'inferred from structure';
                      console.log("[ExerciseCanvas] Engine inferred from structure:", engineToSelect);
                    } else {
                      console.log("[ExerciseCanvas] Inferred engine not in available engines, using first");
                      engineToSelect = engines[0].id;
                      selectionReason = 'inferred (not available, using first)';
                    }
                  } else {
                    console.log("[ExerciseCanvas] Inference returned null, using first engine");
                    engineToSelect = engines[0].id;
                    selectionReason = 'inference failed, using first';
                  }
                } catch (inferError) {
                  console.warn("[ExerciseCanvas] Error during engine inference:", inferError);
                  engineToSelect = engines[0].id;
                  selectionReason = 'inference error, using first';
                }
              } else {
                // Priority 3: Use first available (fallback)
                engineToSelect = engines[0].id;
                selectionReason = 'first available (no suggestedEngine, no definition for inference)';
                console.log("[ExerciseCanvas] No suggestedEngine and no definition for inference, selecting first:", engineToSelect);
              }
              
              if (engineToSelect) {
                setSelectedEngine(engineToSelect);
                console.log("[ExerciseCanvas] Engine selected:", { engine: engineToSelect, reason: selectionReason });
              }
            } else {
              console.log("[ExerciseCanvas] Engine already selected:", selectedEngine);
              // Check if selected engine is still in available engines
              const stillAvailable = engines.find((e) => e.id === selectedEngine);
              if (!stillAvailable) {
                console.log("[ExerciseCanvas] Selected engine no longer available, selecting first:", engines[0].id);
                setSelectedEngine(engines[0].id);
              }
            }
          } else {
            console.warn("[ExerciseCanvas] No engines available to select");
          }
        } else {
          console.warn("[ExerciseCanvas] No bookId or chapterId provided, cannot fetch engines");
        }
      } catch (err) {
        console.error("[ExerciseCanvas] Error loading engines:", err);
        setError(`Error al cargar engines: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoadingEngines(false);
      }
    };

    loadEngines();
  }, [enginesStable?.length, bookId, chapterId, suggestedEngine, selectedEngine]);

  // Parse JSON to validate
  const parseDefinition = (): ArtifactDefinition | null => {
    try {
      const parsed = JSON.parse(definitionJson);
      setError(null);
      return parsed;
    } catch (err) {
      setError(`JSON inválido: ${err instanceof Error ? err.message : String(err)}`);
      return null;
    }
  };
  
  // Memoize processed definition to prevent unnecessary re-renders
  const processedDefinition = useMemo(() => {
    try {
      return JSON.parse(definitionJson);
    } catch {
      return null;
    }
  }, [definitionJson]);

  // Get HTML template for specific engine
  const getTemplateForEngine = (engineId: string, bookId?: string): string => {
    // Template para engineInterval (MG book, cap_0)
    if (engineId === 'engineInterval' || engineId.includes('Interval')) {
      return `
<template id="template-interval">
  <div class="paddiv artifacts d-flex flex-column">
    <div class="containerOne d-flex flex-row justify-content-center">
      <div class="divEngInt1 colorInput order-1 inpEngInt-1 inpEngInt">
        <input type="text" class="inpEngInt1 w-100 h-100 border-0 text-center" placeholder="Intervalo" />
      </div>
      <div id="board" class="jxgbox BoardEngInt order-2"></div>
      <div class="divEngInt2 colorInput inpEngInt-1 order-3 inpEngInt">
        <input type="text" class="inpEngInt2 w-100 h-100 border-0 text-center" placeholder="Representación" />
      </div>
    </div>
    <div class="containerTow d-flex flex-row"></div>
    <div class="w-100 d-flex border-board-dark" style="min-width: 200px;" id="contentButtons">
      <div class="ml-auto" id="resetVal" style="display:flex;">
        <div class="allButtons mr-2">
          <button id="btn-pointA" class="pointOpen buttonAux button-marg buttonKey buttonTool" data-tool="pointA" title="Punto abierto">P. Abierto</button>
          <button id="btn-pointC" class="pointClose buttonAux button-marg buttonKey buttonTool" data-tool="pointC" title="Punto cerrado">P. Cerrado</button>
          <button id="btn-conect" class="conect buttonAux button-marg buttonKey buttonTool" data-tool="conection" title="Conectar">Conectar</button>
        </div>
        <button id="btn-reset" class="buttonSecundary button-marg reset buttons-Target ml-auto p-2 mr-2 buttonKey" title="Reiniciar">Reiniciar</button>
        <button id="btn-validation" class="buttonPrimary button-marg check buttons-Target ml-auto p-2 mr-2 buttonKey" title="Validar">Validar</button>
      </div>
    </div>
  </div>
</template>`;
    }
    
    // Template genérico para otros engines
    return `
<template id="template-generic">
  <div class="artifact-container">
    <div id="board" class="jxgbox"></div>
    <div class="controls">
      <button id="btn-reset" class="reset buttonSecundary">Reiniciar</button>
      <button id="btn-validation" class="check buttonPrimary">Validar</button>
    </div>
  </div>
</template>`;
  };

  // Load engine code
  const loadEngine = async (engineId: string): Promise<string> => {
    console.log("[ExerciseCanvas] loadEngine called:", { engineId, useManualPath, manualEnginePath, availableEnginesCount: availableEngines.length });
    
    if (useManualPath && manualEnginePath) {
      const url = `/api/engines/${manualEnginePath}`;
      console.log("[ExerciseCanvas] Loading engine from manual path:", url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al cargar engine desde ruta manual: ${response.statusText}`);
      }
      const code = await response.text();
      console.log("[ExerciseCanvas] Engine code loaded from manual path, length:", code.length);
      return code;
    }

    const engine = availableEngines.find((e) => e.id === engineId);
    console.log("[ExerciseCanvas] Engine lookup:", { engineId, found: !!engine, engineFile: engine?.file, engineBookId: engine?.bookId });
    
    if (!engine) {
      throw new Error(`Engine ${engineId} no encontrado en availableEngines (${availableEngines.length} disponibles)`);
    }

    // Build the correct URL: /api/engines/[bookId]/book/[file]
    // engine.file is in format: "class/engines/cap_0/engineInterval.js"
    // We need: /api/engines/MG/book/class/engines/cap_0/engineInterval.js
    const engineBookId = engine.bookId || bookId || 'MG'; // Fallback to bookId prop or MG
    const url = `/api/engines/${engineBookId}/book/${engine.file}`;
    console.log("[ExerciseCanvas] Loading engine from:", url, { engineBookId, engineFile: engine.file });
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      console.error("[ExerciseCanvas] Engine load failed:", { status: response.status, statusText: response.statusText, errorText });
      throw new Error(`Error al cargar engine: ${response.status} ${response.statusText}`);
    }
    
    const code = await response.text();
    console.log("[ExerciseCanvas] Engine code loaded, length:", code.length);
    return code;
  };
  
  // Load generic engine (engineOwner) that contains generator function
  const loadGenericEngine = async (): Promise<string | null> => {
    const engineBookId = bookId || 'MG';
    const genericEnginePath = `class/engines/genericEngines/engineOwner.js`;
    const url = `/api/engines/${engineBookId}/book/${genericEnginePath}`;
    
    console.log("[ExerciseCanvas] Loading generic engine:", url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn("[ExerciseCanvas] Generic engine not found or failed to load:", response.status);
        return null;
      }
      const code = await response.text();
      console.log("[ExerciseCanvas] Generic engine loaded, length:", code.length);
      return code;
    } catch (err) {
      console.warn("[ExerciseCanvas] Error loading generic engine:", err);
      return null;
    }
  };

  // Generate HTML using exact view configuration
  const generateHTMLFromViewConfig = (def: ArtifactDefinition, vc: any, loadedEngineCodes: Map<string, string>): string => {
    const defBoardsStr = JSON.stringify(def.defBoards || {});
    const rDefStr = JSON.stringify(def.rDef || {});
    
    // Build CSS links from viewConfig.cssFiles (in order)
    const cssLinks = vc.cssFiles
      .sort((a: any, b: any) => a.order - b.order)
      .map((cf: any) => {
        const cssPath = cf.path.startsWith('/') ? cf.path : `/api/engines/${bookId || 'MG'}/book/${cf.path}`;
        return `  <link rel="stylesheet" href="${cssPath}">`;
      })
      .join('\n');
    
    // Get containers from viewConfig - prioritize container-all-artifact if it exists
    let primaryContainer = vc.htmlStructure?.containers?.[0] || 'containerBasePage';
    
    // If container-all-artifact exists in containers, use it (it should be first after prioritization)
    if (vc.htmlStructure?.containers?.includes('container-all-artifact')) {
      primaryContainer = 'container-all-artifact';
    }
    
    // Ensure container-all-artifact is created with ID, not class
    const containerTag = primaryContainer === 'container-all-artifact' || primaryContainer.startsWith('#')
      ? `<div id="${primaryContainer.replace('#', '')}"></div>`
      : `<div class="${primaryContainer}"></div>`;
    
    // Build templates HTML from viewConfig.templates
    const templatesHTML = vc.templates
      .map((t: any) => t.content)
      .join('\n  ');
    
    // Build scripts in correct order from viewConfig.engines
    const scripts: string[] = [];
    
    // Sort engines by order and type (abstract -> generic -> specific -> validation)
    const sortedEngines = [...vc.engines]
      .filter((e: any) => e.type !== 'library')
      .sort((a: any, b: any) => {
        // First by order
        if (a.order !== b.order) return a.order - b.order;
        // Then by type priority
        const typePriority: Record<string, number> = {
          'abstract': 1,
          'generic': 2,
          'specific': 3,
          'validation': 4,
        };
        return (typePriority[a.type] || 99) - (typePriority[b.type] || 99);
      });
    
    // Add jsxgraphcore first (always needed)
    scripts.push('<script src="https://cdn.jsdelivr.net/npm/jsxgraph@1.7.0/distrib/jsxgraphcore.js"></script>');
    
    // Add engine scripts in order
    for (const eng of sortedEngines) {
      const engineCode = loadedEngineCodes.get(eng.path) || '';
      if (engineCode) {
        scripts.push(`<script>
    console.log('[iframe] Loading ${eng.name} (${eng.type}), order: ${eng.order}');
    ${engineCode}
  </script>`);
      }
    }
    
    // Note: Definition script will be loaded dynamically after container is ready
    // This prevents it from executing before the DOM is ready
    
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${cssLinks}
</head>
<body>
  ${containerTag}
  
  <!-- Templates from view -->
  ${templatesHTML}
  
${scripts.join('\n')}
  
  <!-- Definition + Initialization -->
  <script>
    console.log('[iframe] Initialization script starting...');
    const defBoards = ${defBoardsStr};
    const rDef = ${rDefStr};
    
    console.log('[iframe] Definition loaded:', {
      defBoardsKeys: Object.keys(defBoards || {}),
      rDefKeys: Object.keys(rDef || {}),
    });
    
    // Get primary container ID from viewConfig - prioritize container-all-artifact
    let primaryContainerRaw = ${JSON.stringify(vc.htmlStructure?.containers?.[0] || 'container-all-artifact')};
    
    // If container-all-artifact exists, use it
    if (${JSON.stringify(vc.htmlStructure?.containers?.includes('container-all-artifact') || false)}) {
      primaryContainerRaw = 'container-all-artifact';
    }
    
    const primaryContainerId = primaryContainerRaw.replace('#', '');
    const containerId = primaryContainerId || 'container-all-artifact';
    
    // Wait for DOM to be ready and container to exist
    const waitForContainer = (containerId, maxAttempts) => {
      if (typeof maxAttempts === 'undefined') maxAttempts = 50;
      return new Promise((resolve) => {
        let attempts = 0;
        const check = () => {
          attempts++;
          // For container-all-artifact, search specifically by ID
          let container = null;
          if (containerId === 'container-all-artifact') {
            container = document.getElementById('container-all-artifact') || 
                        document.querySelector('#container-all-artifact');
          } else {
            // For other containers, try ID first, then class
            container = document.getElementById(containerId) || 
                       document.querySelector('#' + containerId) ||
                       document.querySelector('.' + containerId);
          }
          
          // Verify the container has the correct ID
          if (container) {
            if (container.id === containerId || (containerId === 'container-all-artifact' && container.id === 'container-all-artifact')) {
              console.log('[iframe] Container found:', containerId, 'with ID:', container.id);
              resolve(container);
            } else {
              // Container found but wrong ID, keep searching
              if (attempts >= maxAttempts) {
                console.warn('[iframe] Container found but wrong ID:', container.id, 'expected:', containerId);
                resolve(null);
              } else {
                setTimeout(check, 50);
              }
            }
          } else if (attempts >= maxAttempts) {
            console.warn('[iframe] Container not found after', maxAttempts, 'attempts:', containerId);
            resolve(null);
          } else {
            setTimeout(check, 50);
          }
        };
        check();
      });
    };
    
    // Wait for DOMContentLoaded and container
    const initializeWhenReady = () => {
      waitForContainer(containerId).then((container) => {
        if (!container) {
          console.warn('[iframe] Container not found after waiting:', containerId);
          return;
        }
        
        console.log('[iframe] Container found, initializing...', containerId);
        
        // Try initialization functions in order
        if (typeof generator === 'function' && typeof mainCartesian === 'function') {
          console.log('[iframe] Using generator + mainCartesian pattern');
          try {
            generator(rDef);
            setTimeout(() => mainCartesian(defBoards, rDef), 100);
          } catch (err) {
            console.error('[iframe] Error in generator/mainCartesian:', err);
          }
        } else if (typeof generation === 'function') {
          console.log('[iframe] Using generation pattern');
          try {
            generation(defBoards);
          } catch (err) {
            console.error('[iframe] Error in generation:', err);
          }
        } else if (typeof initMain === 'function') {
          console.log('[iframe] Using initMain pattern');
          try {
            initMain();
          } catch (err) {
            console.error('[iframe] Error in initMain:', err);
          }
        } else if (typeof CreateView === 'function') {
          console.log('[iframe] Using CreateView pattern');
          try {
            CreateView();
          } catch (err) {
            console.error('[iframe] Error in CreateView:', err);
          }
        } else {
          console.warn('[iframe] No known initialization function found. Available:', {
            hasGenerator: typeof generator !== 'undefined',
            hasMainCartesian: typeof mainCartesian !== 'undefined',
            hasGeneration: typeof generation !== 'undefined',
            hasInitMain: typeof initMain !== 'undefined',
            hasCreateView: typeof CreateView !== 'undefined',
          });
        }
      });
    };
    
    // Intercept generation() to wait for container AND template before executing
    let originalGeneration = null;
    const interceptGeneration = () => {
      // Override generation before script loads
      if (typeof window.generation === 'function') {
        originalGeneration = window.generation;
      }
      window.generation = function(def) {
        console.log('[iframe] generation() intercepted, waiting for container and template...');
        
        // Wait for both container and template
        Promise.all([
          waitForContainer(containerId),
          new Promise((resolve) => {
            let attempts = 0;
            const checkTemplate = () => {
              attempts++;
              const template = document.getElementById('template-interval');
              if (template && template.content && template.content.firstElementChild) {
                console.log('[iframe] Template found');
                resolve(template);
              } else if (attempts >= 50) {
                console.warn('[iframe] Template not found after', attempts, 'attempts');
                resolve(null);
              } else {
                setTimeout(checkTemplate, 50);
              }
            };
            checkTemplate();
          })
        ]).then(([container, template]) => {
          if (!container) {
            console.error('[iframe] Container not found, generation cannot proceed');
            return;
          }
          if (!template) {
            console.error('[iframe] Template not found, generation cannot proceed');
            return;
          }
          
          // Double-check that main container exists (generation() will query it again)
          // Use the same search method that generation() uses: document.querySelector('#container-all-artifact')
          // But first verify the container we found is the right one
          if (container && container.id !== 'container-all-artifact') {
            console.warn('[iframe] Container found has different ID:', container.id, 'expected: container-all-artifact');
          }
          
          let main = document.querySelector('#container-all-artifact');
          if (!main) {
            // Try alternative search methods
            main = document.getElementById('container-all-artifact');
            if (!main) {
              // Use the container we already found if it matches
              if (container && (container.id === 'container-all-artifact' || container.id === containerId)) {
                main = container;
                console.log('[iframe] Using container from waitForContainer:', container.id);
              } else {
                console.error('[iframe] Main container #container-all-artifact not found with any method', {
                  containerId: container?.id,
                  containerTagName: container?.tagName,
                  waitForContainerId: containerId,
                  allContainers: Array.from(document.querySelectorAll('[id*="container"]')).map(el => el.id)
                });
                return;
              }
            }
          }
          
          console.log('[iframe] Container and template ready, executing generation...', {
            containerId: container?.id,
            templateId: template?.id,
            mainContainer: !!main,
            mainContainerId: main?.id,
            templateContent: !!template?.content,
            templateFirstChild: !!template?.content?.firstElementChild
          });
          
          // Restore original and call it
          if (originalGeneration) {
            window.generation = originalGeneration;
          }
          
          // Execute with a small delay to ensure DOM is fully ready
          setTimeout(() => {
            try {
              originalGeneration(def);
            } catch (err) {
              console.error('[iframe] Error executing generation:', err);
            }
          }, 50);
        });
      };
    };
    
    // First, wait for container to exist, THEN load definition script
    const ensureContainerAndLoad = () => {
      // Intercept generation BEFORE loading script
      interceptGeneration();
      
      waitForContainer(containerId).then((container) => {
        if (!container) {
          console.error('[iframe] Container not found, cannot proceed:', containerId);
          return;
        }
        
        console.log('[iframe] Container confirmed, loading definition script...', containerId);
        
        // Now load the definition script - container is guaranteed to exist
        ${vc.definitionPath ? `const defPath = ${JSON.stringify(
          vc.definitionPath.startsWith('/') 
            ? vc.definitionPath 
            : `/api/engines/${bookId || 'MG'}/book/${
                vc.definitionPath.includes('/dist/') 
                  ? vc.definitionPath.replace(/^dist\//, '').replace(/\.min\.js$/, '.js')
                  : vc.definitionPath
              }`
        )};
        
        const script = document.createElement('script');
        script.src = defPath;
        script.onload = () => {
          console.log('[iframe] Definition script loaded');
          // Script loaded, if initMain called generation, it was intercepted
          // Wait a bit then check if we need to manually initialize
          setTimeout(() => {
            // Check if generation was already called (intercepted)
            // If not, call initializeWhenReady
            if (typeof window.initMain === 'function') {
              console.log('[iframe] initMain exists, will be called when generation executes');
            } else {
              initializeWhenReady();
            }
          }, 200);
        };
        script.onerror = (err) => {
          console.error('[iframe] Failed to load definition script:', err);
          initializeWhenReady();
        };
        document.head.appendChild(script);` : 'initializeWhenReady();'}
      });
    };
    
    // Start process - wait for DOM to be fully parsed
    const startProcess = () => {
      // Give a small delay to ensure DOM is fully parsed
      setTimeout(() => {
        ensureContainerAndLoad();
      }, 50);
    };
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startProcess);
    } else {
      // DOM already loaded
      startProcess();
    }
    
    setTimeout(() => {
      const container = document.getElementById(containerId) || document.querySelector('.' + containerId);
      console.log('[iframe] Post-init verification:', {
        containerFound: !!container,
        containerChildren: container ? container.children.length : 0,
      });
    }, 300);
  </script>
</body>
</html>`;
  };

  // Generate HTML for preview iframe - following view structure
  const generatePreviewHTML = (engineCode: string, def: ArtifactDefinition, engineId?: string, genericEngineCode?: string | null, loadedEngineCodes?: Map<string, string>): string => {
    const defBoardsStr = JSON.stringify(def.defBoards || {});
    const rDefStr = JSON.stringify(def.rDef || {});
    
    // If viewConfig is available, use exact configuration from view
    if (viewConfig && viewConfig.viewType) {
      return generateHTMLFromViewConfig(def, viewConfig, loadedEngineCodes || new Map());
    }
    
    // Determine container based on book type
    const isMG = bookId === 'MG' || !bookId || selectedEngine?.includes('Interval') || selectedEngine?.includes('Cartesian');
    const containerId = isMG ? 'container-all-artifact' : 'containerBasePage';
    const containerClass = isMG ? '' : 'containerBasePage';
    
    // Get template for this engine
    const templateHTML = getTemplateForEngine(engineId || selectedEngine || '', bookId);
    
    // Check if this is a Cartesian engine
    const isCartesian = (engineId || selectedEngine || '').includes('Cartesian');

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- CSS primero (siguiendo estructura view) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsxgraph@1.7.0/distrib/jsxgraph.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px; 
      background: #fff;
    }
    ${isMG ? `
    #container-all-artifact {
      width: 100%;
      min-height: 400px;
    }
    .paddiv.artifacts {
      margin: 10px 0;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .containerOne {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
    .inpEngInt1, .inpEngInt2 {
      flex: 1;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .BoardEngInt {
      flex: 2;
      min-height: 200px;
      border: 1px solid #ccc;
    }
    .allButtons {
      display: flex;
      gap: 5px;
    }
    .buttonAux, .buttonSecundary, .buttonPrimary {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .buttonSecundary {
      background: #6b7280;
      color: white;
    }
    .buttonPrimary {
      background: #3b82f6;
      color: white;
    }
    .defCartesian {
      margin: 10px 0;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .defBoard {
      width: 100%;
      min-height: 300px;
      border: 1px solid #ccc;
      background: #fff;
    }
    ` : `
    .containerBasePage {
      width: 100%;
      min-height: 100vh;
    }
    `}
    .jxgbox {
      width: 100%;
      height: 300px;
      border: 1px solid #ddd;
      background: #fff;
    }
  </style>
</head>
<body>
  <!-- Contenedor según libro (MG o NV) -->
  <div ${isMG ? `id="${containerId}"` : `class="${containerClass}"`}></div>
  
  <!-- Templates necesarios (inline) -->
  ${templateHTML}
  
  <!-- Template para Cartesian si es necesario -->
  ${isCartesian ? `
  <template id="tmp-cartesian">
    <div id="artifacts" class="d-flex flex-column border-board-dark m-2 squares-div">
      <input type="text" class="textTop w-100 border-board-dark" disabled></input>
      <input type="text" class="textTop w-100 border-board-dark" disabled></input>
      <div class="defBoard jxgbox mb-1 boardResp" data-board="board_0" data-artifact="artifact_1"></div>
      <input type="text" class="textBottom w-100 border-board-dark" disabled></input>
      <input type="text" class="textBottom w-100 border-board-dark" disabled></input>
      <div class="d-flex w-100 flex-wrap justify-content-center border border-dark rounded btn-all">
        <div class="d-flex flex-row">
          <div class="d-flex flex-wrap justify-content-center"></div>
          <button class="pointClose buttonAux button-marg buttonTertiary buttonKey" title="Punto para la curva">Punto</button>
          <button class="help buttonSecundary button-marg buttonKey" title="Ayuda">Ayuda</button>
          <button class="back buttonSecundary button-marg buttonKey" title="Retornar">Retornar</button>
          <button class="reset button-marg buttonSecundary buttonKey" title="Reiniciar">Reiniciar</button>
          <button class="check button-marg buttonPrimary buttonKey" title="Validar">Validar</button>
        </div>
      </div>
    </div>
  </template>
  ` : ''}
  
  <!-- Engine code (después del contenedor y templates) -->
  <script src="https://cdn.jsdelivr.net/npm/jsxgraph@1.7.0/distrib/jsxgraphcore.js"></script>
  ${genericEngineCode ? `
  <!-- Generic engine (contains generator function) -->
  <script>
    console.log('[iframe] Generic engine code loading, length:', ${genericEngineCode.length});
    ${genericEngineCode}
    console.log('[iframe] Generic engine loaded. Checking generator:', typeof generator !== 'undefined');
  </script>
  ` : ''}
  <!-- Specific engine -->
  <script>
    console.log('[iframe] Engine code loading, length:', ${engineCode.length});
    ${engineCode}
    console.log('[iframe] Engine code loaded. Checking functions:', {
      hasMainCartesian: typeof mainCartesian !== 'undefined',
      hasGeneration: typeof generation !== 'undefined',
      hasGenerator: typeof generator !== 'undefined',
      hasJXG: typeof JXG !== 'undefined'
    });
  </script>
  
  <!-- Definición + Inicialización (al final, como en view) -->
  <script>
    console.log('[iframe] Definition script starting...');
    const defBoards = ${defBoardsStr};
    const rDef = ${rDefStr};
    
    console.log('[iframe] Definition loaded:', {
      defBoardsKeys: Object.keys(defBoards || {}),
      rDefKeys: Object.keys(rDef || {}),
      hasArtifactHtml: !!(rDef && rDef.artifactHtml)
    });
    
    // Ejecutar exactamente como lo hacen las definiciones reales
    // Primero generator (crea los elementos .defCartesian en el DOM)
    if (typeof generator === 'function') {
      console.log('[iframe] Calling generator(rDef) to create DOM elements...');
      try {
        generator(rDef);
        console.log('[iframe] generator(rDef) completed. DefCartesian elements:', document.querySelectorAll('.defCartesian').length);
      } catch (err) {
        console.error('[iframe] Error in generator:', err);
      }
    } else {
      console.warn('[iframe] generator function not found');
    }
    
    // Luego mainCartesian (procesa los elementos .defCartesian)
    if (typeof mainCartesian === 'function') {
      console.log('[iframe] Calling mainCartesian(defBoards, rDef)...');
      try {
        mainCartesian(defBoards, rDef);
        console.log('[iframe] mainCartesian completed successfully');
      } catch (err) {
        console.error('[iframe] Error in mainCartesian:', err);
      }
    } else if (typeof generation === 'function') {
      // Para engineInterval
      console.log('[iframe] Calling generation(defBoards)...');
      try {
        generation(defBoards);
        console.log('[iframe] generation completed successfully');
      } catch (err) {
        console.error('[iframe] Error in generation:', err);
      }
    } else if (typeof initMain === 'function') {
      // Para definiciones que tienen su propia función initMain
      console.log('[iframe] Calling initMain()...');
      try {
        initMain();
        console.log('[iframe] initMain completed successfully');
      } catch (err) {
        console.error('[iframe] Error in initMain:', err);
      }
    } else {
      console.error('[iframe] No initialization function found! Available:', {
        hasMainCartesian: typeof mainCartesian !== 'undefined',
        hasGeneration: typeof generation !== 'undefined',
        hasGenerator: typeof generator !== 'undefined',
        hasInitMain: typeof initMain !== 'undefined',
        hasCreateView: typeof CreateView !== 'undefined'
      });
    }
    
    // Verificar resultado después de un pequeño delay
    setTimeout(() => {
      const container = document.querySelector('#${containerId}') || document.querySelector('.${containerClass}');
      console.log('[iframe] Post-init verification:', {
        containerFound: !!container,
        containerChildren: container ? container.children.length : 0,
        defCartesianCount: document.querySelectorAll('.defCartesian').length,
        boardsCount: document.querySelectorAll('.defBoard, .BoardEngInt, [id*="board"]').length,
        containerHTML: container ? container.innerHTML.substring(0, 300) : 'N/A'
      });
    }, 200);
  </script>
</body>
</html>
    `;
  };

  // Render preview
  const renderPreview = async () => {
    console.log("[ExerciseCanvas] renderPreview called", {
      selectedEngine,
      useManualPath,
      manualEnginePath,
      hasIframe: !!previewIframeRef.current,
      definitionKeys: {
        defBoards: definition?.defBoards ? Object.keys(definition.defBoards) : [],
        rDef: definition?.rDef ? Object.keys(definition.rDef) : [],
        artifacts: definition?.artifacts ? Object.keys(definition.artifacts) : [],
      },
    });

    if (!selectedEngine && !(useManualPath && manualEnginePath)) {
      const errorMsg = "Por favor selecciona un engine o ingresa una ruta manual";
      console.warn("[ExerciseCanvas] Cannot render:", errorMsg);
      setError(errorMsg);
      return;
    }

    // Use parseDefinition (which handles errors properly)
    const parsedDefinition = parseDefinition();
    if (!parsedDefinition) {
      console.warn("[ExerciseCanvas] Failed to parse definition");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // If viewConfig is available, load all engines in order
      if (viewConfig && viewConfig.engines && viewConfig.engines.length > 0) {
        console.log("[ExerciseCanvas] Using viewConfig, loading engines in order:", viewConfig.engines.map((e: any) => ({ name: e.name, path: e.path, order: e.order })));
        
        const loadedEngineCodes = new Map<string, string>();
        
        // Load all engines (excluding libraries and definitions)
        const enginesToLoad = viewConfig.engines.filter((e: any) => 
          e.type !== 'library' && !e.path.includes('definitions')
        );
        
        // Load engines in parallel (but we'll use them in order)
        await Promise.all(enginesToLoad.map(async (eng: any) => {
          try {
            const engineBookId = bookId || 'MG';
            // Normalize path: remove dist/ prefix if present
            let normalizedPath = eng.path;
            if (normalizedPath.includes('/dist/')) {
              normalizedPath = normalizedPath.replace(/^dist\//, '').replace(/\.min\.js$/, '.js');
            }
            const url = `/api/engines/${engineBookId}/book/${normalizedPath}`;
            console.log(`[ExerciseCanvas] Loading engine from viewConfig: ${eng.name} from ${url}`);
            const response = await fetch(url);
            if (response.ok) {
              const code = await response.text();
              loadedEngineCodes.set(eng.path, code);
              console.log(`[ExerciseCanvas] Loaded ${eng.name}, length: ${code.length}`);
            } else {
              console.warn(`[ExerciseCanvas] Failed to load ${eng.name}: ${response.statusText}`);
            }
          } catch (err) {
            console.warn(`[ExerciseCanvas] Error loading engine ${eng.name}:`, err);
          }
        }));
        
        console.log(`[ExerciseCanvas] Loaded ${loadedEngineCodes.size} engines from viewConfig`);
        
        const htmlContent = generatePreviewHTML('', parsedDefinition, undefined, null, loadedEngineCodes);
        console.log("[ExerciseCanvas] HTML generated from viewConfig, length:", htmlContent.length);
        
        // Guardar HTML reconstruido para el tab de debugging
        setReconstructedHTML(htmlContent);
        
        await new Promise(resolve => setTimeout(resolve, 0));
        
        if (!previewIframeRef.current) {
          throw new Error("Iframe no disponible para renderizar");
        }
        
        const iframe = previewIframeRef.current;
        iframe.srcdoc = htmlContent;
        
        iframe.onload = () => {
          console.log("[ExerciseCanvas] Iframe loaded successfully (viewConfig mode)");
          setIsLoading(false);
          setDefinition(parsedDefinition);
          if (onUpdate) {
            onUpdate(parsedDefinition);
          }
        };
        
        iframe.onerror = (err) => {
          console.error("[ExerciseCanvas] Iframe error:", err);
          setIsLoading(false);
          setError("Error al cargar el preview");
        };
        
        return;
      }
      
      // Fallback to single engine loading (existing logic)
      const engineId = useManualPath ? manualEnginePath : selectedEngine;
      console.log("[ExerciseCanvas] Loading engine (fallback):", engineId);
      const engineCode = await loadEngine(engineId);
      console.log("[ExerciseCanvas] Engine code loaded, length:", engineCode.length);
      
      // Load generic engine if needed (for Cartesian engines that need generator)
      let genericEngineCode: string | null = null;
      if (engineId?.includes('Cartesian') || engineId?.includes('cartesian')) {
        console.log("[ExerciseCanvas] Loading generic engine for Cartesian...");
        genericEngineCode = await loadGenericEngine();
      }
      
      const htmlContent = generatePreviewHTML(engineCode, parsedDefinition, selectedEngine, genericEngineCode);
      console.log("[ExerciseCanvas] HTML generated, length:", htmlContent.length);
      console.log("[ExerciseCanvas] HTML preview (first 500 chars):", htmlContent.substring(0, 500));

      // Guardar HTML reconstruido para el tab de debugging
      setReconstructedHTML(htmlContent);

      // Wait for iframe to be available (it should always be mounted now)
      // Add a small delay to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 0));
      
      if (!previewIframeRef.current) {
        console.error("[ExerciseCanvas] Iframe ref still not available after delay");
        throw new Error("Iframe no disponible para renderizar");
      }

      const iframe = previewIframeRef.current;
      console.log("[ExerciseCanvas] Setting iframe srcdoc");
      iframe.srcdoc = htmlContent;

      iframe.onload = () => {
        console.log("[ExerciseCanvas] Iframe loaded successfully");
        setIsLoading(false);
        setDefinition(parsedDefinition);
        if (onUpdate) {
          onUpdate(parsedDefinition);
        }
      };

      iframe.onerror = (err) => {
        console.error("[ExerciseCanvas] Iframe error:", err);
        setIsLoading(false);
        setError("Error al cargar el preview");
      };
    } catch (err) {
      console.error("[ExerciseCanvas] Error in renderPreview:", err);
      setError(`Error al cargar engine: ${err instanceof Error ? err.message : String(err)}`);
      setIsLoading(false);
    }
  };

  // Auto-render when switching to preview mode - use definitionJson to track changes
  // Wait for engines to load before auto-rendering
  useEffect(() => {
    const hasValidDefinition = !!definition && (definition.defBoards || definition.rDef);
    const hasEngines = availableEngines.length > 0 || (useManualPath && manualEnginePath);
    const shouldRender = viewMode === "preview" && hasValidDefinition && hasEngines && (selectedEngine || (useManualPath && manualEnginePath)) && !loadingEngines;
    
    console.log("[ExerciseCanvas] Auto-render effect triggered", {
      viewMode,
      hasDefinition: hasValidDefinition,
      selectedEngine,
      useManualPath,
      manualEnginePath,
      availableEnginesCount: availableEngines.length,
      loadingEngines,
      shouldRender,
    });
    
    if (shouldRender) {
      console.log("[ExerciseCanvas] Auto-rendering preview");
      renderPreview();
    } else {
      console.log("[ExerciseCanvas] Auto-render skipped - conditions not met", {
        viewModeOk: viewMode === "preview",
        hasDefinition: hasValidDefinition,
        hasEngines,
        hasSelectedEngine: !!(selectedEngine || (useManualPath && manualEnginePath)),
        notLoading: !loadingEngines,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, selectedEngine, useManualPath, manualEnginePath, definitionJson, availableEngines.length, loadingEngines]);

  // Handle view mode change from code to preview
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === "preview") {
      // Parse and update definition when switching to preview
      const parsed = parseDefinition();
      if (parsed) {
        setDefinition(parsed);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between bg-white dark:bg-zinc-950 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              console.log("[ExerciseCanvas] Close button clicked");
              onClose();
            }}
          >
            <X className="h-4 w-4 mr-2" />
            Cerrar
          </Button>
          <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
          <Button
            variant={viewMode === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewModeChange("preview")}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            variant={viewMode === "code" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewModeChange("code")}
          >
            <Code className="h-4 w-4 mr-2" />
            Código
          </Button>
          {viewConfig?.originalHTML && (
            <>
              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
              <Button
                variant={viewMode === "original" ? "default" : "outline"}
                size="sm"
                onClick={() => handleViewModeChange("original")}
              >
                <Code className="h-4 w-4 mr-2" />
                Original
              </Button>
            </>
          )}
          {reconstructedHTML && (
            <Button
              variant={viewMode === "reconstruido" ? "default" : "outline"}
              size="sm"
              onClick={() => handleViewModeChange("reconstruido")}
            >
              <Code className="h-4 w-4 mr-2" />
              Reconstruido
            </Button>
          )}
        </div>

        {/* Engine Selection */}
        <div className="flex items-center gap-2">
          {!useManualPath ? (
            <Select
              value={selectedEngine}
              onValueChange={(value) => {
                setSelectedEngine(value);
                setUseManualPath(false);
              }}
              disabled={loadingEngines || availableEngines.length === 0}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue
                  placeholder={
                    loadingEngines
                      ? "Cargando..."
                      : availableEngines.length === 0
                      ? "Sin engines"
                      : "Engine"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {availableEngines.map((engine) => (
                  <SelectItem key={engine.id} value={engine.id}>
                    {engine.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <input
              type="text"
              placeholder="Ruta del engine"
              value={manualEnginePath}
              onChange={(e) => setManualEnginePath(e.target.value)}
              className="w-[200px] px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
            />
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUseManualPath(!useManualPath)}
          >
            {useManualPath ? "Selector" : "Manual"}
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="px-4 py-2 flex-shrink-0">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === "code" ? (
          <div className="h-full flex flex-col p-4">
            <div className="mb-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block mb-2">
                Definición JSON:
              </label>
              <Textarea
                value={definitionJson}
                onChange={(e) => setDefinitionJson(e.target.value)}
                className="font-mono text-sm flex-1 min-h-0"
                placeholder='{"defBoards": {}, "rDef": {}}'
              />
            </div>
            <Button onClick={renderPreview} disabled={isLoading} className="mt-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Renderizando...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Renderizar
                </>
              )}
            </Button>
          </div>
        ) : viewMode === "original" ? (
          <div className="h-full flex flex-col p-4 overflow-hidden">
            <div className="mb-2 flex-shrink-0">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block mb-2">
                HTML Original:
              </label>
            </div>
            <div className="flex-1 overflow-auto border border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-950">
              <pre className="p-4 text-xs font-mono whitespace-pre-wrap break-words text-zinc-900 dark:text-zinc-100">
                {viewConfig?.originalHTML || ""}
              </pre>
            </div>
          </div>
        ) : viewMode === "reconstruido" ? (
          <div className="h-full flex flex-col p-4 overflow-hidden">
            <div className="mb-2 flex-shrink-0">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block mb-2">
                HTML Reconstruido:
              </label>
            </div>
            <div className="flex-1 overflow-auto border border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-950">
              <pre className="p-4 text-xs font-mono whitespace-pre-wrap break-words text-zinc-900 dark:text-zinc-100">
                {reconstructedHTML}
              </pre>
            </div>
          </div>
        ) : (
          <div className="h-full p-4 overflow-auto relative">
            <iframe
              ref={previewIframeRef}
              className="w-full h-full min-h-[400px] border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white"
              sandbox="allow-scripts allow-same-origin"
              title="Exercise Canvas Preview"
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-zinc-900/80 rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

