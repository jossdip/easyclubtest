/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FilterState = {
  role: 'Tout' | 'Personnel' | 'Équipement' | 'Bonnes pratiques' | 'Notation' | 'Messagerie';
  tri: 'Pertinence' | 'Proximité' | 'Note';
};

const cards = [
  { title: 'Personnel', desc: 'Serveurs, barmans, sécurité' },
  { title: 'Équipement', desc: 'TPE, scanners, imprimantes' },
  { title: 'Bonnes pratiques', desc: 'Playbooks et SOPs' },
  { title: 'Notation', desc: 'Évaluations vérifiées' },
  { title: 'Messagerie', desc: 'Discussions et devis' },
];

export function MarketplaceProSection(): React.JSX.Element {
  const [filters, setFilters] = React.useState<FilterState>({
    role: 'Tout',
    tri: 'Pertinence',
  });
  const [requested, setRequested] = React.useState(false);

  return (
    <Section
      id="marketplace"
      title="Marketplace Inter‑Établissements"
      subtitle="Ressources partagées : personnel, équipement, pratiques, notation et messagerie"
    >
      <div className="flex flex-wrap items-center gap-3">
        {['Tout', 'Personnel', 'Équipement', 'Bonnes pratiques', 'Notation', 'Messagerie'].map(
          (r) => (
            <button
              key={r}
              type="button"
              className={cn(
                'rounded-full border px-3 py-1 text-sm',
                filters.role === (r as FilterState['role'])
                  ? 'border-white/20 bg-white/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10',
              )}
              onClick={() => setFilters((f) => ({ ...f, role: r as FilterState['role'] }))}
            >
              {r}
            </button>
          ),
        )}
        <select
          className="ml-auto rounded-md border border-white/10 bg-white/5 px-2 py-1 text-sm"
          value={filters.tri}
          onChange={(e) => setFilters((f) => ({ ...f, tri: e.currentTarget.value as any }))}
          aria-label="Tri"
        >
          {['Pertinence', 'Proximité', 'Note'].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards
          .filter((c) => filters.role === 'Tout' || c.title === filters.role)
          .map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-5"
            >
              <div className="text-lg font-semibold">{c.title}</div>
              <div className="text-foreground/70 text-sm">{c.desc}</div>
              <div className="pt-3">
                <button
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                  onClick={() => setRequested(true)}
                >
                  Demande de mise en relation
                </button>
              </div>
            </motion.div>
          ))}
      </div>
      {requested ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-400"
          role="status"
          aria-live="polite"
        >
          Demande envoyée. Un établissement vous répondra sous peu.
        </motion.div>
      ) : null}
    </Section>
  );
}
