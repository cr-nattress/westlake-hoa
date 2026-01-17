// Institutional Knowledge Types
// Types for HOA identity, contacts, governance, and transparency data

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface HOAIdentity {
  legalName: string;
  dba: string;
  jurisdiction: string[];
  entityType: string;
  totalUnits: number;
  propertyName: string;
}

export type ContactType = "management" | "legal" | "insurance" | "board";

export interface ContactEntity {
  name: string;
  role: string;
  type: ContactType;
  mailingAddress?: Address;
  email?: string;
  emailDomains?: string[];
  phone?: string;
  platforms?: string[];
  responsibilities?: string[];
  notes?: string[];
}

export interface BoardMember {
  name: string;
  position: string;
  asOfDate: string;
}

export interface BoardAuthority {
  powers: string[];
  decisionMaking: {
    methods: string[];
    recordedVotes: string[];
  };
}

export type TransparencyCategory =
  | "communications"
  | "governance"
  | "health-safety"
  | "records";

export interface CommunicationPattern {
  category: string;
  description: string;
  platforms?: string[];
}

export interface TransparencyIssue {
  category: TransparencyCategory;
  observation: string;
  context?: string;
}

export interface RecordsComparison {
  entitled: string[];
  restricted: string[];
  observedReality: string[];
}

export interface EnforcementStep {
  step: number;
  entity: string;
  action: string;
  description: string;
  timeframe?: string;
}

export interface HistoricalEntity {
  name: string;
  note: string;
  address?: Address;
}

export interface KnowledgeBaseMetadata {
  lastUpdated: string;
  source: string;
}

export interface InstitutionalKnowledge {
  hoaIdentity: HOAIdentity;
  contacts: ContactEntity[];
  boardMembers: BoardMember[];
  boardAuthority: BoardAuthority;
  communicationPatterns: CommunicationPattern[];
  transparencyIssues: TransparencyIssue[];
  recordsComparison: RecordsComparison;
  enforcementPath: EnforcementStep[];
  metadata: KnowledgeBaseMetadata;
}
