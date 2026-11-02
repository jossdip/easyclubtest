'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { IPad } from '@/components/ui/ipad';
import { AppVideo, EASE } from '@/components/ui/motion';
import { VIDEOS, type VoiceCues } from '@/lib/site';
import { cn } from '@/lib/utils';

/** Une onde de voix : des barres qui dansent quand on parle, presque plates sinon. */
export function Waveform({
  active,
  bars = 28,
  className,
  barClassName,
}: {
  active: boolean;
  bars?: number;
  className?: string;
  barClassName?: string;
}): React.JSX.Element {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const nodes = [...el.children] as HTMLElement[];
    if (reduce || !active) {
      nodes.forEach(
        (n, i) => (n.style.transform = `scaleY(${active ? 0.5 : 0.12 + 0.05 * Math.sin(i)})`),
      );
      return;
    }
    let raf = 0;
    const tick = (t: number): void => {
      nodes.forEach((n, i) => {
        // une voix : une enveloppe lente (les syllabes) × un frémissement rapide, plus fort au centre
        const center = 1 - Math.abs(i - (nodes.length - 1) / 2) / (nodes.length / 2);
        const syllable = 0.5 + 0.5 * Math.sin(t / 170 + i * 0.35) * Math.sin(t / 310 + i * 0.11);
        const jitter = 0.5 + 0.5 * Math.sin(t / 47 + i * 1.7);
        const v = 0.15 + (0.35 + 0.65 * center) * (0.55 * syllable + 0.45 * jitter);
        n.style.transform = `scaleY(${Math.min(1, v)})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce]);
  return (
    <div ref={ref} aria-hidden className={cn('flex h-8 items-center gap-[3px]', className)}>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className={cn(
            'bg-lavender h-full w-[3px] origin-center rounded-full transition-transform duration-100',
            barClassName,
          )}
        />
      ))}
    </div>
  );
}

type Phase = 'idle' | 'listening' | 'speaking' | 'said';

function phaseAt(t: number, c: VoiceCues): Phase {
  if (t < c.listen) {
    return 'idle';
  }
  if (t < c.speechStart) {
    return 'listening';
  }
  if (t < c.speechEnd) {
    return 'speaking';
  }
  if (t < c.answer + 2.6) {
    return 'said';
  }
  return 'idle';
}

/**
 * Une vidéo d'Easy piloté à la voix, dans l'iPad, avec la phrase dite en sous-titre : le micro s'ouvre,
 * l'onde suit la voix, les mots apparaissent au fil de la phrase. Les repères viennent du tournage.
 */
export function VoicePlayer({
  src,
  cues,
  said,
  label,
  className,
  loop = true,
  onEnded,
}: {
  src: string;
  cues: VoiceCues;
  /** La phrase dite, dans la langue du site (sous-titre) ; la vidéo, elle, montre l'app en français. */
  said: string;
  label: string;
  className?: string;
  loop?: boolean;
  onEnded?: () => void;
}): React.JSX.Element {
  const t = useTranslations('easy');
  const video = React.useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = React.useState<Phase>('idle');
  const [shown, setShown] = React.useState(0); // mots de la phrase déjà dits
  const words = React.useMemo(() => said.split(' '), [said]);

  React.useEffect(() => {
    let raf = 0;
    const tick = (): void => {
      const v = video.current;
      if (v) {
        const now = v.currentTime;
        const p = phaseAt(now, cues);
        setPhase(p);
        const k =
          p === 'speaking'
            ? (now - cues.speechStart) / (cues.speechEnd - cues.speechStart)
            : p === 'said'
              ? 1
              : 0;
        setShown(Math.min(words.length, Math.ceil(k * words.length)));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cues, words.length]);

  return (
    <div className={cn('relative', className)}>
      <IPad>
        <AppVideo
          src={src}
          poster={VIDEOS.poster}
          label={label}
          videoRef={video}
          loop={loop}
          onEnded={onEnded}
        />
      </IPad>
      <AnimatePresence>
        {phase !== 'idle' && (
          <motion.div
            key="voice"
            className="pointer-events-none absolute inset-x-0 -bottom-6 flex justify-center px-4 sm:-bottom-8"
            initial={{ opacity: 0, y: 16, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="bg-night/80 flex max-w-[720px] items-center gap-3 rounded-full border border-white/15 py-2 pl-2 pr-5 shadow-[0_20px_60px_-10px_rgb(0_0_0/0.9),0_0_40px_-6px_rgb(139_92_246/0.6)] backdrop-blur-xl sm:gap-4 sm:py-2.5 sm:pl-2.5">
              <span className="to-violet relative grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 text-white sm:size-11">
                {phase !== 'said' && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-fuchsia-500/40" />
                )}
                <Mic className="relative size-4 sm:size-5" />
              </span>
              <Waveform active={phase === 'speaking'} bars={18} className="hidden h-7 sm:flex" />
              <p className="text-moon min-w-0 text-[13.5px] leading-snug sm:text-[16px]">
                {phase === 'listening' ? (
                  <span className="text-mute">{t('listening')}</span>
                ) : (
                  <>
                    <span className="text-lavender">{t('quote.open')}</span>
                    {words.slice(0, shown).join(' ')}
                    {phase === 'said' && <span className="text-lavender">{t('quote.close')}</span>}
                  </>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
