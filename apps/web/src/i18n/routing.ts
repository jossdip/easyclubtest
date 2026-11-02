export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';
/** Cookie posé par le sélecteur de langue (lu par src/i18n/request.ts). */
export const LOCALE_COOKIE = 'NEXT_LOCALE';
