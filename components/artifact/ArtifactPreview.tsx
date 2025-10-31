"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Code, Eye, Split, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Engine } from "@/lib/books/types";

interface ArtifactDefinition {
  defBoards?: Record<string, any>;
  rDef?: Record<string, any>;
  [key: string]: any;
}

interface ArtifactPreviewProps {
  bookId?: string;
  chapterId?: string;
  pageId?: string;
  initialEngine?: string;
  initialDefinition?: ArtifactDefinition;
}

type ViewMode = "preview" | "code" | "split";

export function ArtifactPreview({
  bookId,
  chapterId,
  pageId,
  initialEngine,
  initialDefinition,
}: ArtifactPreviewProps) {
  const [selectedEngine, setSelectedEngine] = useState<string>(initialEngine || "");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [definition, setDefinition] = useState<ArtifactDefinition>(
    initialDefinition || { defBoards: {}, rDef: {} }
  );
  const [definitionJson, setDefinitionJson] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableEngines, setAvailableEngines] = useState<Engine[]>([]);
  const previewIframeRef = useRef<HTMLIFrameElement>(null);

  // Load available engines
  useEffect(() => {
    const loadEngines = async () => {
      if (!bookId || !chapterId) return;
      
      try {
        const response = await fetch(`/api/engines/discover?bookId=${encodeURIComponent(bookId)}&chapterId=${encodeURIComponent(chapterId)}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch engines: ${response.statusText}`);
        }
        
        const data = await response.json();
        if (!data.success || !data.data) {
          throw new Error("Invalid response format");
        }
        
        const engines = data.data as Engine[];
        setAvailableEngines(engines);
        
        // Auto-select first engine if none selected
        if (!selectedEngine && engines.length > 0) {
          setSelectedEngine(engines[0].id);
        }
      } catch (err) {
        console.error("Error loading engines:", err);
        setError(`Error al cargar engines: ${err instanceof Error ? err.message : String(err)}`);
      }
    };

    loadEngines();
  }, [bookId, chapterId, selectedEngine]);

  // Sync JSON with object
  useEffect(() => {
    try {
      setDefinitionJson(JSON.stringify(definition, null, 2));
    } catch (err) {
      console.error("Error serializing definition:", err);
    }
  }, [definition]);

  // Parse JSON to object
  const handleJsonChange = (value: string) => {
    setDefinitionJson(value);
    try {
      const parsed = JSON.parse(value);
      setDefinition(parsed);
      setError(null);
    } catch (err) {
      setError(`JSON inválido: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  // Load engine code
  const loadEngine = async (engineId: string): Promise<string> => {
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
    if (!selectedEngine || !previewIframeRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const engineCode = await loadEngine(selectedEngine);
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

  // Auto-render when engine or definition changes
  useEffect(() => {
    if (viewMode !== "code" && selectedEngine && availableEngines.length > 0) {
      renderPreview();
    }
  }, [selectedEngine, definition, viewMode, availableEngines.length]);

  const showCode = viewMode === "code" || viewMode === "split";
  const showPreview = viewMode === "preview" || viewMode === "split";

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between bg-white dark:bg-zinc-950">
        <div className="flex items-center gap-4">
          <Select value={selectedEngine} onValueChange={setSelectedEngine} disabled={availableEngines.length === 0}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder={availableEngines.length === 0 ? "Cargando engines..." : "Seleccionar Engine"} />
            </SelectTrigger>
            <SelectContent>
              {availableEngines.map((engine) => (
                <SelectItem key={engine.id} value={engine.id}>
                  {engine.name}
                  {engine.description && (
                    <span className="text-xs text-muted-foreground ml-2">({engine.description})</span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "code" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("code")}
          >
            <Code className="h-4 w-4 mr-2" />
            Código
          </Button>
          <Button
            variant={viewMode === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("preview")}
          >
            <Eye className="h-4 w-4 mr-2" />
            Vista Previa
          </Button>
          <Button
            variant={viewMode === "split" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("split")}
          >
            <Split className="h-4 w-4 mr-2" />
            Dividido
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor */}
        {showCode && (
          <div className={`${viewMode === "split" ? "w-1/2" : "w-full"} border-r border-zinc-200 dark:border-zinc-800 flex flex-col`}>
            <div className="border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 bg-zinc-100 dark:bg-zinc-800">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Definición JSON</span>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <Textarea
                value={definitionJson}
                onChange={(e) => handleJsonChange(e.target.value)}
                className="w-full h-full font-mono text-sm"
                spellCheck={false}
                placeholder='{"defBoards": {}, "rDef": {}}'
              />
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        )}

        {/* Preview Panel */}
        {showPreview && (
          <div className={`${viewMode === "split" ? "w-1/2" : "w-full"} overflow-auto p-4 bg-white dark:bg-zinc-950`}>
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
                title="Artifact Preview"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

