"use client";

import { useState, useRef } from "react";
import { Exercise } from "@/types/exercise";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function UploadPageContent() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedExercises, setExtractedExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
    setError(null);

    // Create previews
    const newPreviews = selectedFiles.map((file) => {
      return URL.createObjectURL(file);
    });
    setPreviews(newPreviews);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    
    URL.revokeObjectURL(newPreviews[index]);
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Por favor selecciona al menos una imagen");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError(null);
    setExtractedExercises([]);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al procesar las imágenes");
      }

      const data = await response.json();
      setExtractedExercises(data.exercises || []);
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Subir Imágenes de Ejercicios
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Sube imágenes de páginas de libro para extraer ejercicios matemáticos
          </p>
        </div>

        {/* File Input */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col items-center justify-center space-y-2"
          >
            <svg
              className="w-12 h-12 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="text-zinc-600 dark:text-zinc-400">
              Click para seleccionar imágenes o arrastra y suelta aquí
            </span>
          </button>

          {files.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                {files.length} archivo(s) seleccionado(s)
              </p>
              <div className="flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="relative inline-block group"
                  >
                    <img
                      src={previews[index]}
                      alt={file.name}
                      className="w-24 h-24 object-cover rounded border border-zinc-300 dark:border-zinc-700"
                    />
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 truncate w-24">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upload Button */}
        {files.length > 0 && (
          <div className="mb-6">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {uploading ? "Procesando..." : "Procesar Imágenes"}
            </button>

            {uploading && (
              <div className="mt-4">
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg p-4">
            {error}
          </div>
        )}

        {/* Extracted Exercises */}
        {extractedExercises.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Ejercicios Extraídos ({extractedExercises.length})
            </h2>
            <div className="space-y-4">
              {extractedExercises.map((exercise, index) => (
                <div
                  key={exercise.id || index}
                  className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
                        {exercise.tema}
                        {exercise.subtema && ` - ${exercise.subtema}`}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Dificultad: {exercise.dificultad}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      <strong>Enunciado:</strong> {exercise.enunciado.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UploadPage() {
  return (
    <ErrorBoundary>
      <UploadPageContent />
    </ErrorBoundary>
  );
}



