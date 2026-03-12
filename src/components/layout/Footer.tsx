'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/constants';
import { fadeUp, viewportConfig } from '@/lib/animations';
import { Github, Linkedin, Instagram, Coffee, Heart, ArrowUpRight, Mail, Send } from 'lucide-react';

const socialIcons: Record<string, React.FC<{ size?: number; className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  coffee: Coffee,
};

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import toast from 'react-hot-toast';

export function FooterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const subscribe = useMutation(api.reviews.subscribe);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    try {
      await subscribe({ email });
      toast.success('Thanks for connecting!');
      setEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
            {/* Brand column */}
            <div className="md:col-span-2 lg:col-span-4 lg:pr-8">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center">
                  <img src="/logo.png" alt="Feedback Wall Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] transform -rotate-3 hover:rotate-0 transition-transform duration-300" />
                </div>
                <span className="font-bold text-white text-lg sm:text-xl tracking-tight -ml-1 sm:-ml-2">
                  {siteConfig.name}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
                A personal space to collect honest feedback from my clients and collaborators. Your thoughts help me improve my craft.
              </p>
              <a
                href={`mailto:siddiquegulfam703@gmail.com`}
                className="inline-flex items-center gap-1.5 text-sm text-emerald-400/80 hover:text-emerald-400 transition-colors"
              >
                <Mail size={14} />
                Get in touch
              </a>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Home', href: '#hero' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Give Feedback', href: '#feedback' },
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
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-white mb-6">Connect</h4>
              <ul className="space-y-3">
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

            {/* Stay Connected */}
            <div className="md:col-span-2 lg:col-span-4">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                Stay<br />Connected
              </h3>
              <p className="text-sm text-slate-400 mb-6 max-w-sm">
                Join our newsletter for the latest updates and exclusive offers.
              </p>

              <form onSubmit={handleSubscribe} className="relative group max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubscribing}
                  className="w-full bg-transparent border border-slate-700/80 rounded-xl px-4 py-3.5 pr-14 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-slate-100 text-slate-900 rounded-lg aspect-square flex items-center justify-center hover:bg-emerald-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  {isSubscribing ? (
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={15} className="-translate-x-[1px] translate-y-[1px]" />
                  )}
                </button>
              </form>
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
              Made with <Heart size={11} className="text-emerald-500 fill-emerald-500 mx-1" /> by Gulfam
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
