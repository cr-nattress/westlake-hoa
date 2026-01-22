/**
 * Content Sanitization Utilities
 *
 * Sanitizes user input to prevent prompt injection and other attacks.
 */

// =============================================================================
// Prompt Injection Prevention
// =============================================================================

/**
 * Sanitize content before embedding in AI prompts.
 * Escapes characters that could be used for prompt injection.
 */
export function sanitizeForPrompt(content: string, maxLength = 50000): string {
  return (
    content
      // Escape triple backticks (could break code blocks)
      .replace(/```/g, "'''")
      // Escape template literal markers
      .replace(/\${/g, "\\${")
      // Escape single backticks
      .replace(/`/g, "'")
      // Remove potential instruction override patterns
      .replace(/\[INST\]/gi, "[INS T]")
      .replace(/\[\/INST\]/gi, "[/INS T]")
      .replace(/<\|im_start\|>/gi, "")
      .replace(/<\|im_end\|>/gi, "")
      // Limit length
      .slice(0, maxLength)
  );
}

// =============================================================================
// Regex Escape (ReDoS Prevention)
// =============================================================================

/**
 * Escape special regex characters to prevent ReDoS attacks.
 * Use this when building regex from user input.
 */
export function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// =============================================================================
// Filename Sanitization
// =============================================================================

/**
 * Sanitize filename to prevent path traversal and invalid characters.
 */
export function sanitizeFilename(filename: string): string {
  return (
    filename
      // Remove path traversal attempts
      .replace(/\.\./g, "")
      .replace(/[/\\]/g, "")
      // Remove null bytes
      .replace(/\0/g, "")
      // Keep only safe characters
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      // Limit length
      .slice(0, 255)
  );
}

// =============================================================================
// Log Sanitization
// =============================================================================

/**
 * Sanitize content for logging.
 * Removes sensitive data and truncates long content.
 */
export function sanitizeForLogging(
  content: string,
  maxLength = 500
): string {
  return (
    content
      // Remove potential secrets (basic patterns)
      .replace(/sk-[a-zA-Z0-9-_]{20,}/g, "[REDACTED_KEY]")
      .replace(/eyJ[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+/g, "[REDACTED_JWT]")
      // Remove email addresses
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[REDACTED_EMAIL]")
      // Truncate
      .slice(0, maxLength)
  );
}

// =============================================================================
// URL Validation
// =============================================================================

/**
 * Validate URL protocol to prevent javascript: and data: URLs.
 */
export function isValidUrlProtocol(url: string): boolean {
  try {
    const parsed = new URL(url, "https://example.com");
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    // Relative URLs are okay
    return url.startsWith("/") || url.startsWith("./") || url.startsWith("#");
  }
}
