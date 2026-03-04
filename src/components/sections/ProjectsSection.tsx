'use client';

import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeading } from '@/components/ui/SectionWrapper';
import { staggerContainer, fadeUp, cardHover, viewportConfig } from '@/lib/animations';
import { projects, type Project } from '@/lib/constants';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card-effect';
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
    <motion.div variants={fadeUp} className="group h-full">
      <CardContainer containerClassName="h-full w-full py-0" className="h-full w-full">
        <CardBody className="glass-card overflow-hidden h-full w-full flex flex-col group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] transition-all duration-300">
          {/* Gradient header stripe */}
          <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

          <div className="p-6 sm:p-7 flex flex-col flex-grow">
            {/* Icon */}
            <div className="flex items-start justify-between mb-5">
              <CardItem translateZ="30" className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center border border-white/[0.06] overflow-hidden`}>
                {project.logoUrl ? (
                  <img src={project.logoUrl} alt={`${project.name} Logo`} className="w-8 h-8 object-contain" />
                ) : (
                  <Icon size={20} className="text-white/90" />
                )}
              </CardItem>
            </div>

            {/* Name */}
            <CardItem translateZ="40" className="text-lg font-semibold text-white mb-2 group-hover/card:text-emerald-50 transition-colors">
              {project.name}
            </CardItem>

            {/* Description */}
            <CardItem as="p" translateZ="50" className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3">
              {project.description}
            </CardItem>

            {/* Image */}
            {project.image && (
              <CardItem translateZ="80" className="w-full mb-6">
                <img
                  src={project.image}
                  className="h-40 w-full object-cover rounded-xl border border-white/[0.05] group-hover/card:shadow-xl group-hover/card:border-emerald-500/20 transition-all duration-300"
                  alt={project.name}
                />
              </CardItem>
            )}

            {/* Tech tags */}
            <CardItem translateZ="60" className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[11px] font-medium text-slate-400 bg-slate-800/60 border border-slate-700/40 rounded-lg group-hover/card:border-emerald-500/20 group-hover/card:text-slate-300 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </CardItem>

            {/* Live Link */}
            {project.url && (
              <CardItem translateZ="30" className="mt-auto pt-4 border-t border-slate-800/60 flex justify-end w-full">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-full"
                >
                  <span>Visit Live Site</span>
                  <ExternalLink size={12} />
                </a>
              </CardItem>
            )}
          </div>
        </CardBody>
      </CardContainer>
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
