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
import { DelegatedAuthority } from "@/components/delegated-authority";
import { AuthorityLimits } from "@/components/authority-limits";
import { ManagementContacts } from "@/components/management-contacts";
import { RecordsCustody } from "@/components/records-custody";
import { ServiceGaps } from "@/components/service-gaps";
import { CommunicationGuide } from "@/components/communication-guide";
import { EscalationFlow } from "@/components/escalation-flow";
import { DISCLAIMERS } from "@/lib/constants";
import {
  BOLD_DELEGATED_AUTHORITY,
  BOLD_SPECIFIC_EMAILS,
  BOLD_RECORDS_CUSTODY,
  RECORDS_ACCESS_REQUIREMENTS,
  SERVICE_GAPS,
  ACCOUNTABILITY_STATEMENT,
  HOA_MAILING_ADDRESS,
  KNOWLEDGE_BASE_METADATA,
  ESCALATION_FLOW,
} from "@/lib/data/institutional-knowledge";

export const metadata: Metadata = {
  title: "Property Management",
  description:
    "Understanding Bold Property Management's role, authority, and limitations for Westlake Village HOA.",
};

export default function ManagementPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Property Management</h1>
            <p className="text-muted-foreground">
              Understanding Bold Property Management&apos;s Role
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Last updated: {KNOWLEDGE_BASE_METADATA.lastUpdated}
        </p>
      </div>

      {/* Accountability Statement */}
      <Alert className="mb-8 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-200">
          Accountability Note
        </AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          {ACCOUNTABILITY_STATEMENT}
        </AlertDescription>
      </Alert>

      {/* Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Bold Property Management / Bold Solutions</CardTitle>
          <CardDescription>
            Day-to-day managing agent for Westlake Village HOA
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground">
            Bold Property Management serves as the operational intermediary
            between the HOA Board, owners, vendors, insurers, and legal counsel.
            Understanding what Bold can and cannot do independently helps
            homeowners know when to escalate issues to the Board.
          </p>
        </CardContent>
      </Card>

      {/* What Bold Can Do */}
      <div className="mb-8">
        <DelegatedAuthority powers={BOLD_DELEGATED_AUTHORITY.powers} />
      </div>

      {/* What Bold Cannot Do */}
      <div className="mb-8">
        <AuthorityLimits limitations={BOLD_DELEGATED_AUTHORITY.limitations} />
      </div>

      {/* Contact Information */}
      <div className="mb-8">
        <ManagementContacts
          contacts={BOLD_SPECIFIC_EMAILS}
          mailingAddress={HOA_MAILING_ADDRESS}
        />
      </div>

      {/* Communication Best Practices */}
      <div className="mb-8">
        <CommunicationGuide contacts={BOLD_SPECIFIC_EMAILS} />
      </div>

      {/* Records Custody */}
      <div className="mb-8">
        <RecordsCustody
          records={BOLD_RECORDS_CUSTODY}
          accessRequirements={RECORDS_ACCESS_REQUIREMENTS}
        />
      </div>

      {/* Service Gaps */}
      <div className="mb-8">
        <ServiceGaps gaps={SERVICE_GAPS} />
      </div>

      {/* Escalation Flow */}
      <div className="mb-8">
        <EscalationFlow steps={ESCALATION_FLOW} />
      </div>

      {/* Related Links */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Related Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/contacts">
              <Button variant="outline" className="w-full justify-between">
                Key Contacts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/governance">
              <Button variant="outline" className="w-full justify-between">
                Governance & Board Info
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/transparency">
              <Button variant="outline" className="w-full justify-between">
                Transparency & Accountability
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/records">
              <Button variant="outline" className="w-full justify-between">
                Records Request Guide
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
        <CardContent className="py-4">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Disclaimer:</strong> {DISCLAIMERS.site}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
