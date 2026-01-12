"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

const SUGGESTED_QUESTIONS = [
  "What does the HOA insurance cover?",
  "How do I request records from the HOA?",
  "What are the late fee policies?",
  "What are my responsibilities as a unit owner?",
  "How do foreclosure protections work under CCIOA?",
  "What happens if I violate a rule?",
];

export function SuggestedQuestions({
  onSelect,
  disabled,
}: SuggestedQuestionsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        Try asking:
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {SUGGESTED_QUESTIONS.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            className="justify-start h-auto py-3 px-4 text-left"
            onClick={() => onSelect(question)}
            disabled={disabled}
          >
            <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{question}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
