"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Code, Eye, X, Play, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Exercise } from "@/types/exercise";
import type { Engine } from "@/lib/books/engine-discovery";

interface ArtifactDefinition {
  defBoards?: Record<string, any>;
  rDef?: Record<string, any>;
  [key: string]: any;
}

interface ExerciseCanvasProps {
  exercise: Exercise;
  artifactDefinition: ArtifactDefinition;
  suggestedEngine?: string;
  bookId?: string;
  chapterId?: string;
  onClose: () => void;
  onUpdate?: (definition: ArtifactDefinition) => void;
}

type ViewMode = "preview" | "code";

export function ExerciseCanvas({
  exercise,
  artifactDefinition,
  suggestedEngine,
  bookId,
  chapterId,
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
  const previewIframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize definition JSON
  useEffect(() => {
    try {
      setDefinitionJson(JSON.stringify(definition, null, 2));
    } catch (err) {
      console.error("Error serializing definition:", err);
    }
  }, []);

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

        // Auto-select suggested engine or first available
        if (!selectedEngine && engines.length > 0) {
          if (suggestedEngine) {
            const found = engines.find((e) => e.id === suggestedEngine);
            setSelectedEngine(found ? found.id : engines[0].id);
          } else {
            setSelectedEngine(engines[0].id);
          }
        }
      } catch (err) {
        console.error("Error loading engines:", err);
        setError(`Error al cargar engines: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoadingEngines(false);
      }
    };

    loadEngines();
  }, [bookId, chapterId, suggestedEngine]);

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
    const defBoards = ${defBoardsStr};
    const rDef = ${rDefStr};
    
    if (typeof JXG === 'undefined') {
      console.error('JSXGraph not loaded');
    }
    
    try {
      ${engineCode}
      
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

    const parsedDefinition = parseDefinition();
    if (!parsedDefinition) {
      return;
    }

    if (!previewIframeRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const engineId = useManualPath ? manualEnginePath : selectedEngine;
      const engineCode = await loadEngine(engineId);
      const htmlContent = generatePreviewHTML(engineCode, parsedDefinition);

      const iframe = previewIframeRef.current;
      iframe.srcdoc = htmlContent;

      iframe.onload = () => {
        setIsLoading(false);
        setDefinition(parsedDefinition);
        if (onUpdate) {
          onUpdate(parsedDefinition);
        }
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

  // Auto-render when switching to preview mode
  useEffect(() => {
    if (viewMode === "preview" && definition && (selectedEngine || (useManualPath && manualEnginePath))) {
      renderPreview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, selectedEngine, useManualPath, manualEnginePath]);

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
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between bg-white dark:bg-zinc-950 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
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
        ) : (
          <div className="h-full p-4 overflow-auto">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
              </div>
            )}
            {!isLoading && (
              <iframe
                ref={previewIframeRef}
                className="w-full h-full min-h-[400px] border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white"
                sandbox="allow-scripts allow-same-origin"
                title="Exercise Canvas Preview"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

