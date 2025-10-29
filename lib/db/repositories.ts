import { client } from "./client";
import type { Book, Chapter, Page } from "@/types/book";
import type { Exercise } from "@/types/exercise";

/**
 * Book repository for CRUD operations
 */
export const bookRepository = {
  /**
   * Create a new book
   */
  async create(book: Omit<Book, "createdAt" | "updatedAt">): Promise<Book> {
    const now = new Date().toISOString();
    await client.execute({
      sql: `
        INSERT INTO books (id, name, code, version, metadata, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        book.id,
        book.name,
        book.code,
        book.version || null,
        book.metadata ? JSON.stringify(book.metadata) : null,
        now,
        now,
      ],
    });
    
    return { ...book, createdAt: now, updatedAt: now };
  },

  /**
   * Get a book by ID
   */
  async findById(id: string): Promise<Book | null> {
    const result = await client.execute({
      sql: "SELECT * FROM books WHERE id = ?",
      args: [id],
    });
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id as string,
      name: row.name as string,
      code: row.code as string,
      version: row.version as string | undefined,
      metadata: row.metadata ? JSON.parse(row.metadata as string) : undefined,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    };
  },

  /**
   * Get a book by code
   */
  async findByCode(code: string): Promise<Book | null> {
    const result = await client.execute({
      sql: "SELECT * FROM books WHERE code = ?",
      args: [code],
    });
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id as string,
      name: row.name as string,
      code: row.code as string,
      version: row.version as string | undefined,
      metadata: row.metadata ? JSON.parse(row.metadata as string) : undefined,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    };
  },

  /**
   * List all books
   */
  async findAll(): Promise<Book[]> {
    const result = await client.execute("SELECT * FROM books ORDER BY created_at DESC");
    
    return result.rows.map((row) => ({
      id: row.id as string,
      name: row.name as string,
      code: row.code as string,
      version: row.version as string | undefined,
      metadata: row.metadata ? JSON.parse(row.metadata as string) : undefined,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    }));
  },

  /**
   * Update a book
   */
  async update(id: string, updates: Partial<Omit<Book, "id" | "createdAt">>): Promise<Book> {
    const book = await this.findById(id);
    if (!book) throw new Error(`Book with id ${id} not found`);
    
    const updated: Book = {
      ...book,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    await client.execute({
      sql: `
        UPDATE books 
        SET name = ?, code = ?, version = ?, metadata = ?, updated_at = ?
        WHERE id = ?
      `,
      args: [
        updated.name,
        updated.code,
        updated.version || null,
        updated.metadata ? JSON.stringify(updated.metadata) : null,
        updated.updatedAt,
        id,
      ],
    });
    
    return updated;
  },

  /**
   * Delete a book (cascades to chapters, pages, exercises)
   */
  async delete(id: string): Promise<void> {
    await client.execute({
      sql: "DELETE FROM books WHERE id = ?",
      args: [id],
    });
  },
};

/**
 * Chapter repository for CRUD operations
 */
export const chapterRepository = {
  /**
   * Create a new chapter
   */
  async create(chapter: Omit<Chapter, "createdAt">): Promise<Chapter> {
    const now = new Date().toISOString();
    await client.execute({
      sql: `
        INSERT INTO chapters (id, book_id, chapter_number, name, total_pages, metadata, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        chapter.id,
        chapter.bookId,
        chapter.chapterNumber,
        chapter.name || null,
        chapter.totalPages,
        chapter.metadata ? JSON.stringify(chapter.metadata) : null,
        now,
      ],
    });
    
    return { ...chapter, createdAt: now };
  },

  /**
   * Get a chapter by ID
   */
  async findById(id: string): Promise<Chapter | null> {
    const result = await client.execute({
      sql: "SELECT * FROM chapters WHERE id = ?",
      args: [id],
    });
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id as string,
      bookId: row.book_id as string,
      chapterNumber: row.chapter_number as number,
      name: row.name as string | undefined,
      totalPages: row.total_pages as number,
      metadata: row.metadata ? JSON.parse(row.metadata as string) : undefined,
      createdAt: row.created_at as string,
    };
  },

  /**
   * List all chapters for a book
   */
  async findByBookId(bookId: string): Promise<Chapter[]> {
    const result = await client.execute({
      sql: "SELECT * FROM chapters WHERE book_id = ? ORDER BY chapter_number ASC",
      args: [bookId],
    });
    
    return result.rows.map((row) => ({
      id: row.id as string,
      bookId: row.book_id as string,
      chapterNumber: row.chapter_number as number,
      name: row.name as string | undefined,
      totalPages: row.total_pages as number,
      metadata: row.metadata ? JSON.parse(row.metadata as string) : undefined,
      createdAt: row.created_at as string,
    }));
  },

  /**
   * Update a chapter
   */
  async update(id: string, updates: Partial<Omit<Chapter, "id" | "createdAt">>): Promise<Chapter> {
    const chapter = await this.findById(id);
    if (!chapter) throw new Error(`Chapter with id ${id} not found`);
    
    const updated: Chapter = { ...chapter, ...updates };
    
    await client.execute({
      sql: `
        UPDATE chapters 
        SET name = ?, total_pages = ?, metadata = ?
        WHERE id = ?
      `,
      args: [
        updated.name || null,
        updated.totalPages,
        updated.metadata ? JSON.stringify(updated.metadata) : null,
        id,
      ],
    });
    
    return updated;
  },

  /**
   * Delete a chapter
   */
  async delete(id: string): Promise<void> {
    await client.execute({
      sql: "DELETE FROM chapters WHERE id = ?",
      args: [id],
    });
  },
};

/**
 * Page repository for CRUD operations
 */
export const pageRepository = {
  /**
   * Create a new page
   */
  async create(page: Omit<Page, "createdAt">): Promise<Page> {
    const now = new Date().toISOString();
    await client.execute({
      sql: `
        INSERT INTO pages (id, chapter_id, page_number, variant, content, file_path, processed_at, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        page.id,
        page.chapterId,
        page.pageNumber,
        page.variant || 0,
        page.content ? JSON.stringify(page.content) : null,
        page.filePath,
        page.processedAt || null,
        now,
      ],
    });
    
    return { ...page, createdAt: now };
  },

  /**
   * Get a page by ID
   */
  async findById(id: string): Promise<Page | null> {
    const result = await client.execute({
      sql: "SELECT * FROM pages WHERE id = ?",
      args: [id],
    });
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id as string,
      chapterId: row.chapter_id as string,
      pageNumber: row.page_number as number,
      variant: row.variant as number | undefined,
      content: row.content ? JSON.parse(row.content as string) : undefined,
      filePath: row.file_path as string,
      processedAt: row.processed_at as string | undefined,
      createdAt: row.created_at as string,
    };
  },

  /**
   * List all pages for a chapter
   */
  async findByChapterId(chapterId: string): Promise<Page[]> {
    const result = await client.execute({
      sql: "SELECT * FROM pages WHERE chapter_id = ? ORDER BY page_number ASC, variant ASC",
      args: [chapterId],
    });
    
    return result.rows.map((row) => ({
      id: row.id as string,
      chapterId: row.chapter_id as string,
      pageNumber: row.page_number as number,
      variant: row.variant as number | undefined,
      content: row.content ? JSON.parse(row.content as string) : undefined,
      filePath: row.file_path as string,
      processedAt: row.processed_at as string | undefined,
      createdAt: row.created_at as string,
    }));
  },

  /**
   * Update a page
   */
  async update(id: string, updates: Partial<Omit<Page, "id" | "createdAt">>): Promise<Page> {
    const page = await this.findById(id);
    if (!page) throw new Error(`Page with id ${id} not found`);
    
    const updated: Page = { ...page, ...updates };
    
    await client.execute({
      sql: `
        UPDATE pages 
        SET content = ?, processed_at = ?
        WHERE id = ?
      `,
      args: [
        updated.content ? JSON.stringify(updated.content) : null,
        updated.processedAt || null,
        id,
      ],
    });
    
    return updated;
  },

  /**
   * Delete a page
   */
  async delete(id: string): Promise<void> {
    await client.execute({
      sql: "DELETE FROM pages WHERE id = ?",
      args: [id],
    });
  },
};

/**
 * Exercise repository with book context
 */
export const exerciseRepository = {
  /**
   * Create a new exercise
   */
  async create(exercise: Exercise & { pageId?: string; bookId?: string; chapterId?: string }): Promise<void> {
    const now = new Date().toISOString();
    await client.execute({
      sql: `
        INSERT INTO exercises (id, page_id, book_id, chapter_id, exercise_data, tema, subtema, dificultad, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        exercise.id,
        exercise.pageId || null,
        exercise.bookId || null,
        exercise.chapterId || null,
        JSON.stringify(exercise),
        exercise.tema,
        exercise.subtema || null,
        exercise.dificultad,
        now,
      ],
    });
  },

  /**
   * Get exercises by page ID
   */
  async findByPageId(pageId: string): Promise<Exercise[]> {
    const result = await client.execute({
      sql: "SELECT exercise_data FROM exercises WHERE page_id = ? ORDER BY created_at DESC",
      args: [pageId],
    });
    
    return result.rows.map((row) => JSON.parse(row.exercise_data as string) as Exercise);
  },

  /**
   * Get exercises by chapter ID
   */
  async findByChapterId(chapterId: string): Promise<Exercise[]> {
    const result = await client.execute({
      sql: "SELECT exercise_data FROM exercises WHERE chapter_id = ? ORDER BY created_at DESC",
      args: [chapterId],
    });
    
    return result.rows.map((row) => JSON.parse(row.exercise_data as string) as Exercise);
  },

  /**
   * Get exercises by book ID
   */
  async findByBookId(bookId: string): Promise<Exercise[]> {
    const result = await client.execute({
      sql: "SELECT exercise_data FROM exercises WHERE book_id = ? ORDER BY created_at DESC",
      args: [bookId],
    });
    
    return result.rows.map((row) => JSON.parse(row.exercise_data as string) as Exercise);
  },

  /**
   * Delete exercises by page ID
   */
  async deleteByPageId(pageId: string): Promise<void> {
    await client.execute({
      sql: "DELETE FROM exercises WHERE page_id = ?",
      args: [pageId],
    });
  },

  /**
   * Delete exercises by chapter ID
   */
  async deleteByChapterId(chapterId: string): Promise<void> {
    await client.execute({
      sql: "DELETE FROM exercises WHERE chapter_id = ?",
      args: [chapterId],
    });
  },

  /**
   * Delete exercises by book ID
   */
  async deleteByBookId(bookId: string): Promise<void> {
    await client.execute({
      sql: "DELETE FROM exercises WHERE book_id = ?",
      args: [bookId],
    });
  },
};

