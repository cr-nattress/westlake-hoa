"use client";

import Link from "next/link";
import {
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Building2,
  Users,
  Scale,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { EscalationStepEnhanced } from "@/types/institutional";

const STEP_ICONS = [Building2, Users, Scale, Shield];
const STEP_COLORS = [
  "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
  "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
  "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400",
  "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
];

interface EscalationFlowProps {
  steps: EscalationStepEnhanced[];
  className?: string;
}

export function EscalationFlow({ steps, className }: EscalationFlowProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowDown className="h-5 w-5" />
          Issue Escalation Path
        </CardTitle>
        <CardDescription>
          Understanding who has authority at each level and when to escalate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => {
          const Icon = STEP_ICONS[index] || Building2;
          const colorClass = STEP_COLORS[index] || STEP_COLORS[0];
          const isLast = index === steps.length - 1;

          return (
            <div key={step.step} className="relative">
              {/* Step Card */}
              <div className="border rounded-lg p-4">
                {/* Step Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={cn(
                      "rounded-full p-2 shrink-0",
                      colorClass
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-muted-foreground">
                        Step {step.step}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                        {step.action}
                      </span>
                    </div>
                    <h4 className="font-semibold mt-1">{step.entity}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Authority & Limitations Grid */}
                <div className="grid gap-3 sm:grid-cols-2 mt-4">
                  {/* What They CAN Do */}
                  {step.authority.length > 0 && (
                    <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3">
                      <h5 className="text-xs font-medium text-green-700 dark:text-green-400 mb-2 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Authority
                      </h5>
                      <ul className="space-y-1">
                        {step.authority.map((item, i) => (
                          <li
                            key={i}
                            className="text-xs text-green-800 dark:text-green-300 flex items-start gap-1.5"
                          >
                            <ChevronRight className="h-3 w-3 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* What They CANNOT Do */}
                  {step.limitations && step.limitations.length > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3">
                      <h5 className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Limitations
                      </h5>
                      <ul className="space-y-1">
                        {step.limitations.map((item, i) => (
                          <li
                            key={i}
                            className="text-xs text-amber-800 dark:text-amber-300 flex items-start gap-1.5"
                          >
                            <ChevronRight className="h-3 w-3 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Escalation Triggers */}
                {step.escalateTriggers && step.escalateTriggers.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <h5 className="text-xs font-medium text-muted-foreground mb-2">
                      Escalate when:
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {step.escalateTriggers.map((trigger, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                        >
                          {trigger}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Link */}
                {step.contactLink && (
                  <div className="mt-3 pt-3 border-t">
                    <Link
                      href={step.contactLink}
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                    >
                      View contact information
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Arrow between steps */}
              {!isLast && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}

        {/* Summary Note */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>Remember:</strong> Each level has specific authority. Bold
            cannot do what the Board must approve. The Board cannot bypass
            legal process. Document everything and allow reasonable time at
            each step before escalating.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
