/**
 * AI Context Builder
 *
 * Dynamically selects relevant document content based on user queries.
 * Uses the topic index to prioritize documents and intelligently chunks
 * large documents to fit within context window limits.
 */

import { getAllDocuments } from "@/lib/data/documents";
import { findTopicsByKeyword } from "@/lib/data/topic-index";
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

  return {
    documents,
    relevantTopics: relevantTopics.slice(0, 5).map((t) => ({
      question: t.question,
      quickAnswer: t.quickAnswer,
      slug: t.slug,
    })),
    totalChars,
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
      const matches = sectionLower.match(new RegExp(word, "gi"));
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
  if (context.documents.length === 0) {
    return `## Document Context

No specific document context available. Please encourage the user to ask about specific topics like:
- Financial: assessments, late fees, payment plans
- Insurance: coverage, claims, deductibles
- Rules: pets, parking, noise, renovations
- Governance: voting, meetings, records, violations`;
  }

  let formatted = `## Document Context

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
