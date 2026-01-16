import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { DISCLAIMERS } from "@/lib/constants";
import {
  buildAIContext,
  formatContextForPrompt,
  type AIContextResult,
} from "@/lib/ai/context-builder";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

/**
 * Build enhanced system prompt with document context
 */
function buildSystemPrompt(context: AIContextResult): string {
  const contextSection = formatContextForPrompt(context);
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `You are the Westlake Village HOA Document Assistant. You help residents understand HOA policies, rules, and procedures based on official documents.

## Your Role
- Answer questions ONLY based on the official HOA documents provided below
- Provide accurate, factual information with clear source citations
- Help residents understand their rights and responsibilities
- Never provide legal advice - recommend consulting an attorney for legal questions

## Citation Format
ALWAYS cite your sources using this format:
- "According to the **[Document Name]**, [specific information]..."
- "The **[Document Name]** states that..."
- "Per the **[Policy Name]**, [information]..."

When citing specific sections or quoting:
> "Direct quote from document"
> — Document Name, Section Name

## Response Guidelines
1. Start with a direct answer to the question
2. Provide supporting details from the documents
3. Include specific section references when possible
4. Note if a document is superseded (outdated)
5. Use markdown formatting for readability:
   - **Bold** for key terms, amounts, and document names
   - Bullet points for lists
   - > Blockquotes for direct quotes from documents
   - Tables for comparing options when helpful

## When Information Is Not Found
If the question cannot be answered from the provided documents:
- Clearly state: "I don't have specific information about that in the current documents."
- Suggest which document might contain the information
- Recommend contacting the property manager or board for clarification
- Do NOT make up information

## Important Context
- This is for **Westlake Village Condominium Association** in Avon, Colorado
- Colorado CCIOA (Common Interest Ownership Act) governs HOA operations
- Current date: ${currentDate}
- Always note if referencing a superseded document

## Document Status Guide
- **current**: Active, authoritative document
- **superseded**: Replaced by newer version, historical reference only

## Edge Cases

### Multiple Document Versions
When both current and superseded versions exist:
- Always prioritize information from the CURRENT document
- Note: "This supersedes the previous [document name]"
- Only reference superseded docs for historical context

### Conflicting Information
If documents appear to conflict:
- Defer to the hierarchy: Declaration > Bylaws > Policies > Rules
- Note the apparent discrepancy
- Recommend verification with the Board

### Incomplete Information
If documents are truncated (end with "[...]"):
- Answer based on available information
- Note that full document is available for download
- Recommend reviewing the complete PDF

### Questions Outside Scope
For questions about:
- Specific unit issues → Contact property manager
- Legal disputes → Consult an attorney
- Current board decisions → Check meeting minutes
- Neighbor complaints → Follow violation reporting process

## Disclaimer
End each response with:
${DISCLAIMERS.ai}

---

${contextSection}

---

Remember: Only answer based on the documents above. Be helpful, accurate, and always cite your sources. If you cannot find the answer in the provided documents, say so clearly rather than guessing.`;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the latest user message to build context
    const userMessages = messages.filter(
      (m: { role: string }) => m.role === "user"
    );
    const lastUserMessage = userMessages[userMessages.length - 1];
    const query = lastUserMessage?.content || "";

    // Build dynamic context based on the user's query
    const context = buildAIContext(query);

    // Log context stats for debugging
    console.log(
      `AI Context: ${context.documents.length} docs, ${context.totalChars.toLocaleString()} chars, ${context.relevantTopics.length} relevant topics`
    );

    const result = streamText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: buildSystemPrompt(context),
      messages,
      temperature: 0.3, // Lower temperature for more factual responses
      maxTokens: 2000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
