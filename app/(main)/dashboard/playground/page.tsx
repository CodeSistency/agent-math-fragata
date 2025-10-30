"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Playground } from "@/components/playground/Playground";

function PlaygroundContent() {
  const searchParams = useSearchParams();
  
  // Get initial values from URL params
  const bookId = searchParams.get("bookId") || undefined;
  const chapterId = searchParams.get("chapterId") || undefined;
  const pageId = searchParams.get("pageId") || undefined;
  const engineId = searchParams.get("engineId") || undefined;
  
  // Parse initial definition from URL if provided
  const initialDefinitionParam = searchParams.get("definition");
  let initialDefinition: any = undefined;
  
  if (initialDefinitionParam) {
    try {
      initialDefinition = JSON.parse(decodeURIComponent(initialDefinitionParam));
    } catch (err) {
      console.warn("Could not parse definition from URL:", err);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 bg-white dark:bg-zinc-950">
        <div className="max-w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href={pageId ? `/dashboard/pages/${pageId}` : chapterId ? `/dashboard/books/${bookId}/chapters/${chapterId}` : bookId ? `/dashboard/books/${bookId}` : "/dashboard"}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Link>
            </Button>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Playground de Artefactos
            </h1>
          </div>
        </div>
      </div>

      {/* Playground Content */}
      <div className="flex-1 overflow-hidden">
        <Playground
          bookId={bookId}
          chapterId={chapterId}
          initialDefinition={initialDefinition}
          initialEngine={engineId}
        />
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Cargando playground...</p>
        </div>
      </div>
    }>
      <PlaygroundContent />
    </Suspense>
  );
}

