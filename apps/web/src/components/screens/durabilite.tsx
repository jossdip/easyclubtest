'use client';

import { motion } from 'framer-motion';
import { Recycle, Leaf, BarChart3, Droplets, Wind, TreePine } from 'lucide-react';
import * as React from 'react';

import { Section } from '@/components/section';

export function DurabiliteSection(): React.JSX.Element {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <Section
        title="Durabilité — déchets, recyclage, réutilisable"
        subtitle="Réduction des déchets, verres réutilisables, filières de recyclage et sensibilisation."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-900/10 to-transparent p-8 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-900/20 transition-transform duration-300 group-hover:scale-110">
              <Recycle className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-emerald-100">Tri Intelligent</h3>
            <p className="leading-relaxed text-emerald-100/70">
              Système de tri intégré au bar et en salle. Les poubelles connectées informent le staff
              en temps réel pour optimiser la collecte et réduire les débordements.
            </p>
            <div className="mt-6 flex gap-3 text-xs font-medium text-emerald-300/80">
              <span className="flex items-center gap-1">
                <Droplets className="h-3 w-3" /> -40% Eau
              </span>
              <span className="flex items-center gap-1">
                <Wind className="h-3 w-3" /> -25% CO2
              </span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl border border-teal-500/20 bg-gradient-to-b from-teal-900/10 to-transparent p-8 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(20,184,166,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 shadow-lg shadow-teal-900/20 transition-transform duration-300 group-hover:scale-110">
              <Leaf className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-teal-100">Réemploi & Consigne</h3>
            <p className="leading-relaxed text-teal-100/70">
              Gestion native des gobelets réutilisables et des consignes (Eco-cups). Suivez le taux
              de retour et visualisez l'impact carbone évité en direct sur le dashboard.
            </p>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-teal-900/30">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '85%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full bg-teal-500"
              />
            </div>
            <p className="mt-2 text-right text-xs text-teal-300/60">85% Taux de retour moyen</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-900/10 to-transparent p-8 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-900/20 transition-transform duration-300 group-hover:scale-110">
              <BarChart3 className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-cyan-100">Impact Mesurable</h3>
            <p className="leading-relaxed text-cyan-100/70">
              Tableaux de bord dédiés à la RSE. Visualisez vos économies de CO2, de déchets et d'eau
              pour alimenter votre communication et simplifier vos audits environnementaux.
            </p>
            <div className="mt-6 flex items-center gap-4 rounded-lg border border-cyan-500/10 bg-cyan-900/20 p-3">
              <TreePine className="h-8 w-8 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-white">12.5T</div>
                <div className="text-xs text-cyan-200/70">CO2 Économisé / an</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </motion.div>
  );
}
