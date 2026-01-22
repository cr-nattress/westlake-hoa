# Epic 12: Comprehensive Contact Directory

## Overview

Create a dedicated contact directory page that consolidates ALL HOA-related contact information in one easily accessible location. This serves as the central hub for homeowners to quickly find the right contact for any HOA matter.

## Business Value

**Problem:** Contact information is scattered across multiple documents, making it difficult for homeowners to find who to contact for specific issues. The AI assistant often needs to look up contact details, and there's no single source of truth for residents.

**Solution:** Build a comprehensive `/contacts` page that displays all contact information organized by category, with clear explanations of when to use each contact.

**Impact:**
- Reduce time homeowners spend searching for contact information
- Decrease misdirected inquiries to wrong contacts
- Provide transparency about who manages what
- Support the AI assistant with accurate, up-to-date contact data
- Establish trust through accessible information

## Complete Contact Directory

### Property Management - Bold Property Management / Bold Solutions

| Type | Contact | Purpose |
|------|---------|---------|
| Email | clientservices@boldsolutions.net | General property management inquiries |
| Email | communications@boldpropertymanagement.mailer.appfolio.us | Automated notices (often no-reply) |
| Email | amy@boldsolutions.net | Staff member |
| Portal | https://boldpropertymanagement.appfolio.com/connect | Owner portal login |
| Address | PO Box 5800, Avon, CO 81620 | Mailing address |

**Responsibilities:**
- Day-to-day property management
- Owner communications
- Vendor coordination
- Financial administration
- Record custodian (non-legal)
- Pest control coordination
- Maintenance scheduling
- Access requests
- Enforcement communications

### Insurance Broker - Mountain West Insurance & Financial Services, LLC

| Type | Contact | Purpose |
|------|---------|---------|
| Phone | (800) 390-0559 | Toll-free main line |
| Phone | (800) 255-6390 | Toll-free service team |
| Phone | (970) 945-9111 | Main office (Avon, CO) |
| Phone | (970) 384-8239 | Meghan Wilson direct line |
| Fax | (970) 945-2350 | Main fax |
| Fax | (970) 824-8188 | D&O Liability fax |
| Email | claims@mtnwst.com | Claims reporting |
| Email | assncert@mtnwst.com | Certificate requests |
| Email | meghanw@mtnwst.com | Meghan Wilson, CIC (Producer) |
| Email | bradyc@mtnwst.com | Brady Cox |

**Key Contacts:**
- Meghan Wilson, CIC - Producer / Commercial Lines Agent
- Joseph Stewart, CIC - Commercial Account Executive
- Brady Cox - Commercial Account Manager
- Patricia Trinidad - Commercial Account Manager
- Dustin Brown - Claims Advocate

### Legal Counsel - Alpenglow Law, LLC

| Type | Contact | Purpose |
|------|---------|---------|
| Phone | (970) 306-6456 | Main office |
| Email | tj@alpenglowlaw.com | T.J. Voboril, Esq. |

**Key Contact:**
- T.J. Voboril, Esq. - Association General Counsel

**Note:** Legal counsel handles escalated matters, collections, governance compliance, and formal legal correspondence. Homeowners are often instructed to communicate through counsel once matters are escalated.

### HOA Board of Directors

| Type | Contact | Purpose |
|------|---------|---------|
| Email | WLVAVON@gmail.com | HOA Board email |
| Email | mrmatz13@gmail.com | Mark Matz, President |

**Current Board (as of November 2025):**
- Mark Matz - President

### HOA Mailing Addresses

**Primary (Current):**
```
Benchmark Condominium Homeowners Association
c/o Bold Property Management
PO Box 5800
Avon, CO 81620
```

**Historical (Former Management):**
```
c/o Spaeth and Company, Inc.
PO Box 3717
Eagle, CO 81631
```

## User Stories

| ID | Story | Points | Priority | Dependencies |
|----|-------|--------|----------|--------------|
| 12.1 | Create Contact Page Layout & Route | 5 | Critical | None |
| 12.2 | Build Contact Card Components | 3 | High | None |
| 12.3 | Update Institutional Knowledge Data | 3 | High | None |
| 12.4 | Add Contact Search & Filtering | 3 | Medium | 12.1, 12.2 |
| 12.5 | Add "When to Contact" Guide | 2 | Medium | 12.1 |
| 12.6 | Add Navigation & Mobile Optimization | 2 | High | 12.1 |
| 12.7 | Integrate with AI Assistant | 2 | Low | 12.3 |

**Total Points:** 20

## Phase Breakdown

### Phase 12A: Core Implementation (Stories 12.1, 12.2, 12.3)
**Goal:** Create functional contact directory page
- Set up `/contacts` route
- Build reusable contact card components
- Update institutional knowledge with all discovered contacts

### Phase 12B: Enhanced Features (Stories 12.4, 12.5)
**Goal:** Improve usability
- Add search/filter functionality
- Add "When to Contact" decision guide

### Phase 12C: Polish & Integration (Stories 12.6, 12.7)
**Goal:** Complete integration
- Add to main navigation
- Optimize for mobile
- Ensure AI assistant uses updated contact data

## Technical Implementation Details

### 12.1 Create Contact Page Layout

```
src/app/contacts/page.tsx
```

**Page Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Contact Directory                                                │
│ Find the right contact for your HOA needs                        │
├─────────────────────────────────────────────────────────────────┤
│ [Search contacts...] [Filter: All ▼]                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ PROPERTY MANAGEMENT                                              │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Bold Property Management / Bold Solutions                   │  │
│ │ Day-to-day property management company                      │  │
│ │                                                             │  │
│ │ 📧 Emails:                                                  │  │
│ │    clientservices@boldsolutions.net (General inquiries)     │  │
│ │    communications@...appfolio.us (Automated notices)        │  │
│ │                                                             │  │
│ │ 🌐 Portal: boldpropertymanagement.appfolio.com/connect      │  │
│ │                                                             │  │
│ │ 📍 PO Box 5800, Avon, CO 81620                              │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│ INSURANCE                                                        │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Mountain West Insurance & Financial Services, LLC           │  │
│ │ HOA Insurance Broker                                        │  │
│ │                                                             │  │
│ │ 📞 Phones:                                                  │  │
│ │    (800) 390-0559 (Toll-free)                               │  │
│ │    (970) 945-9111 (Main office)                             │  │
│ │    (970) 384-8239 (Meghan Wilson direct)                    │  │
│ │                                                             │  │
│ │ 📧 Emails:                                                  │  │
│ │    claims@mtnwst.com (Claims reporting)                     │  │
│ │    assncert@mtnwst.com (Certificate requests)               │  │
│ │                                                             │  │
│ │ 👤 Key Contacts:                                            │  │
│ │    Meghan Wilson, CIC - Producer                            │  │
│ │    Brady Cox - Account Manager                              │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│ LEGAL COUNSEL                                                    │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Alpenglow Law, LLC                                          │  │
│ │ HOA General Counsel                                         │  │
│ │                                                             │  │
│ │ 📞 (970) 306-6456                                           │  │
│ │ 📧 tj@alpenglowlaw.com                                      │  │
│ │                                                             │  │
│ │ 👤 T.J. Voboril, Esq. - Association Counsel                 │  │
│ │                                                             │  │
│ │ ⚠️ Note: For escalated matters only                         │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│ HOA BOARD                                                        │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Board of Directors                                          │  │
│ │                                                             │  │
│ │ 📧 WLVAVON@gmail.com (Board email)                          │  │
│ │                                                             │  │
│ │ 👤 Mark Matz - President (as of Nov 2025)                   │  │
│ │    mrmatz13@gmail.com                                       │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│ ─────────────────────────────────────────────────────────────── │
│ ⚠️ Disclaimer: This is an unofficial website. Contact info      │
│ compiled from official HOA documents.                            │
│ Last updated: January 2026                                       │
└─────────────────────────────────────────────────────────────────┘
```

### 12.2 Contact Card Component

```typescript
// src/components/contact-card.tsx
interface ContactPerson {
  name: string;
  title: string;
  email?: string;
  phone?: string;
}

interface ContactCardProps {
  name: string;
  role: string;
  type: "management" | "insurance" | "legal" | "board";
  emails?: { address: string; purpose: string }[];
  phones?: { number: string; purpose: string }[];
  faxes?: { number: string; purpose: string }[];
  address?: Address;
  website?: { url: string; label: string };
  contacts?: ContactPerson[];
  notes?: string[];
}
```

### 12.3 Updated Institutional Knowledge

Add comprehensive contact data to `src/lib/data/institutional-knowledge.ts`:

```typescript
export const INSURANCE_BROKER_FULL: ContactEntityFull = {
  name: "Mountain West Insurance & Financial Services, LLC",
  role: "Insurance Broker",
  type: "insurance",
  phones: [
    { number: "(800) 390-0559", purpose: "Toll-free main line" },
    { number: "(800) 255-6390", purpose: "Toll-free service team" },
    { number: "(970) 945-9111", purpose: "Main office" },
    { number: "(970) 384-8239", purpose: "Meghan Wilson direct" },
  ],
  faxes: [
    { number: "(970) 945-2350", purpose: "Main fax" },
    { number: "(970) 824-8188", purpose: "D&O Liability" },
  ],
  emails: [
    { address: "claims@mtnwst.com", purpose: "Claims reporting" },
    { address: "assncert@mtnwst.com", purpose: "Certificate requests" },
    { address: "meghanw@mtnwst.com", purpose: "Meghan Wilson" },
    { address: "bradyc@mtnwst.com", purpose: "Brady Cox" },
  ],
  keyContacts: [
    { name: "Meghan Wilson, CIC", title: "Producer / Commercial Lines Agent" },
    { name: "Joseph Stewart, CIC", title: "Commercial Account Executive" },
    { name: "Brady Cox", title: "Commercial Account Manager" },
    { name: "Patricia Trinidad", title: "Commercial Account Manager" },
    { name: "Dustin Brown", title: "Claims Advocate" },
  ],
};
```

## Success Metrics

| Metric | Target |
|--------|--------|
| Page load time | < 1s |
| Mobile responsiveness | 100% |
| Contact completeness | All discovered contacts included |
| User feedback | Positive |

## Dependencies

- None (standalone feature)

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Contact info becomes outdated | Medium | Medium | Add "last updated" date, encourage user feedback |
| Privacy concerns with personal emails | Low | Medium | Only display publicly documented contacts |

## Testing Checklist

- [ ] All contact categories display correctly
- [ ] Email links work (mailto:)
- [ ] Phone links work (tel:)
- [ ] External links open in new tab
- [ ] Mobile layout responsive
- [ ] Dark mode compatible
- [ ] Search/filter works correctly
- [ ] Disclaimer visible
- [ ] Navigation updated

## References

- `/docs/contact-info.md` - Original contact compilation
- `/docs/hoa-docs/readme/24-25 Property Manager Reference Sheet.md` - Insurance contacts
- `/docs/hoa-docs/readme/25-26 Property Manager Reference Sheet.md` - Updated insurance contacts
- `/src/lib/data/institutional-knowledge.ts` - Current data structure
