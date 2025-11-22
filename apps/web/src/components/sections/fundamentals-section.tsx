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
  color: string;
};

const pillars: Pillar[] = [
  {
    icon: <ScrollText className="h-6 w-6" aria-hidden />,
    title: 'Mission',
    description: "Élever l'expérience nocturne avec un POS Monaco‑grade, sûr et durable.",
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: <BadgeCheck className="h-6 w-6" aria-hidden />,
    title: 'Valeur',
    description: "Simplicité et précision : NF525, IA d'assistance, matériel pro, modèle 1%.",
    color: 'from-emerald-500/20 to-green-500/20',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" aria-hidden />,
    title: 'Conformité',
    description: 'Scellement, clôtures, archivage et audit avancé NF525.',
    color: 'from-indigo-500/20 to-purple-500/20',
  },
  {
    icon: <LockKeyhole className="h-6 w-6" aria-hidden />,
    title: 'Sécurité',
    description: 'Contrôle d’accès, anti‑fraude, traçabilité et listes noires.',
    color: 'from-red-500/20 to-orange-500/20',
  },
  {
    icon: <Leaf className="h-6 w-6" aria-hidden />,
    title: 'Durabilité',
    description: 'Réduction des déchets, navettes VIP, efficacité opérationnelle.',
    color: 'from-teal-500/20 to-emerald-500/20',
  },
  {
    icon: <HandCoins className="h-6 w-6" aria-hidden />,
    title: 'Modèle économique',
    description: '1% split à l’acquéreur, pas d’abonnement. Alignement total.',
    color: 'from-amber-500/20 to-yellow-500/20',
  },
];

export function FundamentalsSection(): React.JSX.Element {
  return (
    <Section id="fundamentaux" title="Fondamentaux" subtitle="Mission, valeur et piliers clés">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:shadow-lg"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${p.color}`}
            />

            <div className="relative z-10 flex flex-col gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white shadow-inner">
                {p.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground group-hover:text-foreground/90 mt-2 text-sm leading-relaxed transition-colors">
                  {p.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 space-y-24">
        <SecuriteSection />
        <ConformiteSection />
        <DurabiliteSection />
      </div>
    </Section>
  );
}
