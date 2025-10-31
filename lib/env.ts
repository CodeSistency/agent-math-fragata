import { z } from "zod";

/**
 * Environment variables schema validation
 */
const envSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1, "GOOGLE_GENERATIVE_AI_API_KEY is required"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DATABASE_AUTH_TOKEN: z.string().optional(),
  USE_MASTRA_V2: z
    .string()
    .optional()
    .transform((val) => val === "true"),
});

/**
 * Validated environment variables
 * Throws error if required vars are missing
 */
let validatedEnv: z.infer<typeof envSchema> | null = null;

function getEnv() {
  if (!validatedEnv) {
    validatedEnv = envSchema.parse({
      GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      DATABASE_URL: process.env.DATABASE_URL || "file:./mastra.db",
      DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
      USE_MASTRA_V2: process.env.USE_MASTRA_V2,
    });
  }
  return validatedEnv;
}

export const env = new Proxy({} as z.infer<typeof envSchema>, {
  get(_target, prop) {
    return getEnv()[prop as keyof typeof validatedEnv];
  },
});

