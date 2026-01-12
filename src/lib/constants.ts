export const SITE_CONFIG = {
  name: "Westlake Transparency Hub",
  description:
    "Unofficial, AI-powered information portal for the Westlake Village Condominium Association in Avon, Colorado.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "Home" },
  { href: "/documents", label: "Documents", icon: "FileText" },
  { href: "/ask", label: "Ask AI", icon: "MessageSquare" },
  { href: "/meetings", label: "Meetings", icon: "Calendar" },
  { href: "/insurance", label: "Insurance", icon: "Shield" },
  { href: "/records", label: "Records", icon: "FolderOpen" },
] as const;

export const MOBILE_NAV_ITEMS = [
  { href: "/", label: "Home", icon: "Home" },
  { href: "/documents", label: "Docs", icon: "FileText" },
  { href: "/ask", label: "Ask AI", icon: "MessageSquare" },
  { href: "/meetings", label: "Meetings", icon: "Calendar" },
  { href: "/more", label: "More", icon: "Menu" },
] as const;

export const DOCUMENT_TYPES = {
  declaration: { label: "Declaration", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
  bylaw: { label: "Bylaw", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  rule: { label: "Rule", color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200" },
  policy: { label: "Policy", color: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200" },
  minutes: { label: "Minutes", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  notice: { label: "Notice", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
  insurance: { label: "Insurance", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200" },
} as const;

export const DISCLAIMERS = {
  site: "This is an unofficial, homeowner-run information resource. Not affiliated with the HOA Board, management company, or legal counsel.",
  ai: "This is informational only, not legal advice. Consult the official documents or seek professional advice for binding terms.",
  notLegalAdvice: "This information is provided for informational purposes only and does not constitute legal advice.",
} as const;
