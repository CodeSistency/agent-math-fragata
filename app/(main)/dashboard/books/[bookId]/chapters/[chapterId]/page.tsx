"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, ChevronRight, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { Chapter } from "@/types/book";
import type { Page } from "@/types/book";

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.bookId as string;
  const chapterId = params.chapterId as string;
  
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Encode chapterId for URL (in case it has special characters)
        const encodedChapterId = encodeURIComponent(chapterId);

        // Fetch chapter details
        const chapterResponse = await fetch(`/api/chapters/${encodedChapterId}`);
        if (!chapterResponse.ok) {
          const errorData = await chapterResponse.json().catch(() => ({}));
          const errorMessage = errorData.message || errorData.error || `Chapter not found (status: ${chapterResponse.status})`;
          throw new Error(errorMessage);
        }
        const chapterData = await chapterResponse.json();
        
        if (!chapterData.success || !chapterData.data) {
          throw new Error("Invalid response format from server");
        }
        
        setChapter(chapterData.data);
        setPages(chapterData.data.pages || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error loading chapter";
        setError(errorMessage);
        console.error("Error fetching chapter data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (chapterId) {
      fetchData();
    }
  }, [chapterId]);

  const handlePreviewChapter = async () => {
    if (!chapterId || pages.length === 0) {
      alert("No hay páginas disponibles para preview");
      return;
    }

    setLoadingPreview(true);
    try {
      // Get first page with content
      const firstPage = pages[0];
      const pageResponse = await fetch(`/api/pages/${encodeURIComponent(firstPage.id)}`);
      if (!pageResponse.ok) {
        throw new Error("Failed to fetch page content");
      }
      
      const pageData = await pageResponse.json();
      const page: Page = pageData.data;
      
      // Extract definition from page content
      if (page.content && (page.content.defBoards || page.content.rDef)) {
        const definition = {
          defBoards: page.content.defBoards || {},
          rDef: page.content.rDef || {},
        };
        
        // Navigate to playground with params
        const params = new URLSearchParams();
        params.set("bookId", bookId);
        params.set("chapterId", chapterId);
        params.set("pageId", firstPage.id);
        params.set("definition", encodeURIComponent(JSON.stringify(definition)));
        
        router.push(`/dashboard/playground?${params.toString()}`);
      } else {
        alert("Esta página no tiene contenido de definición disponible para preview");
      }
    } catch (err) {
      alert(`Error al cargar preview: ${err instanceof Error ? err.message : String(err)}`);
      console.error("Preview error:", err);
    } finally {
      setLoadingPreview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Cargando capítulo...</p>
        </div>
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <p className="text-red-600 dark:text-red-400 mb-2 font-semibold">
            {error || "Capítulo no encontrado"}
          </p>
          {chapterId && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              ID del capítulo: <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">{chapterId}</code>
            </p>
          )}
          <div className="flex gap-2 justify-center">
            <Button asChild variant="outline">
              <Link href={`/dashboard/books/${bookId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Libro
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
    <div className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href={`/dashboard/books/${bookId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a {bookId}
            </Link>
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {chapter.name || `Capítulo ${chapter.chapterNumber}`}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                {pages.length} páginas
              </p>
            </div>
            <Button 
              onClick={handlePreviewChapter} 
              variant="outline"
              disabled={loadingPreview || pages.length === 0}
            >
              <Eye className="h-4 w-4 mr-2" />
              {loadingPreview ? "Cargando..." : "Ver Preview"}
            </Button>
          </div>
        </div>

        {/* Pages List */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Páginas
          </h2>

          {pages.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay páginas disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages.map((page) => (
                <Link
                  key={page.id}
                  href={`/dashboard/pages/${page.id}`}
                  className="block"
                >
                  <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
                        Página {page.variant && page.variant > 0 ? `${page.pageNumber}.${page.variant}` : page.pageNumber}
                      </h3>
                      <ChevronRight className="h-4 w-4 text-zinc-400" />
                    </div>
                    {page.processedAt && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Procesada: {new Date(page.processedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

