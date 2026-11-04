import { describe, expect, it } from 'vitest';

import { parseRange } from './range';

describe('parseRange', () => {
  it('sans en-tête : le fichier entier', () => {
    expect(parseRange(null, 1000)).toBeNull();
    expect(parseRange('octets=1-2', 1000)).toBeNull();
  });
  it('la sonde de Safari (bytes=0-1)', () => {
    expect(parseRange('bytes=0-1', 1000)).toEqual({ start: 0, end: 1 });
  });
  it('jusqu’à la fin, et une fin trop loin ramenée au dernier octet', () => {
    expect(parseRange('bytes=200-', 1000)).toEqual({ start: 200, end: 999 });
    expect(parseRange('bytes=900-5000', 1000)).toEqual({ start: 900, end: 999 });
  });
  it('les derniers octets', () => {
    expect(parseRange('bytes=-100', 1000)).toEqual({ start: 900, end: 999 });
  });
  it('hors du fichier', () => {
    expect(parseRange('bytes=1000-', 1000)).toBe('hors-limites');
    expect(parseRange('bytes=50-10', 1000)).toBe('hors-limites');
  });
});
