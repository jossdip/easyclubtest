'use client';

import { motion, useReducedMotion } from 'framer-motion';
import * as React from 'react';

import { Section } from '@/components/section';

export function TransportSection(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="transport" aria-label="Transport nocturne">
      <Section
        title="Transport nocturne — partenaires et vision"
        subtitle="Taxis/VTC partenaires, bus de nuit EasyClub (vision) et covoiturage. Trajectoires lumineuses au défilement."
      >
        <div className="relative mx-auto max-w-3xl">
          <svg
            className="h-64 w-full"
            viewBox="0 0 800 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(0,255,200,1)" />
                <stop offset="100%" stopColor="rgba(0,140,255,1)" />
              </linearGradient>
            </defs>
            <motion.path
              id="route"
              d="M 10 160 C 200 20, 600 20, 790 160"
              stroke="url(#grad)"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0.6 }}
              whileInView={{ pathLength: prefersReducedMotion ? 1 : [0, 1], opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: 'easeInOut' }}
            />
            {!prefersReducedMotion ? (
              <circle r="5" fill="white">
                <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#route" />
                </animateMotion>
              </circle>
            ) : null}
          </svg>
          <div className="text-foreground/70 mt-3 text-sm">
            Liaisons fluides et sûres pour les équipes et les clients (vision).
          </div>
        </div>
      </Section>
    </section>
  );
}
