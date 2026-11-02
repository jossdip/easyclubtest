'use client';

import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, Loader2, Lock, Mic, ShieldCheck, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { EASE, Reveal, Words } from '@/components/ui/motion';
import { cn } from '@/lib/utils';

interface Command {
  q: string;
  tool: string;
  a: string;
  confirm?: boolean;
}

type Phase = 'typing' | 'thinking' | 'tool' | 'answer';

/**
 * Easy, l'agent : le texte, et une console où l'on essaie des demandes. Les réponses sont celles de
 * l'app de démonstration (mêmes chiffres que les écrans) ; la console tourne seule tant qu'on n'y touche pas.
 */
export function EasySection(): React.JSX.Element {
  const t = useTranslations('easy');
  const commands = t.raw('commands') as Command[];
  const points = [
    { icon: Mic, key: 'voice' },
    { icon: ShieldCheck, key: 'rights' },
    { icon: Lock, key: 'confirm' },
  ] as const;

  return (
    <section id="easy" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_40%,rgb(109_40_217/0.22),transparent_70%)]"
      />
      <div className="max-w-site relative mx-auto grid items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.08fr_1fr]">
        <div>
          <Reveal>
            <p className="eyebrow">{t('eyebrow')}</p>
          </Reveal>
          <h2 className="display mt-5 text-[clamp(40px,5.4vw,70px)] leading-[1.02]">
            <Words text={t('title1')} />
            <br />
            <Words text={t('title2')} delay={0.15} className="text-gradient" />
          </h2>
          <Reveal delay={0.1}>
            <p className="text-mute mt-7 max-w-[540px] text-[18px] leading-relaxed">{t('lead')}</p>
          </Reveal>
          <ul className="mt-10 space-y-6">
            {points.map(({ icon: Icon, key }, i) => (
              <Reveal key={key} delay={0.15 + i * 0.08}>
                <li className="flex gap-4">
                  <span className="glass text-lavender grid size-11 shrink-0 place-items-center rounded-2xl">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-moon font-semibold">{t(`points.${key}.title`)}</p>
                    <p className="text-mute mt-1 text-[15px] leading-relaxed">
                      {t(`points.${key}.text`)}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.1}>
          <Console commands={commands} />
        </Reveal>
      </div>
    </section>
  );
}

function Console({ commands }: { commands: Command[] }): React.JSX.Element {
  const t = useTranslations('easy');
  const ref = React.useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: '-20% 0px -20% 0px' });
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>('typing');
  const [typed, setTyped] = React.useState('');
  const [auto, setAuto] = React.useState(true);
  const [confirmed, setConfirmed] = React.useState(false);
  const cmd = commands[index] ?? commands[0];

  // une demande : la phrase s'écrit, Easy réfléchit, l'outil s'exécute, la réponse arrive
  React.useEffect(() => {
    if (!visible || !cmd) {
      return;
    }
    setConfirmed(false);
    if (reduce) {
      setTyped(cmd.q);
      setPhase('answer');
      return;
    }
    setPhase('typing');
    setTyped('');
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    let i = 0;
    const tick = setInterval(() => {
      i += 1;
      setTyped(cmd.q.slice(0, i));
      if (i >= cmd.q.length) {
        clearInterval(tick);
        timers.push(
          setTimeout(() => setPhase('thinking'), 250),
          setTimeout(() => setPhase('tool'), 1150),
          setTimeout(() => setPhase('answer'), 1700),
        );
      }
    }, 34);
    return () => {
      clearInterval(tick);
      timers.forEach(clearTimeout);
    };
  }, [index, visible, reduce, cmd]);

  // tant qu'on n'y touche pas, la console passe d'elle-même à la demande suivante
  React.useEffect(() => {
    if (!auto || phase !== 'answer' || !visible) {
      return;
    }
    const next = setTimeout(() => setIndex((n) => (n + 1) % commands.length), 3600);
    return () => clearTimeout(next);
  }, [auto, phase, visible, commands.length]);

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[48px] bg-[radial-gradient(closest-side,rgb(139_92_246/0.35),transparent)] blur-2xl"
      />
      <div className="glass overflow-hidden rounded-[30px] shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)]">
        {/* la barre d'Easy, comme dans l'app */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
          <span className="from-violet grid size-8 place-items-center rounded-full bg-gradient-to-br to-fuchsia-500 text-white">
            <Sparkles className="size-4" />
          </span>
          <p className="font-semibold">Easy</p>
          <span className="text-faint ml-auto flex items-center gap-1.5 text-[12px]">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            {t('tryHint')}
          </span>
        </div>

        <div className="min-h-[300px] space-y-3 px-5 py-6 sm:min-h-[320px]" aria-live="polite">
          <div className="flex justify-end">
            <p className="from-violet to-deep max-w-[85%] rounded-[20px] rounded-br-md bg-gradient-to-br px-4 py-2.5 text-[15px] text-white">
              {typed}
              {phase === 'typing' && (
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-white/80" />
              )}
            </p>
          </div>
          <AnimatePresence mode="popLayout">
            {phase === 'thinking' && (
              <motion.p
                key="thinking"
                className="text-faint flex items-center gap-2 text-[14px]"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Loader2 className="size-4 animate-spin" />
                Easy…
              </motion.p>
            )}
            {(phase === 'tool' || phase === 'answer') && (
              <motion.p
                key={`tool-${index}`}
                className="text-mute flex items-start gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-[13.5px]"
                initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {cmd?.confirm ? (
                  <Lock className="text-gold mt-0.5 size-4" />
                ) : (
                  <Check className="mt-0.5 size-4 text-emerald-400" />
                )}
                {cmd?.tool}
              </motion.p>
            )}
            {phase === 'answer' && (
              <motion.div
                key={`answer-${index}`}
                className="max-w-[88%] rounded-[20px] rounded-bl-md bg-white/[0.07] px-4 py-3 text-[15px] leading-relaxed"
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                {cmd?.a}
                {cmd?.confirm && (
                  <button
                    type="button"
                    onClick={() => {
                      setAuto(false);
                      setConfirmed(true);
                    }}
                    className={cn(
                      'mt-3 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors',
                      confirmed
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'from-violet to-deep bg-gradient-to-br text-white',
                    )}
                  >
                    {confirmed && <Check className="size-3.5" />}
                    {t('validate')}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-white/[0.07] px-5 py-4">
          <p className="eyebrow !text-faint !text-[11px]">{t('tryTitle')}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {commands.map((c, i) => (
              <button
                key={c.q}
                type="button"
                onClick={() => {
                  setAuto(false);
                  setIndex(i);
                }}
                aria-pressed={i === index}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-left text-[13px] transition-all duration-300',
                  i === index
                    ? 'border-lavender/50 bg-violet/20 text-moon'
                    : 'text-mute hover:text-moon border-white/10 hover:border-white/25',
                )}
              >
                {c.q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
