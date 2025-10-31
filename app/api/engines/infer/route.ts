import { NextRequest, NextResponse } from 'next/server';
import { inferEngineFromStructure } from '@/lib/books/engine-inference';
import { handleAPIError } from '@/lib/errors/api-errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { defBoards, rDef, chapterId, bookId } = body;

    if (!defBoards || !rDef || !chapterId || !bookId) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: defBoards, rDef, chapterId, bookId',
      }, { status: 400 });
    }

    // Normalize chapterId - ensure it's in format "BOOKID_cap_N"
    let normalizedChapterId = chapterId;
    if (typeof chapterId === 'string') {
      // If it already has book prefix, use it
      if (chapterId.includes('_cap_')) {
        normalizedChapterId = chapterId;
      } else {
        // If it's just a number or "cap_N", construct full format
        const match = chapterId.match(/cap_?(\d+)/);
        if (match) {
          normalizedChapterId = `${bookId}_cap_${match[1]}`;
        } else if (/^\d+$/.test(chapterId)) {
          // Just a number
          normalizedChapterId = `${bookId}_cap_${chapterId}`;
        }
      }
    }

    const inferredEngine = await inferEngineFromStructure(
      defBoards,
      rDef,
      normalizedChapterId,
      bookId
    );

    return NextResponse.json({
      success: true,
      data: {
        engineId: inferredEngine,
      },
    });
  } catch (error) {
    return handleAPIError(error);
  }
}

