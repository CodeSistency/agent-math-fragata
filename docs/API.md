# API Documentation

## Overview

Esta documentación describe los endpoints de la API del Math Agent Frontend.

## Base URL

Todos los endpoints están disponibles en `/api/*`

## Endpoints

### POST `/api/chat`

Endpoint para interactuar con el agente matemático mediante chat con streaming.

#### Request Body

```json
{
  "messages": [
    {
      "role": "user",
      "content": "texto del mensaje"
    }
  ],
  "threadId": "string (opcional)",
  "resourceId": "string (opcional)"
}
```

#### Response

Streaming response compatible con AI SDK v5.

#### Rate Limiting

- **Limit**: 20 requests per minute per IP
- **Headers**:
  - `X-RateLimit-Limit`: 20
  - `X-RateLimit-Remaining`: número de requests restantes
  - `X-RateLimit-Reset`: timestamp de reset en ISO format
  - `Retry-After`: segundos hasta que el rate limit se resetea

#### Error Responses

- `400 Bad Request`: Invalid request format
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

---

### POST `/api/upload`

Endpoint para subir imágenes y extraer ejercicios matemáticos mediante OCR.

#### Request

- **Content-Type**: `multipart/form-data`
- **Body**: FormData con campo `images` (array de archivos)

#### Constraints

- **Max file size**: 10MB per file
- **Max files**: 10 files per request
- **File types**: Solo imágenes (`image/*`)

#### Response

```json
{
  "success": true,
  "count": 5,
  "exercises": [
    {
      "id": "ej_1234567890_abc123",
      "tema": "Álgebra",
      "subtema": "Sistemas de ecuaciones",
      "dificultad": "media",
      "enunciado": "Resuelve el sistema...",
      "solucion": "x = 5, y = 3",
      "variables": {},
      "image_ref": "imagen.jpg",
      "metadata": {
        "pagina": 42,
        "seccion": "2.3",
        "capitulo": "2"
      }
    }
  ]
}
```

#### Rate Limiting

- **Limit**: 5 requests per hour per IP
- **Headers**: Same as `/api/chat`

#### Error Responses

- `400 Bad Request`: Invalid files or validation errors
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: OCR processing error

---

### GET `/api/exercises`

Endpoint para listar ejercicios con filtros y paginación.

#### Query Parameters

- `tema` (opcional): Filtrar por tema (búsqueda parcial)
- `dificultad` (opcional): Filtrar por dificultad (`básica`, `media`, `avanzada`)
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Ejercicios por página (default: 20, max: 100)

#### Example Request

```
GET /api/exercises?tema=álgebra&dificultad=media&page=1&limit=20
```

#### Response

```json
{
  "success": true,
  "data": {
    "exercises": [
      {
        "id": "ej_1234567890_abc123",
        "tema": "Álgebra",
        "subtema": "Sistemas de ecuaciones",
        "dificultad": "media",
        "enunciado": "Resuelve el sistema...",
        "solucion": "x = 5, y = 3",
        "variables": {},
        "image_ref": "imagen.jpg",
        "metadata": {
          "pagina": 42,
          "seccion": "2.3",
          "capitulo": "2"
        }
      }
    ],
    "total": 50,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

#### Error Responses

- `400 Bad Request`: Invalid query parameters
- `500 Internal Server Error`: Database error

---

## Error Format

Todos los errores siguen este formato:

```json
{
  "error": "Error type",
  "message": "Human-readable error message",
  "details": {} // Opcional, para errores de validación
}
```

## Rate Limiting

El rate limiting se implementa mediante headers HTTP estándar:

- `X-RateLimit-Limit`: Límite total de requests
- `X-RateLimit-Remaining`: Requests restantes en la ventana actual
- `X-RateLimit-Reset`: Timestamp cuando el rate limit se resetea
- `Retry-After`: Segundos hasta que se puede hacer otra request (solo en 429)

## Authentication

Actualmente no se requiere autenticación. Todos los endpoints son públicos pero están protegidos por rate limiting basado en IP.

