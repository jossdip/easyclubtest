'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Reveal, Words } from '@/components/ui/motion';
import { Stars } from '@/components/ui/stars';

/** Né à Monaco : le croissant de verre monte de l'horizon pendant qu'on descend. */
export function Monaco(): React.JSX.Element {
  const t = useTranslations('monaco');
  const ref = React.useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rise = useTransform(scrollYProgress, [0, 0.65], reduce ? ['18%', '18%'] : ['55%', '18%']);
  const glow = useTransform(scrollYProgress, [0.1, 0.55], [0.2, 1]);

  return (
    <section
      id="monaco"
      ref={ref}
      className="grain relative min-h-[110vh] overflow-hidden py-32 sm:py-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--midnight)),rgb(var(--night))_40%,rgb(var(--night)))]" />
        <Stars count={90} seed={21} />
        <motion.div
          style={{ opacity: glow }}
          className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(70%_60%_at_50%_100%,rgb(139_92_246/0.55),transparent_70%)]"
        />
      </div>
      <div className="max-w-site relative z-10 mx-auto px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">{t('eyebrow')}</p>
        </Reveal>
        <h2 className="display mt-6 text-[clamp(44px,8vw,112px)] leading-[0.98]">
          <Words text={t('title1')} />
          <br />
          <Words text={t('title2')} delay={0.2} className="text-gradient" />
        </h2>
        <Reveal delay={0.15}>
          <p className="text-mute mx-auto mt-8 max-w-[620px] text-[18px] leading-relaxed">
            {t('lead')}
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="glass text-moon/90 mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px]">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            {t('pilot')}
          </p>
        </Reveal>
      </div>
      <motion.div
        aria-hidden
        style={{ y: rise, x: '-50%' }}
        className="pointer-events-none absolute -bottom-[26vw] left-1/2 z-0 w-[min(900px,92vw)]"
      >
        <img src="/brand/crescent-glass.webp" alt="" className="w-full" draggable={false} />
      </motion.div>
    </section>
  );
}
