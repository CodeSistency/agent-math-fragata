"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Code, Eye, Split, AlertCircle, Play } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CSSLoader } from "@/lib/books/css-loader";
import { LegacyDefinitionParser, type ArtifactDefinition } from "@/lib/books/legacy-parser";
import type { EngineMetadata } from "@/lib/books/engine-registry";

interface HybridRendererProps {
  definition?: ArtifactDefinition;
  engineId?: string;
  useLegacy?: boolean;
  onDefinitionChange?: (definition: ArtifactDefinition) => void;
}

export function HybridRenderer({ 
  definition: initialDefinition, 
  engineId: initialEngine, 
  useLegacy = false,
  onDefinitionChange 
}: HybridRendererProps) {
  const [selectedEngine, setSelectedEngine] = useState<string>(initialEngine || "");
  const [manualEnginePath, setManualEnginePath] = useState<string>("");
  const [definition, setDefinition] = useState<ArtifactDefinition>(
    initialDefinition || { defBoards: {}, rDef: {} }
  );
  const [definitionJson, setDefinitionJson] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableEngines, setAvailableEngines] = useState<EngineMetadata[]>([]);
  const previewIframeRef = useRef<HTMLIFrameElement>(null);
  
  // Sync JSON with object
  useEffect(() => {
    try {
      setDefinitionJson(JSON.stringify(definition, null, 2));
    } catch (err) {
      console.error("Error serializing definition:", err);
    }
  }, [definition, onDefinitionChange]);
  
  // Parse JSON to object
  const handleJsonChange = (value: string) => {
    setDefinitionJson(value);
    try {
      const parsed = JSON.parse(value);
      setDefinition(parsed);
      setError(null);
      onDefinitionChange?.(parsed);
    } catch (err) {
      setError(`JSON inválido: ${err instanceof Error ? err.message : String(err)}`);
    }
  };
  
  // Load engine code
  const loadEngine = async (engineId: string): Promise<string> => {
    if (useLegacy && manualEnginePath) {
      // Load from manual path
      const response = await fetch(`/api/engines/${manualEnginePath}`);
      if (!response.ok) {
        throw new Error(`Error al cargar engine desde ruta manual: ${response.statusText}`);
      }
      return await response.text();
    }
    
    // Try to get engine metadata
    const engine = availableEngines.find((e) => e.id === engineId);
    if (!engine) {
      throw new Error(`Engine ${engineId} no encontrado`);
    }
    
    // Load engine code from API
    const response = await fetch(`/api/engines/${engine.file}`);
    if (!response.ok) {
      throw new Error(`Error al cargar engine: ${response.statusText}`);
    }
    
    return await response.text();
  };
  
  // Load CSS for engine
  const loadEngineCSS = async (engine: EngineMetadata): Promise<void> => {
    if (!engine.css) return;
    
    // Load base CSS
    await CSSLoader.loadMultipleCSS([
      '/books/MG/book/css/generic/jsxgraph.min.css',
      '/books/MG/book/css/generic/styles.min.css',
      '/books/NV/book/css/generic/jsxgraph.css',
      '/books/NV/book/css/generic/styles.css'
    ]);
    
    // Load book-specific CSS
    if (engine.bookId === 'MG') {
      await CSSLoader.loadEngineCSS(engine);
    } else if (engine.bookId === 'NV') {
      await CSSLoader.loadEngineCSS(engine);
    }
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
      const engine = availableEngines.find((e) => e.id === selectedEngine);
      if (!engine) {
        throw new Error(`Engine ${selectedEngine} no encontrado`);
      }
      
      const engineCode = await loadEngine(selectedEngine);
      const htmlContent = generatePreviewHTML(engineCode, definition);
      
      // Load CSS for the engine
      await loadEngineCSS(engine);
      
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
    if (selectedEngine && availableEngines.length > 0) {
      renderPreview();
    }
  }, [selectedEngine, definition, availableEngines.length]);
  
  const showCode = useLegacy;
  const showPreview = true;
  
  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900">
      {/* Header Controls */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between bg-white dark:bg-zinc-950">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Engine Selection */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              Engine:
            </label>
            <Select
              value={selectedEngine}
              onValueChange={(value) => {
                setSelectedEngine(value);
                setManualEnginePath("");
              }}
              disabled={availableEngines.length === 0}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue
                  placeholder={
                    availableEngines.length === 0
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
            
            {/* Legacy Mode Toggle */}
            <Button
              variant={useLegacy ? "default" : "outline"}
              size="sm"
              onClick={() => setManualEnginePath(useLegacy ? "" : "legacy")}
            >
              {useLegacy ? "Legacy Mode" : "Modern Mode"}
            </Button>
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
          <div className="w-full overflow-auto p-4 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800">
            <div className="mb-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block mb-2">
                Definición JSON:
              </label>
              <Textarea
                value={definitionJson}
                onChange={(e) => handleJsonChange(e.target.value)}
                className="font-mono text-sm min-h-[600px]"
                placeholder='{"defBoards": {}, "rDef": {}}'
              />
            </div>
          </div>
        )}
        
        {/* Preview Panel */}
        {showPreview && (
          <div className="w-full overflow-auto p-4 bg-white dark:bg-zinc-950">
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