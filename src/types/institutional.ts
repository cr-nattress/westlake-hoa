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

// =============================================================================
// Epic 10: Management Authority Types
// =============================================================================

/**
 * Authority limitation with explanation of what IS required
 */
export interface AuthorityLimitation {
  /** What they cannot do */
  limitation: string;
  /** What IS required instead */
  requirement: string;
}

/**
 * Delegated authority structure for property management
 */
export interface DelegatedAuthority {
  /** Actions management IS authorized to perform */
  powers: string[];
  /** Actions management is NOT authorized to perform */
  limitations: AuthorityLimitation[];
}

/**
 * Specific contact for a particular purpose
 */
export interface ManagementContact {
  /** Purpose of this contact method */
  purpose: string;
  /** Email address */
  email: string;
  /** Additional notes about this contact */
  notes?: string;
}

/**
 * Record type maintained by management
 */
export interface RecordsCustody {
  /** Type of record */
  recordType: string;
  /** Description of what this includes */
  description: string;
}

/**
 * Documented service gap
 */
export interface ServiceGap {
  /** Name of missing item */
  item: string;
  /** Description of what's missing */
  description: string;
  /** Impact on homeowners */
  impact: string;
}

/**
 * Enhanced escalation step with authority details
 */
export interface EscalationStepEnhanced {
  /** Step number in sequence */
  step: number;
  /** Entity name */
  entity: string;
  /** Action taken at this step */
  action: string;
  /** Description of this step */
  description: string;
  /** What this entity CAN do */
  authority: string[];
  /** What this entity CANNOT do */
  limitations?: string[];
  /** When to escalate to next step */
  escalateTriggers?: string[];
  /** Link to contact page for this entity */
  contactLink?: string;
}

/**
 * Combined management authority data
 */
export interface ManagementAuthorityData {
  delegatedAuthority: DelegatedAuthority;
  contacts: ManagementContact[];
  recordsCustody: RecordsCustody[];
  serviceGaps: ServiceGap[];
  accountabilityStatement: string;
  accessRequirements: string[];
}
