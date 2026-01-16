"use client";

import {
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Info,
  Users,
  Phone,
  Mail,
  Home,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getDocumentFacts,
  type DocumentFact,
  type FactIcon,
} from "@/lib/data/document-facts";
import { cn } from "@/lib/utils";

const ICONS: Record<FactIcon, React.ComponentType<{ className?: string }>> = {
  calendar: Calendar,
  dollar: DollarSign,
  alert: AlertTriangle,
  check: CheckCircle,
  clock: Clock,
  info: Info,
  users: Users,
  phone: Phone,
  mail: Mail,
  home: Home,
};

interface DocumentKeyFactsProps {
  slug: string;
  variant?: "default" | "compact" | "inline";
}

export function DocumentKeyFacts({
  slug,
  variant = "default",
}: DocumentKeyFactsProps) {
  const facts = getDocumentFacts(slug);

  if (!facts || facts.length === 0) {
    return null;
  }

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap gap-3">
        {facts.slice(0, 4).map((fact, index) => {
          const Icon = ICONS[fact.icon];
          return (
            <div
              key={index}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm",
                fact.highlight
                  ? "bg-primary/10 text-primary font-medium"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="font-medium">{fact.value}</span>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {facts.slice(0, 6).map((fact, index) => {
          const Icon = ICONS[fact.icon];
          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg text-sm",
                fact.highlight ? "bg-primary/10" : "bg-muted/50"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 flex-shrink-0",
                  fact.highlight ? "text-primary" : "text-muted-foreground"
                )}
              />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">
                  {fact.label}
                </p>
                <p
                  className={cn(
                    "font-medium truncate",
                    fact.highlight && "text-primary"
                  )}
                >
                  {fact.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Default variant - full card
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Key Facts
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {facts.map((fact, index) => {
            const Icon = ICONS[fact.icon];
            return (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 p-2 rounded-lg transition-colors",
                  fact.highlight
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    fact.highlight
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">{fact.label}</p>
                  <p
                    className={cn(
                      "font-semibold",
                      fact.highlight && "text-primary"
                    )}
                  >
                    {fact.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
