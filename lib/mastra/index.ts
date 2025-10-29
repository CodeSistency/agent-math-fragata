import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { supervisorAgent, exerciseExtractionAgent, intentDetectionAgent, variationGenerationAgent } from "./agent";
import { env } from "@/lib/env";

export const mastra = new Mastra({
  agents: {
    supervisorAgent,
    exerciseExtractionAgent,
    intentDetectionAgent,
    variationGenerationAgent,
  },
  storage: new LibSQLStore({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  }),
});

