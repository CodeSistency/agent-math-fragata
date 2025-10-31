import { createWriteStream } from 'fs';
import { join } from 'path';
import { Writable } from 'stream';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  meta?: any;
  module?: string;
  userId?: string;
  requestId?: string;
}

export class Logger {
  private static instance: Logger;
  private logStream: Writable;
  
  private constructor() {
    this.logStream = createWriteStream(join(process.cwd(), 'logs', 'api.log'), { flags: 'a' });
  }
  
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  
  private formatMessage(entry: LogEntry): string {
    return JSON.stringify(entry);
  }
  
  private writeLog(entry: LogEntry): void {
    const logLine = this.formatMessage(entry) + '\n';
    this.logStream.write(logLine);
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      const levelName = LogLevel[entry.level];
      const metaStr = entry.meta ? ` ${JSON.stringify(entry.meta)}` : '';
      console.log(`[${levelName}] ${entry.message}${metaStr}`);
    }
  }
  
  debug(message: string, meta?: any): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.DEBUG,
      message,
      meta,
      module: this.getCaller()
    });
  }
  
  info(message: string, meta?: any): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message,
      meta,
      module: this.getCaller()
    });
  }
  
  warn(message: string, meta?: any): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.WARN,
      message,
      meta,
      module: this.getCaller()
    });
  }
  
  error(message: string, meta?: any): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      message,
      meta,
      module: this.getCaller()
    });
  }
  
  // Add context information
  setContext(context: { userId?: string; requestId?: string }): void {
    // Store context for subsequent log entries
    // In a real implementation, this would be stored in instance variables
    if (context.userId) {
      (this as any).userId = context.userId;
    }
    if (context.requestId) {
      (this as any).requestId = context.requestId;
    }
  }
  
  private getCaller(): string {
    const stack = new Error().stack;
    if (!stack) return 'unknown';
    
    // Extract module name from stack trace
    const lines = stack.split('\n');
    for (const line of lines) {
      if (line.includes(__filename)) {
        const match = line.match(/at.*\(([^)]+)\)/);
        if (match) {
          return match[1];
        }
      }
    }
    return 'unknown';
  }
  
  // Performance monitoring
  startTimer(label: string): () => void {
    const startTime = Date.now();
    return () => {
      const duration = Date.now() - startTime;
      this.info(`Performance: ${label} completed in ${duration}ms`, {
        duration,
        label
      });
    };
  }
  
  // Structured logging for API operations
  logAPIRequest(method: string, path: string, userId?: string, requestId?: string): void {
    this.info(`API Request: ${method} ${path}`, {
      type: 'api_request',
      method,
      path,
      userId,
      requestId
    });
  }
  
  logAPIResponse(statusCode: number, duration: number, userId?: string, requestId?: string): void {
    this.info(`API Response: ${statusCode} in ${duration}ms`, {
      type: 'api_response',
      statusCode,
      duration,
      userId,
      requestId
    });
  }
  
  logDatabaseOperation(operation: string, table: string, duration: number, recordCount?: number): void {
    this.info(`DB Operation: ${operation} on ${table}`, {
      type: 'database',
      operation,
      table,
      duration,
      recordCount
    });
  }
  
  logVectorStoreOperation(operation: string, bookId: string, exerciseCount: number, duration: number): void {
    this.info(`Vector Store: ${operation} for ${bookId}`, {
      type: 'vector_store',
      operation,
      bookId,
      exerciseCount,
      duration
    });
  }
  
  logError(error: Error, context?: any): void {
    this.error(error.message, {
      type: 'error',
      stack: error.stack,
      context
    });
  }
  
  // Cleanup
  close(): void {
    if (this.logStream) {
      this.logStream.end();
    }
  }
}

// Export singleton instance
export const logger = Logger.getInstance();