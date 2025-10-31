import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { validateBookId, validateChapterId } from '@/lib/validation/schemas';
import { handleAPIError, ValidationError } from '@/lib/errors/api-errors';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawBookId = searchParams.get('bookId');
    const rawChapterId = searchParams.get('chapterId');
    
    try {
      const bookId = validateBookId(rawBookId);
      const chapterId = validateChapterId(rawChapterId);
      
      // Construct the base path for the book
      const bookBasePath = path.join(process.cwd(), 'books', bookId, 'book');
      
      // Ensure the resolved path is within the expected directory
      const resolvedPath = path.resolve(bookBasePath);
      const expectedBase = path.resolve(path.join(process.cwd(), 'books'));
      
      if (!resolvedPath.startsWith(expectedBase)) {
        return NextResponse.json({
          success: false,
          error: 'Invalid path',
          code: 'INVALID_PATH'
        }, { status: 400 });
      }
    
      // Check if the book directory exists
      try {
        await fs.access(bookBasePath);
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: `Book directory not found: ${bookId}`,
          code: 'BOOK_NOT_FOUND'
        }, { status: 404 });
      }
    
      // Construct the chapter engines path
      const chapterEnginesPath = path.join(bookBasePath, 'class', 'engines', `cap_${chapterId}`);
      
      // Additional path validation for chapter engines
      const resolvedChapterPath = path.resolve(chapterEnginesPath);
      if (!resolvedChapterPath.startsWith(expectedBase)) {
        return NextResponse.json({
          success: false,
          error: 'Invalid chapter path',
          code: 'INVALID_PATH'
        }, { status: 400 });
      }
      
      // Check if the chapter engines directory exists
      try {
        await fs.access(chapterEnginesPath);
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: `Chapter engines directory not found: ${chapterId}`,
          code: 'CHAPTER_NOT_FOUND'
        }, { status: 404 });
      }
    
      // Read the engines directory
      const engineFiles = await fs.readdir(chapterEnginesPath);
      
      // Filter for JavaScript files and extract metadata
      const engines = [];
      
      for (const file of engineFiles) {
        if (file.endsWith('.js')) {
          try {
            const filePath = path.join(chapterEnginesPath, file);
            
            // Validate file path is still within expected directory
            const resolvedFilePath = path.resolve(filePath);
            if (!resolvedFilePath.startsWith(expectedBase)) {
              console.warn(`Skipping file outside expected directory: ${file}`);
              continue;
            }
            
            const fileContent = await fs.readFile(filePath, 'utf-8');
            
            // Try to extract metadata from the file content
            const metadata = extractEngineMetadata(fileContent, file, bookId, chapterId);
            
            if (metadata) {
              engines.push(metadata);
            }
          } catch (error) {
            console.error(`Error reading engine file ${file}:`, error);
          }
        }
      }
    
      return NextResponse.json({
        success: true,
        data: engines
      });
    } catch (validationError) {
      return handleAPIError(validationError);
    }
  } catch (error) {
    return handleAPIError(error);
  }
}

// Function to extract metadata from engine files
function extractEngineMetadata(fileContent: string, fileName: string, bookId: string, chapterId: string) {
  try {
    // Try to parse the file content to look for exports
    const lines = fileContent.split('\n');
    
    // Basic metadata from filename
    const baseName = path.basename(fileName, '.js');
    
    // Try to extract more metadata from the file content
    let description = '';
    let dependencies: string[] = [];
    
    // Look for class definition or exports
    for (const line of lines) {
      // Look for class definitions
      const classMatch = line.match(/class\s+(\w+)/);
      if (classMatch) {
        description = `Engine class: ${classMatch[1]}`;
      }
      
      // Look for import statements to detect dependencies
      const importMatch = line.match(/import\s+.*from\s+['"](.+)['"]/);
      if (importMatch) {
        // Extract relative path from import
        const importPath = importMatch[1];
        // Convert relative paths to absolute paths if needed
        if (importPath.startsWith('../')) {
          dependencies.push(importPath);
        }
      }
    }
    
    // Determine engine type based on file content patterns
    let engineType = 'unknown';
    if (fileContent.includes('JSXGraph') || fileContent.includes('JXG')) {
      engineType = 'jsxgraph';
    } else if (fileContent.includes('MathLive') || fileContent.includes('math-field')) {
      engineType = 'mathlive';
    } else if (fileContent.includes('HorizontalSegment') || fileContent.includes('engineOwner')) {
      engineType = 'general';
    }
    
    return {
      id: baseName,
      name: formatEngineName(baseName),
      description: description || `${engineType} engine for ${bookId} chapter ${chapterId}`,
      file: `class/engines/cap_${chapterId}/${fileName}`,
      bookId,
      chapterId,
      type: engineType,
      css: getEngineCSS(bookId, chapterId, baseName),
      dependencies: dependencies.length > 0 ? dependencies : undefined
    };
  } catch (error) {
    console.error(`Error extracting metadata from ${fileName}:`, error);
    return null;
  }
}

// Format engine name to be more readable
function formatEngineName(baseName: string): string {
  return baseName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, '')
    .replace(/Engine$/, ' Engine')
    .replace(/([a-z])([A-Z])/g, '$1 $2');
}

// Get CSS dependencies for an engine
function getEngineCSS(bookId: string, chapterId: string, engineName: string): string[] {
  // Common CSS files that most engines need
  const commonCSS: string[] = [
    'css/generic/jsxgraph.min.css',
    'css/generic/styles.min.css'
  ];
  
  // Book-specific CSS
  const bookCSS: string[] = [];
  
  if (bookId === 'MG') {
    bookCSS.push(`css/cap_${chapterId}/styles.css`);
  } else if (bookId === 'NV') {
    bookCSS.push(`css/cap_${chapterId}/styles.css`);
  }
  
  // Engine-specific CSS (less common)
  const engineCSS: string[] = [];
  
  // Return all CSS dependencies
  return [...commonCSS, ...bookCSS, ...engineCSS].filter(Boolean);
}
