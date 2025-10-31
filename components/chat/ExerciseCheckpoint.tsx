"use client";

import { Button } from "@/components/ui/button";
import { Code, CheckCircle2 } from "lucide-react";
import { initializeMathJax } from "@/lib/utils/mathjax";
import { useEffect, useRef } from "react";
import type { Exercise } from "@/types/exercise";

interface ExerciseCheckpointProps {
  exercise?: Exercise;
  definition?: { defBoards?: Record<string, any>; artifacts?: Record<string, any>; rDef?: Record<string, any> };
  isCanvasOpen: boolean;
  onToggleCanvas: () => void;
}

export function ExerciseCheckpoint({
  exercise,
  definition,
  isCanvasOpen,
  onToggleCanvas,
}: ExerciseCheckpointProps) {
  const exerciseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeMathJax();
  }, []);

  useEffect(() => {
    // Re-render MathJax when exercise changes
    if (typeof window !== "undefined" && window.MathJax && exerciseRef.current) {
      window.MathJax.typesetPromise?.([exerciseRef.current]).catch((err) => {
        console.error("MathJax typeset error:", err);
      });
    }
  }, [exercise]);

  const hasContent = exercise || definition;
  if (!hasContent) return null;

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 bg-white dark:bg-zinc-800 mt-4">
      <div className="mb-3">
        {exercise ? (
          <>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              {exercise.tema}
            </h3>
            {exercise.subtema && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {exercise.subtema}
              </p>
            )}
          </div>
          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
            {exercise.dificultad}
          </span>
        </div>
        
        <div ref={exerciseRef} className="arithmatex text-zinc-900 dark:text-zinc-50 text-sm">
          <p className="font-medium mb-1">Enunciado:</p>
          <div>{exercise.enunciado}</div>
        </div>
          </>
        ) : definition ? (
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Definición de Artefacto
            </h3>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
              {definition.defBoards && Object.keys(definition.defBoards).length > 0 && (
                <div>DefBoards: {Object.keys(definition.defBoards).length} board(s)</div>
              )}
              {(definition.artifacts || definition.rDef) && (
                <div>
                  Artifacts: {Object.keys(definition.artifacts || definition.rDef || {}).length} definición(es)
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <Button
        onClick={onToggleCanvas}
        variant={isCanvasOpen ? "default" : "outline"}
        size="sm"
        className="w-full"
      >
        {isCanvasOpen ? (
          <>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Canvas Abierto
          </>
        ) : (
          <>
            <Code className="h-4 w-4 mr-2" />
            Abrir Canvas
          </>
        )}
      </Button>
    </div>
  );
}



