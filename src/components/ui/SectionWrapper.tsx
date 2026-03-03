'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Whether to add the top gradient divider */
  divider?: boolean;
}

/**
 * Consistent section wrapper with optional gradient divider.
 * Provides proper padding, max-width, and scroll-snap alignment.
 */
export function SectionWrapper({ id, children, className, divider = true }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn('relative py-20 sm:py-28 lg:py-32', className)}
    >
      {divider && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 max-w-md h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      )}
      <div className="section-container">{children}</div>
    </section>
  );
}

/** Animated section heading with badge, title, and subtitle */
export function SectionHeading({
  badge,
  title,
  subtitle,
  center = true,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className={cn('mb-12 sm:mb-16', center && 'text-center')}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-white text-balance leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto text-balance leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
