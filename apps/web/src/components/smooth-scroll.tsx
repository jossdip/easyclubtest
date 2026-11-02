'use client';

import Lenis from 'lenis';
import * as React from 'react';

/** Défilement doux (Lenis), y compris vers les ancres ; rien si l'on a demandé moins d'animations. */
export function SmoothScroll({ children }: { children: React.ReactNode }): React.JSX.Element {
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -72 }, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return <>{children}</>;
}
