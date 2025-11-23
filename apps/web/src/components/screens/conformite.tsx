'use client';

import { motion } from 'framer-motion';
import { FileCheck, Lock, Database, ShieldCheck } from 'lucide-react';
import * as React from 'react';

import { Section } from '@/components/section';

export function ConformiteSection(): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative"
    >
      <Section
        title="Conformité NF525"
        subtitle="Inaltérabilité, clôtures, scellement, archivage et audit. Crédible et vérifiable."
      >
        <div className="relative grid gap-6 md:grid-cols-3">
          {/* Decorative background connection line */}
          <div className="absolute left-0 top-1/2 hidden h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent md:block" />

          {[
            {
              title: 'Inaltérabilité',
              desc: "Documentation interne et journaux scellés garantissant l'intégrité totale des données.",
              icon: Lock,
              accent: 'text-indigo-400',
              bg: 'bg-indigo-500/10',
            },
            {
              title: 'Scellement & Clôtures',
              desc: 'Processus de clôture journalière/mensuelle automatisé, signé numériquement et sécurisé.',
              icon: FileCheck,
              accent: 'text-blue-400',
              bg: 'bg-blue-500/10',
            },
            {
              title: 'Archivage & Audit',
              desc: 'Exports horodatés instantanés et outils de contrôle fiscal intégrés pour une sérénité absolue.',
              icon: Database,
              accent: 'text-slate-400',
              bg: 'bg-slate-500/10',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              {/* Metallic sheen effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${item.bg} ${item.accent} shadow-inner ring-1 ring-white/5 transition-all duration-300 group-hover:scale-110`}
              >
                <item.icon className="h-7 w-7" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-indigo-300">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>

              <div className="text-muted-foreground/60 mt-6 flex items-center gap-2 text-xs">
                <ShieldCheck className="h-3 w-3" />
                <span>Certifié NF525</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </motion.div>
  );
}
