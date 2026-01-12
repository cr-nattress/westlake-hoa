-- Westlake Transparency Hub - Seed Data
-- Sample data for development and testing

SET search_path TO westlake, public;

-- ============================================
-- TAGS
-- ============================================

INSERT INTO westlake.tags (name) VALUES
  ('governance'),
  ('insurance'),
  ('collections'),
  ('enforcement'),
  ('meetings'),
  ('records'),
  ('financial'),
  ('rules');

-- ============================================
-- SAMPLE DOCUMENTS
-- ============================================

INSERT INTO westlake.documents (title, slug, type, status, summary, published_at) VALUES
(
  'Responsible Governance Policies',
  'responsible-governance-policies-2025',
  'policy',
  'current',
  'Comprehensive policies covering collections, enforcement, meetings, conflicts of interest, and records inspection. Adopted November 2025.',
  '2025-11-20'
),
(
  'Insurance Certificate 2025-2026',
  'insurance-certificate-2025-2026',
  'insurance',
  'current',
  'Annual insurance certificate showing coverage limits for property, liability, D&O, and umbrella policies. Policy period October 2024 to October 2025.',
  '2024-10-17'
),
(
  'Collections Policy',
  'collections-policy-2025',
  'policy',
  'current',
  'Procedures for assessment collection, late fees ($50-$250), payment plans (18+ months), interest (8%), and foreclosure protections under CCIOA.',
  '2025-11-20'
),
(
  'Covenant & Rule Enforcement Policy',
  'enforcement-policy-2025',
  'policy',
  'current',
  'Detailed enforcement procedures including notice requirements, hearing rights, fine caps ($500 for non-safety, unlimited for health/safety), and appeal processes.',
  '2025-11-20'
),
(
  'Records Inspection Policy',
  'records-inspection-policy-2025',
  'policy',
  'current',
  'Owner rights to inspect association records under CCIOA, request procedures, response timelines, and restricted records categories.',
  '2025-11-20'
);

-- ============================================
-- TAG ASSOCIATIONS
-- ============================================

-- Responsible Governance Policies
INSERT INTO westlake.document_tags (document_id, tag_id)
SELECT d.id, t.id FROM westlake.documents d, westlake.tags t
WHERE d.slug = 'responsible-governance-policies-2025'
AND t.name IN ('governance', 'collections', 'enforcement', 'records');

-- Insurance Certificate
INSERT INTO westlake.document_tags (document_id, tag_id)
SELECT d.id, t.id FROM westlake.documents d, westlake.tags t
WHERE d.slug = 'insurance-certificate-2025-2026'
AND t.name = 'insurance';

-- Collections Policy
INSERT INTO westlake.document_tags (document_id, tag_id)
SELECT d.id, t.id FROM westlake.documents d, westlake.tags t
WHERE d.slug = 'collections-policy-2025'
AND t.name IN ('collections', 'financial', 'governance');

-- Enforcement Policy
INSERT INTO westlake.document_tags (document_id, tag_id)
SELECT d.id, t.id FROM westlake.documents d, westlake.tags t
WHERE d.slug = 'enforcement-policy-2025'
AND t.name IN ('enforcement', 'rules', 'governance');

-- Records Policy
INSERT INTO westlake.document_tags (document_id, tag_id)
SELECT d.id, t.id FROM westlake.documents d, westlake.tags t
WHERE d.slug = 'records-inspection-policy-2025'
AND t.name IN ('records', 'governance');

-- ============================================
-- SAMPLE MEETINGS
-- ============================================

INSERT INTO westlake.meetings (title, type, date, location, summary) VALUES
(
  'Annual Meeting 2025',
  'annual',
  '2025-11-20 18:00:00-07:00',
  'Community Room',
  'Annual budget approval, board elections, and adoption of Responsible Governance Policies.'
),
(
  'Board Meeting - October 2025',
  'board',
  '2025-10-15 18:00:00-07:00',
  'Community Room',
  'Insurance renewal review, collections policy updates, and maintenance planning.'
),
(
  'Board Meeting - January 2026',
  'board',
  '2026-01-21 18:00:00-07:00',
  'Community Room',
  NULL -- Upcoming meeting, no summary yet
);

-- ============================================
-- SAMPLE DECISIONS
-- ============================================

INSERT INTO westlake.decisions (meeting_id, title, summary, votes_for, votes_against, votes_abstain, status)
SELECT
  m.id,
  'Adopt Responsible Governance Policies',
  'Motion to adopt the comprehensive Responsible Governance Policies prepared by Alpenglow Law.',
  5,
  0,
  0,
  'approved'
FROM westlake.meetings m
WHERE m.title = 'Annual Meeting 2025';

INSERT INTO westlake.decisions (meeting_id, title, summary, votes_for, votes_against, votes_abstain, status)
SELECT
  m.id,
  'Approve 2026 Annual Budget',
  'Motion to approve the proposed annual budget for fiscal year 2026.',
  5,
  0,
  0,
  'approved'
FROM westlake.meetings m
WHERE m.title = 'Annual Meeting 2025';

INSERT INTO westlake.decisions (meeting_id, title, summary, votes_for, votes_against, votes_abstain, status)
SELECT
  m.id,
  'Renew Insurance Policies',
  'Motion to renew all association insurance policies with Mountain West Insurance.',
  5,
  0,
  0,
  'approved'
FROM westlake.meetings m
WHERE m.title = 'Board Meeting - October 2025';
