"use client";

import { useState, useCallback } from "react";
import {
  parseDocument,
  type ParsedDocument,
  type ParseError,
  isSupportedFileType,
  MAX_FILE_SIZE,
} from "@/lib/utils/parse-document";

interface UseFileUploadReturn {
  file: File | null;
  document: ParsedDocument | null;
  error: ParseError | null;
  isLoading: boolean;
  selectFile: (file: File) => Promise<void>;
  clearFile: () => void;
  handleDrop: (e: React.DragEvent) => Promise<void>;
  handleDragOver: (e: React.DragEvent) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}

export function useFileUpload(): UseFileUploadReturn {
  const [file, setFile] = useState<File | null>(null);
  const [document, setDocument] = useState<ParsedDocument | null>(null);
  const [error, setError] = useState<ParseError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const selectFile = useCallback(async (selectedFile: File) => {
    // Reset state
    setError(null);
    setDocument(null);
    setFile(selectedFile);
    setIsLoading(true);

    try {
      const result = await parseDocument(selectedFile);

      if (result.success) {
        setDocument(result.document);
      } else {
        setError(result.error);
        setFile(null);
      }
    } catch (err) {
      setError({
        message: "An unexpected error occurred while processing the file.",
        code: "PARSE_ERROR",
      });
      setFile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearFile = useCallback(() => {
    setFile(null);
    setDocument(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];

      // Quick validation before processing
      if (!isSupportedFileType(droppedFile)) {
        setError({
          message: "Unsupported file type. Please upload a PDF, TXT, or MD file.",
          code: "INVALID_TYPE",
        });
        return;
      }

      if (droppedFile.size > MAX_FILE_SIZE) {
        setError({
          message: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
          code: "FILE_TOO_LARGE",
        });
        return;
      }

      await selectFile(droppedFile);
    }
  }, [selectFile]);

  return {
    file,
    document,
    error,
    isLoading,
    selectFile,
    clearFile,
    handleDrop,
    handleDragOver,
    isDragging,
    setIsDragging,
  };
}
