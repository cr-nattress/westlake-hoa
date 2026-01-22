/**
 * Client-side document parsing utilities
 * Supports: PDF, TXT, MD files
 */

export interface ParsedDocument {
  content: string;
  name: string;
  type: string;
  size: number;
}

export interface ParseError {
  message: string;
  code: "INVALID_TYPE" | "FILE_TOO_LARGE" | "PARSE_ERROR" | "EMPTY_FILE";
}

// Supported file types
export const SUPPORTED_TYPES = {
  "application/pdf": "PDF",
  "text/plain": "TXT",
  "text/markdown": "MD",
  ".pdf": "PDF",
  ".txt": "TXT",
  ".md": "MD",
} as const;

// 5MB file size limit
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Max characters to extract (to avoid overwhelming the AI)
const MAX_CONTENT_LENGTH = 50000;

/**
 * Check if a file type is supported
 */
export function isSupportedFileType(file: File): boolean {
  const mimeSupported = file.type in SUPPORTED_TYPES;
  const extSupported = Object.keys(SUPPORTED_TYPES).some(
    (ext) => ext.startsWith(".") && file.name.toLowerCase().endsWith(ext)
  );
  return mimeSupported || extSupported;
}

/**
 * Get file extension from filename
 */
function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? `.${parts.pop()?.toLowerCase()}` : "";
}

/**
 * Parse a text file (TXT or MD)
 */
async function parseTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      resolve(content);
    };
    reader.onerror = () => reject(new Error("Failed to read text file"));
    reader.readAsText(file);
  });
}

/**
 * Parse a PDF file using pdf.js
 */
async function parsePDFFile(file: File): Promise<string> {
  // Dynamically import pdfjs-dist to avoid SSR issues
  const pdfjsLib = await import("pdfjs-dist");

  // Set the worker source - using locally hosted worker for security
  // This avoids supply chain risks from CDN and ensures CSP compliance
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const textContent: string[] = [];

  // Extract text from each page
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => {
        if ("str" in item) {
          return item.str;
        }
        return "";
      })
      .join(" ");
    textContent.push(pageText);
  }

  return textContent.join("\n\n");
}

/**
 * Parse a document file and extract its text content
 */
export async function parseDocument(
  file: File
): Promise<{ success: true; document: ParsedDocument } | { success: false; error: ParseError }> {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: {
        message: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
        code: "FILE_TOO_LARGE",
      },
    };
  }

  // Check file type
  if (!isSupportedFileType(file)) {
    return {
      success: false,
      error: {
        message: "Unsupported file type. Please upload a PDF, TXT, or MD file.",
        code: "INVALID_TYPE",
      },
    };
  }

  try {
    let content: string;
    const ext = getFileExtension(file.name);

    // Determine parser based on file type
    if (file.type === "application/pdf" || ext === ".pdf") {
      content = await parsePDFFile(file);
    } else {
      content = await parseTextFile(file);
    }

    // Check if content was extracted
    if (!content.trim()) {
      return {
        success: false,
        error: {
          message: "Could not extract any text from the file. The file may be empty or contain only images.",
          code: "EMPTY_FILE",
        },
      };
    }

    // Truncate content if too long
    const truncatedContent = content.length > MAX_CONTENT_LENGTH
      ? content.substring(0, MAX_CONTENT_LENGTH) + "\n\n[Document truncated due to length...]"
      : content;

    return {
      success: true,
      document: {
        content: truncatedContent,
        name: file.name,
        type: file.type || ext,
        size: file.size,
      },
    };
  } catch (error) {
    console.error("Document parse error:", error);
    return {
      success: false,
      error: {
        message: "Failed to parse the document. Please try a different file.",
        code: "PARSE_ERROR",
      },
    };
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
