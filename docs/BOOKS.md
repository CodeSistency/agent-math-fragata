# Sistema de Gestión de Libros

## Visión General

El sistema de libros permite gestionar libros matemáticos con estructura jerárquica:
- **Book** (Libro): Contenedor principal
- **Chapter** (Capítulo): División dentro del libro
- **Page** (Página): Páginas individuales dentro de un capítulo

Cada página puede contener:
- Archivos de definición (`.js`) con `defBoards` y `rDef`
- Engines JavaScript para renderizado dinámico
- Ejercicios extraídos mediante OCR o procesamiento de definiciones

## Estructura de Carpetas

Los libros deben seguir esta estructura en `books/{BOOK_ID}/`:

```
books/
└── {BOOK_ID}/
    └── book/
        ├── definitions/
        │   ├── cap_1/
        │   │   ├── pag_1.js
        │   │   ├── pag_1_1.js   # Variante
        │   │   └── pag_2.js
        │   └── cap_2/
        │       └── pag_1.js
        └── class/
            └── engines/
                ├── cap_1/
                │   ├── heightCurves.js
                │   └── otherEngine.js
                ├── cap_2/
                │   └── someEngine.js
                └── genericEngines/
                    └── genericEngine.js
```

## Formatos de Archivos

### Archivos de Definición (`pag_X.js`)

Los archivos de definición deben contener:
- `defBoards`: Objeto con configuración de boards JSXGraph
- `rDef`: Objeto con definición de artefactos y preguntas

Ejemplo mínimo:
```javascript
let defBoards = {
  board_1: {
    style: { /* ... */ },
    lines: [ /* ... */ ],
  }
};

const rDef = {
  artifactHtml: {
    datadefault: [
      {
        contents: {
          artifact_1: {
            questions: [
              {
                question: "Enunciado del ejercicio",
                // ... más datos
              }
            ]
          }
        }
      }
    ]
  }
};
```

### Engines (`*.js`)

Los engines son archivos JavaScript que:
- Reciben `defBoards` y `rDef` como variables globales
- Renderizan contenido usando JSXGraph
- Pueden tener funciones como `generator()`, `defBoardDefault()`, `createHtml()`

## API Endpoints

### Libros

- `GET /api/books` - Lista todos los libros
- `GET /api/books/[bookId]` - Detalles de un libro
- `POST /api/books` - Crear libro manualmente
- `POST /api/books/upload` - Subir y procesar libro completo
- `DELETE /api/books/[bookId]` - Eliminar libro completo

### Capítulos

- `GET /api/books/[bookId]/chapters` - Lista capítulos de un libro
- `GET /api/chapters/[chapterId]` - Detalles de un capítulo

### Páginas

- `GET /api/chapters/[chapterId]/pages` - Lista páginas de un capítulo
- `POST /api/chapters/[chapterId]/pages` - Subir archivos a páginas específicas
- `GET /api/pages/[pageId]` - Detalles de una página con contenido

### Engines

- `GET /api/engines/[...path]` - Sirve archivos JavaScript de engines

### Ejercicios

- `GET /api/exercises?bookId=X&chapterId=Y&pageId=Z` - Lista ejercicios con filtros por contexto de libro

## Vector Store con Namespacing

Cada libro tiene su propio índice vectorial:
- Índice global: `exercises` (para ejercicios sin contexto de libro)
- Índice por libro: `{bookId}_exercises` (para ejercicios de un libro específico)

Esto permite:
- Búsquedas independientes por libro
- Eliminación completa al sobrescribir un libro
- Mejor organización y rendimiento

## Procesamiento de Libros

Al subir un libro completo (`POST /api/books/upload`):

1. **Parsing**: Escanea `books/{bookId}/book/definitions/` y detecta estructura
2. **Validación**: Verifica que no haya duplicados y estructura válida
3. **Sobrescritura**: Si el libro existe, elimina:
   - Índice vectorial anterior
   - Ejercicios asociados
   - Capítulos y páginas anteriores
4. **Creación**: Crea registros en base de datos:
   - Book
   - Chapters
   - Pages
5. **Procesamiento**: Para cada página:
   - Parsea archivo de definición
   - Extrae `defBoards` y `rDef`
   - Genera ejercicios desde definiciones
   - Guarda contenido procesado
6. **Indexación**: Indexa todos los ejercicios en vector store con contexto completo

## Componente ArtifactPreview

El componente `ArtifactPreview` permite:
- **Selector de Engine**: Seleccionar entre engines disponibles para el capítulo
- **Vista Preview/Code/Split**: Alternar entre vistas
- **Editor JSON**: Editar `defBoards` y `rDef` en tiempo real
- **Preview Dinámico**: Renderizado usando JSXGraph en iframe sandbox

### Uso

```tsx
<ArtifactPreview
  bookId="MG"
  chapterId="MG_cap_1"
  pageId="MG_cap_1_pag_1"
  initialEngine="MG_cap_1_heightCurves"
  initialDefinition={{
    defBoards: { /* ... */ },
    rDef: { /* ... */ }
  }}
/>
```

## Base de Datos

### Tablas

- `books`: Información de libros
- `chapters`: Capítulos con referencia a libro
- `pages`: Páginas con referencia a capítulo
- `exercises`: Ejercicios con referencias opcionales a book/chapter/page
- `migrations`: Control de migraciones

### Relaciones

- Book → Chapters (1:N, cascade delete)
- Chapter → Pages (1:N, cascade delete)
- Page → Exercises (1:N, sin cascade para preservar historial)

## Consideraciones

### Seguridad

- Validación de paths para prevenir directory traversal en endpoint de engines
- Sandbox en iframe para ejecución segura de engines
- Validación de tipos de archivo y tamaños

### Rendimiento

- Procesamiento batch asíncrono para libros grandes
- Caching de discovery de engines
- Paginación en todas las listas
- Índices vectoriales separados por libro

### Compatibilidad

- Mantiene compatibilidad con ejercicios sin contexto de libro
- Endpoints existentes (`/api/exercises`, `/api/upload`) siguen funcionando
- Metadata de ejercicios es extendible sin romper esquemas existentes

