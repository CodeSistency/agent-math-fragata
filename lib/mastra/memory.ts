import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { env } from "@/lib/env";

export const memory = new Memory({
  storage: new LibSQLStore({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  }),
  options: {
    lastMessages: 20, // Keep last 20 messages in context
  },
});



