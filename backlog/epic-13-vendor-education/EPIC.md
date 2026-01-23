# Epic 13: Vendor Education & Transparency Hub

## Overview

Create a dedicated vendor education section that provides comprehensive, transparent information about the three key service providers serving the Westlake HOA community: the property management company (Bold Solutions), legal counsel (Alpenglow Law, LLC), and the parking enforcement/booting company (Colorado Booting LLC). This empowers homeowners with detailed knowledge about who these vendors are, their services, track records, and how to interact with them effectively.

## Business Value

**Problem:** Homeowners often interact with HOA vendors without understanding:
- Who these companies are and their corporate backgrounds
- What services they provide vs. what falls outside their scope
- Their track records, reputations, and any regulatory concerns
- How to effectively communicate with each vendor
- Their rights when dealing with enforcement actions (especially booting)

**Solution:** Build a comprehensive `/vendors` section with individual profile pages for each major vendor, drawing from the detailed overview documents:
- `docs/BOLD-OVERVIEW.md` - Property Management Company
- `docs/ALPENGLOW-OVERVIEW.md` - HOA Legal Counsel
- `docs/COLORADO-BOOTING-OVERVIEW.md` - Booting/Parking Enforcement Company

**Impact:**
- Educate homeowners about who is managing their community
- Provide transparency about vendor qualifications and track records
- Help homeowners understand their rights (especially regarding booting)
- Reduce confusion about vendor responsibilities and limitations
- Enable informed interactions with service providers
- Surface important regulatory and consumer protection information

## Source Documents Summary

### Bold Solutions (Property Management)
- **Founded:** 1983, headquartered in Avon, CO
- **Services:** HOA Management, Private Home Care, Maintenance, Rental Management
- **Scale:** ~50 HOAs, 3,000+ homeowners, 4,000+ total clients
- **Leadership:** Christopher Tanis (President), Adam Savin (Partner)
- **Technology:** AppFolio portal, CondoCerts for documents
- **Reputation:** Multiple "Best of Vail Valley" awards
- **Contact:** (970) 949-6070, boldsolutions.net

### Alpenglow Law, LLC (Legal Counsel)
- **Founded:** December 2017, headquartered in Avon, CO
- **Partners:** Daniel D. Reynolds (Transactional), T.J. Voboril (Litigation/Mediation)
- **Specialties:** Real Estate, Business Law, HOA Law, Civil Litigation, Mediation
- **Approach:** "Trailhead to Summit" dispute resolution methodology
- **Recognition:** Super Lawyers, Pro Bono Award recipients
- **Contact:** (970) 306-6456, alpenglowlaw.com

### Colorado Booting LLC (Parking Enforcement)
- **Founded:** May 2017, headquartered in Avon, CO
- **Services:** Vehicle immobilization, towing, parking enforcement
- **Scale:** 90+ properties across Vail Valley, Summit County, Roaring Fork Valley
- **BBB Rating:** F (lowest possible) - 13 unanswered complaints
- **Regulatory:** Colorado PUC regulated, subject to HB25-1117 consumer protections
- **Key Regulations:**
  - Max boot removal fee: $160
  - Max initial payment for release: $60 (under 2025 law)
  - Release time: 90 minutes (business hours), 120 minutes (after hours)
  - 24-hour written notice required before booting (with exceptions)
- **Contact:** (970) 306-8687, parkingcode.com
- **Complaints:** Colorado PUC (303) 894-2070 or (800) 456-0858

## User Stories

| ID | Story | Points | Priority | Dependencies |
|----|-------|--------|----------|--------------|
| 13.1 | Create Vendor Data Model & Types | 3 | Critical | None |
| 13.2 | Build Vendors Hub Page Layout | 5 | Critical | 13.1 |
| 13.3 | Property Management Vendor Profile | 5 | High | 13.1, 13.2 |
| 13.4 | Legal Counsel Vendor Profile | 5 | High | 13.1, 13.2 |
| 13.5 | Booting Company Vendor Profile (with Rights Guide) | 8 | High | 13.1, 13.2 |
| 13.6 | Navigation, AI Integration & Cross-linking | 3 | Medium | 13.2-13.5 |

**Total Points:** 29

## Phase Breakdown

### Phase 13A: Foundation (Stories 13.1, 13.2)
**Goal:** Establish data structure and main vendors page
- Define TypeScript interfaces for vendor profiles
- Create `/vendors` hub page with cards linking to each vendor
- Design consistent vendor profile layout template

### Phase 13B: Vendor Profiles (Stories 13.3, 13.4, 13.5)
**Goal:** Build individual vendor detail pages
- Property Management profile with services, leadership, technology
- Legal Counsel profile with practice areas, methodology, team
- Booting Company profile with **enhanced consumer rights section**

### Phase 13C: Integration (Story 13.6)
**Goal:** Complete integration into site
- Add to main navigation
- Update AI assistant context with vendor information
- Cross-link from contacts page and other relevant areas

## Technical Implementation Details

### 13.1 Vendor Data Model

```typescript
// src/lib/data/vendors.ts

interface VendorLeader {
  name: string;
  title: string;
  background?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
}

interface VendorService {
  name: string;
  description: string;
  details?: string[];
}

interface VendorRating {
  source: string;
  rating: string;
  details?: string;
  url?: string;
}

interface ConsumerRight {
  title: string;
  description: string;
  legalBasis?: string;
}

interface VendorProfile {
  id: string;
  name: string;
  legalName?: string;
  type: "property-management" | "legal" | "enforcement";
  tagline: string;
  founded: string;
  headquarters: string;

  // Overview
  description: string;
  missionStatement?: string;

  // Services
  services: VendorService[];

  // Contact
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
    portalUrl?: string;
  };

  // Leadership
  leadership?: VendorLeader[];

  // Technology
  technology?: {
    platforms: string[];
    features: string[];
  };

  // Reputation
  ratings?: VendorRating[];
  awards?: string[];

  // Regulatory (for enforcement vendors)
  regulatory?: {
    governingBody: string;
    requirements: string[];
    consumerRights: ConsumerRight[];
    complaintProcess?: string;
  };

  // Source document
  sourceDocument: string;
}
```

### 13.2 Vendors Hub Page Layout

```
/vendors (Hub Page)
├── /vendors/bold-solutions (Property Management)
├── /vendors/alpenglow-law (Legal Counsel)
└── /vendors/colorado-booting (Booting Company)
```

**Hub Page Wireframe:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Know Your Vendors                                               │
│ Understanding the service providers who work with your HOA      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ These companies provide services to Westlake HOA. Learn about   │
│ their backgrounds, services, and how to work with them.         │
│                                                                  │
│ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐│
│ │ 🏢 PROPERTY MGMT  │ │ ⚖️ LEGAL COUNSEL  │ │ 🚗 PARKING        ││
│ │                   │ │                   │ │   ENFORCEMENT     ││
│ │ Bold Solutions    │ │ Alpenglow Law     │ │ Colorado Booting  ││
│ │                   │ │                   │ │                   ││
│ │ Day-to-day HOA    │ │ Association       │ │ Vehicle           ││
│ │ operations and    │ │ legal counsel     │ │ immobilization    ││
│ │ property care     │ │ for governance    │ │ enforcement       ││
│ │                   │ │ and disputes      │ │                   ││
│ │ Since 1983        │ │ Since 2017        │ │ Since 2017        ││
│ │ Best of Vail      │ │ Super Lawyers     │ │ ⚠️ BBB: F Rating  ││
│ │                   │ │                   │ │                   ││
│ │ [Learn More →]    │ │ [Learn More →]    │ │ [Learn More →]    ││
│ └───────────────────┘ └───────────────────┘ └───────────────────┘│
│                                                                  │
│ ─────────────────────────────────────────────────────────────── │
│ ⚠️ Disclaimer: Information compiled from official documents and │
│ public records for educational purposes.                         │
└─────────────────────────────────────────────────────────────────┘
```

### 13.5 Booting Company Profile - Special Sections

The booting company profile requires additional consumer protection content:

**Your Rights When Booted:**
```
┌─────────────────────────────────────────────────────────────────┐
│ 🛡️ Your Rights Under Colorado Law                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ ✓ Maximum Fee: $160 for standard boot removal                   │
│ ✓ Payment Option: Can pay $60 max to get boot released          │
│ ✓ Release Time: 90 min (business hrs) / 120 min (after hours)   │
│ ✓ Written Notice: 24-hour notice required before booting        │
│ ✓ No Occupied Vehicles: Cannot boot while you're in the car     │
│ ✓ No Expired Registration Booting: Cannot boot solely for this  │
│ ✓ Signage Required: 1 sq ft minimum at each lot entrance        │
│                                                                  │
│ ⚠️ If You Believe You Were Wrongfully Booted:                   │
│                                                                  │
│ 1. Document everything (photos, time, location, signage)        │
│ 2. Note if you had valid parking permission                     │
│ 3. File complaint with Colorado PUC:                            │
│    - Phone: (303) 894-2070 (option #2) or (800) 456-0858        │
│ 4. Contact Avon Police (Sgt. Matt Jamison) for local issues     │
│                                                                  │
│ Note: Company's terms state all payments are non-refundable     │
│ and disputes require binding arbitration.                       │
└─────────────────────────────────────────────────────────────────┘
```

## Success Metrics

| Metric | Target |
|--------|--------|
| Page load time | < 1.5s |
| Mobile responsiveness | 100% |
| Content completeness | All key facts from overview docs |
| Consumer rights visibility | Above fold on booting page |
| AI vendor queries | Accurate responses with citations |

## Dependencies

- Source documents in `/docs/` folder
- Existing contact page structure (for consistency)
- Institutional knowledge data model

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Vendor info becomes outdated | Medium | Medium | Add "last updated" dates, link to official sources |
| Legal concerns about BBB rating disclosure | Low | Medium | Only state publicly available facts with sources |
| Booting company objects to content | Low | High | Ensure all information is factual, sourced, and fair |
| Information overload for users | Medium | Low | Use expandable sections, highlight key facts |

## Testing Checklist

- [ ] All vendor cards display correctly on hub page
- [ ] Individual profile pages load with full content
- [ ] Consumer rights section prominent on booting page
- [ ] External links work and open in new tabs
- [ ] Phone/email links functional
- [ ] Mobile layout responsive
- [ ] Dark mode compatible
- [ ] AI assistant can answer vendor-related questions
- [ ] Navigation updated with Vendors link
- [ ] Disclaimer visible on all pages

## References

- `/docs/BOLD-OVERVIEW.md` - Property Management detailed profile
- `/docs/ALPENGLOW-OVERVIEW.md` - Legal Counsel detailed profile
- `/docs/COLORADO-BOOTING-OVERVIEW.md` - Booting Company detailed profile
- `/backlog/epic-12-contact-directory/EPIC.md` - Contact page pattern
- Colorado PUC Booting Regulations (4 CCR 723-6)
- Colorado HB25-1117 (2025 Consumer Protections)
