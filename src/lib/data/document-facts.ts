/**
 * Key Facts for each document
 * Displays the most important information at a glance
 */

export type FactIcon =
  | "calendar"
  | "dollar"
  | "alert"
  | "check"
  | "clock"
  | "info"
  | "users"
  | "phone"
  | "mail"
  | "home";

export interface DocumentFact {
  icon: FactIcon;
  label: string;
  value: string;
  highlight?: boolean; // Make this fact stand out
}

export interface DocumentFactsEntry {
  slug: string;
  facts: DocumentFact[];
}

export const DOCUMENT_FACTS: DocumentFactsEntry[] = [
  {
    slug: "collections-policy-2025",
    facts: [
      { icon: "calendar", label: "Due Date", value: "1st of each month", highlight: true },
      { icon: "dollar", label: "Late Fee (1 mo)", value: "$50" },
      { icon: "dollar", label: "Late Fee (2 mo)", value: "$150" },
      { icon: "dollar", label: "Late Fee (3+ mo)", value: "$250/month" },
      { icon: "dollar", label: "Interest Rate", value: "8% annually" },
      { icon: "clock", label: "Payment Plans", value: "Min. 18 months", highlight: true },
      { icon: "alert", label: "Attorney Referral", value: "After 90 days" },
    ],
  },
  {
    slug: "insurance-certificate-2025-2026",
    facts: [
      { icon: "dollar", label: "Property Coverage", value: "$22,460,000", highlight: true },
      { icon: "dollar", label: "General Liability", value: "$1,000,000/occurrence" },
      { icon: "dollar", label: "Umbrella Coverage", value: "$10,000,000" },
      { icon: "dollar", label: "D&O Coverage", value: "$1,000,000" },
      { icon: "dollar", label: "Deductible", value: "$15,000", highlight: true },
      { icon: "calendar", label: "Policy Period", value: "Oct 2025 - Oct 2026" },
    ],
  },
  {
    slug: "insurance-ready-reference-2025-2026",
    facts: [
      { icon: "mail", label: "Claims Email", value: "claims@mtnwst.com", highlight: true },
      { icon: "phone", label: "Claims Phone", value: "970-945-9111", highlight: true },
      { icon: "info", label: "Insurer", value: "Mountain West Insurance" },
    ],
  },
  {
    slug: "unit-owners-letter-2025-2026",
    facts: [
      { icon: "home", label: "HOA Covers", value: "Building exterior, common areas" },
      { icon: "alert", label: "Owner Must Insure", value: "Interior, contents, liability", highlight: true },
      { icon: "info", label: "Recommended", value: "HO6 condo policy" },
    ],
  },
  {
    slug: "rules-and-regulations-2018",
    facts: [
      { icon: "check", label: "Pets Allowed", value: "1 dog or cat per unit" },
      { icon: "dollar", label: "Tenant Pet Fee", value: "$100/month" },
      { icon: "info", label: "Parking", value: "2 spaces per unit" },
      { icon: "clock", label: "Quiet Hours", value: "10 PM - 8 AM", highlight: true },
      { icon: "alert", label: "Min Heat Temp", value: "55°F (Oct-May)", highlight: true },
      { icon: "calendar", label: "Min Lease Term", value: "30 days" },
    ],
  },
  {
    slug: "bylaws",
    facts: [
      { icon: "users", label: "Voting", value: "1 vote per unit" },
      { icon: "calendar", label: "Annual Meeting", value: "November", highlight: true },
      { icon: "users", label: "Board Size", value: "3-7 directors" },
      { icon: "check", label: "Quorum", value: "1/3 of members" },
      { icon: "clock", label: "Meeting Notice", value: "15 days minimum" },
    ],
  },
  {
    slug: "declaration-of-condominium",
    facts: [
      { icon: "calendar", label: "Established", value: "1979" },
      { icon: "home", label: "Type", value: "Condominium Association" },
      { icon: "info", label: "Governing Law", value: "Colorado CCIOA" },
    ],
  },
  {
    slug: "articles-of-incorporation-1979",
    facts: [
      { icon: "calendar", label: "Filed", value: "1979" },
      { icon: "info", label: "Type", value: "Colorado Nonprofit" },
      { icon: "home", label: "Purpose", value: "Manage common property" },
    ],
  },
  {
    slug: "responsible-governance-policies-2025",
    facts: [
      { icon: "calendar", label: "Effective", value: "November 2025", highlight: true },
      { icon: "info", label: "Prepared By", value: "Alpenglow Law, LLC" },
      { icon: "check", label: "Includes", value: "Collections, Enforcement, Records" },
    ],
  },
  {
    slug: "enforcement-policy-2025",
    facts: [
      { icon: "dollar", label: "Max Fine (non-safety)", value: "$500", highlight: true },
      { icon: "alert", label: "Safety Violations", value: "Unlimited fines" },
      { icon: "clock", label: "Hearing Request", value: "Within 5 days", highlight: true },
      { icon: "info", label: "First Violation", value: "Warning letter" },
    ],
  },
  {
    slug: "records-inspection-policy-2025",
    facts: [
      { icon: "clock", label: "Response Time", value: "10 business days", highlight: true },
      { icon: "check", label: "Available", value: "Financials, minutes, contracts" },
      { icon: "alert", label: "Restricted", value: "Attorney comms, personnel" },
    ],
  },
];

/**
 * Get facts for a specific document
 */
export function getDocumentFacts(slug: string): DocumentFact[] | null {
  const entry = DOCUMENT_FACTS.find((f) => f.slug === slug);
  return entry?.facts || null;
}

/**
 * Check if a document has key facts defined
 */
export function hasDocumentFacts(slug: string): boolean {
  return DOCUMENT_FACTS.some((f) => f.slug === slug);
}
