'use client';

import * as React from 'react';

export function Hero3D(): React.JSX.Element | null {
  // Lightweight, SSR-safe placeholder. Can be upgraded to R3F later.
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          'radial-gradient(600px 300px at 20% 10%, rgba(0,255,200,0.15), transparent), radial-gradient(600px 300px at 80% 90%, rgba(0,140,255,0.15), transparent)',
      }}
    />
  );
}
