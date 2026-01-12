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
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
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
git clone https://github.com/your-username/westlake-hoa.git
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
├── docs/                        # Project documentation
│   ├── TECH-STACK.md           # Technology decisions
│   ├── RESEARCH-UI-UX.md       # UI/UX research
│   └── CONTENT.md              # Site content
├── backlog/                     # Agile backlog
│   ├── README.md               # Backlog overview
│   ├── epic-0-foundation/      # Project setup
│   ├── epic-1-home-navigation/ # Home & nav
│   ├── epic-2-document-library/# Document features
│   ├── epic-3-ai-assistant/    # AI chat
│   ├── epic-4-meetings/        # Meeting tracker
│   ├── epic-5-insurance/       # Insurance guide
│   ├── epic-6-records-request/ # Records portal
│   └── epic-7-polish-performance/ # Optimization
├── src/                         # Application source (coming soon)
│   ├── app/                    # Next.js App Router
│   ├── components/             # React components
│   ├── lib/                    # Utilities & clients
│   └── types/                  # TypeScript types
├── PLAN.md                      # Project plan & vision
└── README.md                    # This file
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

## Documentation

| Document | Description |
|----------|-------------|
| [PLAN.md](./PLAN.md) | Project vision, principles, and MVP scope |
| [docs/TECH-STACK.md](./docs/TECH-STACK.md) | Technology choices and setup guides |
| [docs/RESEARCH-UI-UX.md](./docs/RESEARCH-UI-UX.md) | UI/UX research and best practices |
| [docs/CONTENT.md](./docs/CONTENT.md) | Site content derived from HOA documents |
| [backlog/README.md](./backlog/README.md) | Development backlog and epics |

---

## Roadmap

### Phase 1: Core Foundation (MVP)

- [ ] Project setup (Next.js 15, Tailwind v4, shadcn/ui)
- [ ] Database schema with Supabase
- [ ] Document library with search
- [ ] AI assistant with citations
- [ ] Home page and navigation

### Phase 2: Extended Features

- [ ] Meetings and decisions tracker
- [ ] Insurance section with guides
- [ ] Records request portal
- [ ] Template downloads

### Phase 3: Polish & Performance

- [ ] WCAG 2.1 AA compliance audit
- [ ] Performance optimization (Lighthouse 90+)
- [ ] Enhanced AI capabilities
- [ ] Document change detection

---

## Contributing

We welcome contributions from the Westlake Village community!

### Development Setup

```bash
# Clone and install
git clone https://github.com/your-username/westlake-hoa.git
cd westlake-hoa
npm install

# Start local Supabase (optional)
npx supabase start

# Run development server
npm run dev
```

### Guidelines

- Keep content neutral and factual
- All claims must cite source documents
- Follow TypeScript strict mode
- Ensure accessibility (keyboard nav, screen reader support)
- Test on mobile devices

### Reporting Issues

Found incorrect information or a bug? Please [open an issue](https://github.com/your-username/westlake-hoa/issues) with:
- Description of the problem
- Steps to reproduce
- Source document reference (if applicable)

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

All information is derived from official HOA documents. For binding terms, limits, and obligations, refer to the original executed policies, declarations, and governing documents. Consult appropriate professionals for specific legal situations.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <em>Transparency works best when it is quiet.</em>
</p>

<p align="center">
  Built with care by Westlake Village homeowners
</p>
