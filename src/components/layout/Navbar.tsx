'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/constants';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Projects', href: '#projects' },
    { label: 'Feedback', href: '#feedback' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.04] shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="section-container flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-emerald-sm group-hover:shadow-emerald-md transition-shadow duration-300">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-semibold text-white text-sm sm:text-base tracking-tight">
            {siteConfig.name}
          </span>
        </a>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#feedback"
          className="btn-primary !px-5 !py-2.5 !text-xs sm:!text-sm"
        >
          Give Feedback
        </a>
      </div>
    </motion.nav>
  );
}
