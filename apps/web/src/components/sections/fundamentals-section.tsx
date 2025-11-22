'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, ShieldCheck, Sparkles, Crown, Infinity, HeartHandshake } from 'lucide-react';
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
    icon: <Crown className="h-6 w-6" aria-hidden />,
    title: "L'Excellence Nocturne",
    description:
      "Une suite technologique d'exception, taillée sur mesure pour les lieux les plus prestigieux du monde.",
    color: 'from-amber-500/20 to-yellow-500/20',
  },
  {
    icon: <Sparkles className="h-6 w-6" aria-hidden />,
    title: 'Héritage & Innovation',
    description:
      "L'âme de la fête, sublimée par une intelligence artificielle discrète, puissante et au service de l'émotion.",
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: <Infinity className="h-6 w-6" aria-hidden />,
    title: 'Fluidité Absolue',
    description:
      "Chaque interaction devient une caresse. Commandes, paiements, tout s'efface pour laisser place à l'instant présent.",
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" aria-hidden />,
    title: 'Sérénité Totale',
    description:
      'Protégez votre établissement, votre staff et vos clients avec une sécurité invisible, omniprésente et infaillible.',
    color: 'from-red-500/20 to-orange-500/20',
  },
  {
    icon: <HeartHandshake className="h-6 w-6" aria-hidden />,
    title: 'Écosystème Vertueux',
    description:
      'Un modèle unique où nous grandissons ensemble. Pas de frais cachés, juste une alliance durable pour votre succès.',
    color: 'from-emerald-500/20 to-green-500/20',
  },
  {
    icon: <BadgeCheck className="h-6 w-6" aria-hidden />,
    title: "L'Art de Recevoir",
    description:
      "Redonnez ses lettres de noblesse à l'hospitalité. La technologie s'efface pour glorifier l'humain et le service.",
    color: 'from-indigo-500/20 to-violet-500/20',
  },
];

export function FundamentalsSection(): React.JSX.Element {
  return (
    <Section
      id="fundamentaux"
      title="Vision & Héritage"
      subtitle="Redéfinir les standards de la nuit"
    >
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
