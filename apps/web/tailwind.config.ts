import type { Config } from 'tailwindcss';

const config: Config = {
  // Support both the classic .dark class and data-theme=\"dark\"
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        accent: 'hsl(var(--accent))',
        muted: 'hsl(var(--muted))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        'neon-cyan': 'hsl(var(--neon-cyan))',
        'neon-magenta': 'hsl(var(--neon-magenta))',
        'neon-violet': 'hsl(var(--neon-violet))',
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
      boxShadow: {
        'elev-1': '0 8px 24px rgba(0,0,0,0.25)',
        'elev-2': '0 12px 32px rgba(0,0,0,0.35)',
        'elev-3': '0 20px 48px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        'monaco-gradient':
          'radial-gradient(1200px 600px at 20% -20%, rgba(0,255,200,0.15), transparent 60%), radial-gradient(1200px 600px at 80% 120%, rgba(0,140,255,0.15), transparent 60%)',
        'monaco-gradient-strong':
          'radial-gradient(1200px 600px at 10% -10%, rgba(0,255,200,0.22), transparent 60%), radial-gradient(1200px 600px at 90% 110%, rgba(0,140,255,0.22), transparent 60%)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - 1rem))' },
        },
        marquee2: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shine: {
          '0%': { transform: 'translateX(-150%)' },
          '100%': { transform: 'translateX(150%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(0,255,200,0.0), 0 0 0px rgba(160,0,255,0.0)' },
          '50%': { boxShadow: '0 0 64px rgba(0,255,200,0.18), 0 0 96px rgba(160,0,255,0.12)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration) linear infinite',
        marquee2: 'marquee2 30s linear infinite',
        aurora: 'aurora 12s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        shine: 'shine 1.2s ease-out',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
