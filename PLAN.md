
# Westlake HOA Hub (Unofficial HOA Site)

## Purpose

This project is an **unofficial, homeowner-run transparency and information website** for the Westlake Village Condominium Association (Avon, Colorado).

The goal is to provide **clear, lawful, and neutral access** to HOA documents, meetings, and processes, with an **AI-first interface** that helps homeowners and tenants understand the information **without replacing legal counsel or official HOA channels**.

This site must:
- Be **mobile-first**
- Look **high-quality and trustworthy**
- Be **AI-first**, with document-grounded answers
- Provide **full transparency** within legal limits
- Be **strictly compliant** with Colorado law, CCIOA, and local requirements
- Remain **clearly unofficial** at all times

This is an informational system, not an advocacy platform.

---

## Core Principles (Non-Negotiable)

### 1. Unofficial + Neutral
- Not affiliated with the HOA, Board, management, or counsel
- No opinions, accusations, or speculation
- No editorial tone
- No commentary mixed with facts

### 2. Document-First
- Every claim must trace back to a source document
- AI answers must cite documents and specific sections
- If no document exists, the system must say so

### 3. Informational, Not Legal Advice
- AI explains documents and processes
- AI does **not** recommend actions, predict outcomes, or interpret intent
- Prominent disclaimers globally and per response

### 4. Privacy & Safety
- No personal financial records
- No medical or disability details
- No private correspondence not already distributed to owners
- Redaction required where applicable

---

## Target Users
- Homeowners
- Tenants (read-only access)
- Prospective owners
- Residents seeking clarity on HOA processes
- Non-technical users

---

## MVP Feature Set

### Home Page
- Clear “Unofficial HOA Information Hub” banner
- Plain-language explanation of purpose
- Primary action: **Ask the HOA AI**
- Navigation to Documents, Meetings, Policies, Records Requests, Insurance

### Document Library
Include all legally shareable HOA documents:
- Declarations, Bylaws, Rules
- Responsible Governance Policies
- Collection & Enforcement Policies
- Meeting agendas and minutes
- Official notices to owners
- Insurance summaries

Each document page:
- Title, date, source, status
- Downloadable original PDF
- AI-generated plain-English summary
- Key sections
- Related documents
- Ask-AI entry point

System requirements:
- Full-text search
- Tags
- Version history
- Immutable originals

### Meetings & Decisions
- Meeting type, date, agenda, minutes
- AI summary of discussions and decisions
- Optional decision log

### Records Request Guide
- What records may be requested
- What may be withheld
- Expected timelines under CCIOA
- Downloadable templates
- Procedural follow-up guidance

### Insurance Explained
- HOA insurance summaries
- Plain-English explanations
- AI queries must cite source docs

---

## AI System Requirements

The AI may:
- Summarize documents
- Explain policies
- Locate sections

The AI must NOT:
- Give legal advice
- Recommend actions
- Predict outcomes
- Assign blame

Each AI response must include:
- Source citations
- Deep links
- Disclaimer that it is informational only

---

## Mobile-First UX
- Single-column layout
- Large readable type
- Accordion sections
- Bottom navigation bar

---

## Legal & Compliance Guardrails

### Disclaimers
- Unofficial site
- Not affiliated with HOA
- Informational only
- Not legal advice

### Content Restrictions
- Only documents already distributed or required to be available
- No personal ledgers
- No medical or disability info
- No accusations

### Moderation
- No comments in MVP
- No user uploads
- Corrections via documented process

---

## Data Model (Conceptual)
- Document
- DocumentVersion
- Meeting
- Decision
- Policy
- Tag
- Source
- AIAnswer (with citations)

---

## Suggested Tech Stack
- Next.js (App Router)
- Tailwind CSS
- RAG-based AI
- Immutable document storage
- HTTPS hosting

---

## Build Phases

### Phase 1
- Document library
- Search
- AI summaries
- Home page

### Phase 2
- Meetings
- Records request guide
- Insurance section

### Phase 3
- AI Q&A refinement
- Change detection
- Accessibility & performance

---

## Success Criteria
- Answers found in under 30 seconds
- Every AI answer cites sources
- Neutral, calm, trustworthy tone
- Clearly unofficial
- Legally defensible

---

## Guidance for AI Coding Agents

Prioritize:
- Accuracy over engagement
- Citations over interpretation
- Neutrality over persuasion
- Safety over cleverness

Transparency works best when it is quiet.
