'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import * as React from 'react';

import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Lottie = dynamic(() => import('lottie-react').then((m) => m.default), { ssr: false });

const DeviceCanvas = dynamic(
  () => import('./_security/device-canvas').then((m) => m.DeviceCanvas),
  { ssr: false, loading: () => null },
);

export function SecurityIDSection(): React.JSX.Element {
  const [scanning, setScanning] = React.useState(false);
  const [result, setResult] = React.useState<'idle' | 'success' | 'fraud'>('idle');
  const [lottieJson, setLottieJson] = React.useState<Record<string, unknown> | null>(null);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (scanning) {
      // Simulate scan duration
      timeout = setTimeout(() => {
        const ok = Math.random() > 0.15;
        setResult(ok ? 'success' : 'fraud');
      }, 1100);
    } else {
      setResult('idle');
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [scanning]);

  React.useEffect(() => {
    // Lazy load a tiny lottie for success/fraud
    const load = async () => {
      try {
        const res = await fetch(
          result === 'success' ? '/lotties/success-min.json' : '/lotties/alert-min.json',
          { cache: 'no-store' },
        );
        if (res.ok) {
          const json = (await res.json()) as Record<string, unknown>;
          setLottieJson(json);
        } else {
          setLottieJson(null);
        }
      } catch {
        setLottieJson(null);
      }
    };
    if (result === 'success' || result === 'fraud') {
      void load();
    } else {
      setLottieJson(null);
    }
  }, [result]);

  return (
    <Section
      id="securite"
      title="Lecteurs de CNI pour Videurs"
      subtitle="Authenticité instantanée, faux documents détectés, historique et blacklist"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02]"
        >
          <DeviceCanvas scanning={scanning} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(0,255,200,0.08),transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="flex flex-col justify-center gap-4"
        >
          <ul className="text-foreground/80 grid gap-2 text-sm">
            <li>• Scan recto/verso, vérification hologrammes et MRZ</li>
            <li>• Détection des anomalies et usurpations</li>
            <li>• Historique consolidé multi‑établissements</li>
            <li>• Blacklist synchronisée et annotable</li>
          </ul>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              className={cn(buttonVariants({ variant: scanning ? 'outline' : 'default' }))}
              onClick={() => setScanning((s) => !s)}
              aria-pressed={scanning}
            >
              {scanning ? 'Arrêter la simulation' : 'Simuler un scan'}
            </button>
            {result !== 'idle' ? (
              <span
                className={cn(
                  'rounded-full px-3 py-1 text-sm',
                  result === 'success'
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-red-500/15 text-red-400',
                )}
                role="status"
                aria-live="polite"
              >
                {result === 'success' ? 'Identité validée' : 'Document suspect'}
              </span>
            ) : null}
          </div>
          <div className="h-28">
            {lottieJson ? (
              <Lottie animationData={lottieJson} loop={false} autoplay style={{ height: '100%' }} />
            ) : null}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
