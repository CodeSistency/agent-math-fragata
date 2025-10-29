"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Code, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArtifactPreview } from "@/components/artifact/ArtifactPreview";
import type { Page } from "@/types/book";
import type { Exercise } from "@/types/exercise";

export default function PageView() {
  const params = useParams();
  const pageId = params.pageId as string;
  
  const [page, setPage] = useState<Page | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [definition, setDefinition] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/pages/${pageId}`);
        if (!response.ok) {
          throw new Error("Page not found");
        }
        const data = await response.json();
        
        setPage(data.data);
        setExercises(data.data.exercises || []);
        
        // Extract definition from content if available
        if (data.data.content) {
          setDefinition(data.data.content);
        } else if (data.data.fileContent) {
          // Try to parse file content to extract definition
          try {
            // Simple extraction (could be improved)
            const defBoardsMatch = data.data.fileContent.match(/let\s+defBoards\s*=\s*(\{[\s\S]*?\});/);
            const rDefMatch = data.data.fileContent.match(/const\s+rDef\s*=\s*(\{[\s\S]*?\});/);
            
            if (defBoardsMatch || rDefMatch) {
              const defBoards = defBoardsMatch ? eval(`(${defBoardsMatch[1]})`) : {};
              const rDef = rDefMatch ? eval(`(${rDefMatch[1]})`) : {};
              setDefinition({ defBoards, rDef });
            }
          } catch (err) {
            console.warn("Could not parse definition from file content:", err);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading page");
        console.error("Error fetching page data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (pageId) {
      fetchData();
    }
  }, [pageId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Cargando página...</p>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error || "Página no encontrada"}
          </p>
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Extract chapter ID from pageId (format: BOOKID_cap_X_pag_Y)
  const chapterIdMatch = pageId.match(/^(.+_cap_\d+)_pag_/);
  const chapterId = chapterIdMatch ? chapterIdMatch[1] : undefined;
  const bookIdMatch = pageId.match(/^([A-Z0-9_]+)_cap_/);
  const bookId = bookIdMatch ? bookIdMatch[1] : undefined;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {showPreview && definition ? (
        <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-900">
          <div className="h-full flex flex-col">
            <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between bg-white dark:bg-zinc-950">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Vista Previa de Artefacto
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Cerrar
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ArtifactPreview
                bookId={bookId}
                chapterId={chapterId}
                pageId={pageId}
                initialDefinition={definition}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <Button asChild variant="ghost" className="mb-4">
                <Link href={chapterId ? `/dashboard/books/${bookId}/chapters/${chapterId}` : "/dashboard"}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Link>
              </Button>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    Página {page.pageNumber}
                    {page.variant && page.variant > 0 && (
                      <span className="text-lg text-zinc-500 dark:text-zinc-400 ml-2">
                        (Variante {page.variant})
                      </span>
                    )}
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Archivo: {page.filePath.split("/").pop()}
                  </p>
                </div>
                {definition && (
                  <Button onClick={() => setShowPreview(true)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Preview
                  </Button>
                )}
              </div>
            </div>

            {/* Content */}
            {page.content && Object.keys(page.content).length > 0 && (
              <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                  Contenido de la Definición
                </h2>
                <div className="space-y-4">
                  {page.content.defBoards && (
                    <div>
                      <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        defBoards
                      </h3>
                      <pre className="text-xs bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-auto max-h-96">
                        {JSON.stringify(page.content.defBoards, null, 2)}
                      </pre>
                    </div>
                  )}
                  {page.content.rDef && (
                    <div>
                      <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        rDef
                      </h3>
                      <pre className="text-xs bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-auto max-h-96">
                        {JSON.stringify(page.content.rDef, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Exercises */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Ejercicios Encontrados ({exercises.length})
              </h2>

              {exercises.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
                  <p>No se encontraron ejercicios en esta página</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
                            {exercise.tema}
                          </h3>
                          {exercise.subtema && (
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                              {exercise.subtema}
                            </p>
                          )}
                        </div>
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                          {exercise.dificultad}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-2">
                        {exercise.enunciado}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

