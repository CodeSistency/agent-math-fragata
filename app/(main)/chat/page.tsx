"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { initializeMathJax } from "@/lib/utils/mathjax";
import { DefaultChatTransport } from "ai";
import { Message, MessageContent, MessageAvatar } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Tool, ToolHeader, ToolContent } from "@/components/ai-elements/tool";
import { formatToolCallInfo } from "@/lib/utils/exercise-formatting";
import { Loader } from "@/components/ai-elements/loader";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function ChatPageContent() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    initializeMathJax();
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
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({ text: input });
    setInput("");
  };

  const renderMessageContent = (message: any) => {
    if (!message.parts || !Array.isArray(message.parts)) {
      return null;
    }

    return message.parts.map((part: any, index: number) => {
      if (part.type === "text") {
        return (
          <Response key={index} className="arithmatex">
            {part.text}
          </Response>
        );
      }
      
      if (part.type === "tool-call" || part.type === "tool") {
        const toolInfo = formatToolCallInfo({
          toolName: part.toolName || part.name,
          result: part.result,
          error: part.error,
        });
        
        return (
          <Tool key={index} defaultOpen={false}>
            <ToolHeader
              title={toolInfo.displayName}
              type={part.type}
              state={
                part.result
                  ? "output-available"
                  : part.error
                  ? "output-error"
                  : "input-available"
              }
            />
            <ToolContent>
              {toolInfo.summary && (
                <p className="text-sm text-muted-foreground mb-2">
                  {toolInfo.summary}
                </p>
              )}
              {toolInfo.details && (
                <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                  {JSON.stringify(toolInfo.details, null, 2)}
                </pre>
              )}
            </ToolContent>
          </Tool>
        );
      }
      
      return null;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-black">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Agente Matemático
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Genera y gestiona ejercicios matemáticos
        </p>
      </header>

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 py-4"
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
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg px-4 py-2 mb-4">
            Error: {error.message || "Algo salió mal"}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4"
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
  );
}

export default function ChatPage() {
  return (
    <ErrorBoundary>
      <ChatPageContent />
    </ErrorBoundary>
  );
}

