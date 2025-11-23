'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  HeartPulse,
  History,
  Info,
  ShieldAlert,
  ThumbsUp,
} from 'lucide-react';
import * as React from 'react';

import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BraceletLickalyserSection(): React.JSX.Element {
  const [bac, setBac] = React.useState(0.4); // g/L estimation

  // Determine state based on BAC
  const getStatus = (level: number) => {
    if (level < 0.5) {
      return {
        color: '#34d399',
        status: 'Safe',
        icon: ThumbsUp,
        message: 'Tout va bien. Profitez de la soirée !',
        className:
          'border-emerald-500/20 bg-emerald-500/10 text-emerald-200 shadow-emerald-500/10 shadow-lg',
        animation: { scale: [1, 1.02, 1], transition: { duration: 2, repeat: Infinity } },
      };
    }
    if (level < 0.8) {
      return {
        color: '#facc15',
        status: 'Warning',
        icon: Info,
        message: 'Soyez prudent. Pensez à vous hydrater.',
        className: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-200',
        animation: {},
      };
    }
    if (level < 1.2) {
      return {
        color: '#fb923c',
        status: 'Caution',
        icon: AlertTriangle,
        message: 'Ralentissez. Vos amis reçoivent une notification.',
        className: 'border-orange-500/20 bg-orange-500/10 text-orange-200',
        animation: {},
      };
    }
    return {
      color: '#ef4444',
      status: 'Danger',
      icon: ShieldAlert,
      message: 'Niveau critique. Alerte secours prête.',
      className:
        'border-red-500/50 bg-red-500/20 text-red-200 animate-pulse shadow-red-500/20 shadow-xl',
      animation: {
        x: [-2, 2, -2, 2, 0],
        transition: { duration: 0.4, repeat: Infinity, repeatDelay: 1 },
      },
    };
  };

  const state = getStatus(bac);

  return (
    <Section
      id="bracelet"
      title="Suivi de Consommation & Prévention"
      subtitle="Suivi intelligent, alertes amis et sécurité active"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-black/40 shadow-2xl"
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            src="/videos/Man_checks_his_band_calls_a_taxi_easyclub.mp4"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-center gap-8"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="bac" className="text-lg font-medium">
                Simulation du taux d'alcoolémie
              </label>
              <span className="text-muted-foreground text-sm">{bac.toFixed(2)} g/L</span>
            </div>

            <input
              id="bac"
              type="range"
              min={0}
              max={3}
              step={0.05}
              value={bac}
              onChange={(e) => setBac(Number(e.currentTarget.value))}
              className="accent-primary hover:accent-primary/90 h-3 w-full cursor-pointer appearance-none rounded-lg bg-white/10 transition-all"
              style={{
                background: `linear-gradient(to right, #34d399 0%, #facc15 33%, #ef4444 100%)`,
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={state.message}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  ...state.animation,
                }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className={cn(
                  'rounded-xl border p-4 backdrop-blur-sm transition-colors duration-300',
                  state.className,
                )}
              >
                <div className="flex items-center gap-3">
                  <state.icon className={cn('h-6 w-6', bac >= 1.2 && 'animate-bounce')} />
                  <p className="text-balance text-lg font-medium">{state.message}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]">
              <div className="mb-2 flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-lg p-2">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Santé</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Monitoring constant des signes vitaux et détection de chute.
              </p>
            </div>

            <div className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]">
              <div className="mb-2 flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-lg p-2">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Alertes Amis</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Notification automatique aux amis proches en cas de seuil critique.
              </p>
            </div>
            <div className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]">
              <div className="mb-2 flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-lg p-2">
                  <History className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Historique</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Suivi de la consommation sur la soirée et analyse des habitudes.
              </p>
            </div>
            <div className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]">
              <div className="mb-2 flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-lg p-2">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Sécurité</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Liaison directe avec la sécurité du club et les secours si nécessaire.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'w-full border-white/10 hover:bg-white/10 sm:w-auto',
              )}
              onClick={() => setBac(0.0)}
              type="button"
            >
              Réinitialiser la simulation
            </button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
