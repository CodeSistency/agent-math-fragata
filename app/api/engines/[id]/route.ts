import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const engineId = params.id;
  
  if (!engineId) {
    return NextResponse.json({
      success: false,
      error: 'Engine ID is required'
    }, { status: 400 });
  }
  
  try {
    // Try to find the engine in MG book first
    let enginePath = path.join(process.cwd(), 'books/MG/book/class/engines', `${engineId}.js`);
    
    try {
      await fs.access(enginePath);
    } catch {
      // If not found in MG, try NV book
      enginePath = path.join(process.cwd(), 'books/NV/book/class/engines', `${engineId}.js`);
      await fs.access(enginePath);
    }
    
    // Read the engine file
    const engineCode = await fs.readFile(enginePath, 'utf-8');
    
    // Determine the book ID from the path
    const bookId = enginePath.includes('/MG/book/') ? 'MG' : 'NV';
    
    return new NextResponse(engineCode, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: `Engine not found: ${engineId}`
    }, { status: 404 });
  }
}