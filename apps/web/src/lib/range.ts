/**
 * Lit un en-tête HTTP Range sur un fichier de `size` octets. Safari (Mac, iPhone, iPad) ne lit une
 * vidéo que si le serveur répond par morceaux (206) ; Cloudflare Pages, lui, renvoie toujours le
 * fichier entier. Une seule plage est servie (c'est tout ce que demandent les lecteurs vidéo).
 *
 * @returns la plage (bornes incluses), `null` sans en-tête lisible (fichier entier), ou `'hors-limites'`.
 */
export function parseRange(
  header: string | null,
  size: number,
): { start: number; end: number } | null | 'hors-limites' {
  const m = header?.match(/^bytes=(\d*)-(\d*)/);
  if (!m || (m[1] === '' && m[2] === '')) {
    return null;
  }
  let start: number;
  let end: number;
  if (m[1] === '') {
    // « bytes=-500 » : les 500 derniers octets
    start = Math.max(0, size - Number(m[2]));
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  if (start >= size || start > end) {
    return 'hors-limites';
  }
  return { start, end };
}
