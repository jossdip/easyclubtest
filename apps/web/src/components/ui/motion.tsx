'use client';

import { motion, useInView, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

export const EASE = [0.2, 0.8, 0.2, 1] as const;

/**
 * « Moins d'animations » demandé, mais seulement une fois la page montée : le serveur ne connaît pas ce
 * réglage, et un rendu qui en dépend dès l'hydratation ne correspondrait pas au HTML reçu.
 */
export function useCalm(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted && Boolean(reduce);
}

/** Apparaît en montant légèrement, en sortant du flou, quand l'élément entre dans l'écran. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
} & HTMLMotionProps<'div'>): React.JSX.Element {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Un titre dont les mots se lèvent un à un. */
export function Words({
  text,
  className,
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}): React.JSX.Element {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <span className={cn('inline', className)} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Une vidéo de l'app qui ne joue que lorsqu'elle est visible (et jamais si l'on a demandé moins d'animations). */
export function AppVideo({
  src,
  poster,
  label,
  className,
  onEnded,
  loop = true,
  videoRef,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
  onEnded?: () => void;
  loop?: boolean;
  /** Pour suivre la lecture de l'extérieur (sous-titrage de la voix). */
  videoRef?: React.RefObject<HTMLVideoElement>;
}): React.JSX.Element {
  const own = React.useRef<HTMLVideoElement>(null);
  const ref = videoRef ?? own;
  const visible = useInView(ref, { margin: '-10% 0px -10% 0px' });
  const reduce = useReducedMotion();
  React.useEffect(() => {
    const v = ref.current;
    if (!v) {
      return;
    }
    if (visible && !reduce) {
      v.play().catch(() => {
        /* lecture refusée (économie d'énergie) : l'affiche reste visible */
      });
    } else {
      v.pause();
    }
  }, [visible, reduce]);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      loop={loop}
      preload="metadata"
      aria-label={label}
      onEnded={onEnded}
      className={cn('absolute inset-0 size-full object-cover', className)}
    />
  );
}

/** Un bouton qui se laisse attirer par le curseur. */
export function Magnetic({
  children,
  strength = 0.25,
}: {
  children: React.ReactNode;
  strength?: number;
}): React.JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className="inline-block"
      animate={pos}
      transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.6 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) {
          return;
        }
        const r = ref.current.getBoundingClientRect();
        setPos({
          x: (e.clientX - r.left - r.width / 2) * strength,
          y: (e.clientY - r.top - r.height / 2) * strength,
        });
      }}
      onPointerLeave={() => setPos({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
}

/** Une carte éclairée par le curseur (halo violet qui suit la souris). */
export function Spotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) {
          return;
        }
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
      className={cn(
        'group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] transition-colors duration-500 hover:border-white/[0.14]',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgb(139 92 246 / 0.14), transparent 60%)',
        }}
      />
      {children}
    </div>
  );
}
