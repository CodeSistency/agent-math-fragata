"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Code, Eye, Split, AlertCircle, Play } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Engine } from "@/lib/books/engine-discovery";

interface ArtifactDefinition {
  defBoards?: Record<string, any>;
  rDef?: Record<string, any>;
  [key: string]: any;
}

interface PlaygroundProps {
  initialDefinition?: ArtifactDefinition;
  initialEngine?: string;
  bookId?: string;
  chapterId?: string;
}

type ViewMode = "preview" | "code" | "split";

export function Playground({
  initialDefinition,
  initialEngine,
  bookId,
  chapterId,
}: PlaygroundProps) {
  const [selectedEngine, setSelectedEngine] = useState<string>(initialEngine || "");
  const [manualEnginePath, setManualEnginePath] = useState<string>("");
  const [useManualPath, setUseManualPath] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [definitionJson, setDefinitionJson] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableEngines, setAvailableEngines] = useState<Engine[]>([]);
  const [loadingEngines, setLoadingEngines] = useState(false);
  const previewIframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize definition JSON from props
  useEffect(() => {
    if (initialDefinition) {
      try {
        setDefinitionJson(JSON.stringify(initialDefinition, null, 2));
      } catch (err) {
        console.error("Error serializing initial definition:", err);
      }
    } else {
      setDefinitionJson(JSON.stringify({ defBoards: {}, rDef: {} }, null, 2));
    }
  }, [initialDefinition]);

  // Load available engines
  useEffect(() => {
    const loadEngines = async () => {
      setLoadingEngines(true);
      try {
        const params = new URLSearchParams();
        if (bookId) params.set("bookId", bookId);
        if (chapterId) params.set("chapterId", chapterId);

        const response = await fetch(`/api/engines/list?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch engines: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.success || !data.data) {
          throw new Error("Invalid response format");
        }

        const engines = data.data as Engine[];
        setAvailableEngines(engines);

        // Auto-select first engine if none selected and we have initial engine
        if (!selectedEngine && engines.length > 0 && initialEngine) {
          const found = engines.find((e) => e.id === initialEngine);
          if (found) {
            setSelectedEngine(found.id);
          } else if (engines.length > 0) {
            setSelectedEngine(engines[0].id);
          }
        } else if (!selectedEngine && engines.length > 0 && !initialEngine) {
          setSelectedEngine(engines[0].id);
        }
      } catch (err) {
        console.error("Error loading engines:", err);
        setError(`Error al cargar engines: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoadingEngines(false);
      }
    };

    loadEngines();
  }, [bookId, chapterId, initialEngine]);

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

  // Load engine code
  const loadEngine = async (engineId: string): Promise<string> => {
    if (useManualPath && manualEnginePath) {
      // Load from manual path
      const response = await fetch(`/api/engines/${manualEnginePath}`);
      if (!response.ok) {
        throw new Error(`Error al cargar engine desde ruta manual: ${response.statusText}`);
      }
      return await response.text();
    }

    const engine = availableEngines.find((e) => e.id === engineId);
    if (!engine) {
      throw new Error(`Engine ${engineId} no encontrado`);
    }

    const response = await fetch(`/api/engines/${engine.file}`);
    if (!response.ok) {
      throw new Error(`Error al cargar engine: ${response.statusText}`);
    }

    return await response.text();
  };

  // Generate HTML for preview iframe
  const generatePreviewHTML = (engineCode: string, def: ArtifactDefinition): string => {
    const defBoardsStr = JSON.stringify(def.defBoards || {});
    const rDefStr = JSON.stringify(def.rDef || {});

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/jsxgraph@1.7.0/distrib/jsxgraphcore.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsxgraph@1.7.0/distrib/jsxgraph.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px; 
      background: #fff;
    }
    .defBoard { 
      width: 100%; 
      height: 400px; 
      border: 1px solid #ddd; 
      margin: 20px 0; 
      background: #fff;
    }
    #main { 
      display: flex; 
      flex-wrap: wrap; 
      gap: 20px; 
    }
    .container { 
      border: 1px solid #eee; 
      padding: 15px; 
      border-radius: 8px; 
      background: #fafafa;
    }
  </style>
</head>
<body>
  <div id="main"></div>
  <script>
    // Inject definitions as global variables
    const defBoards = ${defBoardsStr};
    const rDef = ${rDefStr};
    
    // Helper functions that might be needed
    if (typeof JXG === 'undefined') {
      console.error('JSXGraph not loaded');
    }
    
    // Execute engine code
    try {
      ${engineCode}
      
      // Initialize if functions exist
      if (typeof generator === 'function') {
        generator(rDef);
      }
      if (typeof defBoardDefault === 'function') {
        defBoardDefault();
      }
      if (typeof createHtml === 'function') {
        createHtml();
      }
    } catch (error) {
      console.error('Error executing engine:', error);
      document.body.innerHTML = '<div style="color: red; padding: 20px;">Error: ' + error.message + '</div>';
    }
  </script>
</body>
</html>
    `;
  };

  // Render preview
  const renderPreview = async () => {
    if (!selectedEngine && !(useManualPath && manualEnginePath)) {
      setError("Por favor selecciona un engine o ingresa una ruta manual");
      return;
    }

    const definition = parseDefinition();
    if (!definition) {
      return;
    }

    if (!previewIframeRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const engineId = useManualPath ? manualEnginePath : selectedEngine;
      const engineCode = await loadEngine(engineId);
      const htmlContent = generatePreviewHTML(engineCode, definition);

      const iframe = previewIframeRef.current;
      iframe.srcdoc = htmlContent;

      iframe.onload = () => {
        setIsLoading(false);
      };

      iframe.onerror = () => {
        setIsLoading(false);
        setError("Error al cargar el preview");
      };
    } catch (err) {
      setError(`Error al cargar engine: ${err instanceof Error ? err.message : String(err)}`);
      setIsLoading(false);
    }
  };

  const showCode = viewMode === "code" || viewMode === "split";
  const showPreview = viewMode === "preview" || viewMode === "split";

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900">
      {/* Header Controls */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between bg-white dark:bg-zinc-950 flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Engine Selection */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              Engine:
            </label>
            {!useManualPath ? (
              <Select
                value={selectedEngine}
                onValueChange={(value) => {
                  setSelectedEngine(value);
                  setUseManualPath(false);
                }}
                disabled={loadingEngines || availableEngines.length === 0}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue
                    placeholder={
                      loadingEngines
                        ? "Cargando engines..."
                        : availableEngines.length === 0
                        ? "No hay engines disponibles"
                        : "Seleccionar Engine"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableEngines.map((engine) => (
                    <SelectItem key={engine.id} value={engine.id}>
                      {engine.name}
                      {engine.description && (
                        <span className="text-xs text-muted-foreground ml-2">
                          ({engine.description})
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type="text"
                placeholder="Ej: MG/book/class/engines/cap_1/heightCurves.js"
                value={manualEnginePath}
                onChange={(e) => setManualEnginePath(e.target.value)}
                className="w-[300px]"
              />
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUseManualPath(!useManualPath)}
            >
              {useManualPath ? "Usar Selector" : "Ruta Manual"}
            </Button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 border-l border-zinc-200 dark:border-zinc-800 pl-4">
            <Button
              variant={viewMode === "preview" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("preview")}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              variant={viewMode === "code" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("code")}
            >
              <Code className="h-4 w-4 mr-2" />
              Código
            </Button>
            <Button
              variant={viewMode === "split" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("split")}
            >
              <Split className="h-4 w-4 mr-2" />
              Split
            </Button>
          </div>
        </div>

        {/* Render Button */}
        <Button onClick={renderPreview} disabled={isLoading} variant="default">
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

      {/* Error Alert */}
      {error && (
        <div className="px-6 py-2">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Panel */}
        {showCode && (
          <div
            className={`${
              viewMode === "split" ? "w-1/2" : "w-full"
            } overflow-auto p-4 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800`}
          >
            <div className="mb-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block mb-2">
                Definición JSON:
              </label>
              <Textarea
                value={definitionJson}
                onChange={(e) => setDefinitionJson(e.target.value)}
                className="font-mono text-sm min-h-[600px]"
                placeholder='{"defBoards": {}, "rDef": {}}'
              />
            </div>
          </div>
        )}

        {/* Preview Panel */}
        {showPreview && (
          <div
            className={`${
              viewMode === "split" ? "w-1/2" : "w-full"
            } overflow-auto p-4 bg-white dark:bg-zinc-950`}
          >
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
              </div>
            )}
            {error && !isLoading && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!isLoading && !error && (
              <iframe
                ref={previewIframeRef}
                className="w-full h-full min-h-[600px] border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white"
                sandbox="allow-scripts allow-same-origin"
                title="Playground Preview"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}



