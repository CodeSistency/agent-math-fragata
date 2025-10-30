"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArtifactPreview } from "@/components/artifact/ArtifactPreview";
import { initializeMathJax } from "@/lib/utils/mathjax";
import type { Exercise } from "@/types/exercise";

export default function ExerciseViewPage() {
  const params = useParams();
  const router = useRouter();
  const exerciseId = params.exerciseId as string;
  
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    initializeMathJax();
  }, []);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        setError(null);

        const encodedExerciseId = encodeURIComponent(exerciseId);
        const response = await fetch(`/api/exercises/${encodedExerciseId}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.message || errorData.error || `Exercise not found (status: ${response.status})`;
          throw new Error(errorMessage);
        }
        
        const data = await response.json();
        
        if (!data.success || !data.data) {
          throw new Error("Invalid response format from server");
        }
        
        setExercise(data.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error loading exercise";
        setError(errorMessage);
        console.error("Error fetching exercise:", err);
      } finally {
        setLoading(false);
      }
    };

    if (exerciseId) {
      fetchExercise();
    }
  }, [exerciseId]);

  useEffect(() => {
    // Re-render MathJax when exercise changes
    if (typeof window !== "undefined" && window.MathJax && exercise) {
      const container = document.getElementById("exercise-content");
      if (container) {
        window.MathJax.typesetPromise?.([container]).catch((err) => {
          console.error("MathJax typeset error:", err);
        });
      }
    }
  }, [exercise]);

  // Extract definition from exercise metadata if available
  const definition = exercise?.metadata?.definition || null;
  const hasDefinition = definition && (definition.defBoards || definition.rDef);

  // Extract navigation context from metadata
  const bookId = exercise?.metadata?.bookId;
  const chapterId = exercise?.metadata?.chapterId;
  const pageId = exercise?.metadata?.pageId;

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Cargando ejercicio...</p>
        </div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <p className="text-red-600 dark:text-red-400 mb-2 font-semibold">
            {error || "Ejercicio no encontrado"}
          </p>
          {exerciseId && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              ID del ejercicio: <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">{exerciseId}</code>
            </p>
          )}
          <div className="flex gap-2 justify-center">
            <Button asChild variant="outline">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Link>
            </Button>
            <Button onClick={() => window.location.reload()} variant="default">
              Recargar Página
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {showPreview && hasDefinition && exercise.metadata ? (
        <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-900">
          <div className="h-full flex flex-col">
            <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between bg-white dark:bg-zinc-950">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Vista Previa de Artefacto - Ejercicio {exerciseId}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Cerrar Preview
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ArtifactPreview
                bookId={exercise.metadata.bookId}
                chapterId={exercise.metadata.chapterId}
                pageId={exercise.metadata.pageId}
                initialDefinition={definition}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Button asChild variant="ghost">
                  <Link href={pageId ? `/dashboard/pages/${pageId}` : chapterId ? `/dashboard/books/${bookId}/chapters/${chapterId}` : bookId ? `/dashboard/books/${bookId}` : "/dashboard"}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                  </Link>
                </Button>
                {hasDefinition && (
                  <Button onClick={() => setShowPreview(true)} variant="default">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Preview
                  </Button>
                )}
              </div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Ejercicio: {exercise.tema}
              </h1>
              {exercise.subtema && (
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                  Subtema: {exercise.subtema}
                </p>
              )}
              <div className="flex items-center gap-4">
                <span className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                  Dificultad: {exercise.dificultad}
                </span>
                {exercise.metadata?.bookName && (
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Libro: {exercise.metadata.bookName}
                  </span>
                )}
                {exercise.metadata?.chapterNumber !== undefined && (
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Capítulo: {exercise.metadata.chapterNumber}
                  </span>
                )}
                {exercise.metadata?.pageNumber !== undefined && (
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Página: {exercise.metadata.pageNumber}
                    {exercise.metadata.variant && exercise.metadata.variant > 0 && `.${exercise.metadata.variant}`}
                  </span>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            {(bookId || chapterId || pageId) && (
              <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 mb-6">
                <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Navegación
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pageId && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/pages/${pageId}`}>
                        Ver Página
                      </Link>
                    </Button>
                  )}
                  {chapterId && bookId && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/books/${bookId}/chapters/${chapterId}`}>
                        Ver Capítulo
                      </Link>
                    </Button>
                  )}
                  {bookId && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/books/${bookId}`}>
                        Ver Libro
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Exercise Content */}
            <div id="exercise-content" className="space-y-6">
              {/* Enunciado */}
              <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                  Enunciado
                </h2>
                <div className="arithmatex text-zinc-900 dark:text-zinc-50">
                  {exercise.enunciado}
                </div>
              </div>

              {/* Solución */}
              {exercise.solucion && (
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    Solución
                  </h2>
                  <div className="arithmatex text-zinc-900 dark:text-zinc-50">
                    {exercise.solucion}
                  </div>
                </div>
              )}

              {/* Variables */}
              {exercise.variables && Object.keys(exercise.variables).length > 0 && (
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    Variables
                  </h2>
                  <pre className="text-sm bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-auto">
                    {JSON.stringify(exercise.variables, null, 2)}
                  </pre>
                </div>
              )}

              {/* Metadata */}
              {exercise.metadata && (
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    Metadata
                  </h2>
                  <pre className="text-sm bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-auto">
                    {JSON.stringify(exercise.metadata, null, 2)}
                  </pre>
                </div>
              )}

              {/* Image Reference */}
              {exercise.image_ref && (
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    Referencia de Imagen
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {exercise.image_ref}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



