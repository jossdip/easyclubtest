'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { LanguageSwitch } from '@/components/language-switch';
import { EASE } from '@/components/ui/motion';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/#easy', key: 'easy' },
  { href: '/#app', key: 'product' },
  { href: '/#nuit', key: 'features' },
  { href: '/#apps', key: 'apps' },
  { href: '/#monaco', key: 'monaco' },
] as const;

export function Nav(): React.JSX.Element {
  const t = useTranslations('nav');
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  React.useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'max-w-site mx-auto mt-3 flex h-14 items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-5',
          'mx-3 sm:mx-6 xl:mx-auto',
          scrolled
            ? 'glass shadow-[0_10px_40px_-12px_rgb(0_0_0/0.7)]'
            : 'border border-transparent',
        )}
      >
        <Link href="/" aria-label={t('home')} className="flex shrink-0 items-center">
          {/* le logo allumé (Éclipse + nom), du brand kit */}
          <img
            src="/brand/easyclub-logo.svg"
            alt=""
            className="-ml-3 h-11 w-auto"
            draggable={false}
          />
        </Link>
        <nav aria-label="Navigation" className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-mute hover:text-moon rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors"
            >
              {t(l.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitch className="hidden sm:flex" />
          <a
            href="/#contact"
            className="bg-moon text-night hidden rounded-full px-4 py-2 text-[14px] font-semibold transition-transform duration-300 hover:scale-[1.04] sm:inline-flex"
          >
            {t('demo')}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t('menu')}
            className="text-moon grid size-10 place-items-center rounded-full lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-night/95 fixed inset-0 z-50 flex flex-col px-6 pb-10 pt-6 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <img src="/brand/easyclub-logo.svg" alt="" className="-ml-3 h-11 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('close')}
                className="text-moon grid size-10 place-items-center rounded-full"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Navigation" className="mt-12 flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display py-2 text-4xl"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease: EASE }}
                >
                  {t(l.key)}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto flex items-center justify-between">
              <LanguageSwitch />
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="bg-moon text-night rounded-full px-5 py-3 text-[15px] font-semibold"
              >
                {t('demo')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
