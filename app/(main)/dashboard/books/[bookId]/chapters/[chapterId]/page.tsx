"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, ChevronRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Chapter } from "@/types/book";
import type { Page } from "@/types/book";

export default function ChapterPage() {
  const params = useParams();
  const bookId = params.bookId as string;
  const chapterId = params.chapterId as string;
  
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch chapter details
        const chapterResponse = await fetch(`/api/chapters/${chapterId}`);
        if (!chapterResponse.ok) {
          throw new Error("Chapter not found");
        }
        const chapterData = await chapterResponse.json();
        setChapter(chapterData.data);
        setPages(chapterData.data.pages || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading chapter");
        console.error("Error fetching chapter data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (chapterId) {
      fetchData();
    }
  }, [chapterId]);

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
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error || "Capítulo no encontrado"}
          </p>
          <Button asChild variant="outline">
            <Link href={`/dashboard/books/${bookId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Libro
            </Link>
          </Button>
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
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            {chapter.name || `Capítulo ${chapter.chapterNumber}`}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {pages.length} páginas
          </p>
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
                        Página {page.pageNumber}
                        {page.variant && page.variant > 0 && (
                          <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-2">
                            (Variante {page.variant})
                          </span>
                        )}
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

