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

// =============================================================================
// Epic 12: Contact Directory Types
// =============================================================================

/**
 * Email contact with purpose
 */
export interface EmailContact {
  address: string;
  purpose: string;
}

/**
 * Phone contact with purpose
 */
export interface PhoneContact {
  number: string;
  purpose: string;
}

/**
 * Key contact person
 */
export interface KeyContact {
  name: string;
  title: string;
  email?: string;
  phone?: string;
  asOf?: string;
}

/**
 * Website/portal link
 */
export interface WebsiteLink {
  url: string;
  label: string;
}

/**
 * Full contact entity with comprehensive details
 */
export interface ContactEntityFull {
  name: string;
  role: string;
  type: ContactType;
  emails?: EmailContact[];
  phones?: PhoneContact[];
  faxes?: PhoneContact[];
  address?: Address;
  website?: WebsiteLink;
  keyContacts?: KeyContact[];
  notes?: string[];
  responsibilities?: string[];
}

// =============================================================================
// Epic 13: Vendor Profile Types
// =============================================================================

/**
 * Type of vendor (used for styling and categorization)
 */
export type VendorType = "property-management" | "legal" | "enforcement";

/**
 * Vendor leadership/team member
 */
export interface VendorLeader {
  name: string;
  title: string;
  background?: string;
  recognition?: string[];
  contact?: {
    email?: string;
    phone?: string;
  };
}

/**
 * Vendor service offering
 */
export interface VendorService {
  name: string;
  description: string;
  details?: string[];
  icon?: string; // Lucide icon name
}

/**
 * External rating/review
 */
export interface VendorRating {
  source: string;
  rating: string;
  description?: string;
  url?: string;
  dateRecorded?: string;
}

/**
 * Consumer right (for enforcement vendors)
 */
export interface ConsumerRight {
  title: string;
  description: string;
  legalBasis?: string; // e.g., "HB25-1117" or "4 CCR 723-6"
  icon?: string;
}

/**
 * Regulatory information (for enforcement vendors)
 */
export interface RegulatoryInfo {
  governingBody: string;
  permitRequired: boolean;
  keyRequirements: string[];
  consumerRights: ConsumerRight[];
  complaintProcess: {
    phone: string;
    tollFree?: string;
    description: string;
  };
  relevantLaws?: {
    name: string;
    description: string;
    effectiveDate?: string;
  }[];
}

/**
 * Technology/platform used by vendor
 */
export interface VendorTechnology {
  name: string;
  description: string;
  url?: string;
  features?: string[];
}

/**
 * Scale/size metric
 */
export interface VendorScaleMetric {
  metric: string;
  value: string;
}

/**
 * Main vendor profile
 */
export interface VendorProfile {
  // Identity
  id: string;
  slug: string;
  name: string;
  legalName?: string;
  type: VendorType;
  tagline: string;

  // Company Info
  founded: string;
  headquarters: string;
  entityId?: string; // Colorado entity ID
  status?: string; // e.g., "Good Standing"

  // Overview
  description: string;
  missionStatement?: string;
  history?: string;

  // Scale/Size
  scale?: VendorScaleMetric[];

  // Services
  services: VendorService[];

  // Contact Information
  contact: {
    phone?: string;
    phoneExtensions?: { ext: string; purpose: string }[];
    email?: string;
    website?: string;
    address?: string;
    mailingAddress?: string;
    portalUrl?: string;
    portalName?: string;
  };

  // Leadership/Team
  leadership?: VendorLeader[];

  // Technology Platforms
  technology?: VendorTechnology[];

  // Reputation
  ratings?: VendorRating[];
  awards?: string[];
  concerns?: string[]; // For transparency about issues

  // Regulatory (primarily for enforcement vendors)
  regulatory?: RegulatoryInfo;

  // Service area
  serviceArea?: string[];

  // Metadata
  sourceDocument: string;
  lastUpdated: string;
}

/**
 * Type guard to check if vendor is enforcement type
 */
export function isEnforcementVendor(vendor: VendorProfile): boolean {
  return vendor.type === "enforcement";
}

/**
 * Type guard to check if vendor has consumer rights info
 */
export function hasConsumerRights(
  vendor: VendorProfile
): vendor is VendorProfile & { regulatory: RegulatoryInfo } {
  return (
    vendor.regulatory !== undefined &&
    vendor.regulatory.consumerRights.length > 0
  );
}
