import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl text-center space-y-8">
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-zinc-50">
            Agente Matemático
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Genera y gestiona ejercicios matemáticos con IA
          </p>
          <p className="text-lg text-zinc-500 dark:text-zinc-500">
            Sube imágenes de libros, extrae ejercicios automáticamente y genera
            variaciones usando Gemini y RAG
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/chat"
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Iniciar Chat
            </Link>
            <Link
              href="/upload"
              className="px-8 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium"
            >
              Subir Imágenes
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium"
            >
              Dashboard
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                OCR Inteligente
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Extrae ejercicios de imágenes de libros usando Tesseract.js
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Generación con IA
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Crea variaciones de ejercicios usando modelos Gemini
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Búsqueda RAG
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Encuentra ejercicios similares usando embeddings semánticos
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
