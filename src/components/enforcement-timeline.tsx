"use client";

import { ArrowDown, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ENFORCEMENT_PATH } from "@/lib/data/institutional-knowledge";

const stepColors = [
  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700",
  "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700",
  "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-300 dark:border-orange-700",
  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-300 dark:border-red-700",
];

export function EnforcementTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Enforcement Escalation Path
        </CardTitle>
        <CardDescription>
          How violations are handled from notice to legal action
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ENFORCEMENT_PATH.map((step, index) => (
            <div key={step.step}>
              <div
                className={`p-4 rounded-lg border ${stepColors[index] || stepColors[0]}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center font-bold text-sm border">
                    {step.step}
                  </div>
                  <div>
                    <p className="font-semibold">{step.entity}</p>
                    <p className="text-sm font-medium">{step.action}</p>
                  </div>
                </div>
                <p className="text-sm ml-11">{step.description}</p>
                {step.timeframe && (
                  <p className="text-xs mt-2 ml-11 opacity-75">
                    Timing: {step.timeframe}
                  </p>
                )}
              </div>
              {index < ENFORCEMENT_PATH.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key Points */}
        <div className="mt-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <h4 className="font-medium mb-3 text-sm">Key Points</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• You have 5 days to request a hearing after receiving a fine</li>
            <li>• Non-safety violations are capped at $500 total</li>
            <li>• Health/safety violations have no fine cap</li>
            <li>• All fines require Board authorization</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export function EnforcementTimelineCompact() {
  return (
    <div className="space-y-3">
      <h4 className="font-medium text-sm">Escalation Path</h4>
      <div className="flex flex-wrap gap-2 items-center">
        {ENFORCEMENT_PATH.map((step, index) => (
          <div key={step.step} className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800">
              {step.entity}
            </span>
            {index < ENFORCEMENT_PATH.length - 1 && (
              <span className="text-muted-foreground">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
