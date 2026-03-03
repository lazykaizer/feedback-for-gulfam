-- ═══════════════════════════════════════════════════════
-- DevFeedback Pro — Seed Data for Development
-- ═══════════════════════════════════════════════════════

INSERT INTO public.reviews (project_id, rating, review_text, name, country, consent_public)
VALUES
  ('project-alpha', 5, 'Incredible work on the e-commerce platform. Performance is blazing fast and the UX is top-notch. Would absolutely recommend!', 'Sarah Chen', 'United States', true),
  ('project-beta',  4, 'The dashbaord analytics are really powerful. Clean design and the real-time updates work flawlessly. Minor suggestion: add export to PDF.', 'Marcus Weber', 'Germany', true),
  ('project-gamma', 5, 'The fitness app changed how I track my workouts. Beautiful UI and the social features keep me motivated every day.', 'Priya Sharma', 'India', true),
  ('project-delta', 5, 'AI content engine saved our team hours every week. The SEO suggestions alone are worth it. Exceptional quality.', 'James O''Brien', 'United Kingdom', true),
  ('project-epsilon', 4, 'Portfolio builder was exactly what I needed. Drag and drop is intuitive and the templates are gorgeous. Love it!', 'Yuki Tanaka', 'Japan', true),
  ('project-zeta', 5, 'End-to-end encryption and the clean UI make this the best team chat tool I''ve used. Replaced Slack for our startup.', 'Carlos Rodriguez', 'Spain', true),
  ('project-alpha', 4, 'Quick delivery, great communication. The inventory system works perfectly for our needs. Solid work!', NULL, 'Canada', true),
  ('project-beta',  5, 'Best dashboard I have seen. The attention to detail is remarkable. Worth every penny.', 'Ali Hassan', 'Pakistan', true);
