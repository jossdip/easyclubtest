'use client';

import { useLocale } from 'next-intl';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'fr' ? 'en' : 'fr';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="font-medium">
      {locale === 'fr' ? 'EN' : 'FR'}
    </Button>
  );
}
