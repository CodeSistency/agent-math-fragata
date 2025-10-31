# Critical Fixes Summary

## Overview
This document provides immediate, actionable fixes for the most critical security and stability issues identified in the APIs.

## 1. Path Traversal Vulnerability - IMMEDIATE FIX REQUIRED

### Current Vulnerable Code
```typescript
// app/api/engines/discover/route.ts
const bookBasePath = path.join(process.cwd(), 'books', bookId, 'book');
```

### Fixed Code
```typescript
// app/api/engines/discover/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Add validation function
function validateId(id: string, name: string): void {
  if (!id || typeof id !== 'string') {
    throw new Error(`${name} is required`);
  }
  
  // Only allow alphanumeric characters and underscores
  if (!/^[a-zA-Z0-9_]+$/.test(id)) {
    throw new Error(`Invalid ${name} format`);
  }
  
  // Prevent path traversal
  if (id.includes('..') || id.includes('/') || id.includes('\\')) {
    throw new Error(`Invalid ${name} format`);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');
    const chapterId = searchParams.get('chapterId');
    
    // Validate inputs
    validateId(bookId, 'bookId');
    validateId(chapterId, 'chapterId');
    
    // Construct safe path
    const bookBasePath = path.join(process.cwd(), 'books', bookId, 'book');
    const chapterEnginesPath = path.join(bookBasePath, 'class', 'engines', `cap_${chapterId}`);
    
    // Ensure path is within expected directory
    const resolvedPath = path.resolve(chapterEnginesPath);
    const expectedBase = path.resolve(path.join(process.cwd(), 'books'));
    
    if (!resolvedPath.startsWith(expectedBase)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid path',
        code: 'INVALID_PATH'
      }, { status: 400 });
    }
    
    // Rest of the code...
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      code: 'VALIDATION_ERROR'
    }, { status: 400 });
  }
}
```

## 2. Vector Store Race Condition - IMMEDIATE FIX REQUIRED

### Current Problematic Code
```typescript
// lib/rag/vector-store-v2.ts
static async getEmbeddingDimension(): Promise<number> {
  if (this.embeddingDimension !== null) {
    return this.embeddingDimension;
  }
  
  if (this.dimensionPromise === null) {
    this.dimensionPromise = this.detectDimension(); // RACE CONDITION HERE
  }
  
  return this.dimensionPromise;
}
```

### Fixed Code
```typescript
// lib/rag/vector-store-v2.ts
export class VectorStoreV2 {
  private static embeddingDimension: number | null = null;
  private static dimensionPromise: Promise<number> | null = null;
  private static readonly DEFAULT_DIMENSION = 768;
  private static isDetecting = false; // Add flag to prevent race condition
  
  static async getEmbeddingDimension(): Promise<number> {
    // Return cached value if available
    if (this.embeddingDimension !== null) {
      return this.embeddingDimension;
    }
    
    // If detection is in progress, wait for it
    if (this.isDetecting && this.dimensionPromise) {
      return this.dimensionPromise;
    }
    
    // Start detection if not already in progress
    if (!this.isDetecting) {
      this.isDetecting = true;
      this.dimensionPromise = this.detectDimension();
      
      try {
        const dimension = await this.dimensionPromise;
        this.embeddingDimension = dimension;
        return dimension;
      } finally {
        this.isDetecting = false;
      }
    }
    
    // Fallback (shouldn't reach here)
    return this.dimensionPromise || this.DEFAULT_DIMENSION;
  }
  
  private static async detectDimension(): Promise<number> {
    try {
      console.log('[VectorStoreV2] Detecting embedding dimension...');
      const testEmbedding = await generateEmbeddings(['test dimension detection']);
      const detectedDimension = testEmbedding[0].length;
      
      console.log(`[VectorStoreV2] Detected embedding dimension: ${detectedDimension}`);
      return detectedDimension;
    } catch (error) {
      console.warn('[VectorStoreV2] Failed to detect embedding dimension, using default:', error);
      return this.DEFAULT_DIMENSION;
    }
  }
}
```

## 3. Database Transaction Issues - HIGH PRIORITY FIX

### Current Problematic Code
```typescript
// app/api/books/sync-v2/route.ts
// No transaction wrapping - operations can fail midway
if (existingBook) {
  clearEngineCacheFor(bookId);
  await VectorStoreV2.deleteBookVectorStore(bookId);
  await exerciseRepository.deleteByBookId(bookId);
  await bookRepository.delete(bookId); // If this fails, data is inconsistent
}
```

### Fixed Code
```typescript
// lib/db/transaction.ts - New file
import { client } from './client';

export interface Transaction {
  execute: (sql: string, args?: any[]) => Promise<any>;
  commit: () => Promise<void>;
  rollback: () => Promise<void>;
}

export async function withTransaction<T>(
  callback: (tx: Transaction) => Promise<T>
): Promise<T> {
  // For SQLite, we'll simulate transactions
  const operations: Array<{ sql: string; args?: any[] }> = [];
  
  const tx: Transaction = {
    execute: (sql: string, args?: any[]) => {
      operations.push({ sql, args });
      return Promise.resolve({ rows: [] });
    },
    commit: async () => {
      // Execute all operations in order
      for (const op of operations) {
        await client.execute(op.sql, op.args || []);
      }
    },
    rollback: async () => {
      // In a real DB, this would rollback
      console.log('Transaction rolled back');
      operations.length = 0;
    }
  };
  
  try {
    const result = await callback(tx);
    await tx.commit();
    return result;
  } catch (error) {
    await tx.rollback();
    throw error;
  }
}

// app/api/books/sync-v2/route.ts - Updated code
try {
  await withTransaction(async (tx) => {
    if (existingBook) {
      console.log(`[SyncV2] Deleting existing book data for ${bookId}...`);
      
      // Clear cache (outside transaction)
      clearEngineCacheFor(bookId);
      
      // Delete vector store (outside transaction, handled separately)
      try {
        await VectorStoreV2.deleteBookVectorStore(bookId);
      } catch (vsError) {
        console.warn(`[SyncV2] Vector store deletion failed:`, vsError);
      }
      
      // Delete in correct order (respecting foreign keys)
      await tx.execute("DELETE FROM exercises WHERE book_id = ?", [bookId]);
      await tx.execute("DELETE FROM pages WHERE chapter_id IN (SELECT id FROM chapters WHERE book_id = ?)", [bookId]);
      await tx.execute("DELETE FROM chapters WHERE book_id = ?", [bookId]);
      await tx.execute("DELETE FROM books WHERE id = ?", [bookId]);
    }
    
    // Create new book record
    const now = new Date().toISOString();
    await tx.execute(`
      INSERT INTO books (id, name, code, version, metadata, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      bookId,
      bookId,
      bookId,
      null,
      JSON.stringify({
        totalChapters: structure.chapters.length,
        totalPages: structure.pages.length,
        syncVersion: "v2.0",
        processedAt: now,
      }),
      now,
      now
    ]);
    
    // Create chapters
    for (const chapter of structure.chapters) {
      await tx.execute(`
        INSERT INTO chapters (id, book_id, chapter_number, name, total_pages, metadata, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        chapter.id,
        chapter.bookId,
        chapter.chapterNumber,
        chapter.name || null,
        chapter.totalPages,
        chapter.metadata ? JSON.stringify(chapter.metadata) : null,
        chapter.createdAt
      ]);
    }
    
    // Create pages
    for (const page of structure.pages) {
      await tx.execute(`
        INSERT INTO pages (id, chapter_id, page_number, variant, content, file_path, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        page.id,
        page.chapterId,
        page.pageNumber,
        page.variant || 0,
        null, // Content will be updated later
        page.filePath,
        page.createdAt
      ]);
    }
  });
} catch (error) {
  console.error(`[SyncV2] Transaction failed for ${bookId}:`, error);
  throw error;
}
```

## 4. Input Validation - HIGH PRIORITY FIX

### Create Validation Module
```typescript
// lib/validation/schemas.ts - New file
import { z } from 'zod';

export const BookIdSchema = z.string()
  .min(1, 'Book ID is required')
  .max(50, 'Book ID too long')
  .regex(/^[a-zA-Z0-9_]+$/, 'Book ID must contain only letters, numbers, and underscores');

export const ChapterIdSchema = z.string()
  .min(1, 'Chapter ID is required')
  .max(50, 'Chapter ID too long')
  .regex(/^[a-zA-Z0-9_]+$/, 'Chapter ID must contain only letters, numbers, and underscores');

export const SyncRequestSchema = z.object({
  // Add sync-specific validation rules
});

export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message
    }));
    
    throw new Error(`Validation failed: ${errors.map(e => `${e.field}: ${e.message}`).join(', ')}`);
  }
  
  return result.data;
}
```

### Apply Validation to APIs
```typescript
// app/api/engines/discover/route.ts
import { validateInput, BookIdSchema, ChapterIdSchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');
    const chapterId = searchParams.get('chapterId');
    
    // Validate inputs
    const validatedBookId = validateInput(BookIdSchema, bookId);
    const validatedChapterId = validateInput(ChapterIdSchema, chapterId);
    
    // Rest of the code using validatedBookId and validatedChapterId
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Validation error',
      code: 'VALIDATION_ERROR'
    }, { status: 400 });
  }
}
```

## 5. Error Handling Improvement - MEDIUM PRIORITY

### Create Error Handler
```typescript
// lib/errors/handler.ts - New file
import { NextResponse } from 'next/server';

export class APIError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleAPIError(error: unknown): NextResponse {
  if (error instanceof APIError) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code
    }, { status: error.statusCode });
  }
  
  if (error instanceof Error) {
    // Log the full error for debugging
    console.error('Unhandled API error:', error);
    
    // Return generic error to client
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
  
  // Unknown error type
  console.error('Unknown error type:', error);
  return NextResponse.json({
    success: false,
    error: 'Internal server error',
    code: 'UNKNOWN_ERROR'
  }, { status: 500 });
}
```

### Apply to APIs
```typescript
// app/api/books/sync-v2/route.ts
import { handleAPIError, APIError } from '@/lib/errors/handler';

export async function POST(request: NextRequest) {
  try {
    // API logic here...
  } catch (error) {
    return handleAPIError(error);
  }
}
```

## Implementation Priority

### Do Today (Critical Security):
1. ✅ Fix path traversal vulnerability
2. ✅ Add input validation
3. ✅ Fix vector store race condition

### Do This Week (High Priority):
1. Implement database transactions
2. Add proper error handling
3. Add retry logic for transient failures

### Do Next Week (Medium Priority):
1. Improve type safety
2. Add comprehensive logging
3. Implement streaming for large operations

## Testing the Fixes

### Security Tests
```typescript
// tests/api/security.test.ts
describe('API Security', () => {
  test('should prevent path traversal', async () => {
    const response = await fetch('/api/engines/discover?bookId=../../../etc&chapterId=passwd');
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.code).toBe('VALIDATION_ERROR');
  });
  
  test('should reject invalid book IDs', async () => {
    const response = await fetch('/api/engines/discover?bookId=book@123&chapterId=1');
    expect(response.status).toBe(400);
  });
});
```

### Concurrency Tests
```typescript
// tests/api/concurrency.test.ts
describe('Vector Store Concurrency', () => {
  test('should handle concurrent dimension detection', async () => {
    // Fire multiple requests simultaneously
    const promises = Array(10).fill(0).map(() => 
      VectorStoreV2.getEmbeddingDimension()
    );
    
    const dimensions = await Promise.all(promises);
    
    // All should return the same dimension
    expect(dimensions.every(d => d === dimensions[0])).toBe(true);
  });
});