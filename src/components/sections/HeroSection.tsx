'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, floating, easings } from '@/lib/animations';
import { siteConfig } from '@/lib/constants';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background: gradient + animated orbs */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/[0.07] rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/[0.05] rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/30 rounded-full blur-[120px]"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Main content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 section-container text-center pt-20"
      >
        {/* Status badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Open for Feedback — {new Date().getFullYear()}
          </span>
        </motion.div>

        {/* Avatar with floating animation */}
        <motion.div variants={fadeUp} className="mb-8 flex justify-center">
          <motion.div
            variants={floating}
            animate="animate"
            className="relative"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-[2px] shadow-emerald-lg">
              <div className="w-full h-full rounded-3xl bg-slate-900 flex items-center justify-center overflow-hidden">
                <span className="text-4xl sm:text-5xl font-bold gradient-text">
                  {siteConfig.author.name.charAt(0)}
                </span>
              </div>
            </div>
            {/* Glow ring */}
            <div className="absolute -inset-2 rounded-3xl bg-emerald-500/10 blur-xl -z-10 animate-pulse-glow" />
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
        >
          <span className="gradient-text-white">Your Feedback</span>
          <br />
          <span className="gradient-text">Shapes My Craft</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed text-balance"
        >
          {siteConfig.author.bio}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-sm text-slate-500 mb-10"
        >
          Takes less than 30 seconds • No login required • 100% anonymous option
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="#feedback" className="btn-primary text-base px-10 py-4">
            Share Your Experience
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
          <a href="#projects" className="btn-secondary">
            View Projects
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
          {[
            { icon: Github, href: siteConfig.author.socials.github },
            { icon: Linkedin, href: siteConfig.author.socials.linkedin },
            { icon: Twitter, href: siteConfig.author.socials.twitter },
          ].map(({ icon: Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors duration-200"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp}
          className="mt-16 sm:mt-20"
        >
          <motion.a
            href="#why-feedback"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex flex-col items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors"
          >
            <span className="text-xs font-medium">Scroll to explore</span>
            <ArrowDown size={16} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
