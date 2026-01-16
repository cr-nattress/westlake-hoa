"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/**
 * Renders markdown content with GitHub-flavored markdown support.
 * Includes proper styling for tables, lists, code blocks, and other elements.
 */
export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none",
        // Headings
        "prose-headings:scroll-mt-20",
        "prose-h1:text-2xl prose-h1:font-bold prose-h1:border-b prose-h1:pb-2 prose-h1:mb-4",
        "prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-3",
        "prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2",
        // Tables
        "prose-table:border-collapse prose-table:w-full",
        "prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-semibold",
        "prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2",
        // Lists
        "prose-ul:my-2 prose-ol:my-2",
        "prose-li:my-0.5",
        // Links
        "prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:text-primary/80",
        // Code
        "prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
        // Blockquotes
        "prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:not-italic",
        // Strong/Bold
        "prose-strong:font-semibold",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
