// Integration test for engine inference validation
// Tests the enhanced engine inference system with real scenarios

import { EngineInferenceV2 } from '@/lib/books/engine-inference-v2';

// Test framework mock
const test = {
  async describe(name: string, fn: () => void) {
    console.log(`\n🔧 ${name}`);
    await fn();
  },
  
  async it(name: string, fn: () => void) {
    try {
      await fn();
      console.log(`  ✅ ${name}`);
    } catch (error) {
      console.log(`  ❌ ${name}: ${error}`);
    }
  },
  
  expect: (actual: any) => ({
    toBe: (expected: any) => {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}`);
      }
    },
    toBeDefined: () => {
      if (actual === undefined) {
        throw new Error(`Expected defined, got undefined`);
      }
    },
    toContain: (expected: string) => {
      if (!actual.includes(expected)) {
        throw new Error(`Expected "${actual}" to contain "${expected}"`);
      }
    },
    toBeGreaterThan: (value: number) => {
      if (actual <= value) {
        throw new Error(`Expected > ${value}, got ${actual}`);
      }
    },
    toBeLessThan: (value: number) => {
      if (actual >= value) {
        throw new Error(`Expected < ${value}, got ${actual}`);
      }
    },
    toHaveLength: (length: number) => {
      if (!Array.isArray(actual) || actual.length !== length) {
        throw new Error(`Expected length ${length}, got ${actual?.length}`);
      }
    },
    not: {
      toContain: (expected: string) => {
        if (actual.includes(expected)) {
          throw new Error(`Expected "${actual}" NOT to contain "${expected}"`);
        }
      }
    }
  })
};

// Test scenarios for engine inference
async function runEngineInferenceTests() {
  await test.describe('Engine Inference V2 Validation', () => {
    
    test.describe('Geometry Content Detection', () => {
      test.it('should infer geometry-interactive for JSXGraph content', async () => {
        const defBoards = {
          'board_1': {
            type: 'jsxgraph',
            config: { point: true, line: true }
          }
        };
        
        const rDef = {
          artifacts: {
            'artifact_1': {
              type: 'geometry',
              content: 'JXG.Point, JXG.Line'
            }
          }
        };
        
        const context = {
          bookId: 'MG',
          chapterId: 'cap_1',
          chapterNumber: 1,
          pageId: 'pag_1',
          pageNumber: 1
        };
        
        const result = await EngineInferenceV2.inferEngine(defBoards, rDef, context);
        
        test.expect(result).toContain('geometry-interactive');
      });

      test.it('should infer jsxgraph-core for advanced geometry', async () => {
        const defBoards = {
          'board_1': {
            type: 'jsxgraph',
            config: { curve: true, function: true, advanced: true }
          }
        };
        
        const rDef = {
          artifacts: {
            'artifact_1': {
              type: 'geometry',
              content: 'JXG.Curve, JXG.Function'
            }
          }
        };
        
        const context = {
          bookId: 'MG',
          chapterId: 'cap_2',
          chapterNumber: 2,
          pageId: 'pag_1',
          pageNumber: 1
        };
        
        const result = await EngineInferenceV2.inferEngine(defBoards, rDef, context);
        
        test.expect(result).toContain('jsxgraph-core');
      });
    });

    test.describe('Function Plotting Detection', () => {
      test.it('should infer function-plotter for mathematical functions', async () => {
        const defBoards = {
          'board_1': {
            type: 'function',
            config: { plot: true, graph: true }
          }
        };
        
        const rDef = {
          artifacts: {
            'artifact_1': {
              type: 'function',
              content: 'f(x) = x^2, g(x) = sin(x)'
            }
          }
        };
        
        const context = {
          bookId: 'MG',
          chapterId: 'cap_3',
          chapterNumber: 3,
          pageId: 'pag_1',
          pageNumber: 1
        };
        
        const result = await EngineInferenceV2.inferEngine(defBoards, rDef, context);
        
        test.expect(result).toContain('function-plotter');
      });

      test.it('should infer math-field for mathematical expressions', async () => {
        const defBoards = {
          'board_1': {
            type: 'math',
            config: { expression: true, formula: true }
          }
        };
        
        const rDef = {
          artifacts: {
            'artifact_1': {
              type: 'math',
              content: '∫x²dx, √(x² + y²)'
            }
          }
        };
        
        const context = {
          bookId: 'MG',
          chapterId: 'cap_4',
          chapterNumber: 4,
          pageId: 'pag_1',
          pageNumber: 1
        };
        
        const result = await EngineInferenceV2.inferEngine(defBoards, rDef, context);
        
        test.expect(result).toContain('math-field');
      });
    });

    test.describe('Text Content Detection', () => {
      test.it('should infer text-renderer for textual content', async () => {
        const defBoards = {
          'board_1': {
            type: 'text',
            config: { paragraph: true, reading: true }
          }
        };
        
        const rDef = {
          artifacts: {
            'artifact_1': {
              type: 'text',
              content: 'Lorem ipsum dolor sit amet'
            }
          }
        };
        
        const context = {
          bookId: 'NV',
          chapterId: 'cap_1',
          chapterNumber: 1,
          pageId: 'pag_1',
          pageNumber: 1
        };
        
        const result = await EngineInferenceV2.inferEngine(defBoards, rDef, context);
        
        test.expect(result).toContain('text-renderer');
      });

      test.it('should infer reading-comprehension for NV textual content', async () => {
        const defBoards = {};
        
        const rDef = {
          artifacts: {
            'artifact_1': {
              type: 'text',
              content: 'texto, lectura, comprensión'
            }
          }
        };
        
        const context = {
          bookId: 'NV',
          chapterId: 'cap_2',
          chapterNumber: 2,
          pageId: 'pag_1',
          pageNumber: 1
        };
        
        const result = await EngineInferenceV2.inferEngine(defBoards, rDef, context);
        
        test.expect(result).toContain('reading-comprehension');
      });
    });

    test.describe('Fallback Mechanisms', () => {
      test.it('should use intelligent fallback for unknown content', async () => {
        const defBoards = {
          'board_1': {
            type: 'unknown',
            config: { mysterious: true }
          }
        };
        
        const rDef = {
          artifacts: {
            'artifact_1': {
              type: 'unknown',
              content: 'mysterious content'
            }
          }
        };
        
        const context = {
          bookId: 'MG',
          chapterId: 'cap_5',
          chapterNumber: 5,
          pageId: 'pag_1',
          pageNumber: 1
        };
        
        const result = await EngineInferenceV2.inferEngine(defBoards, rDef, context);
        
        // Should not fallback to generic-interactive immediately
        test.expect(result).not.toContain('generic-interactive');
        test.expect(result).toBeDefined();
      });

      test.it('should fallback to generic-interactive only as last resort', async () => {
        const defBoards = {};
        const rDef = {};
        
        const context = {
          bookId: 'MG',
          chapterId: 'cap_6',
          chapterNumber: 6,
          pageId: 'pag_1',
          pageNumber: 1
        };
        
        const result = await EngineInferenceV2.inferEngine(defBoards, rDef, context);
        
        test.expect(result).toBeDefined();
        // Should have some engine, even if generic
        test.expect(result.length).toBeGreaterThan(0);
      });
    });

    test.describe('Confidence Scoring', () => {
      test.it('should have high confidence for clear patterns', async () => {
        const defBoards = {
          'board_1': {
            type: 'jsxgraph',
            config: { point: true, line: true, curve: true }
          }
        };
        
        const rDef = {
          artifacts: {
            'artifact_1': {
              type: 'geometry',
              content: 'JXG.Point, JXG.Line, JXG.Curve'
            }
          }
        };
        
        const context = {
          bookId: 'MG',
          chapterId: 'cap_1',
          chapterNumber: 1,
          pageId: 'pag_1',
          pageNumber: 1
        };
        
        const result = await EngineInferenceV2.inferEngine(defBoards, rDef, context);
        
        test.expect(result).toContain('geometry-interactive');
        // High confidence should prevent fallbacks
        test.expect(result).not.toContain('generic-interactive');
      });

      test.it('should have moderate confidence for mixed content', async () => {
        const defBoards = {
          'board_1': {
            type: 'mixed',
            config: { text: true, math: true }
          }
        };
        
        const rDef = {
          artifacts: {
            'artifact_1': {
              type: 'mixed',
              content: 'text with some math'
            }
          }
        };
        
        const context = {
          bookId: 'MG',
          chapterId: 'cap_3',
          chapterNumber: 3,
          pageId: 'pag_1',
          pageNumber: 1
        };
        
        const result = await EngineInferenceV2.inferEngine(defBoards, rDef, context);
        
        test.expect(result).toBeDefined();
        test.expect(result.length).toBeGreaterThan(0);
      });
    });

    test.describe('Performance Metrics', () => {
      test.it('should complete inference within reasonable time', async () => {
        const startTime = Date.now();
        
        const defBoards = {
          'board_1': { type: 'jsxgraph' },
          'board_2': { type: 'function' },
          'board_3': { type: 'text' }
        };
        
        const rDef = {
          artifacts: {
            'artifact_1': { type: 'geometry' },
            'artifact_2': { type: 'function' },
            'artifact_3': { type: 'text' }
          }
        };
        
        const context = {
          bookId: 'MG',
          chapterId: 'cap_1',
          chapterNumber: 1,
          pageId: 'pag_1',
          pageNumber: 1
        };
        
        const result = await EngineInferenceV2.inferEngine(defBoards, rDef, context);
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        test.expect(result).toBeDefined();
        test.expect(duration).toBeLessThan(1000); // Should complete within 1 second
        console.log(`    ⏱️ Inference completed in ${duration}ms`);
      });
    });
  });

  console.log('\n🎉 Engine inference validation tests completed!');
}

// Export for running
export { runEngineInferenceTests };

// Auto-run if this file is executed directly
if (require.main === module) {
  runEngineInferenceTests().catch(console.error);
}