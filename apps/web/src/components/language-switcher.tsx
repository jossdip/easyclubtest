'use client';

import { useLocale } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === 'fr' ? 'en' : 'fr';

  return (
    <Button variant="ghost" size="sm" asChild className="font-medium">
      <Link href={pathname} locale={nextLocale}>
        {locale === 'fr' ? 'EN' : 'FR'}
      </Link>
    </Button>
  );
}
