import { EngineRegistry } from './engine-registry';

/**
 * Initialize the engine registry with known engines
 * This should be called when the application starts
 */
export async function initializeEngines(): Promise<void> {
  // Known engines from MG book
  const mgEngines = [
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
      id: 'engineOwner',
      name: 'Engine Owner',
      description: 'General purpose engine',
      file: 'cap_1/engineOwner.js',
      bookId: 'MG',
      chapterId: '1',
      css: [
        'css/generic/jsxgraph.min.css',
        'css/generic/styles.min.css',
        'css/cap_1/styles.css'
      ]
    },
    {
      id: 'heightCurves',
      name: 'Height Curves',
      description: 'For analyzing curve heights',
      file: 'cap_1/heightCurves.js',
      bookId: 'MG',
      chapterId: '1',
      css: [
        'css/generic/jsxgraph.min.css',
        'css/generic/styles.min.css',
        'css/cap_1/styles.css'
      ]
    }
  ];
  
  // Known engines from NV book
  const nvEngines = [
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
    },
    {
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
    },
    {
      id: 'engineTable',
      name: 'Table Engine',
      description: 'For creating tables',
      file: 'cap_1/engineTable.js',
      bookId: 'NV',
      chapterId: '1',
      css: [
        'css/generic/jsxgraph.css',
        'css/generic/styles.css',
        'css/cap_1/styles.css'
      ]
    },
    {
      id: 'engineEscalas',
      name: 'Scales Engine',
      description: 'For working with scales',
      file: 'cap_1/engineEscalas.js',
      bookId: 'NV',
      chapterId: '1',
      css: [
        'css/generic/jsxgraph.css',
        'css/generic/styles.css',
        'css/cap_1/styles.css'
      ]
    }
  ];
  
  // Register all engines
  [...mgEngines, ...nvEngines].forEach(engine => {
    EngineRegistry.register(engine);
  });
  
  console.log(`Initialized engine registry with ${mgEngines.length + nvEngines.length} engines`);
}