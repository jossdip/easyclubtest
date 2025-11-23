import { getRequestConfig } from 'next-intl/server';

import { locales, defaultLocale } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that the incoming `locale` is valid
  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    locale = defaultLocale;
  }

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    // Fallback to default locale or empty messages to prevent crash
    const fallbackMessages = (await import(`../../messages/${defaultLocale}.json`)).default;
    return {
      locale: defaultLocale,
      messages: fallbackMessages,
    };
  }
});
