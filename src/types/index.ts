export type DocumentType =
  | "declaration"
  | "bylaw"
  | "rule"
  | "policy"
  | "minutes"
  | "notice"
  | "insurance";

export type DocumentStatus = "current" | "superseded" | "draft";

export type MeetingType = "board" | "annual" | "special";

export type DecisionStatus = "approved" | "rejected" | "tabled";

export interface Document {
  id: string;
  title: string;
  slug: string;
  type: DocumentType;
  status: DocumentStatus;
  content?: string;
  summary?: string;
  fileUrl?: string;
  filePath?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  content?: string;
  changes?: string;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Meeting {
  id: string;
  title: string;
  type: MeetingType;
  date: string;
  agenda?: string;
  summary?: string;
  createdAt: string;
  documents?: Document[];
  decisions?: Decision[];
}

export interface Decision {
  id: string;
  meetingId: string;
  title: string;
  summary?: string;
  votesFor?: number;
  votesAgainst?: number;
  status: DecisionStatus;
  createdAt: string;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  createdAt: string;
}

export interface Citation {
  documentId: string;
  documentTitle: string;
  section?: string;
  excerpt: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon: string;
}
