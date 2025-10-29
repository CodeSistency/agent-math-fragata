import { client } from "./client";

/**
 * Database migration functions
 */

interface Migration {
  name: string;
  up: () => Promise<void>;
  down?: () => Promise<void>;
}

/**
 * Create books table
 */
async function createBooksTable(): Promise<void> {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT UNIQUE NOT NULL,
      version TEXT,
      metadata TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_books_code ON books(code)
  `);
}

/**
 * Create chapters table
 */
async function createChaptersTable(): Promise<void> {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS chapters (
      id TEXT PRIMARY KEY,
      book_id TEXT NOT NULL,
      chapter_number INTEGER NOT NULL,
      name TEXT,
      total_pages INTEGER NOT NULL,
      metadata TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
      UNIQUE(book_id, chapter_number)
    )
  `);
  
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_chapters_book_id ON chapters(book_id)
  `);
  
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_chapters_book_chapter ON chapters(book_id, chapter_number)
  `);
}

/**
 * Create pages table
 */
async function createPagesTable(): Promise<void> {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS pages (
      id TEXT PRIMARY KEY,
      chapter_id TEXT NOT NULL,
      page_number INTEGER NOT NULL,
      variant INTEGER DEFAULT 0,
      content TEXT,
      file_path TEXT NOT NULL,
      processed_at TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
      UNIQUE(chapter_id, page_number, variant)
    )
  `);
  
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_pages_chapter_id ON pages(chapter_id)
  `);
  
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_pages_chapter_page ON pages(chapter_id, page_number)
  `);
}

/**
 * Modify exercises table to include book context
 */
async function modifyExercisesTable(): Promise<void> {
  // Check if exercises table exists, if not create it
  const tables = await client.execute(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name='exercises'
  `);
  
  if (tables.rows.length === 0) {
    // Create exercises table if it doesn't exist
    await client.execute(`
      CREATE TABLE exercises (
        id TEXT PRIMARY KEY,
        page_id TEXT,
        exercise_data TEXT NOT NULL,
        tema TEXT,
        subtema TEXT,
        dificultad TEXT,
        created_at TEXT NOT NULL
      )
    `);
  }
  
  // Add book context columns if they don't exist
  try {
    await client.execute(`
      ALTER TABLE exercises ADD COLUMN book_id TEXT
    `);
  } catch (error) {
    // Column might already exist, ignore error
  }
  
  try {
    await client.execute(`
      ALTER TABLE exercises ADD COLUMN chapter_id TEXT
    `);
  } catch (error) {
    // Column might already exist, ignore error
  }
  
  try {
    await client.execute(`
      ALTER TABLE exercises ADD COLUMN page_id TEXT
    `);
  } catch (error) {
    // Column might already exist, ignore error
  }
  
  // Create indexes
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_exercises_book_id ON exercises(book_id)
  `);
  
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_exercises_chapter_id ON exercises(chapter_id)
  `);
  
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_exercises_page_id ON exercises(page_id)
  `);
  
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_exercises_tema ON exercises(tema)
  `);
  
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_exercises_dificultad ON exercises(dificultad)
  `);
}

/**
 * Create migrations tracking table
 */
async function createMigrationsTable(): Promise<void> {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      executed_at TEXT NOT NULL
    )
  `);
}

/**
 * Check if migration has been executed
 */
async function isMigrationExecuted(name: string): Promise<boolean> {
  const result = await client.execute({
    sql: "SELECT COUNT(*) as count FROM migrations WHERE name = ?",
    args: [name],
  });
  
  return (result.rows[0]?.count as number) > 0;
}

/**
 * Mark migration as executed
 */
async function markMigrationExecuted(name: string): Promise<void> {
  await client.execute({
    sql: "INSERT INTO migrations (name, executed_at) VALUES (?, ?)",
    args: [name, new Date().toISOString()],
  });
}

/**
 * List of migrations in order
 */
const migrations: Migration[] = [
  {
    name: "001_create_migrations_table",
    up: createMigrationsTable,
  },
  {
    name: "002_create_books_table",
    up: createBooksTable,
  },
  {
    name: "003_create_chapters_table",
    up: createChaptersTable,
  },
  {
    name: "004_create_pages_table",
    up: createPagesTable,
  },
  {
    name: "005_modify_exercises_table",
    up: modifyExercisesTable,
  },
];

/**
 * Run all pending migrations
 */
export async function runMigrations(): Promise<void> {
  try {
    // Create migrations table first (if needed)
    await createMigrationsTable();
    
    // Run each migration
    for (const migration of migrations) {
      const executed = await isMigrationExecuted(migration.name);
      
      if (!executed) {
        console.log(`Running migration: ${migration.name}`);
        await migration.up();
        await markMigrationExecuted(migration.name);
        console.log(`Migration ${migration.name} completed`);
      } else {
        console.log(`Migration ${migration.name} already executed, skipping`);
      }
    }
    
    console.log("All migrations completed successfully");
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
}

/**
 * Get migration status
 */
export async function getMigrationStatus(): Promise<{
  executed: string[];
  pending: string[];
}> {
  await createMigrationsTable();
  
  const executedResult = await client.execute(
    "SELECT name FROM migrations ORDER BY executed_at"
  );
  
  const executed = executedResult.rows.map((row) => row.name as string);
  const pending = migrations
    .filter((m) => !executed.includes(m.name))
    .map((m) => m.name);
  
  return { executed, pending };
}

