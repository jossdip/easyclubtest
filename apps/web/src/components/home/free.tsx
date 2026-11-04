'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import {
  Armchair,
  BarChart3,
  Boxes,
  CalendarClock,
  CalendarDays,
  Check,
  Gift,
  Megaphone,
  Smartphone,
  Timer,
  Unlink,
  Vault,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Reveal, useCalm, Words } from '@/components/ui/motion';

/** Une icône par abonnement remplacé (même ordre que `free.subs` dans les messages). */
const ICONS: LucideIcon[] = [
  Vault,
  CalendarClock,
  Armchair,
  Boxes,
  CalendarDays,
  Timer,
  Gift,
  Smartphone,
  Megaphone,
  BarChart3,
];

/** Où chaque abonnement flotte avant d'être absorbé (en % de la scène, depuis le centre). */
const SPOTS: Array<[x: number, y: number, rotate: number]> = [
  [-30, -34, -6],
  [0, -40, 3],
  [30, -34, 5],
  [-36, -11, 4],
  [36, -11, -4],
  [-36, 13, -3],
  [36, 13, 6],
  [-27, 35, 5],
  [0, 40, -2],
  [27, 35, -5],
];

/**
 * Gratuit : dix abonnements qui ne se parlent pas flottent autour de la scène ; en descendant, ils sont
 * absorbés un à un par une seule app, EasyClub OS, à 0 € par mois.
 */
export function Free(): React.JSX.Element {
  const t = useTranslations('free');
  const reduce = useCalm();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const subs = t.raw('subs') as string[];
  const points = t.raw('points') as string[];
  // sur téléphone, les abonnements se resserrent pour rester dans l'écran
  const [spread, setSpread] = React.useState(1);
  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const update = (): void => setSpread(mq.matches ? 1 : 0.66);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const zeroOpacity = useTransform(p, [0.5, 0.62], [0, 1]);
  const zeroY = useTransform(p, [0.5, 0.62], ['40%', '0%']);
  const notLinked = useTransform(p, [0.08, 0.18, 0.34, 0.42], [0, 1, 1, 0]);
  const cardScale = useTransform(p, [0.5, 0.7], [0.55, 1]);
  const cardOpacity = useTransform(p, [0.5, 0.64], [0, 1]);
  const halo = useTransform(p, [0.5, 0.8], [0, 1]);

  if (reduce) {
    return (
      <section id="gratuit" className="relative py-28">
        <div className="max-w-site mx-auto px-5 text-center sm:px-8">
          <Header t={t} />
          <ul className="mx-auto mt-12 flex max-w-[880px] flex-wrap justify-center gap-2.5">
            {subs.map((name, i) => (
              <SubPill key={name} name={name} tag={t('tag')} Icon={ICONS[i] ?? Vault} />
            ))}
          </ul>
          <div className="mx-auto mt-10 max-w-[440px]">
            <EasyClubCard t={t} points={points} />
          </div>
          <Future text={t('future')} />
        </div>
      </section>
    );
  }

  return (
    <section id="gratuit" className="relative">
      <div ref={ref} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-24 sm:pt-28">
          <div className="max-w-site relative z-10 mx-auto w-full px-5 text-center sm:px-8">
            <p className="eyebrow !text-gold">{t('eyebrow')}</p>
            <h2 className="display mt-4 text-[clamp(36px,5vw,68px)] leading-[1.02]">
              <span className="block">{t('title1')}</span>
              <motion.span
                style={{ opacity: zeroOpacity, y: zeroY }}
                className="text-gradient block"
              >
                {t('title2')}
              </motion.span>
            </h2>
            <p className="text-mute mx-auto mt-4 hidden max-w-[640px] text-[16px] leading-relaxed md:block [@media(max-height:860px)]:!hidden">
              {t('lead')}
            </p>
          </div>

          <div className="relative mx-auto mt-4 w-full max-w-[1100px] flex-1">
            {/* au centre, d'abord le vide entre les abonnements… */}
            <motion.div
              style={{ opacity: notLinked }}
              className="text-faint absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-dashed border-white/20 px-4 py-2 text-[13px]"
            >
              <Unlink className="size-4" />
              {t('notLinked')}
            </motion.div>
            {subs.map((name, i) => (
              <FloatingSub key={name} i={i} p={p} name={name} tag={t('tag')} spread={spread} />
            ))}
            {/* … puis une seule app, gratuite */}
            <motion.div
              aria-hidden
              style={{ opacity: halo }}
              className="pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.45),transparent)] blur-2xl"
            />
            <motion.div
              style={{ scale: cardScale, opacity: cardOpacity, x: '-50%', y: '-50%' }}
              className="absolute left-1/2 top-1/2 w-[min(440px,86vw)]"
            >
              <EasyClubCard t={t} points={points} />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="max-w-site mx-auto px-5 pb-16 text-center sm:px-8">
        <Future text={t('future')} />
      </div>
    </section>
  );
}

type T = (key: string) => string;

function Header({ t }: { t: T }): React.JSX.Element {
  return (
    <>
      <p className="eyebrow !text-gold">{t('eyebrow')}</p>
      <h2 className="display mt-4 text-[clamp(38px,6vw,80px)] leading-[1.02]">
        {t('title1')} <span className="text-gradient">{t('title2')}</span>
      </h2>
      <p className="text-mute mx-auto mt-5 max-w-[640px] text-[17px] leading-relaxed">
        {t('lead')}
      </p>
    </>
  );
}

function FloatingSub({
  i,
  p,
  name,
  tag,
  spread,
}: {
  i: number;
  p: MotionValue<number>;
  name: string;
  tag: string;
  spread: number;
}): React.JSX.Element {
  const [sx, y, r] = SPOTS[i] ?? [0, 0, 0];
  const x = sx * spread;
  const Icon = ICONS[i] ?? Vault;
  // apparition échelonnée, léger flottement, puis absorption vers le centre, un à un
  const inStart = 0.02 + i * 0.012;
  const absorb = 0.34 + i * 0.018;
  const opacity = useTransform(p, [inStart, inStart + 0.08, absorb, absorb + 0.1], [0, 1, 1, 0]);
  const left = useTransform(p, [absorb, absorb + 0.1], [`${50 + x}%`, '50%']);
  const top = useTransform(p, [absorb, absorb + 0.1], [`${50 + y}%`, '50%']);
  const scale = useTransform(p, [inStart, inStart + 0.08, absorb, absorb + 0.1], [0.7, 1, 1, 0.35]);
  const drift = useTransform(p, [0, 0.34], [0, (i % 2 ? -1 : 1) * 14]);
  const rotate = useTransform(p, [absorb, absorb + 0.1], [r, 0]);
  const blur = useTransform(p, [absorb + 0.04, absorb + 0.1], ['blur(0px)', 'blur(6px)']);
  return (
    <motion.div style={{ left, top, opacity, filter: blur }} className="absolute">
      {/* centrage fixe à part : le mouvement (échelle, rotation, flottement) ne l'écrase pas */}
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ scale, rotate, y: drift }}>
          <SubPill name={name} tag={tag} Icon={Icon} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function SubPill({
  name,
  tag,
  Icon,
}: {
  name: string;
  tag: string;
  Icon: LucideIcon;
}): React.JSX.Element {
  return (
    <div className="glass flex items-center gap-2.5 rounded-2xl py-2 pl-2 pr-3 shadow-[0_12px_30px_-12px_rgb(0_0_0/0.8)] sm:gap-3 sm:py-2.5 sm:pl-2.5 sm:pr-4">
      <span className="text-mute grid size-8 shrink-0 place-items-center rounded-xl bg-white/[0.06] sm:size-9">
        <Icon className="size-4" />
      </span>
      <span className="text-left leading-tight">
        <span className="text-moon block whitespace-nowrap text-[12.5px] font-semibold sm:text-[14px]">
          {name}
        </span>
        <span className="block whitespace-nowrap text-[10.5px] font-medium uppercase tracking-[0.14em] text-rose-300/80 sm:text-[11px]">
          {tag}
        </span>
      </span>
    </div>
  );
}

function EasyClubCard({ t, points }: { t: T; points: string[] }): React.JSX.Element {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/15 bg-[linear-gradient(160deg,rgb(46_16_101/0.85),rgb(10_10_16/0.92)_65%)] p-6 text-left shadow-[0_40px_120px_-30px_rgb(139_92_246/0.8)] backdrop-blur-xl sm:p-8">
      <div className="flex items-center gap-3">
        <img
          src="/brand/app-icon.webp"
          alt=""
          className="size-11 rounded-[24%]"
          draggable={false}
        />
        <p className="display text-[20px]">{t('card')}</p>
      </div>
      <p className="mt-6 flex items-baseline gap-3">
        <span className="display text-[72px] leading-none sm:text-[92px]">{t('price')}</span>
        <span className="text-mute text-[18px]">{t('per')}</span>
      </p>
      <p className="text-moon/85 mt-4 text-[15px] leading-relaxed">{t('cardText')}</p>
      <ul className="mt-5 space-y-2">
        {points.map((pt) => (
          <li key={pt} className="flex items-center gap-2.5 text-[14.5px]">
            <span className="grid size-5 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
              <Check className="size-3.5" />
            </span>
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Future({ text }: { text: string }): React.JSX.Element {
  return (
    <Reveal className="mx-auto mt-6 max-w-[900px]">
      <p className="display text-moon/90 text-[clamp(24px,3.2vw,40px)] leading-[1.2]">
        <Words text={text} stagger={0.025} />
      </p>
    </Reveal>
  );
}
