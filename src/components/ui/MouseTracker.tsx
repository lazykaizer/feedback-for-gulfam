'use client';

import { useEffect, useCallback, type ReactNode } from 'react';

/**
 * Tracks mouse position and updates CSS custom properties --mouse-x / --mouse-y
 * to drive the radial emerald glow that follows the cursor.
 */
export function MouseTracker({ children }: { children: ReactNode }) {
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = `${e.clientX}px`;
    const y = `${e.clientY}px`;
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return <>{children}</>;
}
