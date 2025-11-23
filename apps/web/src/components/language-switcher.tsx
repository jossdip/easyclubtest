'use client';

import { useLocale } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === 'fr' ? 'en' : 'fr';

  return (
    <Button
      variant="outline"
      size="lg"
      asChild
      className="border-white/20 bg-white/5 text-lg font-bold backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
    >
      <Link href={pathname} locale={nextLocale}>
        {locale === 'fr' ? 'EN' : 'FR'}
      </Link>
    </Button>
  );
}
