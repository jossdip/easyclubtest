'use client';

import { motion } from 'framer-motion';
import { FileCheck, Lock, Database } from 'lucide-react';
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
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Inaltérabilité',
              desc: "Documentation interne et journaux scellés garantissant l'intégrité des données.",
              icon: Lock,
            },
            {
              title: 'Scellement & clôtures',
              desc: 'Processus de clôture journalière/mensuelle automatisé et sécurisé.',
              icon: FileCheck,
            },
            {
              title: 'Archivage & audit',
              desc: 'Exports horodatés et outils de contrôle fiscal intégrés.',
              icon: Database,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 transition-all hover:border-white/20"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </motion.div>
  );
}
