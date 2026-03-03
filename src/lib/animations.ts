/* ═══════════════════════════════════════════════════════
   Framer Motion — Reusable Animation Variants
   ═══════════════════════════════════════════════════════ */

import type { Variants } from 'framer-motion';

/** Standard easing curves */
export const easings = {
  easeOutQuart: [0.25, 1, 0.5, 1] as const,
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  spring: { type: 'spring' as const, stiffness: 100, damping: 15 },
  springBouncy: { type: 'spring' as const, stiffness: 200, damping: 12 },
};

/** Container that staggers its children */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/** Fade up from below */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.easeOutQuart },
  },
};

/** Fade in with scale */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easings.easeOutQuart },
  },
};

/** Slide in from left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.easeOutQuart },
  },
};

/** Slide in from right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.easeOutQuart },
  },
};

/** Card hover lift effect */
export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.3, ease: easings.easeOutQuart },
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 20px 60px -10px rgba(16, 185, 129, 0.15), 0 8px 24px -6px rgba(0, 0, 0, 0.3)',
    transition: { duration: 0.3, ease: easings.easeOutQuart },
  },
};

/** Success checkmark draw animation */
export const checkmarkDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeInOut', delay: 0.2 },
  },
};

/** Floating animation for decorative elements */
export const floating: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/** Pulse glow effect */
export const pulseGlow: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px -5px rgba(16, 185, 129, 0.2)',
      '0 0 40px -5px rgba(16, 185, 129, 0.5)',
      '0 0 20px -5px rgba(16, 185, 129, 0.2)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/** Viewport detection settings for scroll-triggered animations */
export const viewportConfig = {
  once: true,
  margin: '-80px',
  amount: 0.3 as const,
};
