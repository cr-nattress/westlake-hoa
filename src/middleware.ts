/**
 * Security Middleware
 *
 * Provides security checks for all requests:
 * - CSRF/origin validation for API routes
 * - Security headers (backup to netlify.toml)
 * - Request logging for security events
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Validate that the request origin matches the host
 */
function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  // No origin header (same-origin request or non-browser client)
  if (!origin) {
    return true;
  }

  // No host header (shouldn't happen in practice)
  if (!host) {
    return false;
  }

  // Extract hostname from origin (handles both http and https)
  try {
    const originUrl = new URL(origin);
    const originHost = originUrl.host;

    // Allow same-origin requests
    if (originHost === host) {
      return true;
    }

    // Allow localhost in development
    if (process.env.NODE_ENV === "development") {
      if (originHost.startsWith("localhost") || originHost.startsWith("127.0.0.1")) {
        return true;
      }
    }

    // Allow configured allowed origins
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) || [];
    if (allowedOrigins.some((allowed) => originHost === allowed || origin === allowed)) {
      return true;
    }

    return false;
  } catch {
    // Invalid origin URL
    return false;
  }
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // Security headers (backup to netlify.toml - these will be overridden by Netlify headers)
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // API route protection
  if (pathname.startsWith("/api/")) {
    // Validate origin for non-GET requests (CSRF protection)
    if (request.method !== "GET" && request.method !== "HEAD" && request.method !== "OPTIONS") {
      if (!isValidOrigin(request)) {
        const origin = request.headers.get("origin") || "unknown";
        const host = request.headers.get("host") || "unknown";
        console.warn(`[SECURITY] CSRF blocked: origin=${origin}, host=${host}, path=${pathname}`);

        return new NextResponse(
          JSON.stringify({ error: "Invalid origin" }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Log API requests (minimal info for security monitoring)
    const clientIP = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
                     request.headers.get("x-nf-client-connection-ip") ||
                     "unknown";
    console.log(`[API] ${request.method} ${pathname} - IP: ${clientIP.slice(0, 8)}***`);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
