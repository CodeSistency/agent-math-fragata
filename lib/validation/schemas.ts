import { z } from "zod";

export const BookIdSchema = z.string()
  .min(1, 'Book ID is required')
  .max(50, 'Book ID too long')
  .regex(/^[a-zA-Z0-9_]+$/, 'Book ID must contain only letters, numbers, and underscores');

export const ChapterIdSchema = z.string()
  .min(1, 'Chapter ID is required')
  .max(50, 'Chapter ID too long')
  .regex(/^[a-zA-Z0-9_]+$/, 'Chapter ID must contain only letters, numbers, and underscores');

export const EngineIdSchema = z.string()
  .min(1, 'Engine ID is required')
  .max(100, 'Engine ID too long')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Engine ID must contain only letters, numbers, underscores, and hyphens');

export const SyncRequestSchema = z.object({
  // Add sync-specific validation rules if needed
  bookIds: z.array(BookIdSchema).optional(),
  force: z.boolean().optional(),
});

export const DiscoverEnginesSchema = z.object({
  bookId: BookIdSchema,
  chapterId: ChapterIdSchema,
});

export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message
    }));
    
    const errorMessage = errors.map(e => `${e.field}: ${e.message}`).join(', ');
    throw new Error(`Validation failed: ${errorMessage}`);
  }
  
  return result.data;
}

/**
 * Validate book ID format
 */
export function validateBookId(bookId: string | null): string {
  const result = BookIdSchema.safeParse(bookId);
  
  if (!result.success) {
    throw new Error(`Invalid book ID: ${result.error.issues[0]?.message || 'Unknown error'}`);
  }
  
  return result.data;
}

/**
 * Validate chapter ID format
 */
export function validateChapterId(chapterId: string | null): string {
  const result = ChapterIdSchema.safeParse(chapterId);
  
  if (!result.success) {
    throw new Error(`Invalid chapter ID: ${result.error.issues[0]?.message || 'Unknown error'}`);
  }
  
  return result.data;
}

/**
 * Validate engine ID format
 */
export function validateEngineId(engineId: string | null): string {
  const result = EngineIdSchema.safeParse(engineId);
  
  if (!result.success) {
    throw new Error(`Invalid engine ID: ${result.error.issues[0]?.message || 'Unknown error'}`);
  }
  
  return result.data;
}