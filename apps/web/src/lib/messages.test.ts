import { describe, expect, it } from 'vitest';

import en from '../../messages/en.json';
import fr from '../../messages/fr.json';

/** Toutes les clés (chemins) d'un objet de messages, tableaux compris. */
function keys(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => keys(v, `${prefix}[${i}]`));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

describe('messages du site', () => {
  it('le français et l’anglais ont exactement les mêmes clés', () => {
    expect(keys(en).sort()).toEqual(keys(fr).sort());
  });

  it('aucun texte vide', () => {
    for (const messages of [fr, en]) {
      const empty = keys(messages).filter((k) => {
        const v = k
          .split(/\.|\[|\]\.?/)
          .filter(Boolean)
          .reduce<unknown>((o, p) => (o as Record<string, unknown>)?.[p], messages);
        return typeof v === 'string' && v.trim() === '';
      });
      expect(empty).toEqual([]);
    }
  });

  it('jamais « Nice » : EasyClub est né à Monaco', () => {
    expect(JSON.stringify(fr) + JSON.stringify(en)).not.toMatch(/\bNice\b/);
  });
});
