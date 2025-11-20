import createMiddleware from 'next-intl/middleware';

import { locales, defaultLocale } from '@/i18n/routing';

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
