import { NextRequest, NextResponse } from 'next/server';

// Engine metadata for known engines
const ENGINE_METADATA = {
  'engineInterval': {
    id: 'engineInterval',
    name: 'Interval Engine',
    description: 'For working with mathematical intervals',
    file: 'cap_0/engineInterval.js',
    bookId: 'MG',
    chapterId: '0',
    css: [
      'css/generic/jsxgraph.min.css',
      'css/generic/styles.min.css',
      'css/cap_0/styles.css'
    ]
  },
  'horizontalSegment': {
    id: 'horizontalSegment',
    name: 'Horizontal Segment',
    description: 'For horizontal line segments',
    file: 'cap_1/horizontalSegment.js',
    bookId: 'NV',
    chapterId: '1',
    css: [
      'css/generic/jsxgraph.css',
      'css/generic/styles.css',
      'css/cap_1/styles.css'
    ]
  },
  'engineOwner': {
    id: 'engineOwner',
    name: 'Engine Owner',
    description: 'General purpose engine',
    file: 'cap_1/engineOwner.js',
    bookId: 'NV',
    chapterId: '1',
    css: [
      'css/generic/jsxgraph.css',
      'css/generic/styles.css',
      'css/cap_1/engineOwner.css'
    ]
  }
};

export async function GET(request: NextRequest) {
  try {
    // Return all available engines with their metadata
    const engines = Object.values(ENGINE_METADATA);
    
    return NextResponse.json({
      success: true,
      data: engines
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch engines',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
