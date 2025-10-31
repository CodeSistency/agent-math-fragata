import { NextRequest } from "next/server";
import { mastra } from "@/lib/mastra";
import { rateLimit, getClientIdentifier } from "@/lib/middleware/rate-limit";
import { VectorStoreV2 } from "@/lib/rag/vector-store-v2";
import { env } from "@/lib/env";

let vectorInitPromise: Promise<void> | null = null;

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  // Initialize vector store only if using v1 (v2 doesn't need it)
  if (!env.USE_MASTRA_V2) {
  if (!vectorInitPromise) {
    vectorInitPromise = VectorStoreV2.initializeBookVectorStore();
  }
  await vectorInitPromise;
  }
  try {
    // Rate limiting: 20 requests per minute per IP
    const clientId = getClientIdentifier(request);
    const rateLimitResult = rateLimit(clientId, { limit: 20, window: 60000 });
    
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          message: "Too many requests. Please try again later.",
          resetAt: rateLimitResult.resetAt,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": "20",
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.resetAt).toISOString(),
            "Retry-After": Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const { messages, threadId, resourceId } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          message: "Messages must be an array",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (messages.length === 0) {
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          message: "At least one message is required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Use v2 if feature flag is enabled, otherwise use v1
    let agent;
    if (env.USE_MASTRA_V2) {
      const { mastraV2 } = await import("@/lib/mastra/v2");
      agent = mastraV2.getAgent("supervisorAgentV2");
    } else {
      agent = mastra.getAgent("supervisorAgent");
    }

    // When using format: "aisdk", Mastra accepts AI SDK messages directly
    // No manual conversion needed - Mastra handles format conversion internally
    const result = await agent.stream(messages, {
      format: "aisdk",
      memory: threadId && resourceId
        ? {
            thread: threadId,
            resource: resourceId,
          }
        : undefined,
    });

    // Return AI SDK compatible stream response with rate limit headers
    const response = result.toUIMessageStreamResponse();
    
    // Add rate limit headers to response
    const headers = new Headers(response.headers);
    headers.set("X-RateLimit-Limit", "20");
    headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString());
    headers.set("X-RateLimit-Reset", new Date(rateLimitResult.resetAt).toISOString());
    
    return new Response(response.body, {
      ...response,
      headers,
    });
  } catch (error) {
    console.error("Chat error:", error);
    
    // More specific error handling
    if (error instanceof SyntaxError) {
      return new Response(
        JSON.stringify({
          error: "Invalid JSON",
          message: "Request body must be valid JSON",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Failed to process chat",
        message: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

