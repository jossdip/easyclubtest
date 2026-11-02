'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { IPad, Screen } from '@/components/ui/ipad';
import { AppVideo, EASE, Reveal, Words } from '@/components/ui/motion';
import { shot, TOUR_MEDIA, VIDEOS } from '@/lib/site';
import { cn } from '@/lib/utils';

interface Step {
  app: string;
  title: string;
  text: string;
}

/**
 * Le tour de l'app : sur grand écran, l'iPad reste en place pendant que les étapes défilent à côté
 * (l'écran change avec l'étape) ; sur téléphone, une suite simple d'écrans.
 */
export function Tour(): React.JSX.Element {
  const t = useTranslations('tour');
  const steps = t.raw('steps') as Step[];
  return (
    <section id="app" className="relative py-28 sm:py-36">
      <div className="max-w-site mx-auto px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">{t('eyebrow')}</p>
        </Reveal>
        <h2 className="display mt-5 max-w-[820px] text-[clamp(40px,6vw,76px)] leading-[1.02]">
          <Words text={t('title')} />
        </h2>
        <Reveal delay={0.1}>
          <p className="text-mute mt-6 max-w-[560px] text-[18px] leading-relaxed">{t('lead')}</p>
        </Reveal>
      </div>
      <StickyTour steps={steps} />
      <StackedTour steps={steps} />
    </section>
  );
}

function StickyTour({ steps }: { steps: Step[] }): React.JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length))));
  });
  const media = TOUR_MEDIA[active] ?? TOUR_MEDIA[0];

  return (
    <div
      ref={ref}
      className="relative mt-16 hidden lg:block"
      style={{ height: `${steps.length * 85}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-[minmax(300px,0.72fr)_1.6fr] items-center gap-14 px-8">
          <ol className="relative space-y-2">
            {/* la progression */}
            <div aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-white/10">
              <motion.div
                className="from-lavender to-violet w-px bg-gradient-to-b"
                animate={{ height: `${((active + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>
            {steps.map((s, i) => (
              <li key={s.app} className="pl-7">
                <p
                  className={cn(
                    'eyebrow transition-colors duration-500',
                    i === active ? '!text-lavender' : '!text-faint',
                  )}
                >
                  {s.app}
                </p>
                <AnimatePresence initial={false}>
                  {i === active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <h3 className="display mt-3 text-[34px] leading-[1.08]">{s.title}</h3>
                      <p className="text-mute mt-3 pb-5 text-[16px] leading-relaxed">{s.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="h-3" />
              </li>
            ))}
          </ol>
          <IPad>
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.035, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {media?.video ? (
                  <AppVideo
                    src={media.video}
                    poster={shot(media.shot).src}
                    label={steps[active]?.title ?? ''}
                  />
                ) : (
                  <Screen {...shot(media?.shot ?? 'home')} alt={steps[active]?.title ?? ''} />
                )}
              </motion.div>
            </AnimatePresence>
          </IPad>
        </div>
      </div>
    </div>
  );
}

function StackedTour({ steps }: { steps: Step[] }): React.JSX.Element {
  return (
    <div className="max-w-site mx-auto mt-14 space-y-16 px-5 sm:px-8 lg:hidden">
      {steps.map((s, i) => {
        const m = TOUR_MEDIA[i];
        return (
          <Reveal key={s.app}>
            <p className="eyebrow">{s.app}</p>
            <h3 className="display mt-3 text-[30px] leading-[1.1]">{s.title}</h3>
            <p className="text-mute mt-3 text-[16px] leading-relaxed">{s.text}</p>
            <IPad className="mt-7" glow={false}>
              {m?.video ? (
                <AppVideo src={VIDEOS.venteDirecte} poster={shot(m.shot).src} label={s.title} />
              ) : (
                <Screen {...shot(m?.shot ?? 'home')} alt={s.title} />
              )}
            </IPad>
          </Reveal>
        );
      })}
    </div>
  );
}
