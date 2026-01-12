import { Metadata } from "next";
import { AskClient } from "./ask-client";

export const metadata: Metadata = {
  title: "Ask AI",
  description:
    "Get instant answers about HOA policies, rules, and procedures with source citations.",
};

export default function AskPage() {
  return <AskClient />;
}
