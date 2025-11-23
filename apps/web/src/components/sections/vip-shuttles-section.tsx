'use client';

import { motion } from 'framer-motion';
import { Bus, Car, ShieldCheck } from 'lucide-react';
import * as React from 'react';

import { Section } from '@/components/section';

export function VIPShuttlesSection(): React.JSX.Element {
  return (
    <Section
      id="transport"
      title="Mobilité Nocturne & Sécurité"
      subtitle="Partenariats stratégiques pour des retours sûrs et écologiques."
    >
      <div className="grid gap-8 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
            <Car className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">Taxis & VTC</h3>
          <p className="text-muted-foreground">
            Intégration des services de VTC et partenariat avec les compagnies de taxis locales pour
            une expérience de sortie sans couture et sécurisée.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
            <Bus className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">Transports Publics</h3>
          <p className="text-muted-foreground">
            Collaboration avec les services publics pour étendre les horaires lors d&apos;événements
            spéciaux et faciliter l&apos;accès aux bus de nuit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">Retours Sécurisés</h3>
          <p className="text-muted-foreground">
            Fonction de covoiturage intégrée et suivi des trajets pour garantir que chaque client
            rentre chez lui en toute sécurité.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
