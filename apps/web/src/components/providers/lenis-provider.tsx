'use client';

import Lenis from 'lenis';
import * as React from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      document.documentElement.style.scrollBehavior = 'auto';
      return;
    }
    const lenis = new Lenis({ duration: 1.1 });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      if (typeof (lenis as { destroy?: () => void }).destroy === 'function') {
        (lenis as { destroy?: () => void }).destroy?.();
      }
    };
  }, []);

  return <>{children}</>;
}
