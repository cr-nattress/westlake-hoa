/**
 * Request Validation Schemas
 *
 * Uses Zod for runtime type validation of API requests.
 * Prevents malformed requests and enforces size limits.
 */

import { z, ZodError } from "zod";

// =============================================================================
// Message Schema
// =============================================================================

export const MessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "assistant"]),
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(10000, "Message too long (max 10,000 characters)"),
  createdAt: z.union([z.string(), z.date()]).optional(),
});

export type Message = z.infer<typeof MessageSchema>;

// =============================================================================
// Attached Document Schema
// =============================================================================

export const AttachedDocumentSchema = z.object({
  name: z
    .string()
    .min(1, "Filename required")
    .max(255, "Filename too long (max 255 characters)"),
  type: z.string().max(100, "File type too long"),
  content: z
    .string()
    .max(50000, "Document content too large (max 50,000 characters)"),
  size: z
    .number()
    .int("File size must be an integer")
    .positive("File size must be positive")
    .max(5 * 1024 * 1024, "File too large (max 5MB)"),
});

export type AttachedDocument = z.infer<typeof AttachedDocumentSchema>;

// =============================================================================
// Chat Request Schema
// =============================================================================

export const ChatRequestSchema = z.object({
  messages: z
    .array(MessageSchema)
    .min(1, "At least one message required")
    .max(100, "Too many messages (max 100)"),
  attachedDocument: AttachedDocumentSchema.optional(),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;

// =============================================================================
// Validation Result Type
// =============================================================================

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details: Array<{ path: string; message: string }>;
  };
}

// =============================================================================
// Validation Helper
// =============================================================================

/**
 * Validate request data against a Zod schema
 */
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        success: false,
        error: {
          message: "Validation failed",
          details: err.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        },
      };
    }
    return {
      success: false,
      error: {
        message: "Unknown validation error",
        details: [],
      },
    };
  }
}

/**
 * Create validation error response
 */
export function validationErrorResponse(
  error: ValidationResult<unknown>["error"]
): Response {
  return new Response(
    JSON.stringify({
      error: "Invalid request",
      message: error?.message,
      details: error?.details,
    }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  );
}
