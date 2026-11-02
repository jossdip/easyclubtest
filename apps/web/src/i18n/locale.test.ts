import { describe, expect, it } from 'vitest';

import { pickLocale } from './locale';

describe('langue du site', () => {
  it('français en France, quelle que soit la langue du navigateur', () => {
    expect(pickLocale({ country: 'FR', acceptLanguage: 'en-US,en;q=0.9' })).toBe('fr');
  });

  it('anglais dans tous les autres pays, même pour un navigateur en français', () => {
    for (const country of ['MC', 'BE', 'CH', 'CA', 'US', 'GB', 'IT', 'AE']) {
      expect(pickLocale({ country, acceptLanguage: 'fr-FR,fr;q=0.9' })).toBe('en');
    }
  });

  it('le choix fait avec le sélecteur l’emporte sur le pays', () => {
    expect(pickLocale({ cookie: 'en', country: 'FR' })).toBe('en');
    expect(pickLocale({ cookie: 'fr', country: 'US' })).toBe('fr');
  });

  it('sans pays connu : la langue du navigateur, sinon le français', () => {
    expect(pickLocale({ country: 'XX', acceptLanguage: 'en-GB' })).toBe('en');
    expect(pickLocale({ acceptLanguage: 'fr-FR' })).toBe('fr');
    expect(pickLocale({})).toBe('fr');
  });

  it('un cookie invalide est ignoré', () => {
    expect(pickLocale({ cookie: 'de', country: 'FR' })).toBe('fr');
  });
});
