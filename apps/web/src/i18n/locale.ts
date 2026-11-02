import { defaultLocale, locales, type Locale } from './routing';

/** Pays servis en français. Tous les autres pays reçoivent l'anglais. */
export const FRENCH_COUNTRIES: readonly string[] = ['FR'];

export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/**
 * La langue d'une visite :
 * 1. celle choisie avec le sélecteur (cookie) ;
 * 2. sinon le pays de la visite, donné par Cloudflare (`cf-ipcountry`) : français en France, anglais ailleurs ;
 * 3. sans pays connu (poste de développement, hors Cloudflare) : la langue du navigateur.
 */
export function pickLocale({
  cookie,
  country,
  acceptLanguage,
}: {
  cookie?: string | null;
  country?: string | null;
  acceptLanguage?: string | null;
}): Locale {
  if (isLocale(cookie)) {
    return cookie;
  }
  const code = country?.trim().toUpperCase();
  // « XX » : pays inconnu pour Cloudflare ; « T1 » : réseau Tor
  if (code && code !== 'XX' && code !== 'T1') {
    return FRENCH_COUNTRIES.includes(code) ? 'fr' : 'en';
  }
  const first = acceptLanguage?.split(',')[0]?.trim().slice(0, 2).toLowerCase();
  return isLocale(first) ? first : defaultLocale;
}
