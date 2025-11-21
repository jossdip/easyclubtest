'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';

import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const items = [
  { name: 'T‑shirt Club', price: 29, img: '/images/mockups/tshirt.png' },
  { name: 'Casquette Neon', price: 24, img: '/images/mockups/cap.png' },
  { name: 'Verres gravés', price: 39, img: '/images/mockups/glass.png' },
  { name: 'Poster 360°', price: 19, img: '/images/mockups/poster.png' },
];

function TiltCard({ children }: { children: React.ReactNode }): JSX.Element {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 200, damping: 20 });
  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className="group will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export function MerchMarketplaceSection(): JSX.Element {
  const [added, setAdded] = React.useState<string | null>(null);
  return (
    <Section
      id="merch"
      title="Marketplace Merchandising"
      subtitle="Production à la demande, stocks dynamiques et expériences 360°"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <TiltCard key={it.name}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-4"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={it.img}
                  alt={it.name}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-foreground/70 text-sm">{it.price}€</div>
                </div>
                <button
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                  onClick={() => setAdded(it.name)}
                >
                  Ajouter
                </button>
              </div>
              <div className="text-primary mt-2 text-xs">Production à la demande</div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
      {added ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-primary/30 bg-primary/10 text-primary mt-4 rounded-md border p-3"
          role="status"
          aria-live="polite"
        >
          {added} ajouté au panier (mock).
        </motion.div>
      ) : null}
    </Section>
  );
}
