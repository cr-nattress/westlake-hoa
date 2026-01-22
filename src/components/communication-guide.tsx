"use client";

import { Mail, Clock, AlertTriangle, CheckCircle2, ArrowUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ManagementContact } from "@/types/institutional";

interface CommunicationTip {
  title: string;
  description: string;
  icon: "mail" | "clock" | "alert" | "check" | "escalate";
}

const COMMUNICATION_TIPS: CommunicationTip[] = [
  {
    title: "Use the Right Email",
    description:
      "For general inquiries, use clientservices@boldsolutions.net. Automated notices come from a different address and may not accept replies.",
    icon: "mail",
  },
  {
    title: "Document Everything",
    description:
      "Keep copies of all communications. Email creates a paper trail. Bold is required to maintain communication logs.",
    icon: "check",
  },
  {
    title: "Be Specific and Factual",
    description:
      "Reference specific dates, unit numbers, and governing document sections. Clear requests get clearer responses.",
    icon: "check",
  },
  {
    title: "Allow Reasonable Time",
    description:
      "While no SLAs exist, allow 7-10 business days for routine matters before following up.",
    icon: "clock",
  },
  {
    title: "Know When to Escalate",
    description:
      "If Bold cannot help (e.g., legal action, collections referral, policy changes), the Board must authorize. Request Board involvement.",
    icon: "escalate",
  },
  {
    title: "Request Written Confirmation",
    description:
      "For important matters, request written confirmation of actions taken or decisions made.",
    icon: "check",
  },
];

const ICON_MAP = {
  mail: Mail,
  clock: Clock,
  alert: AlertTriangle,
  check: CheckCircle2,
  escalate: ArrowUp,
};

interface CommunicationGuideProps {
  contacts?: ManagementContact[];
  className?: string;
}

export function CommunicationGuide({
  contacts,
  className,
}: CommunicationGuideProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Communication Best Practices
        </CardTitle>
        <CardDescription>
          Tips for effective communication with property management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Quick Reference */}
        {contacts && contacts.length > 0 && (
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-3">Email Quick Reference</h4>
            <div className="space-y-2">
              {contacts.map((contact, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-sm font-medium min-w-[140px]">
                    {contact.purpose}:
                  </span>
                  <code className="text-xs bg-background px-2 py-1 rounded border">
                    {contact.email}
                  </code>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {COMMUNICATION_TIPS.map((tip, index) => {
            const Icon = ICON_MAP[tip.icon];
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card"
              >
                <div
                  className={cn(
                    "rounded-full p-1.5 shrink-0",
                    tip.icon === "escalate"
                      ? "bg-amber-100 dark:bg-amber-900"
                      : tip.icon === "clock"
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "bg-green-100 dark:bg-green-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5",
                      tip.icon === "escalate"
                        ? "text-amber-600 dark:text-amber-400"
                        : tip.icon === "clock"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-green-600 dark:text-green-400"
                    )}
                  />
                </div>
                <div>
                  <h5 className="font-medium text-sm">{tip.title}</h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tip.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Response Time Note */}
        <div className="border-t pt-4">
          <div className="flex items-start gap-3 text-sm">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              <strong className="text-foreground">No SLA exists:</strong> Bold has
              no documented service-level agreements or response-time commitments.
              If you experience consistent delays, this is a valid concern to raise
              with the Board.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
