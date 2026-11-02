import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { defaultLocale, LOCALE_COOKIE, locales, type Locale } from './routing';

function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

/** Langue choisie (cookie posé par le sélecteur), sinon celle du navigateur, sinon le français. */
async function resolveLocale(): Promise<Locale> {
  const chosen = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(chosen)) {
    return chosen;
  }
  const accept = (await headers()).get('accept-language') ?? '';
  const first = accept.split(',')[0]?.trim().slice(0, 2).toLowerCase();
  return isLocale(first) ? first : defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = await resolveLocale();
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return { locale, messages };
});
