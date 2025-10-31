import { EngineMetadata } from './engine-registry';

export interface ArtifactDefinition {
  defBoards?: Record<string, any>;
  rDef?: Record<string, any>;
  [key: string]: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Parser for converting legacy engine definitions to JSON format
 */
export class LegacyDefinitionParser {
  /**
   * Parse a legacy definition file and convert to JSON format
   */
  static parse(legacyDef: any): ArtifactDefinition {
    try {
      const result: ArtifactDefinition = {
        defBoards: {},
        rDef: {}
      };
      
      // Handle different legacy definition formats
      if (legacyDef.defBoards) {
        result.defBoards = legacyDef.defBoards;
      }
      
      if (legacyDef.rDef) {
        result.rDef = legacyDef.rDef;
      }
      
      // Handle artifact definitions
      for (const [key, value] of Object.entries(legacyDef)) {
        if (key !== 'defBoards' && key !== 'rDef') {
          result[key] = value;
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error parsing legacy definition:', error);
      throw new Error(`Failed to parse legacy definition: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Validate that a definition matches the expected JSON format
   */
  static validate(definition: ArtifactDefinition): ValidationResult {
    const errors: string[] = [];
    
    // Check if definition has the required structure
    if (!definition || typeof definition !== 'object') {
      errors.push('Definition must be an object');
    }
    
    // Check for valid defBoards
    if (definition.defBoards && typeof definition.defBoards !== 'object') {
      errors.push('defBoards must be an object');
    }
    
    // Check for valid rDef
    if (definition.rDef && typeof definition.rDef !== 'object') {
      errors.push('rDef must be an object');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Convert a JSON definition to legacy format
   */
  static toJSON(definition: ArtifactDefinition): string {
    try {
      return JSON.stringify(definition, null, 2);
    } catch (error) {
      throw new Error(`Failed to serialize definition: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Merge a legacy definition with JSON overrides
   */
  static merge(base: ArtifactDefinition, override: ArtifactDefinition): ArtifactDefinition {
    return {
      defBoards: { ...base.defBoards, ...override.defBoards },
      rDef: { ...base.rDef, ...override.rDef },
      ...Object.fromEntries(
        Object.entries(base).filter(([key]) => key !== 'defBoards' && key !== 'rDef')
          .map(([key, value]) => [key, override[key] || value])
      )
    };
  }
}