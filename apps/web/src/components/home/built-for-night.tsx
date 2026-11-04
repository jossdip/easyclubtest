'use client';

import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Check,
  CloudUpload,
  KeyRound,
  Link2,
  Palette,
  Plus,
  RefreshCw,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { EASE, Reveal, Spotlight, Words } from '@/components/ui/motion';
import { cn } from '@/lib/utils';

/** « Pensé pour 2 h du matin » : six cartes, dont trois qu'on peut manipuler. */
export function BuiltForNight(): React.JSX.Element {
  const t = useTranslations('night');
  return (
    <section id="nuit" className="relative overflow-x-clip py-28 sm:py-36">
      <div className="max-w-site mx-auto px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">{t('eyebrow')}</p>
        </Reveal>
        <h2 className="display mt-5 max-w-[860px] text-[clamp(40px,6vw,76px)] leading-[1.02]">
          <Words text={t('title')} />
        </h2>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Reveal className="lg:col-span-4">
            <Spotlight className="h-full p-7 sm:p-9">
              <SyncDemo />
            </Spotlight>
          </Reveal>
          <Reveal className="lg:col-span-2" delay={0.08}>
            <Spotlight className="h-full p-7 sm:p-9">
              <OfflineDemo />
            </Spotlight>
          </Reveal>
          <Reveal className="lg:col-span-3" delay={0.04}>
            <Spotlight className="h-full p-7 sm:p-9">
              <JournalDemo />
            </Spotlight>
          </Reveal>
          <Reveal className="lg:col-span-3" delay={0.1}>
            <div className="grid h-full gap-4">
              <SmallCard
                icon={<Palette className="size-5" />}
                title={t('brand.title')}
                text={t('brand.text')}
              />
              <SmallCard
                icon={<KeyRound className="size-5" />}
                title={t('rights.title')}
                text={t('rights.text')}
              />
              <SmallCard
                icon={<RefreshCw className="size-5" />}
                title={t('native.title')}
                text={t('native.text')}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SmallCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}): React.JSX.Element {
  return (
    <Spotlight className="flex h-full items-start gap-5 p-6">
      <span className="glass text-lavender grid size-11 shrink-0 place-items-center rounded-xl">
        {icon}
      </span>
      <div>
        <h3 className="text-[17px] font-semibold">{title}</h3>
        <p className="text-mute mt-1.5 text-[14.5px] leading-relaxed">{text}</p>
      </div>
    </Spotlight>
  );
}

/* ───────────────────────── trois iPads synchronisés ───────────────────────── */

function SyncDemo(): React.JSX.Element {
  const t = useTranslations('night.sync');
  const reduce = useReducedMotion();
  const [lines, setLines] = React.useState(['Negroni', 'Burrata']);
  const [seen, setSeen] = React.useState([2, 2, 2]); // lignes visibles sur chaque iPad
  const [pulse, setPulse] = React.useState(0);
  const devices = [t('floor'), t('bar'), t('door')];

  const add = (): void => {
    const next = [...lines, 'Spritz'].slice(-5);
    setLines(next);
    setPulse((p) => p + 1);
    // l'iPad de salle d'abord, puis les deux autres à quelques millisecondes
    setSeen((s) => [next.length, s[1] ?? 0, s[2] ?? 0]);
    const lag = reduce ? 0 : 1;
    setTimeout(() => setSeen((s) => [s[0] ?? 0, next.length, s[2] ?? 0]), 380 * lag);
    setTimeout(() => setSeen(() => [next.length, next.length, next.length]), 520 * lag);
  };

  return (
    <div>
      <h3 className="display text-[30px] leading-tight">{t('title')}</h3>
      <p className="text-mute mt-3 max-w-[460px] text-[15.5px] leading-relaxed">{t('text')}</p>
      <div className="relative mt-8 grid grid-cols-3 gap-3 sm:gap-5">
        {/* la synchro qui part de la salle vers le bar et l'accueil */}
        <AnimatePresence>
          {!reduce && pulse > 0 && (
            <motion.span
              key={pulse}
              aria-hidden
              className="bg-lavender pointer-events-none absolute top-1/2 z-10 size-3 -translate-x-1/2 rounded-full shadow-[0_0_18px_6px_rgb(139_92_246/0.7)]"
              initial={{ left: '16%', opacity: 1, scale: 0.6 }}
              animate={{ left: ['16%', '50%', '84%'], opacity: [1, 1, 0], scale: [0.6, 1, 0.6] }}
              transition={{ duration: 0.65, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>
        {devices.map((name, d) => (
          <div key={name} className="bg-night/70 rounded-2xl border border-white/10 p-3 sm:p-4">
            <p className="eyebrow !text-faint !text-[10px] !tracking-[0.2em]">{name}</p>
            <LayoutGroup id={`dev-${d}`}>
              <ul className="mt-3 min-h-[124px] space-y-1.5 text-[12.5px] sm:text-[13.5px]">
                <AnimatePresence initial={false}>
                  {lines.slice(0, seen[d]).map((l, i) => (
                    <motion.li
                      key={`${l}-${i}`}
                      layout
                      initial={{ opacity: 0, x: -8, backgroundColor: 'rgba(139,92,246,0.35)' }}
                      animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(255,255,255,0.04)' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="flex justify-between rounded-lg px-2 py-1"
                    >
                      <span>{l}</span>
                      <span className="text-faint">T7</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </LayoutGroup>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="from-violet to-deep mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br px-5 py-2.5 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
      >
        <Plus className="size-4" />
        {t('button')}
      </button>
    </div>
  );
}

/* ───────────────────────── hors ligne ───────────────────────── */

function OfflineDemo(): React.JSX.Element {
  const t = useTranslations('night.offline');
  const [online, setOnline] = React.useState(true);
  const [queued, setQueued] = React.useState(0);
  const [synced, setSynced] = React.useState(false);

  const toggle = (): void => {
    const next = !online;
    setOnline(next);
    if (next && queued > 0) {
      setTimeout(() => {
        setQueued(0);
        setSynced(true);
      }, 900);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <h3 className="display text-[28px] leading-tight">{t('title')}</h3>
      <p className="text-mute mt-3 text-[15px] leading-relaxed">{t('text')}</p>
      <div className="mt-auto pt-8">
        <button
          type="button"
          role="switch"
          aria-checked={online}
          onClick={toggle}
          className={cn(
            'flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition-colors duration-500',
            online
              ? 'border-emerald-400/30 bg-emerald-400/[0.07]'
              : 'border-amber-400/30 bg-amber-400/[0.07]',
          )}
        >
          <span className="flex items-center gap-2.5 text-[14px] font-medium">
            {online ? (
              <Wifi className="size-4 text-emerald-400" />
            ) : (
              <WifiOff className="size-4 text-amber-400" />
            )}
            {online ? t('online') : t('offline')}
          </span>
          <span
            className={cn(
              'relative h-6 w-11 rounded-full transition-colors',
              online ? 'bg-emerald-500/70' : 'bg-white/15',
            )}
          >
            <motion.span
              className="absolute top-0.5 size-5 rounded-full bg-white shadow"
              animate={{ left: online ? 22 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            />
          </span>
        </button>
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSynced(false);
              if (!online) {
                setQueued((q) => q + 1);
              }
            }}
            className="bg-moon text-night rounded-full px-4 py-2 text-[13.5px] font-semibold transition-transform active:scale-95"
          >
            {t('sell')}
          </button>
          <AnimatePresence mode="wait">
            {queued > 0 ? (
              <motion.span
                key="q"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-[13.5px] text-amber-300"
              >
                <CloudUpload className="size-4" />
                {queued} {t('queued')}
              </motion.span>
            ) : synced ? (
              <motion.span
                key="s"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-[13.5px] text-emerald-300"
              >
                <Check className="size-4" />
                {t('synced')}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── le journal scellé ───────────────────────── */

const SEED_TICKETS = [
  { n: 1284, total: '43,00 €', hash: '7f3a·c91e' },
  { n: 1285, total: '186,50 €', hash: '04b2·9d17' },
  { n: 1286, total: '57,00 €', hash: 'e6c0·31aa' },
];
const AMOUNTS = ['28,00 €', '112,40 €', '74,00 €', '15,00 €', '239,00 €', '61,50 €'];

function JournalDemo(): React.JSX.Element {
  const t = useTranslations('night.journal');
  const ref = React.useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: '-20% 0px' });
  const reduce = useReducedMotion();
  const [tickets, setTickets] = React.useState(SEED_TICKETS);

  React.useEffect(() => {
    if (!visible || reduce) {
      return;
    }
    const timer = setInterval(() => {
      setTickets((list) => {
        const last = list.at(-1) ?? SEED_TICKETS[2];
        const n = (last?.n ?? 1286) + 1;
        const hash = ((n * 2654435761) >>> 0).toString(16).padStart(8, '0');
        const next = {
          n,
          total: AMOUNTS[n % AMOUNTS.length] ?? '20,00 €',
          hash: `${hash.slice(0, 4)}·${hash.slice(4, 8)}`,
        };
        return [...list, next].slice(-3);
      });
    }, 2600);
    return () => clearInterval(timer);
  }, [visible, reduce]);

  return (
    <div ref={ref}>
      <h3 className="display text-[28px] leading-tight">{t('title')}</h3>
      <p className="text-mute mt-3 max-w-[440px] text-[15px] leading-relaxed">{t('text')}</p>
      <ol className="mt-8 space-y-2">
        <AnimatePresence initial={false} mode="popLayout">
          {tickets.map((k, i) => (
            <motion.li
              key={k.n}
              layout
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative"
            >
              {i > 0 && (
                <span
                  aria-hidden
                  className="text-lavender/70 absolute -top-2 left-6 flex h-2 items-center"
                >
                  <Link2 className="size-3.5 -translate-y-1" />
                </span>
              )}
              <div className="bg-night/60 flex items-center justify-between rounded-xl border border-white/[0.08] px-4 py-2.5 font-mono text-[12.5px]">
                <span className="text-moon">#{k.n}</span>
                <span className="text-mute">{k.total}</span>
                <span className="text-faint hidden sm:inline">{k.hash}</span>
                <span className="flex items-center gap-1 text-emerald-300">
                  <Check className="size-3.5" />
                  {t('sealed')}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </div>
  );
}
