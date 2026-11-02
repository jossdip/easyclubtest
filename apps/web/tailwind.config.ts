import type { Config } from 'tailwindcss';

// Les couleurs et les polices de la marque (brand kit v3) : voir src/app/globals.css.
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: 'rgb(var(--midnight) / <alpha-value>)',
        night: 'rgb(var(--night) / <alpha-value>)',
        violet: 'rgb(var(--violet) / <alpha-value>)',
        lavender: 'rgb(var(--lavender) / <alpha-value>)',
        deep: 'rgb(var(--deep) / <alpha-value>)',
        ultra: 'rgb(var(--ultra) / <alpha-value>)',
        moon: 'rgb(var(--moon) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        mute: 'rgb(var(--mute) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-jost)', 'Futura', 'Century Gothic', 'sans-serif'],
        sans: ['var(--font-inter)', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.28em',
      },
      maxWidth: {
        site: '1240px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.9' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.04)' },
        },
      },
      animation: {
        marquee: 'marquee 48s linear infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        breathe: 'breathe 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
