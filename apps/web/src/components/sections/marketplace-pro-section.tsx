'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { Section } from '@/components/section';

type Item = {
  id: string;
  kind: 'Personnel' | 'Équipement' | 'Bonnes pratiques' | 'Notation' | 'Messagerie';
  title: string;
  rating?: number;
};

const MOCK: Item[] = [
  { id: '1', kind: 'Personnel', title: 'Barman (Monaco)' },
  { id: '2', kind: 'Équipement', title: 'Imprimante thermique TM‑m30' },
  { id: '3', kind: 'Bonnes pratiques', title: 'Clôture journalière — check‑list' },
  { id: '4', kind: 'Notation', title: 'Club Riviera — 4.7★', rating: 4.7 },
  { id: '5', kind: 'Messagerie', title: 'Demande de staff — samedi soir' },
];

export function MarketplaceProSection(): React.JSX.Element {
  const [filter, setFilter] = React.useState<Item['kind'] | 'Tous'>('Tous');
  const [query, setQuery] = React.useState('');
  const filtered = MOCK.filter(
    (i) =>
      (filter === 'Tous' || i.kind === filter) &&
      i.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section id="marketplace" aria-label="Marketplace Inter‑Établissements">
      <Section
        title="Marketplace Inter‑Établissements"
        subtitle="Personnel, équipements, bonnes pratiques, notation, messagerie — tout pour opérer au meilleur niveau."
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {(
            [
              'Tous',
              'Personnel',
              'Équipement',
              'Bonnes pratiques',
              'Notation',
              'Messagerie',
            ] as const
          ).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(k)}
              className={`rounded-full border px-3 py-1 text-xs ${
                filter === k ? 'border-white/40 bg-white/10' : 'border-white/10 bg-white/5'
              }`}
              aria-pressed={filter === k}
            >
              {k}
            </button>
          ))}
          <input
            placeholder="Rechercher…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-border bg-background/60 ml-auto rounded-md border px-2 py-1 text-sm"
            aria-label="Rechercher"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((i, idx) => (
            <motion.div
              key={i.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="border-border bg-card/60 shadow-elev-1 group relative overflow-hidden rounded-xl border p-5 backdrop-blur will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            >
              <div className="text-foreground/70 text-xs">{i.kind}</div>
              <div className="mt-1 text-base font-semibold">{i.title}</div>
              {i.rating ? (
                <div className="text-foreground/80 mt-1 text-sm">{i.rating.toFixed(1)}★</div>
              ) : null}
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="rounded-md border border-white/10 px-2 py-1 text-xs hover:bg-white/10"
                >
                  Détails
                </button>
                <button
                  type="button"
                  className="rounded-md border border-white/10 px-2 py-1 text-xs hover:bg-white/10"
                >
                  Demande de mise en relation
                </button>
              </div>
              <motion.div
                aria-hidden
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full"
                initial={{ scale: 0.9, opacity: 0.15 }}
                whileInView={{ scale: [0.9, 1.05, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(0,140,255,0.18), transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </Section>
    </section>
  );
}
