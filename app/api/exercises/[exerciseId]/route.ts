import { NextRequest, NextResponse } from "next/server";
import { exerciseRepository } from "@/lib/db/repositories";
import { initializeDatabase } from "@/lib/db/init";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * GET /api/exercises/[exerciseId] - Get exercise by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ exerciseId: string }> | { exerciseId: string } }
) {
  try {
    await initializeDatabase();
    
    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = await Promise.resolve(params);
    const exerciseId = decodeURIComponent(resolvedParams.exerciseId);
    
    console.log(`[GET /api/exercises/${exerciseId}] Looking for exercise with ID: "${exerciseId}"`);
    
    const exercise = await exerciseRepository.findById(exerciseId);
    
    if (!exercise) {
      console.log(`[GET /api/exercises/${exerciseId}] Exercise not found in database`);
      return NextResponse.json(
        { 
          error: "Exercise not found",
          message: `Exercise with ID "${exerciseId}" not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: exercise,
    });
  } catch (error) {
    console.error("Exercise API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch exercise",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}



