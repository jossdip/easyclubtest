'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const VIDEOS = [
  '/videos/video_man_book_table_on_easyclub_app_on_his_couch.mp4',
  '/videos/man_walking_into_a_nightclub_getting_scanned_by_easyclub_bouncer_qrcode.mp4',
  '/videos/People_getting_served_champagne_at_table_in_easyclub_nightclub.mp4',
  '/videos/man_walking_out_nightclub_getting_into_easyclub_van.mp4',
];

export function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVideoIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-20 h-full w-full"
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            poster="/images/fallback/Image_fallback_hero.jpg"
            src={VIDEOS[currentVideoIndex]}
          />
        </motion.div>
      </AnimatePresence>

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
        </motion.div>
      </div>
    </section>
  );
}
