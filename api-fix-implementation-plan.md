# API Fix Implementation Plan

## Overview
This document provides a detailed implementation plan to fix the identified issues in the sync-v2 and engines/discover APIs.

## Phase 1: Critical Security and Stability Fixes

### 1.1 Fix Path Traversal Vulnerability in engines/discover

**File**: `app/api/engines/discover/route.ts`

**Changes**:
```typescript
// Add input validation function
function validateBookAndChapterIds(bookId: string, chapterId: string): boolean {
  // Validate format: alphanumeric with underscores only
  const validIdPattern = /^[a-zA-Z0-9_]+$/;
  return validIdPattern.test(bookId) && validIdPattern.test(chapterId);
}

// Update GET handler
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');
    const chapterId = searchParams.get('chapterId');
    
    // Validate inputs
    if (!bookId || !chapterId) {
      return NextResponse.json({
        success: false,
        error: 'Both bookId and chapterId are required',
        code: 'MISSING_PARAMS'
      }, { status: 400 });
    }
    
    // Security validation
    if (!validateBookAndChapterIds(bookId, chapterId)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid bookId or chapterId format',
        code: 'INVALID_PARAMS'
      }, { status: 400 });
    }
    
    // Rest of the code...
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
```

### 1.2 Fix Vector Store Race Condition

**File**: `lib/rag/vector-store-v2.ts`

**Changes**:
```typescript
export class VectorStoreV2 {
  private static embeddingDimension: number | null = null;
  private static dimensionPromise: Promise<number> | null = null;
  private static readonly DEFAULT_DIMENSION = 768;
  private static dimensionMutex = false; // Add mutex flag

  static async getEmbeddingDimension(): Promise<number> {
    if (this.embeddingDimension !== null) {
      return this.embeddingDimension;
    }
    
    // Wait if another operation is detecting dimension
    while (this.dimensionMutex) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Check again after waiting
    if (this.embeddingDimension !== null) {
      return this.embeddingDimension;
    }
    
    // Set mutex and detect dimension
    this.dimensionMutex = true;
    try {
      if (this.dimensionPromise === null) {
        this.dimensionPromise = this.detectDimension();
      }
      
      const dimension = await this.dimensionPromise;
      this.embeddingDimension = dimension;
      return dimension;
    } finally {
      this.dimensionMutex = false;
    }
  }
}
```

### 1.3 Add Database Transactions to sync-v2

**File**: `lib/db/client.ts` (Add transaction support)

**Changes**:
```typescript
// Add transaction support to client
export async function withTransaction<T>(
  callback: (tx: Transaction) => Promise<T>
): Promise<T> {
  const tx = client.transaction();
  try {
    const result = await callback(tx);
    await tx.commit();
    return result;
  } catch (error) {
    await tx.rollback();
    throw error;
  }
}

export interface Transaction {
  execute: typeof client.execute;
  commit: () => Promise<void>;
  rollback: () => Promise<void>;
}
```

**File**: `app/api/books/sync-v2/route.ts` (Update sync function)

**Changes**:
```typescript
// Wrap book processing in transaction
try {
  await withTransaction(async (tx) => {
    // Delete old data if exists
    if (existingBook) {
      console.log(`[SyncV2] Deleting existing book data for ${bookId}...`);
      clearEngineCacheFor(bookId);
      
      // Delete in correct order (respecting foreign keys)
      await tx.execute("DELETE FROM exercises WHERE book_id = ?", [bookId]);
      await tx.execute("DELETE FROM pages WHERE chapter_id IN (SELECT id FROM chapters WHERE book_id = ?)", [bookId]);
      await tx.execute("DELETE FROM chapters WHERE book_id = ?", [bookId]);
      await tx.execute("DELETE FROM books WHERE id = ?", [bookId]);
    }
    
    // Create new book record
    await tx.execute(`
      INSERT INTO books (id, name, code, version, metadata, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [bookId, bookId, bookId, null, JSON.stringify(metadata), now, now]);
    
    // Create chapters and pages...
    // (Use tx.execute instead of repository methods)
  });
} catch (error) {
  console.error(`[SyncV2] Transaction failed for ${bookId}:`, error);
  throw error;
}
```

## Phase 2: Error Handling and Recovery

### 2.1 Implement Standardized Error Handling

**File**: `lib/errors/api-errors.ts` (New file)

**Changes**:
```typescript
export class APIError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class ValidationError extends APIError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

export class NotFoundError extends APIError {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`, 'NOT_FOUND', 404);
  }
}

export class DatabaseError extends APIError {
  constructor(message: string, details?: any) {
    super(message, 'DATABASE_ERROR', 500, details);
  }
}

// Error handler middleware
export function handleAPIError(error: unknown): NextResponse {
  if (error instanceof APIError) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      ...(error.details && { details: error.details })
    }, { status: error.statusCode });
  }
  
  // Unknown error
  console.error('Unhandled API error:', error);
  return NextResponse.json({
    success: false,
    error: 'Internal server error',
    code: 'INTERNAL_ERROR'
  }, { status: 500 });
}
```

### 2.2 Add Retry Logic for Transient Failures

**File**: `lib/utils/retry.ts` (New file)

**Changes**:
```typescript
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number;
    baseDelay?: number;
    maxDelay?: number;
    backoffFactor?: number;
    retryableErrors?: string[];
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    retryableErrors = ['ECONNRESET', 'ETIMEDOUT', 'RATE_LIMIT']
  } = options;
  
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on last attempt
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Check if error is retryable
      const isRetryable = retryableErrors.some(pattern => 
        lastError.message.includes(pattern)
      );
      
      if (!isRetryable) {
        throw lastError;
      }
      
      // Calculate delay with exponential backoff
      const delay = Math.min(
        baseDelay * Math.pow(backoffFactor, attempt),
        maxDelay
      );
      
      console.warn(`Operation failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries}):`, lastError.message);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}
```

## Phase 3: Performance and Type Safety

### 3.1 Add Type Safety to Unified Parser

**File**: `lib/books/unified-parser.ts`

**Changes**:
```typescript
import { z } from "zod";

// Define schemas for different formats
const DefBoardsSchema = z.record(z.object({
  style: z.record(z.any()).optional(),
  points: z.array(z.any()).optional(),
  lines: z.array(z.any()).optional(),
  curves: z.array(z.any()).optional(),
  // Add other known properties
}));

const RDefSchema = z.record(z.any());

const ParsedContentSchema = z.object({
  defBoards: DefBoardsSchema.optional(),
  rDef: RDefSchema.optional(),
  allDef: z.record(z.any()).optional(),
});

export class UnifiedBookParser {
  static async parseDefinitionFile(filePath: string, context: PageContext): Promise<ParsedContent> {
    try {
      const content = await readFile(filePath, 'utf-8');
      
      // Parse with validation
      let parsed: any;
      try {
        // Use safe parser instead of eval
        parsed = parseDefinitionFileSafe(content);
      } catch (parseError) {
        console.error(`[UnifiedBookParser] Parse error for ${filePath}:`, parseError);
        return {
          format: "unknown",
          exercises: [],
          metadata: { error: `Parse error: ${parseError.message}` }
        };
      }
      
      // Validate parsed structure
      const validated = ParsedContentSchema.safeParse(parsed);
      if (!validated.success) {
        console.warn(`[UnifiedBookParser] Validation failed for ${filePath}:`, validated.error);
        return {
          format: "unknown",
          exercises: [],
          metadata: { 
            error: "Structure validation failed",
            details: validated.error.issues
          }
        };
      }
      
      // Rest of the logic with validated data
      const data = validated.data;
      // ...
    } catch (error) {
      console.error(`[UnifiedBookParser] Error parsing file ${filePath}:`, error);
      return {
        format: "unknown",
        exercises: [],
        metadata: { error: error instanceof Error ? error.message : String(error) }
      };
    }
  }
}
```

### 3.2 Implement Streaming for Large Books

**File**: `app/api/books/sync-v2/route.ts`

**Changes**:
```typescript
// Add streaming response for large books
export async function POST(request: NextRequest) {
  // ... initial validation ...
  
  // Create a readable stream for progress updates
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        await initializeDatabase();
        
        const booksDir = join(process.cwd(), "books");
        const items = await readdir(booksDir);
        
        // Send initial progress
        controller.enqueue(encoder.encode(JSON.stringify({
          type: 'progress',
          stage: 'initialization',
          totalBooks: items.length,
          processedBooks: 0
        }) + '\n'));
        
        // Process books with progress updates
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          // ... process book ...
          
          // Send progress update
          controller.enqueue(encoder.encode(JSON.stringify({
            type: 'progress',
            stage: 'processing',
            totalBooks: items.length,
            processedBooks: i + 1,
            currentBook: item,
            bookResult: processedBook
          }) + '\n'));
        }
        
        // Send final result
        controller.enqueue(encoder.encode(JSON.stringify({
          type: 'complete',
          data: {
            totalProcessed: processedBooks.length,
            successful,
            failed,
            duration: `${Date.now() - startTime}ms`,
            books: processedBooks,
          }
        }) + '\n'));
        
        controller.close();
      } catch (error) {
        controller.enqueue(encoder.encode(JSON.stringify({
          type: 'error',
          error: error instanceof Error ? error.message : String(error)
        }) + '\n'));
        controller.close();
      }
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Cache-Control': 'no-cache',
    },
  });
}
```

## Phase 4: Monitoring and Validation

### 4.1 Add Comprehensive Logging

**File**: `lib/logging/logger.ts` (New file)

**Changes**:
```typescript
import { createWriteStream } from 'fs';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export class Logger {
  private static instance: Logger;
  private logStream: NodeJS.WriteStream;
  private currentLevel: LogLevel = LogLevel.INFO;
  
  private constructor() {
    this.logStream = createWriteStream('logs/api.log', { flags: 'a' });
  }
  
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  
  private log(level: LogLevel, message: string, meta?: any): void {
    if (level < this.currentLevel) return;
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel[level],
      message,
      ...(meta && { meta })
    };
    
    const logLine = JSON.stringify(logEntry) + '\n';
    this.logStream.write(logLine);
    
    // Also log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${LogLevel[level]}] ${message}`, meta || '');
    }
  }
  
  debug(message: string, meta?: any): void {
    this.log(LogLevel.DEBUG, message, meta);
  }
  
  info(message: string, meta?: any): void {
    this.log(LogLevel.INFO, message, meta);
  }
  
  warn(message: string, meta?: any): void {
    this.log(LogLevel.WARN, message, meta);
  }
  
  error(message: string, meta?: any): void {
    this.log(LogLevel.ERROR, message, meta);
  }
}

// Export singleton instance
export const logger = Logger.getInstance();
```

### 4.2 Add Input Validation Middleware

**File**: `lib/validation/api-validation.ts` (New file)

**Changes**:
```typescript
import { z } from "zod";
import { ValidationError } from "./api-errors";

export const BookIdSchema = z.string()
  .regex(/^[a-zA-Z0-9_]+$/, "Book ID must contain only alphanumeric characters and underscores")
  .min(1, "Book ID is required")
  .max(50, "Book ID too long");

export const ChapterIdSchema = z.string()
  .regex(/^[a-zA-Z0-9_]+$/, "Chapter ID must contain only alphanumeric characters and underscores")
  .min(1, "Chapter ID is required")
  .max(50, "Chapter ID too long");

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message
    }));
    
    throw new ValidationError('Validation failed', errors);
  }
  
  return result.data;
}

// Specific validation schemas
export const SyncBookSchema = z.object({
  // Add sync-specific validation
});

export const DiscoverEnginesSchema = z.object({
  bookId: BookIdSchema,
  chapterId: ChapterIdSchema,
});
```

## Implementation Priority

1. **Immediate (Week 1)**:
   - Fix path traversal vulnerability
   - Add input validation
   - Fix vector store race condition

2. **Short-term (Week 2-3)**:
   - Implement database transactions
   - Add standardized error handling
   - Add retry logic

3. **Medium-term (Week 4-5)**:
   - Improve type safety
   - Add streaming for large operations
   - Implement comprehensive logging

4. **Long-term (Week 6+)**:
   - Add monitoring and alerting
   - Performance optimization
   - Architecture improvements

## Testing Strategy

1. **Unit Tests**:
   - Test all new validation functions
   - Test error handling scenarios
   - Test retry logic

2. **Integration Tests**:
   - Test complete sync workflow
   - Test engine discovery with various inputs
   - Test error recovery scenarios

3. **Security Tests**:
   - Test path traversal attempts
   - Test injection attacks
   - Test malformed inputs

4. **Performance Tests**:
   - Test with large books
   - Test concurrent operations
   - Test memory usage