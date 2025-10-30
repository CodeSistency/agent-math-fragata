"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Code, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Page } from "@/types/book";
import type { Exercise } from "@/types/exercise";

export default function PageView() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.pageId as string;
  
  const [page, setPage] = useState<Page | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [definition, setDefinition] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Encode pageId for URL (in case it has special characters)
        const encodedPageId = encodeURIComponent(pageId);

        const response = await fetch(`/api/pages/${encodedPageId}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.message || errorData.error || `Page not found (status: ${response.status})`;
          throw new Error(errorMessage);
        }
        const data = await response.json();
        
        if (!data.success || !data.data) {
          throw new Error("Invalid response format from server");
        }
        
        const pageData: Page = data.data;
        setPage(pageData);
        
        // Get exercises separately if they exist in the response
        const exercisesData = (data.data as any).exercises || [];
        setExercises(exercisesData);
        
        // Extract definition from content if available
        if (pageData.content && (pageData.content.defBoards || pageData.content.rDef)) {
          // Use content directly if it has defBoards or rDef
          setDefinition({
            defBoards: pageData.content.defBoards || {},
            rDef: pageData.content.rDef || {},
          });
        } else {
          // Try to parse using API endpoint (safe server-side parsing)
          try {
            const parseResponse = await fetch(`/api/pages/${pageId}/parse`);
            if (parseResponse.ok) {
              const parseData = await parseResponse.json();
              if (parseData.success && parseData.data) {
                setDefinition({
                  defBoards: parseData.data.defBoards || {},
                  rDef: parseData.data.rDef || {},
                });
              }
            }
          } catch (err) {
            console.warn("Could not parse definition from API:", err);
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
        <div className="text-center max-w-md px-4">
          <p className="text-red-600 dark:text-red-400 mb-2 font-semibold">
            {error || "Página no encontrada"}
          </p>
          {pageId && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              ID de la página: <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">{pageId}</code>
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

  // Extract chapter ID and book ID from pageId (format: BOOKID_cap_X_pag_Y)
  // Also try to get from page metadata if available
  const chapterIdMatch = pageId.match(/^(.+_cap_\d+)_pag_/);
  const chapterId = page?.chapterId || (chapterIdMatch ? chapterIdMatch[1] : undefined);
  const bookIdMatch = pageId.match(/^([A-Z0-9_]+)_cap_/);
  const bookId = (page as any)?.bookId || (bookIdMatch ? bookIdMatch[1] : undefined);

  const handlePreview = () => {
    // Build URL with query params
    const params = new URLSearchParams();
    if (bookId) params.set("bookId", bookId);
    if (chapterId) params.set("chapterId", chapterId);
    if (pageId) params.set("pageId", pageId);
    if (definition) {
      params.set("definition", encodeURIComponent(JSON.stringify(definition)));
    }
    
    router.push(`/dashboard/playground?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
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
                  Página {page.variant && page.variant > 0 ? `${page.pageNumber}.${page.variant}` : page.pageNumber}
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Archivo: {page.filePath.split("/").pop()}
                </p>
              </div>
              {definition && (definition.defBoards || definition.rDef) && (
                <Button onClick={handlePreview} variant="outline">
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
                {(page.content.defBoards as Record<string, unknown> | undefined) && (
                  <div>
                    <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      defBoards
                    </h3>
                    <pre className="text-xs bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-auto max-h-96">
                      {String(JSON.stringify(page.content.defBoards as Record<string, unknown>, null, 2))}
                    </pre>
                  </div>
                )}
                {(page.content.rDef as Record<string, unknown> | undefined) && (
                  <div>
                    <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      rDef
                    </h3>
                    <pre className="text-xs bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-auto max-h-96">
                      {String(JSON.stringify(page.content.rDef as Record<string, unknown>, null, 2))}
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
    </div>
  );
}

