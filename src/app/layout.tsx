import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/constants';
import { FloatingCoffeeButton } from '@/components/ui/FloatingCoffeeButton';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.description.slice(0, 60)}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className="min-h-screen bg-slate-950 antialiased overflow-x-hidden w-full max-w-[100vw]">
        {/* Noise texture overlay for premium feel */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Mouse-follow radial glow */}
        <div
          className="pointer-events-none fixed inset-0 z-30 bg-emerald-glow transition-opacity duration-500"
          aria-hidden="true"
        />

        {children}

        {/* Floating draggable coffee button */}
        <FloatingCoffeeButton />
      </body>
    </html>
  );
}
