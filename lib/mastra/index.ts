import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { supervisorAgent, exerciseExtractionAgent, intentDetectionAgent, variationGenerationAgent, artifactGenerationAgent } from "./agent";
import { env } from "@/lib/env";

export const mastra = new Mastra({
  agents: {
    supervisorAgent,
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

