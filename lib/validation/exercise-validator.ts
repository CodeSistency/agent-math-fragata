import type { Exercise } from "@/types/exercise";
import { ExerciseSchema } from "@/types/exercise";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface ValidationStatus {
  enabled: boolean;
  consecutiveFailures: number;
  totalValidated: number;
  totalErrors: number;
}

/**
 * Robust exercise validator with individual validation and smart failure handling
 */
export class ExerciseValidator {
  private static validationEnabled = true;
  private static consecutiveFailures = 0;
  private static readonly MAX_CONSECUTIVE_FAILURES = 5;
  private static readonly COOLDOWN_PERIOD = 60000; // 1 minute in ms
  private static totalValidated = 0;
  private static totalErrors = 0;
  private static lastFailureTime = 0;

  /**
   * Validate a single exercise with smart error handling
   */
  static validateExercise(exercise: any): ValidationResult {
    this.totalValidated++;
    
    // If validation is disabled, return valid
    if (!this.validationEnabled) {
      return { valid: true, errors: [] };
    }
    
    try {
      const result = ExerciseSchema.safeParse(exercise);
      
      if (result.success) {
        this.consecutiveFailures = 0; // Reset counter on success
        return { valid: true, errors: [] };
      } else {
        this.consecutiveFailures++;
        this.totalErrors++;
        
        const errors = result.error?.issues?.map(issue => issue.message) || ['Unknown validation error'];
        
        // Log detailed error information
        console.warn(`[ExerciseValidator] Validation failed for exercise ${exercise?.id || 'unknown'}:`, {
          errors,
          consecutiveFailures: this.consecutiveFailures,
          validationEnabled: this.validationEnabled
        });
        
        // Check if we should temporarily disable validation
        if (this.consecutiveFailures >= this.MAX_CONSECUTIVE_FAILURES) {
          this.disableValidationTemporarily();
        }
        
        return { valid: false, errors };
      }
    } catch (error) {
      this.consecutiveFailures++;
      this.totalErrors++;
      
      const errorMessage = `Validation exception: ${error instanceof Error ? error.message : String(error)}`;
      console.error(`[ExerciseValidator] Validation exception for exercise ${exercise?.id || 'unknown'}:`, errorMessage);
      
      if (this.consecutiveFailures >= this.MAX_CONSECUTIVE_FAILURES) {
        this.disableValidationTemporarily();
      }
      
      return {
        valid: false,
        errors: [errorMessage]
      };
    }
  }

  /**
   * Validate multiple exercises and return summary
   */
  static validateExercises(exercises: any[]): { 
    summary: ValidationResult; 
    details: Array<{ exercise: any; result: ValidationResult; index: number }>;
  } {
    const details: Array<{ exercise: any; result: ValidationResult; index: number }> = [];
    let totalErrors = 0;
    
    for (let i = 0; i < exercises.length; i++) {
      const result = this.validateExercise(exercises[i]);
      details.push({ exercise: exercises[i], result, index: i });
      
      if (!result.valid) {
        totalErrors += result.errors.length;
      }
    }
    
    return {
      summary: {
        valid: totalErrors === 0,
        errors: totalErrors === 0 ? [] : [`Found ${totalErrors} validation errors across ${exercises.length} exercises`]
      },
      details
    };
  }

  /**
   * Temporarily disable validation after too many consecutive failures
   */
  private static disableValidationTemporarily(): void {
    this.validationEnabled = false;
    this.lastFailureTime = Date.now();
    
    console.warn(`[ExerciseValidator] Validation temporarily disabled after ${this.consecutiveFailures} consecutive failures`, {
      cooldownPeriod: this.COOLDOWN_PERIOD / 1000,
      totalValidated: this.totalValidated,
      totalErrors: this.totalErrors
    });
    
    // Schedule re-enabling
    setTimeout(() => {
      this.enableValidation();
    }, this.COOLDOWN_PERIOD);
  }

  /**
   * Re-enable validation after cooldown period
   */
  private static enableValidation(): void {
    const wasDisabled = !this.validationEnabled;
    this.validationEnabled = true;
    
    if (wasDisabled) {
      console.info(`[ExerciseValidator] Validation re-enabled after cooldown period`, {
        totalValidated: this.totalValidated,
        totalErrors: this.totalErrors,
        consecutiveFailures: this.consecutiveFailures
      });
    }
  }

  /**
   * Get current validation status
   */
  static getValidationStatus(): ValidationStatus {
    return {
      enabled: this.validationEnabled,
      consecutiveFailures: this.consecutiveFailures,
      totalValidated: this.totalValidated,
      totalErrors: this.totalErrors
    };
  }

  /**
   * Force re-enable validation (for manual intervention)
   */
  static forceEnableValidation(): void {
    this.validationEnabled = true;
    this.consecutiveFailures = 0;
    this.lastFailureTime = 0;
    
    console.info(`[ExerciseValidator] Validation force-enabled by manual intervention`);
  }

  /**
   * Reset validation statistics
   */
  static resetStatistics(): void {
    this.consecutiveFailures = 0;
    this.totalValidated = 0;
    this.totalErrors = 0;
    this.lastFailureTime = 0;
    
    console.info(`[ExerciseValidator] Validation statistics reset`);
  }

  /**
   * Check if validation should be retried based on error patterns
   */
  static shouldRetryValidation(error: any): boolean {
    if (!error) return false;
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Don't retry on structural errors
    const structuralErrors = [
      'required',
      'invalid_type',
      'invalid_literal',
      'unexpected_token'
    ];
    
    const isStructural = structuralErrors.some(pattern => 
      errorMessage.toLowerCase().includes(pattern)
    );
    
    if (isStructural) {
      console.warn(`[ExerciseValidator] Structural validation error, not retrying:`, errorMessage);
      return false;
    }
    
    // Retry on temporary or data-related errors
    const retryableErrors = [
      'timeout',
      'network',
      'connection',
      'temporary'
    ];
    
    const isRetryable = retryableErrors.some(pattern => 
      errorMessage.toLowerCase().includes(pattern)
    );
    
    return isRetryable;
  }

  /**
   * Get validation recommendations based on error patterns
   */
  static getValidationRecommendations(errors: string[]): string[] {
    const recommendations: string[] = [];
    const errorText = errors.join(' ').toLowerCase();
    
    if (errorText.includes('tema')) {
      recommendations.push('Review tema field mapping and ensure valid mathematical topics');
    }
    
    if (errorText.includes('dificultad')) {
      recommendations.push('Ensure dificultad field uses only: "básica", "media", "avanzada"');
    }
    
    if (errorText.includes('metadata')) {
      recommendations.push('Check metadata structure and ensure all required fields are present');
    }
    
    if (errorText.includes('artifactdefinition')) {
      recommendations.push('Verify artifactDefinition structure contains both defBoards and rDef');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Review exercise data structure against ExerciseSchema requirements');
    }
    
    return recommendations;
  }
}