"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, ChevronRight, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/book";
import type { Chapter } from "@/types/book";
import type { Page } from "@/types/book";

export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.bookId as string;
  
  const [book, setBook] = useState<Book | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Encode bookId for URL (in case it has special characters)
        const encodedBookId = encodeURIComponent(bookId);

        // Fetch book details
        const bookResponse = await fetch(`/api/books/${encodedBookId}`);
        if (!bookResponse.ok) {
          const errorData = await bookResponse.json().catch(() => ({}));
          const errorMessage = errorData.message || errorData.error || `Book not found (status: ${bookResponse.status})`;
          throw new Error(errorMessage);
        }
        const bookData = await bookResponse.json();
        
        if (!bookData.success || !bookData.data) {
          throw new Error("Invalid response format from server");
        }
        
        setBook(bookData.data);

        // Fetch chapters
        const chaptersResponse = await fetch(`/api/books/${encodedBookId}/chapters`);
        if (!chaptersResponse.ok) {
          const errorData = await chaptersResponse.json().catch(() => ({}));
          const errorMessage = errorData.message || errorData.error || "Failed to fetch chapters";
          console.warn("Failed to fetch chapters:", errorMessage);
          // Don't throw, just log and continue with empty chapters
        } else {
          const chaptersData = await chaptersResponse.json();
          setChapters(chaptersData.data || []);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error loading book";
        setError(errorMessage);
        console.error("Error fetching book data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchData();
    }
  }, [bookId]);

  const handleUploadBook = async () => {
    if (!confirm("¿Estás seguro? Esto sobrescribirá todo el contenido del libro.")) {
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append("bookId", bookId);
    formData.append("bookName", book?.name || bookId);
    formData.append("bookCode", book?.code || bookId);

    try {
      const response = await fetch("/api/books/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload book");
      }

      const data = await response.json();
      alert(`Libro procesado exitosamente:\n${JSON.stringify(data.data.summary, null, 2)}`);
      
      // Reload page data
      window.location.reload();
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handlePreviewBook = async () => {
    if (!bookId || chapters.length === 0) {
      alert("No hay capítulos disponibles para preview");
      return;
    }

    setLoadingPreview(true);
    try {
      // Get first chapter
      const firstChapter = chapters[0];
      
      // Get pages for first chapter
      const pagesResponse = await fetch(`/api/chapters/${encodeURIComponent(firstChapter.id)}/pages`);
      if (!pagesResponse.ok) {
        throw new Error("Failed to fetch pages");
      }
      
      const pagesData = await pagesResponse.json();
      const pages: Page[] = pagesData.data || [];
      
      if (pages.length === 0) {
        alert("No hay páginas disponibles para preview");
        return;
      }

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
        params.set("chapterId", firstChapter.id);
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
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Cargando libro...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <p className="text-red-600 dark:text-red-400 mb-2 font-semibold">
            {error || "Libro no encontrado"}
          </p>
          {bookId && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              ID del libro: <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">{bookId}</code>
            </p>
          )}
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Si acabas de sincronizar, espera unos segundos y recarga la página.
          </p>
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
    <div className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Libros
            </Link>
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {book.name}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Código: {book.code} • {chapters.length} capítulos • {book.metadata?.totalPages || 0} páginas
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handlePreviewBook} 
                variant="outline"
                disabled={loadingPreview || chapters.length === 0}
              >
                <Eye className="h-4 w-4 mr-2" />
                {loadingPreview ? "Cargando..." : "Ver Preview"}
              </Button>
              <Button onClick={handleUploadBook} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Sobrescribir Libro
              </Button>
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Capítulos
          </h2>

          {chapters.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay capítulos disponibles</p>
            </div>
          ) : (
            <div className="space-y-2">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/dashboard/books/${bookId}/chapters/${chapter.id}`}
                  className="block"
                >
                  <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold">
                        {chapter.chapterNumber}
                      </div>
                      <div>
                        <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
                          {chapter.name || `Capítulo ${chapter.chapterNumber}`}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          {chapter.totalPages} páginas
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-zinc-400" />
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

