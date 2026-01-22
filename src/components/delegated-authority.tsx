"use client";

import { CheckCircle, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DelegatedAuthorityProps {
  powers: string[];
  className?: string;
}

export function DelegatedAuthority({
  powers,
  className,
}: DelegatedAuthorityProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
          What Bold Property Management Can Do
        </CardTitle>
        <CardDescription>
          Delegated authority under HOA governance documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {powers.map((power, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-1 shrink-0" />
              <span className="text-sm">{power}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
