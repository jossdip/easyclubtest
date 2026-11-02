import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { pickLocale } from './locale';
import { LOCALE_COOKIE } from './routing';

export default getRequestConfig(async () => {
  const h = await headers();
  const locale = pickLocale({
    cookie: (await cookies()).get(LOCALE_COOKIE)?.value,
    country: h.get('cf-ipcountry'),
    acceptLanguage: h.get('accept-language'),
  });
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return { locale, messages };
});
