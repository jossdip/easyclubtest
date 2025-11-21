'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SecurityIDSection(): React.JSX.Element {
  const [showScan, setShowScan] = React.useState(false);
  return (
    <section id="securite" aria-label="Lecteurs de CNI — contrôle d’identité">
      <Section
        title="Sécurité d’accès — lecteurs de CNI pour videurs"
        subtitle="Authenticité instantanée, détection de faux, historique d’accès, blacklist synchronisée."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border-border bg-card/60 shadow-elev-1 relative overflow-hidden rounded-2xl border p-6 backdrop-blur">
            <div className="text-foreground/80 mb-4 text-sm font-semibold">Scanner (mock)</div>
            <div className="bg-muted/30 relative aspect-video overflow-hidden rounded-xl">
              {/* Simple device mock */}
              <div className="absolute inset-3 rounded-xl border border-white/10 bg-black/50" />
              <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/10" />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowScan(true)}
                className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
              >
                Simuler un scan
              </button>
              <span className="text-foreground/70 text-xs">
                Démo: animation + toast de validation
              </span>
            </div>
          </div>
          <div className="border-border bg-card/60 shadow-elev-1 relative overflow-hidden rounded-2xl border p-6 backdrop-blur">
            <div className="text-foreground/80 mb-4 text-sm font-semibold">Résultat</div>
            <div className="relative aspect-video overflow-hidden rounded-xl">
              {showScan ? (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="grid h-full place-items-center"
                  onAnimationComplete={() => {
                    setTimeout(() => setShowScan(false), 800);
                  }}
                >
                  <div className="rounded-full bg-emerald-500/20 px-3 py-2 text-emerald-200">
                    Identité validée ✓
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-foreground/60 grid h-full place-items-center"
                >
                  Prêt à scanner
                </motion.div>
              )}
            </div>
            <ul className="text-foreground/80 mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <li>Authenticité en temps réel</li>
              <li>Détection de faux documents</li>
              <li>Historique des entrées</li>
              <li>Blacklist/Watchlist partagée</li>
            </ul>
          </div>
        </div>
      </Section>
    </section>
  );
}
