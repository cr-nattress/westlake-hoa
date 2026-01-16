"use client";

import Link from "next/link";
import { FileText, ChevronRight, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TopicEntry, TopicCategory } from "@/lib/data/topic-index";

const CATEGORY_COLORS: Record<TopicCategory, string> = {
  financial: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  insurance: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  rules: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  governance: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const CATEGORY_LABELS: Record<TopicCategory, string> = {
  financial: "Financial",
  insurance: "Insurance",
  rules: "Rules",
  governance: "Governance",
};

interface QuickAnswerCardProps {
  topic: TopicEntry;
  variant?: "default" | "compact";
  showRelated?: boolean;
}

export function QuickAnswerCard({
  topic,
  variant = "default",
  showRelated = true,
}: QuickAnswerCardProps) {
  if (variant === "compact") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm mb-1">{topic.question}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {topic.quickAnswer}
              </p>
              <Link
                href={`/documents/${topic.primaryDocument}`}
                className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1"
              >
                Read more <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge className={CATEGORY_COLORS[topic.category]} variant="secondary">
            {CATEGORY_LABELS[topic.category]}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg flex items-center gap-2 mt-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          {topic.question}
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4">{topic.quickAnswer}</p>

        <div className="flex flex-col gap-2">
          <Button asChild variant="outline" size="sm" className="justify-start">
            <Link href={`/documents/${topic.primaryDocument}`}>
              <FileText className="h-4 w-4 mr-2" />
              View Source Document
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Link>
          </Button>

          {showRelated && topic.relatedDocuments.length > 0 && (
            <div className="text-xs text-muted-foreground mt-2">
              <span className="font-medium">Related: </span>
              {topic.relatedDocuments.map((slug, i) => (
                <span key={slug}>
                  <Link
                    href={`/documents/${slug}`}
                    className="hover:underline text-primary"
                  >
                    {formatSlugAsTitle(slug)}
                  </Link>
                  {i < topic.relatedDocuments.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Convert a slug to a readable title
 * e.g., "collections-policy-2025" -> "Collections Policy 2025"
 */
function formatSlugAsTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
