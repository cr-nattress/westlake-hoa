# HOA Document Intelligence Agent

## Plan Document

A universal conversational AI agent for HOA, legal, and property management document analysis.

---

## 1. Agent Identity & Purpose

### Name
**HOA Document Intelligence Agent**

### Purpose
A universal conversational AI agent that accepts any HOA, legal, or property management documents and provides accurate, citation-backed answers grounded entirely in the uploaded materials.

### Core Value Proposition
- **Any HOA, any state, any documents** — no pre-configuration required
- **Upload and ask** — instant document intelligence
- **Legal-grade accuracy** — every claim cited to source
- **Multi-document reasoning** — cross-reference across uploads

---

## 2. Core Capabilities

| Capability | Description |
|------------|-------------|
| **Document Ingestion** | Accept PDF, DOCX, TXT, images (OCR) |
| **Multi-Document Context** | Reason across 10+ documents simultaneously |
| **Legal Hierarchy Awareness** | Declaration > Bylaws > Policies > Rules |
| **Jurisdiction Detection** | Auto-detect state, apply relevant HOA law |
| **Citation Generation** | Every factual claim linked to source + page |
| **Conflict Detection** | Flag when documents disagree |
| **Plain-English Translation** | Explain legal jargon simply |
| **Comparison Mode** | Compare two document versions |
| **Summary Generation** | Executive summaries of long documents |
| **Question Answering** | Direct answers with sources |

---

## 3. Document Processing Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    DOCUMENT UPLOAD                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 1: EXTRACTION                                        │
│  ├─ PDF → Text (pdf-parse)                                  │
│  ├─ Scanned PDF → OCR (Claude Vision)                       │
│  ├─ DOCX → Text (mammoth)                                   │
│  ├─ Images → OCR (Claude Vision)                            │
│  └─ Validate: non-empty, reasonable length                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 2: CLASSIFICATION                                    │
│  ├─ Document Type: declaration | bylaw | policy | rule |    │
│  │                 insurance | minutes | notice | contract  │
│  ├─ Jurisdiction: State detection (CO, CA, FL, TX, etc.)    │
│  ├─ Effective Date: Extract from content                    │
│  ├─ Status: current | superseded | draft                    │
│  └─ Entity Extraction: HOA name, management company         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 3: CHUNKING & INDEXING                               │
│  ├─ Split into semantic chunks (1000-2000 tokens)           │
│  ├─ Preserve section headers and context                    │
│  ├─ Generate embeddings (text-embedding-3-small)            │
│  ├─ Store with metadata: doc_id, chunk_id, page_num         │
│  └─ Build in-memory index for session                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 4: CONTEXT PREPARATION                               │
│  ├─ Session document manifest                               │
│  ├─ Document hierarchy ranking                              │
│  ├─ Jurisdiction context injection                          │
│  └─ Ready for conversation                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. System Prompt Architecture

### Base System Prompt

```markdown
# HOA Document Intelligence Agent

You are a specialized AI assistant for HOA, legal, and property management document analysis. You provide accurate, citation-backed answers grounded ONLY in the documents uploaded by the user.

## Core Principles

### 1. Document-Grounded Only
- EVERY factual claim must cite a specific uploaded document
- If information is not in the documents, say "I don't see this addressed in your uploaded documents"
- NEVER invent, assume, or use external knowledge for document-specific questions

### 2. Legal Accuracy
- Respect document hierarchy: State Law > Declaration/CC&Rs > Bylaws > Policies > Rules
- When documents conflict, note the conflict and defer to higher authority
- Flag superseded documents as historical reference only

### 3. Citation Format
For every factual statement, cite using:
> "[Exact quote or close paraphrase]"
> — **Document Name**, Section/Article [if applicable], Page [if known]

### 4. Jurisdiction Awareness
When state-specific law applies, note:
- The governing statute (e.g., Colorado CCIOA, California Davis-Stirling)
- That state law may override HOA documents
- Recommend consulting an attorney for legal interpretation

### 5. Limitations
You are NOT:
- A licensed attorney — cannot provide legal advice
- A replacement for professional counsel
- Able to predict outcomes or recommend legal strategies

You ARE:
- A document analyst providing accurate information retrieval
- A plain-English translator of complex legal language
- A research assistant for HOA governance questions

## Response Structure

For document questions, use:

1. **Direct Answer** — Lead with the answer
2. **Source Citation** — Quote and cite the document
3. **Context** — Additional relevant information from documents
4. **Caveats** — Limitations, conflicts, or uncertainties
5. **Disclaimer** — Standard legal disclaimer

## Disclaimer (include in substantive responses)
*This information is extracted from your uploaded documents for reference only. It is not legal advice. For binding interpretations, consult the original documents and appropriate professionals.*
```

### Dynamic Context Injection Template

```markdown
---

## Session Context

### Uploaded Documents ({{document_count}})
{{#each documents}}
- **{{title}}** ({{type}}, {{status}})
  - Pages: {{page_count}}
  - Effective: {{effective_date}}
{{/each}}

### Detected Jurisdiction
State: {{jurisdiction.state}}
Governing Law: {{jurisdiction.law_name}}
Key Provisions: {{jurisdiction.key_provisions}}

### Document Hierarchy (This Session)
{{#each hierarchy}}
{{rank}}. {{document_title}} ({{type}})
{{/each}}

---

## Document Contents

{{#each document_chunks}}
### From: {{document_title}} {{#if page_num}}(Page {{page_num}}){{/if}}

{{content}}

---
{{/each}}
```

---

## 5. Conversation Modes

| Mode | Trigger | Behavior |
|------|---------|----------|
| **Q&A** | Default | Answer questions with citations |
| **Summary** | "Summarize...", "Overview of..." | Generate executive summary |
| **Compare** | "Compare...", "Differences between..." | Side-by-side analysis |
| **Extract** | "List all...", "Find every..." | Structured extraction |
| **Explain** | "What does X mean?", "Explain..." | Plain-English translation |
| **Validate** | "Does X comply with...", "Is X allowed?" | Compliance check |

---

## 6. Response Format Specification

### TypeScript Interfaces

```typescript
interface AgentResponse {
  answer: string;                    // Main response text
  citations: Citation[];             // All sources used
  confidence: 'high' | 'medium' | 'low';
  mode: ConversationMode;
  metadata: {
    documentsReferenced: string[];   // Doc IDs used
    jurisdictionApplied?: string;    // State law if relevant
    conflictsDetected?: Conflict[];  // Document disagreements
  };
  disclaimer: string;
}

interface Citation {
  documentId: string;
  documentTitle: string;
  documentType: DocumentType;
  quote: string;                     // Exact text
  section?: string;                  // Article/Section reference
  pageNumber?: number;
  relevance: 'primary' | 'supporting';
}

interface Conflict {
  topic: string;
  documents: Array<{
    documentTitle: string;
    position: string;
    authority: number;               // Hierarchy rank
  }>;
  resolution: string;                // Which one controls
}

type DocumentType = 
  | 'declaration' 
  | 'bylaw' 
  | 'policy' 
  | 'rule' 
  | 'insurance' 
  | 'minutes' 
  | 'notice' 
  | 'contract';

type ConversationMode = 
  | 'qa' 
  | 'summary' 
  | 'compare' 
  | 'extract' 
  | 'explain' 
  | 'validate';
```

---

## 7. Implementation Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Upload Documents  │  Chat Interface  │  Document Viewer   │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                      API LAYER (Next.js)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐    │
│  │ /api/upload  │  │ /api/chat    │  │ /api/documents       │    │
│  │              │  │              │  │                      │    │
│  │ • Validate   │  │ • RAG query  │  │ • List session docs  │    │
│  │ • Extract    │  │ • Stream     │  │ • Get doc content    │    │
│  │ • Classify   │  │ • Cite       │  │ • Download original  │    │
│  └──────────────┘  └──────────────┘  └──────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                      AGENT CORE                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Document Processor                                         │  │
│  │  • PDF extraction (pdf-parse)                              │  │
│  │  • OCR (Claude Vision)                                     │  │
│  │  • Classification (Claude)                                 │  │
│  │  • Chunking (semantic splitter)                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  RAG Engine                                                 │  │
│  │  • Embedding generation (OpenAI/Voyage)                    │  │
│  │  • Vector search (in-memory or pgvector)                   │  │
│  │  • Context assembly                                        │  │
│  │  • Hierarchy-aware ranking                                 │  │
│  └────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Response Generator                                         │  │
│  │  • Claude Sonnet (primary LLM)                             │  │
│  │  • Citation extraction                                     │  │
│  │  • Conflict detection                                      │  │
│  │  • Disclaimer injection                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐    │
│  │ Session      │  │ Vector Store │  │ File Storage         │    │
│  │ Store        │  │ (pgvector/   │  │ (Supabase Storage/   │    │
│  │ (Redis/      │  │  Pinecone)   │  │  S3)                 │    │
│  │  memory)     │  │              │  │                      │    │
│  └──────────────┘  └──────────────┘  └──────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 8. File Structure

```
src/
├── app/
│   └── api/
│       ├── agent/
│       │   ├── chat/route.ts        # Main chat endpoint
│       │   ├── upload/route.ts      # Document upload
│       │   └── documents/route.ts   # Document management
│       └── ...
├── lib/
│   └── agent/
│       ├── index.ts                 # Agent orchestrator
│       ├── document-processor.ts    # Extraction, OCR, classification
│       ├── chunker.ts               # Semantic chunking
│       ├── embeddings.ts            # Embedding generation
│       ├── rag-engine.ts            # Vector search + context
│       ├── response-generator.ts    # LLM interaction
│       ├── citation-extractor.ts    # Parse citations from response
│       ├── jurisdiction-detector.ts # State law detection
│       ├── prompts/
│       │   ├── system.ts            # Base system prompt
│       │   ├── classification.ts    # Document type detection
│       │   └── modes.ts             # Conversation mode prompts
│       └── types.ts                 # TypeScript interfaces
├── components/
│   └── agent/
│       ├── chat-interface.tsx       # Chat UI
│       ├── document-upload.tsx      # Upload component
│       ├── document-list.tsx        # Session documents
│       ├── citation-card.tsx        # Citation display
│       └── document-viewer.tsx      # PDF/text viewer
└── types/
    └── agent.ts                     # Shared types
```

---

## 9. Multi-Tenant Architecture

### Database Schema Extensions

```sql
-- Tenant table for multi-HOA support
CREATE TABLE westlake.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,           -- 'westlake-avon'
  name TEXT NOT NULL,                   -- 'Westlake Village HOA'
  state TEXT NOT NULL,                  -- 'CO'
  jurisdiction JSONB,                   -- CCIOA details
  config JSONB,                         -- branding, contacts
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add tenant_id to all tables
ALTER TABLE westlake.documents ADD COLUMN tenant_id UUID NOT NULL;
ALTER TABLE westlake.document_embeddings ADD COLUMN tenant_id UUID NOT NULL;
ALTER TABLE westlake.meetings ADD COLUMN tenant_id UUID NOT NULL;

-- RLS: Users only see their tenant's data
CREATE POLICY "Tenant isolation" ON westlake.documents
  FOR SELECT USING (tenant_id = current_setting('app.tenant_id')::UUID);
```

### Tenant-Isolated Vector Search

```sql
CREATE OR REPLACE FUNCTION westlake.search_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10,
  p_tenant_id UUID  -- Tenant filter
)
RETURNS TABLE (...) AS $$
BEGIN
  RETURN QUERY
  SELECT ...
  FROM westlake.document_embeddings de
  JOIN westlake.documents d ON d.id = de.document_id
  WHERE de.tenant_id = p_tenant_id  -- Isolation
    AND 1 - (de.embedding <=> query_embedding) > match_threshold
  ORDER BY de.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

---

## 10. Legal Accuracy System

### Document Hierarchy Enforcement

```typescript
const DOCUMENT_HIERARCHY = {
  1: 'state_law',      // Colorado CCIOA overrides everything
  2: 'declaration',    // CC&Rs
  3: 'bylaws',         // Operating procedures
  4: 'policies',       // Board policies
  5: 'rules',          // Day-to-day rules
};

// When documents conflict, higher rank wins
```

### State Law Context

```typescript
interface JurisdictionContext {
  state: 'CO' | 'CA' | 'FL' | 'TX' | ...;
  governingLaw: string;           // 'CCIOA', 'Davis-Stirling'
  keyStatutes: Statute[];         // Specific sections
  limitations: string[];          // Things HOAs can't do in this state
  ownerRights: string[];          // Protections
}
```

### Validation Agents

| Agent | Purpose |
|-------|---------|
| **Citation Verifier** | Verify quoted text exists in source document |
| **Conflict Detector** | Identify when documents disagree |
| **State Law Compliance** | Ensure answers don't contradict state statutes |
| **Document Freshness** | Alert when documents may be outdated |

---

## 11. Key Differentiators

| Feature | Benefit |
|---------|---------|
| **Zero configuration** | Upload docs, start asking |
| **Any jurisdiction** | Works for any US state HOA |
| **Multi-document** | Cross-reference 10+ docs |
| **Legal hierarchy** | Knows Declaration > Rules |
| **Verifiable citations** | Every claim traceable |
| **Conflict detection** | Flags contradictions |
| **Session-based** | No persistent data required |
| **Multi-tenant ready** | Scale to many HOAs |

---

## 12. Implementation Phases

| Phase | Deliverable | Effort |
|-------|-------------|--------|
| **1** | Single PDF upload + Q&A | 1 week |
| **2** | Multi-document + citations | 1 week |
| **3** | OCR + classification | 3 days |
| **4** | Jurisdiction detection | 2 days |
| **5** | Conversation modes | 3 days |
| **6** | Multi-tenant support | 1 week |
| **7** | Production hardening | 1 week |

---

## 13. Platform-Level Agents (Multi-Tenant)

### HOA Onboarding Agent
Automates new customer setup:
- Bulk document ingestion
- Auto-classification
- Entity extraction (HOA name, state, management company)
- Template configuration

### Universal Document Classifier
Trained once, used by all tenants:
- Document type detection
- Jurisdiction identification
- Key section extraction
- Effective date parsing

### State Law Knowledge Agent
Maintains compliance knowledge by jurisdiction:
- Monitor legislative changes
- Update system prompts per state
- Flag non-compliant documents

### Cross-HOA Analytics Agent
Anonymized insights across all tenants:
- Common questions analysis
- Coverage gap identification
- Benchmark data
- Best practices extraction

---

## Summary

This agent is **document-agnostic** and **jurisdiction-aware** — it accepts any HOA/legal/property documents, classifies them automatically, and provides legally accurate answers grounded entirely in what the user uploads. The multi-tenant architecture enables scaling to serve many HOAs while maintaining strict data isolation and legal accuracy.
