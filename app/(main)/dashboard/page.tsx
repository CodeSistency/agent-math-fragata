"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, FileText, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/book";

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  // Load books from API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("/api/books");
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch books");
      }
      
      const data = await response.json();
      if (data.success && data.data) {
        setBooks(data.data);
      } else {
        setBooks([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading books");
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSync = async () => {
    if (!confirm("¿Estás seguro? Esto sincronizará todos los libros desde la carpeta books/ y sobrescribirá los libros existentes.")) {
      return;
    }

    try {
      setSyncing(true);
      setSyncResult(null);
      setError(null);

      const response = await fetch("/api/books/sync", {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to sync books");
      }

      const data = await response.json();
      
      if (data.success) {
        const msg = `Sincronización completada:\n${data.data.successful} exitosos, ${data.data.failed} fallidos\n\nLibros procesados:\n${data.data.books.map((b: any) => `  • ${b.bookId}: ${b.success ? '✓ Exitoso' : '✗ Error'}${b.summary ? ` (${b.summary.chaptersCreated} capítulos, ${b.summary.pagesCreated} páginas, ${b.summary.exercisesExtracted} ejercicios)` : ''}${b.error ? ` - ${b.error}` : ''}`).join('\n')}`;
        setSyncResult(msg);
        
        // Reload books list - wait a bit to ensure DB is consistent
        await new Promise(resolve => setTimeout(resolve, 500));
        await fetchBooks();
        
        // Clear sync result after 10 seconds
        setTimeout(() => setSyncResult(null), 10000);
      } else {
        throw new Error("Sincronización falló");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al sincronizar");
      console.error("Error syncing books:", err);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Dashboard de Libros
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Gestiona tus libros matemáticos y navega por su contenido
          </p>
        </div>

        {/* Books Grid */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Libros ({books.length})
            </h2>
            <div className="flex gap-2">
              <Button
                onClick={handleSync}
                disabled={syncing}
                variant="outline"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? "Sincronizando..." : "Sincronizar Libros"}
              </Button>
              <Button asChild>
                <Link href="/upload">
                  <Plus className="h-4 w-4 mr-2" />
                  Subir Libro Completo
                </Link>
              </Button>
            </div>
          </div>

          {syncResult && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <pre className="text-sm text-blue-900 dark:text-blue-300 whitespace-pre-wrap font-mono">
                {syncResult}
              </pre>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Cargando libros...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No hay libros disponibles</p>
              <p className="text-sm">
                Click en "Sincronizar Libros" para detectar libros desde la carpeta books/
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map((book) => (
                <Link
                  key={book.id}
                  href={`/dashboard/books/${book.id}`}
                  className="block"
                >
                  <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 hover:shadow-md transition-shadow bg-white dark:bg-zinc-800">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                          {book.name}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Código: {book.code}
                        </p>
                      </div>
                      <BookOpen className="h-6 w-6 text-zinc-400 dark:text-zinc-600" />
                    </div>

                    <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>
                          {book.metadata?.totalChapters || 0} capítulos
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>
                          {book.metadata?.totalPages || 0} páginas
                        </span>
                      </div>
                    </div>

                    {book.version && (
                      <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          Versión: {book.version}
                        </span>
                      </div>
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
