'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeading } from '@/components/ui/SectionWrapper';
import { projects } from '@/lib/constants';
export interface Review {
  _id: string;
  _creationTime: number;
  project_id: string;
  rating: number;
  review_text: string;
  name?: string;
  image_url?: string;
  storage_id?: string;
  country: string;
  consent_public: boolean;
}
import { TestimonialsColumn, type Testimonial } from '@/components/ui/testimonial-v2';

function getProjectName(projectId: string): string {
  const project = projects.find((p) => p.id === projectId);
  return project?.name || projectId;
}

import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export function TestimonialsSection() {
  const reviews = useQuery(api.reviews.getReviews, { limit: 9 });
  const loading = reviews === undefined;

  // Don't render section if loading or no reviews
  if (loading || !reviews || reviews.length === 0) return null;

  const mappedReviews: Testimonial[] = reviews.map((review: Review) => ({
    text: review.review_text,
    image: review.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name || 'Anonymous')}&background=random`,
    name: review.name || 'Anonymous',
    role: `${getProjectName(review.project_id)} • ${review.country || 'Global'}`,
    rating: review.rating,
  }));

  const firstColumn = mappedReviews.slice(0, 3);
  const secondColumn = mappedReviews.slice(3, 6);
  const thirdColumn = mappedReviews.slice(6, 9);

  return (
    <SectionWrapper id="testimonials">
      <SectionHeading
        badge="Wall of Love"
        title="What People Are Saying"
        subtitle="Real feedback from real people who have worked with me across the globe."
      />

      {loading ? (
        /* Skeleton loader for the animation columns */
        <div className="flex justify-center gap-6 mt-10 h-[500px] overflow-hidden opacity-50">
          <div className="w-full max-w-xs space-y-6">
            <div className="p-10 rounded-3xl border border-slate-800 bg-slate-900/50 h-64 animate-pulse"></div>
            <div className="p-10 rounded-3xl border border-slate-800 bg-slate-900/50 h-64 animate-pulse"></div>
          </div>
          <div className="w-full max-w-xs space-y-6 hidden md:block">
            <div className="p-10 rounded-3xl border border-slate-800 bg-slate-900/50 h-64 animate-pulse"></div>
            <div className="p-10 rounded-3xl border border-slate-800 bg-slate-900/50 h-64 animate-pulse"></div>
          </div>
          <div className="w-full max-w-xs space-y-6 hidden lg:block">
            <div className="p-10 rounded-3xl border border-slate-800 bg-slate-900/50 h-64 animate-pulse"></div>
            <div className="p-10 rounded-3xl border border-slate-800 bg-slate-900/50 h-64 animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          {secondColumn.length > 0 && (
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          )}
          {thirdColumn.length > 0 && (
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          )}
        </div>
      )}

      {/* Stats bar */}
      {!loading && reviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12 relative z-20"
        >
          <div className="text-center">
            <p className="text-2xl font-bold gradient-text">{reviews.length}+</p>
            <p className="text-xs text-slate-500 mt-1">Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold gradient-text">
              {(reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) / reviews.length).toFixed(1)}
            </p>
            <p className="text-xs text-slate-500 mt-1">Avg Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold gradient-text">
              {new Set(reviews.map((r: Review) => r.country)).size}
            </p>
            <p className="text-xs text-slate-500 mt-1">Countries</p>
          </div>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
