# Math Agent Frontend

Agente matemático monolítico para generar y gestionar ejercicios matemáticos usando Mastra, Gemini y RAG. Sistema completo de gestión de libros matemáticos con estructura jerárquica (Book → Chapter → Page) y previsualización dinámica de artefactos.

## Características

- **OCR Inteligente**: Extracción automática de ejercicios de imágenes usando Tesseract.js con procesamiento paralelo
- **Generación con IA**: Creación de variaciones de ejercicios usando modelos Gemini
- **Búsqueda RAG**: Búsqueda semántica de ejercicios usando embeddings gratuitos con caching y namespacing por libro
- **Chat Interactivo**: Interfaz de chat con streaming en tiempo real usando AI Elements
- **Dashboard Jerárquico**: Navegación completa Book → Chapter → Page con gestión de contenido
- **Sistema de Libros**: Gestión completa de libros matemáticos con estructura jerárquica
- **Previsualización de Artefactos**: Componente dinámico para visualizar ejercicios con engines JavaScript y JSXGraph
- **Rate Limiting**: Protección contra abuso con límites por IP
- **Validación Robusta**: Validación de env vars y manejo de errores mejorado

## Stack Tecnológico

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS
- **IA**: Mastra (@mastra/core, @mastra/rag, @mastra/libsql, @mastra/memory)
- **Modelos**: Google Gemini (via @ai-sdk/google)
- **Embeddings**: Google gemini-embedding-001 (gratuito)
- **Base de Datos**: LibSQL/Turso
- **OCR**: Tesseract.js
- **Streaming**: AI SDK (@ai-sdk/react)

## Configuración

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` con:

```env
GOOGLE_GENERATIVE_AI_API_KEY=tu_api_key_gemini
DATABASE_URL=file:./mastra.db
DATABASE_AUTH_TOKEN=  # Solo necesario para Turso cloud
```

### 3. Ejecutar en desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
math-agent-front-v1/
├── app/
│   ├── (main)/                    # Páginas con layout compartido
│   │   ├── chat/                  # Interfaz de chat
│   │   ├── upload/                # Subida de imágenes
│   │   └── dashboard/             # Dashboard jerárquico
│   │       ├── page.tsx           # Lista de libros
│   │       ├── books/[bookId]/    # Vista de libro (capítulos)
│   │       └── pages/[pageId]/   # Vista de página individual
│   └── api/                       # API routes
│       ├── chat/                  # Endpoint de chat con streaming
│       ├── upload/                # Endpoint de procesamiento OCR
│       ├── exercises/             # Endpoint para listar ejercicios
│       ├── books/                 # Endpoints de gestión de libros
│       ├── chapters/              # Endpoints de capítulos
│       ├── pages/                 # Endpoints de páginas
│       ├── engines/               # Servir archivos JavaScript de engines
│       └── init/                 # Inicialización de base de datos
├── lib/
│   ├── mastra/                    # Configuración Mastra
│   │   ├── agent.ts               # Agentes (supervisor, extraction, intent, variation)
│   │   ├── tools/                 # Tools del agente
│   │   └── memory.ts              # Configuración de memoria
│   ├── rag/                       # RAG y embeddings (con caching y namespacing)
│   ├── ocr/                       # Procesamiento OCR (paralelo)
│   ├── books/                     # Sistema de libros
│   │   ├── parser.ts              # Parser de estructura de libros
│   │   ├── definition-processor.ts # Procesador de archivos de definición
│   │   └── engine-discovery.ts    # Discovery de engines disponibles
│   ├── db/                        # Base de datos
│   │   ├── client.ts              # Cliente LibSQL
│   │   ├── migrations.ts          # Migraciones de base de datos
│   │   ├── repositories.ts        # Repositorios CRUD
│   │   └── init.ts               # Inicialización
│   ├── middleware/                # Rate limiting y utilidades
│   └── utils/                     # Utilidades (MathJax, formateo, etc.)
├── components/                    # Componentes React
│   ├── ai-elements/               # Componentes de AI Elements
│   ├── artifact/                  # Componentes de artefactos
│   │   └── ArtifactPreview.tsx   # Preview dinámico de artefactos
│   ├── ui/                        # Componentes de shadcn/ui
│   └── exercise/                  # Componentes específicos de ejercicios
├── types/                         # Tipos TypeScript
│   ├── exercise.ts               # Schema de ejercicios
│   └── book.ts                   # Schemas de libros, capítulos, páginas
├── prompts/                       # Prompts para el agente
├── books/                         # Estructura de libros
│   └── {BOOK_ID}/                # Carpeta por libro
│       └── book/
│           ├── definitions/      # Archivos de definición por capítulo
│           └── class/engines/    # Engines JavaScript por capítulo
└── docs/                          # Documentación
    ├── API.md                     # Documentación de APIs
    └── BOOKS.md                   # Documentación del sistema de libros
```

## Uso

### Gestión de Libros

1. **Subir Libro Completo**:
   - Ve a `/dashboard`
   - Click en "Subir Libro Completo"
   - Proporciona `bookId`, `bookName` y `bookCode`
   - El sistema procesará toda la estructura del libro desde `books/{bookId}/book/`
   - Esto sobrescribirá cualquier contenido anterior del libro

2. **Navegación Jerárquica**:
   - Dashboard principal: Lista de todos los libros
   - Vista de libro: Lista de capítulos con estadísticas
   - Vista de capítulo: Lista de páginas del capítulo
   - Vista de página: Contenido completo, ejercicios y preview de artefactos

3. **Subir Archivos a Páginas Específicas**:
   - Navega a una página específica
   - Usa el endpoint `/api/chapters/[chapterId]/pages` para subir imágenes
   - Los ejercicios se indexarán asociados a esa página

### Previsualización de Artefactos

1. Navega a una página que tenga definiciones (`defBoards` y `rDef`)
2. Click en "Ver Preview"
3. Selecciona un engine del dropdown
4. Edita el JSON de la definición en el editor
5. Observa el preview en tiempo real con renderizado JSXGraph

### Chat con el Agente

1. Ve a `/chat`
2. Escribe mensajes como:
   - "Encuentra ejercicios de álgebra básica"
   - "Genera una variación de un ejercicio de derivadas"
   - "Busca ejercicios del libro MG capítulo 2"
3. El agente responderá en tiempo real con streaming

### Dashboard

1. Ve a `/dashboard`
2. Visualiza todos los libros disponibles
3. Navega jerárquicamente: Libro → Capítulo → Página
4. Cada nivel muestra estadísticas y contenido relevante

## Desarrollo

### Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta el linter

## Mejoras Implementadas

### Seguridad y Validación
- ✅ Validación de variables de entorno con Zod
- ✅ Rate limiting en todos los endpoints (20 req/min para chat, 5 req/hora para upload)
- ✅ Validación de tamaño y tipo de archivos (max 10MB, solo imágenes)
- ✅ Manejo de errores mejorado con mensajes informativos

### Rendimiento
- ✅ Caching de embeddings con LRU cache (1000 entradas, 24h TTL)
- ✅ Procesamiento paralelo de imágenes OCR
- ✅ Paginación eficiente en dashboard

### UX
- ✅ Dashboard completamente funcional con API
- ✅ Error boundaries en componentes críticos
- ✅ Componentes de AI Elements integrados
- ✅ Paginación y filtros en dashboard

### Infraestructura
- ✅ Endpoint `/api/exercises` para listar ejercicios
- ✅ Documentación de APIs en `docs/API.md`
- ✅ Arquitectura mejorada con validación centralizada

## Notas

- La base de datos se crea automáticamente en `./mastra.db` para desarrollo local
- Para producción, usa Turso y configura `DATABASE_URL` y `DATABASE_AUTH_TOKEN`
- Los embeddings usan el modelo gratuito de Google (gemini-embedding-001) con caching
- El OCR procesa imágenes en paralelo para mejor rendimiento
- Las variables de entorno se validan al inicio de la aplicación

## Documentación

- [Documentación de APIs](./docs/API.md)

## Próximos Pasos

- [ ] Agregar exportación a PDF
- [ ] Implementar tests unitarios e integración
- [ ] Agregar métricas y analytics
- [ ] Optimizar queries de vector store para grandes volúmenes
