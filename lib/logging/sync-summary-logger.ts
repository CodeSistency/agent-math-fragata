import { createHash } from 'crypto';

export interface SyncSummary {
  timestamp: string;
  bookId: string;
  totalFiles: number;
  successfulFiles: number;
  failedFiles: number;
  formats: {
    MG: number;
    NV: number;
    basic: number;
    unknown: number;
  };
  engines: {
    [engineName: string]: number;
  };
  errors: Array<{
    file: string;
    error: string;
    phase: 'parsing' | 'inference' | 'embedding' | 'database' | 'engine-inference';
    recovered: boolean;
  }>;
  performance: {
    totalTime: number;
    avgTimePerFile: number;
    embeddingCorrections: number;
    fallbackReductions: number;
    embeddingsNormalized?: number;
    embeddingsSkipped?: number;
    embeddingsUpserted?: number;
  };
  recovery: {
    recoveredFiles: number;
    fallbackExercises: number;
    unknownFormatsRecovered: number;
  };
}

export class SyncSummaryLogger {
  private static summaries: Map<string, SyncSummary> = new Map();
  
  /**
   * Initialize a new sync session
   */
  static initializeSession(bookId: string): string {
    const sessionId = this.generateSessionId(bookId);
    const summary: SyncSummary = {
      timestamp: new Date().toISOString(),
      bookId,
      totalFiles: 0,
      successfulFiles: 0,
      failedFiles: 0,
      formats: { MG: 0, NV: 0, basic: 0, unknown: 0 },
      engines: {},
      errors: [],
      performance: {
        totalTime: 0,
        avgTimePerFile: 0,
        embeddingCorrections: 0,
        fallbackReductions: 0,
        embeddingsNormalized: 0,
        embeddingsSkipped: 0,
        embeddingsUpserted: 0
      },
      recovery: {
        recoveredFiles: 0,
        fallbackExercises: 0,
        unknownFormatsRecovered: 0
      }
    };
    
    this.summaries.set(sessionId, summary);
    console.log(`[SyncSummaryLogger] Initialized session ${sessionId} for book ${bookId}`);
    return sessionId;
  }
  
  /**
   * Log embedding quality counters
   */
  static logEmbeddingQuality(
    sessionId: string,
    counters: { normalized?: number; skipped?: number; upserted?: number }
  ): void {
    const summary = this.summaries.get(sessionId);
    if (!summary) return;
    summary.performance.embeddingsNormalized = (summary.performance.embeddingsNormalized || 0) + (counters.normalized || 0);
    summary.performance.embeddingsSkipped = (summary.performance.embeddingsSkipped || 0) + (counters.skipped || 0);
    summary.performance.embeddingsUpserted = (summary.performance.embeddingsUpserted || 0) + (counters.upserted || 0);
  }

  /**
   * Log file processing result
   */
  static logFileProcessing(
    sessionId: string,
    filePath: string,
    result: {
      success: boolean;
      format?: string;
      engine?: string;
      error?: string;
      phase?: 'parsing' | 'inference' | 'embedding' | 'database' | 'engine-inference';
      recovered?: boolean;
      processingTime?: number;
      embeddingCorrected?: boolean;
      fallbackReduced?: boolean;
    }
  ): void {
    const summary = this.summaries.get(sessionId);
    if (!summary) {
      console.error(`[SyncSummaryLogger] Session ${sessionId} not found`);
      return;
    }
    
    summary.totalFiles++;
    
    if (result.success) {
      summary.successfulFiles++;
      
      // Track format distribution
      if (result.format) {
        const format = result.format.toUpperCase() as keyof typeof summary.formats;
        if (format in summary.formats) {
          summary.formats[format]++;
        }
      }
      
      // Track engine distribution
      if (result.engine) {
        summary.engines[result.engine] = (summary.engines[result.engine] || 0) + 1;
      }
      
      // Track recovery
      if (result.recovered) {
        summary.recovery.recoveredFiles++;
      }
      
      // Track performance improvements
      if (result.embeddingCorrected) {
        summary.performance.embeddingCorrections++;
      }
      
      if (result.fallbackReduced) {
        summary.performance.fallbackReductions++;
      }
    } else {
      summary.failedFiles++;
      
      // Log error details
      if (result.error && result.phase) {
        summary.errors.push({
          file: filePath,
          error: result.error,
          phase: result.phase,
          recovered: result.recovered || false
        });
      }
    }
    
    // Update performance metrics
    if (result.processingTime) {
      summary.performance.totalTime += result.processingTime;
      summary.performance.avgTimePerFile = summary.performance.totalTime / summary.totalFiles;
    }
  }
  
  /**
   * Log recovery statistics
   */
  static logRecovery(
    sessionId: string,
    type: 'fallback-exercise' | 'unknown-format',
    count: number = 1
  ): void {
    const summary = this.summaries.get(sessionId);
    if (!summary) return;
    
    if (type === 'fallback-exercise') {
      summary.recovery.fallbackExercises += count;
    } else if (type === 'unknown-format') {
      summary.recovery.unknownFormatsRecovered += count;
    }
  }
  
  /**
   * Generate comprehensive summary report
   */
  static generateSummary(sessionId: string): SyncSummary | null {
    const summary = this.summaries.get(sessionId);
    if (!summary) return null;
    
    // Calculate additional metrics
    const successRate = (summary.successfulFiles / summary.totalFiles) * 100;
    const recoveryRate = (summary.recovery.recoveredFiles / summary.failedFiles) * 100;
    const formatDetectionRate = ((summary.formats.MG + summary.formats.NV + summary.formats.basic) / summary.totalFiles) * 100;
    
    console.log(`\n📊 SYNC SUMMARY REPORT FOR BOOK: ${summary.bookId}`);
    console.log(`⏰ Timestamp: ${summary.timestamp}`);
    console.log(`📁 Total Files: ${summary.totalFiles}`);
    console.log(`✅ Successful: ${summary.successfulFiles} (${successRate.toFixed(1)}%)`);
    console.log(`❌ Failed: ${summary.failedFiles} (${(100 - successRate).toFixed(1)}%)`);
    console.log(`🔄 Recovered: ${summary.recovery.recoveredFiles} (${recoveryRate.toFixed(1)}% of failed)`);
    
    console.log(`\n📋 FORMAT DISTRIBUTION:`);
    console.log(`  MG: ${summary.formats.MG} (${(summary.formats.MG / summary.totalFiles * 100).toFixed(1)}%)`);
    console.log(`  NV: ${summary.formats.NV} (${(summary.formats.NV / summary.totalFiles * 100).toFixed(1)}%)`);
    console.log(`  Basic: ${summary.formats.basic} (${(summary.formats.basic / summary.totalFiles * 100).toFixed(1)}%)`);
    console.log(`  Unknown: ${summary.formats.unknown} (${(summary.formats.unknown / summary.totalFiles * 100).toFixed(1)}%)`);
    console.log(`  Detection Rate: ${formatDetectionRate.toFixed(1)}%`);
    
    console.log(`\n🚀 ENGINE DISTRIBUTION:`);
    const sortedEngines = Object.entries(summary.engines)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
    
    for (const [engine, count] of sortedEngines) {
      const percentage = (count / summary.successfulFiles * 100).toFixed(1);
      console.log(`  ${engine}: ${count} (${percentage}%)`);
    }
    
    console.log(`\n⚡ PERFORMANCE METRICS:`);
    console.log(`  Total Time: ${summary.performance.totalTime.toFixed(0)}ms`);
    console.log(`  Avg Time/File: ${summary.performance.avgTimePerFile.toFixed(0)}ms`);
    console.log(`  Embedding Corrections: ${summary.performance.embeddingCorrections}`);
    console.log(`  Fallback Reductions: ${summary.performance.fallbackReductions}`);
    if (summary.performance.embeddingsUpserted !== undefined) {
      console.log(`  Embeddings Upserted: ${summary.performance.embeddingsUpserted}`);
      console.log(`  Embeddings Normalized: ${summary.performance.embeddingsNormalized}`);
      console.log(`  Embeddings Skipped: ${summary.performance.embeddingsSkipped}`);
    }
    
    console.log(`\n🔧 RECOVERY STATISTICS:`);
    console.log(`  Recovered Files: ${summary.recovery.recoveredFiles}`);
    console.log(`  Fallback Exercises: ${summary.recovery.fallbackExercises}`);
    console.log(`  Unknown Formats Recovered: ${summary.recovery.unknownFormatsRecovered}`);
    
    if (summary.errors.length > 0) {
      console.log(`\n❌ ERROR ANALYSIS:`);
      const errorsByPhase = summary.errors.reduce((acc, error) => {
        acc[error.phase] = (acc[error.phase] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      for (const [phase, count] of Object.entries(errorsByPhase)) {
        console.log(`  ${phase}: ${count} errors`);
      }
      
      // Show top 5 most common errors
      const errorCounts = summary.errors.reduce((acc, error) => {
        const key = error.error.substring(0, 50) + '...';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const topErrors = Object.entries(errorCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
      
      console.log(`\n  Top 5 Errors:`);
      for (const [error, count] of topErrors) {
        console.log(`    ${count}x: ${error}`);
      }
    }
    
    console.log(`\n📈 KEY IMPROVEMENTS:`);
    if (summary.performance.embeddingCorrections > 0) {
      console.log(`  ✅ Fixed ${summary.performance.embeddingCorrections} embedding dimension issues`);
    }
    if (summary.performance.fallbackReductions > 0) {
      console.log(`  ✅ Reduced ${summary.performance.fallbackReductions} engine fallbacks`);
    }
    if (summary.recovery.recoveredFiles > 0) {
      console.log(`  ✅ Recovered ${summary.recovery.recoveredFiles} failed files`);
    }
    if (formatDetectionRate > 90) {
      console.log(`  ✅ High format detection rate: ${formatDetectionRate.toFixed(1)}%`);
    }
    if (successRate > 95) {
      console.log(`  ✅ High success rate: ${successRate.toFixed(1)}%`);
    }
    
    console.log(`\n${'='.repeat(60)}\n`);
    
    return summary;
  }
  
  /**
   * Export summary to JSON file
   */
  static exportToFile(sessionId: string, outputPath?: string): void {
    const summary = this.summaries.get(sessionId);
    if (!summary) return;
    
    const filename = outputPath || `sync-summary-${summary.bookId}-${Date.now()}.json`;
    const fs = require('fs');
    
    try {
      fs.writeFileSync(filename, JSON.stringify(summary, null, 2));
      console.log(`[SyncSummaryLogger] Summary exported to ${filename}`);
    } catch (error) {
      console.error(`[SyncSummaryLogger] Failed to export summary:`, error);
    }
  }
  
  /**
   * Generate unique session ID
   */
  private static generateSessionId(bookId: string): string {
    const timestamp = Date.now();
    const hash = createHash('md5')
      .update(`${bookId}-${timestamp}-${Math.random()}`)
      .digest('hex')
      .substring(0, 8);
    return `${bookId}-${timestamp}-${hash}`;
  }
  
  /**
   * Clean up old sessions
   */
  static cleanup(olderThanHours: number = 24): void {
    const cutoff = Date.now() - (olderThanHours * 60 * 60 * 1000);
    
    for (const [sessionId, summary] of this.summaries.entries()) {
      const sessionTime = new Date(summary.timestamp).getTime();
      if (sessionTime < cutoff) {
        this.summaries.delete(sessionId);
      }
    }
  }
}