# Epic 11: Security Hardening & Best Practices

## Overview

Comprehensive security hardening of the Westlake HOA website based on a deep security audit. This epic addresses vulnerabilities discovered across API routes, client-side code, dependencies, configuration, and data handling practices.

## Business Value

**Problem:** Security audit revealed multiple vulnerabilities including:
- **1 Critical Issue:** Missing rate limiting on public API
- **3 High Issues:** Missing authentication, security middleware, input validation
- **9 Medium Issues:** Input validation gaps, prompt injection risks, missing security headers
- **5 Low Issues:** Minor logging and configuration concerns

**Solution:** Implement security controls across all layers of the application following OWASP Top 10 and Next.js security best practices.

**Impact:**
- Protect user data and prevent unauthorized access
- Prevent API abuse and cost overruns
- Mitigate XSS, injection, and DoS attacks
- Ensure compliance with security best practices
- Build trust with HOA residents

## Security Audit Summary

### Critical Findings (Immediate Action Required)

| Finding | Location | Risk |
|---------|----------|------|
| Missing Rate Limiting | `/api/chat` route | DoS and cost abuse |

### High Severity Findings

| Finding | Location | Risk |
|---------|----------|------|
| Missing Authentication | `/api/chat` route | Public API, no auth checks |
| Missing Security Middleware | No `middleware.ts` | No CSRF, headers, or request validation |
| No Input Validation Schema | `chat/route.ts:144` | Malformed requests crash server |

### Medium Severity Findings

| Finding | Location | Risk |
|---------|----------|------|
| Prompt Injection via Uploads | `chat/route.ts:113-127` | AI manipulation via document content |
| ReDoS Vulnerability | `context-builder.ts:349` | CPU exhaustion via crafted queries |
| Missing Security Headers | `next.config.ts` | XSS, clickjacking exposure |
| Missing CSP | `next.config.ts` | Script injection possible |
| Insecure Cookie Config | `supabase/server.ts` | Session vulnerabilities |
| PDF.js CDN Dependency | `parse-document.ts:76` | Supply chain risk |
| Sensitive Data Logging | `chat/route.ts:157-171` | Information disclosure |
| Client-Only File Validation | `parse-document.ts` | Bypass via spoofed MIME |

### Low Severity Findings

| Finding | Location | Risk |
|---------|----------|------|
| No API Versioning | `/api/chat` | Breaking changes affect all clients |
| Missing Request Logging | API routes | No security event tracking |
| Markdown Link Protocol | `enhanced-markdown.tsx` | javascript: URL possible |
| Error Details in Logs | Multiple files | Stack traces exposed |
| File Paths in Logs | `load-document-content.ts` | Structure disclosure |

## User Stories

| ID | Story | Points | Priority | Dependencies |
|----|-------|--------|----------|--------------|
| 11.3 | Implement API Rate Limiting | 5 | Critical | None |
| 11.4 | Add Request Validation Schema | 5 | High | None |
| 11.5 | Implement Security Headers | 3 | High | None |
| 11.6 | Add Security Middleware | 5 | High | 11.5 |
| 11.7 | Sanitize Prompt Injection Vectors | 5 | High | 11.4 |
| 11.8 | Fix ReDoS Vulnerabilities | 3 | Medium | None |
| 11.9 | Implement Server-Side File Validation | 3 | Medium | 11.4 |
| 11.10 | Secure Cookie Configuration | 2 | Medium | 11.6 |
| 11.11 | Host PDF.js Worker Locally | 2 | Medium | None |
| 11.12 | Sanitize Logging Practices | 3 | Medium | None |
| 11.13 | Add Security Event Logging | 3 | Low | 11.6 |
| 11.14 | Implement API Versioning | 2 | Low | None |

**Total Points:** 41

## Phase Breakdown

### Phase 11A: Critical Remediation (Story 11.3)
**Goal:** Address critical vulnerability immediately
- Implement rate limiting to prevent API abuse and DoS attacks

### Phase 11B: Input Security (Stories 11.4, 11.7, 11.8, 11.9)
**Goal:** Secure all input vectors
- Add zod schema validation
- Sanitize document content for prompt injection
- Fix ReDoS vulnerabilities
- Server-side file validation

### Phase 11C: Infrastructure Security (Stories 11.5, 11.6, 11.10, 11.11)
**Goal:** Harden infrastructure and configuration
- Add security headers (CSP, HSTS, X-Frame-Options)
- Create security middleware
- Secure cookie configuration
- Remove external CDN dependencies

### Phase 11D: Monitoring & Best Practices (Stories 11.12, 11.13, 11.14)
**Goal:** Improve visibility and maintainability
- Sanitize logging practices
- Add security event logging
- Implement API versioning

## Technical Implementation Details

### 11.3 Implement API Rate Limiting

```typescript
// Using Upstash Redis (works with Netlify)
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 req/min
  analytics: true,
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
      status: 429,
      headers: {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString(),
      },
    });
  }
  // ... rest of handler
}
```

### 11.4 Add Request Validation Schema

```typescript
// src/lib/validation/chat-schema.ts
import { z } from "zod";

export const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(10000),
  id: z.string().optional(),
});

export const AttachedDocumentSchema = z.object({
  name: z.string().max(255),
  type: z.string().max(50),
  content: z.string().max(50000),
  size: z.number().int().positive().max(5 * 1024 * 1024),
});

export const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(100),
  attachedDocument: AttachedDocumentSchema.optional(),
});
```

### 11.5 Implement Security Headers

Update `netlify.toml` to add missing security headers (CSP and HSTS):

```toml
# netlify.toml - Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    # Add these missing headers:
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.anthropic.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests"
```

**Note:** Some headers already exist in `netlify.toml`. Only CSP and HSTS need to be added.

### 11.6 Add Security Middleware

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers (backup to next.config)
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");

  // CSRF token validation for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (origin && !origin.includes(host || "")) {
      return new NextResponse(null, { status: 403 });
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

### 11.7 Sanitize Prompt Injection Vectors

```typescript
// src/lib/utils/sanitize.ts
export function sanitizeForPrompt(content: string): string {
  return content
    .replace(/```/g, "'''")  // Escape code blocks
    .replace(/\$/g, "\\$")   // Escape template literals
    .replace(/`/g, "'")      // Escape backticks
    .slice(0, 50000);        // Enforce length limit
}

// In chat/route.ts
const sanitizedContent = sanitizeForPrompt(attachedDocument.content);
```

### 11.8 Fix ReDoS Vulnerabilities

```typescript
// src/lib/ai/context-builder.ts
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Line 349: Use escaped word
const escapedWord = escapeRegex(word);
const matches = sectionLower.match(new RegExp(escapedWord, "gi"));
```

### 11.9 Server-Side File Validation

```typescript
// src/lib/utils/validate-file.ts
const FILE_SIGNATURES = {
  pdf: [0x25, 0x50, 0x44, 0x46], // %PDF
  txt: null, // No magic bytes for text
};

export function validateFileContent(
  buffer: ArrayBuffer,
  expectedType: string
): boolean {
  const bytes = new Uint8Array(buffer);
  const signature = FILE_SIGNATURES[expectedType];

  if (!signature) return true; // Text files

  return signature.every((byte, i) => bytes[i] === byte);
}
```

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Critical vulnerabilities | 1 | 0 |
| High vulnerabilities | 3 | 0 |
| Security headers score | F | A |
| Rate limiting | None | 10 req/min |
| Input validation coverage | 0% | 100% |

## Dependencies

- **New Dependencies:**
  - `@upstash/ratelimit` - Rate limiting
  - `@upstash/redis` - Redis client for rate limiting
  - `zod` - Schema validation (already installed)

- **Infrastructure:**
  - Upstash Redis account (free tier available)
  - Netlify environment variables for Redis credentials

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Rate limiting blocks legitimate users | Medium | Medium | Start with generous limits, monitor |
| CSP breaks functionality | Medium | Low | Test all features, use report-only first |

## Testing Checklist

- [ ] All API endpoints respond correctly after validation
- [ ] Rate limiting triggers at expected threshold
- [ ] Security headers present in all responses
- [ ] File upload rejects invalid files server-side
- [ ] Prompt injection attempts are sanitized
- [ ] No sensitive data in production logs
- [ ] CORS properly configured
- [ ] Cookies have secure attributes

## Deployment Checklist

### Pre-Deployment
- [ ] Run full test suite
- [ ] Test CSP in report-only mode

### Deployment
- [ ] Deploy to staging first
- [ ] Verify all security headers
- [ ] Test rate limiting
- [ ] Monitor error rates
- [ ] Check application functionality

### Post-Deployment
- [ ] Monitor logs for blocked requests
- [ ] Run security scan
- [ ] Document any issues
- [ ] Update security documentation

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [Supabase Security](https://supabase.com/docs/guides/platform/security)
- [Anthropic API Security](https://docs.anthropic.com/claude/docs/security)
