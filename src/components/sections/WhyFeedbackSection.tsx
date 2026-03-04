'use client';

import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeading } from '@/components/ui/SectionWrapper';
import { staggerContainer, fadeUp, cardHover, viewportConfig } from '@/lib/animations';
import { whyFeedbackReasons } from '@/lib/constants';
import { TrendingUp, Shield, Globe, Zap } from 'lucide-react';
import { FloatingIconsBackground, demoIcons } from '@/components/ui/floating-icons-hero-section';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  TrendingUp,
  Shield,
  Globe,
  Zap,
};

export function WhyFeedbackSection() {
  return (
    <section id="why-feedback" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* Top Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 max-w-md h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      {/* Background: gradient */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

      {/* Floating Icons Background */}
      <FloatingIconsBackground icons={demoIcons} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 section-container">
        <SectionHeading
          badge="Why It Matters"
          title="Every Voice Drives Progress"
          subtitle="Your honest feedback isn't just words — it's the fuel that powers better products, stronger relationships, and continuous growth."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {whyFeedbackReasons.map((reason, index) => {
            const Icon = iconMap[reason.icon] || Zap;

            return (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group"
              >
                <motion.div
                  variants={cardHover}
                  className="glass-card p-6 sm:p-8 h-full flex flex-col items-start"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-300">
                    <Icon size={22} className="text-emerald-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-emerald-50 transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {reason.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-auto pt-6 w-full">
                    <div className="h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 group-hover:via-emerald-500/40 transition-all duration-500" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
