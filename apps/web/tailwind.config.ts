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
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
