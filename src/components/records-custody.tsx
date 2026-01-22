"use client";

import Link from "next/link";
import { FileText, Folder, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { RecordsCustody as RecordsCustodyType } from "@/types/institutional";

interface RecordsCustodyProps {
  records: RecordsCustodyType[];
  accessRequirements?: string[];
  className?: string;
}

export function RecordsCustody({
  records,
  accessRequirements,
  className,
}: RecordsCustodyProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Records Maintained by Bold
        </CardTitle>
        <CardDescription>
          As records custodian, Bold maintains the following HOA records
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3">
          {records.map((record, index) => (
            <div key={index} className="flex items-start gap-3">
              <Folder className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
              <div>
                <span className="font-medium text-sm">{record.recordType}</span>
                <p className="text-xs text-muted-foreground">
                  {record.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {accessRequirements && accessRequirements.length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="font-medium text-sm mb-2">Access Requirements</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Bold is required to:
            </p>
            <ul className="space-y-1">
              {accessRequirements.map((req, index) => (
                <li
                  key={index}
                  className="text-xs flex items-start gap-2"
                >
                  <ChevronRight className="h-3 w-3 shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 border-t">
          <Link
            href="/records"
            className="text-primary hover:underline text-sm inline-flex items-center gap-1"
          >
            View Records Request Guide
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
