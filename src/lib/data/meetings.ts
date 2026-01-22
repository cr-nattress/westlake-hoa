import type { Meeting, MeetingType } from "@/types/database";

// Mock meetings for development
const MOCK_MEETINGS: Meeting[] = [
  {
    id: "6",
    title: "Annual Meeting 2026",
    type: "annual",
    date: "2026-01-27T16:00:00Z",
    location: "Zoom Meeting (Meeting ID: 853 7609 1591, Passcode: 322501)",
    agenda: "A. Introduction of those in attendance and Proxy certification/Quorum\nB. Approval of 2024 meeting minutes\nC. Financial review and Approval of 2026 Proposed budget\nD. Current business\nE. New business\nF. Election of Directors\nG. Adjournment",
    summary: "Notice issued January 12, 2026. If you cannot be present, please sign the membership proxy and email to: amy@boldsolutions.net. Meeting materials include: proxy form, Board application, and 2024 annual owner meeting minutes.",
    created_at: "2026-01-12T00:00:00Z",
    updated_at: "2026-01-12T00:00:00Z",
  },
  {
    id: "1",
    title: "Board Meeting - January 2026",
    type: "board",
    date: "2026-01-15T18:00:00Z",
    location: "Community Room",
    agenda: "1. Call to Order\n2. Approval of Previous Minutes\n3. Financial Report\n4. Old Business\n5. New Business\n6. Homeowner Forum\n7. Adjournment",
    summary: null,
    created_at: "2025-12-01T00:00:00Z",
    updated_at: "2025-12-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Annual Meeting 2025",
    type: "annual",
    date: "2025-11-20T18:00:00Z",
    location: "Community Room",
    agenda: "1. Call to Order\n2. Proof of Notice and Quorum\n3. Minutes Approval\n4. Financial Report\n5. 2026 Budget Presentation and Ratification\n6. Board Elections\n7. Governance Policy Adoption\n8. Open Forum\n9. Adjournment",
    summary: "Annual budget approved for 2026. Three board members elected. Comprehensive governance policies adopted including collections, enforcement, meetings, conflicts of interest, and records inspection procedures. Prepared by Alpenglow Law, LLC.",
    created_at: "2025-11-20T00:00:00Z",
    updated_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "3",
    title: "Board Meeting - October 2025",
    type: "board",
    date: "2025-10-15T18:00:00Z",
    location: "Community Room",
    agenda: null,
    summary: "Insurance renewal review and collections policy updates. Board reviewed proposals from Mountain West Insurance for 2025-2026 policy year. Discussed updates to collections procedures in preparation for annual meeting.",
    created_at: "2025-10-15T00:00:00Z",
    updated_at: "2025-10-15T00:00:00Z",
  },
  {
    id: "4",
    title: "Board Meeting - September 2025",
    type: "board",
    date: "2025-09-17T18:00:00Z",
    location: "Community Room",
    agenda: null,
    summary: "Budget planning for 2026. Review of reserve study recommendations. Discussion of building maintenance priorities including exterior painting and roof inspections.",
    created_at: "2025-09-17T00:00:00Z",
    updated_at: "2025-09-17T00:00:00Z",
  },
  {
    id: "5",
    title: "Board Meeting - August 2025",
    type: "board",
    date: "2025-08-20T18:00:00Z",
    location: "Community Room",
    agenda: null,
    summary: "Summer maintenance review. Pool season wrap-up planning. Discussion of landscaping improvements for common areas.",
    created_at: "2025-08-20T00:00:00Z",
    updated_at: "2025-08-20T00:00:00Z",
  },
];

export interface GetMeetingsOptions {
  type?: MeetingType;
  upcoming?: boolean;
  past?: boolean;
  limit?: number;
  offset?: number;
}

export async function getMeetings(
  options: GetMeetingsOptions = {}
): Promise<Meeting[]> {
  const { type, upcoming, past, limit = 20, offset = 0 } = options;

  // TODO: Replace with Supabase query when database is connected
  let filtered = [...MOCK_MEETINGS];
  const now = new Date();

  if (type) {
    filtered = filtered.filter((meeting) => meeting.type === type);
  }

  if (upcoming) {
    filtered = filtered.filter((meeting) => new Date(meeting.date) >= now);
    // Sort upcoming by date ascending
    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  if (past) {
    filtered = filtered.filter((meeting) => new Date(meeting.date) < now);
    // Sort past by date descending
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return filtered.slice(offset, offset + limit);
}

export async function getMeetingById(id: string): Promise<Meeting | null> {
  // TODO: Replace with Supabase query when database is connected
  const meeting = MOCK_MEETINGS.find((m) => m.id === id);
  return meeting || null;
}

export async function getUpcomingMeetings(limit = 5): Promise<Meeting[]> {
  return getMeetings({ upcoming: true, limit });
}

export async function getPastMeetings(limit = 10): Promise<Meeting[]> {
  return getMeetings({ past: true, limit });
}

export function getMeetingTypeCounts(): Record<MeetingType, number> {
  const counts: Record<MeetingType, number> = {
    board: 0,
    annual: 0,
    special: 0,
  };

  for (const meeting of MOCK_MEETINGS) {
    counts[meeting.type]++;
  }

  return counts;
}
