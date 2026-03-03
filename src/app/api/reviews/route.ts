import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// ─── Simple in-memory rate limiter ───
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '10', 10);
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ─── Basic spam detection ───
function isSpam(text: string): boolean {
  const spamPatterns = [
    /https?:\/\//gi,           // URLs
    /\b(buy|cheap|free|click)\b/gi, // Common spam words
    /(.)\1{5,}/g,              // Repeated chars (aaaaaa)
  ];
  return spamPatterns.some((p) => p.test(text));
}

// ─── POST /api/reviews ───
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const formData = await request.formData();

    const projectId = formData.get('projectId') as string;
    const rating = parseInt(formData.get('rating') as string, 10);
    const reviewText = (formData.get('reviewText') as string)?.trim();
    const name = (formData.get('name') as string)?.trim() || null;
    const country = formData.get('country') as string;
    const consentPublic = formData.get('consentPublic') === 'true';
    const imageFile = formData.get('image') as File | null;

    // ── Validation ──
    if (!projectId || !rating || !reviewText || !country) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5.' },
        { status: 400 }
      );
    }

    if (reviewText.length > 300) {
      return NextResponse.json(
        { error: 'Review must be 300 characters or fewer.' },
        { status: 400 }
      );
    }

    if (isSpam(reviewText)) {
      return NextResponse.json(
        { error: 'Your review was flagged as spam. Please try again with genuine feedback.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    let imageUrl: string | null = null;

    // ── Image Upload ──
    if (imageFile && imageFile.size > 0) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { error: 'Only JPEG, PNG, and WebP images are allowed.' },
          { status: 400 }
        );
      }

      // Validate file size (2MB max)
      if (imageFile.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Image must be smaller than 2MB.' },
          { status: 400 }
        );
      }

      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('review-images')
        .upload(fileName, imageFile, {
          contentType: imageFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        // Continue without image — non-critical failure
      } else {
        const { data: urlData } = supabase.storage
          .from('review-images')
          .getPublicUrl(uploadData.path);
        imageUrl = urlData.publicUrl;
      }
    }

    // ── Insert Review ──
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        project_id: projectId,
        rating,
        review_text: reviewText,
        name,
        image_url: imageUrl,
        country,
        consent_public: consentPublic,
      } as any)
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save review. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Review submitted successfully', review: data },
      { status: 201 }
    );
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// ─── GET /api/reviews (public testimonials) ───
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100);

    const supabase = createServerClient();

    let query = supabase
      .from('reviews')
      .select('*')
      .eq('consent_public', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (projectId) {
      query = query.eq('project_id', projectId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database query error:', error);
      return NextResponse.json({ error: 'Failed to fetch reviews.' }, { status: 500 });
    }

    return NextResponse.json({ reviews: data }, { status: 200 });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
