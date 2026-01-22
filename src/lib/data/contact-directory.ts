// Contact Directory Data
// Comprehensive contact information for all HOA-related entities
// Source: docs/contact-info.md, insurance documents, governance policies

import type {
  ContactEntityFull,
  Address,
} from "@/types/institutional";

// =============================================================================
// Addresses
// =============================================================================

export const BOLD_MAILING_ADDRESS: Address = {
  line1: "PO Box 5800",
  city: "Avon",
  state: "CO",
  zip: "81620",
};

// =============================================================================
// Property Management - Bold Property Management / Bold Solutions
// =============================================================================

export const PROPERTY_MANAGEMENT_FULL: ContactEntityFull = {
  name: "Bold Property Management",
  role: "Day-to-day property management company",
  type: "management",
  emails: [
    {
      address: "clientservices@boldsolutions.net",
      purpose: "General inquiries",
    },
    {
      address: "communications@boldpropertymanagement.mailer.appfolio.us",
      purpose: "Automated notices (often no-reply)",
    },
    {
      address: "amy@boldsolutions.net",
      purpose: "Staff member",
    },
  ],
  address: BOLD_MAILING_ADDRESS,
  website: {
    url: "https://boldpropertymanagement.appfolio.com/connect",
    label: "Owner Portal (AppFolio)",
  },
  responsibilities: [
    "Day-to-day property management",
    "Owner communications",
    "Vendor coordination",
    "Financial administration",
    "Record custodian (non-legal)",
    "Pest control coordination",
    "Maintenance scheduling",
    "Access requests to units",
    "Distribution of HOA notices",
    "Enforcement communications",
  ],
  notes: [
    "Also known as 'Bold Solutions'",
    "Uses AppFolio for automated communications",
    "No direct phone number publicly listed",
  ],
};

// =============================================================================
// Insurance Broker - Mountain West Insurance & Financial Services, LLC
// =============================================================================

export const INSURANCE_BROKER_FULL: ContactEntityFull = {
  name: "Mountain West Insurance & Financial Services, LLC",
  role: "HOA Insurance Broker",
  type: "insurance",
  phones: [
    { number: "(800) 390-0559", purpose: "Toll-free main line" },
    { number: "(800) 255-6390", purpose: "Toll-free service team" },
    { number: "(970) 945-9111", purpose: "Main office (Avon, CO)" },
    { number: "(970) 384-8239", purpose: "Meghan Wilson direct" },
    { number: "(970) 824-1365", purpose: "Glenwood office" },
  ],
  faxes: [
    { number: "(970) 945-2350", purpose: "Main fax" },
    { number: "(970) 824-8188", purpose: "D&O Liability fax" },
  ],
  emails: [
    { address: "claims@mtnwst.com", purpose: "Claims reporting" },
    { address: "assncert@mtnwst.com", purpose: "Certificate requests" },
    { address: "meghanw@mtnwst.com", purpose: "Meghan Wilson, CIC" },
    { address: "bradyc@mtnwst.com", purpose: "Brady Cox" },
  ],
  keyContacts: [
    { name: "Meghan Wilson, CIC", title: "Producer / Commercial Lines Agent" },
    { name: "Joseph Stewart, CIC", title: "Commercial Account Executive" },
    { name: "Brady Cox", title: "Commercial Account Manager" },
    { name: "Patricia Trinidad", title: "Commercial Account Manager" },
    { name: "Dustin Brown", title: "Claims Advocate" },
  ],
  responsibilities: [
    "HOA master insurance policy",
    "Claims processing and reporting",
    "Certificate of insurance requests",
    "Coverage questions and guidance",
    "Annual policy renewals",
  ],
};

// =============================================================================
// Legal Counsel - Alpenglow Law, LLC
// =============================================================================

export const LEGAL_COUNSEL_FULL: ContactEntityFull = {
  name: "Alpenglow Law, LLC",
  role: "HOA General Counsel",
  type: "legal",
  phones: [
    { number: "(970) 306-6456", purpose: "Main office" },
  ],
  emails: [
    { address: "tj@alpenglowlaw.com", purpose: "T.J. Voboril, Esq." },
  ],
  keyContacts: [
    { name: "T.J. Voboril, Esq.", title: "Association General Counsel" },
  ],
  responsibilities: [
    "HOA general counsel",
    "Collections oversight",
    "Governance compliance",
    "Formal legal correspondence",
  ],
  notes: [
    "For escalated matters only",
    "Homeowners may be instructed to communicate through counsel once matters escalate",
    "Counsel responses frequently reference Board authorization",
  ],
};

// =============================================================================
// HOA Board of Directors
// =============================================================================

export const HOA_BOARD_FULL: ContactEntityFull = {
  name: "Board of Directors",
  role: "HOA Governing Body",
  type: "board",
  emails: [
    { address: "WLVAVON@gmail.com", purpose: "Board email" },
    { address: "mrmatz13@gmail.com", purpose: "Mark Matz, President" },
  ],
  keyContacts: [
    { name: "Mark Matz", title: "President", asOf: "November 2025" },
  ],
  address: {
    line1: "Benchmark Condominium HOA",
    line2: "c/o Bold Property Management",
    city: "Avon",
    state: "CO",
    zip: "81620",
  },
  responsibilities: [
    "Adopts and amends policies, procedures, and rules",
    "Authorizes collections, legal actions, and referrals",
    "Retains legal counsel",
    "Oversees property management",
    "Sets annual budget and assessments",
  ],
  notes: [
    "Board meets regularly - check meeting schedule for dates",
    "Formal requests may require written submission",
  ],
};

// =============================================================================
// All Contacts Export
// =============================================================================

export const ALL_CONTACTS: ContactEntityFull[] = [
  PROPERTY_MANAGEMENT_FULL,
  INSURANCE_BROKER_FULL,
  LEGAL_COUNSEL_FULL,
  HOA_BOARD_FULL,
];

// =============================================================================
// Contact Guide - When to Contact Each Entity
// =============================================================================

export interface ContactGuideItem {
  id: string;
  title: string;
  entity: string;
  type: ContactEntityFull["type"];
  items: string[];
  warning?: string;
}

export const CONTACT_GUIDE: ContactGuideItem[] = [
  {
    id: "management",
    title: "Property Management",
    entity: "Bold Solutions",
    type: "management",
    items: [
      "General property questions",
      "Maintenance requests and issues",
      "Pest control scheduling",
      "Access requests to units",
      "Payment questions (non-legal)",
      "Community rule questions",
      "Vendor coordination",
      "HOA notices and communications",
    ],
  },
  {
    id: "insurance",
    title: "Insurance",
    entity: "Mountain West Insurance",
    type: "insurance",
    items: [
      "Filing insurance claims",
      "Certificate of insurance requests",
      "Coverage questions",
      "Loss reports",
      "Insurance policy questions",
    ],
  },
  {
    id: "legal",
    title: "Legal Counsel",
    entity: "Alpenglow Law",
    type: "legal",
    items: [
      "Collections matters (when referred)",
      "Legal disputes",
      "Governance compliance questions",
      "Formal legal correspondence",
    ],
    warning:
      "Most homeowners should NOT contact legal counsel directly. Matters are typically escalated by the Board or management.",
  },
  {
    id: "board",
    title: "HOA Board",
    entity: "Board of Directors",
    type: "board",
    items: [
      "Policy questions or concerns",
      "Appeals of decisions",
      "Governance matters",
      "Matters not resolved by management",
      "Annual meeting topics",
    ],
  },
];

// =============================================================================
// Utility Functions
// =============================================================================

export function getContactByType(
  type: ContactEntityFull["type"]
): ContactEntityFull | undefined {
  return ALL_CONTACTS.find((c) => c.type === type);
}

export function searchContacts(
  contacts: ContactEntityFull[],
  query: string
): ContactEntityFull[] {
  if (!query.trim()) return contacts;

  const lowerQuery = query.toLowerCase();

  return contacts.filter((contact) => {
    // Search name and role
    if (contact.name.toLowerCase().includes(lowerQuery)) return true;
    if (contact.role.toLowerCase().includes(lowerQuery)) return true;

    // Search emails
    if (
      contact.emails?.some(
        (e) =>
          e.address.toLowerCase().includes(lowerQuery) ||
          e.purpose.toLowerCase().includes(lowerQuery)
      )
    )
      return true;

    // Search phones
    if (
      contact.phones?.some(
        (p) =>
          p.number.includes(lowerQuery) ||
          p.purpose.toLowerCase().includes(lowerQuery)
      )
    )
      return true;

    // Search key contacts
    if (
      contact.keyContacts?.some(
        (kc) =>
          kc.name.toLowerCase().includes(lowerQuery) ||
          kc.title.toLowerCase().includes(lowerQuery)
      )
    )
      return true;

    return false;
  });
}

export function filterContactsByType(
  contacts: ContactEntityFull[],
  type: string
): ContactEntityFull[] {
  if (type === "all") return contacts;
  return contacts.filter((c) => c.type === type);
}
