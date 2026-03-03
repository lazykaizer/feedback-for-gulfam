-- ═══════════════════════════════════════════════════════
-- DevFeedback Pro — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ═══════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Reviews Table ──
CREATE TABLE IF NOT EXISTS public.reviews (
  id             UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id     TEXT NOT NULL,
  rating         INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text    TEXT NOT NULL CHECK (char_length(review_text) <= 300),
  name           TEXT,
  image_url      TEXT,
  country        TEXT NOT NULL,
  consent_public BOOLEAN DEFAULT false,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- ── Indexes for common queries ──
CREATE INDEX IF NOT EXISTS idx_reviews_project_id ON public.reviews (project_id);
CREATE INDEX IF NOT EXISTS idx_reviews_consent_public ON public.reviews (consent_public);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_country ON public.reviews (country);

-- ── Row-Level Security ──
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public form)
CREATE POLICY "Allow anonymous inserts"
  ON public.reviews
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only consented reviews are publicly readable
CREATE POLICY "Allow public read of consented reviews"
  ON public.reviews
  FOR SELECT
  TO anon
  USING (consent_public = true);

-- Service role can do everything (for admin dashboard)
CREATE POLICY "Service role full access"
  ON public.reviews
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ── Storage Bucket for profile images ──
INSERT INTO storage.buckets (id, name, public)
VALUES ('review-images', 'review-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads to review-images bucket
CREATE POLICY "Allow public uploads to review-images"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'review-images');

-- Allow public reads from review-images bucket
CREATE POLICY "Allow public reads from review-images"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'review-images');

-- ═══════════════════════════════════════════════════════
-- ANALYTICS VIEWS (Phase 2 — Admin Dashboard)
-- ═══════════════════════════════════════════════════════

-- Average rating per project
CREATE OR REPLACE VIEW public.project_stats AS
SELECT
  project_id,
  COUNT(*)::int AS total_reviews,
  ROUND(AVG(rating)::numeric, 2) AS avg_rating,
  COUNT(DISTINCT country)::int AS country_count,
  MAX(created_at) AS latest_review
FROM public.reviews
GROUP BY project_id;

-- Country breakdown
CREATE OR REPLACE VIEW public.country_stats AS
SELECT
  country,
  COUNT(*)::int AS total_reviews,
  ROUND(AVG(rating)::numeric, 2) AS avg_rating
FROM public.reviews
GROUP BY country
ORDER BY total_reviews DESC;
