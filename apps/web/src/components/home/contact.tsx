'use client';

import { Mail, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Eclipse } from '@/components/eclipse';
import { Magnetic, Reveal, Words } from '@/components/ui/motion';
import { CONTACT } from '@/lib/site';

/** La demande de démo : un e-mail prérempli ou un appel, sans formulaire qui se perd. */
export function Contact(): React.JSX.Element {
  const t = useTranslations('cta');
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(t('subject'))}&body=${encodeURIComponent(t('body'))}`;
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-40">
      <div className="max-w-site relative mx-auto px-5 text-center sm:px-8">
        <Reveal className="mx-auto w-40 sm:w-48">
          <Eclipse className="w-full" delay={0.1} />
        </Reveal>
        <Reveal>
          <p className="eyebrow !text-gold mt-4">{t('eyebrow')}</p>
        </Reveal>
        <h2 className="display mx-auto mt-5 max-w-[900px] text-[clamp(40px,6.4vw,84px)] leading-[1.02]">
          <Words text={t('title')} />
        </h2>
        <Reveal delay={0.1}>
          <p className="text-mute mx-auto mt-6 max-w-[520px] text-[18px] leading-relaxed">
            {t('lead')}
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <a
              href={mailto}
              className="bg-moon text-night inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[16px] font-semibold shadow-[0_10px_50px_-8px_rgb(196_181_253/0.7)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <Mail className="size-4" />
              {t('write')}
            </a>
          </Magnetic>
          <a
            href={`tel:${CONTACT.tel}`}
            className="glass inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[16px] font-medium transition-colors hover:bg-white/10"
          >
            <Phone className="size-4" />
            {t('call')}
          </a>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="text-faint mt-7 text-[14px]">
            <a
              href={`mailto:${CONTACT.email}`}
              className="hover:text-moon underline-offset-4 hover:underline"
            >
              {CONTACT.email}
            </a>
            <span className="mx-3">·</span>
            <a
              href={`tel:${CONTACT.tel}`}
              className="hover:text-moon underline-offset-4 hover:underline"
            >
              {CONTACT.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
