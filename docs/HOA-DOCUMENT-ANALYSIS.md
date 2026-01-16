# HOA Document Analysis & Communication Strategy

> Deep analysis of HOA documentation, current website implementation, and recommendations for simplifying information delivery to residents.

**Analysis Date:** January 2026
**Documents Analyzed:** 18 PDFs converted to markdown
**Codebase:** Westlake HOA Website (Next.js)

---

## Executive Summary

### Current State
The Westlake HOA website has a solid foundation with document display, search, and AI chat capabilities. However, there's a **critical gap**: the rich content extracted from PDFs (58,000+ lines of documentation) is not being utilized by the AI assistant or document display system.

### Key Findings
1. **18 PDF documents** successfully converted to markdown with AI formatting
2. **Document content field is null** in all mock data records
3. **AI chat uses hardcoded snippets** instead of actual document content
4. **No semantic search** - only basic title/summary text matching
5. **Two separate HOA entities** (Benchmark + Village Center) create confusion

### Top Recommendations
1. **Populate document content** from README files into data layer
2. **Create topic-based indexes** for common questions (pets, parking, fees, insurance)
3. **Build dynamic FAQ system** from document analysis
4. **Implement semantic search** with document embeddings
5. **Add "Quick Answer" cards** for frequently asked questions

---

## Document Inventory Analysis

### Document Categories

| Category | Count | Purpose | Complexity |
|----------|-------|---------|------------|
| Governing Documents | 5 | Legal foundation (Articles, Bylaws, Declaration) | HIGH |
| Rules & Regulations | 3 | Daily conduct and operational rules | MEDIUM |
| Insurance Documents | 6 | Coverage details and owner responsibilities | MEDIUM |
| Governance Policies | 4 | Procedures for collections, enforcement, records | HIGH |

### Document Hierarchy (Authority Order)
```
1. Colorado Law (CCIOA, nonprofit statutes)
   └── 2. Articles of Incorporation
       └── 3. Declaration of Condominium
           └── 4. Bylaws
               └── 5. Governance Policies
                   └── 6. Rules & Regulations
```

### Key Statistics
- **Total pages across all PDFs:** 300+
- **Extracted markdown content:** 58,000+ lines
- **Scanned documents requiring OCR:** 5 (Articles 1979, Declaration, DeclarationofCondominium, WestlakeBylaws, UO Certificate)
- **Text-extractable documents:** 13

---

## Most Common Resident Questions

Based on document analysis, these are the questions residents most frequently need answered:

### Financial Questions
| Question | Source Document(s) | Key Information |
|----------|-------------------|-----------------|
| When are assessments due? | Governance Policies | 1st of each month |
| What are late fees? | Governance Policies | $50 → $150 → $250/month escalation |
| What's the interest rate? | Governance Policies | 8% per annum |
| Can I set up a payment plan? | Governance Policies | Yes, minimum 18 months |
| Can I lose my home for unpaid fees? | Governance Policies, Declaration | Yes, after 90+ days and proper notice |

### Insurance Questions
| Question | Source Document(s) | Key Information |
|----------|-------------------|-----------------|
| What does HOA insurance cover? | Insurance Certificate, UO Letter | Building exterior, common areas, $22.4M property |
| What do I need to insure? | UO Letter | Interior improvements, contents, personal liability |
| What's the deductible? | Insurance Certificate | $15,000 property (2025-26) |
| Who do I call for claims? | Ready Reference | claims@mtnwst.com, 970-945-9111 |

### Rules Questions
| Question | Source Document(s) | Key Information |
|----------|-------------------|-----------------|
| Can I have a pet? | Rules & Regulations | 1 dog/cat; $100/month tenant fee |
| What are quiet hours? | Rules & Regulations | 10 PM - 8 AM |
| How many parking spaces do I get? | Rules & Regulations | 2 per unit |
| Do I need approval for renovations? | Rules & Regulations | Yes, written Board approval required |
| What happens if I violate rules? | Enforcement Policy | Warning → $100 → $200 → $300+ fines |

### Governance Questions
| Question | Source Document(s) | Key Information |
|----------|-------------------|-----------------|
| When is the annual meeting? | Bylaws | November (date set by Board) |
| How many votes do I get? | Bylaws, Declaration | 1 vote per unit |
| How do I request records? | Records Inspection Policy | Written request, 10-day response |
| What are my maintenance responsibilities? | Declaration, Rules | Unit interior, appliances, improvements |

---

## Current Website Implementation Analysis

### What Works Well
- **Clean document library UI** with filtering by type and status
- **AI chat interface** with suggested questions
- **Document-specific chat** on detail pages
- **Mobile-responsive design**
- **Clear disclaimers** about unofficial nature and not legal advice

### Critical Gaps

#### 1. Document Content Not Connected
```typescript
// Current state in documents.ts
{
  title: "Rules and Regulations",
  content: null,  // <-- EMPTY!
  summary: "Brief description only..."
}
```

**Impact:** AI assistant cannot reference actual document content, only summaries.

#### 2. Hardcoded AI Context
```typescript
// Current state in ask-client.tsx
const SAMPLE_DOCUMENT_CONTEXT = [
  {
    title: "Responsible Governance Policies",
    content: `Late Fees: $50... (brief snippet)`  // <-- MANUAL EXCERPTS
  }
];
```

**Impact:** AI only knows about 4 small snippets, not the full 18 documents.

#### 3. No Semantic Search
- Current search: Basic `includes()` on title and summary
- Missing: Vector embeddings for semantic similarity
- Impact: Users can't find information using natural language

#### 4. No FAQ or Quick Answers
- Every question requires reading full documents or using chat
- No pre-computed answers for common questions
- No "at a glance" information cards

---

## Recommendations

### Phase 1: Connect Document Content (Quick Wins)

#### 1.1 Populate Content from READMEs
Create a script to read markdown files and populate document content:

```typescript
// Example: Load README content into documents
import fs from 'fs';
import path from 'path';

function loadDocumentContent(pdfFilename: string): string | null {
  const readmePath = path.join(
    'docs/hoa-docs/readme',
    pdfFilename.replace('.pdf', '.md')
  );
  if (fs.existsSync(readmePath)) {
    return fs.readFileSync(readmePath, 'utf-8');
  }
  return null;
}
```

#### 1.2 Update Document Data Structure
```typescript
// Enhanced document with content
{
  id: "4",
  title: "Rules and Regulations",
  content: loadDocumentContent("2018.10 WLV Rules and Regs.pdf"),
  summary: "...",
  // Add structured metadata
  keyTopics: ["pets", "parking", "noise", "trash"],
  effectiveDate: "2018-10-01",
  supersedes: null,
}
```

#### 1.3 Create Dynamic AI Context
```typescript
// Build context from actual documents
function buildAIContext(query: string): DocumentContext[] {
  const allDocs = getAllDocuments();
  return allDocs
    .filter(doc => doc.content && isRelevantTo(doc, query))
    .map(doc => ({
      title: doc.title,
      content: doc.content,
      section: extractRelevantSection(doc.content, query)
    }));
}
```

### Phase 2: Topic-Based Information Architecture

#### 2.1 Create Topic Index
Build a structured index mapping topics to document locations:

```typescript
const TOPIC_INDEX = {
  "pets": {
    primaryDoc: "rules-and-regulations-2018",
    sections: ["Pet Policy"],
    quickAnswer: "One dog or cat per unit. Tenants pay $100/month pet fee.",
    relatedDocs: ["declaration-of-condominium"]
  },
  "parking": {
    primaryDoc: "rules-and-regulations-2018",
    sections: ["Parking Regulations"],
    quickAnswer: "2 spaces per unit. Vehicles must be legal, registered, insured.",
    relatedDocs: []
  },
  "late-fees": {
    primaryDoc: "responsible-governance-policies-2025",
    sections: ["Collections Policy"],
    quickAnswer: "Escalating: $50 (1mo) → $150 (2mo) → $250 (3mo+). 8% annual interest.",
    relatedDocs: ["declaration-of-condominium"]
  },
  // ... more topics
};
```

#### 2.2 Add Quick Answer Cards
Display instant answers for common questions:

```tsx
// QuickAnswerCard component
<QuickAnswerCard
  question="What are the late fees?"
  answer="Assessments due 1st of month. Late fees: $50 (1 month), $150 (2 months), $250+ (3+ months). 8% annual interest."
  sources={[
    { title: "Collections Policy", slug: "collections-policy-2025", section: "Late Fees" }
  ]}
/>
```

#### 2.3 Build FAQ Page
Generate FAQ from topic index:

```
/faq
├── Financial
│   ├── When are assessments due?
│   ├── What happens if I pay late?
│   └── Can I set up a payment plan?
├── Insurance
│   ├── What does HOA insurance cover?
│   └── What do I need to insure?
├── Rules
│   ├── Can I have a pet?
│   ├── What are the parking rules?
│   └── What are quiet hours?
└── Governance
    ├── When is the annual meeting?
    └── How do I request records?
```

### Phase 3: Enhanced AI Integration

#### 3.1 Full Document Context
Pass complete document content to AI:

```typescript
// api/chat/route.ts - Enhanced context
const documentContext = await Promise.all(
  relevantDocs.map(async (doc) => ({
    title: doc.title,
    type: doc.type,
    content: doc.content,
    effectiveDate: doc.published_at,
    status: doc.status
  }))
);
```

#### 3.2 Retrieval-Augmented Generation (RAG)
Implement semantic search for better document retrieval:

```typescript
// 1. Generate embeddings for documents
const embeddings = await generateEmbeddings(documents);

// 2. Store in vector database (Supabase pgvector)
await supabase.from('document_embeddings').insert(embeddings);

// 3. Query with user question
const relevantChunks = await searchSimilar(userQuery, topK: 5);

// 4. Pass to LLM with context
const response = await streamText({
  model: anthropic('claude-sonnet-4-20250514'),
  system: buildSystemPrompt(relevantChunks),
  messages
});
```

#### 3.3 Document-Aware System Prompt
```typescript
const systemPrompt = `You are the Westlake Village HOA Assistant.

DOCUMENT CONTEXT:
${documentContext.map(doc => `
## ${doc.title} (${doc.status})
Effective: ${doc.effectiveDate}
${doc.content}
`).join('\n---\n')}

RULES:
1. ONLY answer questions based on the documents above
2. ALWAYS cite sources: "According to [Document Name], Section X..."
3. If information is not in documents, say "I don't have information about that"
4. Note if a document is superseded
5. Never provide legal advice

COLORADO LAW REFERENCES:
- CCIOA (Colorado Common Interest Ownership Act) governs HOAs
- HB25-1043 updated foreclosure protections
- Owners have record inspection rights under CCIOA
`;
```

### Phase 4: User Experience Improvements

#### 4.1 Search Improvements
```typescript
// Enhanced search with multiple strategies
async function searchDocuments(query: string) {
  const results = await Promise.all([
    // Exact match on title
    searchByTitle(query),
    // Full-text search on content
    searchByContent(query),
    // Topic/tag matching
    searchByTopics(query),
    // Semantic similarity (if available)
    searchBySemantic(query)
  ]);

  return dedupeAndRank(results);
}
```

#### 4.2 Document Comparison View
Help users understand document changes:

```tsx
// Show what changed between versions
<DocumentComparison
  current="bylaws-amended-february-2025"
  previous="westlake-bylaws"
  highlights={["Board composition changed", "Electronic voting added"]}
/>
```

#### 4.3 Personal Relevance Filters
```tsx
// Filter by relevance to user situation
<DocumentFilters>
  <FilterOption label="I'm a renter" filters={{ tags: ["tenant-relevant"] }} />
  <FilterOption label="I'm an owner" filters={{ tags: ["owner-relevant"] }} />
  <FilterOption label="I'm on the Board" filters={{ tags: ["board-relevant"] }} />
</DocumentFilters>
```

---

## Information Architecture Proposal

### New Site Structure

```
/
├── Home (unchanged)
├── Quick Answers ← NEW
│   ├── /answers/financial
│   ├── /answers/insurance
│   ├── /answers/rules
│   └── /answers/governance
├── Documents (enhanced)
│   ├── /documents (library with content)
│   └── /documents/[slug] (full content + chat)
├── FAQ ← NEW
│   └── /faq (generated from topic index)
├── Ask AI (enhanced)
│   └── /ask (with full document context)
├── Meetings (unchanged)
├── Insurance (unchanged)
└── Records (unchanged)
```

### Document Display Hierarchy

```
Document Page
├── Header
│   ├── Title + Status Badge
│   ├── Effective Date
│   └── Quick Summary
├── Quick Facts Card ← NEW
│   ├── Key points (3-5 bullets)
│   ├── Important dates/deadlines
│   └── Related documents
├── Full Content (from README)
│   └── Properly formatted markdown
├── AI Chat Sidebar
│   └── Context-aware with full document
└── Related Documents ← NEW
    └── Cross-referenced documents
```

---

## Implementation Roadmap

### Week 1: Content Connection
- [ ] Create script to load README content into documents.ts
- [ ] Update MOCK_DOCUMENTS with actual content
- [ ] Test AI chat with full document context
- [ ] Add content display to document detail pages

### Week 2: Topic Index
- [ ] Create topic index data structure
- [ ] Map all documents to topics
- [ ] Build QuickAnswerCard component
- [ ] Add topic search functionality

### Week 3: FAQ System
- [ ] Generate FAQ from topic index
- [ ] Create FAQ page component
- [ ] Add FAQ to navigation
- [ ] Link FAQs to source documents

### Week 4: AI Enhancement
- [ ] Update system prompt with full context
- [ ] Improve source citation formatting
- [ ] Add document status awareness
- [ ] Test with common questions

### Future: Semantic Search
- [ ] Set up Supabase pgvector
- [ ] Generate document embeddings
- [ ] Implement RAG retrieval
- [ ] A/B test search quality

---

## Technical Specifications

### Document Content Loading

```typescript
// src/lib/data/load-document-content.ts
import fs from 'fs';
import path from 'path';

const README_DIR = 'docs/hoa-docs/readme';

const PDF_TO_README_MAP: Record<string, string> = {
  'DeclarationofCondominium.pdf': 'DeclarationofCondominium.md',
  'WestlakeBylaws.pdf': 'WestlakeBylaws.md',
  '2018.10 WLV Rules and Regs.pdf': '2018.10 WLV Rules and Regs.md',
  // ... map all PDFs to READMEs
};

export function loadDocumentContent(fileUrl: string): string | null {
  const filename = fileUrl.split('/').pop();
  if (!filename) return null;

  const readmeFilename = PDF_TO_README_MAP[filename];
  if (!readmeFilename) return null;

  const readmePath = path.join(README_DIR, readmeFilename);

  try {
    return fs.readFileSync(readmePath, 'utf-8');
  } catch {
    return null;
  }
}
```

### Topic Index Schema

```typescript
// src/lib/data/topic-index.ts
interface TopicEntry {
  slug: string;
  name: string;
  category: 'financial' | 'insurance' | 'rules' | 'governance';
  quickAnswer: string;
  primaryDocument: string; // document slug
  sections: string[];
  relatedDocuments: string[];
  keywords: string[];
}

export const TOPIC_INDEX: TopicEntry[] = [
  {
    slug: 'late-fees',
    name: 'Late Fees',
    category: 'financial',
    quickAnswer: 'Assessments due 1st of month. Late fees: $50 (1 month), $150 (2 months), $250+ (3+ months). 8% annual interest starts 15 days after due date.',
    primaryDocument: 'collections-policy-2025',
    sections: ['Late Fee Schedule', 'Interest'],
    relatedDocuments: ['responsible-governance-policies-2025'],
    keywords: ['late', 'fee', 'payment', 'overdue', 'delinquent']
  },
  // ... more topics
];
```

### Enhanced AI Context Builder

```typescript
// src/lib/ai/context-builder.ts
import { getAllDocuments } from '../data/documents';
import { TOPIC_INDEX } from '../data/topic-index';

interface AIContext {
  documents: Array<{
    title: string;
    content: string;
    type: string;
    status: string;
  }>;
  relevantTopics: Array<{
    name: string;
    quickAnswer: string;
  }>;
}

export function buildAIContext(query: string): AIContext {
  const allDocs = getAllDocuments();
  const queryLower = query.toLowerCase();

  // Find relevant topics
  const relevantTopics = TOPIC_INDEX.filter(topic =>
    topic.keywords.some(kw => queryLower.includes(kw))
  );

  // Get primary documents for those topics
  const relevantDocSlugs = new Set(
    relevantTopics.flatMap(t => [t.primaryDocument, ...t.relatedDocuments])
  );

  // If no topic match, include all current documents
  const documents = relevantDocSlugs.size > 0
    ? allDocs.filter(d => relevantDocSlugs.has(d.slug))
    : allDocs.filter(d => d.status === 'current');

  return {
    documents: documents.map(d => ({
      title: d.title,
      content: d.content || d.summary || '',
      type: d.type,
      status: d.status
    })),
    relevantTopics: relevantTopics.map(t => ({
      name: t.name,
      quickAnswer: t.quickAnswer
    }))
  };
}
```

---

## Appendix A: Document-to-README Mapping

| Document | PDF File | README File | Status |
|----------|----------|-------------|--------|
| Declaration of Condominium | DeclarationofCondominium.pdf | DeclarationofCondominium.md | OCR |
| Bylaws | WestlakeBylaws.pdf | WestlakeBylaws.md | OCR |
| Bylaws (Amended 2025) | Bylaws amended February 2025.pdf | Bylaws amended February 2025.md | Text |
| Articles 1979 | Articles of Incorporation 1979.pdf | Articles of Incorporation 1979.md | OCR |
| Rules 2018 | 2018.10 WLV Rules and Regs.pdf | 2018.10 WLV Rules and Regs.md | Text |
| Rules 2020 | Rules and Regulations Amended Adopted 2.21.20.pdf | Rules and Regulations Amended Adopted 2.21.20.md | Text |
| Governance Policies | Westlake Village HOA - Responsible Governance Policies... | Westlake Village HOA - Responsible Governance Policies... | Text |
| Declaration (2025) | Declaration recorded April 2025 w 10.16.25 amendment.pdf | Declaration recorded April 2025 w 10.16.25 amendment.md | OCR |
| Insurance Cert 25-26 | 25-26 UO Certificate.pdf | 25-26 UO Certificate.md | Text |
| Insurance Cert 24-25 | 24 -25 UO - Certficate.pdf | 24 -25 UO - Certficate.md | OCR |
| UO Letter 25-26 | 25-26 UO Letter - Single Entity.pdf | 25-26 UO Letter - Single Entity.md | Text |
| UO Letter 24-25 | 24 -25 UO Letter - Single Entity.pdf | 24 -25 UO Letter - Single Entity.md | Text |
| Ready Ref 25-26 | 25-26 Property Manager Reference Sheet.pdf | 25-26 Property Manager Reference Sheet.md | Text |
| Ready Ref 24-25 | 24 -25 Property Manager Reference Sheet.pdf | 24 -25 Property Manager Reference Sheet.md | Text |
| Umbrella 24-25 | 24 -25 Umbrella.pdf | 24 -25 Umbrella.md | Text |
| D&O 24-25 | 24-25 Directors & Officers Liab &.Data.pdf | 24-25 Directors & Officers Liab &.Data.md | Text |
| Governance (Oct 2025) | Governance Policies as of 10.1.2025.pdf | Governance Policies as of 10.1.2025.md | Text |
| Articles (2025) | Village Center Amended Restated Articles... | Village Center Amended Restated Articles... | Text |

---

## Appendix B: Complete Topic Index

### Financial Topics
- `assessments` - Monthly dues and special assessments
- `late-fees` - Late payment penalties
- `payment-plans` - Payment arrangement options
- `interest` - Interest on delinquent accounts
- `foreclosure` - Foreclosure procedures and protections
- `liens` - Assessment liens on units

### Insurance Topics
- `hoa-coverage` - What Association insurance covers
- `owner-coverage` - What owners must insure
- `claims` - How to file insurance claims
- `deductibles` - Policy deductibles
- `liability` - Liability coverage details

### Rules Topics
- `pets` - Pet policies and restrictions
- `parking` - Parking rules and spaces
- `noise` - Quiet hours and noise restrictions
- `renovations` - Architectural approval process
- `trash` - Trash disposal rules
- `balconies` - Balcony use restrictions
- `smoking` - Smoking areas and restrictions

### Governance Topics
- `voting` - Voting rights and procedures
- `meetings` - Annual and special meetings
- `board` - Board composition and elections
- `records` - Records inspection rights
- `violations` - Violation procedures and fines
- `appeals` - Appeal processes

---

## Appendix C: Critical Dates Reference

| Date | Event | Source |
|------|-------|--------|
| 1st of month | Assessments due | Governance Policies |
| 15 days after due | Interest begins | Governance Policies |
| 30 days past due | First contact notice | Governance Policies |
| 60 days past due | Formal delinquency notice | Governance Policies |
| 90 days past due | Attorney referral | Governance Policies |
| 10 PM - 8 AM | Quiet hours | Rules & Regulations |
| Oct 1 - May 30 | 55°F minimum heating | Rules & Regulations |
| November | Annual meeting | Bylaws |
| 10 business days | Records request response | Records Policy |
| 5 days | Violation hearing request window | Enforcement Policy |

---

*This analysis was generated by reviewing 18 HOA documents totaling 300+ pages and the complete website codebase.*
