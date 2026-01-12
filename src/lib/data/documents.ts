import type { Document, DocumentType, DocumentStatus } from "@/types/database";

// Mock documents for development - matches the seed data
const MOCK_DOCUMENTS: Document[] = [
  {
    id: "1",
    title: "Responsible Governance Policies",
    slug: "responsible-governance-policies-2025",
    type: "policy",
    status: "current",
    content: null,
    summary:
      "Comprehensive policies covering collections, enforcement, meetings, conflicts of interest, and records inspection. Adopted November 2025. Prepared by Alpenglow Law, LLC.",
    file_url: null,
    file_path: null,
    published_at: "2025-11-20T00:00:00Z",
    created_at: "2025-11-20T00:00:00Z",
    updated_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "2",
    title: "Insurance Certificate 2025-2026",
    slug: "insurance-certificate-2025-2026",
    type: "insurance",
    status: "current",
    content: null,
    summary:
      "Annual insurance certificate showing coverage limits for property ($22.4M), liability ($1M), D&O ($1M), and umbrella ($10M) policies. Policy period October 2024 to October 2025.",
    file_url: null,
    file_path: null,
    published_at: "2024-10-17T00:00:00Z",
    created_at: "2024-10-17T00:00:00Z",
    updated_at: "2024-10-17T00:00:00Z",
  },
  {
    id: "3",
    title: "Collections Policy",
    slug: "collections-policy-2025",
    type: "policy",
    status: "current",
    content: null,
    summary:
      "Procedures for assessment collection, late fees ($50-$250), payment plans (18+ months), interest (8%), and foreclosure protections under Colorado CCIOA (HB25-1043).",
    file_url: null,
    file_path: null,
    published_at: "2025-11-20T00:00:00Z",
    created_at: "2025-11-20T00:00:00Z",
    updated_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "4",
    title: "Covenant & Rule Enforcement Policy",
    slug: "enforcement-policy-2025",
    type: "policy",
    status: "current",
    content: null,
    summary:
      "Detailed enforcement procedures including notice requirements, hearing rights, fine caps ($500 for non-safety, unlimited for health/safety), and appeal processes.",
    file_url: null,
    file_path: null,
    published_at: "2025-11-20T00:00:00Z",
    created_at: "2025-11-20T00:00:00Z",
    updated_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "5",
    title: "Records Inspection Policy",
    slug: "records-inspection-policy-2025",
    type: "policy",
    status: "current",
    content: null,
    summary:
      "Owner rights to inspect association records under CCIOA, request procedures, 10-day response timeline, and categories of restricted records.",
    file_url: null,
    file_path: null,
    published_at: "2025-11-20T00:00:00Z",
    created_at: "2025-11-20T00:00:00Z",
    updated_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "6",
    title: "Insurance Ready Reference 2025",
    slug: "insurance-ready-reference-2025",
    type: "insurance",
    status: "current",
    content: null,
    summary:
      "Quick reference guide for claims (claims@mtnwst.com, 970-945-9111), certificate requests, and insurance service team contacts at Mountain West Insurance.",
    file_url: null,
    file_path: null,
    published_at: "2025-01-01T00:00:00Z",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
];

export interface GetDocumentsOptions {
  type?: DocumentType;
  status?: DocumentStatus;
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getDocuments(
  options: GetDocumentsOptions = {}
): Promise<Document[]> {
  const { type, status = "current", search, limit = 20, offset = 0 } = options;

  // TODO: Replace with Supabase query when database is connected
  // const supabase = await createServerClient();
  // let query = supabase.from('westlake.documents').select('*');
  // if (type) query = query.eq('type', type);
  // if (status) query = query.eq('status', status);
  // if (search) query = query.textSearch('title,summary', search);
  // const { data, error } = await query.range(offset, offset + limit - 1);

  let filtered = MOCK_DOCUMENTS;

  if (type) {
    filtered = filtered.filter((doc) => doc.type === type);
  }

  if (status) {
    filtered = filtered.filter((doc) => doc.status === status);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchLower) ||
        doc.summary?.toLowerCase().includes(searchLower)
    );
  }

  return filtered.slice(offset, offset + limit);
}

export async function getDocumentBySlug(
  slug: string
): Promise<Document | null> {
  // TODO: Replace with Supabase query when database is connected
  // const supabase = await createServerClient();
  // const { data, error } = await supabase
  //   .from('westlake.documents')
  //   .select('*')
  //   .eq('slug', slug)
  //   .single();

  const doc = MOCK_DOCUMENTS.find((d) => d.slug === slug);
  return doc || null;
}

export async function getDocumentById(id: string): Promise<Document | null> {
  // TODO: Replace with Supabase query when database is connected
  const doc = MOCK_DOCUMENTS.find((d) => d.id === id);
  return doc || null;
}

export function getDocumentTypeCounts(): Record<DocumentType, number> {
  const counts: Record<DocumentType, number> = {
    declaration: 0,
    bylaw: 0,
    rule: 0,
    policy: 0,
    minutes: 0,
    notice: 0,
    insurance: 0,
  };

  for (const doc of MOCK_DOCUMENTS) {
    counts[doc.type]++;
  }

  return counts;
}
