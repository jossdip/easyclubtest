'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import * as React from 'react';

import { Section } from '@/components/section';

export function FutureBraceletSection(): React.JSX.Element {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0.95, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0.6, 1]);

  return (
    <section id="avenir-bracelet" aria-label="Bracelet détecteur — en R&D">
      <Section
        title="Bracelet détecteur — en R&D"
        subtitle="Exploration prudente d’un bracelet détecteur d’alcoolémie. Visual métaphorique pour illustrer la recherche (sans allégations)."
      >
        <div ref={containerRef} className="relative isolate overflow-hidden rounded-2xl">
          <motion.div
            style={{ scale, opacity }}
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(400px 200px at 30% 20%, rgba(0,255,200,0.18), transparent), radial-gradient(400px 200px at 70% 80%, rgba(190,0,255,0.18), transparent)',
                filter: 'blur(20px)',
              }}
            />
          </motion.div>
          <div className="border-border bg-card/60 shadow-elev-1 relative z-10 rounded-2xl border p-8 backdrop-blur">
            <p className="text-foreground/70">
              Visualisation métaphorique&nbsp;: un halo réactif au défilement. Projet en R&amp;D —
              objectifs&nbsp;: sécurité, prévention et collaboration avec les autorités, sans
              promesses prématurées.
            </p>
          </div>
        </div>
      </Section>
    </section>
  );
}
