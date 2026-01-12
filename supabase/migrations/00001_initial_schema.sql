-- Westlake Transparency Hub - Initial Database Schema
-- This migration creates the core tables for the HOA transparency platform

-- Enable required extensions
-- Note: gen_random_uuid() is built-in to PostgreSQL 13+ and Supabase
CREATE EXTENSION IF NOT EXISTS "vector";

-- Create dedicated schema for the application
CREATE SCHEMA IF NOT EXISTS westlake;

-- Set search path
SET search_path TO westlake, public;

-- ============================================
-- ENUM TYPES
-- ============================================

-- Document types
CREATE TYPE westlake.document_type AS ENUM (
  'declaration',
  'bylaw',
  'rule',
  'policy',
  'minutes',
  'notice',
  'insurance'
);

-- Document status
CREATE TYPE westlake.document_status AS ENUM (
  'current',
  'superseded',
  'draft'
);

-- Meeting types
CREATE TYPE westlake.meeting_type AS ENUM (
  'board',
  'annual',
  'special'
);

-- Decision status
CREATE TYPE westlake.decision_status AS ENUM (
  'approved',
  'rejected',
  'tabled'
);

-- ============================================
-- CORE TABLES
-- ============================================

-- Documents table - stores all HOA documents
CREATE TABLE westlake.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type westlake.document_type NOT NULL,
  status westlake.document_status DEFAULT 'current',
  content TEXT,
  summary TEXT,
  file_url TEXT,
  file_path TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document versions for version history
CREATE TABLE westlake.document_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES westlake.documents(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  content TEXT,
  changes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags for document categorization
CREATE TABLE westlake.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document-tag junction table
CREATE TABLE westlake.document_tags (
  document_id UUID REFERENCES westlake.documents(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES westlake.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (document_id, tag_id)
);

-- Meetings table
CREATE TABLE westlake.meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type westlake.meeting_type NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  location TEXT,
  agenda TEXT,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Meeting-document junction table
CREATE TABLE westlake.meeting_documents (
  meeting_id UUID REFERENCES westlake.meetings(id) ON DELETE CASCADE,
  document_id UUID REFERENCES westlake.documents(id) ON DELETE CASCADE,
  PRIMARY KEY (meeting_id, document_id)
);

-- Decisions from meetings
CREATE TABLE westlake.decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID REFERENCES westlake.meetings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT,
  votes_for INTEGER,
  votes_against INTEGER,
  votes_abstain INTEGER,
  status westlake.decision_status NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- VECTOR SEARCH (RAG)
-- ============================================

-- Document embeddings for AI-powered search
CREATE TABLE westlake.document_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES westlake.documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  chunk_text TEXT NOT NULL,
  embedding vector(1536), -- OpenAI text-embedding-ada-002 dimensions
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Document indexes
CREATE INDEX idx_documents_type ON westlake.documents(type);
CREATE INDEX idx_documents_status ON westlake.documents(status);
CREATE INDEX idx_documents_slug ON westlake.documents(slug);
CREATE INDEX idx_documents_published_at ON westlake.documents(published_at DESC);

-- Full-text search index on documents
CREATE INDEX idx_documents_search ON westlake.documents
USING gin(to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, '') || ' ' || coalesce(summary, '')));

-- Meeting indexes
CREATE INDEX idx_meetings_type ON westlake.meetings(type);
CREATE INDEX idx_meetings_date ON westlake.meetings(date DESC);

-- Decision indexes
CREATE INDEX idx_decisions_meeting ON westlake.decisions(meeting_id);
CREATE INDEX idx_decisions_status ON westlake.decisions(status);

-- Vector similarity search index
CREATE INDEX idx_document_embeddings_vector ON westlake.document_embeddings
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ============================================
-- TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION westlake.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to documents
CREATE TRIGGER tr_documents_updated_at
  BEFORE UPDATE ON westlake.documents
  FOR EACH ROW
  EXECUTE FUNCTION westlake.update_updated_at();

-- Apply trigger to meetings
CREATE TRIGGER tr_meetings_updated_at
  BEFORE UPDATE ON westlake.meetings
  FOR EACH ROW
  EXECUTE FUNCTION westlake.update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE westlake.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE westlake.document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE westlake.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE westlake.document_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE westlake.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE westlake.meeting_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE westlake.decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE westlake.document_embeddings ENABLE ROW LEVEL SECURITY;

-- Public read access policies (transparency by default)
CREATE POLICY "Public read access" ON westlake.documents
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON westlake.document_versions
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON westlake.tags
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON westlake.document_tags
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON westlake.meetings
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON westlake.meeting_documents
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON westlake.decisions
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON westlake.document_embeddings
  FOR SELECT USING (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to search documents using vector similarity
CREATE OR REPLACE FUNCTION westlake.search_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  document_id UUID,
  document_title TEXT,
  document_type westlake.document_type,
  chunk_text TEXT,
  chunk_index INTEGER,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    de.document_id,
    d.title as document_title,
    d.type as document_type,
    de.chunk_text,
    de.chunk_index,
    1 - (de.embedding <=> query_embedding) AS similarity
  FROM westlake.document_embeddings de
  JOIN westlake.documents d ON d.id = de.document_id
  WHERE 1 - (de.embedding <=> query_embedding) > match_threshold
  ORDER BY de.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Function for full-text search
CREATE OR REPLACE FUNCTION westlake.search_documents_text(
  search_query TEXT,
  limit_count INTEGER DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  type westlake.document_type,
  status westlake.document_status,
  summary TEXT,
  published_at TIMESTAMPTZ,
  rank REAL
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.title,
    d.type,
    d.status,
    d.summary,
    d.published_at,
    ts_rank(
      to_tsvector('english', coalesce(d.title, '') || ' ' || coalesce(d.content, '') || ' ' || coalesce(d.summary, '')),
      plainto_tsquery('english', search_query)
    ) AS rank
  FROM westlake.documents d
  WHERE to_tsvector('english', coalesce(d.title, '') || ' ' || coalesce(d.content, '') || ' ' || coalesce(d.summary, ''))
    @@ plainto_tsquery('english', search_query)
  ORDER BY rank DESC
  LIMIT limit_count;
END;
$$;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON SCHEMA westlake IS 'Westlake Village HOA Transparency Hub application schema';
COMMENT ON TABLE westlake.documents IS 'Official HOA documents including declarations, bylaws, policies, and meeting minutes';
COMMENT ON TABLE westlake.document_embeddings IS 'Vector embeddings for RAG-based document search';
COMMENT ON TABLE westlake.meetings IS 'Board and community meetings';
COMMENT ON TABLE westlake.decisions IS 'Decisions made at meetings with voting records';
COMMENT ON FUNCTION westlake.search_documents IS 'Search documents using vector similarity for AI-powered Q&A';
