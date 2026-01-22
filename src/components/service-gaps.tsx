"use client";

import { FileQuestion, HelpCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ServiceGap } from "@/types/institutional";

interface ServiceGapsProps {
  gaps: ServiceGap[];
  showHeader?: boolean;
  className?: string;
}

export function ServiceGaps({
  gaps,
  showHeader = true,
  className,
}: ServiceGapsProps) {
  return (
    <Card className={cn("border-gray-200 dark:border-gray-700", className)}>
      {showHeader && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            Documentation Not Yet Available
          </CardTitle>
          <CardDescription>
            The following information has not been made available to owners
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className={cn(!showHeader && "pt-6")}>
        <div className="space-y-4">
          {gaps.map((gap, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
                <div>
                  <span className="font-medium text-sm">{gap.item}</span>
                  <p className="text-xs text-muted-foreground">
                    {gap.description}
                  </p>
                </div>
              </div>
              <div className="ml-6 text-xs">
                <span className="text-muted-foreground">Impact: </span>
                <span>{gap.impact}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-muted/50 rounded-md">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> This list reflects information not currently
            available in public HOA documents or owner communications. These
            gaps are documented for transparency purposes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
