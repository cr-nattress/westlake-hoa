import { Metadata } from "next";
import Link from "next/link";
import {
  FolderOpen,
  FileText,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RECORDS_COMPARISON, KNOWLEDGE_BASE_METADATA } from "@/lib/data/institutional-knowledge";

export const metadata: Metadata = {
  title: "Records Request",
  description:
    "Learn how to request HOA records under Colorado law (CCIOA) and download request templates.",
};

const canRequest = [
  "Governing documents (declarations, bylaws, rules)",
  "Meeting minutes and agendas",
  "Financial statements and budgets",
  "Insurance policies and certificates",
  "Reserve study",
  "Contracts and agreements",
  "Ownership lists (with restrictions)",
];

const cannotRequest = [
  "Individual owner financial records (ledgers, payment history)",
  "Attorney-client privileged communications",
  "Personnel files and employee records",
  "Ongoing litigation documents",
  "Executive session minutes (most cases)",
  "Medical or disability information",
];

export default function RecordsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
            <FolderOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Records Request Guide</h1>
            <p className="text-muted-foreground">Your rights under Colorado law (CCIOA)</p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Right to Inspect Records</CardTitle>
          <CardDescription>
            Under the Colorado Common Interest Ownership Act (CCIOA), homeowners
            have the right to inspect and copy most association records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Response Time</p>
                <p className="text-sm text-muted-foreground">
                  The HOA must respond within 10 business days
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Copy Costs</p>
                <p className="text-sm text-muted-foreground">
                  Reasonable copying fees may apply
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What You Can/Cannot Request */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <CardTitle className="text-lg">What You Can Request</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {canRequest.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <CardTitle className="text-lg">What May Be Withheld</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {cannotRequest.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Observed Reality */}
      <Alert className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-200">
          What We&apos;ve Observed
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300">
          <p className="mb-2">Based on documented owner experiences:</p>
          <ul className="space-y-1">
            {RECORDS_COMPARISON.observedReality.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>

      {/* Tips for Success */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <CardTitle className="text-lg">Tips for Successful Requests</CardTitle>
          </div>
          <CardDescription>
            Practical advice based on CCIOA requirements and documented patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">1. Submit in Writing</h4>
              <p className="text-sm text-muted-foreground">
                Email creates a paper trail with timestamps. Keep copies of all
                correspondence.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">2. Cite CCIOA</h4>
              <p className="text-sm text-muted-foreground">
                Reference CCIOA § 38-33.3-317 in your request to establish your
                legal right.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">3. Be Specific</h4>
              <p className="text-sm text-muted-foreground">
                Clearly describe which records you need. Vague requests may cause
                delays.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">4. Track the Deadline</h4>
              <p className="text-sm text-muted-foreground">
                Note your request date. The 10-business-day clock starts when
                they receive it.
              </p>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <h4 className="font-medium text-sm">5. Follow Up in Writing</h4>
              <p className="text-sm text-muted-foreground">
                If no response within 10 business days, send a written follow-up
                citing the deadline and your original request date.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Request Templates */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Request Templates</CardTitle>
          <CardDescription>
            Download ready-to-use templates for common records requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">General Records Request</p>
                  <p className="text-sm text-muted-foreground">Standard form</p>
                </div>
              </div>
              <Button size="sm" variant="outline" disabled>
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Ownership List Request</p>
                  <p className="text-sm text-muted-foreground">With use agreement</p>
                </div>
              </div>
              <Button size="sm" variant="outline" disabled>
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Templates coming soon
          </p>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I submit a records request?
              </AccordionTrigger>
              <AccordionContent>
                Submit your request in writing to the HOA management company or
                board. Include your name, unit number, and a specific description
                of the records you&apos;re requesting. You can use our templates above.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How long does the HOA have to respond?
              </AccordionTrigger>
              <AccordionContent>
                Under CCIOA, the association must respond to your request within
                10 business days. If records cannot be provided immediately, they
                must explain why and provide a timeline.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Can I be charged for copies?
              </AccordionTrigger>
              <AccordionContent>
                Yes, the association may charge reasonable copying costs. However,
                they cannot charge for staff time to locate records. Electronic
                copies may be provided at no cost if available.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                What if my request is denied?
              </AccordionTrigger>
              <AccordionContent>
                If your request is denied, the association must provide a written
                explanation citing the specific legal basis for withholding. You
                may have grounds to challenge the denial under CCIOA.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Related Links */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Related Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/transparency">
              <Button variant="outline" className="w-full justify-between">
                Transparency & Accountability
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contacts">
              <Button variant="outline" className="w-full justify-between">
                Key Contacts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/documents/records-inspection-policy-2025">
              <Button variant="outline" className="w-full justify-between">
                Records Inspection Policy
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/governance">
              <Button variant="outline" className="w-full justify-between">
                Governance & Board Info
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Last updated: {KNOWLEDGE_BASE_METADATA.lastUpdated}</p>
      </div>
    </div>
  );
}
