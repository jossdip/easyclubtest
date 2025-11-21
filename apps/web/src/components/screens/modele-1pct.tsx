'use client';

import { motion, useReducedMotion } from 'framer-motion';
import * as React from 'react';

import { Section } from '@/components/section';

export function ModeleUnPourcentSection(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="modele-1pct" aria-label="Modèle 1% à l’acquéreur">
      <Section
        title="Modèle 1% — pas d’abonnement"
        subtitle="Simple et clair&nbsp;: 1% du paiement est versé à l’acquéreur. Pas de double charge."
      >
        <div className="mx-auto grid max-w-3xl grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="relative mx-auto aspect-square w-64">
            <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="g99" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--neon-cyan))" />
                  <stop offset="100%" stopColor="hsl(var(--neon-violet))" />
                </linearGradient>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--neon-magenta))" />
                  <stop offset="100%" stopColor="hsl(var(--neon-cyan))" />
                </linearGradient>
              </defs>
              <g transform="translate(80,80)">
                {(() => {
                  const radius = 62;
                  const circumference = 2 * Math.PI * radius;
                  const pct99 = 0.99;
                  const pct1 = 0.01;
                  const dash99 = circumference * pct99;
                  const dash1 = circumference * pct1;
                  return (
                    <>
                      <circle
                        r={radius}
                        fill="transparent"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="20"
                      />
                      <motion.circle
                        r={radius}
                        fill="transparent"
                        stroke="url(#g99)"
                        strokeWidth="20"
                        strokeLinecap="round"
                        strokeDasharray={`${dash99} ${circumference - dash99}`}
                        strokeDashoffset={0}
                        initial={{ rotate: -90, strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: prefersReducedMotion ? 0 : 1.0, ease: 'easeOut' }}
                        style={{ transformOrigin: 'center' }}
                      />
                      <motion.circle
                        r={radius}
                        fill="transparent"
                        stroke="url(#g1)"
                        strokeWidth="20"
                        strokeLinecap="round"
                        strokeDasharray={`${dash1} ${circumference - dash1}`}
                        initial={{ rotate: -90 + pct99 * 360, strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: circumference - dash1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.8,
                          ease: 'easeOut',
                          delay: 0.2,
                        }}
                        style={{ transformOrigin: 'center' }}
                      />
                    </>
                  );
                })()}
              </g>
            </svg>
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-3xl font-semibold">1%</div>
                <div className="text-foreground/70 text-xs">acquéreur</div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 text-sm">
            <div className="bg-card/60 shadow-elev-1 rounded-xl border border-white/10 p-4 backdrop-blur">
              <div className="text-foreground/60 mb-1 text-xs uppercase tracking-widest">
                Répartition
              </div>
              <div className="flex items-center justify-between">
                <span>Prestataire</span>
                <span className="text-foreground/80">99%</span>
              </div>
              <div className="bg-foreground/10 mt-2 h-2 w-full rounded-full">
                <motion.div
                  className="h-2 rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-violet)))',
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '99%' }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
            <div className="bg-card/60 shadow-elev-1 rounded-xl border border-white/10 p-4 backdrop-blur">
              <div className="text-foreground/60 mb-1 text-xs uppercase tracking-widest">
                Part acquéreur
              </div>
              <div className="flex items-center justify-between">
                <span>Acquéreur</span>
                <span className="text-foreground/80">1%</span>
              </div>
              <div className="bg-foreground/10 mt-2 h-2 w-full rounded-full">
                <motion.div
                  className="h-2 rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, hsl(var(--neon-magenta)), hsl(var(--neon-cyan)))',
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '1%' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.8,
                    ease: 'easeOut',
                    delay: 0.1,
                  }}
                />
              </div>
            </div>
            <div className="bg-card/60 shadow-elev-1 rounded-xl border border-white/10 p-4 backdrop-blur">
              <div className="text-foreground/60 mb-1 text-xs uppercase tracking-widest">
                Abonnement
              </div>
              <div className="flex items-center justify-between">
                <span>Mensuel</span>
                <span className="text-foreground/80">0 €</span>
              </div>
              <div className="border-border/60 mt-2 h-2 w-full rounded-full border border-dashed" />
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
