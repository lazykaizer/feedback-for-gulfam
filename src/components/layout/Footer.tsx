'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/constants';
import { fadeUp, viewportConfig } from '@/lib/animations';
import { Github, Linkedin, Twitter, Heart, ArrowUpRight, Mail } from 'lucide-react';

const socialIcons: Record<string, React.FC<{ size?: number; className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export function FooterSection() {
  return (
    <footer className="relative border-t border-emerald-500/10 bg-slate-950">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 max-w-lg h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="section-container py-16 sm:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Main footer grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-emerald-sm">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="font-semibold text-white text-base tracking-tight">
                  {siteConfig.name}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                Premium feedback collection for freelance developers. Built with trust, powered by honest feedback.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'Home', href: '#hero' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Give Feedback', href: '#feedback' },
                  { label: 'Testimonials', href: '#testimonials' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2.5">
                {Object.entries(siteConfig.author.socials).map(([platform, url]) => {
                  const Icon = socialIcons[platform] || Github;
                  return (
                    <li key={platform}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-500 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group capitalize"
                      >
                        <Icon size={14} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                        {platform}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">About</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">
                {siteConfig.author.title}
              </p>
              <a
                href={`mailto:contact@devfeedback.pro`}
                className="inline-flex items-center gap-1.5 text-sm text-emerald-400/80 hover:text-emerald-400 transition-colors"
              >
                <Mail size={13} />
                Get in touch
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-8" />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} {siteConfig.author.name}. All rights reserved.
            </p>

            <p className="text-xs text-slate-600 flex items-center gap-1">
              Made with <Heart size={11} className="text-emerald-500 fill-emerald-500" /> using Next.js &amp; Supabase
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
