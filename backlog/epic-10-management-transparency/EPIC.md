# Epic 10: Management Transparency & Accountability Enhancement

## Overview

Enhance the website with detailed property management accountability information based on the comprehensive Bold Property Management documentation. This epic builds upon Epic 9's institutional knowledge foundation by adding granular details about management authority, limitations, and owner rights that empower homeowners to understand their relationship with Bold Property Management.

## Business Value

**Problem:** While Epic 9 established basic contact information for Bold Property Management, the BOLD.md documentation reveals critical nuances that residents need to understand:
- What Bold **can** and **cannot** do independently
- Specific email addresses for different types of communication
- Records Bold is required to maintain
- Known gaps in service documentation (no SLAs, no assigned staff contacts)
- The chain of accountability when management fails to act

**Solution:** Create dedicated pages and enhanced components that surface this detailed management accountability information, making it clear where responsibilities lie and how to escalate issues effectively.

**Impact:**
- Residents understand the boundaries of management authority
- Clear escalation paths for unresolved issues
- Documentation of service gaps creates accountability pressure
- Reduced frustration through proper expectation setting
- Site becomes the definitive resource for management interactions

## Gap Analysis: BOLD.md vs Current Website

### New Information NOT Currently Displayed

| Section | BOLD.md Content | Current Status | Priority |
|---------|----------------|----------------|----------|
| Delegated Authority | What Bold CAN do (9 specific powers) | Not displayed | Critical |
| Authority Limits | What Bold CANNOT do (3 restrictions) | Not displayed | Critical |
| Specific Emails | clientservices@, communications@ addresses | Generic domains only | High |
| Records Responsibilities | Specific list of records Bold maintains | Not detailed | High |
| Missing Documentation | Management agreement, SLAs, staff list | Not documented | Medium |
| Communication Topics | Common issues (pest control, access, etc.) | Partially in FAQ | Medium |
| Accountability Note | "Delays fall within delegated role" | Not displayed | High |

### Information Already Implemented (Epic 9)

| Section | Status | Notes |
|---------|--------|-------|
| Bold contact basics | Partial | Has name, address, email domains |
| General responsibilities | Partial | 11 bullet points listed |
| Mailing address | Complete | PO Box 5800, Avon, CO |
| AppFolio mention | Complete | Listed in platforms |

## Recommendations Summary

### 1. Dedicated Property Management Page
Create a comprehensive `/management` page that details Bold's role, authority, and limitations. This becomes the go-to resource for understanding the management relationship.

### 2. Owner Rights Section
Add a section clarifying what owners can expect from management, what they're entitled to receive, and when Board intervention is required.

### 3. Communication Best Practices Guide
Help owners communicate effectively by documenting which email to use for what purpose, expected response times (or lack thereof), and escalation triggers.

### 4. Service Gap Documentation
Transparently document what's missing (management agreement, SLAs) to create accountability and manage expectations.

### 5. Enhanced AI Context
Update the AI assistant to answer detailed questions about management authority and limitations.

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Management authority clarity | Not documented | 100% of BOLD.md content surfaced |
| "Who can approve X" questions | AI uncertain | AI provides accurate authority info |
| Escalation path understanding | Vague | Step-by-step with authority limits |
| Service expectation clarity | Undefined | Documented (even if gaps exist) |

## User Stories

| ID | Story | Points | Priority | Dependencies |
|----|-------|--------|----------|--------------|
| 10.1 | Property Management Authority Page | 5 | Critical | None |
| 10.2 | Delegated Authority Component | 3 | Critical | 10.1 |
| 10.3 | Authority Limitations Component | 3 | Critical | 10.1 |
| 10.4 | Specific Contact Details Enhancement | 2 | High | 10.1 |
| 10.5 | Records Custodian Section | 3 | High | 10.1 |
| 10.6 | Service Gap Documentation | 2 | Medium | 10.1 |
| 10.7 | Communication Best Practices Guide | 3 | High | None |
| 10.8 | Enhanced Escalation Flow | 3 | Medium | 10.2, 10.3 |
| 10.9 | AI Management Context Update | 3 | High | 10.1-10.6 |
| 10.10 | Data Model Updates | 2 | Critical | None |

**Total Points:** 29

## Phase Breakdown

### Phase 10A: Foundation (Stories 10.1, 10.10)
**Goal:** Core page and data structure
- Create new `/management` page
- Update institutional knowledge data model
- Establish page structure and navigation

### Phase 10B: Authority Documentation (Stories 10.2, 10.3, 10.4)
**Goal:** Clear authority boundaries
- Document what Bold can do
- Document what Bold cannot do
- Add specific email addresses with guidance

### Phase 10C: Accountability (Stories 10.5, 10.6, 10.7)
**Goal:** Empower owners with knowledge
- Records custodian responsibilities
- Service gap documentation
- Communication best practices

### Phase 10D: Integration (Stories 10.8, 10.9)
**Goal:** Connect to existing systems
- Enhanced escalation flow
- AI context updates

## Technical Approach

### Data Model Updates

```typescript
// src/types/institutional.ts - additions

export interface DelegatedAuthority {
  powers: string[];          // What Bold CAN do
  limitations: string[];     // What Bold CANNOT do
}

export interface ManagementContact {
  purpose: string;           // "General inquiries", "Mass communications"
  email: string;
  notes?: string;
}

export interface RecordsCustody {
  recordType: string;
  description: string;
  accessProcess?: string;
}

export interface ServiceGap {
  item: string;
  description: string;
  impact: string;
}
```

### New Data Structure

```typescript
// src/lib/data/institutional-knowledge.ts - additions

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
    "Schedule maintenance and repairs"
  ],
  limitations: [
    "Cannot independently initiate legal action",
    "Cannot refer accounts to attorneys without a recorded Board vote",
    "Cannot approve foreclosures"
  ]
};

export const BOLD_SPECIFIC_EMAILS: ManagementContact[] = [
  {
    purpose: "General / Client Services",
    email: "clientservices@boldsolutions.net",
    notes: "General property management correspondence"
  },
  {
    purpose: "Mass Communications",
    email: "communications@boldpropertymanagement.mailer.appfolio.us",
    notes: "Automated notices (pest control, access notices, compliance)"
  }
];

export const BOLD_RECORDS_CUSTODY: RecordsCustody[] = [
  { recordType: "Financial records", description: "HOA financial statements and transactions" },
  { recordType: "Owner ledgers", description: "Individual owner account records" },
  { recordType: "Contracts", description: "Vendor and service agreements" },
  { recordType: "Insurance documentation", description: "Policy documents and certificates" },
  { recordType: "Board communications", description: "Non-privileged Board correspondence" }
];

export const SERVICE_GAPS: ServiceGap[] = [
  {
    item: "Management Agreement",
    description: "Scope of services, fees, and termination terms",
    impact: "Owners cannot verify contracted service levels"
  },
  {
    item: "Assigned Staff Contact List",
    description: "No designated staff member for Westlake",
    impact: "Unclear who is responsible for the property"
  },
  {
    item: "Service-Level Agreements",
    description: "No documented response-time commitments",
    impact: "Cannot hold management to specific timelines"
  },
  {
    item: "Internal Escalation Procedures",
    description: "No documented escalation path within Bold",
    impact: "Unclear how to escalate within management company"
  }
];

export const ACCOUNTABILITY_NOTE =
  "Bold is not a passive administrator. Under governing documents and Colorado law, " +
  "it functions as an operational extension of the HOA and carries compliance, records, " +
  "and enforcement responsibilities. Delays, non-responses, or failures to act fall " +
  "within this delegated role.";
```

### New Page Structure

```
src/app/
├── management/
│   └── page.tsx           # Property Management details page (10.1)
```

### New Components

```
src/components/
├── delegated-authority.tsx    # What Bold can do (10.2)
├── authority-limits.tsx       # What Bold cannot do (10.3)
├── management-contacts.tsx    # Specific email guidance (10.4)
├── records-custody.tsx        # Records Bold maintains (10.5)
├── service-gaps.tsx           # Missing documentation (10.6)
└── communication-guide.tsx    # Best practices (10.7)
```

### Updated Pages

```
src/app/
├── contacts/
│   └── page.tsx           # Add link to /management for details
├── transparency/
│   └── page.tsx           # Add service gap information
```

## Content from BOLD.md

### Key Accountability Statement

> "Bold is not a passive administrator. Under governing documents and Colorado law, it functions as an operational extension of the HOA and carries compliance, records, and enforcement responsibilities. Delays, non-responses, or failures to act fall within this delegated role."

This statement should be prominently displayed to help owners understand that management bears responsibility for action or inaction.

### Delegated Authority (What Bold CAN Do)

1. Act as the HOA's managing agent
2. Receive and respond to owner communications
3. Maintain official HOA records
4. Coordinate records inspections
5. Send delinquency notices (First Contact / Notice of Delinquency)
6. Sign Notices of Assessment Lien (delegated authority)
7. Maintain contact and communication logs
8. Coordinate vendor services
9. Schedule and oversee maintenance

### Authority Limitations (What Bold CANNOT Do)

1. **Cannot independently initiate legal action** - Requires Board authorization
2. **Cannot refer accounts to attorneys without a recorded Board vote** - Collections escalation needs Board approval
3. **Cannot approve foreclosures** - Must have explicit Board authorization

### Specific Email Addresses

| Purpose | Email | Notes |
|---------|-------|-------|
| General / Client Services | clientservices@boldsolutions.net | General correspondence |
| Mass Communications | communications@boldpropertymanagement.mailer.appfolio.us | Automated notices via AppFolio |

### Records Bold Must Maintain

- Financial records
- Owner ledgers
- Contracts
- Insurance documentation
- Board communications (non-privileged)

### Required to:
- Provide records within statutory timelines
- Coordinate inspections during normal business hours
- Track and document owner communications

### Documented Service Gaps

| Missing Item | Impact |
|--------------|--------|
| Management agreement | Cannot verify contracted services |
| Assigned staff list | Unknown who handles Westlake |
| SLA / Response times | No accountability for delays |
| Internal escalation | No path within Bold company |

## Navigation Updates

Add to main navigation:
- **Management** - Property management details page

Update existing pages:
- `/contacts` - Add prominent link to `/management` for Bold details
- `/transparency` - Add service gap documentation
- `/more` - Add Management link

## Dependencies

- **Prerequisite:** BOLD.md documentation (complete)
- **Prerequisite:** Epic 9 data structures (complete)
- **External:** None
- **Epic Dependencies:**
  - Epic 9 (Knowledge Base) - extends existing data model
  - Epic 8 (AI) - context updates

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Information becomes stale | Medium | Medium | Add "last updated" dates, quarterly review |
| Perceived as adversarial | Medium | High | Neutral language, fact-based only, document what IS available too |
| Bold requests removal | Low | Medium | All info from public documents or documented communications |
| Creates owner frustration | Medium | Low | Empower with actionable steps, not just complaints |

## Out of Scope (Future)

- Real-time management performance tracking
- Owner-submitted service complaints
- Direct contact forms to management
- Comparison with other management companies
- Management fee disclosure (if not in public docs)

## UX Considerations

### Information Architecture
- Primary access via `/management` page
- Quick reference cards on `/contacts`
- Escalation guidance integrated with enforcement path
- AI can direct users to relevant sections

### Visual Hierarchy
1. **What Bold Does** - Positive/neutral (green accents)
2. **What Bold Cannot Do** - Important/warning (amber accents)
3. **Service Gaps** - Informational (neutral gray)
4. **Accountability Note** - Highlighted callout box

### Mobile Experience
- Collapsible sections for authority lists
- Sticky "Contact" button for quick access
- Progressive disclosure for detailed information

## Reference

- Source: `docs/BOLD.md`
- Source: `docs/Bold_Property_Management_README.md`
- Related: Epic 9 (Knowledge Base Integration)
- Related: `src/lib/data/institutional-knowledge.ts`
