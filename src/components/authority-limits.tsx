"use client";

import { AlertCircle, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AuthorityLimitation } from "@/types/institutional";

interface AuthorityLimitsProps {
  limitations: AuthorityLimitation[];
  className?: string;
}

export function AuthorityLimits({
  limitations,
  className,
}: AuthorityLimitsProps) {
  return (
    <Card
      className={cn("border-amber-200 dark:border-amber-800", className)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
          What Bold Property Management Cannot Do
        </CardTitle>
        <CardDescription>Actions requiring Board authorization</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {limitations.map((item, index) => (
            <li key={index} className="space-y-1">
              <div className="flex items-start gap-2">
                <X className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-1 shrink-0" />
                <span className="font-medium text-sm">{item.limitation}</span>
              </div>
              {item.requirement && (
                <p className="text-sm text-muted-foreground ml-6">
                  → {item.requirement}
                </p>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
