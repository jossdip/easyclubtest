'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';

import { Section } from '@/components/section';

export function ReservationsSection(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="reservations" aria-label="App Réservation">
      <Section
        title="App Réservation"
        subtitle="Découverte, réservation et commandes en quelques gestes. UX gamifiée, 3–5 étapes claires."
      >
        <motion.div
          initial={{
            opacity: 0,
            y: prefersReducedMotion ? 0 : 14,
            rotateX: prefersReducedMotion ? 0 : -5,
          }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-monaco-gradient/30 relative mb-8 rounded-2xl border border-white/10 p-4 backdrop-blur"
          style={{ transformPerspective: '800px' }}
          aria-hidden
        >
          <div className="shadow-elev-2 relative mx-auto aspect-video max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <video
              src="/videos/video_man_book_table_on_easyclub_app_on_his_couch.mp4"
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* App Mockup Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
              className="absolute -bottom-6 -right-6 z-10 w-1/3 min-w-[140px] max-w-[220px] rotate-[-5deg] transform transition-transform duration-500 hover:rotate-0 md:-bottom-10 md:-right-10 md:w-1/4"
            >
              <Image
                src="/images/fallback/screenshots/app_mockup.png"
                alt="App Interface Mockup"
                width={300}
                height={600}
                className="h-auto w-full rounded-xl border border-white/20 shadow-2xl drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
        <div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="border-border bg-card/60 shadow-elev-1 rounded-xl border p-5 backdrop-blur"
              initial={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : 20,
                rotateX: prefersReducedMotion ? 0 : -8,
              }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.05 }}
            >
              <div className="text-foreground/70 text-sm">
                Étape {i}
                <span className="text-foreground block text-base font-semibold">
                  {i === 1 && 'Découverte et choix'}
                  {i === 2 && 'Réservation et confirmation'}
                  {i === 3 && 'Commande et arrivée'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </section>
  );
}
