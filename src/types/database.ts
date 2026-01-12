// Database types for Supabase
// These types match the schema defined in supabase/migrations/00001_initial_schema.sql

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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

export interface Database {
  westlake: {
    Tables: {
      documents: {
        Row: {
          id: string;
          title: string;
          slug: string;
          type: DocumentType;
          status: DocumentStatus;
          content: string | null;
          summary: string | null;
          file_url: string | null;
          file_path: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          type: DocumentType;
          status?: DocumentStatus;
          content?: string | null;
          summary?: string | null;
          file_url?: string | null;
          file_path?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          type?: DocumentType;
          status?: DocumentStatus;
          content?: string | null;
          summary?: string | null;
          file_url?: string | null;
          file_path?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      document_versions: {
        Row: {
          id: string;
          document_id: string;
          version: number;
          content: string | null;
          changes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          document_id: string;
          version: number;
          content?: string | null;
          changes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          document_id?: string;
          version?: number;
          content?: string | null;
          changes?: string | null;
          created_at?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      document_tags: {
        Row: {
          document_id: string;
          tag_id: string;
        };
        Insert: {
          document_id: string;
          tag_id: string;
        };
        Update: {
          document_id?: string;
          tag_id?: string;
        };
      };
      meetings: {
        Row: {
          id: string;
          title: string;
          type: MeetingType;
          date: string;
          location: string | null;
          agenda: string | null;
          summary: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          type: MeetingType;
          date: string;
          location?: string | null;
          agenda?: string | null;
          summary?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          type?: MeetingType;
          date?: string;
          location?: string | null;
          agenda?: string | null;
          summary?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      meeting_documents: {
        Row: {
          meeting_id: string;
          document_id: string;
        };
        Insert: {
          meeting_id: string;
          document_id: string;
        };
        Update: {
          meeting_id?: string;
          document_id?: string;
        };
      };
      decisions: {
        Row: {
          id: string;
          meeting_id: string;
          title: string;
          summary: string | null;
          votes_for: number | null;
          votes_against: number | null;
          votes_abstain: number | null;
          status: DecisionStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          meeting_id: string;
          title: string;
          summary?: string | null;
          votes_for?: number | null;
          votes_against?: number | null;
          votes_abstain?: number | null;
          status: DecisionStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          meeting_id?: string;
          title?: string;
          summary?: string | null;
          votes_for?: number | null;
          votes_against?: number | null;
          votes_abstain?: number | null;
          status?: DecisionStatus;
          created_at?: string;
        };
      };
      document_embeddings: {
        Row: {
          id: string;
          document_id: string;
          chunk_index: number;
          chunk_text: string;
          embedding: number[] | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          document_id: string;
          chunk_index: number;
          chunk_text: string;
          embedding?: number[] | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          document_id?: string;
          chunk_index?: number;
          chunk_text?: string;
          embedding?: number[] | null;
          metadata?: Json;
          created_at?: string;
        };
      };
    };
    Functions: {
      search_documents: {
        Args: {
          query_embedding: number[];
          match_threshold?: number;
          match_count?: number;
        };
        Returns: {
          document_id: string;
          document_title: string;
          document_type: DocumentType;
          chunk_text: string;
          chunk_index: number;
          similarity: number;
        }[];
      };
      search_documents_text: {
        Args: {
          search_query: string;
          limit_count?: number;
        };
        Returns: {
          id: string;
          title: string;
          type: DocumentType;
          status: DocumentStatus;
          summary: string | null;
          published_at: string | null;
          rank: number;
        }[];
      };
    };
  };
}

// Helper types for easier use
export type Document = Database["westlake"]["Tables"]["documents"]["Row"];
export type DocumentInsert = Database["westlake"]["Tables"]["documents"]["Insert"];
export type Meeting = Database["westlake"]["Tables"]["meetings"]["Row"];
export type Decision = Database["westlake"]["Tables"]["decisions"]["Row"];
export type Tag = Database["westlake"]["Tables"]["tags"]["Row"];
export type DocumentEmbedding = Database["westlake"]["Tables"]["document_embeddings"]["Row"];
