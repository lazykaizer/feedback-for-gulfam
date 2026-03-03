'use client';

import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeading } from '@/components/ui/SectionWrapper';
import { staggerContainer, fadeUp, cardHover, viewportConfig } from '@/lib/animations';
import { projects, type Project } from '@/lib/constants';
import {
  ShoppingCart,
  BarChart3,
  Heart,
  Sparkles,
  Layout,
  MessageCircle,
  Briefcase,
  ExternalLink,
  Shirt,
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  ShoppingCart,
  BarChart3,
  Heart,
  Sparkles,
  Layout,
  MessageCircle,
  Briefcase,
  Shirt,
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = iconMap[project.icon] || Sparkles;

  return (
    <motion.div variants={fadeUp} className="group">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardHover}
        className="glass-card overflow-hidden h-full"
      >
        {/* Gradient header stripe */}
        <div className={`h-1 bg-gradient-to-r ${project.gradient}`} />

        <div className="p-6 sm:p-7">
          {/* Icon + project number */}
          <div className="flex items-start justify-between mb-5">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center border border-white/[0.06]`}>
              <Icon size={20} className="text-white/90" />
            </div>
            <span className="text-xs font-mono text-slate-600">
              #{String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-50 transition-colors">
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-medium text-slate-400 bg-slate-800/60 border border-slate-700/40 rounded-lg group-hover:border-emerald-500/20 group-hover:text-slate-300 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Live Link */}
          {project.url && (
            <div className="mt-auto pt-4 border-t border-slate-800/60 flex justify-end">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-full"
              >
                <span>Visit Live Site</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <SectionHeading
        badge="Portfolio"
        title="Projects I've Delivered"
        subtitle="Each project represents real-world impact. Select one below when sharing your feedback."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
