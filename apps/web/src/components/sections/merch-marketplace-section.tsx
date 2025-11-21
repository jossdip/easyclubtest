'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';

import { Section } from '@/components/section';

const PRODUCTS = [
  { id: 'p1', title: 'T‑shirt EasyClub', price: '34€', img: '/window.svg' },
  { id: 'p2', title: 'Casquette EC', price: '24€', img: '/globe.svg' },
  { id: 'p3', title: 'Hoodie Black', price: '59€', img: '/vercel.svg' },
  { id: 'p4', title: 'Gobelet Réutilisable', price: '3€', img: '/file.svg' },
];

export function MerchMarketplaceSection(): React.JSX.Element {
  const [added, setAdded] = React.useState<string | null>(null);
  return (
    <section id="merch" aria-label="Marketplace Merchandising">
      <Section
        title="Marketplace Merchandising"
        subtitle="Production à la demande, stocks dynamiques — connectée à votre identité visuelle."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="border-border bg-card/60 shadow-elev-1 group relative overflow-hidden rounded-xl border p-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute left-2 top-2 rounded-full bg-emerald-600/20 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
                  Production à la demande
                </div>
              </div>
              <div className="mt-3 text-sm">
                <div className="font-semibold">{p.title}</div>
                <div className="text-foreground/70">{p.price}</div>
              </div>
              <button
                type="button"
                className="mt-3 w-full rounded-md border border-white/10 py-1.5 text-xs hover:bg-white/10"
                onClick={() => {
                  setAdded(p.id);
                  setTimeout(() => setAdded(null), 800);
                }}
                aria-live="polite"
              >
                Ajouter au panier
              </button>
              {added === p.id ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-foreground/80 absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md bg-white/10 px-2 py-1 text-[11px]"
                >
                  Ajouté ✓
                </motion.div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </Section>
    </section>
  );
}
