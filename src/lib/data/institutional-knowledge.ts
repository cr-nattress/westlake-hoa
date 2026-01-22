// Institutional Knowledge Data
// Source: docs/Westlake_Unofficial_HOA_Knowledge_Base_README.md

import type {
  HOAIdentity,
  ContactEntity,
  BoardMember,
  BoardAuthority,
  CommunicationPattern,
  TransparencyIssue,
  RecordsComparison,
  EnforcementStep,
  HistoricalEntity,
  KnowledgeBaseMetadata,
  InstitutionalKnowledge,
  Address,
  // Epic 10 types
  DelegatedAuthority,
  ManagementContact,
  RecordsCustody,
  ServiceGap,
  EscalationStepEnhanced,
  ManagementAuthorityData,
} from "@/types/institutional";

// =============================================================================
// HOA Identity
// =============================================================================

export const HOA_IDENTITY: HOAIdentity = {
  legalName: "Benchmark Condominium Homeowners Association",
  dba: "Westlake Village Condominium Association, Inc.",
  jurisdiction: [
    "Colorado Common Interest Ownership Act (CCIOA)",
    "Colorado Nonprofit Corporation Act",
  ],
  entityType: "Condominium Association (Non-profit corporation)",
  totalUnits: 92,
  propertyName: "Westlake Village Condominiums",
};

// =============================================================================
// HOA Mailing Addresses
// =============================================================================

export const HOA_PRIMARY_ADDRESS: Address = {
  line1: "Benchmark Condominium Homeowners Association",
  line2: "c/o Bold Property Management",
  city: "Avon",
  state: "CO",
  zip: "81620",
};

export const HOA_MAILING_ADDRESS: Address = {
  line1: "PO Box 5800",
  city: "Avon",
  state: "CO",
  zip: "81620",
};

// =============================================================================
// Contact Entities
// =============================================================================

export const PROPERTY_MANAGEMENT: ContactEntity = {
  name: "Bold Property Management / Bold Solutions",
  role: "Day-to-day property management company",
  type: "management",
  mailingAddress: {
    line1: "PO Box 5800",
    city: "Avon",
    state: "CO",
    zip: "81620",
  },
  emailDomains: [
    "@boldsolutions.net",
    "@boldpropertymanagement.mailer.appfolio.us",
  ],
  platforms: ["AppFolio (automated notices, access requests, mass emails)"],
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
    "Record access facilitation (with Board approval where required)",
  ],
};

export const LEGAL_COUNSEL: ContactEntity = {
  name: "Alpenglow Law, LLC",
  role: "HOA General Counsel",
  type: "legal",
  responsibilities: [
    "HOA general counsel",
    "Collections oversight",
    "Governance compliance",
    "Formal legal correspondence",
  ],
  notes: [
    "Known Attorney: T.J. Voboril, Esq.",
    "Homeowners are often instructed to communicate through counsel once matters are escalated",
    "Counsel responses frequently reference Board authorization",
  ],
};

export const INSURANCE_BROKER: ContactEntity = {
  name: "Mountain West Insurance & Financial Services, LLC",
  role: "Insurance Broker",
  type: "insurance",
  email: "claims@mtnwst.com",
  phone: "970-945-9111",
};

export const CONTACTS: ContactEntity[] = [
  PROPERTY_MANAGEMENT,
  LEGAL_COUNSEL,
  INSURANCE_BROKER,
];

// =============================================================================
// Historical Entities
// =============================================================================

export const HISTORICAL_MANAGEMENT: HistoricalEntity = {
  name: "Spaeth and Company, Inc.",
  note: "Previous/historical management company",
  address: {
    line1: "PO Box 3717",
    city: "Eagle",
    state: "CO",
    zip: "81631",
  },
};

// =============================================================================
// Board of Directors
// =============================================================================

export const BOARD_MEMBERS: BoardMember[] = [
  {
    name: "Mark Matz",
    position: "President",
    asOfDate: "November 2025",
  },
];

export const BOARD_AUTHORITY: BoardAuthority = {
  powers: [
    "Adopts and amends policies, procedures, and rules",
    "Authorizes collections, legal actions, and referrals",
    "Retains legal counsel",
    "Oversees property management",
  ],
  decisionMaking: {
    methods: [
      "Board meetings (regular or special)",
      "Unanimous written consent",
    ],
    recordedVotes: [
      "Collections referrals to legal counsel",
      "Authorization of legal actions",
      "Foreclosure authorization",
    ],
  },
};

// =============================================================================
// Communication Patterns
// =============================================================================

export const COMMUNICATION_PATTERNS: CommunicationPattern[] = [
  {
    category: "Bulk Communications",
    description: "Bulk notices via AppFolio email",
    platforms: ["AppFolio"],
  },
  {
    category: "Compliance Requests",
    description: "Time-sensitive compliance and access requests",
  },
  {
    category: "Response Times",
    description: "Limited responsiveness to individual follow-ups",
  },
  {
    category: "Escalation",
    description: "Escalation to legal counsel for disputes or accommodations",
  },
];

// =============================================================================
// Transparency Issues
// =============================================================================

export const TRANSPARENCY_ISSUES: TransparencyIssue[] = [
  {
    category: "communications",
    observation: "Delayed or absent responses to owner emails",
  },
  {
    category: "communications",
    observation: "Requirement to route requests through counsel",
  },
  {
    category: "governance",
    observation: "Limited clarity on Board decisions and votes",
  },
  {
    category: "health-safety",
    observation: "Inconsistent follow-up on health/safety matters",
  },
  {
    category: "records",
    observation: "Records access often delayed",
  },
  {
    category: "records",
    observation: "Formal written requests frequently required",
  },
  {
    category: "records",
    observation: "Board approval sometimes used as a gating mechanism",
  },
];

// =============================================================================
// Records Comparison
// =============================================================================

export const RECORDS_COMPARISON: RecordsComparison = {
  entitled: [
    "Meeting minutes",
    "Financial summaries",
    "Budgets",
    "Insurance summaries",
    "Policies and procedures",
    "Records inspection per CCIOA",
  ],
  restricted: [
    "Attorney-client privileged materials",
    "Executive session contents",
    "Personal owner data",
  ],
  observedReality: [
    "Records access often delayed",
    "Formal written requests frequently required",
    "Board approval sometimes used as a gating mechanism",
  ],
};

// =============================================================================
// Enforcement Path
// =============================================================================

export const ENFORCEMENT_PATH: EnforcementStep[] = [
  {
    step: 1,
    entity: "Owner",
    action: "Receives Notice",
    description: "Owner receives violation notice or citation from management",
    timeframe: "Initial contact",
  },
  {
    step: 2,
    entity: "Bold Property Management",
    action: "Issues Warning",
    description:
      "Management issues formal warning and documents the violation",
    timeframe: "Within days of observation",
  },
  {
    step: 3,
    entity: "Board of Directors",
    action: "Reviews & Decides",
    description:
      "Board reviews the matter and decides on action (fines, remediation requirements)",
    timeframe: "At next meeting or via written consent",
  },
  {
    step: 4,
    entity: "Alpenglow Law, LLC",
    action: "Handles Escalation",
    description:
      "Legal counsel handles escalated matters, collections, or formal legal action",
    timeframe: "After Board authorization",
  },
];

// =============================================================================
// Metadata
// =============================================================================

export const KNOWLEDGE_BASE_METADATA: KnowledgeBaseMetadata = {
  lastUpdated: "January 2026",
  source: "docs/Westlake_Unofficial_HOA_Knowledge_Base_README.md",
};

// =============================================================================
// Combined Export
// =============================================================================

export const INSTITUTIONAL_KNOWLEDGE: InstitutionalKnowledge = {
  hoaIdentity: HOA_IDENTITY,
  contacts: CONTACTS,
  boardMembers: BOARD_MEMBERS,
  boardAuthority: BOARD_AUTHORITY,
  communicationPatterns: COMMUNICATION_PATTERNS,
  transparencyIssues: TRANSPARENCY_ISSUES,
  recordsComparison: RECORDS_COMPARISON,
  enforcementPath: ENFORCEMENT_PATH,
  metadata: KNOWLEDGE_BASE_METADATA,
};

// =============================================================================
// Epic 10: Management Authority Data
// =============================================================================

export const BOLD_DELEGATED_AUTHORITY: DelegatedAuthority = {
  powers: [
    "Act as the HOA's managing agent",
    "Receive and respond to owner communications",
    "Maintain official HOA records",
    "Coordinate records inspections",
    "Send delinquency notices (First Contact / Notice of Delinquency)",
    "Sign Notices of Assessment Lien (delegated authority)",
    "Maintain contact and communication logs",
    "Coordinate vendor services",
    "Schedule and oversee maintenance",
  ],
  limitations: [
    {
      limitation: "Cannot independently initiate legal action",
      requirement: "Requires Board authorization",
    },
    {
      limitation:
        "Cannot refer accounts to attorneys without a recorded Board vote",
      requirement: "Board must record vote before collections referral",
    },
    {
      limitation: "Cannot approve foreclosures",
      requirement: "Requires explicit Board authorization and recorded vote",
    },
  ],
};

export const BOLD_SPECIFIC_EMAILS: ManagementContact[] = [
  {
    purpose: "General / Client Services",
    email: "clientservices@boldsolutions.net",
    notes: "Use for general property management correspondence",
  },
  {
    purpose: "Mass Communications (Automated)",
    email: "communications@boldpropertymanagement.mailer.appfolio.us",
    notes:
      "Automated notices via AppFolio (pest control, access, compliance). Often no-reply.",
  },
];

export const BOLD_RECORDS_CUSTODY: RecordsCustody[] = [
  {
    recordType: "Financial records",
    description: "HOA financial statements, budgets, and transaction records",
  },
  {
    recordType: "Owner ledgers",
    description: "Individual owner account records and payment history",
  },
  {
    recordType: "Contracts",
    description: "Vendor agreements and service contracts",
  },
  {
    recordType: "Insurance documentation",
    description: "Master policy documents and certificates of insurance",
  },
  {
    recordType: "Board communications",
    description: "Non-privileged Board correspondence and meeting notices",
  },
];

export const RECORDS_ACCESS_REQUIREMENTS: string[] = [
  "Provide records within statutory timelines",
  "Coordinate inspections during normal business hours",
  "Track and document owner communications",
];

export const SERVICE_GAPS: ServiceGap[] = [
  {
    item: "Management Agreement",
    description: "Scope of services, fees, and termination terms",
    impact: "Owners cannot verify what services are contracted",
  },
  {
    item: "Assigned Staff Contact List",
    description: "No designated staff member identified for Westlake",
    impact: "Unclear who is directly responsible for the property",
  },
  {
    item: "Service-Level Agreements (SLAs)",
    description: "No documented response-time commitments",
    impact: "Cannot hold management to specific response timelines",
  },
  {
    item: "Internal Escalation Procedures",
    description: "No documented escalation path within Bold",
    impact: "Unclear how to escalate issues within the management company",
  },
];

export const ACCOUNTABILITY_STATEMENT =
  "Bold is not a passive administrator. Under governing documents and Colorado law, " +
  "it functions as an operational extension of the HOA and carries compliance, records, " +
  "and enforcement responsibilities. Delays, non-responses, or failures to act fall " +
  "within this delegated role.";

export const ESCALATION_FLOW: EscalationStepEnhanced[] = [
  {
    step: 1,
    entity: "Bold Property Management",
    action: "Initial Contact",
    description: "Submit issue or request to property management",
    authority: [
      "Receive and respond to communications",
      "Coordinate maintenance and vendors",
      "Issue warnings and notices",
    ],
    limitations: [
      "Cannot initiate legal action",
      "Cannot waive fees without Board approval",
    ],
    escalateTriggers: [
      "No response within 7-10 business days",
      "Issue requires Board authority",
      "Dispute over fees or fines",
    ],
    contactLink: "/contacts",
  },
  {
    step: 2,
    entity: "Board of Directors",
    action: "Board Review",
    description: "Request Board review for matters beyond management authority",
    authority: [
      "Approve/deny fee waivers",
      "Authorize legal action",
      "Make policy decisions",
      "Direct management actions",
    ],
    limitations: [
      "May require meeting to act",
      "Cannot address attorney-client matters",
    ],
    escalateTriggers: [
      "Board fails to respond or act",
      "Matter becomes legal dispute",
      "CCIOA rights violated",
    ],
    contactLink: "/governance",
  },
  {
    step: 3,
    entity: "HOA Legal Counsel",
    action: "Legal Escalation",
    description: "Matters referred to Alpenglow Law, LLC",
    authority: [
      "Handle collections",
      "Formal legal correspondence",
      "Compliance enforcement",
    ],
    limitations: [
      "Acts on Board authorization only",
      "May limit owner direct communication",
    ],
    escalateTriggers: ["Legal rights violated", "Need independent legal advice"],
    contactLink: "/contacts",
  },
  {
    step: 4,
    entity: "Independent Counsel / Regulatory",
    action: "External Resolution",
    description: "Consult your own attorney or file regulatory complaints",
    authority: [
      "Independent legal advice",
      "CCIOA violation complaints",
      "Civil litigation if needed",
    ],
    limitations: [],
    escalateTriggers: [],
  },
];

export const MANAGEMENT_AUTHORITY_DATA: ManagementAuthorityData = {
  delegatedAuthority: BOLD_DELEGATED_AUTHORITY,
  contacts: BOLD_SPECIFIC_EMAILS,
  recordsCustody: BOLD_RECORDS_CUSTODY,
  serviceGaps: SERVICE_GAPS,
  accountabilityStatement: ACCOUNTABILITY_STATEMENT,
  accessRequirements: RECORDS_ACCESS_REQUIREMENTS,
};

// =============================================================================
// Utility Functions
// =============================================================================

export function getContactByType(
  type: ContactEntity["type"]
): ContactEntity | undefined {
  return CONTACTS.find((c) => c.type === type);
}

export function getIssuesByCategory(
  category: TransparencyIssue["category"]
): TransparencyIssue[] {
  return TRANSPARENCY_ISSUES.filter((i) => i.category === category);
}

export function formatAddress(address: Address): string {
  const lines = [address.line1];
  if (address.line2) lines.push(address.line2);
  lines.push(`${address.city}, ${address.state} ${address.zip}`);
  return lines.join("\n");
}

export function formatAddressInline(address: Address): string {
  const parts = [address.line1];
  if (address.line2) parts.push(address.line2);
  parts.push(`${address.city}, ${address.state} ${address.zip}`);
  return parts.join(", ");
}

// Category display names
export const TRANSPARENCY_CATEGORY_LABELS: Record<
  TransparencyIssue["category"],
  string
> = {
  communications: "Communications",
  governance: "Governance",
  "health-safety": "Health & Safety",
  records: "Records",
};

// Contact type display names
export const CONTACT_TYPE_LABELS: Record<ContactEntity["type"], string> = {
  management: "Property Management",
  legal: "Legal Counsel",
  insurance: "Insurance",
  board: "Board of Directors",
};
