"use client";

import { useRef } from "react";
import { Paperclip, X, FileText, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatFileSize, SUPPORTED_TYPES, MAX_FILE_SIZE } from "@/lib/utils/parse-document";
import type { ParsedDocument, ParseError } from "@/lib/utils/parse-document";

interface FileUploadProps {
  file: File | null;
  document: ParsedDocument | null;
  error: ParseError | null;
  isLoading: boolean;
  onSelectFile: (file: File) => Promise<void>;
  onClearFile: () => void;
  disabled?: boolean;
  compact?: boolean;
}

export function FileUpload({
  file,
  document,
  error,
  isLoading,
  onSelectFile,
  onClearFile,
  disabled = false,
  compact = false,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      await onSelectFile(selectedFile);
    }
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Supported file extensions for accept attribute
  const acceptedTypes = Object.keys(SUPPORTED_TYPES)
    .filter((key) => key.startsWith("."))
    .join(",");

  return (
    <div className="flex flex-col gap-2">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isLoading}
      />

      {/* Upload button - shown when no file is attached */}
      {!file && !document && !error && (
        <Button
          type="button"
          variant="ghost"
          size={compact ? "icon-sm" : "icon"}
          onClick={handleButtonClick}
          disabled={disabled || isLoading}
          className={cn("text-muted-foreground hover:text-foreground")}
          title={`Attach document (PDF, TXT, MD - max ${MAX_FILE_SIZE / 1024 / 1024}MB)`}
        >
          <Paperclip className={cn(compact ? "h-4 w-4" : "h-5 w-5")} />
        </Button>
      )}

      {/* Loading state */}
      {isLoading && (
        <div
          className={cn(
            "flex items-center gap-2 bg-muted rounded-lg",
            compact ? "px-2 py-1" : "px-3 py-2"
          )}
        >
          <Loader2 className={cn("animate-spin text-muted-foreground", compact ? "h-3 w-3" : "h-4 w-4")} />
          <span className={cn("text-muted-foreground", compact ? "text-xs" : "text-sm")}>
            Processing...
          </span>
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div
          className={cn(
            "flex items-center gap-2 bg-destructive/10 text-destructive rounded-lg",
            compact ? "px-2 py-1" : "px-3 py-2"
          )}
        >
          <AlertCircle className={cn(compact ? "h-3 w-3" : "h-4 w-4", "flex-shrink-0")} />
          <span className={cn("flex-1 truncate", compact ? "text-xs" : "text-sm")}>
            {error.message}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClearFile}
            className="h-5 w-5 text-destructive hover:text-destructive hover:bg-destructive/20"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Attached file indicator */}
      {document && !isLoading && !error && (
        <div
          className={cn(
            "flex items-center gap-2 bg-primary/10 rounded-lg",
            compact ? "px-2 py-1" : "px-3 py-2"
          )}
        >
          <FileText className={cn("text-primary flex-shrink-0", compact ? "h-3 w-3" : "h-4 w-4")} />
          <div className="flex-1 min-w-0">
            <span className={cn("font-medium truncate block", compact ? "text-xs" : "text-sm")}>
              {document.name}
            </span>
            <span className={cn("text-muted-foreground", compact ? "text-[10px]" : "text-xs")}>
              {formatFileSize(document.size)}
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClearFile}
            className="h-5 w-5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}

interface FileUploadIndicatorProps {
  document: ParsedDocument;
  onClear: () => void;
  compact?: boolean;
}

export function FileUploadIndicator({
  document,
  onClear,
  compact = false,
}: FileUploadIndicatorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg",
        compact ? "px-2 py-1.5" : "px-3 py-2"
      )}
    >
      <FileText className={cn("text-primary flex-shrink-0", compact ? "h-4 w-4" : "h-5 w-5")} />
      <div className="flex-1 min-w-0">
        <span className={cn("font-medium truncate block", compact ? "text-xs" : "text-sm")}>
          {document.name}
        </span>
        <span className={cn("text-muted-foreground", compact ? "text-[10px]" : "text-xs")}>
          {formatFileSize(document.size)} - Ready to analyze
        </span>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onClear}
        className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-primary/10"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface DropZoneOverlayProps {
  isDragging: boolean;
}

export function DropZoneOverlay({ isDragging }: DropZoneOverlayProps) {
  if (!isDragging) return null;

  return (
    <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center z-10 pointer-events-none">
      <div className="text-center">
        <Paperclip className="h-8 w-8 text-primary mx-auto mb-2" />
        <p className="text-sm font-medium text-primary">Drop file to attach</p>
        <p className="text-xs text-muted-foreground">PDF, TXT, or MD</p>
      </div>
    </div>
  );
}
