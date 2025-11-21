'use client';

import { motion, useReducedMotion } from 'framer-motion';
import * as React from 'react';

import { Section } from '@/components/section';

export function SecuriteSection(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="securite" aria-label="Sécurité et protocole">
      <Section
        title="Sécurité — alerte, protocole, prévention IA"
        subtitle="Bouton alerte discret, protocole coordonné et prévention proactive assistée par IA."
      >
        <div className="border-border bg-card/60 shadow-elev-1 relative isolate overflow-hidden rounded-2xl border p-8 backdrop-blur">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <motion.div
              className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: prefersReducedMotion ? 1 : [1, 1.05, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{
                duration: 4,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background:
                  'radial-gradient(closest-side, rgba(0,255,200,0.15), transparent 70%), radial-gradient(closest-side, rgba(160,0,255,0.25), transparent 80%)',
                filter: 'blur(12px)',
              }}
            />
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <li>Déclenchement alerte discret</li>
            <li>Procédures et contacts pré‑définis</li>
            <li>Prévention proactive (IA)</li>
          </ul>
        </div>
      </Section>
    </section>
  );
}
