/**
 * Security Module
 *
 * Exports all security utilities for rate limiting, validation, and sanitization.
 */

export {
  checkRateLimit,
  getClientIP,
  rateLimitExceededResponse,
  type RateLimitResult,
} from "./rate-limit";

export {
  MessageSchema,
  AttachedDocumentSchema,
  ChatRequestSchema,
  validateRequest,
  validationErrorResponse,
  type Message,
  type AttachedDocument,
  type ChatRequest,
  type ValidationResult,
} from "./validation";

export {
  sanitizeForPrompt,
  escapeRegex,
  sanitizeFilename,
  sanitizeForLogging,
  isValidUrlProtocol,
} from "./sanitize";

export {
  validateFileMetadata,
  validateTextContent,
  validateUploadedDocument,
  type FileValidationResult,
} from "./file-validation";
