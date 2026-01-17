# Epic 9: Knowledge Base Integration

## Overview

Integrate the comprehensive institutional knowledge documented in the Westlake HOA Knowledge Base README into the website. This epic transforms the site from a document-centric resource into a complete transparency and accountability portal with key contacts, governance information, and documented communication patterns.

## Business Value

**Problem:** The knowledge base README contains critical institutional information that residents need but isn't displayed anywhere on the website:
- Legal name and entity structure
- Property management contacts and responsibilities
- Legal counsel information
- Board composition and authority
- Communication patterns and documented issues
- Enforcement processes

**Solution:** Create dedicated pages and components to surface this information, making it easily accessible and enhancing the site's value as a transparency resource.

**Impact:**
- Residents can quickly find who to contact for specific issues
- Understanding of HOA structure and authority improves
- Documented communication issues increase accountability
- Site becomes the go-to resource for all HOA information

## Gap Analysis: Knowledge Base vs Current Website

### Information NOT Currently on Website

| Section | Knowledge Base Content | Current Status | Priority |
|---------|----------------------|----------------|----------|
| HOA Identity | Legal name, jurisdiction, entity type, ~92 units | Not displayed | High |
| Mailing Addresses | Primary & historical HOA addresses | Not displayed | High |
| Property Management | Bold Solutions details, roles, contacts, platforms | Not displayed | Critical |
| Board & Governance | Board authority, president (Mark Matz), decision processes | Not displayed | High |
| Legal Counsel | Alpenglow Law, T.J. Voboril, role | Not displayed | High |
| Communications Log | Patterns, platforms, observed issues | Not displayed | Medium |
| Enforcement & Compliance | Escalation path, enforcement patterns | Partially in topic index | Medium |
| Records & Transparency | Owner entitlements vs observed reality | Partially on /records | Medium |

### Information Already Implemented

| Section | Status | Notes |
|---------|--------|-------|
| Insurance summary | ✅ Complete | /insurance page with coverage tables |
| Site purpose & disclaimer | ✅ Complete | /about page |
| Document access | ✅ Complete | /documents with full PDF library |
| Rules & policies | ✅ Complete | Topic index + FAQ |

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Contact info accessibility | Not available | <2 clicks to any contact |
| Governance understanding | Scattered | Centralized on one page |
| Transparency documentation | Not visible | Dedicated accountability section |
| Time to find "who to contact" | Unknown | <15 seconds |

## User Stories

| ID | Story | Points | Priority | Dependencies |
|----|-------|--------|----------|--------------|
| 9.1 | HOA Identity & Legal Structure Section | 3 | High | None |
| 9.2 | Key Contacts Page | 5 | Critical | None |
| 9.3 | Governance & Board Information Section | 3 | High | 9.2 |
| 9.4 | Property Management Details Component | 3 | High | 9.2 |
| 9.5 | Legal Counsel Information Component | 2 | High | 9.2 |
| 9.6 | Transparency & Accountability Section | 5 | Medium | 9.2, 9.3 |
| 9.7 | Enhanced Records Request Guide | 3 | Medium | None |
| 9.8 | Enforcement Process Guide | 3 | Medium | None |
| 9.9 | AI Knowledge Base Integration | 5 | High | 9.1-9.6 |
| 9.10 | Data Model for Institutional Knowledge | 3 | Critical | None |

**Total Points:** 35

## Phase Breakdown

### Phase 9A: Foundation & Contacts (Stories 9.1, 9.2, 9.10)
**Goal:** Core contact information accessible
- Create data model for institutional knowledge
- Build Key Contacts page with all entities
- Add HOA identity section

### Phase 9B: Governance & Management (Stories 9.3, 9.4, 9.5)
**Goal:** Clear understanding of HOA structure
- Board composition and authority
- Property management responsibilities
- Legal counsel role and escalation

### Phase 9C: Transparency & Accountability (Stories 9.6, 9.7, 9.8)
**Goal:** Document patterns and empower residents
- Communication patterns and issues
- Enhanced records request guide
- Enforcement process clarity

### Phase 9D: AI Enhancement (Story 9.9)
**Goal:** AI assistant knows institutional context
- Add knowledge base to AI context
- Answer "who to contact" questions
- Provide governance clarifications

## Technical Approach

### New Data Structure

```typescript
// src/lib/data/institutional-knowledge.ts

export interface HOAIdentity {
  legalName: string;
  dba: string;
  jurisdiction: string[];
  entityType: string;
  totalUnits: number;
  propertyName: string;
}

export interface ContactEntity {
  name: string;
  role: string;
  type: 'management' | 'legal' | 'board' | 'insurance';
  mailingAddress?: Address;
  email?: string;
  emailDomains?: string[];
  phone?: string;
  platforms?: string[];
  responsibilities?: string[];
  notes?: string[];
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface BoardMember {
  name: string;
  position: string;
  asOfDate: string;
}

export interface CommunicationPattern {
  category: string;
  description: string;
  issues?: string[];
}

export interface TransparencyIssue {
  category: string;
  observation: string;
  source?: string;
}
```

### New Pages

```
src/app/
├── contacts/
│   └── page.tsx           # Key Contacts page (9.2)
├── governance/
│   └── page.tsx           # Governance & Board page (9.3)
├── transparency/
│   └── page.tsx           # Accountability section (9.6)
```

### Updated Pages

```
src/app/
├── about/
│   └── page.tsx           # Add HOA identity section (9.1)
├── records/
│   └── page.tsx           # Enhanced with CCIOA rights (9.7)
```

### New Components

```
src/components/
├── contact-card.tsx           # Contact info display (9.4, 9.5)
├── board-members.tsx          # Board composition display (9.3)
├── address-display.tsx        # Formatted address component
├── transparency-issue.tsx     # Issue documentation card (9.6)
└── enforcement-timeline.tsx   # Enforcement escalation visual (9.8)
```

## Content from Knowledge Base

### HOA Identity Data

```typescript
export const HOA_IDENTITY: HOAIdentity = {
  legalName: "Benchmark Condominium Homeowners Association",
  dba: "Westlake Village Condominium Association, Inc.",
  jurisdiction: [
    "Colorado Common Interest Ownership Act (CCIOA)",
    "Colorado Nonprofit Corporation Act"
  ],
  entityType: "Condominium Association (Non-profit corporation)",
  totalUnits: 92,
  propertyName: "Westlake Village Condominiums"
};
```

### Contact Entities

```typescript
export const CONTACTS: ContactEntity[] = [
  {
    name: "Bold Property Management / Bold Solutions",
    role: "Property Management Company",
    type: "management",
    mailingAddress: {
      line1: "PO Box 5800",
      city: "Avon",
      state: "CO",
      zip: "81620"
    },
    emailDomains: [
      "@boldsolutions.net",
      "@boldpropertymanagement.mailer.appfolio.us"
    ],
    platforms: ["AppFolio"],
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
      "Enforcement communications"
    ]
  },
  {
    name: "Alpenglow Law, LLC",
    role: "HOA Legal Counsel",
    type: "legal",
    responsibilities: [
      "HOA general counsel",
      "Collections oversight",
      "Governance compliance",
      "Formal legal correspondence"
    ],
    notes: [
      "Attorney: T.J. Voboril, Esq.",
      "Homeowners are often instructed to communicate through counsel once matters are escalated",
      "Counsel responses frequently reference Board authorization"
    ]
  },
  {
    name: "Mountain West Insurance & Financial Services, LLC",
    role: "Insurance Broker",
    type: "insurance",
    email: "claims@mtnwst.com",
    phone: "970-945-9111"
  }
];
```

### Board Information

```typescript
export const BOARD_MEMBERS: BoardMember[] = [
  {
    name: "Mark Matz",
    position: "President",
    asOfDate: "November 2025"
  }
];

export const BOARD_AUTHORITY = {
  powers: [
    "Adopts and amends policies, procedures, and rules",
    "Authorizes collections, legal actions, and referrals",
    "Retains legal counsel",
    "Oversees property management"
  ],
  decisionMaking: [
    "May act via meetings or unanimous written consent",
    "Must record votes for collections referrals",
    "Must record votes for legal actions",
    "Must record votes for foreclosure authorization"
  ]
};
```

### Transparency Issues

```typescript
export const OBSERVED_ISSUES: TransparencyIssue[] = [
  {
    category: "Communications",
    observation: "Delayed or absent responses to owner emails"
  },
  {
    category: "Communications",
    observation: "Requirement to route requests through counsel"
  },
  {
    category: "Governance",
    observation: "Limited clarity on Board decisions and votes"
  },
  {
    category: "Health & Safety",
    observation: "Inconsistent follow-up on health/safety matters"
  },
  {
    category: "Records",
    observation: "Records access often delayed"
  },
  {
    category: "Records",
    observation: "Formal written requests frequently required"
  },
  {
    category: "Records",
    observation: "Board approval sometimes used as a gating mechanism"
  }
];
```

### Enforcement Escalation Path

```typescript
export const ENFORCEMENT_PATH = [
  { step: 1, entity: "Owner", description: "Receives notice or citation" },
  { step: 2, entity: "Bold Property Management", description: "Management issues warning" },
  { step: 3, entity: "Board of Directors", description: "Board reviews and decides action" },
  { step: 4, entity: "Alpenglow Law, LLC", description: "Legal counsel handles escalated matters" }
];
```

## Dependencies

- **Prerequisite:** Knowledge Base README complete (done)
- **External:** None
- **Epic Dependencies:**
  - Epic 1 (Navigation) - add new nav items
  - Epic 8 (AI) - integrate knowledge into AI context

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Information becomes stale | Medium | Medium | Add "last updated" dates, quarterly review |
| Board member changes | High | Low | Make easily updatable, note "as of" dates |
| Legal concerns about publishing counsel info | Low | Medium | Information is already public record |
| Perceived as adversarial | Medium | High | Neutral tone, fact-based only |

## Out of Scope (Future)

- Real-time board member tracking
- Automated change detection
- User-submitted issue reports
- Direct contact forms (legal concerns)

## Navigation Updates

Add to main navigation:
- **Contacts** - Key contacts page
- **Governance** - Board & governance info

Update More page to include:
- Link to Transparency section
- Link to Enforcement guide

## Reference

- Source: `docs/Westlake_Unofficial_HOA_Knowledge_Base_README.md`
- Related: `docs/HOA-DOCUMENT-ANALYSIS.md`
