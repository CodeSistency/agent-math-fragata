import { NextResponse } from 'next/server';

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

export class VectorStoreError extends APIError {
  constructor(message: string, details?: any) {
    super(message, 'VECTOR_STORE_ERROR', 500, details);
  }
}

/**
 * Handle API errors and return appropriate response
 */
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
    code: 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && {
      details: error instanceof Error ? error.message : String(error)
    })
  }, { status: 500 });
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: any): boolean {
  if (!error) return false;
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  const retryablePatterns = [
    'ECONNRESET',
    'ETIMEDOUT',
    'RATE_LIMIT',
    'quota',
    'timeout',
    '429',
    '503',
    '502',
    'connection'
  ];
  
  return retryablePatterns.some(pattern => errorMessage.toLowerCase().includes(pattern.toLowerCase()));
}