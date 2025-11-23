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
    <section id="pos" aria-label="Application Pro">
      <Section
        title="Application Pro — Gestion & Pilotage"
        subtitle="La plateforme tout-en-un pour gérer votre établissement : réservations, plan de salle, commandes, stocks et personnel."
      >
        <motion.div
          initial={{
            opacity: 0,
            y: prefersReducedMotion ? 0 : 16,
            rotateX: prefersReducedMotion ? 0 : -6,
          }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-monaco-gradient/30 relative mb-8 rounded-2xl border border-white/10 p-4 backdrop-blur"
          style={{ transformPerspective: '800px' }}
          aria-hidden
        >
          <div className="shadow-elev-2 relative mx-auto aspect-video max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <video
              src="/videos/pos-cinematic.mp4"
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </motion.div>
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
              <h3 className="text-base font-semibold">Réservations & Salle</h3>
            </div>
            <p className="text-foreground/70 text-sm">
              Gestion temps réel de la capacité, plan de salle sur mesure et distanciation.
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
              <h3 className="text-base font-semibold">Gestion Opérationnelle</h3>
            </div>
            <p className="text-foreground/70 text-sm">
              Pilotage avancé des commandes, du personnel et des stocks en un seul endroit.
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
              <h3 className="text-base font-semibold">Analyses & Revenus</h3>
            </div>
            <p className="text-foreground/70 text-sm">
              Dashboard de rentabilité, analyses de fréquentation et outils de promotion.
            </p>
          </motion.div>
        </div>
      </Section>
    </section>
  );
}
