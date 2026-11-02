'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';

import { LOCALE_COOKIE, locales } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/** FR / EN : le choix est gardé un an dans un cookie, lu par src/i18n/request.ts. */
export function LanguageSwitch({ className }: { className?: string }): React.JSX.Element {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  return (
    <div
      role="group"
      aria-label={t('language')}
      className={cn('flex rounded-full border border-white/10 p-0.5', className)}
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={l === locale}
          disabled={pending}
          onClick={() => {
            document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
            startTransition(() => router.refresh());
          }}
          className={cn(
            'font-display rounded-full px-2.5 py-1 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors',
            l === locale ? 'text-moon bg-white/10' : 'text-faint hover:text-moon',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
