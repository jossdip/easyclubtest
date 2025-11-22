'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
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
      className="relative isolate flex min-h-[90dvh] items-center justify-center overflow-hidden"
    >
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/fallback/Image_fallback_hero.jpg"
      >
        <source
          src="/videos/People_getting_served_champagne_at_table_in_easyclub_nightclub.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-black/40 backdrop-blur-[1px]" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn(
            'max-w-5xl text-balance bg-gradient-to-b from-white to-white/90 bg-clip-text text-5xl font-extrabold leading-none tracking-tight text-transparent drop-shadow-sm sm:text-7xl md:text-8xl',
          )}
        >
          {"EasyClub n'est pas qu'une application, c'est la révolution de la vie nocturne."}
          <br className="hidden sm:block" />
          {'Née à Monaco, conçue pour le monde.'}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#fundamentaux"
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }),
              'h-auto px-8 py-6 text-lg',
            )}
            role="button"
          >
            Découvrir la plateforme
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'h-auto border-white/20 bg-white/10 px-8 py-6 text-lg text-white hover:bg-white/20',
            )}
            role="button"
          >
            Nous contacter
          </Link>
        </motion.div>
      </div>

      <Hero3D />
    </section>
  );
}
