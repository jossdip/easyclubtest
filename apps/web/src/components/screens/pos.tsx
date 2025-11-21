'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CreditCard, Receipt, ServerCog } from 'lucide-react';
import * as React from 'react';

import { Section } from '@/components/section';

export function POSSection(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const cardVariants = {
    offscreen: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', bounce: 0.2, duration: 0.6 },
    },
  };

  return (
    <section id="pos" aria-label="App Caisse (POS)">
      <Section
        title="App Caisse — POS • IA • NF525"
        subtitle="Encaissements rapides, storyboard fluide et conformité. Offline‑first, assistant IA et matériel pro. Split 99/1: 1% à l’acquéreur."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            className="border-border bg-card/60 shadow-elev-1 rounded-xl border p-6 backdrop-blur"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.35 }}
            variants={cardVariants}
          >
            <div className="mb-3 flex items-center gap-3">
              <Receipt className="text-accent" aria-hidden size={22} />
              <h3 className="text-base font-semibold">Commandes et tables</h3>
            </div>
            <p className="text-foreground/70 text-sm">
              Prise de commande ultra‑rapide, plans de salle, notes et envois cuisine/bar.
            </p>
          </motion.div>
          <motion.div
            className="border-border bg-card/60 shadow-elev-1 rounded-xl border p-6 backdrop-blur"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.35 }}
            variants={cardVariants}
          >
            <div className="mb-3 flex items-center gap-3">
              <CreditCard className="text-accent" aria-hidden size={22} />
              <h3 className="text-base font-semibold">Paiements et split 1%</h3>
            </div>
            <p className="text-foreground/70 text-sm">
              TPE intégrés, paiements partagés, et modèle simple&nbsp;: 1% est versé à l’acquéreur.
            </p>
          </motion.div>
          <motion.div
            className="border-border bg-card/60 shadow-elev-1 rounded-xl border p-6 backdrop-blur"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.35 }}
            variants={cardVariants}
          >
            <div className="mb-3 flex items-center gap-3">
              <ServerCog className="text-accent" aria-hidden size={22} />
              <h3 className="text-base font-semibold">NF525 et hors‑ligne</h3>
            </div>
            <p className="text-foreground/70 text-sm">
              Scellement, clôtures, archivage et continuité de service même sans réseau.
            </p>
          </motion.div>
        </div>
      </Section>
    </section>
  );
}
