import { Metadata } from "next";
import Link from "next/link";
import { Building2, AlertCircle, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HOAIdentity } from "@/components/hoa-identity";
import { BoardInfo } from "@/components/board-info";
import { EnforcementTimeline } from "@/components/enforcement-timeline";
import { DISCLAIMERS } from "@/lib/constants";
import { KNOWLEDGE_BASE_METADATA } from "@/lib/data/institutional-knowledge";

export const metadata: Metadata = {
  title: "Governance",
  description:
    "Learn about Westlake Village HOA governance structure, board authority, and decision-making processes.",
};

export default function GovernancePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Governance</h1>
            <p className="text-muted-foreground">
              HOA structure, board authority, and decision-making
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <Alert className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-200">
          Unofficial Resource
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300">
          {DISCLAIMERS.site}
        </AlertDescription>
      </Alert>

      {/* HOA Identity */}
      <div className="mb-8">
        <HOAIdentity />
      </div>

      {/* Board Info */}
      <div className="mb-8">
        <BoardInfo />
      </div>

      {/* Enforcement Process */}
      <div className="mb-8">
        <EnforcementTimeline />
      </div>

      {/* Related Links */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Related Resources</CardTitle>
          <CardDescription>
            More information about HOA policies and processes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/contacts">
              <Button variant="outline" className="w-full justify-between">
                Key Contacts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/records">
              <Button variant="outline" className="w-full justify-between">
                Records Request Guide
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/documents">
              <Button variant="outline" className="w-full justify-between">
                Document Library
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="outline" className="w-full justify-between">
                Frequently Asked Questions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Last updated: {KNOWLEDGE_BASE_METADATA.lastUpdated}</p>
        <p className="mt-1">Source: Westlake HOA Knowledge Base</p>
      </div>
    </div>
  );
}
