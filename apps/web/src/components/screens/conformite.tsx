'use client';

import { motion, useReducedMotion } from 'framer-motion';
import * as React from 'react';

import { Section } from '@/components/section';

export function ConformiteSection(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="conformite" aria-label="Conformité NF525">
      <Section
        title="Conformité NF525 — crédible et vérifiable"
        subtitle="Inaltérabilité, clôtures, scellement, archivage et audit. Communication factuelle et claire."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {['Inaltérabilité', 'Scellement & clôtures', 'Archivage & audit'].map((label, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="border-border bg-card/60 shadow-elev-1 rounded-xl border p-6 backdrop-blur"
            >
              <div className="text-base font-semibold">{label}</div>
              <p className="text-foreground/70 mt-2 text-sm">
                Documentation interne, journaux scellés, exports horodatés et contrôles réguliers.
              </p>
            </motion.div>
          ))}
        </div>
      </Section>
    </section>
  );
}
