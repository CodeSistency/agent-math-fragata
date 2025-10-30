"use client";

import { Button } from "@/components/ui/button";
import { Code, CheckCircle2 } from "lucide-react";
import { initializeMathJax } from "@/lib/utils/mathjax";
import { useEffect, useRef } from "react";
import type { Exercise } from "@/types/exercise";

interface ExerciseCheckpointProps {
  exercise: Exercise;
  isCanvasOpen: boolean;
  onToggleCanvas: () => void;
}

export function ExerciseCheckpoint({
  exercise,
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

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 bg-white dark:bg-zinc-800 mt-4">
      <div className="mb-3">
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



