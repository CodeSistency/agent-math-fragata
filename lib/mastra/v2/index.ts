import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import {
  supervisorAgentV2,
  exerciseExtractionAgent,
  intentDetectionAgent,
  variationGenerationAgent,
  artifactGenerationAgent,
} from "./agent";
import { env } from "@/lib/env";

export const mastraV2 = new Mastra({
  agents: {
    supervisorAgentV2,
    exerciseExtractionAgent,
    intentDetectionAgent,
    variationGenerationAgent,
    artifactGenerationAgent,
  },
  storage: new LibSQLStore({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  }),
});

// Export tools for direct use if needed
export { detectIntentToolV2 } from "./tools/detect-intent-v2";
export { retrieveExerciseToolV2 } from "./tools/retrieve-exercise-v2";
export { generateVariationToolV2 } from "./tools/generate-variation-v2";
export { generateArtifactDefinitionToolV2 } from "./tools/generate-artifact-definition-v2";

// Export agents
export {
  supervisorAgentV2,
  exerciseExtractionAgent,
  intentDetectionAgent,
  variationGenerationAgent,
  artifactGenerationAgent,
} from "./agent";



