'use client';

import { motion, useReducedMotion } from 'framer-motion';
import * as React from 'react';

import { Section } from '@/components/section';

export function ModeleUnPourcentSection(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="modele-1pct" aria-label="Modèle 1% à l’acquéreur">
      <Section
        title="Modèle 1% — pas d’abonnement"
        subtitle="Simple et clair&nbsp;: 1% du paiement est versé à l’acquéreur. Pas de double charge."
      >
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="text-sm">
              <div className="mb-2 font-semibold">Paiement</div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '99%' }}
                viewport={{ once: true }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeOut' }}
                className="bg-foreground/10 h-3 rounded-full"
              >
                <div className="bg-accent h-3 rounded-full" style={{ width: '99%' }} />
              </motion.div>
              <div className="text-foreground/70 mt-1">99% prestataire</div>
            </div>
            <div className="text-sm">
              <div className="mb-2 font-semibold">Part acquéreur</div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '1%' }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.8,
                  ease: 'easeOut',
                  delay: 0.1,
                }}
                className="bg-foreground/10 h-3 rounded-full"
              >
                <div className="bg-accent h-3 rounded-full" style={{ width: '1%' }} />
              </motion.div>
              <div className="text-foreground/70 mt-1">1% acquéreur</div>
            </div>
            <div className="text-sm">
              <div className="mb-2 font-semibold">Abonnement</div>
              <div className="border-border h-3 rounded-full border border-dashed" />
              <div className="text-foreground/70 mt-1">0€ — pas d’abonnement</div>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
