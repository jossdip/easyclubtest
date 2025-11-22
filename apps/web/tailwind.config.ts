import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - 1rem))' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration) linear infinite',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        accent: 'hsl(var(--accent))',
        muted: 'hsl(var(--muted))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
      boxShadow: {
        'elev-1': '0 8px 24px rgba(0,0,0,0.25)',
      },
      backgroundImage: {
        'monaco-gradient':
          'radial-gradient(1200px 600px at 20% -20%, rgba(0,255,200,0.15), transparent 60%), radial-gradient(1200px 600px at 80% 120%, rgba(0,140,255,0.15), transparent 60%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
