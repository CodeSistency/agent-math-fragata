import { NextResponse } from "next/server";
import { initializeDatabase } from "@/lib/db/init";
import { initializeVectorStore } from "@/lib/rag/vector-store";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * POST /api/init - Initialize database and vector store
 * Call this endpoint once at application startup or manually
 */
export async function POST() {
  try {
    // Run database migrations
    await initializeDatabase();
    
    // Initialize default vector store
    await initializeVectorStore();
    
    return NextResponse.json({
      success: true,
      message: "Database and vector store initialized successfully",
    });
  } catch (error) {
    console.error("Initialization error:", error);
    return NextResponse.json(
      {
        error: "Failed to initialize",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/init - Check initialization status
 */
export async function GET() {
  try {
    const { getMigrationStatus } = await import("@/lib/db/migrations");
    const status = await getMigrationStatus();
    
    return NextResponse.json({
      success: true,
      data: {
        migrations: status,
        initialized: status.pending.length === 0,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to check status",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

