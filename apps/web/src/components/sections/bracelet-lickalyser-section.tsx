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
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';

import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BraceletLickalyserSection(): React.JSX.Element {
  const [bac, setBac] = React.useState(0.4); // g/L estimation
  const percent = Math.min(100, Math.max(0, (bac / 3) * 100));

  // Determine state based on BAC
  const getStatus = (level: number) => {
    if (level < 0.5) {
      return {
        color: '#34d399',
        status: 'Safe',
        icon: ThumbsUp,
        message: 'Tout va bien. Profitez de la soirée !',
      };
    }
    if (level < 0.8) {
      return {
        color: '#facc15',
        status: 'Warning',
        icon: Info,
        message: 'Soyez prudent. Pensez à vous hydrater.',
      };
    }
    if (level < 1.2) {
      return {
        color: '#fb923c',
        status: 'Caution',
        icon: AlertTriangle,
        message: 'Ralentissez. Vos amis reçoivent une notification.',
      };
    }
    return {
      color: '#ef4444',
      status: 'Danger',
      icon: ShieldAlert,
      message: 'Niveau critique. Alerte secours prête.',
    };
  };

  const state = getStatus(bac);
  const data = [{ name: 'Bac', value: percent, fill: state.color }];

  return (
    <Section
      id="bracelet"
      title="Bracelet Capteur d'Alcoolémie"
      subtitle="Estimation immédiate, alertes amis et sécurité active"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-black/40 p-8 shadow-2xl"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />

          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              barSize={32}
              data={data}
              startAngle={220}
              endAngle={-40}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background dataKey="value" cornerRadius={20} />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="text-center">
              <motion.div
                key={state.status}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-2 flex justify-center"
              >
                <state.icon className="h-8 w-8" style={{ color: state.color }} />
              </motion.div>
              <div className="text-5xl font-bold tracking-tighter" style={{ color: state.color }}>
                {bac.toFixed(2)} <span className="text-2xl font-normal text-white/60">g/L</span>
              </div>
              <div
                className="mt-2 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur-md"
                style={{
                  borderColor: `${state.color}40`,
                  backgroundColor: `${state.color}10`,
                  color: state.color,
                }}
              >
                {state.status}
              </div>
            </div>
          </div>
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <p className="text-balance text-lg font-light">{state.message}</p>
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
