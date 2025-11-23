'use client';

import { motion } from 'framer-motion';
import { Car, Shield, Clock, MapPin, Star } from 'lucide-react';
import * as React from 'react';

import { Section } from '@/components/section';

const features = [
  {
    icon: Car,
    title: 'Flotte Premium',
    description:
      'Gestion unifiée de votre flotte de véhicules de luxe. Assignation intelligente et suivi en temps réel.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    icon: Shield,
    title: 'Sécurité Renforcée',
    description:
      'Identification des passagers par QR code unique. Traçabilité complète des trajets et des chauffeurs.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
  },
  {
    icon: Clock,
    title: 'Ponctualité',
    description:
      "Algorithmes d'optimisation des routes pour garantir une arrivée précise et réduire l'attente.",
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    icon: MapPin,
    title: 'Tracking Live',
    description:
      "Vos clients suivent l'approche de leur navette en direct, comme sur les meilleures applications VTC.",
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
];

export function VIPShuttlesSection(): React.JSX.Element {
  return (
    <Section
      id="navettes"
      title="Navettes VIP"
      subtitle="Confort, sécurité et expérience premium pour vos clients."
      className="relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Left Column: Visual/Context */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative flex flex-col justify-center"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-black p-8 shadow-2xl">
            <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-indigo-500/20 blur-xl" />

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Status VIP</h4>
                    <p className="text-muted-foreground text-xs">En route vers le club</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                  Confirmé
                </span>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg bg-white/5 p-3">
                    <div className="h-10 w-10 rounded-full bg-gray-800" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-24 rounded bg-gray-700" />
                      <div className="h-2 w-16 rounded bg-gray-800" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-indigo-600/20 p-4 text-center">
                <p className="text-sm font-medium text-indigo-300">Arrivée estimée : 23:45</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6 transition-colors hover:bg-white/10"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bg} ${feature.color}`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
