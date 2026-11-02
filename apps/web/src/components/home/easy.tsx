'use client';

import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, Loader2, Lock, Mic, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';

import { EASE, Reveal, Words } from '@/components/ui/motion';
import { VoicePlayer, Waveform } from '@/components/ui/voice';
import { VOICE_VIDEOS } from '@/lib/site';
import { cn } from '@/lib/utils';

interface Demo {
  id: keyof typeof VOICE_VIDEOS;
  tab: string;
  said: string;
  result: string;
}

interface Command {
  q: string;
  steps: string[];
  a: string;
  confirm?: boolean;
}

/**
 * Easy, l'agent, piloté à la voix, sur le back-office : faire la caisse, sortir le rapport, préparer le
 * planning. Trois vidéos filmées dans l'app (la phrase dite en sous-titre), puis une console où l'on
 * « dit » d'autres demandes.
 */
export function EasySection(): React.JSX.Element {
  const t = useTranslations('easy');
  const demos = t.raw('demos') as Demo[];
  const commands = t.raw('commands') as Command[];
  const [active, setActive] = React.useState(0);
  const demo = demos[active] ?? demos[0];
  const points = [
    { icon: Mic, key: 'voice' },
    { icon: ShieldCheck, key: 'rights' },
    { icon: Lock, key: 'confirm' },
  ] as const;

  return (
    <section id="easy" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_30%,rgb(109_40_217/0.25),transparent_70%)]"
      />
      <div className="max-w-site relative mx-auto px-5 sm:px-8">
        <div className="mx-auto max-w-[880px] text-center">
          <Reveal>
            <p className="eyebrow">{t('eyebrow')}</p>
          </Reveal>
          <h2 className="display mt-5 text-[clamp(40px,6vw,80px)] leading-[1.02]">
            <Words text={t('title1')} />{' '}
            <Words text={t('title2')} delay={0.15} className="text-gradient" />
          </h2>
          <Reveal delay={0.1}>
            <p className="text-mute mx-auto mt-6 max-w-[680px] text-[18px] leading-relaxed">
              {t('lead')}
            </p>
          </Reveal>
        </div>

        {/* les trois démonstrations, filmées dans l'app */}
        <Reveal delay={0.1} className="mt-12">
          <div
            role="tablist"
            aria-label="Easy"
            className="mx-auto flex max-w-[760px] flex-wrap justify-center gap-2"
          >
            {demos.map((d, i) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  'relative overflow-hidden rounded-full border px-4 py-2 text-[14px] font-medium transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-[15px]',
                  i === active
                    ? 'border-lavender/50 text-moon'
                    : 'text-mute hover:text-moon border-white/10 hover:border-white/25',
                )}
              >
                {i === active && (
                  <motion.span
                    layoutId="easy-tab"
                    className="bg-violet/25 absolute inset-0 -z-10"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
                {d.tab}
              </button>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-[1100px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={demo?.id}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                {demo && (
                  <VoicePlayer
                    src={VOICE_VIDEOS[demo.id].src}
                    cues={VOICE_VIDEOS[demo.id].cues}
                    said={demo.said}
                    label={`${demo.tab} — ${demo.result}`}
                    loop={false}
                    onEnded={() => setActive((n) => (n + 1) % demos.length)}
                  />
                )}
                <p className="text-mute mx-auto mt-14 max-w-[640px] text-center text-[16px] leading-relaxed sm:mt-16">
                  {demo?.result}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="mt-24 grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <ul className="space-y-7 lg:pt-6">
            {points.map(({ icon: Icon, key }, i) => (
              <Reveal key={key} delay={0.08 * i}>
                <li className="flex gap-4">
                  <span className="glass text-lavender grid size-12 shrink-0 place-items-center rounded-2xl">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-moon text-[18px] font-semibold">
                      {t(`points.${key}.title`)}
                    </p>
                    <p className="text-mute mt-1 text-[15.5px] leading-relaxed">
                      {t(`points.${key}.text`)}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1}>
            <VoiceConsole commands={commands} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type Phase = 'listening' | 'speaking' | 'thinking' | 'steps' | 'answer';

/** La console : on touche une phrase, elle est « dite » (onde, mots qui arrivent), Easy agit et répond. */
function VoiceConsole({ commands }: { commands: Command[] }): React.JSX.Element {
  const t = useTranslations('easy');
  const locale = useLocale();
  const ref = React.useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: '-20% 0px -20% 0px' });
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>('listening');
  const [words, setWords] = React.useState(0);
  const [steps, setSteps] = React.useState(0);
  const [auto, setAuto] = React.useState(true);
  const [confirmed, setConfirmed] = React.useState(false);
  const cmd = commands[index] ?? commands[0];
  const said = React.useMemo(() => (cmd?.q ?? '').split(' '), [cmd]);

  React.useEffect(() => {
    if (!visible || !cmd) {
      return;
    }
    setConfirmed(false);
    if (reduce) {
      setWords(said.length);
      setSteps(cmd.steps.length);
      setPhase('answer');
      return;
    }
    setPhase('listening');
    setWords(0);
    setSteps(0);
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const at = (ms: number, fn: () => void): void => {
      timers.push(setTimeout(fn, ms));
    };
    at(500, () => setPhase('speaking'));
    // la phrase arrive au rythme de la parole, mot à mot
    said.forEach((_, i) => at(500 + (i + 1) * 230, () => setWords(i + 1)));
    const spoken = 500 + said.length * 230 + 350;
    at(spoken, () => setPhase('thinking'));
    at(spoken + 900, () => setPhase('steps'));
    cmd.steps.forEach((_, i) => at(spoken + 900 + i * 420, () => setSteps(i + 1)));
    at(spoken + 900 + cmd.steps.length * 420 + 200, () => setPhase('answer'));
    return () => timers.forEach(clearTimeout);
  }, [index, visible, reduce, cmd, said]);

  // tant qu'on n'y touche pas, la console passe d'elle-même à la demande suivante
  React.useEffect(() => {
    if (!auto || phase !== 'answer' || !visible) {
      return;
    }
    const next = setTimeout(() => setIndex((n) => (n + 1) % commands.length), 4200);
    return () => clearTimeout(next);
  }, [auto, phase, visible, commands.length]);

  const speakAnswer = (): void => {
    if (!cmd || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(cmd.a);
    u.lang = locale === 'fr' ? 'fr-FR' : 'en-GB';
    window.speechSynthesis.speak(u);
  };

  const hearing = phase === 'listening' || phase === 'speaking';

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[48px] bg-[radial-gradient(closest-side,rgb(139_92_246/0.35),transparent)] blur-2xl"
      />
      <div className="glass overflow-hidden rounded-[30px] shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)]">
        {/* le micro, comme dans la barre d'Easy de l'app */}
        <div className="flex items-center gap-4 border-b border-white/[0.07] px-5 py-4">
          <span className="to-violet relative grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 text-white">
            {hearing && (
              <span className="absolute inset-0 animate-ping rounded-full bg-fuchsia-500/40" />
            )}
            <Mic className="relative size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold">Easy</p>
            <p className="text-faint text-[12.5px]">
              {hearing ? t('listening') : phase === 'answer' ? t('voiceReply') : t('thinking')}
            </p>
          </div>
          <Waveform active={phase === 'speaking'} bars={22} className="h-9" />
        </div>

        <div className="min-h-[330px] space-y-3 px-5 py-6" aria-live="polite">
          {/* ce qui a été dit */}
          <div className="flex justify-end">
            <p className="from-violet to-deep flex max-w-[88%] items-start gap-2 rounded-[20px] rounded-br-md bg-gradient-to-br px-4 py-2.5 text-[15px] text-white">
              <Mic className="mt-0.5 size-4 shrink-0 opacity-70" />
              <span>
                {t('quote.open')}
                {said.slice(0, words).join(' ')}
                {words >= said.length && t('quote.close')}
                {phase === 'listening' && <span className="opacity-60">…</span>}
              </span>
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
                {t('thinking')}
              </motion.p>
            )}
          </AnimatePresence>
          {(phase === 'steps' || phase === 'answer') && (
            <ul className="space-y-1.5">
              {cmd?.steps.slice(0, steps).map((s) => (
                <motion.li
                  key={`${index}-${s}`}
                  className="text-mute flex items-start gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-[13.5px]"
                  initial={{ opacity: 0, x: -10, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                  {s}
                </motion.li>
              ))}
            </ul>
          )}
          <AnimatePresence>
            {phase === 'answer' && cmd && (
              <motion.div
                key={`answer-${index}`}
                className="max-w-[92%] rounded-[20px] rounded-bl-md bg-white/[0.07] px-4 py-3 text-[15px] leading-relaxed"
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <span className="text-lavender mr-1.5 inline-flex translate-y-0.5">
                  <Sparkles className="size-4" />
                </span>
                {cmd.a}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {cmd.confirm && (
                    <button
                      type="button"
                      onClick={() => {
                        setAuto(false);
                        setConfirmed(true);
                      }}
                      className={cn(
                        'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors',
                        confirmed
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'from-violet to-deep bg-gradient-to-br text-white',
                      )}
                    >
                      {confirmed && <Check className="size-3.5" />}
                      {t('validate')}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setAuto(false);
                      speakAnswer();
                    }}
                    className="text-mute hover:text-moon flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-1.5 text-[13px] transition-colors"
                  >
                    <Volume2 className="size-3.5" />
                    {t('speak')}
                  </button>
                </div>
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
                  'flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-left text-[13px] transition-all duration-300',
                  i === index
                    ? 'border-lavender/50 bg-violet/20 text-moon'
                    : 'text-mute hover:text-moon border-white/10 hover:border-white/25',
                )}
              >
                <Mic className="size-3.5 shrink-0 opacity-60" />
                {c.q}
              </button>
            ))}
          </div>
          <p className="text-faint mt-3 text-[12px]">{t('tryHint')}</p>
        </div>
      </div>
    </div>
  );
}
