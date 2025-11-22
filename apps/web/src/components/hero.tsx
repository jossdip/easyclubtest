'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const Hero3D = dynamic(
  () => import('@/components/hero3d').then((m) => m.Hero3D).catch(() => () => null),
  {
    ssr: false,
    loading: () => null,
  },
);

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section aria-label="Hero" className="bg-monaco-gradient relative isolate overflow-hidden">
      <div className="bg-monaco-gradient pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto flex min-h-[80dvh] max-w-6xl flex-col items-center justify-center gap-6 px-4 pt-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-foreground/60 text-sm uppercase tracking-widest"
        >
          {t('eyebrow')}
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
          {t('title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="text-foreground/70 max-w-2xl text-balance text-lg"
        >
          {t('subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
            role="button"
          >
            {t('cta_demo')}
          </Link>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            role="button"
          >
            {t('cta_contact')}
          </Link>
        </motion.div>
      </div>
      <Hero3D />
    </section>
  );
}
