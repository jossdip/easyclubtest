import { getOptionalRequestContext } from '@cloudflare/next-on-pages';

import { parseRange } from '@/lib/range';

export const runtime = 'edge';

/** Seules les vidéos du site passent par ici (elles vivent dans public/media/video). */
const FILES = new Set([
  'easy-caisse.mp4',
  'easy-rapport.mp4',
  'easy-planning.mp4',
  'vente-directe.mp4',
]);

/** Le fichier statique, par le binding ASSETS de Cloudflare Pages ou, en développement, par simple fetch. */
async function asset(request: Request, name: string): Promise<Response> {
  const url = new URL(`/media/video/${name}`, request.url);
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
  const { name } = await params;
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
    'cache-control': 'public, max-age=86400',
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
