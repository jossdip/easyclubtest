'use client';

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { AlertTriangle, CalendarPlus, Check, GlassWater, Mic, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { IPad, Screen } from '@/components/ui/ipad';
import { EASE, Reveal, Words } from '@/components/ui/motion';
import { shot, type Shot } from '@/lib/site';
import { cn } from '@/lib/utils';

/** Une fonction mise en avant : le texte d'un côté, l'écran de l'app de l'autre, qui flotte au défilement. */
function Feature({
  id,
  ns,
  media,
  reverse = false,
  children,
}: {
  id: string;
  ns: 'reservations' | 'stock';
  media: Shot;
  reverse?: boolean;
  children?: React.ReactNode;
}): React.JSX.Element {
  const t = useTranslations(ns);
  const points = t.raw('points') as string[];
  const ref = React.useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [reverse ? -3 : 3, reverse ? 2 : -2],
  );

  return (
    <section id={id} ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div
        className={cn(
          'max-w-site mx-auto grid items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16',
          reverse && 'lg:grid-cols-[1.15fr_0.85fr]',
        )}
      >
        <div className={cn(reverse && 'lg:order-2')}>
          <Reveal>
            <p className="eyebrow">{t('eyebrow')}</p>
          </Reveal>
          <h2 className="display mt-5 text-[clamp(36px,4.6vw,62px)] leading-[1.04]">
            <Words text={t('title')} />
          </h2>
          <Reveal delay={0.1}>
            <p className="text-mute mt-6 max-w-[520px] text-[17.5px] leading-relaxed">
              {t('lead')}
            </p>
          </Reveal>
          <ul className="mt-8 space-y-3">
            {points.map((pt, i) => (
              <Reveal key={pt} delay={0.12 + i * 0.06}>
                <li className="flex items-start gap-3 text-[15.5px] leading-relaxed">
                  <span className="bg-violet/20 text-lavender mt-1 grid size-5 shrink-0 place-items-center rounded-full">
                    {/^(À la voix|By voice)/.test(pt) ? (
                      <Mic className="size-3" />
                    ) : (
                      <Check className="size-3" />
                    )}
                  </span>
                  {pt}
                </li>
              </Reveal>
            ))}
          </ul>
          {children && (
            <Reveal delay={0.2} className="mt-10">
              {children}
            </Reveal>
          )}
        </div>
        <motion.div style={{ y, rotate }} className={cn('relative', reverse && 'lg:order-1')}>
          <Reveal>
            <IPad>
              <Screen {...shot(media)} alt={t('title')} />
            </IPad>
          </Reveal>
          {ns === 'reservations' && <BookingToast />}
        </motion.div>
      </div>
    </section>
  );
}

/** La réservation dictée à Easy qui tombe dans l'agenda, en notification. */
function BookingToast(): React.JSX.Element {
  const t = useTranslations('reservations');
  const ref = React.useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: '-20% 0px' });
  const reduce = useReducedMotion();
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    if (!visible) {
      return;
    }
    if (reduce) {
      setShow(true);
      return;
    }
    // la notification arrive, reste, repart, revient
    let on = false;
    const first = setTimeout(() => setShow((on = true)), 900);
    const loop = setInterval(() => setShow((on = !on)), 3800);
    return () => {
      clearTimeout(first);
      clearInterval(loop);
    };
  }, [visible, reduce]);
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute -bottom-6 -left-2 right-6 sm:-left-8 sm:right-auto"
    >
      <AnimatePresence>
        {show && (
          <motion.div
            className="bg-night/85 flex items-center gap-3 rounded-2xl border border-white/15 p-3 pr-5 shadow-[0_24px_60px_-12px_rgb(0_0_0/0.9),0_0_40px_-8px_rgb(96_165_250/0.5)] backdrop-blur-xl"
            initial={{ opacity: 0, y: 24, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#1D4ED8,#60A5FA)] text-white">
              <CalendarPlus className="size-5" />
            </span>
            <div>
              <p className="flex items-center gap-1.5 text-[13.5px] font-semibold">
                {t('toast')}
                <Mic className="text-lavender size-3.5" />
              </p>
              <p className="text-mute text-[13px]">{t('toastText')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Reservations(): React.JSX.Element {
  return <Feature id="reservations" ns="reservations" media="reservations" />;
}

/* ───────────────────────── Stock : servez un Negroni ───────────────────────── */

const BOTTLES = [
  { key: 'gin', name: 'Gin', start: 52, size: 70, threshold: 14 },
  { key: 'campari', name: 'Campari', start: 21, size: 70, threshold: 15 },
  { key: 'vermouth', name: 'Vermouth rouge', start: 40, size: 75, threshold: 15 },
] as const;
const DOSE = 3; // cl par Negroni et par bouteille

function NegroniDemo(): React.JSX.Element {
  const t = useTranslations('stock');
  const [served, setServed] = React.useState(0);
  const levels = BOTTLES.map((b) => Math.max(0, b.start - served * DOSE));
  const alert = levels.some((l, i) => l < (BOTTLES[i]?.threshold ?? 0));

  return (
    <div className="glass rounded-[26px] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[16px] font-semibold">{t('demoTitle')}</p>
          <p className="text-faint mt-0.5 text-[12.5px]">{t('recipe')}</p>
        </div>
        <span className="text-mute text-[13px] tabular-nums">
          {served} {t('served')}
        </span>
      </div>
      <ul className="mt-5 space-y-3.5">
        {BOTTLES.map((b, i) => {
          const level = levels[i] ?? 0;
          const low = level < b.threshold;
          return (
            <li key={b.key}>
              <div className="flex justify-between text-[13px]">
                <span className={cn(low ? 'text-rose-300' : 'text-moon')}>{b.name}</span>
                <span className="text-faint tabular-nums">
                  {level} / {b.size} cl
                </span>
              </div>
              <div className="relative mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className={cn(
                    'h-full rounded-full',
                    low ? 'bg-rose-400' : 'from-violet to-lavender bg-gradient-to-r',
                  )}
                  animate={{ width: `${(level / b.size) * 100}%` }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
                <span
                  aria-hidden
                  title={t('threshold')}
                  className="absolute inset-y-0 w-px bg-white/50"
                  style={{ left: `${(b.threshold / b.size) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <AnimatePresence>
        {alert && (
          <motion.p
            className="mt-4 flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-400/[0.08] px-3 py-2.5 text-[13px] text-rose-200"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            {t('alert')}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setServed((n) => Math.min(n + 1, 12))}
          className="from-violet to-deep flex items-center gap-2 rounded-full bg-gradient-to-br px-5 py-2.5 text-[14px] font-semibold text-white transition-transform active:scale-95"
        >
          <GlassWater className="size-4" />
          {t('serve')}
        </button>
        {served > 0 && (
          <button
            type="button"
            onClick={() => setServed(0)}
            className="text-mute hover:text-moon flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px]"
          >
            <RotateCcw className="size-3.5" />
            {t('reset')}
          </button>
        )}
      </div>
    </div>
  );
}

export function Stock(): React.JSX.Element {
  return (
    <Feature id="stock" ns="stock" media="stock" reverse>
      <NegroniDemo />
    </Feature>
  );
}
