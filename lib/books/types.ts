/**
 * Type definitions for books and engines
 * These can be safely imported in client components
 */

export interface Engine {
  id: string;
  name: string;
  file: string; // Relative path from books/ root
  description?: string;
  chapterId?: string;
  bookId?: string; // Book ID (MG, NV, etc.)
}


