'use client';

import { motion } from 'framer-motion';
import * as React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Section } from '@/components/section';

type Mode = 'Quantité' | 'Économie' | 'ROI';

function buildData(mode: Mode) {
  const base = [
    { name: 'S1', q: 120, eco: 220, roi: 8 },
    { name: 'S2', q: 100, eco: 260, roi: 16 },
    { name: 'S3', q: 80, eco: 320, roi: 22 },
    { name: 'S4', q: 70, eco: 350, roi: 28 },
    { name: 'S5', q: 65, eco: 380, roi: 32 },
    { name: 'S6', q: 60, eco: 420, roi: 35 },
  ];
  return base.map((d) => ({
    name: d.name,
    value: mode === 'Quantité' ? d.q : mode === 'Économie' ? d.eco : d.roi,
  }));
}

export function SmartWasteSection(): JSX.Element {
  const [mode, setMode] = React.useState<Mode>('Quantité');
  const data = buildData(mode);
  const color = mode === 'Quantité' ? '#60a5fa' : mode === 'Économie' ? '#34d399' : '#f59e0b';

  return (
    <Section
      id="dechets"
      title="Gestion des Déchets Intelligent"
      subtitle="Bacs connectés, points écologiques et gains mesurables"
    >
      <div className="flex flex-wrap items-center gap-2">
        {(['Quantité', 'Économie', 'ROI'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={
              'rounded-full border px-3 py-1 text-sm ' +
              (mode === m ? 'border-white/20 bg-white/10' : 'border-white/10 bg-white/5')
            }
          >
            {m}
          </button>
        ))}
      </div>
      <div className="mt-4 h-72 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="wasteGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.5} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#wasteGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-foreground/70 mt-3 text-sm"
      >
        {mode === 'Quantité'
          ? 'Volume de déchets collectés par segment.'
          : mode === 'Économie'
            ? 'Économies cumulées estimées (€/mois).'
            : 'Retour sur investissement estimé (%).'}
      </motion.div>
    </Section>
  );
}
