'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, BadgeCheck, Scale, Shield, Leaf, Coins } from 'lucide-react';
import * as React from 'react';

import { Section } from '@/components/section';

const pillars = [
  { icon: ShieldCheck, title: 'Mission', desc: 'Fluidifier et sécuriser la nuit, partout.' },
  { icon: BadgeCheck, title: 'Valeur', desc: 'Expérience premium, efficacité mesurable.' },
  { icon: Scale, title: 'Conformité', desc: 'NF525, archives et scellement.' },
  { icon: Shield, title: 'Sécurité', desc: 'Alerte, protocole, prévention IA.' },
  { icon: Leaf, title: 'Durabilité', desc: 'Réemploi, tri intelligent, indicateurs.' },
  { icon: Coins, title: 'Modèle 1%', desc: 'Split 99/1 côté acquéreur, simplicité.' },
] as const;

export function FundamentalsSection(): React.JSX.Element {
  return (
    <section id="fundamentaux" aria-label="Fundamentaux EasyClub">
      <Section
        title="Fundamentaux — mission, valeur, conformité, sécurité, durabilité"
        subtitle="Les bases qui guident la plateforme, pensées pour des établissements d’excellence."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: 'easeOut' }}
              className="border-border bg-card/60 shadow-elev-1 group relative overflow-hidden rounded-xl border p-5 backdrop-blur"
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="bg-primary/10 text-primary grid h-9 w-9 place-items-center rounded-lg transition-transform group-hover:scale-105">
                  <Icon size={18} aria-hidden />
                </div>
                <div className="text-base font-semibold">{title}</div>
              </div>
              <p className="text-foreground/70 text-sm">{desc}</p>
              <motion.div
                aria-hidden
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full"
                initial={{ scale: 0.9, opacity: 0.2 }}
                whileInView={{ scale: [0.9, 1.05, 1], opacity: [0.2, 0.35, 0.2] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.1,
                }}
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(0,255,200,0.18), transparent 70%)',
                  filter: 'blur(6px)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </Section>
    </section>
  );
}
