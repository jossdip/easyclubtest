import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const title = 'EasyClub – Caisse NF525, IA & Monaco‑grade';
  const subtitle =
    'POS tout‑en‑un. IA intégrée. Performance, luxe, précision.';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '64px',
          background:
            'radial-gradient(1200px 600px at 10% -10%, rgba(0,255,200,0.25), transparent), radial-gradient(1200px 600px at 90% 110%, rgba(0,140,255,0.25), #020202)',
          color: '#fff',
          fontFamily: 'Inter, Geist, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 28,
            opacity: 0.85,
            maxWidth: 1000,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
