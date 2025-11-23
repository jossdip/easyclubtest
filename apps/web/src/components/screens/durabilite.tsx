'use client';

import { motion } from 'framer-motion';
import { Recycle, Leaf, BarChart3 } from 'lucide-react';
import * as React from 'react';

import { Section } from '@/components/section';

export function DurabiliteSection(): React.JSX.Element {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <Section
        title="Durabilité"
        subtitle="Réduction des déchets, verres réutilisables, filières de recyclage et sensibilisation."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-900/10 to-transparent p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-900/20">
              <Recycle className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-emerald-100">Tri Intelligent</h3>
            <p className="leading-relaxed text-emerald-100/70">
              Système de tri intégré au bar et en salle. Les poubelles connectées informent le staff
              en temps réel pour optimiser la collecte.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-teal-500/20 bg-gradient-to-b from-teal-900/10 to-transparent p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 shadow-lg shadow-teal-900/20">
              <Leaf className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-teal-100">Réemploi & Consigne</h3>
            <p className="leading-relaxed text-teal-100/70">
              Gestion native des gobelets réutilisables et des consignes (Eco-cups). Suivez le taux
              de retour et l'impact carbone évité.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-900/10 to-transparent p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-900/20">
              <BarChart3 className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-cyan-100">Impact Mesurable</h3>
            <p className="leading-relaxed text-cyan-100/70">
              Tableaux de bord dédiés à la RSE. Visualisez vos économies de CO2 et de déchets pour
              votre communication et vos audits.
            </p>
          </motion.div>
        </div>
      </Section>
    </motion.div>
  );
}
