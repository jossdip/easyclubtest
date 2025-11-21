'use client';

import { motion, useReducedMotion } from 'framer-motion';
import * as React from 'react';

import { Section } from '@/components/section';

export function DurabiliteSection(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="durabilite" aria-label="Durabilité et gestion des déchets">
      <Section
        title="Durabilité — déchets, recyclage, réutilisable"
        subtitle="Réduction des déchets, verres réutilisables, filières de recyclage et sensibilisation."
      >
        <div className="border-border bg-card/60 shadow-elev-1 relative isolate overflow-hidden rounded-2xl border p-8 backdrop-blur">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <motion.div
              className="absolute -left-16 top-10 h-48 w-48 rounded-full"
              initial={{ y: 0 }}
              animate={{ y: prefersReducedMotion ? 0 : [0, -8, 0] }}
              transition={{
                duration: 6,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background:
                  'radial-gradient(closest-side, rgba(0,255,200,0.15), transparent), radial-gradient(closest-side, rgba(0,140,255,0.12), transparent)',
                filter: 'blur(16px)',
              }}
            />
            <motion.div
              className="absolute -right-16 bottom-10 h-56 w-56 rounded-full"
              initial={{ y: 0 }}
              animate={{ y: prefersReducedMotion ? 0 : [0, 10, 0] }}
              transition={{
                duration: 7,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background:
                  'radial-gradient(closest-side, rgba(160,0,255,0.15), transparent), radial-gradient(closest-side, rgba(0,200,255,0.12), transparent)',
                filter: 'blur(20px)',
              }}
            />
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <li>Tri intelligent côté bar et salle</li>
            <li>Réemploi et verres réutilisables</li>
            <li>Indicateurs de réduction des déchets</li>
          </ul>
        </div>
      </Section>
    </section>
  );
}
