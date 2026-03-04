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
        <a href="#hero" className="flex items-center group">
          <div className="flex items-center justify-center">
            <img src="/logo.png" alt="Feedback Wall Logo" className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] transform -rotate-3 group-hover:rotate-0 transition-transform duration-300" />
          </div>
          <span className="font-bold text-white text-xl sm:text-2xl tracking-tight -ml-1 sm:-ml-2">
            {siteConfig.name}
          </span>
        </a>

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
