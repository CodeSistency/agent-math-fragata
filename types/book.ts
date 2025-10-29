import { z } from "zod";
import { ExerciseSchema } from "./exercise";

/**
 * Schema for a Book
 */
export const BookSchema = z.object({
  id: z.string().describe("Unique identifier for the book (e.g., 'MG', 'NV')"),
  name: z.string().describe("Full name of the book"),
  code: z.string().describe("Short code for the book (must be unique)"),
  version: z.string().optional().describe("Version of the book"),
  metadata: z.object({
    author: z.string().optional(),
    publisher: z.string().optional(),
    year: z.number().optional(),
    totalChapters: z.number(),
    totalPages: z.number(),
  }).optional(),
  createdAt: z.string().describe("ISO timestamp of creation"),
  updatedAt: z.string().describe("ISO timestamp of last update"),
});

export type Book = z.infer<typeof BookSchema>;

/**
 * Schema for a Chapter
 */
export const ChapterSchema = z.object({
  id: z.string().describe("Unique identifier for the chapter (e.g., 'MG_cap_1')"),
  bookId: z.string().describe("Reference to the parent book"),
  chapterNumber: z.number().describe("Chapter number (0, 1, 2, ...)"),
  name: z.string().optional().describe("Name of the chapter"),
  totalPages: z.number().describe("Total number of pages in this chapter"),
  metadata: z.object({
    description: z.string().optional(),
    order: z.number().describe("Order within the book"),
  }).optional(),
  createdAt: z.string().describe("ISO timestamp of creation"),
});

export type Chapter = z.infer<typeof ChapterSchema>;

/**
 * Schema for a Page
 */
export const PageSchema = z.object({
  id: z.string().describe("Unique identifier for the page (e.g., 'MG_cap_1_pag_1')"),
  chapterId: z.string().describe("Reference to the parent chapter"),
  pageNumber: z.number().describe("Page number within the chapter"),
  variant: z.number().optional().describe("Variant number (for pag_1_1.js would be 1)"),
  content: z.record(z.any()).optional().describe("Parsed content from the .js definition file"),
  filePath: z.string().describe("Path to the original definition file"),
  processedAt: z.string().optional().describe("ISO timestamp when page was processed"),
  createdAt: z.string().describe("ISO timestamp of creation"),
});

export type Page = z.infer<typeof PageSchema>;

/**
 * Extended Exercise schema with book context
 */
export const ExerciseWithBookContextSchema = ExerciseSchema.extend({
  bookId: z.string().describe("ID of the book containing this exercise"),
  bookName: z.string().describe("Name of the book"),
  chapterId: z.string().describe("ID of the chapter containing this exercise"),
  chapterNumber: z.number().describe("Chapter number"),
  pageId: z.string().describe("ID of the page containing this exercise"),
  pageNumber: z.number().describe("Page number within the chapter"),
  variant: z.number().optional().describe("Page variant number if applicable"),
});

export type ExerciseWithBookContext = z.infer<typeof ExerciseWithBookContextSchema>;

