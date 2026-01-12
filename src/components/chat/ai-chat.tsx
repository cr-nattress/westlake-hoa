"use client";

import { useChat, type Message } from "ai/react";
import { useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface AIChatProps {
  initialMessage?: string;
  documentContext?: Array<{
    title: string;
    content: string;
    section?: string;
  }>;
}

export function AIChat({ initialMessage, documentContext }: AIChatProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "/api/chat",
      body: {
        documentContext,
      },
      initialMessages: initialMessage
        ? [{ id: "initial", role: "user" as const, content: initialMessage }]
        : [],
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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  // Handle Enter key (submit on Enter, new line on Shift+Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      }
    }
  };

  return (
    <Card className="flex flex-col h-[500px] md:h-[600px]">
      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <Bot className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">HOA Document Assistant</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Ask me questions about HOA policies, insurance, collections,
              records requests, and more. I&apos;ll cite official documents in my
              answers.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message: Message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-3 max-w-[85%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {message.role === "assistant" ? (
                      <MessageContent content={message.content} />
                    ) : (
                      <p className="m-0 whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-lg px-4 py-3 bg-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about HOA documents..."
              className="min-h-[44px] max-h-[120px] resize-none pr-10"
              disabled={isLoading}
              rows={1}
            />
          </div>
          <div className="flex flex-col gap-1">
            {isLoading ? (
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={stop}
                className="h-[44px] w-[44px]"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-[44px] w-[44px]"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </Card>
  );
}

// Component to render message content with basic markdown support
function MessageContent({ content }: { content: string }) {
  // Split content into paragraphs and render
  const paragraphs = content.split("\n\n");

  return (
    <>
      {paragraphs.map((paragraph, index) => {
        // Check if it's a list
        if (paragraph.includes("\n- ") || paragraph.startsWith("- ")) {
          const items = paragraph.split("\n").filter((line) => line.startsWith("- "));
          return (
            <ul key={index} className="list-disc pl-4 my-2">
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{item.replace(/^- /, "")}</li>
              ))}
            </ul>
          );
        }

        // Check if it's a heading (starts with ###)
        if (paragraph.startsWith("### ")) {
          return (
            <h4 key={index} className="font-semibold mt-3 mb-1">
              {paragraph.replace(/^### /, "")}
            </h4>
          );
        }

        // Check if it starts with "Source:" for citation styling
        if (paragraph.startsWith("Source:")) {
          return (
            <p key={index} className="text-sm text-muted-foreground italic mt-2">
              {paragraph}
            </p>
          );
        }

        // Regular paragraph
        return (
          <p key={index} className="my-2 whitespace-pre-wrap">
            {paragraph}
          </p>
        );
      })}
    </>
  );
}
