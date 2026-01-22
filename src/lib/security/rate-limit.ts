/**
 * Rate Limiting Utility
 *
 * Uses Upstash Redis for distributed rate limiting (works with Netlify).
 * Falls back to in-memory rate limiting for development or when Redis is unavailable.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Configuration
const RATE_LIMIT_REQUESTS = parseInt(process.env.RATE_LIMIT_REQUESTS || "10", 10);
const RATE_LIMIT_WINDOW = process.env.RATE_LIMIT_WINDOW || "1 m";

// In-memory fallback for development or when Redis is unavailable
const inMemoryStore = new Map<string, { count: number; resetTime: number }>();
const WINDOW_MS = 60 * 1000; // 1 minute

/**
 * Check if Upstash Redis is configured
 */
function isRedisConfigured(): boolean {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

/**
 * Create rate limiter instance
 */
let ratelimit: Ratelimit | null = null;

if (isRedisConfigured()) {
  try {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW as Parameters<typeof Ratelimit.slidingWindow>[1]),
      analytics: true,
      prefix: "westlake-hoa",
    });
  } catch {
    // Log generic error without details (security: don't expose Redis config)
    console.warn("[RATE_LIMIT] Failed to initialize Redis rate limiter, using in-memory fallback");
  }
}

/**
 * In-memory rate limit check (fallback)
 */
function checkInMemoryRateLimit(identifier: string): {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
} {
  const now = Date.now();
  const record = inMemoryStore.get(identifier);

  // Clean up expired entries periodically
  if (Math.random() < 0.01) {
    for (const [key, value] of inMemoryStore.entries()) {
      if (now > value.resetTime) {
        inMemoryStore.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    inMemoryStore.set(identifier, { count: 1, resetTime: now + WINDOW_MS });
    return {
      success: true,
      limit: RATE_LIMIT_REQUESTS,
      remaining: RATE_LIMIT_REQUESTS - 1,
      reset: now + WINDOW_MS,
    };
  }

  if (record.count >= RATE_LIMIT_REQUESTS) {
    return {
      success: false,
      limit: RATE_LIMIT_REQUESTS,
      remaining: 0,
      reset: record.resetTime,
    };
  }

  record.count++;
  return {
    success: true,
    limit: RATE_LIMIT_REQUESTS,
    remaining: RATE_LIMIT_REQUESTS - record.count,
    reset: record.resetTime,
  };
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check rate limit for a given identifier (usually IP address)
 */
export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  // Use Upstash Redis if available
  if (ratelimit) {
    try {
      const result = await ratelimit.limit(identifier);
      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      };
    } catch {
      // Log generic error without details (security: don't expose Redis errors)
      console.warn("[RATE_LIMIT] Redis check failed, using in-memory fallback");
    }
  }

  // Fallback to in-memory rate limiting
  return checkInMemoryRateLimit(identifier);
}

/**
 * Get client IP address from request headers
 */
export function getClientIP(req: Request): string {
  // Check various headers in order of preference
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }

  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }

  // Netlify-specific header
  const netlifyIP = req.headers.get("x-nf-client-connection-ip");
  if (netlifyIP) {
    return netlifyIP.trim();
  }

  return "unknown";
}

/**
 * Create rate limit exceeded response
 */
export function rateLimitExceededResponse(result: RateLimitResult): Response {
  const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);

  return new Response(
    JSON.stringify({
      error: "Rate limit exceeded. Please try again later.",
      retryAfter,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Limit": result.limit.toString(),
        "X-RateLimit-Remaining": result.remaining.toString(),
        "X-RateLimit-Reset": result.reset.toString(),
        "Retry-After": retryAfter.toString(),
      },
    }
  );
}
