'use client';

import { motion, useReducedMotion } from 'framer-motion';
import * as React from 'react';

import { EASE } from '@/components/ui/motion';

/**
 * L'Éclipse, le symbole d'EasyClub (brand kit v3, tools/eclipse.py) : un disque couleur de nuit et un
 * croissant de lumière sur son bord supérieur gauche. Le croissant = le disque moins lui-même décalé de
 * D vers le bas à droite (D = 10 % du rayon) ; la lumière : couronne violette floue, halo lavande, liseré,
 * cœur presque blanc. À l'apparition, la lumière glisse le long du bord et s'allume.
 */
export function Eclipse({
  className,
  delay = 0.2,
  duration = 1.8,
  animate = true,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  animate?: boolean;
}): React.JSX.Element {
  const id = React.useId().replaceAll(':', '');
  const reduce = useReducedMotion();
  const still = !animate || reduce;
  const R = 100;
  // décalage du disque masquant, pour un croissant de largeur w (diagonale vers le bas à droite)
  const off = (w: number): number => w * Math.SQRT1_2;
  const rims = [
    { w: 16, blur: 16, color: '#8B5CF6', opacity: 0.8 },
    { w: 10, blur: 5, color: '#A78BFA', opacity: 0.95 },
    { w: 8, blur: 0, color: '#A78BFA', opacity: 1 },
    { w: 4, blur: 0, color: '#EDE9FE', opacity: 1 },
  ];
  const t = { duration, delay, ease: EASE };
  return (
    <svg viewBox="-150 -150 300 300" className={className} aria-hidden>
      <defs>
        <radialGradient id={`${id}-disc`} cx="36%" cy="32%" r="78%">
          <stop offset="0" stopColor="#1F1F2F" />
          <stop offset="1" stopColor="#0E0E17" />
        </radialGradient>
        {rims.map((r, i) => (
          <mask
            key={i}
            id={`${id}-m${i}`}
            maskUnits="userSpaceOnUse"
            x="-150"
            y="-150"
            width="300"
            height="300"
          >
            <circle r={R} fill="#fff" />
            <motion.circle
              r={R}
              fill="#000"
              initial={still ? false : { cx: 0, cy: 0 }}
              animate={{ cx: off(r.w), cy: off(r.w) }}
              transition={t}
            />
          </mask>
        ))}
        {[16, 5].map((b) => (
          <filter key={b} id={`${id}-b${b}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={b} />
          </filter>
        ))}
      </defs>
      <motion.g
        initial={still ? false : { rotate: -75, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ ...t, opacity: { duration: duration * 0.6, delay, ease: EASE } }}
      >
        <circle r={R} fill={`url(#${id}-disc)`} />
        {/* le flou après le masque : la couronne déborde du disque, comme une vraie lumière */}
        {rims.map((r, i) => (
          <g key={i} filter={r.blur ? `url(#${id}-b${r.blur})` : undefined} opacity={r.opacity}>
            <g mask={`url(#${id}-m${i})`}>
              <circle r={R} fill={r.color} />
            </g>
          </g>
        ))}
      </motion.g>
    </svg>
  );
}
