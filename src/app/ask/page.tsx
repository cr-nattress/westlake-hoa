import { Metadata } from "next";
import { MessageSquare, Bot, Send, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DISCLAIMERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Ask AI",
  description:
    "Get instant answers about HOA policies, rules, and procedures with source citations.",
};

const suggestedQuestions = [
  "What does the HOA insurance cover?",
  "How do I request records from the HOA?",
  "What are the late fee policies?",
  "What are my responsibilities as a unit owner?",
  "How do foreclosure protections work under CCIOA?",
  "When are board meetings held?",
];

export default function AskPage() {
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

      {/* Chat Interface Placeholder */}
      <Card className="mb-8">
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Chat with HOA AI</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages Area */}
          <div className="min-h-[300px] p-6 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-2">AI Assistant coming soon!</p>
              <p className="text-sm">
                This feature will allow you to ask questions and receive
                AI-powered answers with citations from official HOA documents.
              </p>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask a question about HOA documents..."
                className="min-h-[44px] max-h-[120px] resize-none"
                disabled
              />
              <Button size="icon" className="h-[44px] w-[44px]" disabled>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Questions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Try asking:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-auto py-3 px-4 text-left"
              disabled
            >
              <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">{question}</span>
            </Button>
          ))}
        </div>
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
