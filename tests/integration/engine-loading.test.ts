// Test file for engine loading - requires Jest to be installed
// To run tests: npm install --save-dev jest @types/jest ts-jest
// Then add test script to package.json: "test": "jest"
// And uncomment the import below:
// import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

// Test functions commented out until Jest is properly configured
/*

// Mock the engine registry for testing
const mockEngines = [
  {
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
  {
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
  }
];

// Mock fetch for testing
global.fetch = jest.fn().mockImplementation((url) => {
  if (url.includes('/api/engines/list')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockEngines)
    });
  }
  
  if (url.includes('/api/engines/engineInterval')) {
    return Promise.resolve({
      ok: true,
      text: () => Promise.resolve('mock engine code')
    });
  }
  
  if (url.includes('/api/engines/horizontalSegment')) {
    return Promise.resolve({
      ok: true,
      text: () => Promise.resolve('mock engine code')
    });
  }
  
  if (url.includes('/api/engines/discover')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockEngines)
    });
  }
  
  return Promise.resolve({
    ok: false,
    status: 404
  });
});

describe('Engine Loading', () => {
  beforeEach(() => {
    // Reset fetch mocks before each test
    jest.clearAllMocks();
  });
  
  it('loads engines via API', async () => {
    const response = await fetch('/api/engines/list');
    const data = await response.json();
    
    expect(response.ok).toBe(true);
    expect(data.success).toBe(true);
    expect(data.data).toEqual(mockEngines);
  });
  
  it('loads MG engine via API', async () => {
    const response = await fetch('/api/engines/engineInterval');
    const engineCode = await response.text();
    
    expect(response.ok).toBe(true);
    expect(engineCode).toBe('mock engine code');
  });
  
  it('loads NV engine via API', async () => {
    const response = await fetch('/api/engines/horizontalSegment');
    const engineCode = await response.text();
    
    expect(response.ok).toBe(true);
    expect(engineCode).toBe('mock engine code');
  });
  
  it('discovers engines by book and chapter', async () => {
    const response = await fetch('/api/engines/discover?bookId=MG&chapterId=0');
    const data = await response.json();
    
    expect(response.ok).toBe(true);
    expect(data.success).toBe(true);
    
    const mgEngines = data.data.filter((e: any) => e.bookId === 'MG');
    expect(mgEngines.length).toBeGreaterThan(0);
    
    const response2 = await fetch('/api/engines/discover?bookId=NV&chapterId=1');
    const data2 = await response2.json();
    
    expect(response2.ok).toBe(true);
    expect(data2.success).toBe(true);
    
    const nvEngines = data2.data.filter((e: any) => e.bookId === 'NV');
    expect(nvEngines.length).toBeGreaterThan(0);
  });
  
  it('handles missing bookId or chapterId', async () => {
    const response = await fetch('/api/engines/discover');
    const data = await response.json();
    
    expect(response.ok).toBe(false);
    expect(data.success).toBe(false);
    expect(data.error).toContain('Both bookId and chapterId are required');
  });
  
  it('handles non-existent book', async () => {
    const response = await fetch('/api/engines/discover?bookId=NonExistent');
    const data = await response.json();
    
    expect(response.ok).toBe(false);
    expect(data.success).toBe(false);
    expect(data.error).toContain('Book directory not found');
  });
  
  it('handles non-existent chapter', async () => {
    const response = await fetch('/api/engines/discover?bookId=MG&chapterId=999');
    const data = await response.json();
    
    expect(response.ok).toBe(false);
    expect(data.success).toBe(false);
    expect(data.error).toContain('Chapter engines directory not found');
  });
});
*/