'use client';

import { motion, useInView } from 'framer-motion';
import {
  Armchair,
  BarChart3,
  Boxes,
  CalendarClock,
  Heart,
  Vault,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { EASE, Reveal, useCalm, Words } from '@/components/ui/motion';
import { cn } from '@/lib/utils';

/** Le parcours d'un client à travers les apps, avec l'icône et la couleur de chaque app. */
const NODES: Array<{ icon: LucideIcon; gradient: string }> = [
  { icon: CalendarClock, gradient: 'linear-gradient(135deg, #1D4ED8 0%, #60A5FA 100%)' },
  { icon: Armchair, gradient: 'linear-gradient(135deg, #B45309 0%, #E8B84B 100%)' },
  { icon: Zap, gradient: 'linear-gradient(135deg, #7C3AED 0%, #D946EF 100%)' },
  { icon: Boxes, gradient: 'linear-gradient(135deg, #9F1239 0%, #FB7185 100%)' },
  { icon: Vault, gradient: 'linear-gradient(135deg, #047857 0%, #34D399 100%)' },
  { icon: BarChart3, gradient: 'linear-gradient(135deg, #0E7490 0%, #22D3EE 100%)' },
  { icon: Heart, gradient: 'linear-gradient(135deg, #BE185D 0%, #F472B6 100%)' },
];

const STEP_MS = 1250;

/**
 * Tout est relié : une soirée de M. Morel traverse les apps l'une après l'autre (réservation, table,
 * commande, stock, caisse, rapport, fiche client) ; une lumière court de l'une à l'autre.
 */
export function Connected(): React.JSX.Element {
  const t = useTranslations('connected');
  const steps = t.raw('steps') as Array<{ app: string; text: string }>;
  const ref = React.useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: '-15% 0px -15% 0px' });
  const reduce = useCalm();
  const [lit, setLit] = React.useState(-1);

  React.useEffect(() => {
    if (reduce) {
      // sans animation : tout le parcours, allumé d'emblée
      setLit(steps.length - 1);
      return;
    }
    if (!visible) {
      return;
    }
    // la lumière avance d'app en app, s'attarde sur la dernière, puis la soirée recommence
    let n = 0;
    setLit(0);
    const timer = setInterval(() => {
      n = n >= steps.length + 1 ? -1 : n + 1;
      setLit(Math.min(n, steps.length - 1));
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [visible, reduce, steps.length]);

  const progress = lit < 0 ? 0 : lit / (steps.length - 1);

  return (
    <section id="relie" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_55%,rgb(46_16_101/0.55),transparent_70%)]"
      />
      <div className="max-w-site relative mx-auto px-5 sm:px-8">
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="eyebrow">{t('eyebrow')}</p>
          </Reveal>
          <h2 className="display mt-5 text-[clamp(40px,6vw,80px)] leading-[1.02]">
            <Words text={t('title1')} />{' '}
            <Words text={t('title2')} delay={0.15} className="text-gradient" />
          </h2>
          <Reveal delay={0.1}>
            <p className="text-mute mx-auto mt-6 max-w-[640px] text-[18px] leading-relaxed">
              {t('lead')}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="glass text-moon/90 mt-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {t('live')}
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-16">
          {/* le fil qui relie les apps, et la lumière qui le parcourt */}
          <div
            aria-hidden
            className="absolute left-[7%] right-[7%] top-[34px] hidden h-px bg-white/10 lg:block"
          >
            <motion.div
              className="from-lavender via-violet h-px bg-gradient-to-r to-fuchsia-400 shadow-[0_0_14px_2px_rgb(139_92_246/0.7)]"
              animate={{ width: `${progress * 100}%` }}
              transition={{
                duration: lit < 0 ? 0.3 : STEP_MS / 1000,
                ease: lit < 0 ? 'easeOut' : 'linear',
              }}
            />
          </div>
          <div
            aria-hidden
            className="absolute bottom-8 left-[34px] top-8 w-px bg-white/10 lg:hidden"
          >
            <motion.div
              className="from-lavender via-violet w-px bg-gradient-to-b to-fuchsia-400 shadow-[0_0_14px_2px_rgb(139_92_246/0.7)]"
              animate={{ height: `${progress * 100}%` }}
              transition={{
                duration: lit < 0 ? 0.3 : STEP_MS / 1000,
                ease: lit < 0 ? 'easeOut' : 'linear',
              }}
            />
          </div>
          <ol className="relative grid gap-6 lg:grid-cols-7 lg:gap-3">
            {steps.map((s, i) => {
              const node = NODES[i] ?? NODES[0];
              const on = i <= lit;
              const Icon = node?.icon ?? CalendarClock;
              return (
                <li
                  key={s.app}
                  className="flex items-center gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
                >
                  <motion.span
                    className="bg-night relative grid size-[68px] shrink-0 place-items-center rounded-[26%] text-white"
                    animate={i === lit ? { scale: [1, 1.14, 1] } : { scale: 1 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-0 rounded-[26%] transition-[filter,opacity] duration-500',
                        on ? 'opacity-100' : 'opacity-30 grayscale',
                      )}
                      style={{ background: node?.gradient }}
                    />
                    {i === lit && (
                      <span
                        aria-hidden
                        className="bg-violet/50 absolute -inset-2 -z-10 rounded-[30%] blur-xl"
                      />
                    )}
                    <Icon
                      className={cn(
                        'relative size-7 transition-opacity duration-500',
                        on ? 'opacity-100' : 'opacity-50',
                      )}
                      strokeWidth={1.9}
                    />
                  </motion.span>
                  <div
                    className={cn(
                      'transition-opacity duration-500',
                      on ? 'opacity-100' : 'opacity-45',
                    )}
                  >
                    <p className="eyebrow !text-[11px]">{s.app}</p>
                    <p className="text-moon mt-1.5 text-[15px] leading-snug lg:text-[14px]">
                      {s.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
