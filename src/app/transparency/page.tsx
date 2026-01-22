import { Metadata } from "next";
import Link from "next/link";
import { Eye, AlertCircle, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CommunicationPatterns,
  ObservedIssues,
  RecordsRightsComparison,
} from "@/components/transparency-issues";
import { DISCLAIMERS } from "@/lib/constants";
import { KNOWLEDGE_BASE_METADATA } from "@/lib/data/institutional-knowledge";

export const metadata: Metadata = {
  title: "Transparency & Accountability",
  description:
    "Documented observations about Westlake Village HOA communications and governance practices.",
};

export default function TransparencyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Eye className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Transparency & Accountability</h1>
            <p className="text-muted-foreground">
              Documented observations about HOA governance
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <Alert className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-200">
          About This Information
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300 space-y-2">
          <p>
            This information is compiled from documented owner experiences and
            communications. It is presented factually for informational purposes
            only.
          </p>
          <p>{DISCLAIMERS.site}</p>
        </AlertDescription>
      </Alert>

      {/* Purpose Statement */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Why Transparency Matters</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            This section documents observed patterns in HOA communications and
            governance to help homeowners understand what to expect. The
            information is presented neutrally and factually, without accusations
            or speculation.
          </p>
          <p>
            Our goal is to empower residents with knowledge so they can engage
            more effectively with the HOA and advocate for improvements where
            needed.
          </p>
        </CardContent>
      </Card>

      {/* Communication Patterns */}
      <div className="mb-8">
        <CommunicationPatterns />
      </div>

      {/* Observed Issues */}
      <div className="mb-8">
        <ObservedIssues />
      </div>

      {/* Records Rights vs Reality */}
      <div className="mb-8">
        <RecordsRightsComparison />
      </div>

      {/* What You Can Do */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What You Can Do</CardTitle>
          <CardDescription>
            Steps to engage constructively with the HOA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Document Everything</h4>
              <p className="text-sm text-muted-foreground">
                Keep records of all communications with dates and content. Email
                creates a paper trail.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Know Your Rights</h4>
              <p className="text-sm text-muted-foreground">
                Familiarize yourself with CCIOA and your governing documents.
                The HOA must respond to records requests within 10 business days.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Attend Meetings</h4>
              <p className="text-sm text-muted-foreground">
                Board meetings are where decisions are made. Your presence and
                questions matter.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Follow Up in Writing</h4>
              <p className="text-sm text-muted-foreground">
                If you don&apos;t receive a response, follow up in writing. Cite
                specific deadlines and requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Links */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Related Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/records">
              <Button variant="outline" className="w-full justify-between">
                Records Request Guide
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/governance">
              <Button variant="outline" className="w-full justify-between">
                Governance & Board Info
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contacts">
              <Button variant="outline" className="w-full justify-between">
                Key Contacts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ask">
              <Button variant="outline" className="w-full justify-between">
                Ask the Assistant
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
