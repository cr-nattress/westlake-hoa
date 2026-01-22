import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Directory",
  description:
    "Comprehensive contact directory for Westlake Village HOA - property management, insurance, legal counsel, and board contacts with phone numbers, emails, and key personnel.",
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
