'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Eclipse } from '@/components/eclipse';
import { IPad } from '@/components/ui/ipad';
import { AppVideo, EASE, Magnetic } from '@/components/ui/motion';
import { Stars } from '@/components/ui/stars';
import { VIDEOS } from '@/lib/site';

export function Hero(): React.JSX.Element {
  const t = useTranslations('hero');
  const ref = React.useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // l'iPad se redresse et grandit à mesure qu'on descend, comme posé sur le comptoir puis tendu vers vous
  const rotateX = useTransform(scrollYProgress, [0, 0.42], reduce ? [0, 0] : [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.42], reduce ? [1, 1] : [0.84, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  const eclipseY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 220]);
  const crescentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -260]);
  const fade = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="grain relative overflow-hidden pb-24 pt-28 sm:pt-36 lg:pt-[184px]"
    >
      {/* le ciel : un violet profond en haut, l'horizon qui s'allume en bas */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_-10%,rgb(46_16_101/0.95),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(70%_60%_at_50%_100%,rgb(139_92_246/0.35),transparent_70%)]" />
        <Stars count={70} />
      </div>

      <motion.div
        aria-hidden
        style={{ y: eclipseY, x: '-50%' }}
        className="pointer-events-none absolute left-1/2 top-[-62vw] w-[165vw] opacity-90 sm:top-[-130px] sm:w-[min(1100px,120vw)] lg:top-[-100px]"
      >
        <Eclipse className="w-full" delay={0.15} duration={2.2} />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="max-w-site relative mx-auto px-5 text-center sm:px-8"
      >
        <motion.p
          className="eyebrow"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        >
          {t('eyebrow')}
        </motion.p>
        <h1 className="display mt-6 text-[clamp(44px,8.4vw,112px)] leading-[0.98]">
          {[t('title1'), t('title2')].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={i === 1 ? 'text-gradient block' : 'block'}
                initial={reduce ? false : { y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.6 + i * 0.12, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="text-mute mx-auto mt-7 max-w-[640px] text-[clamp(17px,1.6vw,20px)] leading-relaxed"
          initial={reduce ? false : { opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.95, ease: EASE }}
        >
          {t('lead')}
        </motion.p>
        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
        >
          <Magnetic>
            <a
              href="#contact"
              className="bg-moon text-night inline-flex items-center rounded-full px-6 py-3.5 text-[15px] font-semibold shadow-[0_10px_40px_-8px_rgb(196_181_253/0.6)] transition-transform duration-300 hover:scale-[1.03]"
            >
              {t('ctaDemo')}
            </a>
          </Magnetic>
          <a
            href="#easy"
            className="glass text-moon inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors hover:bg-white/10"
          >
            {t('ctaEasy')}
            <ArrowDown className="size-4" />
          </a>
        </motion.div>
        <motion.p
          className="text-faint mt-6 inline-flex items-center gap-2 text-[13px]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          {t('badge')}
        </motion.p>
      </motion.div>

      {/* l'app, en vrai : Easy ouvre la table 7 et envoie la commande au bar */}
      <div className="relative mx-auto mt-14 max-w-[1180px] px-4 [perspective:1600px] sm:mt-20 sm:px-8">
        <motion.div
          style={{ rotateX, scale, y: lift, transformOrigin: '50% 0%' }}
          initial={reduce ? false : { opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
        >
          <IPad>
            <AppVideo src={VIDEOS.easy} poster={VIDEOS.poster} label={t('videoLabel')} />
          </IPad>
        </motion.div>
      </div>

      {/* le croissant de verre, qui monte de l'horizon */}
      <motion.div
        aria-hidden
        style={{ y: crescentY }}
        className="pointer-events-none absolute -right-[12vw] bottom-[-18vw] w-[46vw] max-w-[640px] opacity-80 sm:-right-[6vw]"
      >
        <img src="/brand/crescent-glass.webp" alt="" className="w-full" draggable={false} />
      </motion.div>
    </section>
  );
}
