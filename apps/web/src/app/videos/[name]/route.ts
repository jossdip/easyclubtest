import { getOptionalRequestContext } from '@cloudflare/next-on-pages';

import { parseRange } from '@/lib/range';

export const runtime = 'edge';

/**
 * Seules les vidéos du site passent par ici (fichiers .mp4 de public/media/video). L'adresse n'a pas
 * d'extension : avec « .mp4 », le cache de Cloudflare se saisit de la première demande (fichier entier,
 * 200) avant de voir qu'il ne doit pas la garder ; sans extension, la demande arrive telle quelle ici.
 */
const FILES = new Set(['easy-caisse', 'easy-rapport', 'easy-planning', 'vente-directe']);

/** Le fichier statique, par le binding ASSETS de Cloudflare Pages ou, en développement, par simple fetch. */
async function asset(request: Request, name: string): Promise<Response> {
  const url = new URL(`/media/video/${name}.mp4`, request.url);
  const env = getOptionalRequestContext()?.env as { ASSETS?: { fetch: typeof fetch } } | undefined;
  return env?.ASSETS ? env.ASSETS.fetch(url) : fetch(url);
}

/**
 * Sert une vidéo par morceaux (206 Partial Content). Cloudflare Pages ignore l'en-tête Range et renvoie
 * toujours le fichier entier, ce que Safari refuse pour une vidéo : elle resterait figée sur l'affiche.
 */
async function serve(
  request: Request,
  { params }: { params: Promise<{ name: string }> },
): Promise<Response> {
  const name = (await params).name.replace(/\.mp4$/, '');
  if (!FILES.has(name)) {
    return new Response('Not found', { status: 404 });
  }
  const file = await asset(request, name);
  if (!file.ok) {
    return new Response('Not found', { status: 404 });
  }
  const body = await file.arrayBuffer();
  const size = body.byteLength;
  const headers = new Headers({
    'content-type': 'video/mp4',
    'accept-ranges': 'bytes',
    // « private » : le cache de Cloudflare garde sinon le fichier entier et répond 200 à chaque demande
    // de morceau, même une fois en cache (vérifié sur easyclub.fr) ; seul le navigateur le garde.
    'cache-control': 'private, max-age=86400',
  });
  const head = request.method === 'HEAD';
  const range = parseRange(request.headers.get('range'), size);
  if (range === 'hors-limites') {
    headers.set('content-range', `bytes */${size}`);
    return new Response(null, { status: 416, headers });
  }
  if (!range) {
    headers.set('content-length', String(size));
    return new Response(head ? null : body, { status: 200, headers });
  }
  headers.set('content-range', `bytes ${range.start}-${range.end}/${size}`);
  headers.set('content-length', String(range.end - range.start + 1));
  return new Response(head ? null : body.slice(range.start, range.end + 1), {
    status: 206,
    headers,
  });
}

export const GET = serve;
export const HEAD = serve;
