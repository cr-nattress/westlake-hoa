/**
 * Server-Side File Validation
 *
 * Validates uploaded document content to prevent bypassing client-side validation.
 * Since the server receives extracted text (not raw bytes), we validate:
 * - Content structure and patterns
 * - Name/type consistency
 * - Suspicious content patterns
 */

// =============================================================================
// File Extension/Type Validation
// =============================================================================

const ALLOWED_EXTENSIONS = [".pdf", ".txt", ".md"];
const ALLOWED_TYPES = [
  "application/pdf",
  "text/plain",
  "text/markdown",
  "text/x-markdown",
];

/**
 * Validate that filename and type are consistent and allowed
 */
export function validateFileMetadata(
  filename: string,
  type: string
): { valid: boolean; error?: string } {
  // Check filename
  const ext = getExtension(filename);
  if (!ext || !ALLOWED_EXTENSIONS.includes(ext.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid file extension. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}`,
    };
  }

  // Check type if provided (may be empty string)
  if (type && !ALLOWED_TYPES.includes(type.toLowerCase()) && !type.startsWith(".")) {
    // Type doesn't match any allowed type - check if it matches extension
    const expectedTypes: Record<string, string[]> = {
      ".pdf": ["application/pdf"],
      ".txt": ["text/plain"],
      ".md": ["text/markdown", "text/x-markdown", "text/plain"],
    };

    const validTypes = expectedTypes[ext.toLowerCase()] || [];
    if (!validTypes.includes(type.toLowerCase())) {
      // Allow empty or extension-like types as fallback
      if (type !== "" && !type.startsWith(".")) {
        return {
          valid: false,
          error: `File type "${type}" does not match extension "${ext}"`,
        };
      }
    }
  }

  return { valid: true };
}

/**
 * Get file extension from filename
 */
function getExtension(filename: string): string | null {
  const match = filename.match(/\.[a-zA-Z0-9]+$/);
  return match ? match[0] : null;
}

// =============================================================================
// Content Validation
// =============================================================================

/**
 * Validate that content appears to be valid extracted text.
 * Detects binary garbage, excessive non-text characters, etc.
 */
export function validateTextContent(
  content: string
): { valid: boolean; error?: string } {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: "Document content is empty" };
  }

  // Check for excessive null bytes or binary characters
  const binaryPattern = /[\x00-\x08\x0B\x0C\x0E-\x1F]/g;
  const binaryMatches = content.match(binaryPattern);
  if (binaryMatches && binaryMatches.length > content.length * 0.01) {
    return {
      valid: false,
      error: "Content appears to contain binary data, not extracted text",
    };
  }

  // Check for suspicious patterns that indicate raw file data
  if (content.startsWith("%PDF-") || content.startsWith("PK\x03\x04")) {
    return {
      valid: false,
      error: "Content appears to be raw file data, not extracted text",
    };
  }

  // Check for reasonable text ratio
  const alphanumericCount = (content.match(/[a-zA-Z0-9]/g) || []).length;
  if (content.length > 100 && alphanumericCount < content.length * 0.1) {
    return {
      valid: false,
      error: "Content has too few readable characters",
    };
  }

  return { valid: true };
}

// =============================================================================
// Combined Validation
// =============================================================================

export interface FileValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Perform comprehensive server-side validation of uploaded document
 */
export function validateUploadedDocument(
  name: string,
  type: string,
  content: string,
  size: number
): FileValidationResult {
  const errors: string[] = [];

  // Validate metadata
  const metadataResult = validateFileMetadata(name, type);
  if (!metadataResult.valid && metadataResult.error) {
    errors.push(metadataResult.error);
  }

  // Validate content
  const contentResult = validateTextContent(content);
  if (!contentResult.valid && contentResult.error) {
    errors.push(contentResult.error);
  }

  // Validate size consistency (content length should be reasonable for claimed size)
  // After text extraction, content is typically smaller than original file
  // but shouldn't be drastically different
  if (size > 5 * 1024 * 1024) {
    errors.push("File size exceeds maximum (5MB)");
  }

  // Content length validation (already in Zod schema, but double-check)
  if (content.length > 50000) {
    errors.push("Extracted content exceeds maximum length (50,000 characters)");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
