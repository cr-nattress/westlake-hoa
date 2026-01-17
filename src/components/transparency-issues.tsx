"use client";

import { AlertTriangle, MessageSquare, Users, HeartPulse, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TRANSPARENCY_ISSUES,
  COMMUNICATION_PATTERNS,
  RECORDS_COMPARISON,
  TRANSPARENCY_CATEGORY_LABELS,
  getIssuesByCategory,
} from "@/lib/data/institutional-knowledge";
import type { TransparencyCategory } from "@/types/institutional";

const categoryIcons: Record<TransparencyCategory, typeof AlertTriangle> = {
  communications: MessageSquare,
  governance: Users,
  "health-safety": HeartPulse,
  records: FileText,
};

const categoryColors: Record<TransparencyCategory, string> = {
  communications: "border-blue-200 dark:border-blue-800",
  governance: "border-purple-200 dark:border-purple-800",
  "health-safety": "border-red-200 dark:border-red-800",
  records: "border-amber-200 dark:border-amber-800",
};

export function CommunicationPatterns() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Communication Patterns
        </CardTitle>
        <CardDescription>
          How the HOA typically communicates with owners
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {COMMUNICATION_PATTERNS.map((pattern) => (
            <div
              key={pattern.category}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
            >
              <p className="font-medium text-sm">{pattern.category}</p>
              <p className="text-sm text-muted-foreground">
                {pattern.description}
              </p>
              {pattern.platforms && pattern.platforms.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Platform: {pattern.platforms.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ObservedIssues() {
  const categories: TransparencyCategory[] = [
    "communications",
    "governance",
    "health-safety",
    "records",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Observed Issues
        </CardTitle>
        <CardDescription>
          Documented patterns from owner experiences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories.map((category) => {
            const issues = getIssuesByCategory(category);
            if (issues.length === 0) return null;

            const Icon = categoryIcons[category];

            return (
              <div key={category} className={`border-l-4 pl-4 ${categoryColors[category]}`}>
                <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4" />
                  {TRANSPARENCY_CATEGORY_LABELS[category]}
                </h4>
                <ul className="space-y-1">
                  {issues.map((issue) => (
                    <li
                      key={issue.observation}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-amber-500 mt-0.5">•</span>
                      {issue.observation}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function RecordsRightsComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Records Access: Rights vs Reality
        </CardTitle>
        <CardDescription>
          What you&apos;re entitled to vs what has been observed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* What You're Entitled To */}
          <div>
            <h4 className="font-medium text-sm text-green-700 dark:text-green-400 mb-3">
              What You&apos;re Entitled To
            </h4>
            <ul className="space-y-2">
              {RECORDS_COMPARISON.entitled.map((item) => (
                <li key={item} className="text-sm flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What's Been Observed */}
          <div>
            <h4 className="font-medium text-sm text-amber-700 dark:text-amber-400 mb-3">
              What&apos;s Been Observed
            </h4>
            <ul className="space-y-2">
              {RECORDS_COMPARISON.observedReality.map((item) => (
                <li key={item} className="text-sm flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">!</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Restrictions */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-medium text-sm text-muted-foreground mb-3">
            Records That May Be Restricted
          </h4>
          <ul className="space-y-2">
            {RECORDS_COMPARISON.restricted.map((item) => (
              <li key={item} className="text-sm flex items-start gap-2 text-muted-foreground">
                <span className="text-red-500 mt-0.5">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
