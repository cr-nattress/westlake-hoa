# Westlake Avon Hub

An unofficial, AI-powered information portal for the Westlake Village Condominium Association in Avon, Colorado.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [SaaS Opportunity](#saas-opportunity)
- [Competitive Landscape](#competitive-landscape)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Multi-Tenant Roadmap](#multi-tenant-roadmap)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)
- [License](#license)

---

## About

**Westlake Avon Hub** is a homeowner-run website providing clear, lawful, and neutral access to HOA documents, meetings, and processes. The site features an **AI-first interface** that helps homeowners and tenants understand complex governance information without replacing legal counsel or official HOA channels.

### Core Principles

- **Unofficial + Neutral** - Not affiliated with the HOA, Board, management, or counsel
- **Document-First** - Every claim traces back to source documents
- **Informational Only** - Explains policies without giving legal advice
- **Privacy & Safety** - No personal financial, medical, or private information

### Who Is This For?

| User Type | Access Level |
|-----------|--------------|
| Homeowners | Full access to documents, AI assistant, and guides |
| Tenants | Read-only access to rules and procedures |
| Prospective Owners | Research community governance and policies |

---

## Features

- **AI Document Assistant** - Ask questions in plain English and get cited answers from official HOA documents
- **Document Library** - Browse declarations, bylaws, rules, policies, and meeting minutes with full-text search
- **AI-Generated Summaries** - Plain-English explanations of complex legal documents
- **Insurance Guide** - Understand HOA coverage vs. owner responsibilities
- **Records Request Portal** - Templates and guidance for requesting HOA records under CCIOA
- **Meeting Archive** - Agendas, minutes, and decision logs from Board meetings
- **Mobile-First Design** - Optimized for phone access with bottom navigation
- **Dark Mode** - Comfortable viewing in any lighting condition
- **WCAG 2.1 AA Accessible** - Designed for all abilities

---

## SaaS Opportunity

This project can be transformed into a **white-label multi-tenant SaaS platform** for any HOA. See [MULTI_TENANT_PLAN.md](docs/MULTI_TENANT_PLAN.md) for the full plan.

### Unique Value Proposition

> **"The only HOA portal where homeowners can ask questions in plain English and get cited answers from their governing documents."**

### Market Gap

**No competitor offers AI-powered document Q&A with citations.** This is our unique differentiator.

### Target Market

| Segment | Size | Pain Points | Price Point |
|---------|------|-------------|-------------|
| Self-managed HOAs | < 50 units | No website, PDFs via email | $29/mo |
| Small managed HOAs | 50-200 units | Basic portal, poor search | $79/mo |
| Large HOAs/Condos | 200+ units | Complex docs, many questions | $199/mo |

### Revenue Projections

- **Break-even:** 3-5 paying tenants (~$100-250/mo costs)
- **Year 1 conservative:** ~$20K ARR (50 tenants)

### Multi-Tenant Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    HOA Hub Platform                              │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
          ┌───────────────────────┼───────────────────────────────┐
          ▼                       ▼                               ▼
   ┌─────────────┐        ┌─────────────┐                 ┌─────────────┐
   │  Westlake   │        │ Mountain    │                 │   Other     │
   │    HOA      │        │  View HOA   │                 │    HOAs     │
   │  (tenant)   │        │  (tenant)   │                 │ (tenants)   │
   └─────────────┘        └─────────────┘                 └─────────────┘
```

**Key changes needed:**
- Schema-per-tenant database isolation
- Tenant resolution middleware (subdomain/custom domain)
- Move hardcoded content to database
- Stripe billing integration

---

## Competitive Landscape

See [COMPETITIVE_ANALYSIS.md](docs/COMPETITIVE_ANALYSIS.md) for the full deep dive on 12+ competitors.

### Market Overview

| Tier | Competitors | Focus | AI Features |
|------|-------------|-------|-------------|
| **Website Builders** | HOA Express, RunHOA, HOA Start, Gladly | Basic docs/website | ❌ None |
| **Full Management** | PayHOA, Buildium, AppFolio, Vinteum | Accounting/payments | ❌ None |
| **AI Solutions** | HOAi, Stan AI | Management automation | ⚠️ Not document Q&A |

### Pricing Landscape

| Product | Price | AI Q&A |
|---------|-------|--------|
| Gladly | **FREE** | ❌ |
| HOA Express | $21/mo | ❌ |
| RunHOA | $399/yr | ❌ |
| HOA Start | $39+/mo | ❌ |
| PayHOA | $54+/mo | ❌ |
| Buildium | $160+/mo | ❌ |
| **Our Product** | $29-79/mo | ✅ **With citations** |

### Key Competitors

#### Website Builders (Direct Competition)

| Competitor | Price | Strengths | Weaknesses |
|------------|-------|-----------|------------|
| **HOA Express** | $21/mo | Easy setup, affordable | No AI, basic search |
| **RunHOA** | $399/yr | All-in-one, flat price | Dated UI, no AI |
| **HOA Start** | $39+/mo | Modern UI, comprehensive | No AI, no intelligent search |
| **Gladly** | FREE tier | Low barrier to entry | Very limited features |

#### Full Management Platforms

| Competitor | Price | Strengths | Weaknesses |
|------------|-------|-----------|------------|
| **PayHOA** | $54+/mo | Excellent accounting | Not transparency-focused |
| **Buildium** | $160+/mo | Enterprise-grade | Expensive, complex |
| **AppFolio** | $250+/mo | Full-featured | Management company focused |
| **Vinteum** | $0.70/unit | Mobile app | No AI |

#### AI Solutions (Indirect)

| Competitor | Focus | Why We're Different |
|------------|-------|---------------------|
| **HOAi** | Management task automation | They automate manager work; we help homeowners find information |
| **Stan AI** | Service request chatbot | They handle bookings/requests; we do document Q&A with citations |

### Our Competitive Advantages

| Feature | Us | HOA Express | RunHOA | PayHOA |
|---------|-----|-------------|--------|--------|
| AI Document Q&A | ✅ | ❌ | ❌ | ❌ |
| Cited Answers | ✅ | ❌ | ❌ | ❌ |
| Transparency Focus | ✅ | ⚠️ | ⚠️ | ❌ |
| Modern UI/UX | ✅ | ⚠️ | ❌ | ⚠️ |
| Mobile-First | ✅ | ✅ | ⚠️ | ✅ |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 15 (App Router) | SSR, RSC, streaming AI responses |
| **Language** | TypeScript 5.x | Type safety and better DX |
| **Styling** | Tailwind CSS v4 | Utility-first, responsive design |
| **UI Components** | shadcn/ui + Radix | Accessible, customizable components |
| **Icons** | Lucide React | Consistent, tree-shakeable icons |
| **AI/RAG** | Vercel AI SDK + Anthropic Claude | Document Q&A with citations |
| **Database** | Supabase (PostgreSQL) | Managed database with RLS |
| **Vector Store** | Supabase pgvector | Document embeddings for RAG |
| **File Storage** | Supabase Storage | PDF document storage |
| **Hosting** | Netlify | Edge functions, CDN, analytics |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- Supabase account (free tier works)
- Anthropic API key

### Installation

```bash
# Clone the repository
git clone https://github.com/cr-nattress/westlake-hoa.git
cd westlake-hoa

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Anthropic
ANTHROPIC_API_KEY="sk-ant-..."

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Netlify
netlify deploy --prod
```

---

## Project Structure

```
westlake-hoa/
├── docs/                           # Project documentation
│   ├── MULTI_TENANT_PLAN.md       # SaaS transformation plan
│   ├── COMPETITIVE_ANALYSIS.md    # Market research
│   ├── TECH-STACK.md              # Technology decisions
│   ├── RESEARCH-UI-UX.md          # UI/UX research
│   └── CONTENT.md                 # Site content
├── backlog/                        # Agile backlog
│   ├── epic-0-foundation/         # Project setup
│   ├── epic-1-home-navigation/    # Home & nav
│   ├── epic-2-document-library/   # Document features
│   ├── epic-3-ai-assistant/       # AI chat
│   ├── epic-4-meetings/           # Meeting tracker
│   ├── epic-5-insurance/          # Insurance guide
│   ├── epic-6-records-request/    # Records portal
│   └── epic-7-polish-performance/ # Optimization
├── src/                            # Application source
│   ├── app/                       # Next.js App Router
│   ├── components/                # React components
│   ├── lib/                       # Utilities & clients
│   └── types/                     # TypeScript types
├── supabase/                       # Database migrations
├── PLAN.md                         # Project plan & vision
└── README.md                       # This file
```

---

## Architecture

### AI-Powered Document Q&A

```
User Question
     │
     ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Next.js   │────▶│  Vector DB   │────▶│   Claude    │
│   API Route │     │  (pgvector)  │     │   Sonnet    │
└─────────────┘     └──────────────┘     └─────────────┘
                           │                    │
                           ▼                    ▼
                    Relevant Doc          AI Response
                    Chunks                with Citations
                           │                    │
                           └──────────┬─────────┘
                                      ▼
                              ┌──────────────┐
                              │   Response   │
                              │  + Sources   │
                              │  + Disclaimer│
                              └──────────────┘
```

### Key Design Decisions

1. **RAG with Citations** - Every AI answer cites source documents with deep links
2. **Streaming Responses** - Progressive rendering for better perceived performance
3. **Immutable Documents** - Original PDFs preserved, never modified
4. **Public Read Access** - Transparency by default via Supabase RLS
5. **Mobile-First Layout** - Bottom navigation, single-column content

---

## Multi-Tenant Roadmap

### Phase 1: Foundation (2-3 weeks)
- [ ] Create tenant and subscription tables
- [ ] Build tenant resolution middleware
- [ ] Create tenant context provider
- [ ] Update Supabase client for dynamic schemas
- [ ] Build admin dashboard for tenant management

### Phase 2: Data Migration (1-2 weeks)
- [ ] Move contacts to database
- [ ] Move vendors to database
- [ ] Move FAQ/knowledge base to database
- [ ] Move documents to Supabase Storage
- [ ] Create data import scripts

### Phase 3: Customization (1-2 weeks)
- [ ] Tenant settings UI (logo, colors, tagline)
- [ ] Custom domain support with SSL
- [ ] Editable navigation items
- [ ] Custom footer content

### Phase 4: Billing (1-2 weeks)
- [ ] Stripe integration
- [ ] Plan enforcement (query limits, storage)
- [ ] Usage tracking
- [ ] Billing portal

### Phase 5: Onboarding (1 week)
- [ ] Self-service signup flow
- [ ] Document upload wizard
- [ ] Setup checklist
- [ ] Welcome email sequence

---

## Documentation

| Document | Description |
|----------|-------------|
| [MULTI_TENANT_PLAN.md](./docs/MULTI_TENANT_PLAN.md) | Full SaaS transformation plan |
| [COMPETITIVE_ANALYSIS.md](./docs/COMPETITIVE_ANALYSIS.md) | Market research on 12+ competitors |
| [PLAN.md](./PLAN.md) | Project vision, principles, and MVP scope |
| [docs/TECH-STACK.md](./docs/TECH-STACK.md) | Technology choices and setup guides |
| [docs/RESEARCH-UI-UX.md](./docs/RESEARCH-UI-UX.md) | UI/UX research and best practices |
| [backlog/README.md](./backlog/README.md) | Development backlog and epics |

---

## Contributing

We welcome contributions!

### Development Setup

```bash
git clone https://github.com/cr-nattress/westlake-hoa.git
cd westlake-hoa
npm install
npm run dev
```

### Guidelines

- Keep content neutral and factual
- All claims must cite source documents
- Follow TypeScript strict mode
- Ensure accessibility (keyboard nav, screen reader support)
- Test on mobile devices

---

## Disclaimer

**This website is NOT affiliated with:**
- Westlake Village Condominium Association
- The HOA Board of Directors
- Any management company or legal counsel

**This website is:**
- An unofficial, homeowner-run information resource
- For informational purposes only
- Not a source of legal advice

All information is derived from official HOA documents. For binding terms, limits, and obligations, refer to the original executed policies, declarations, and governing documents.

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  <em>Transparency works best when it is quiet.</em>
</p>

<p align="center">
  Built with care by Westlake Village homeowners
</p>
