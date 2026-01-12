import { Metadata } from "next";
import { FolderOpen, FileText, Download, Clock, CheckCircle2, XCircle } from "lucide-react";
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
    </div>
  );
}
