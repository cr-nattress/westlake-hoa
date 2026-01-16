import type { Document, DocumentType, DocumentStatus } from "@/types/database";
import { loadDocumentContent } from "./load-document-content";

// Documents with links to actual PDFs in /public/docs
// Content is loaded from markdown files in docs/hoa-docs/readme/
const MOCK_DOCUMENTS: Document[] = [
  // Governing Documents
  {
    id: "1",
    title: "Declaration of Condominium",
    slug: "declaration-of-condominium",
    type: "declaration",
    status: "current",
    content: loadDocumentContent("/docs/DeclarationofCondominium.pdf"),
    summary:
      "The original Declaration of Condominium establishing Westlake Village Condominium Association. This foundational document defines unit boundaries, common elements, and the basic governance structure.",
    file_url: "/docs/DeclarationofCondominium.pdf",
    file_path: null,
    published_at: "1979-01-01T00:00:00Z",
    created_at: "1979-01-01T00:00:00Z",
    updated_at: "1979-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Bylaws",
    slug: "bylaws",
    type: "bylaw",
    status: "current",
    content: loadDocumentContent("/docs/WestlakeBylaws.pdf"),
    summary:
      "The Bylaws of Westlake Village Condominium Association governing meetings, voting, board elections, and association operations.",
    file_url: "/docs/WestlakeBylaws.pdf",
    file_path: null,
    published_at: "1979-01-01T00:00:00Z",
    created_at: "1979-01-01T00:00:00Z",
    updated_at: "1979-01-01T00:00:00Z",
  },
  {
    id: "3",
    title: "Articles of Incorporation",
    slug: "articles-of-incorporation-1979",
    type: "declaration",
    status: "current",
    content: loadDocumentContent("/docs/Articles of Incorporation 1979.pdf"),
    summary:
      "Original Articles of Incorporation filed in 1979 establishing Westlake Village Condominium Association as a Colorado nonprofit corporation.",
    file_url: "/docs/Articles of Incorporation 1979.pdf",
    file_path: null,
    published_at: "1979-01-01T00:00:00Z",
    created_at: "1979-01-01T00:00:00Z",
    updated_at: "1979-01-01T00:00:00Z",
  },
  {
    id: "4",
    title: "Rules and Regulations",
    slug: "rules-and-regulations-2018",
    type: "rule",
    status: "current",
    content: loadDocumentContent("/docs/2018.10 WLV Rules and Regs.pdf"),
    summary:
      "Community rules and regulations adopted October 2018 covering parking, pets, noise, common areas, and general conduct within Westlake Village.",
    file_url: "/docs/2018.10 WLV Rules and Regs.pdf",
    file_path: null,
    published_at: "2018-10-01T00:00:00Z",
    created_at: "2018-10-01T00:00:00Z",
    updated_at: "2018-10-01T00:00:00Z",
  },

  // Policies
  {
    id: "5",
    title: "Responsible Governance Policies",
    slug: "responsible-governance-policies-2025",
    type: "policy",
    status: "current",
    content: loadDocumentContent(
      "/docs/Westlake Village HOA - Responsible Governance Policies - Updated November 2025 - CLEAN - signed.pdf"
    ),
    summary:
      "Comprehensive policies covering collections, enforcement, meetings, conflicts of interest, and records inspection. Adopted November 2025. Prepared by Alpenglow Law, LLC.",
    file_url:
      "/docs/Westlake Village HOA - Responsible Governance Policies - Updated November 2025 - CLEAN - signed.pdf",
    file_path: null,
    published_at: "2025-11-20T00:00:00Z",
    created_at: "2025-11-20T00:00:00Z",
    updated_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "6",
    title: "Collections Policy",
    slug: "collections-policy-2025",
    type: "policy",
    status: "current",
    content: loadDocumentContent(
      "/docs/Westlake Village HOA - Responsible Governance Policies - Updated November 2025 - CLEAN - signed.pdf"
    ),
    summary:
      "Procedures for assessment collection, late fees ($50-$250), payment plans (18+ months), interest (8%), and foreclosure protections under Colorado CCIOA (HB25-1043). Part of Responsible Governance Policies.",
    file_url:
      "/docs/Westlake Village HOA - Responsible Governance Policies - Updated November 2025 - CLEAN - signed.pdf",
    file_path: null,
    published_at: "2025-11-20T00:00:00Z",
    created_at: "2025-11-20T00:00:00Z",
    updated_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "7",
    title: "Covenant & Rule Enforcement Policy",
    slug: "enforcement-policy-2025",
    type: "policy",
    status: "current",
    content: loadDocumentContent(
      "/docs/Westlake Village HOA - Responsible Governance Policies - Updated November 2025 - CLEAN - signed.pdf"
    ),
    summary:
      "Detailed enforcement procedures including notice requirements, hearing rights, fine caps ($500 for non-safety, unlimited for health/safety), and appeal processes. Part of Responsible Governance Policies.",
    file_url:
      "/docs/Westlake Village HOA - Responsible Governance Policies - Updated November 2025 - CLEAN - signed.pdf",
    file_path: null,
    published_at: "2025-11-20T00:00:00Z",
    created_at: "2025-11-20T00:00:00Z",
    updated_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "8",
    title: "Records Inspection Policy",
    slug: "records-inspection-policy-2025",
    type: "policy",
    status: "current",
    content: loadDocumentContent(
      "/docs/Westlake Village HOA - Responsible Governance Policies - Updated November 2025 - CLEAN - signed.pdf"
    ),
    summary:
      "Owner rights to inspect association records under CCIOA, request procedures, 10-day response timeline, and categories of restricted records. Part of Responsible Governance Policies.",
    file_url:
      "/docs/Westlake Village HOA - Responsible Governance Policies - Updated November 2025 - CLEAN - signed.pdf",
    file_path: null,
    published_at: "2025-11-20T00:00:00Z",
    created_at: "2025-11-20T00:00:00Z",
    updated_at: "2025-11-20T00:00:00Z",
  },

  // Insurance Documents - Current Year (2025-2026)
  {
    id: "9",
    title: "Insurance Certificate 2025-2026",
    slug: "insurance-certificate-2025-2026",
    type: "insurance",
    status: "current",
    content: loadDocumentContent("/docs/25-26 UO Certificate.pdf"),
    summary:
      "Annual insurance certificate showing coverage limits for property ($22.4M), liability ($1M), D&O ($1M), and umbrella ($10M) policies. Policy period October 2025 to October 2026.",
    file_url: "/docs/25-26 UO Certificate.pdf",
    file_path: null,
    published_at: "2025-10-17T00:00:00Z",
    created_at: "2025-10-17T00:00:00Z",
    updated_at: "2025-10-17T00:00:00Z",
  },
  {
    id: "10",
    title: "Insurance Ready Reference 2025-2026",
    slug: "insurance-ready-reference-2025-2026",
    type: "insurance",
    status: "current",
    content: loadDocumentContent("/docs/25-26 Property Manager Reference Sheet.pdf"),
    summary:
      "Quick reference guide for claims (claims@mtnwst.com, 970-945-9111), certificate requests, and insurance service team contacts at Mountain West Insurance.",
    file_url: "/docs/25-26 Property Manager Reference Sheet.pdf",
    file_path: null,
    published_at: "2025-10-17T00:00:00Z",
    created_at: "2025-10-17T00:00:00Z",
    updated_at: "2025-10-17T00:00:00Z",
  },
  {
    id: "11",
    title: "Unit Owners Letter 2025-2026",
    slug: "unit-owners-letter-2025-2026",
    type: "insurance",
    status: "current",
    content: loadDocumentContent("/docs/25-26 UO Letter - Single Entity.pdf"),
    summary:
      "Single entity coverage letter explaining what the HOA master policy covers and what individual unit owners are responsible for insuring.",
    file_url: "/docs/25-26 UO Letter - Single Entity.pdf",
    file_path: null,
    published_at: "2025-10-17T00:00:00Z",
    created_at: "2025-10-17T00:00:00Z",
    updated_at: "2025-10-17T00:00:00Z",
  },

  // Insurance Documents - Prior Year (2024-2025)
  {
    id: "12",
    title: "Insurance Certificate 2024-2025",
    slug: "insurance-certificate-2024-2025",
    type: "insurance",
    status: "superseded",
    content: loadDocumentContent("/docs/24 -25 UO - Certficate.pdf"),
    summary:
      "Prior year insurance certificate. Policy period October 2024 to October 2025. Superseded by 2025-2026 certificate.",
    file_url: "/docs/24 -25 UO - Certficate.pdf",
    file_path: null,
    published_at: "2024-10-17T00:00:00Z",
    created_at: "2024-10-17T00:00:00Z",
    updated_at: "2024-10-17T00:00:00Z",
  },
  {
    id: "13",
    title: "Insurance Ready Reference 2024-2025",
    slug: "insurance-ready-reference-2024-2025",
    type: "insurance",
    status: "superseded",
    content: loadDocumentContent("/docs/24 -25  Property Manager Reference Sheet.pdf"),
    summary:
      "Prior year property manager reference sheet with claims contacts and procedures. Superseded by 2025-2026 version.",
    file_url: "/docs/24 -25  Property Manager Reference Sheet.pdf",
    file_path: null,
    published_at: "2024-10-17T00:00:00Z",
    created_at: "2024-10-17T00:00:00Z",
    updated_at: "2024-10-17T00:00:00Z",
  },
  {
    id: "14",
    title: "Unit Owners Letter 2024-2025",
    slug: "unit-owners-letter-2024-2025",
    type: "insurance",
    status: "superseded",
    content: loadDocumentContent("/docs/24 -25 UO Letter - Single Entity.pdf"),
    summary:
      "Prior year single entity coverage letter. Superseded by 2025-2026 version.",
    file_url: "/docs/24 -25 UO Letter - Single Entity.pdf",
    file_path: null,
    published_at: "2024-10-17T00:00:00Z",
    created_at: "2024-10-17T00:00:00Z",
    updated_at: "2024-10-17T00:00:00Z",
  },
  {
    id: "15",
    title: "Umbrella Liability Policy 2024-2025",
    slug: "umbrella-liability-2024-2025",
    type: "insurance",
    status: "superseded",
    content: loadDocumentContent("/docs/24 -25 Umbrella.pdf"),
    summary:
      "Umbrella liability coverage certificate providing $10M excess liability coverage. Policy period 2024-2025.",
    file_url: "/docs/24 -25 Umbrella.pdf",
    file_path: null,
    published_at: "2024-10-17T00:00:00Z",
    created_at: "2024-10-17T00:00:00Z",
    updated_at: "2024-10-17T00:00:00Z",
  },
  {
    id: "16",
    title: "Directors & Officers Liability 2024-2025",
    slug: "do-liability-2024-2025",
    type: "insurance",
    status: "superseded",
    content: loadDocumentContent("/docs/24-25 Directors & Officers Liab &.Data.pdf"),
    summary:
      "Directors & Officers liability and data breach coverage certificate. $1M coverage for board members and association leadership. Policy period 2024-2025.",
    file_url: "/docs/24-25 Directors & Officers Liab &.Data.pdf",
    file_path: null,
    published_at: "2024-10-17T00:00:00Z",
    created_at: "2024-10-17T00:00:00Z",
    updated_at: "2024-10-17T00:00:00Z",
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
  const { type, status, search, limit = 50, offset = 0 } = options;

  // TODO: Replace with Supabase query when database is connected
  let filtered = MOCK_DOCUMENTS;

  if (type) {
    filtered = filtered.filter((doc) => doc.type === type);
  }

  // Default to showing only current documents unless status is explicitly set
  if (status) {
    filtered = filtered.filter((doc) => doc.status === status);
  } else {
    // By default show current documents first, then superseded
    filtered = filtered.sort((a, b) => {
      if (a.status === "current" && b.status !== "current") return -1;
      if (a.status !== "current" && b.status === "current") return 1;
      return 0;
    });
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

export function getAllDocuments(): Document[] {
  return MOCK_DOCUMENTS;
}
