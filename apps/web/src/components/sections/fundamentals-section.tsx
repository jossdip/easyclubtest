'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, HandCoins, Leaf, LockKeyhole, ShieldCheck, ScrollText } from 'lucide-react';
import * as React from 'react';

import { ConformiteSection } from '@/components/screens/conformite';
import { DurabiliteSection } from '@/components/screens/durabilite';
import { SecuriteSection } from '@/components/screens/securite';
import { Section } from '@/components/section';

type Pillar = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const pillars: Pillar[] = [
  {
    icon: <ScrollText className="h-5 w-5" aria-hidden />,
    title: 'Mission',
    description: "Élever l'expérience nocturne avec un POS Monaco‑grade, sûr et durable.",
  },
  {
    icon: <BadgeCheck className="h-5 w-5" aria-hidden />,
    title: 'Valeur',
    description: "Simplicité et précision : NF525, IA d'assistance, matériel pro, modèle 1%.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
    title: 'Conformité',
    description: 'Scellement, clôtures, archivage et audit avancé NF525.',
  },
  {
    icon: <LockKeyhole className="h-5 w-5" aria-hidden />,
    title: 'Sécurité',
    description: 'Contrôle d’accès, anti‑fraude, traçabilité et listes noires.',
  },
  {
    icon: <Leaf className="h-5 w-5" aria-hidden />,
    title: 'Durabilité',
    description: 'Réduction des déchets, navettes VIP, efficacité opérationnelle.',
  },
  {
    icon: <HandCoins className="h-5 w-5" aria-hidden />,
    title: 'Modèle économique',
    description: '1% split à l’acquéreur, pas d’abonnement. Alignement total.',
  },
];

export function FundamentalsSection(): JSX.Element {
  return (
    <Section id="fundamentaux" title="Fundamentaux" subtitle="Mission, valeur et piliers clés">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.03 }}
            className="border-border/60 bg-card/60 group rounded-xl border p-4 backdrop-blur"
          >
            <div className="text-primary/90 inline-flex items-center gap-2">
              <span className="bg-primary/10 group-hover:bg-primary/15 grid h-8 w-8 place-items-center rounded-md transition-colors">
                {p.icon}
              </span>
              <h3 className="text-base font-semibold">{p.title}</h3>
            </div>
            <p className="text-foreground/80 mt-2 text-sm">{p.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-1"
        >
          <SecuriteSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="lg:col-span-1"
        >
          <ConformiteSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <DurabiliteSection />
        </motion.div>
      </div>
    </Section>
  );
}
