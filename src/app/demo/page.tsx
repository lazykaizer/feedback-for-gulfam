'use client';

import { GlassRefractionHero } from "@/components/ui/glass-refraction-hero";

export default function GlassRefractionHeroDemo() {
  return (
    <GlassRefractionHero
      title="Glass Refraction Design"
      description="Experience the beauty of light refraction through glass with animated blue gradient blobs"
      primaryAction={{
        label: "Explore Now",
        onClick: () => console.log("Primary action clicked"),
      }}
      secondaryAction={{
        label: "Learn More",
        onClick: () => console.log("Secondary action clicked"),
      }}
    />
  );
}
