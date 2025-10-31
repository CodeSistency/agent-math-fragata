/**
 * Cleanup Manager for handling proper resource cleanup on failures
 * Provides centralized cleanup mechanisms for various operations
 */

import { unlink, rmdir } from 'fs/promises';
import { join } from 'path';
import { VectorStoreV2 } from '@/lib/rag/vector-store-v2';
import { bookRepository, chapterRepository, pageRepository, exerciseRepository } from '@/lib/db/repositories';
import { client } from '@/lib/db/client';

export interface CleanupTask {
  id: string;
  type: 'file' | 'directory' | 'database' | 'vector-store' | 'custom';
  resource: string;
  cleanupFn: () => Promise<void>;
  priority: number; // Lower numbers = higher priority
  retryCount?: number;
  maxRetries?: number;
  verbose?: boolean;
}

export interface CleanupOptions {
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  continueOnError?: boolean;
  verbose?: boolean;
}

export class CleanupManager {
  private static instance: CleanupManager;
  private cleanupTasks: Map<string, CleanupTask> = new Map();
  private isCleaningUp = false;
  private cleanupTimeout: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): CleanupManager {
    if (!CleanupManager.instance) {
      CleanupManager.instance = new CleanupManager();
    }
    return CleanupManager.instance;
  }

  /**
   * Register a cleanup task
   */
  registerCleanupTask(task: Omit<CleanupTask, 'id'>): string {
    const id = this.generateTaskId();
    const cleanupTask: CleanupTask = {
      id,
      retryCount: 0,
      maxRetries: 3,
      ...task
    };

    this.cleanupTasks.set(id, cleanupTask);
    
    if (cleanupTask.verbose !== false) {
      console.log(`[CleanupManager] Registered cleanup task: ${task.type} - ${task.resource}`);
    }

    return id;
  }

  /**
   * Remove a cleanup task
   */
  removeCleanupTask(taskId: string): boolean {
    const removed = this.cleanupTasks.delete(taskId);
    if (removed) {
      console.log(`[CleanupManager] Removed cleanup task: ${taskId}`);
    }
    return removed;
  }

  /**
   * Execute all registered cleanup tasks
   */
  async executeCleanup(options: CleanupOptions = {}): Promise<void> {
    if (this.isCleaningUp) {
      console.warn('[CleanupManager] Cleanup already in progress');
      return;
    }

    this.isCleaningUp = true;
    const {
      timeout = 30000, // 30 seconds default
      retryAttempts = 3,
      retryDelay = 1000,
      continueOnError = true,
      verbose = true
    } = options;

    console.log(`[CleanupManager] Starting cleanup with ${this.cleanupTasks.size} tasks`);

    // Set timeout for entire cleanup process
    this.cleanupTimeout = setTimeout(() => {
      console.error('[CleanupManager] Cleanup timeout reached');
      this.isCleaningUp = false;
    }, timeout);

    try {
      // Sort tasks by priority (lower numbers first)
      const sortedTasks = Array.from(this.cleanupTasks.values())
        .sort((a, b) => a.priority - b.priority);

      let successCount = 0;
      let failureCount = 0;

      for (const task of sortedTasks) {
        try {
          if (verbose) {
            console.log(`[CleanupManager] Executing cleanup task: ${task.type} - ${task.resource}`);
          }

          await this.executeTaskWithRetry(task, retryAttempts, retryDelay);
          successCount++;
          
          // Remove successful task
          this.cleanupTasks.delete(task.id);
          
        } catch (error) {
          failureCount++;
          console.error(`[CleanupManager] Failed to execute cleanup task ${task.id}:`, error);
          
          if (!continueOnError) {
            throw error;
          }
        }
      }

      console.log(`[CleanupManager] Cleanup completed: ${successCount} successful, ${failureCount} failed`);

    } catch (error) {
      console.error('[CleanupManager] Cleanup failed:', error);
      throw error;
    } finally {
      if (this.cleanupTimeout) {
        clearTimeout(this.cleanupTimeout);
        this.cleanupTimeout = null;
      }
      this.isCleaningUp = false;
    }
  }

  /**
   * Execute a single task with retry logic
   */
  private async executeTaskWithRetry(
    task: CleanupTask, 
    maxRetries: number, 
    retryDelay: number
  ): Promise<void> {
    let lastError: Error | null = null;
    const maxAttempts = Math.min(maxRetries, task.maxRetries || 3);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await task.cleanupFn();
        return; // Success, exit retry loop
        
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < maxAttempts) {
          console.warn(`[CleanupManager] Task ${task.id} failed (attempt ${attempt}/${maxAttempts}), retrying in ${retryDelay}ms:`, lastError.message);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    throw lastError || new Error('Task failed after all retries');
  }

  /**
   * Register file cleanup
   */
  registerFileCleanup(filePath: string, priority: number = 100): string {
    return this.registerCleanupTask({
      type: 'file',
      resource: filePath,
      priority,
      cleanupFn: async () => {
        try {
          await unlink(filePath);
          console.log(`[CleanupManager] Deleted file: ${filePath}`);
        } catch (error) {
          // Ignore file not found errors
          if ((error as any).code !== 'ENOENT') {
            throw error;
          }
        }
      }
    });
  }

  /**
   * Register directory cleanup
   */
  registerDirectoryCleanup(dirPath: string, priority: number = 200): string {
    return this.registerCleanupTask({
      type: 'directory',
      resource: dirPath,
      priority,
      cleanupFn: async () => {
        try {
          await rmdir(dirPath, { recursive: true });
          console.log(`[CleanupManager] Deleted directory: ${dirPath}`);
        } catch (error) {
          // Ignore directory not found errors
          if ((error as any).code !== 'ENOENT') {
            throw error;
          }
        }
      }
    });
  }

  /**
   * Register database cleanup for a book
   */
  registerDatabaseCleanup(bookId: string, priority: number = 50): string {
    return this.registerCleanupTask({
      type: 'database',
      resource: `book:${bookId}`,
      priority,
      cleanupFn: async () => {
        try {
          // Delete in correct order respecting foreign keys
          await exerciseRepository.deleteByBookId(bookId);
          
          // Get chapters for this book and delete their pages
          const chapters = await chapterRepository.findByBookId(bookId);
          for (const chapter of chapters) {
            // Delete pages for this chapter using raw SQL since deleteByChapterId doesn't exist
            await client.execute({
              sql: "DELETE FROM pages WHERE chapter_id = ?",
              args: [chapter.id],
            });
          }
          
          // Delete chapters for this book using raw SQL since deleteByBookId doesn't exist
          await client.execute({
            sql: "DELETE FROM chapters WHERE book_id = ?",
            args: [bookId],
          });
          
          await bookRepository.delete(bookId);
          console.log(`[CleanupManager] Cleaned database for book: ${bookId}`);
        } catch (error) {
          console.error(`[CleanupManager] Database cleanup failed for book ${bookId}:`, error);
          throw error;
        }
      }
    });
  }

  /**
   * Register vector store cleanup for a book
   */
  registerVectorStoreCleanup(bookId: string, priority: number = 60): string {
    return this.registerCleanupTask({
      type: 'vector-store',
      resource: `vector-store:${bookId}`,
      priority,
      cleanupFn: async () => {
        try {
          await VectorStoreV2.deleteBookVectorStore(bookId);
          console.log(`[CleanupManager] Cleaned vector store for book: ${bookId}`);
        } catch (error) {
          console.error(`[CleanupManager] Vector store cleanup failed for book ${bookId}:`, error);
          // Don't throw error for vector store cleanup failures
          console.warn(`[CleanupManager] Continuing despite vector store cleanup failure`);
        }
      }
    });
  }

  /**
   * Register custom cleanup function
   */
  registerCustomCleanup(
    name: string, 
    cleanupFn: () => Promise<void>, 
    priority: number = 150
  ): string {
    return this.registerCleanupTask({
      type: 'custom',
      resource: name,
      priority,
      cleanupFn
    });
  }

  /**
   * Get all registered cleanup tasks
   */
  getCleanupTasks(): CleanupTask[] {
    return Array.from(this.cleanupTasks.values());
  }

  /**
   * Get cleanup tasks by type
   */
  getCleanupTasksByType(type: CleanupTask['type']): CleanupTask[] {
    return Array.from(this.cleanupTasks.values()).filter(task => task.type === type);
  }

  /**
   * Clear all cleanup tasks
   */
  clearCleanupTasks(): void {
    const count = this.cleanupTasks.size;
    this.cleanupTasks.clear();
    console.log(`[CleanupManager] Cleared ${count} cleanup tasks`);
  }

  /**
   * Generate unique task ID
   */
  private generateTaskId(): string {
    return `cleanup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Setup process-level cleanup handlers
   */
  setupProcessCleanup(): void {
    const cleanup = async (signal: string) => {
      console.log(`[CleanupManager] Received ${signal}, executing cleanup...`);
      try {
        await this.executeCleanup({ timeout: 10000, continueOnError: true });
        process.exit(0);
      } catch (error) {
        console.error('[CleanupManager] Cleanup failed during process exit:', error);
        process.exit(1);
      }
    };

    process.on('SIGINT', () => cleanup('SIGINT'));
    process.on('SIGTERM', () => cleanup('SIGTERM'));
    process.on('uncaughtException', async (error) => {
      console.error('[CleanupManager] Uncaught exception:', error);
      await cleanup('uncaughtException');
    });
    process.on('unhandledRejection', async (reason, promise) => {
      console.error('[CleanupManager] Unhandled rejection at:', promise, 'reason:', reason);
      await cleanup('unhandledRejection');
    });
  }

  /**
   * Force immediate cleanup (emergency)
   */
  async forceCleanup(): Promise<void> {
    console.warn('[CleanupManager] Force cleanup initiated');
    await this.executeCleanup({ 
      timeout: 5000, 
      retryAttempts: 1, 
      retryDelay: 100,
      continueOnError: true,
      verbose: false 
    });
  }
}

// Export singleton instance
export const cleanupManager = CleanupManager.getInstance();

// Convenience functions for common cleanup operations
export function registerBookCleanup(bookId: string, options: { 
  includeVectorStore?: boolean;
  includeDatabase?: boolean;
  priority?: number;
} = {}): string[] {
  const taskIds: string[] = [];
  const {
    includeVectorStore = true,
    includeDatabase = true,
    priority = 50
  } = options;

  if (includeVectorStore) {
    taskIds.push(cleanupManager.registerVectorStoreCleanup(bookId, priority));
  }

  if (includeDatabase) {
    taskIds.push(cleanupManager.registerDatabaseCleanup(bookId, priority + 10));
  }

  return taskIds;
}

export function registerTempFileCleanup(filePath: string): string {
  return cleanupManager.registerFileCleanup(filePath, 300); // Low priority for temp files
}

export function registerTempDirectoryCleanup(dirPath: string): string {
  return cleanupManager.registerDirectoryCleanup(dirPath, 300); // Low priority for temp dirs
}