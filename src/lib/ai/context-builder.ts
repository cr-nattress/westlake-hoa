/**
 * AI Context Builder
 *
 * Dynamically selects relevant document content based on user queries.
 * Uses the topic index to prioritize documents and intelligently chunks
 * large documents to fit within context window limits.
 */

import { getAllDocuments } from "@/lib/data/documents";
import { findTopicsByKeyword } from "@/lib/data/topic-index";
import { escapeRegex } from "@/lib/security";
import {
  HOA_IDENTITY,
  CONTACTS,
  BOARD_MEMBERS,
  BOARD_AUTHORITY,
  ENFORCEMENT_PATH,
  PROPERTY_MANAGEMENT,
  LEGAL_COUNSEL,
  INSURANCE_BROKER,
  BOLD_DELEGATED_AUTHORITY,
  BOLD_SPECIFIC_EMAILS,
  SERVICE_GAPS,
  ACCOUNTABILITY_STATEMENT,
  ESCALATION_FLOW,
} from "@/lib/data/institutional-knowledge";
import {
  VENDORS,
  coloradoBooting,
  WRONGFUL_BOOTING_GUIDE,
} from "@/lib/data/vendors";
import type { Document } from "@/types/database";

// Context size limits
const MAX_CONTEXT_CHARS = 100000; // ~25k tokens
const MAX_DOC_CHARS = 30000; // Per document limit

export interface DocumentContext {
  title: string;
  type: string;
  status: string;
  content: string;
  slug: string;
  sections?: string[];
  publishedAt?: string;
}

export interface RelevantTopic {
  question: string;
  quickAnswer: string;
  slug: string;
}

export interface AIContextResult {
  documents: DocumentContext[];
  relevantTopics: RelevantTopic[];
  totalChars: number;
  institutionalContext?: string;
}

// Keywords that trigger institutional knowledge inclusion
const CONTACT_KEYWORDS = [
  "contact",
  "who",
  "call",
  "email",
  "reach",
  "phone",
  "address",
  "management",
  "manager",
  "bold",
  "attorney",
  "lawyer",
  "legal",
  "counsel",
  "alpenglow",
  "insurance",
  "broker",
  "mountain west",
  "claims",
];

const GOVERNANCE_KEYWORDS = [
  "board",
  "president",
  "vote",
  "decision",
  "authority",
  "governance",
  "enforcement",
  "escalat",
  "violation",
  "fine",
  "hearing",
  "appeal",
  "matz",
];

const MANAGEMENT_AUTHORITY_KEYWORDS = [
  "bold can",
  "bold cannot",
  "management can",
  "management cannot",
  "authority",
  "approve",
  "authorize",
  "legal action",
  "collections",
  "foreclosure",
  "attorney referral",
  "sla",
  "service level",
  "response time",
  "delegated",
  "limitation",
];

const VENDOR_KEYWORDS = [
  "vendor",
  "booting",
  "boot",
  "booted",
  "car boot",
  "wheel boot",
  "tow",
  "towed",
  "parking enforcement",
  "colorado booting",
  "parkingcode",
  "immobiliz",
  "$160",
  "$60",
  "wrongful",
  "bbb",
  "better business",
];

/**
 * Build institutional knowledge context string.
 * Includes HOA identity, contacts, board info, enforcement details, and vendor info.
 */
export function buildInstitutionalContext(query: string): string | undefined {
  const queryLower = query.toLowerCase();

  const needsContactInfo = CONTACT_KEYWORDS.some((kw) =>
    queryLower.includes(kw)
  );
  const needsGovernanceInfo = GOVERNANCE_KEYWORDS.some((kw) =>
    queryLower.includes(kw)
  );
  const needsManagementAuthority = MANAGEMENT_AUTHORITY_KEYWORDS.some((kw) =>
    queryLower.includes(kw)
  );
  const needsVendorInfo = VENDOR_KEYWORDS.some((kw) =>
    queryLower.includes(kw)
  );

  if (!needsContactInfo && !needsGovernanceInfo && !needsManagementAuthority && !needsVendorInfo) {
    return undefined;
  }

  let context = `## Institutional Knowledge\n\n`;

  // Always include HOA identity for governance/contact queries
  context += `### HOA Identity
- **Legal Name:** ${HOA_IDENTITY.legalName}
- **DBA:** ${HOA_IDENTITY.dba}
- **Type:** ${HOA_IDENTITY.entityType}
- **Units:** Approximately ${HOA_IDENTITY.totalUnits} units
- **Property:** ${HOA_IDENTITY.propertyName}
- **Jurisdiction:** ${HOA_IDENTITY.jurisdiction.join(", ")}

`;

  // Add contact information
  if (needsContactInfo) {
    context += `### Key Contacts

**Property Management: ${PROPERTY_MANAGEMENT.name}**
- Role: ${PROPERTY_MANAGEMENT.role}
- Mailing Address: PO Box 5800, Avon, CO 81620
- Email domains: ${PROPERTY_MANAGEMENT.emailDomains?.join(", ")}
- Platform: ${PROPERTY_MANAGEMENT.platforms?.join(", ")}
- Responsibilities: ${PROPERTY_MANAGEMENT.responsibilities?.slice(0, 6).join(", ")}

**Legal Counsel: ${LEGAL_COUNSEL.name}**
- Role: ${LEGAL_COUNSEL.role}
- Attorney: T.J. Voboril, Esq.
- Notes: ${LEGAL_COUNSEL.notes?.join("; ")}

**Insurance Broker: ${INSURANCE_BROKER.name}**
- Email: ${INSURANCE_BROKER.email}
- Phone: ${INSURANCE_BROKER.phone}

**Who to Contact:**
- Maintenance, assessments, general questions → Property Management (Bold Solutions)
- Insurance claims → Mountain West Insurance (${INSURANCE_BROKER.email})
- Legal matters are typically escalated through Property Management to Legal Counsel
- The Board does not have direct public contact

`;
  }

  // Add governance information
  if (needsGovernanceInfo) {
    context += `### Board of Directors
${BOARD_MEMBERS.map((m) => `- **${m.name}**: ${m.position} (as of ${m.asOfDate})`).join("\n")}

**Board Authority:**
${BOARD_AUTHORITY.powers.map((p) => `- ${p}`).join("\n")}

**Decision Making:**
The Board may act through: ${BOARD_AUTHORITY.decisionMaking.methods.join(" or ")}.

Votes must be recorded for: ${BOARD_AUTHORITY.decisionMaking.recordedVotes.join(", ")}.

### Enforcement Escalation Path
${ENFORCEMENT_PATH.map((s) => `${s.step}. **${s.entity}** - ${s.action}: ${s.description}`).join("\n")}

**Key Enforcement Points:**
- Owners have 5 days to request a hearing after receiving a fine
- Non-safety violations are capped at $500 total
- Health/safety violations have no fine cap
- All fines require Board authorization

`;
  }

  // Add management authority information
  if (needsManagementAuthority || needsContactInfo) {
    context += `### Bold Property Management Authority

**Accountability Note:** ${ACCOUNTABILITY_STATEMENT}

**What Bold CAN Do (Delegated Authority):**
${BOLD_DELEGATED_AUTHORITY.powers.map((p) => `- ${p}`).join("\n")}

**What Bold CANNOT Do (Requires Board Authorization):**
${BOLD_DELEGATED_AUTHORITY.limitations.map((l) => `- ${l.limitation}: ${l.requirement}`).join("\n")}

**Specific Contact Emails:**
${BOLD_SPECIFIC_EMAILS.map((e) => `- ${e.purpose}: ${e.email}${e.notes ? ` (${e.notes})` : ""}`).join("\n")}

**Known Service Gaps:**
${SERVICE_GAPS.map((g) => `- ${g.item}: ${g.description} - Impact: ${g.impact}`).join("\n")}

**Escalation Path:**
${ESCALATION_FLOW.map((s) => `${s.step}. **${s.entity}** - ${s.action}: ${s.description}`).join("\n")}

**Important:** Bold has no documented service-level agreements (SLAs). If requesting something Bold cannot authorize, ask the Board. If Board doesn't respond, escalate to legal counsel or consult your own attorney.

`;
  }

  // Add vendor/booting information
  if (needsVendorInfo) {
    const booting = coloradoBooting;
    context += `### Vehicle Booting / Parking Enforcement

**Company:** ${booting.name}
- Phone: ${booting.contact.phone} (ext. 1 for boot removal)
- Email: ${booting.contact.email}
- Website: ${booting.contact.website}
- BBB Rating: F (lowest possible - 13 unanswered complaints)

**YOUR RIGHTS Under Colorado Law:**
${booting.regulatory?.consumerRights.map((r) => `- **${r.title}**: ${r.description}${r.legalBasis ? ` (${r.legalBasis})` : ""}`).join("\n")}

**Key Fee Limits:**
- Maximum boot removal fee: $160
- Under HB25-1117, you can pay max $60 to get the boot released
- Release time: 90 minutes (business hours), 120 minutes (after hours)

**You CANNOT Be Booted For:**
- Being inside your vehicle (occupied vehicle prohibition)
- Expired registration alone
- Without proper signage at lot entrance
- Without 24-hour written notice (with some exceptions)

**If You Believe You Were Wrongfully Booted:**
${WRONGFUL_BOOTING_GUIDE.map((step) => `${step.step}. **${step.title}**: ${step.description}`).join("\n")}

**File a Complaint:**
- Colorado PUC: ${booting.regulatory?.complaintProcess.phone} (option #2) or toll-free ${booting.regulatory?.complaintProcess.tollFree}
- ${booting.regulatory?.complaintProcess.description}

**Important:** Company's terms state all payments are non-refundable. Disputes require binding arbitration. For detailed vendor information, visit /vendors/colorado-booting.

`;
  }

  return context;
}

/**
 * Build AI context based on user query.
 * Prioritizes documents matching topic keywords, then falls back to current documents.
 */
export function buildAIContext(query: string): AIContextResult {
  const allDocs = getAllDocuments();
  const queryLower = query.toLowerCase();

  // Find matching topics
  const relevantTopics = query ? findTopicsByKeyword(query) : [];

  // Get document slugs from topics
  const topicDocSlugs = new Set<string>();
  for (const topic of relevantTopics) {
    topicDocSlugs.add(topic.primaryDocument);
    topic.relatedDocuments.forEach((slug) => topicDocSlugs.add(slug));
  }

  // Prioritize documents
  let prioritizedDocs: Document[];

  if (topicDocSlugs.size > 0) {
    // Use topic-matched documents first
    const topicDocs = allDocs.filter((d) => topicDocSlugs.has(d.slug));
    const otherCurrentDocs = allDocs.filter(
      (d) => !topicDocSlugs.has(d.slug) && d.status === "current"
    );
    prioritizedDocs = [...topicDocs, ...otherCurrentDocs];
  } else {
    // Fall back to current documents, prioritize by type
    const typeOrder = ["policy", "rule", "bylaw", "declaration", "insurance"];
    prioritizedDocs = allDocs
      .filter((d) => d.status === "current")
      .sort((a, b) => {
        const aIdx = typeOrder.indexOf(a.type);
        const bIdx = typeOrder.indexOf(b.type);
        return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
      });
  }

  // Build context within size limit
  const documents: DocumentContext[] = [];
  let totalChars = 0;

  for (const doc of prioritizedDocs) {
    if (!doc.content) continue;

    let content = doc.content;

    // Truncate if necessary
    if (content.length > MAX_DOC_CHARS) {
      // Try to find relevant section
      const relevantSection = extractRelevantSection(content, queryLower);
      content = relevantSection || content.slice(0, MAX_DOC_CHARS) + "\n[...]";
    }

    // Check if we have room
    if (totalChars + content.length > MAX_CONTEXT_CHARS) {
      // Try smaller chunk
      const remaining = MAX_CONTEXT_CHARS - totalChars;
      if (remaining > 5000) {
        content = content.slice(0, remaining) + "\n[...]";
      } else {
        break; // No more room
      }
    }

    documents.push({
      title: doc.title,
      type: doc.type,
      status: doc.status,
      slug: doc.slug,
      content,
      publishedAt: doc.published_at || undefined,
    });

    totalChars += content.length;
  }

  // Build institutional context if relevant
  const institutionalContext = buildInstitutionalContext(query);

  return {
    documents,
    relevantTopics: relevantTopics.slice(0, 5).map((t) => ({
      question: t.question,
      quickAnswer: t.quickAnswer,
      slug: t.slug,
    })),
    totalChars,
    institutionalContext,
  };
}

/**
 * Extract section of document most relevant to query.
 * Searches for sections with high keyword density.
 */
function extractRelevantSection(content: string, query: string): string | null {
  if (!query) return null;

  const sections = content.split(/^##\s+/m);

  // Score each section by keyword matches
  const queryWords = query
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .map((w) => w.toLowerCase());

  if (queryWords.length === 0) return null;

  let bestSection = "";
  let bestScore = 0;

  for (const section of sections) {
    const sectionLower = section.toLowerCase();
    let score = 0;

    for (const word of queryWords) {
      // Escape user input to prevent ReDoS attacks
      const escapedWord = escapeRegex(word);
      const matches = sectionLower.match(new RegExp(escapedWord, "gi"));
      if (matches) {
        score += matches.length;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestSection = section;
    }
  }

  if (bestScore > 0 && bestSection.length > 500) {
    return "## " + bestSection.slice(0, MAX_DOC_CHARS);
  }

  return null;
}

/**
 * Get context for a specific document (for document-specific chat).
 */
export function getDocumentContext(slug: string): DocumentContext | null {
  const allDocs = getAllDocuments();
  const doc = allDocs.find((d) => d.slug === slug);

  if (!doc || !doc.content) return null;

  return {
    title: doc.title,
    type: doc.type,
    status: doc.status,
    slug: doc.slug,
    content: doc.content.slice(0, MAX_DOC_CHARS),
    publishedAt: doc.published_at || undefined,
  };
}

/**
 * Format document context for the AI system prompt.
 * Returns a formatted string suitable for inclusion in the prompt.
 */
export function formatContextForPrompt(context: AIContextResult): string {
  let formatted = "";

  // Add institutional context first if available
  if (context.institutionalContext) {
    formatted += context.institutionalContext + "\n---\n\n";
  }

  if (context.documents.length === 0 && !context.institutionalContext) {
    return `## Document Context

No specific document context available. Please encourage the user to ask about specific topics like:
- Financial: assessments, late fees, payment plans
- Insurance: coverage, claims, deductibles
- Rules: pets, parking, noise, renovations
- Governance: voting, meetings, records, violations
- Contacts: who to contact, property management, legal counsel`;
  }

  if (context.documents.length === 0) {
    return formatted;
  }

  formatted += `## Document Context

The following excerpts from official HOA documents are available for reference:

`;

  // Add relevant quick answers if any
  if (context.relevantTopics.length > 0) {
    formatted += `### Quick Reference (Pre-indexed Answers)\n\n`;
    for (const topic of context.relevantTopics) {
      formatted += `**Q: ${topic.question}**\nA: ${topic.quickAnswer}\n\n`;
    }
    formatted += `---\n\n`;
  }

  // Add document content
  formatted += `### Full Document Excerpts\n\n`;
  for (const doc of context.documents) {
    formatted += `#### ${doc.title} (${doc.type}${doc.status === "superseded" ? " - SUPERSEDED" : ""})\n`;
    formatted += `Slug: ${doc.slug}\n`;
    if (doc.publishedAt) {
      formatted += `Published: ${new Date(doc.publishedAt).toLocaleDateString()}\n`;
    }
    formatted += `\n${doc.content}\n\n---\n\n`;
  }

  formatted += `\n**Total context: ${context.totalChars.toLocaleString()} characters from ${context.documents.length} documents**`;

  return formatted;
}

/**
 * Build context specifically for a document detail page chat.
 * Focuses on the specific document but includes related documents.
 */
export function buildDocumentPageContext(documentSlug: string): AIContextResult {
  const allDocs = getAllDocuments();
  const primaryDoc = allDocs.find((d) => d.slug === documentSlug);

  if (!primaryDoc || !primaryDoc.content) {
    return buildAIContext(""); // Fall back to general context
  }

  // Find related documents via topic index
  const relatedTopics = findTopicsByKeyword(primaryDoc.title);
  const relatedSlugs = new Set<string>();
  for (const topic of relatedTopics) {
    if (topic.primaryDocument !== documentSlug) {
      relatedSlugs.add(topic.primaryDocument);
    }
    topic.relatedDocuments.forEach((slug) => {
      if (slug !== documentSlug) {
        relatedSlugs.add(slug);
      }
    });
  }

  const documents: DocumentContext[] = [];
  let totalChars = 0;

  // Add primary document first (with higher limit)
  let content = primaryDoc.content;
  const primaryDocLimit = Math.min(content.length, 50000);
  content = content.slice(0, primaryDocLimit);
  if (content.length < primaryDoc.content.length) {
    content += "\n[...]";
  }

  documents.push({
    title: primaryDoc.title,
    type: primaryDoc.type,
    status: primaryDoc.status,
    slug: primaryDoc.slug,
    content,
    publishedAt: primaryDoc.published_at || undefined,
  });
  totalChars += content.length;

  // Add related documents
  for (const slug of relatedSlugs) {
    const doc = allDocs.find((d) => d.slug === slug);
    if (!doc || !doc.content) continue;

    let relatedContent = doc.content;
    if (relatedContent.length > MAX_DOC_CHARS) {
      relatedContent = relatedContent.slice(0, MAX_DOC_CHARS) + "\n[...]";
    }

    if (totalChars + relatedContent.length > MAX_CONTEXT_CHARS) {
      break;
    }

    documents.push({
      title: doc.title,
      type: doc.type,
      status: doc.status,
      slug: doc.slug,
      content: relatedContent,
      publishedAt: doc.published_at || undefined,
    });
    totalChars += relatedContent.length;
  }

  return {
    documents,
    relevantTopics: relatedTopics.slice(0, 3).map((t) => ({
      question: t.question,
      quickAnswer: t.quickAnswer,
      slug: t.slug,
    })),
    totalChars,
  };
}
