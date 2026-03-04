/* ═══════════════════════════════════════════════════════
   Constants — Projects, Countries, Site Config
   ═══════════════════════════════════════════════════════ */

export const siteConfig = {
  name: 'Feedback Wall',
  description:
    'A personal space to collect honest feedback from my clients and collaborators. Your thoughts help me improve my craft.',
  url: 'https://feedbackwall.pro',
  author: {
    name: 'Gulfam Siddique',
    title: 'Software Engineer & Digital Creator',
    bio: 'I build high-performance web applications and digital experiences. Your feedback is the catalyst for my continuous learning.',
    avatarUrl: '/avatar.jpg',
    socials: {
      github: 'https://github.com/lazykaizer',
      linkedin: 'https://www.linkedin.com/in/gulfam-siddique/',
      instagram: 'https://instagram.com/lazy_.kaizer',
      coffee: 'https://buymeacoffee.com/lazykaizer',
    },
  },
};

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  icon: string; // Lucide icon name
  gradient: string;
  url?: string;
  image?: string; // Unsplash image url
  logoUrl?: string; // Custom logo image
}

export const projects: Project[] = [
  {
    id: 'monodesk',
    name: 'Monodesk',
    description: "The AI-Powered Operating System for Next-Gen Founders & Creators. A complete mission control integrating state-of-the-art AI models.",
    tech: ['Next.js 16', 'React 19', 'Tailwind', 'Supabase', 'Gemini Pro'],
    icon: 'Sparkles', // Represents its AI capabilities
    gradient: 'from-emerald-500/20 to-teal-500/20',
    url: 'https://monodesk.tech',
    image: '/projects/monodesk.png',
    logoUrl: '/projects/monodesk-logo.png',
  },
  {
    id: 'smart-wardrobe',
    name: 'Smart Wardrobe',
    description: 'An AI-powered wardrobe management system offering virtual try-on technology, real-time weather-based outfit suggestions, and intelligent inventory tracking.',
    tech: ['Python', 'Flask', 'MongoDB', 'AI / ML', 'JWT'],
    icon: 'Shirt',
    gradient: 'from-indigo-500/20 to-purple-500/20',
    url: 'https://smart-wardrobe-hazel.vercel.app/',
    image: '/projects/smart-wardrobe.png',
    logoUrl: '/projects/smart-wardrobe-logo.png',
  },
  {
    id: 'feedback-wall',
    name: 'Feedback Wall',
    description: 'A premium, modern feedback collection and testimonial management portfolio for freelance developers.',
    tech: ['Next.js', 'React', 'Framer Motion', 'Tailwind CSS', 'Supabase'],
    icon: 'MessageCircle',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    logoUrl: '/logo.png',
    image: '/projects/feedback-wall.png',
  },
];

export const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia',
  'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium',
  'Bolivia', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria', 'Cambodia',
  'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Estonia', 'Ethiopia', 'Finland',
  'France', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala',
  'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia',
  'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan',
  'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Latvia', 'Lebanon',
  'Libya', 'Lithuania', 'Luxembourg', 'Malaysia', 'Mexico', 'Moldova',
  'Mongolia', 'Morocco', 'Myanmar', 'Nepal', 'Netherlands', 'New Zealand',
  'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palestine',
  'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Senegal', 'Serbia',
  'Singapore', 'Slovakia', 'Slovenia', 'Somalia', 'South Africa',
  'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Sweden', 'Switzerland',
  'Syria', 'Taiwan', 'Tanzania', 'Thailand', 'Tunisia', 'Turkey',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam',
  'Yemen', 'Zambia', 'Zimbabwe',
];

export const whyFeedbackReasons = [
  {
    icon: 'TrendingUp',
    title: 'Continuous Improvement',
    description: 'Every piece of feedback is a compass pointing toward better products and services.',
  },
  {
    icon: 'Shield',
    title: 'Trust & Credibility',
    description: 'Real testimonials from real people build authentic trust for future clients.',
  },
  {
    icon: 'Globe',
    title: 'Global Impact',
    description: 'Your voice joins a worldwide community helping shape better digital experiences.',
  },
  {
    icon: 'Zap',
    title: 'Quick & Effortless',
    description: 'Takes less than 30 seconds. No login. No signup. Just honest feedback.',
  },
];
