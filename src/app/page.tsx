'use client';

import { MouseTracker } from '@/components/ui/MouseTracker';
import { Cursor } from '@/components/ui/inverted-cursor';
import { Navbar } from '@/components/layout/Navbar';
import { GlassRefractionHero } from '@/components/ui/glass-refraction-hero';
import { WhyFeedbackSection } from '@/components/sections/WhyFeedbackSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FeedbackFormSection } from '@/components/sections/FeedbackFormSection';
import { FooterSection } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/ui/FloatingCTA';
import { Toaster } from 'react-hot-toast';
import { siteConfig } from '@/lib/constants';

export default function Home() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MouseTracker>
      <Cursor />
      <Toaster
        position="top-center"
        toastOptions={{
          className: '!bg-slate-800 !text-slate-200 !border !border-slate-700/50 !shadow-lg',
          duration: 4000,
        }}
      />
      
      <Navbar />
      
      <main className="relative">
        <GlassRefractionHero
          title="Your Feedback Shapes My Craft"
          description={siteConfig.author.bio}
          primaryAction={{
            label: 'Share Your Experience',
            onClick: () => scrollTo('feedback'),
          }}
          secondaryAction={{
            label: 'View Projects',
            onClick: () => scrollTo('projects'),
          }}
        />
        <WhyFeedbackSection />
        <ProjectsSection />
        <FeedbackFormSection />
        <TestimonialsSection />
      </main>
      
      <FooterSection />
      <FloatingCTA />
    </MouseTracker>
  );
}
