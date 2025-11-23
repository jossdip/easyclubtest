'use client';

import { motion } from 'framer-motion';
import { Shield, ScanFace, FileCheck, Car, AlertCircle, Bot } from 'lucide-react';
import * as React from 'react';

import { Section } from '@/components/section';

export function SecurityFeatures(): React.JSX.Element {
  return (
    <Section
      id="securite-features"
      title="Sécurité & Conformité"
      subtitle="Une approche globale intégrant sécurité active, contrôles d'accès et conformité légale."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Card 1: Sécurité Active */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/60 hover:bg-card/80 group relative overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-sm transition-all"
        >
          <div className="mb-4 flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
              <Bot className="h-5 w-5" />
            </div>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">Sécurité Active</h3>
          <p className="text-muted-foreground text-sm">
            Bouton d'alerte discret pour le personnel et les clients. Prévention proactive assistée
            par IA pour détecter les situations à risque. Protocoles d'urgence coordonnés avec les
            secours.
          </p>
        </motion.div>

        {/* Card 2: Contrôle & Accès */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-card/60 hover:bg-card/80 group relative overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-sm transition-all"
        >
          <div className="mb-4 flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
              <ScanFace className="h-5 w-5" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
              <Shield className="h-5 w-5" />
            </div>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">Contrôle & Accès</h3>
          <p className="text-muted-foreground text-sm">
            Scanners de CNI avancés pour la détection de faux documents. Gestion des blacklists
            synchronisée entre établissements. Historique des entrées pour une traçabilité complète.
          </p>
        </motion.div>

        {/* Card 3: Conformité & Mobilité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-card/60 hover:bg-card/80 group relative overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-sm transition-all"
        >
          <div className="mb-4 flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <FileCheck className="h-5 w-5" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Car className="h-5 w-5" />
            </div>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">Conformité & Mobilité</h3>
          <p className="text-muted-foreground text-sm">
            Système de caisse certifié NF525 (inaltérabilité, archivage). Partenariats VTC et Taxis
            pour des retours clients sécurisés. Intégration transparente des obligations légales.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
