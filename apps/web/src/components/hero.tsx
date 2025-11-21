'use client';

import { motion } from 'framer-motion';
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
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="bg-monaco-gradient relative isolate overflow-hidden"
    >
      <div className="bg-monaco-gradient pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto flex min-h-[80dvh] max-w-6xl flex-col items-center justify-center gap-6 px-4 pt-24 text-center">
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
    </section>
  );
}
