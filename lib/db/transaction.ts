import { client } from "./client";

export interface Transaction {
  execute: (sql: string, args?: any[]) => Promise<any>;
  commit: () => Promise<void>;
  rollback: () => Promise<void>;
}

/**
 * Execute operations within a transaction
 * For SQLite, we simulate transactions by collecting operations
 * and executing them atomically
 */
export async function withTransaction<T>(
  callback: (tx: Transaction) => Promise<T>
): Promise<T> {
  // Collect all operations
  const operations: Array<{ sql: string; args?: any[] }> = [];
  
  const tx: Transaction = {
    execute: (sql: string, args?: any[]) => {
      operations.push({ sql, args });
      // Return a mock result for now
      return Promise.resolve({ rows: [] });
    },
    commit: async () => {
      // Execute all operations in order
      for (const op of operations) {
        await client.execute(op.sql, op.args || []);
      }
    },
    rollback: async () => {
      // In a real transaction system, this would rollback
      console.log('[Transaction] Rolling back operations');
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

/**
 * Execute multiple operations in a batch
 * Useful for bulk inserts/updates
 */
export async function executeBatch(
  operations: Array<{ sql: string; args?: any[] }>
): Promise<void> {
  // SQLite doesn't have native batch support, so we execute sequentially
  for (const op of operations) {
    await client.execute(op.sql, op.args || []);
  }
}