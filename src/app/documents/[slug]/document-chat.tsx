"use client";

import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useFileUpload } from "@/hooks/use-file-upload";
import { FileUpload, FileUploadIndicator, DropZoneOverlay } from "@/components/chat/file-upload";

interface DocumentChatProps {
  documentTitle: string;
  documentSummary: string | null;
  documentType: string;
}

export function DocumentChat({
  documentTitle,
}: DocumentChatProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // File upload hook
  const {
    file,
    document: attachedDocument,
    error: fileError,
    isLoading: isFileLoading,
    selectFile,
    clearFile,
    handleDrop,
    handleDragOver,
    isDragging,
    setIsDragging,
  } = useFileUpload();

  // Document context is built server-side based on the query
  // The AI will prioritize documents matching keywords in the question
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: attachedDocument
        ? {
            attachedDocument: {
              name: attachedDocument.name,
              type: attachedDocument.type,
              content: attachedDocument.content,
              size: attachedDocument.size,
            },
          }
        : undefined,
    });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  };

  // Custom submit handler that clears the attached file after sending
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleSubmit(e);
      // Clear the attached file after sending
      if (attachedDocument) {
        clearFile();
      }
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        handleFormSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
    }
  };

  // Handle drag leave to stop showing overlay
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const suggestedQuestions = [
    "What are the key points?",
    "Explain in simple terms",
    "What are my rights?",
  ];

  return (
    <div
      className="flex flex-col h-[400px] relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag and drop overlay */}
      <DropZoneOverlay isDragging={isDragging} />

      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0 -mx-4 px-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-4">
            <Bot className="h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              Ask questions about this document
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    const event = {
                      target: { value: question },
                    } as React.ChangeEvent<HTMLTextAreaElement>;
                    handleInputChange(event);
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3 py-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 max-w-[85%] text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-3 w-3 text-primary" />
                </div>
                <div className="rounded-lg px-3 py-2 bg-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t pt-3 mt-3 -mx-4 px-4">
        {/* Attached file indicator */}
        {attachedDocument && (
          <div className="mb-2">
            <FileUploadIndicator document={attachedDocument} onClear={clearFile} compact />
          </div>
        )}

        {/* File error display */}
        {fileError && !attachedDocument && (
          <div className="mb-2 p-2 bg-destructive/10 text-destructive text-xs rounded-lg">
            {fileError.message}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex gap-2">
          {/* File upload button */}
          {!attachedDocument && (
            <div className="flex items-end">
              <FileUpload
                file={file}
                document={attachedDocument}
                error={fileError}
                isLoading={isFileLoading}
                onSelectFile={selectFile}
                onClearFile={clearFile}
                disabled={isLoading}
                compact
              />
            </div>
          )}

          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={attachedDocument ? "Ask about the attached file..." : "Ask a question..."}
            className="min-h-[40px] max-h-[100px] resize-none text-sm"
            disabled={isLoading}
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="h-[40px] w-[40px] flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
