"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Exercise } from "@/types/exercise";
import { initializeMathJax } from "@/lib/utils/mathjax";

// Dynamically import react-json-view to avoid SSR issues
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

interface ExercisePanelProps {
  exercise: Exercise | null;
  onClose: () => void;
  onUpdate?: (exercise: Exercise) => void;
}

export function ExercisePanel({ exercise, onClose, onUpdate }: ExercisePanelProps) {
  const [editedExercise, setEditedExercise] = useState<Exercise | null>(exercise);
  const [isUpdating, setIsUpdating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditedExercise(exercise);
  }, [exercise]);

  useEffect(() => {
    initializeMathJax();
  }, []);

  useEffect(() => {
    // Re-render MathJax when exercise changes
    if (typeof window !== "undefined" && window.MathJax && previewRef.current) {
      window.MathJax.typesetPromise?.([previewRef.current]).catch((err) => {
        console.error("MathJax typeset error:", err);
      });
    }
  }, [editedExercise]);

  if (!exercise) return null;

  const handleJsonChange = (updatedContent: { updated_src: Exercise }) => {
    try {
      setEditedExercise(updatedContent.updated_src);
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };

  const handleApply = async () => {
    if (!editedExercise || !onUpdate) return;

    setIsUpdating(true);
    try {
      onUpdate(editedExercise);
    } catch (error) {
      console.error("Error applying changes:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-1/2 lg:w-2/5 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Editor de Ejercicio
        </h2>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* JSON Editor */}
          <div className="border-r border-zinc-200 dark:border-zinc-800 p-4 overflow-y-auto">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Código JSON
            </h3>
            {editedExercise && (
              <ReactJson
                src={editedExercise}
                theme="rjv-default"
                onEdit={handleJsonChange}
                onAdd={handleJsonChange}
                onDelete={handleJsonChange}
                enableClipboard={false}
                displayDataTypes={false}
                displayObjectSize={false}
              />
            )}
          </div>

          {/* MathJax Preview */}
          <div className="p-4 overflow-y-auto">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">
              Vista Previa
            </h3>
            <div
              ref={previewRef}
              className="prose prose-sm dark:prose-invert max-w-none"
            >
              {editedExercise && (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                      Tema: {editedExercise.tema}
                      {editedExercise.subtema && ` - ${editedExercise.subtema}`}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Dificultad: {editedExercise.dificultad}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Enunciado:</h4>
                    <div
                      className="arithmatex"
                      dangerouslySetInnerHTML={{
                        __html: editedExercise.enunciado
                          .replace(/\$\$(.+?)\$\$/g, "\\[\\1\\]")
                          .replace(/\$(.+?)\$/g, "\\(\\1\\)"),
                      }}
                    />
                  </div>
                  {editedExercise.solucion && (
                    <div>
                      <h4 className="font-semibold mb-2">Solución:</h4>
                      <div
                        className="arithmatex"
                        dangerouslySetInnerHTML={{
                          __html: editedExercise.solucion
                            .replace(/\$\$(.+?)\$\$/g, "\\[\\1\\]")
                            .replace(/\$(.+?)\$/g, "\\(\\1\\)"),
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-4 flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          Cerrar
        </button>
        {onUpdate && (
          <button
            onClick={handleApply}
            disabled={isUpdating}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUpdating ? "Aplicando..." : "Aplicar Cambios"}
          </button>
        )}
      </div>
    </div>
  );
}



