"use client";

import { useState } from "react";
import { Bot, FileText, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AIChat, SuggestedQuestions } from "@/components/chat";
import { DISCLAIMERS } from "@/lib/constants";

// Sample document context - in production, this would come from the database
const SAMPLE_DOCUMENT_CONTEXT = [
  {
    title: "Responsible Governance Policies",
    section: "Section 2: Collections Policies & Procedures",
    content: `Late Fees: The initial late fee is $50, escalating up to $250 per month for continued delinquency.

Interest Rate: 8% annually on delinquent amounts.

Payment Plans: The HOA must offer payment plans with a minimum term of 18 months before proceeding with collections.

Foreclosure Protections: Per Colorado HB25-1043 (updated CCIOA), required mediation and mandatory notice timelines must be followed before any foreclosure action.`,
  },
  {
    title: "Insurance Certificate 2025-2026",
    section: "Coverage Summary",
    content: `General Liability: $1,000,000 per occurrence
Umbrella Liability: $10,000,000 (Greenwich Insurance Company)
Property (Building): $22,460,000 Guaranteed Replacement Cost (American Alternative Insurance)
Directors & Officers: $1,000,000 (Philadelphia Indemnity)
Fidelity Bond: $400,000
Workers Compensation: $1,000,000 per accident
Property Deductible: $15,000`,
  },
  {
    title: "Records Inspection Policy",
    section: "Owner Rights",
    content: `Under CCIOA, owners have the right to inspect:
- Governing documents (declarations, bylaws, rules)
- Meeting minutes and agendas
- Financial statements and budgets
- Insurance policies and certificates
- Reserve study
- Contracts and agreements
- Ownership lists (with restrictions on commercial use)

Response Timeline: The HOA must respond within 10 business days.

Excluded Records: Attorney-client privileged communications, personnel files, ongoing litigation documents, and most executive session minutes.`,
  },
  {
    title: "Covenant & Rule Enforcement Policy",
    section: "Fine Caps and Procedures",
    content: `Fine Caps:
- Non-safety violations: Maximum $500
- Health/safety violations: Unlimited fines permitted

Enforcement Process:
1. Notice of violation sent to owner
2. Opportunity to cure (timeframe depends on violation type)
3. Hearing rights for owners before fines are assessed
4. Appeal process available

All enforcement must follow the detailed procedures in this policy.`,
  },
];

export function AskClient() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | undefined>();
  const [chatKey, setChatKey] = useState(0);

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    setChatKey((prev) => prev + 1); // Reset chat with new initial message
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Bot className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">HOA Document Assistant</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Ask questions about HOA documents, policies, and procedures. I&apos;ll
          search official documents and provide answers with source citations.
        </p>
      </div>

      {/* Disclaimer */}
      <Alert className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-700 dark:text-amber-300">
          {DISCLAIMERS.ai}
        </AlertDescription>
      </Alert>

      {/* AI Chat */}
      <div className="mb-8">
        <AIChat
          key={chatKey}
          initialMessage={selectedQuestion}
          documentContext={SAMPLE_DOCUMENT_CONTEXT}
        />
      </div>

      {/* Suggested Questions */}
      <div className="mb-8">
        <SuggestedQuestions onSelect={handleQuestionSelect} />
      </div>

      {/* How It Works */}
      <Card id="how-it-works">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>
            Understanding how the AI assistant provides answers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-primary">1</span>
            </div>
            <div>
              <h3 className="font-medium mb-1">Ask Your Question</h3>
              <p className="text-sm text-muted-foreground">
                Type your question in plain English about any HOA topic.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-primary">2</span>
            </div>
            <div>
              <h3 className="font-medium mb-1">AI Searches Documents</h3>
              <p className="text-sm text-muted-foreground">
                The AI searches through official HOA documents to find relevant
                information.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-primary">3</span>
            </div>
            <div>
              <h3 className="font-medium mb-1">Receive Cited Answers</h3>
              <p className="text-sm text-muted-foreground">
                Get clear answers with direct links to the source documents and
                sections.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Verify Sources</h3>
              <p className="text-sm text-muted-foreground">
                Click on any citation to view the original document and verify
                the information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
