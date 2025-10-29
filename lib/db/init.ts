import { runMigrations } from "./migrations";

/**
 * Initialize database: run migrations
 * Call this at application startup
 */
export async function initializeDatabase(): Promise<void> {
  try {
    await runMigrations();
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

