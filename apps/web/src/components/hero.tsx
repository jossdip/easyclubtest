'use client';

import { motion, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { hero as heroContent } from '@/content/site';
import { cn } from '@/lib/utils';

const Hero3D = dynamic(
  () => import('@/components/hero3d').then((m) => m.Hero3D).catch(() => () => null),
  {
    ssr: false,
    loading: () => null,
  },
);

export function Hero() {
  const prefersReduced = useReducedMotion();
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="bg-monaco-gradient relative isolate overflow-hidden"
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 -z-10',
          prefersReduced ? 'bg-monaco-gradient' : 'bg-monaco-gradient-strong animate-aurora',
        )}
        style={{ backgroundSize: '200% 200%' }}
      />
      {!prefersReduced ? (
        <>
          <div
            className="pointer-events-none absolute -left-24 top-24 -z-10 h-80 w-80 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(0,255,200,0.18), transparent)' }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-24 bottom-16 -z-10 h-96 w-96 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(160,0,255,0.18), transparent)' }}
            aria-hidden
          />
        </>
      ) : null}
      <div className="mx-auto flex min-h-[85dvh] max-w-6xl flex-col items-center justify-center gap-6 px-4 pt-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-foreground/60 text-sm uppercase tracking-widest"
        >
          {heroContent.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          className={cn(
            'max-w-3xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-semibold leading-[1.05] text-transparent md:text-6xl',
          )}
        >
          {heroContent.title}
        </motion.h1>
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
          className="text-foreground/80 flex flex-wrap items-center justify-center gap-2"
          aria-label="Piliers du produit"
        >
          {['NF525', 'Assistant IA', 'Matériel pro', 'Modèle 1%'].map((t) => (
            <li key={t} className="border-border/60 bg-card/60 rounded-full border px-3 py-1 text-xs backdrop-blur">
              {t}
            </li>
          ))}
        </motion.ul>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="text-foreground/70 max-w-2xl text-balance text-lg"
        >
          {heroContent.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          {heroContent.ctas.map((cta) => (
            <Link
              key={cta.label}
              href={cta.href}
              className={cn(buttonVariants({ variant: cta.variant, size: 'lg' }))}
              role="button"
            >
              {cta.label}
            </Link>
          ))}
        </motion.div>
      </div>
      <Hero3D />
      {!prefersReduced ? (
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute left-[10%] top-[20%] h-16 w-16 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md will-change-transform animate-floaty" />
          <div
            className="absolute right-[12%] top-[35%] h-24 w-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-md will-change-transform animate-floaty"
            style={{ animationDelay: '0.8s' }}
          />
          <div
            className="absolute left-1/2 bottom-[15%] h-14 w-28 -translate-x-1/2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md will-change-transform animate-floaty"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      ) : null}
    </section>
  );
}
