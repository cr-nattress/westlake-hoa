"use client";

import { useState, useEffect } from "react";
import { List, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface DocumentTocProps {
  content: string;
  className?: string;
}

/**
 * Extract headings from markdown content
 */
function extractHeadings(content: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    // Match ## Heading or **ARTICLE X** patterns
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);
    const articleMatch = line.match(/^\*\*ARTICLE\s+([IVXLCDM]+)\*\*$/i);
    const sectionMatch = line.match(/^\*\*Section\s+(\d+)\.\*\*\s*(.+)/i);

    if (h2Match) {
      const text = h2Match[1].replace(/\*\*/g, "").trim();
      const id = slugify(text);
      headings.push({ id, text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].replace(/\*\*/g, "").trim();
      const id = slugify(text);
      headings.push({ id, text, level: 3 });
    } else if (articleMatch) {
      const text = `Article ${articleMatch[1]}`;
      const id = slugify(text);
      headings.push({ id, text, level: 2 });
    } else if (sectionMatch) {
      const text = `Section ${sectionMatch[1]}: ${sectionMatch[2].replace(/\*/g, "").trim()}`;
      const id = slugify(text);
      headings.push({ id, text, level: 3 });
    }
  }

  return headings;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function DocumentToc({ content, className }: DocumentTocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(true);
  const headings = extractHeadings(content);

  // Track scroll position to highlight active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) {
    return null; // Don't show TOC for short documents
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Account for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <List className="h-4 w-4" />
            Contents
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <nav className="space-y-1 max-h-[300px] overflow-y-auto pr-2">
            {headings.map(({ id, text, level }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={cn(
                  "w-full text-left text-sm py-1.5 px-2 rounded-md transition-colors flex items-center gap-1",
                  level === 3 && "pl-4",
                  activeId === id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <ChevronRight
                  className={cn(
                    "h-3 w-3 flex-shrink-0 transition-transform",
                    activeId === id && "text-primary"
                  )}
                />
                <span className="truncate">{text}</span>
              </button>
            ))}
          </nav>
        </CardContent>
      )}
    </Card>
  );
}
