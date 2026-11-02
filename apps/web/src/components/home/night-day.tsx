'use client';

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { IPad, Screen } from '@/components/ui/ipad';
import { Reveal, Words } from '@/components/ui/motion';
import { shot } from '@/lib/site';

/** Nuit ou jour : le même écran dans les deux thèmes, séparés par une poignée que l'on fait glisser. */
export function NightDay(): React.JSX.Element {
  const t = useTranslations('nightday');
  const frame = React.useRef<HTMLDivElement>(null);
  const visible = useInView(frame, { once: true, margin: '-25% 0px' });
  const reduce = useReducedMotion();
  const split = useMotionValue(50); // % de l'écran montré en thème nuit, depuis la gauche
  const clip = useTransform(split, (v) => `inset(0 0 0 ${v}%)`);
  const left = useTransform(split, (v) => `${v}%`);
  const [touched, setTouched] = React.useState(false);

  // un aller-retour de la poignée, pour montrer qu'elle bouge
  React.useEffect(() => {
    if (!visible || reduce || touched) {
      return;
    }
    const controls = animate(split, [50, 22, 78, 50], {
      duration: 3.2,
      ease: 'easeInOut',
      delay: 0.4,
    });
    return () => controls.stop();
  }, [visible, reduce, touched, split]);

  const moveTo = (clientX: number): void => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) {
      return;
    }
    split.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="relative py-28 sm:py-36">
      <div className="max-w-site mx-auto px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">{t('eyebrow')}</p>
        </Reveal>
        <h2 className="display mx-auto mt-5 max-w-[900px] text-[clamp(36px,5.4vw,68px)] leading-[1.04]">
          <Words text={t('title')} />
        </h2>
        <Reveal delay={0.1}>
          <p className="text-mute mx-auto mt-6 max-w-[600px] text-[18px] leading-relaxed">
            {t('lead')}
          </p>
        </Reveal>
      </div>
      <Reveal className="mx-auto mt-14 max-w-[1100px] px-4 sm:px-8">
        <IPad>
          <div
            ref={frame}
            className="absolute inset-0 cursor-ew-resize touch-pan-y select-none"
            onPointerDown={(e) => {
              setTouched(true);
              e.currentTarget.setPointerCapture(e.pointerId);
              moveTo(e.clientX);
            }}
            onPointerMove={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                moveTo(e.clientX);
              }
            }}
          >
            <Screen {...shot('tables')} alt={`${t('night')} — EasyClub OS`} />
            <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
              <Screen {...shot('tables-day')} alt={`${t('day')} — EasyClub OS`} />
            </motion.div>
            <motion.div
              className="absolute inset-y-0 w-px -translate-x-1/2 bg-white/80 shadow-[0_0_20px_rgb(255_255_255/0.6)]"
              style={{ left }}
            >
              <div
                role="slider"
                tabIndex={0}
                aria-label={t('drag')}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(split.get())}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    setTouched(true);
                    split.set(
                      Math.min(100, Math.max(0, split.get() + (e.key === 'ArrowLeft' ? -5 : 5))),
                    );
                  }
                }}
                className="glass text-moon focus-visible:ring-lavender absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-medium shadow-lg outline-none focus-visible:ring-2"
              >
                <Moon className="size-3.5" />
                <span className="text-faint">|</span>
                <Sun className="size-3.5" />
              </div>
            </motion.div>
          </div>
        </IPad>
        <p className="text-faint mt-6 text-center text-[13px]">{t('drag')}</p>
      </Reveal>
    </section>
  );
}
