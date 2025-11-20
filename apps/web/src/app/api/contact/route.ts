import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  company: z.string().min(1),
  message: z.string().min(10).max(2000),
  website: z.string().optional(),
});

// Very simple in-memory rate limiter (per instance)
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000; // 1 min
const MAX_HITS = 8;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip =
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success || parsed.data.website) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  // TODO: integrate with email or CRM. For now, no-op.
  return new NextResponse(null, { status: 204 });
}
