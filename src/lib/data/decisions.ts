import type { Decision, DecisionStatus } from "@/types/database";

// Extended decision type with meeting info for display
export interface DecisionWithMeeting extends Decision {
  meeting_title: string;
  meeting_date: string;
}

// Mock decisions for development
const MOCK_DECISIONS: DecisionWithMeeting[] = [
  {
    id: "1",
    meeting_id: "2",
    meeting_title: "Annual Meeting 2025",
    meeting_date: "2025-11-20T18:00:00Z",
    title: "2026 Operating Budget Approval",
    summary: "Approved the 2026 operating budget with monthly assessments remaining at current levels. Budget includes increased allocations for building maintenance and reserve contributions.",
    votes_for: 42,
    votes_against: 3,
    votes_abstain: 2,
    status: "approved",
    created_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "2",
    meeting_id: "2",
    meeting_title: "Annual Meeting 2025",
    meeting_date: "2025-11-20T18:00:00Z",
    title: "Responsible Governance Policies Adoption",
    summary: "Adopted comprehensive governance policies covering collections, enforcement, meetings, conflicts of interest, and records inspection. Policies prepared by Alpenglow Law, LLC to ensure CCIOA compliance.",
    votes_for: 45,
    votes_against: 1,
    votes_abstain: 1,
    status: "approved",
    created_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "3",
    meeting_id: "2",
    meeting_title: "Annual Meeting 2025",
    meeting_date: "2025-11-20T18:00:00Z",
    title: "Board Member Elections",
    summary: "Three board positions filled. Incumbents re-elected to continue serving the community.",
    votes_for: null,
    votes_against: null,
    votes_abstain: null,
    status: "approved",
    created_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "4",
    meeting_id: "3",
    meeting_title: "Board Meeting - October 2025",
    meeting_date: "2025-10-15T18:00:00Z",
    title: "Insurance Renewal 2025-2026",
    summary: "Approved renewal of master insurance policy through Mountain West Insurance with current coverage levels maintained. Property coverage at $22.4M guaranteed replacement cost.",
    votes_for: 5,
    votes_against: 0,
    votes_abstain: 0,
    status: "approved",
    created_at: "2025-10-15T00:00:00Z",
  },
  {
    id: "5",
    meeting_id: "4",
    meeting_title: "Board Meeting - September 2025",
    meeting_date: "2025-09-17T18:00:00Z",
    title: "Reserve Study Update",
    summary: "Approved engagement with reserve study firm to update the 30-year reserve analysis. Study to be completed by Q1 2026.",
    votes_for: 5,
    votes_against: 0,
    votes_abstain: 0,
    status: "approved",
    created_at: "2025-09-17T00:00:00Z",
  },
  {
    id: "6",
    meeting_id: "4",
    meeting_title: "Board Meeting - September 2025",
    meeting_date: "2025-09-17T18:00:00Z",
    title: "Exterior Painting Project",
    summary: "Approved three-year exterior painting schedule beginning spring 2026. Buildings to be painted in phases to distribute costs.",
    votes_for: 4,
    votes_against: 1,
    votes_abstain: 0,
    status: "approved",
    created_at: "2025-09-17T00:00:00Z",
  },
  {
    id: "7",
    meeting_id: "5",
    meeting_title: "Board Meeting - August 2025",
    meeting_date: "2025-08-20T18:00:00Z",
    title: "Pool Operating Hours Extension",
    summary: "Tabled discussion on extending pool hours for remainder of summer season pending safety review.",
    votes_for: 2,
    votes_against: 2,
    votes_abstain: 1,
    status: "tabled",
    created_at: "2025-08-20T00:00:00Z",
  },
];

export interface GetDecisionsOptions {
  meeting_id?: string;
  status?: DecisionStatus;
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getDecisions(
  options: GetDecisionsOptions = {}
): Promise<DecisionWithMeeting[]> {
  const { meeting_id, status, search, limit = 20, offset = 0 } = options;

  // TODO: Replace with Supabase query when database is connected
  let filtered = [...MOCK_DECISIONS];

  if (meeting_id) {
    filtered = filtered.filter((decision) => decision.meeting_id === meeting_id);
  }

  if (status) {
    filtered = filtered.filter((decision) => decision.status === status);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (decision) =>
        decision.title.toLowerCase().includes(searchLower) ||
        decision.summary?.toLowerCase().includes(searchLower)
    );
  }

  // Sort by date descending (most recent first)
  filtered.sort(
    (a, b) => new Date(b.meeting_date).getTime() - new Date(a.meeting_date).getTime()
  );

  return filtered.slice(offset, offset + limit);
}

export async function getDecisionById(
  id: string
): Promise<DecisionWithMeeting | null> {
  // TODO: Replace with Supabase query when database is connected
  const decision = MOCK_DECISIONS.find((d) => d.id === id);
  return decision || null;
}

export async function getDecisionsByMeeting(
  meetingId: string
): Promise<DecisionWithMeeting[]> {
  return getDecisions({ meeting_id: meetingId });
}

export async function getRecentDecisions(limit = 5): Promise<DecisionWithMeeting[]> {
  return getDecisions({ limit });
}

export function getDecisionStatusCounts(): Record<DecisionStatus, number> {
  const counts: Record<DecisionStatus, number> = {
    approved: 0,
    rejected: 0,
    tabled: 0,
  };

  for (const decision of MOCK_DECISIONS) {
    counts[decision.status]++;
  }

  return counts;
}
