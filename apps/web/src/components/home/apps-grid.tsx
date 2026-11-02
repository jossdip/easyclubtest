'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { IPad, Screen } from '@/components/ui/ipad';
import { EASE, Reveal, Words } from '@/components/ui/motion';
import { APPS, shot, type AppId } from '@/lib/site';

/** Les seize apps, dessinées comme leurs tuiles dans l'app. Une touche ouvre l'écran de l'app. */
export function AppsGrid(): React.JSX.Element {
  const t = useTranslations('apps');
  const [open, setOpen] = React.useState<AppId | null>(null);
  const app = APPS.find((a) => a.id === open);

  React.useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setOpen(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <section id="apps" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_60%,rgb(46_16_101/0.6),transparent_70%)]"
      />
      <div className="max-w-site relative mx-auto px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">{t('eyebrow')}</p>
        </Reveal>
        <h2 className="display mx-auto mt-5 max-w-[820px] text-[clamp(40px,6vw,76px)] leading-[1.02]">
          <Words text={t('title')} />
        </h2>
        <Reveal delay={0.1}>
          <p className="text-mute mx-auto mt-6 max-w-[560px] text-[18px] leading-relaxed">
            {t('lead')}
          </p>
        </Reveal>
        <ul className="mx-auto mt-16 grid max-w-[880px] grid-cols-4 gap-x-3 gap-y-9 sm:gap-x-8">
          {APPS.map(({ id, icon: Icon, gradient }, i) => (
            <motion.li
              key={id}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{
                duration: 0.7,
                delay: (i % 4) * 0.06 + Math.floor(i / 4) * 0.08,
                ease: EASE,
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(id)}
                className="group flex w-full flex-col items-center gap-3 outline-none"
              >
                <span
                  className="group-focus-visible:ring-lavender grid aspect-square w-[min(84px,19vw)] place-items-center rounded-[26%] text-white shadow-[0_14px_30px_-10px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.35)] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_50px_-12px_rgb(139_92_246/0.55),inset_0_1px_0_rgb(255_255_255/0.35)] group-focus-visible:ring-2"
                  style={{ background: gradient }}
                >
                  <Icon className="size-[42%]" strokeWidth={1.9} />
                </span>
                <span className="text-moon/90 text-[12.5px] font-medium sm:text-[14px]">
                  {t(`items.${id}.name`)}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {app && (
          <motion.div
            className="bg-night/80 fixed inset-0 z-[60] grid place-items-center p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t(`items.${app.id}.name`)}
              className="w-full max-w-[1000px]"
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center gap-4">
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-[26%] text-white"
                  style={{ background: app.gradient }}
                >
                  <app.icon className="size-6" />
                </span>
                <div className="text-left">
                  <p className="display text-[26px] leading-tight">{t(`items.${app.id}.name`)}</p>
                  <p className="text-mute text-[14.5px]">{t(`items.${app.id}.tagline`)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label={t('close')}
                  className="glass ml-auto grid size-10 place-items-center rounded-full"
                >
                  <X className="size-5" />
                </button>
              </div>
              {app.shot ? (
                <IPad>
                  <Screen {...shot(app.shot)} alt={t(`items.${app.id}.name`)} priority />
                </IPad>
              ) : (
                <div className="glass text-mute grid aspect-[1180/820] place-items-center rounded-[28px]">
                  {t('noPreview')}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
