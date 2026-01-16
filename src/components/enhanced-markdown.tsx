"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

interface EnhancedMarkdownProps {
  content: string;
  className?: string;
}

/**
 * Generate a URL-safe slug from text
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Highlight important values in text (amounts, percentages, dates)
 */
function highlightValues(text: string): React.ReactNode {
  // Pattern for dollar amounts, percentages, dates, phone numbers
  const patterns = [
    // Dollar amounts: $50, $1,000, $22,460,000
    { regex: /\$[\d,]+(?:\.\d{2})?/g, className: "text-green-600 dark:text-green-400 font-semibold" },
    // Percentages: 8%, 50%
    { regex: /\d+(?:\.\d+)?%/g, className: "text-blue-600 dark:text-blue-400 font-semibold" },
    // Time periods: 10 days, 18 months, 30 days
    { regex: /\b\d+\s*(?:days?|months?|years?|hours?|minutes?)\b/gi, className: "text-purple-600 dark:text-purple-400 font-medium" },
    // Phone numbers
    { regex: /\d{3}[-.]?\d{3}[-.]?\d{4}/g, className: "text-primary font-medium" },
    // Email addresses
    { regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, className: "text-primary font-medium" },
  ];

  let result: React.ReactNode[] = [text];
  let key = 0;

  for (const { regex, className } of patterns) {
    const newResult: React.ReactNode[] = [];

    for (const part of result) {
      if (typeof part !== "string") {
        newResult.push(part);
        continue;
      }

      const matches = part.match(regex);
      if (!matches) {
        newResult.push(part);
        continue;
      }

      let lastIndex = 0;
      let tempResult: React.ReactNode[] = [];
      let tempStr = part;

      for (const match of matches) {
        const index = tempStr.indexOf(match);
        if (index === -1) continue;

        if (index > 0) {
          tempResult.push(tempStr.substring(0, index));
        }
        tempResult.push(
          <span key={`highlight-${key++}`} className={className}>
            {match}
          </span>
        );
        tempStr = tempStr.substring(index + match.length);
      }

      if (tempStr) {
        tempResult.push(tempStr);
      }

      newResult.push(...tempResult);
    }

    result = newResult;
  }

  return result.length === 1 ? result[0] : <>{result}</>;
}

/**
 * Custom components for ReactMarkdown with enhanced styling
 */
const components: Components = {
  // Headings with IDs for TOC linking
  h1: ({ children, ...props }) => {
    const text = String(children);
    const id = slugify(text);
    return (
      <h1
        id={id}
        className="text-2xl font-bold border-b border-border pb-3 mb-6 mt-8 first:mt-0 scroll-mt-20"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const text = String(children);
    const id = slugify(text);
    return (
      <h2
        id={id}
        className="text-xl font-semibold mt-10 mb-4 pb-2 border-b border-border/50 scroll-mt-20 flex items-center gap-2"
        {...props}
      >
        <span className="w-1 h-6 bg-primary rounded-full" />
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const text = String(children);
    const id = slugify(text);
    return (
      <h3
        id={id}
        className="text-lg font-semibold mt-6 mb-3 scroll-mt-20 text-foreground/90"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    const text = String(children);
    const id = slugify(text);
    return (
      <h4
        id={id}
        className="text-base font-semibold mt-4 mb-2 scroll-mt-20"
        {...props}
      >
        {children}
      </h4>
    );
  },

  // Paragraphs with highlighted values
  p: ({ children, ...props }) => {
    // Check for special markers like checkmarks
    const text = String(children);
    const hasCheckmark = text.includes("✓");

    if (hasCheckmark) {
      return (
        <p
          className="my-3 leading-relaxed pl-4 border-l-2 border-green-500 bg-green-50 dark:bg-green-950/20 py-2 pr-3 rounded-r-md"
          {...props}
        >
          {typeof children === "string" ? highlightValues(children) : children}
        </p>
      );
    }

    return (
      <p className="my-3 leading-relaxed" {...props}>
        {typeof children === "string" ? highlightValues(children) : children}
      </p>
    );
  },

  // Enhanced lists
  ul: ({ children, ...props }) => (
    <ul className="my-4 space-y-2 list-none" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-4 space-y-2 list-decimal list-inside" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="flex items-start gap-2" {...props}>
      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
      <span className="flex-1">
        {typeof children === "string" ? highlightValues(children) : children}
      </span>
    </li>
  ),

  // Tables with better styling
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted/70" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left font-semibold text-sm border-b border-border"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-sm border-b border-border/50" {...props}>
      {typeof children === "string" ? highlightValues(children) : children}
    </td>
  ),
  tr: ({ children, ...props }) => (
    <tr className="hover:bg-muted/30 transition-colors" {...props}>
      {children}
    </tr>
  ),

  // Blockquotes as callouts
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-4 pl-4 py-3 pr-4 border-l-4 border-primary bg-primary/5 rounded-r-lg italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code styling
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="my-4 p-4 rounded-lg bg-muted overflow-x-auto text-sm"
      {...props}
    >
      {children}
    </pre>
  ),

  // Horizontal rules as section dividers
  hr: () => (
    <hr className="my-8 border-t-2 border-dashed border-border/50" />
  ),

  // Strong text (bold)
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),

  // Emphasis (italic)
  em: ({ children, ...props }) => (
    <em className="italic text-foreground/90" {...props}>
      {children}
    </em>
  ),

  // Links
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
};

/**
 * Enhanced markdown renderer with smart highlighting and better visual hierarchy
 */
export function EnhancedMarkdown({ content, className }: EnhancedMarkdownProps) {
  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none",
        // Override prose defaults
        "prose-headings:font-semibold",
        "prose-p:text-foreground/90",
        "prose-strong:text-foreground",
        "prose-a:text-primary",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
