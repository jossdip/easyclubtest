'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { Section } from '@/components/section';

export function SecurityIDSection(): React.JSX.Element {
  return (
    <Section
      id="securite"
      title="Lecteurs de CNI pour Videurs"
      subtitle="Authenticité instantanée, faux documents détectés, historique et blacklist"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02]"
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            src="/videos/bouncer_scanning_ids_nightclub.mp4"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(0,255,200,0.08),transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="flex flex-col justify-center gap-4"
        >
          <ul className="text-foreground/80 grid gap-2 text-sm">
            <li>• Scan recto/verso, vérification hologrammes et MRZ</li>
            <li>• Détection des anomalies et usurpations</li>
            <li>• Historique consolidé multi‑établissements</li>
            <li>• Blacklist synchronisée et annotable</li>
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
