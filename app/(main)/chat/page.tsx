"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { initializeMathJax } from "@/lib/utils/mathjax";
import { DefaultChatTransport } from "ai";
import { Message, MessageContent, MessageAvatar } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Reasoning, ReasoningTrigger, ReasoningContent } from "@/components/ai-elements/reasoning";
import { Tool, ToolHeader, ToolContent } from "@/components/ai-elements/tool";
import { formatToolCallInfo, extractExerciseWithArtifact } from "@/lib/utils/exercise-formatting";
import { Loader } from "@/components/ai-elements/loader";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ExerciseCheckpoint } from "@/components/chat/ExerciseCheckpoint";
import { ExerciseCanvas } from "@/components/chat/ExerciseCanvas";
import type { Exercise } from "@/types/exercise";

function ChatPageContent() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [openCanvasForMessage, setOpenCanvasForMessage] = useState<string | null>(null);
  const [canvasStates, setCanvasStates] = useState<Record<string, {
  	definition: { defBoards?: Record<string, any>; rDef?: Record<string, any> };
  	engineId?: string;
  	width?: number;
  }>>({});
  const [canvasSplitRatio, setCanvasSplitRatio] = useState(0.5); // 50% por defecto
  const [isResizing, setIsResizing] = useState(false);

  const { messages, sendMessage, status, error, addToolResult, resumeStream, regenerate, clearError, id, setMessages, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  const autoOpenedRef = useRef<Set<string>>(new Set());

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    initializeMathJax();
    // Mark client-mounted to avoid SSR hydration mismatches for client-only values
    setMounted(true);
    
    // Cargar ratio guardado del localStorage
    const saved = localStorage.getItem('canvas-split-ratio');
    if (saved) {
      const ratio = parseFloat(saved);
      if (!isNaN(ratio) && ratio >= 0.2 && ratio <= 0.8) {
        setCanvasSplitRatio(ratio);
      }
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // Re-render MathJax after messages update
    if (typeof window !== "undefined" && window.MathJax && containerRef.current) {
      window.MathJax.typesetPromise?.([containerRef.current]).catch((err) => {
        console.error("MathJax typeset error:", err);
      });
    }

    // Debug: log compact view of AI SDK messages to confirm tool-call/tool-result parts
    try {
      const compact = messages.map((m) => ({
        id: m.id,
        role: m.role,
        parts: Array.isArray(m.parts)
          ? m.parts.map((p: any) => ({
              type: p.type,
              toolName: p.toolName || p.name,
              state: p.state,
              hasInput: !!p.input,
              hasOutput: !!p.output,
              hasResult: !!p.result,
              hasError: !!(p.error || p.errorText),
            }))
          : undefined,
      }));
      console.log("[useChat] status=", status, "messages(compact,last5)=", compact.slice(-5));
    } catch {}

    // Auto-open canvas desactivado - el usuario debe usar el checkpoint para abrir manualmente
    // Comentado para que el checkpoint aparezca primero y el usuario decida cuándo abrir
    /*
    try {
      const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
      if (!lastAssistant || autoOpenedRef.current.has(lastAssistant.id)) return;
      const toolParts = (lastAssistant.parts || []).filter((p: any) => {
        const isToolV5 = typeof p.type === "string" && p.type.startsWith("tool-");
        return isToolV5 || p.type === "tool" || p.type === "tool-call";
      });
      for (const p of toolParts) {
        const toolName = (p as any).toolName || (p as any).name;
        const output = (p as any).output ?? (p as any).result ?? undefined;
        let canvasOpened = false;
        
        // Check if this is retrieve-exercise tool and search in results
        if ((toolName === "retrieveExercise" || toolName === "retrieve-exercise") && output?.results) {
          // Find first result with artifacts
          for (const result of output.results) {
            const uiHints = result?.uiHints;
            if (uiHints?.openCanvas === true) {
              const artifactDefinition = result?.definition || result?.artifactDefinition;
              const suggestedEngine = result?.suggestedEngine;
              if (artifactDefinition) {
                if (!canvasStates[lastAssistant.id]) {
                  setCanvasStates((prev) => ({
                    ...prev,
                    [lastAssistant.id]: {
                      definition: artifactDefinition,
                      engineId: suggestedEngine,
                      width: uiHints?.width || 600,
                    },
                  }));
                }
                setOpenCanvasForMessage(lastAssistant.id);
                autoOpenedRef.current.add(lastAssistant.id);
                canvasOpened = true;
                break;
              }
            }
          }
        } else {
          // For other tools, check output directly
        const uiHints = output?.uiHints;
        if (uiHints?.openCanvas === true) {
          const artifactDefinition = output?.definition || output?.artifactDefinition || output?.exercise?.metadata?.artifactDefinition;
          const suggestedEngine = output?.suggestedEngine || output?.exercise?.metadata?.suggestedEngine;
          if (artifactDefinition) {
            if (!canvasStates[lastAssistant.id]) {
              setCanvasStates((prev) => ({
                ...prev,
                [lastAssistant.id]: {
                  definition: artifactDefinition,
                  engineId: suggestedEngine,
                  width: uiHints?.width || 600,
                },
              }));
            }
            setOpenCanvasForMessage(lastAssistant.id);
            autoOpenedRef.current.add(lastAssistant.id);
              canvasOpened = true;
            }
          }
        }
        
        if (canvasOpened) {
          break;
        }
      }
    } catch (e) {
      console.warn("auto-open canvas failed:", e);
    }
    */
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({ text: input });
    setInput("");
  };

  // Check if message has exercise with artifact
  const getExerciseWithArtifact = (message: any) => {
    return extractExerciseWithArtifact(message);
  };

  const handleToggleCanvas = (messageId: string) => {
    console.log("🔵 [ChatPage] handleToggleCanvas called:", messageId);
    console.log("🔵 [ChatPage] Current openCanvasForMessage:", openCanvasForMessage);
    
    if (openCanvasForMessage === messageId) {
      console.log("🔵 [ChatPage] Closing canvas");
      setOpenCanvasForMessage(null);
    } else {
      console.log("🔵 [ChatPage] Opening canvas for message:", messageId);
      console.log("🔵 [ChatPage] Messages available:", messages.length);
      
      const message = messages.find((m) => m.id === messageId);
      console.log("🔵 [ChatPage] Message found:", !!message, message ? { role: message.role, parts: message.parts?.length } : null);
      
      // Initialize canvas state if not exists
      const exerciseData = getExerciseWithArtifact(message);
      console.log("🔵 [ChatPage] Exercise data extracted:", {
        hasExercise: !!exerciseData?.exercise,
        hasDefinition: !!exerciseData?.definition,
        hasArtifactDefinition: !!exerciseData?.artifactDefinition,
        suggestedEngine: exerciseData?.suggestedEngine,
        bookId: exerciseData?.bookId,
        chapterId: exerciseData?.chapterId,
        artifactDefKeys: exerciseData?.artifactDefinition ? {
          defBoards: exerciseData.artifactDefinition.defBoards ? Object.keys(exerciseData.artifactDefinition.defBoards) : [],
          rDef: exerciseData.artifactDefinition.rDef ? Object.keys(exerciseData.artifactDefinition.rDef) : [],
        } : null,
      });
      
      if (exerciseData && !canvasStates[messageId]) {
        console.log("🔵 [ChatPage] Creating canvas state");
        setCanvasStates((prev) => ({
          ...prev,
          [messageId]: {
            definition: exerciseData.artifactDefinition,
            engineId: exerciseData.suggestedEngine,
            width: 600, // Default width
          },
        }));
      } else if (exerciseData && canvasStates[messageId]) {
        console.log("🔵 [ChatPage] Canvas state already exists for message");
      } else {
        console.warn("🔵 [ChatPage] No exercise data found for message:", messageId);
      }
      
      setOpenCanvasForMessage(messageId);
      console.log("🔵 [ChatPage] Canvas opened, openCanvasForMessage set to:", messageId);
    }
  };

  const handleCanvasUpdate = (messageId: string, definition: { defBoards?: Record<string, any>; rDef?: Record<string, any> }) => {
    setCanvasStates((prev) => ({
      ...prev,
      [messageId]: {
        ...prev[messageId],
        definition,
      },
    }));
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    const startX = e.clientX;
    const startRatio = canvasSplitRatio;
    let currentRatio = startRatio;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const containerWidth = window.innerWidth;
      const deltaX = moveEvent.clientX - startX;
      const deltaRatio = deltaX / containerWidth;
      const newRatio = Math.max(0.2, Math.min(0.8, startRatio + deltaRatio)); // 20% - 80%
      currentRatio = newRatio;
      setCanvasSplitRatio(newRatio);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      localStorage.setItem('canvas-split-ratio', currentRatio.toString());
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResize = (width: number) => {
    if (openCanvasForMessage) {
      setCanvasStates((prev) => ({
        ...prev,
        [openCanvasForMessage]: {
          ...prev[openCanvasForMessage],
          width,
        },
      }));
    }
  };

  // Chat control handlers (use previously unused methods)
  const handleStop = async () => {
    try {
      await stop();
    } catch (err) {
      console.error("stop error", err);
    }
  };

  const handleResume = async () => {
    try {
      await resumeStream();
    } catch (err) {
      console.error("resumeStream error", err);
    }
  };

  const handleRegenerate = async () => {
    try {
      await regenerate({});
    } catch (err) {
      console.error("regenerate error", err);
    }
  };

  const handleClearChat = () => {
    try {
      setMessages([]);
    } catch (err) {
      console.error("setMessages error", err);
    }
  };

  const handleClearError = () => {
    try {
      clearError();
    } catch (err) {
      console.error("clearError error", err);
    }
  };

  // Debug helper to ensure addToolResult is used
  const handleAddToolResultDebug = async () => {
    try {
      await addToolResult({
        state: "output-available",
        tool: "debug-tool" as any,
        toolCallId: "manual-debug",
        output: { ok: true },
      } as any);
    } catch (err) {
      console.warn("addToolResult debug failed (expected if no matching tool call):", err);
    }
  };

  const renderMessageContent = (message: any) => {
    if (!message.parts || !Array.isArray(message.parts)) {
      return null;
    }

    // Check if this message has an exercise with artifact
    const exerciseWithArtifact = getExerciseWithArtifact(message);
    const isCanvasOpen = openCanvasForMessage === message.id;

    // Build a brief reasoning summary based on tool calls
    const buildReasoningSummary = (): string | null => {
      try {
        const toolParts = (message.parts || []).filter((p: any) => p.type === "tool-call" || p.type === "tool");
        if (!toolParts.length) return null;
        const retrieveParts = toolParts.filter((p: any) => (p.toolName === "retrieve-exercise" || p.name === "retrieve-exercise"));
        const genParts = toolParts.filter((p: any) => (p.toolName === "generate-artifact-definition" || p.name === "generate-artifact-definition"));

        const bullets: string[] = [];
        const rp = retrieveParts[0];
        if (rp) {
          const inBook = rp.input?.bookId || rp.input?.params?.bookId;
          const inChapter = rp.input?.chapterId || rp.input?.params?.chapterId;
          const results = Array.isArray(rp.result?.results) ? rp.result.results.length : 0;
          bullets.push(`retrieve: ${results} candidatos${inBook ? `, book=${inBook}` : ""}${inChapter ? `, chapter=${inChapter}` : ""}`);
        }
        const gp = genParts[0];
        if (gp && gp.output) {
          const eng = gp.output?.suggestedEngine ?? "null";
          const conf = typeof gp.output?.confidence === "number" ? gp.output.confidence.toFixed(2) : "-";
          bullets.push(`artifact: engine=${eng}, confidence=${conf}`);
        }
        if (!bullets.length) return null;
        return bullets.join(" • ");
      } catch {
        return null;
      }
    };

    const reasoningSummary = buildReasoningSummary();

    return (
      <>
        {message.parts.map((part: any, index: number) => {
          if (part.type === "text") {
            return (
              <Response key={index} className="arithmatex">
                {part.text}
              </Response>
            );
          }
          
          // Handle AI SDK v5 tool parts: type like "tool-retrieveExercise"
          const isToolV5 = typeof part.type === "string" && part.type.startsWith("tool-");
          if (part.type === "tool-call" || part.type === "tool" || isToolV5) {
            const toolIdRaw = isToolV5 ? part.type.slice("tool-".length) : (part.toolName || part.name || "tool");
            const toolId = String(toolIdRaw || "tool");
            const state = part.state || (part.result ? "output-available" : part.error || part.errorText ? "output-error" : "input-available");

            const outputBlock = (part.output ?? part.result ?? undefined);
            const errorText = part.errorText ?? (typeof part.error === "string" ? part.error : undefined);
            const isGenerateVariation = /generate[-]?variation/i.test(toolId);

            return (
              <>
              <Tool key={index} defaultOpen={false}>
                <ToolHeader title={toolId} type={isToolV5 ? "tool" : part.type} state={state} />
                <ToolContent>
                  {"input" in part && part.input && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Parameters</p>
                      <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                        {JSON.stringify(part.input, null, 2)}
                      </pre>
                    </div>
                  )}

                  {(outputBlock || errorText) && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-muted-foreground mb-1">{errorText ? "Error" : "Result"}</p>
                      <pre className={`text-xs p-2 rounded overflow-auto ${errorText ? "bg-red-100 dark:bg-red-900" : "bg-muted"}`}>
                        {errorText ?? JSON.stringify(outputBlock, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* RAG signals for retrieve-exercise */}
                  {(/retrieve[-]?exercise/i.test(toolId)) && (
                    (() => {
                      const results = (outputBlock?.results) || (part.result?.results) || [];
                      if (!Array.isArray(results) || !results.length) return null;
                      return (
                        <div className="mt-3 border-t pt-3">
                          <p className="text-xs font-semibold mb-2">Retrieval (top {results.length})</p>
                          <div className="space-y-2">
                            {results.map((r: any, i: number) => {
                              const rDefKeys = Object.keys(r?.artifactDefinition?.rDef || {});
                              const defBoardsKeys = Object.keys(r?.artifactDefinition?.defBoards || {});
                              return (
                                <div key={i} className="text-xs bg-muted/50 p-2 rounded">
                                  <div>score: {typeof r.score === "number" ? r.score.toFixed(3) : r.score}</div>
                                  <div>bookId: {r.bookId || r.exercise?.metadata?.bookId}</div>
                                  <div>pageId: {r.pageId || r.exercise?.metadata?.pageId}</div>
                                  <div>hasArtifact: {r.hasArtifact ? "true" : "false"}</div>
                                  <div>rDefKeys: {rDefKeys.slice(0, 6).join(", ") || "-"}</div>
                                  <div>defBoardsKeys: {defBoardsKeys.slice(0, 6).join(", ") || "-"}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()
                  )}

                  {/* Definition preview (raw JSON, truncated) with badges */}
                  {(/retrieve[-]?exercise/i.test(toolId)) && (() => {
                    const results = (outputBlock?.results) || (part.result?.results) || [];
                    if (!Array.isArray(results) || !results.length) return null;
                    return (
                      <div className="mt-3 border-t pt-3">
                        <p className="text-xs font-semibold mb-2">Definition preview</p>
                        <div className="space-y-2">
                          {results.map((r: any, i: number) => {
                            const raw = r?.artifactDefinition ? JSON.stringify(r.artifactDefinition, null, 2) : "";
                            if (!raw) return null;
                            const isPlaceholder = !!r?.artifactDefinition?.placeholder;
                            const parseFailed = !!r?.artifactDefinition?.parseFailed;
                            const cut = raw.length > 800 ? raw.slice(0, 800) + "\n... (truncated)" : raw;
                            return (
                              <div key={i} className="text-xs bg-muted/50 p-2 rounded">
                                {(isPlaceholder || parseFailed) && (
                                  <div className="mb-2 flex gap-2">
                                    {isPlaceholder && (
                                      <span className="inline-block rounded bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 text-[10px] uppercase tracking-wide">placeholder</span>
                                    )}
                                    {parseFailed && (
                                      <span className="inline-block rounded bg-red-200 dark:bg-red-900 px-2 py-0.5 text-[10px] uppercase tracking-wide">parse failed</span>
                                    )}
                                  </div>
                                )}
                                <pre className="overflow-auto">{cut}</pre>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Telemetry for generate-artifact-definition */}
                  {(/generate[-]?artifact[-]?definition/i.test(toolId)) && outputBlock && (
                    <div className="mt-3 border-t pt-3">
                      <p className="text-xs font-semibold mb-2">Artifact generation</p>
                      <div className="text-xs bg-muted/50 p-2 rounded">
                        <div>suggestedEngine: {outputBlock?.suggestedEngine ?? "null"}</div>
                        <div>confidence: {typeof outputBlock?.confidence === "number" ? outputBlock.confidence.toFixed(2) : "-"}</div>
                        <div>defBoardsKeys: {Object.keys(outputBlock?.definition?.defBoards || {}).slice(0, 5).join(", ") || "-"}</div>
                        <div>rDefKeys: {Object.keys(outputBlock?.definition?.rDef || {}).slice(0, 8).join(", ") || "-"}</div>
                        <div>hasArtifact_1: {outputBlock?.definition?.artifacts?.artifact_1 ? "true" : "false"}</div>
                      </div>
                    </div>
                  )}

                  {/* Sources for retrieved results */}
                  {(/retrieve[-]?exercise/i.test(toolId)) && (() => {
                    const results = (outputBlock?.results) || (part.result?.results) || [];
                    if (!Array.isArray(results) || !results.length) return null;
                    return (
                      <div className="mt-3">
                        <p className="text-xs font-semibold mb-2">Sources</p>
                        <div className="flex flex-col gap-1">
                          {results.map((r: any, i: number) => (
                            r.filePath ? (
                              <a key={i} className="text-xs underline" href={`file://${r.filePath}`} target="_blank" rel="noreferrer">
                                {r.filePath}{typeof r.pageNumber === "number" ? `#page=${r.pageNumber}` : ""}
                              </a>
                            ) : null
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </ToolContent>
              </Tool>

              {/* Checkpoint después de generate-variation */}
              {isGenerateVariation && outputBlock && (() => {
                // Extraer artifactDefinition del output
                const artifactDef = outputBlock.artifactDefinition || 
                                    (outputBlock.definition?.defBoards || outputBlock.definition?.artifacts ? {
                                      defBoards: outputBlock.definition.defBoards || {},
                                      rDef: outputBlock.definition.rDef || (outputBlock.definition.artifacts ? { artifacts: outputBlock.definition.artifacts } : {}),
                                    } : null) ||
                                    outputBlock.exercise?.metadata?.artifactDefinition;
                
                if (artifactDef && (artifactDef.defBoards || artifactDef.rDef || artifactDef.artifacts)) {
                  // Preparar datos para el checkpoint
                  const checkpointData = {
                    exercise: outputBlock.exercise,
                    definition: outputBlock.definition,
                    artifactDefinition: artifactDef,
                    suggestedEngine: outputBlock.suggestedEngine,
                    bookId: outputBlock.bookId || outputBlock.exercise?.metadata?.bookId,
                    chapterId: outputBlock.chapterId || outputBlock.exercise?.metadata?.chapterId,
                  };
                  
                  return (
                    <div className="mt-3">
                      <ExerciseCheckpoint
                        exercise={checkpointData.exercise}
                        definition={checkpointData.definition}
                        isCanvasOpen={openCanvasForMessage === message.id}
                        onToggleCanvas={() => {
                          if (!canvasStates[message.id]) {
                            setCanvasStates((prev) => ({
                              ...prev,
                              [message.id]: {
                                definition: checkpointData.artifactDefinition,
                                engineId: checkpointData.suggestedEngine,
                                width: 600,
                              },
                            }));
                          }
                          handleToggleCanvas(message.id);
                        }}
                      />
                    </div>
                  );
                }
                return null;
              })()}
              </>
            );
          }
          
          return null;
        })}
        
        {/* Render ExerciseCheckpoint if exercise has artifact */}
        {exerciseWithArtifact && (
          <ExerciseCheckpoint
            exercise={exerciseWithArtifact.exercise}
            definition={exerciseWithArtifact.definition}
            isCanvasOpen={isCanvasOpen}
            onToggleCanvas={() => handleToggleCanvas(message.id)}
          />
        )}

        {/* Brief, non-sensitive reasoning summary */}
        {reasoningSummary && (
          <Reasoning isStreaming={false} defaultOpen={false}>
            <ReasoningTrigger />
            <ReasoningContent>{reasoningSummary}</ReasoningContent>
          </Reasoning>
        )}
      </>
    );
  };

  // Get current canvas exercise data
  const currentCanvasData = openCanvasForMessage
    ? getExerciseWithArtifact(messages.find((m) => m.id === openCanvasForMessage))
    : null;

  const currentCanvasState = openCanvasForMessage
    ? canvasStates[openCanvasForMessage]
    : null;

  // Debug log when canvas should render
  useEffect(() => {
    if (openCanvasForMessage) {
      console.log("🟢 [ChatPage] Canvas should render:", {
        openCanvasForMessage,
        hasCurrentCanvasData: !!currentCanvasData,
        currentCanvasData: currentCanvasData ? {
          hasExercise: !!currentCanvasData.exercise,
          hasDefinition: !!currentCanvasData.definition,
          hasArtifactDefinition: !!currentCanvasData.artifactDefinition,
          suggestedEngine: currentCanvasData.suggestedEngine,
          bookId: currentCanvasData.bookId,
          chapterId: currentCanvasData.chapterId,
          artifactDef: currentCanvasData.artifactDefinition ? {
            defBoardsKeys: currentCanvasData.artifactDefinition.defBoards ? Object.keys(currentCanvasData.artifactDefinition.defBoards) : [],
            rDefKeys: currentCanvasData.artifactDefinition.rDef ? Object.keys(currentCanvasData.artifactDefinition.rDef) : [],
          } : null,
        } : null,
        hasCanvasState: !!currentCanvasState,
      });
    }
  }, [openCanvasForMessage, currentCanvasData, currentCanvasState]);

  return (
    <div 
      className={`h-screen bg-zinc-50 dark:bg-black overflow-hidden ${
        openCanvasForMessage ? "grid" : "block"
      }`}
      style={openCanvasForMessage ? {
        gridTemplateColumns: `${1 - canvasSplitRatio}fr 1px ${canvasSplitRatio}fr`,
        height: '100vh'
      } : {
        height: '100vh'
      }}
    >
      {/* Chat Panel */}
      <div className="flex flex-col min-w-0" style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
        {/* Header */}
        <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4 flex-shrink-0 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Agente Matemático
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Genera y gestiona ejercicios matemáticos
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400" suppressHydrationWarning>
              ID: {mounted ? id : ""}
            </span>
            <button
              type="button"
              onClick={handleRegenerate}
              className="px-2 py-1 text-xs rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700"
            >
              Regenerar
            </button>
            <button
              type="button"
              onClick={handleResume}
              className="px-2 py-1 text-xs rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700"
            >
              Reanudar
            </button>
            <button
              type="button"
              onClick={handleStop}
              disabled={!isLoading}
              className="px-2 py-1 text-xs rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50"
            >
              Detener
            </button>
            <button
              type="button"
              onClick={handleClearChat}
              className="px-2 py-1 text-xs rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700"
            >
              Limpiar chat
            </button>
            <button
              type="button"
              onClick={handleAddToolResultDebug}
              className="px-2 py-1 text-xs rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700"
              title="Añadir resultado de herramienta (debug)"
            >
              Tool debug
            </button>
          </div>
        </header>

        {/* Messages Area - Scrollable */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4"
          style={{ minHeight: 0, height: 0 }}
        >
          {messages.length === 0 && (
            <div className="text-center text-zinc-500 dark:text-zinc-400 mt-12">
              <p className="text-lg">Bienvenido al Agente Matemático</p>
              <p className="text-sm mt-2">
                Pregúntame sobre ejercicios matemáticos o pídeme que genere nuevos
              </p>
            </div>
          )}

          {messages.map((message) => (
            <Message key={message.id} from={message.role}>
              {message.role === "assistant" && (
                <MessageAvatar
                  src=""
                  name="AI"
                  className="size-8"
                />
              )}
              <MessageContent variant="contained">
                {renderMessageContent(message)}
              </MessageContent>
              {message.role === "user" && (
                <MessageAvatar
                  src=""
                  name="Tú"
                  className="size-8"
                />
              )}
            </Message>
          ))}

          {isLoading && (
            <Message from="assistant">
              <MessageAvatar
                src=""
                name="AI"
                className="size-8"
              />
              <MessageContent variant="contained">
                <Loader />
              </MessageContent>
            </Message>
          )}

          {error && (
            <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg px-4 py-2 mb-4 flex items-center justify-between">
              <span>Error: {error.message || "Algo salió mal"}</span>
              <button
                type="button"
                onClick={handleClearError}
                className="px-2 py-1 text-xs rounded bg-red-200/70 dark:bg-red-800/70 hover:bg-red-200 dark:hover:bg-red-700"
              >
                Descartar
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input - Fixed at bottom */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4 flex-shrink-0"
        >
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      {/* Resizer Handle - solo cuando hay canvas */}
      {openCanvasForMessage && (
        <div 
          className={`w-px bg-zinc-200 dark:bg-zinc-800 cursor-col-resize hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors flex-shrink-0 ${
            isResizing ? "bg-blue-500 dark:bg-blue-600" : ""
          }`}
          onMouseDown={handleResizeStart}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panel"
        />
      )}

      {/* Canvas Panel - solo cuando está abierto */}
      {(() => {
        console.log("🟠 [ChatPage] Canvas render condition check:", {
          openCanvasForMessage,
          hasCurrentCanvasData: !!currentCanvasData,
          willRender: !!(openCanvasForMessage && currentCanvasData),
        });
        
        if (!openCanvasForMessage || !currentCanvasData) {
          return null;
        }
        
        const canvasProps = {
          exercise: currentCanvasData.exercise || {
            id: currentCanvasData.definition ? `definition_${openCanvasForMessage}` : `canvas_${openCanvasForMessage}`,
            tema: 'Artefacto Interactivo',
            dificultad: 'media',
            enunciado: currentCanvasData.definition ? 'Visualización de definición' : '',
            solucion: '',
          },
          artifactDefinition: currentCanvasState?.definition || currentCanvasData.artifactDefinition,
          suggestedEngine: currentCanvasData.suggestedEngine,
          engines: currentCanvasData.engines,
          bookId: currentCanvasData.bookId,
          chapterId: currentCanvasData.chapterId,
          viewConfig: currentCanvasData.viewConfig, // Include viewConfig if available
        };
        
        const artifactDef = canvasProps.artifactDefinition as any;
        console.log("[ChatPage] Rendering ExerciseCanvas with props:", {
          messageId: openCanvasForMessage,
          exercise: canvasProps.exercise.id,
          artifactDefinition: {
            hasDefBoards: !!artifactDef?.defBoards,
            defBoardsKeys: artifactDef?.defBoards ? Object.keys(artifactDef.defBoards) : [],
            hasRDef: !!artifactDef?.rDef,
            rDefKeys: artifactDef?.rDef ? Object.keys(artifactDef.rDef) : [],
            hasArtifacts: !!artifactDef?.artifacts,
            artifactsKeys: artifactDef?.artifacts ? Object.keys(artifactDef.artifacts) : [],
          },
          suggestedEngine: canvasProps.suggestedEngine,
          engines: canvasProps.engines?.length || 0,
          enginesList: canvasProps.engines?.map(e => ({ id: e.id, file: e.file })) || [],
          bookId: canvasProps.bookId,
          chapterId: canvasProps.chapterId,
          canvasState: currentCanvasState,
        });
        
        return (
          <div className="flex flex-col min-w-0 overflow-hidden" style={{ height: '100vh' }}>
            <ExerciseCanvas
              {...canvasProps}
              onClose={() => {
                console.log("[ChatPage] Closing canvas for message:", openCanvasForMessage);
                setOpenCanvasForMessage(null);
              }}
              onUpdate={(definition) => {
                console.log("[ChatPage] Canvas definition updated:", {
                  messageId: openCanvasForMessage,
                  definitionKeys: {
                    defBoards: definition?.defBoards ? Object.keys(definition.defBoards) : [],
                    rDef: definition?.rDef ? Object.keys(definition.rDef) : [],
                  },
                });
                handleCanvasUpdate(openCanvasForMessage, definition);
              }}
             />
           </div>
         );
       })()}
    </div>
  );
}

export default function ChatPage() {
  return (
    <ErrorBoundary>
      <ChatPageContent />
    </ErrorBoundary>
  );
}

