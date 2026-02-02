# Multi-Tenant HOA Platform Plan

> Transform Westlake HOA Hub into a white-label SaaS platform for any homeowner association.

## Executive Summary

The Westlake HOA Hub has unique differentiators that existing HOA platforms don't offer:

1. **AI-Powered Document Q&A** - Ask questions in plain English, get cited answers
2. **Transparency-First** - Designed for homeowner access, not management control
3. **Modern Tech Stack** - Next.js 15, Supabase, Tailwind v4
4. **Mobile-First** - Designed for phone access from the ground up

**Market opportunity:** $58-77/month average for basic HOA software. AI-powered transparency tools are a gap in the market.

---

## Product Vision

### Name Ideas

- **HOA Hub** (generic)
- **ClearHOA** (transparency focus)
- **CommunityDocs** (document focus)
- **BoardView** (governance focus)
- **NeighborKnow** (friendly)

### Core Value Proposition

> "Give homeowners instant access to their HOA's rules, policies, and decisions through AI-powered document search—no more digging through PDFs."

### Target Customers

| Segment | Size | Pain Points | Willingness to Pay |
|---------|------|-------------|-------------------|
| **Self-managed HOAs** | < 50 units | No website, PDFs via email | $29-49/mo |
| **Small managed HOAs** | 50-200 units | Basic portal, poor search | $49-99/mo |
| **Large HOAs/Condos** | 200+ units | Complex docs, many questions | $99-299/mo |
| **Management Companies** | Multiple HOAs | Need multi-community dashboard | Custom |

---

## Current Architecture Analysis

### What Exists Today

```
westlake-hoa/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # UI components (shadcn/ui)
│   └── lib/
│       ├── ai/           # AI/RAG logic
│       ├── data/         # Hardcoded content (!)
│       ├── supabase/     # Database client
│       └── constants.ts  # Site config (!)
├── supabase/
│   └── migrations/       # Database schema
└── public/
    └── docs/             # PDF documents (!)
```

### Hardcoded / Single-Tenant Items

| Item | Location | Change Needed |
|------|----------|---------------|
| Site name | `lib/constants.ts` | Move to tenant config |
| HOA-specific text | Various pages | Template with variables |
| Contact directory | `lib/data/contact-directory.ts` | Move to database |
| Vendor list | `lib/data/vendors/` | Move to database |
| Documents | `public/docs/` | Move to Supabase Storage |
| Institutional knowledge | `lib/data/institutional-knowledge.ts` | Move to database |
| FAQ content | `lib/data/topic-index.ts` | Move to database |
| Meeting data | `lib/data/meetings.ts` | Move to database |

### Database Schema (Current)

```
westlake schema:
├── documents           # HOA documents with metadata
├── document_versions   # Version history
├── document_embeddings # Vector embeddings for RAG
├── tags               # Document categorization
├── meetings           # Meeting records
└── decisions          # Board decisions
```

**Key Issue:** No tenant isolation. Everything is in the `westlake` schema.

---

## Multi-Tenant Architecture

### Option A: Schema-Per-Tenant (Recommended for <100 tenants)

Each HOA gets its own PostgreSQL schema:

```
public schema:
├── tenants              # Tenant registry
├── subscriptions        # Billing info
├── users                # All users (linked to tenants)
└── tenant_domains       # Custom domain mappings

hoa_westlake schema:     # Tenant 1
├── documents
├── document_embeddings
├── meetings
├── contacts
├── vendors
└── settings

hoa_mountain_view schema: # Tenant 2
├── documents
├── document_embeddings
├── meetings
├── contacts
├── vendors
└── settings
```

**Pros:**
- Complete data isolation
- Easy to backup/restore per tenant
- Simple RLS policies
- Can offer data export per tenant

**Cons:**
- Schema proliferation at scale
- More complex migrations

### Option B: Row-Level Multi-Tenancy

All tenants share tables with `tenant_id` column:

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  title TEXT NOT NULL,
  -- ... other fields
);

-- RLS policy
CREATE POLICY tenant_isolation ON documents
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

**Pros:**
- Simpler schema management
- Better for 100+ tenants
- Easier cross-tenant analytics

**Cons:**
- Requires careful RLS
- Harder to isolate/export single tenant

### Recommended: Hybrid Approach

- **Schema-per-tenant** for document storage and embeddings (data isolation)
- **Shared tables** for tenant metadata, users, billing (easier management)

---

## Database Schema Changes

### New Shared Tables

```sql
-- Tenant registry
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,           -- URL slug: "westlake-hoa"
  name TEXT NOT NULL,                  -- "Westlake Village HOA"
  legal_name TEXT,                     -- Full legal name
  state TEXT,                          -- "CO"
  timezone TEXT DEFAULT 'America/Denver',
  logo_url TEXT,
  primary_color TEXT DEFAULT '#2563eb', -- Brand color
  created_at TIMESTAMPTZ DEFAULT NOW(),
  settings JSONB DEFAULT '{}'          -- Flexible settings
);

-- Custom domains
CREATE TABLE public.tenant_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  domain TEXT UNIQUE NOT NULL,         -- "westlake-hoa.com"
  verified BOOLEAN DEFAULT FALSE,
  ssl_provisioned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (all tenants)
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'member',          -- member, board, admin
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User-tenant membership
CREATE TABLE public.user_tenants (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',          -- Role within this tenant
  PRIMARY KEY (user_id, tenant_id)
);

-- Subscriptions (Stripe integration)
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE UNIQUE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT DEFAULT 'starter',         -- starter, pro, enterprise
  status TEXT DEFAULT 'trialing',      -- trialing, active, past_due, canceled
  trial_ends_at TIMESTAMPTZ,
  current_period_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tenant-Scoped Tables (Per-Schema)

```sql
-- Create schema for new tenant
CREATE SCHEMA IF NOT EXISTS hoa_{tenant_slug};

-- Contacts (was hardcoded)
CREATE TABLE hoa_{tenant_slug}.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,                           -- "Board President"
  email TEXT,
  phone TEXT,
  category TEXT,                       -- "board", "management", "vendor"
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendors
CREATE TABLE hoa_{tenant_slug}.vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,                       -- "landscaping", "maintenance"
  description TEXT,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  notes TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ / Knowledge Base
CREATE TABLE hoa_{tenant_slug}.knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  tags TEXT[],
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Announcements
CREATE TABLE hoa_{tenant_slug}.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT DEFAULT 'normal',      -- low, normal, high, urgent
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings (extends tenant settings)
CREATE TABLE hoa_{tenant_slug}.settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Application Changes

### 1. Tenant Resolution Middleware

```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const supabase = createClient(request);
  
  // Resolve tenant from hostname
  let tenant = null;
  
  // Check custom domain first
  const { data: domainTenant } = await supabase
    .from('tenant_domains')
    .select('tenant_id, tenants(*)')
    .eq('domain', hostname)
    .single();
  
  if (domainTenant) {
    tenant = domainTenant.tenants;
  } else {
    // Check subdomain: westlake.hoahub.com
    const subdomain = hostname.split('.')[0];
    const { data: subdomainTenant } = await supabase
      .from('tenants')
      .select('*')
      .eq('slug', subdomain)
      .single();
    
    tenant = subdomainTenant;
  }
  
  if (!tenant) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }
  
  // Inject tenant into request headers for downstream use
  const response = NextResponse.next();
  response.headers.set('x-tenant-id', tenant.id);
  response.headers.set('x-tenant-slug', tenant.slug);
  response.headers.set('x-tenant-schema', `hoa_${tenant.slug}`);
  
  return response;
}
```

### 2. Tenant Context Provider

```typescript
// src/lib/tenant-context.tsx
'use client';

import { createContext, useContext } from 'react';

interface Tenant {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  primaryColor: string;
  settings: Record<string, unknown>;
}

const TenantContext = createContext<Tenant | null>(null);

export function TenantProvider({ 
  tenant, 
  children 
}: { 
  tenant: Tenant; 
  children: React.ReactNode 
}) {
  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const tenant = useContext(TenantContext);
  if (!tenant) throw new Error('useTenant must be used within TenantProvider');
  return tenant;
}
```

### 3. Dynamic Supabase Client

```typescript
// src/lib/supabase/tenant-client.ts
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

export async function createTenantClient() {
  const headersList = headers();
  const tenantSchema = headersList.get('x-tenant-schema') || 'westlake';
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      db: { schema: tenantSchema }
    }
  );
  
  return supabase;
}
```

### 4. Template All Content

Replace hardcoded text with tenant-aware components:

```typescript
// Before (hardcoded)
<h1>Westlake Village HOA</h1>
<p>Located in Avon, Colorado</p>

// After (tenant-aware)
export function SiteHeader() {
  const tenant = useTenant();
  return (
    <>
      <h1>{tenant.name}</h1>
      {tenant.settings.tagline && <p>{tenant.settings.tagline}</p>}
    </>
  );
}
```

### 5. Move Static Data to Database

| Current Location | New Location | Migration Path |
|-----------------|--------------|----------------|
| `lib/data/contact-directory.ts` | `{schema}.contacts` | Export → Import |
| `lib/data/vendors/` | `{schema}.vendors` | Export → Import |
| `lib/data/meetings.ts` | `{schema}.meetings` | Already in DB |
| `lib/data/topic-index.ts` | `{schema}.knowledge_base` | Export → Import |
| `public/docs/*.pdf` | Supabase Storage | Upload script |

---

## Feature Comparison by Plan

### Pricing Tiers

| Feature | Starter ($29/mo) | Pro ($79/mo) | Enterprise ($199/mo) |
|---------|------------------|--------------|---------------------|
| Document Library | ✅ 50 docs | ✅ 200 docs | ✅ Unlimited |
| AI Q&A | ✅ 100 queries/mo | ✅ 500 queries/mo | ✅ Unlimited |
| Custom Domain | ❌ | ✅ | ✅ |
| Custom Branding | Logo only | Full theme | White-label |
| Users | 50 | 200 | Unlimited |
| Storage | 1 GB | 5 GB | 25 GB |
| Meeting Archive | 1 year | 3 years | Unlimited |
| Priority Support | ❌ | Email | Phone + Slack |
| SSO | ❌ | ❌ | ✅ |
| API Access | ❌ | ❌ | ✅ |

### Add-Ons

| Add-On | Price | Description |
|--------|-------|-------------|
| Extra Storage | $5/GB/mo | Additional document storage |
| Additional AI Queries | $0.10/query | Beyond plan limit |
| Document Import Service | $199 one-time | We upload your documents |
| Custom Onboarding | $499 one-time | Video call setup + training |

---

## Implementation Phases

### Phase 1: Foundation (2-3 weeks)

- [ ] Create tenant and subscription tables
- [ ] Build tenant resolution middleware
- [ ] Create tenant context provider
- [ ] Update Supabase client for dynamic schemas
- [ ] Build admin dashboard for tenant management
- [ ] Create tenant provisioning script

**Deliverable:** Can create new tenant and access at subdomain

### Phase 2: Data Migration (1-2 weeks)

- [ ] Move contacts to database
- [ ] Move vendors to database
- [ ] Move FAQ/knowledge base to database
- [ ] Move documents to Supabase Storage
- [ ] Create data import scripts
- [ ] Build admin UI for managing content

**Deliverable:** No more hardcoded content

### Phase 3: Customization (1-2 weeks)

- [ ] Tenant settings UI (logo, colors, tagline)
- [ ] Custom domain support with SSL
- [ ] Editable navigation items
- [ ] Custom footer content
- [ ] Announcement management

**Deliverable:** Full white-label capability

### Phase 4: Billing (1-2 weeks)

- [ ] Stripe integration
- [ ] Plan enforcement (query limits, storage)
- [ ] Usage tracking
- [ ] Billing portal
- [ ] Trial management

**Deliverable:** Revenue-ready

### Phase 5: Onboarding (1 week)

- [ ] Self-service signup flow
- [ ] Document upload wizard
- [ ] Setup checklist
- [ ] Welcome email sequence
- [ ] In-app tutorials

**Deliverable:** Self-service signups

### Phase 6: Polish (Ongoing)

- [ ] Admin analytics dashboard
- [ ] Usage reports for tenants
- [ ] Audit logging
- [ ] Backup/export tools
- [ ] API for integrations

---

## Technical Decisions

### Hosting

| Option | Pros | Cons | Cost |
|--------|------|------|------|
| **Vercel** | Easy, edge functions | Custom domains cost | $20/mo base |
| **Netlify** | Current setup, good DX | Limited edge | $19/mo base |
| **Fly.io** | Full control, global | More ops work | $5-20/mo |
| **Railway** | Simple, Postgres included | Less edge presence | $5-20/mo |

**Recommendation:** Stay on Netlify, add Cloudflare for custom domains.

### Custom Domains

```
Approach: Cloudflare for SaaS
1. Customer adds CNAME: docs.their-hoa.com → proxy.hoahub.com
2. Cloudflare provisions SSL automatically
3. Middleware resolves tenant from hostname
```

### AI/RAG Costs

| Model | Cost/1K tokens | Est. per Query | Notes |
|-------|---------------|----------------|-------|
| Claude Haiku | $0.25 in / $1.25 out | ~$0.01 | Fast, cheap |
| Claude Sonnet | $3 in / $15 out | ~$0.05 | Current, best quality |
| GPT-4o-mini | $0.15 in / $0.60 out | ~$0.008 | Cheapest |

**Recommendation:** Haiku for most queries, Sonnet for complex ones.

---

## Revenue Projections

### Conservative Scenario (Year 1)

| Month | Tenants | MRR | Notes |
|-------|---------|-----|-------|
| 1-3 | 5 | $395 | Friends/network |
| 4-6 | 15 | $1,185 | Content marketing |
| 7-9 | 30 | $2,370 | Word of mouth |
| 10-12 | 50 | $3,950 | SEO kicking in |

**Year 1 Total:** ~$20,000 ARR

### Costs (Monthly)

| Item | Cost |
|------|------|
| Supabase Pro | $25 |
| Netlify | $19 |
| Anthropic API | $50-200 (usage) |
| Stripe fees | ~3% of revenue |
| Domain/SSL | Included in Cloudflare |
| **Total** | ~$100-250/mo |

**Break-even:** 3-5 paying tenants

---

## Competitive Advantages

| Feature | HOA Hub | HOA Express | PayHOA | Buildium |
|---------|---------|-------------|--------|----------|
| AI Document Q&A | ✅ | ❌ | ❌ | ❌ |
| Transparency Focus | ✅ | ❌ | ❌ | ❌ |
| No Management Lock-in | ✅ | ❌ | ❌ | ❌ |
| Modern UI/UX | ✅ | ⚠️ | ⚠️ | ⚠️ |
| Mobile-First | ✅ | ⚠️ | ✅ | ⚠️ |
| Free Tier | ✅ (trial) | ❌ | ❌ | ❌ |
| Accounting | ❌ | ❌ | ✅ | ✅ |
| Payment Collection | ❌ | ❌ | ✅ | ✅ |

**Key Insight:** We're not competing with full management software. We're the **transparency layer** that works alongside existing systems.

---

## Marketing Strategy

### Positioning

> "The AI-powered transparency portal for HOAs that want informed homeowners."

### Channels

1. **SEO** - "HOA document search", "understand HOA rules"
2. **Content Marketing** - "How to request HOA records in [State]"
3. **HOA Board Forums** - Reddit, Facebook groups
4. **Management Company Partnerships** - White-label offering
5. **State HOA Associations** - Sponsor/present at conferences

### Landing Page Messaging

```
Headline: "Your HOA documents, answered instantly"
Subhead: "Upload your bylaws and rules. Let AI help homeowners find answers without calling the Board."

CTA: "Start Free Trial"
```

---

## Next Steps

1. **Validate demand** - Post in HOA forums, talk to 10 HOA boards
2. **Build MVP multi-tenant** - Phase 1 implementation
3. **Onboard 3 beta HOAs** - Free in exchange for feedback
4. **Launch publicly** - With case studies
5. **Iterate on pricing** - Based on usage patterns

---

## Files to Create

```
westlake-hoa/
├── docs/
│   └── MULTI_TENANT_PLAN.md      # This document
├── supabase/
│   └── migrations/
│       └── 00002_multi_tenant.sql # New schema
└── src/
    └── lib/
        ├── tenant-context.tsx     # Tenant provider
        └── supabase/
            └── tenant-client.ts   # Dynamic schema client
```

---

*Created: 2026-02-01*
*Author: OpenClaw Assistant*
