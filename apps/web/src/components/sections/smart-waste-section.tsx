'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { Section } from '@/components/section';

const radarData = [
  { metric: 'Quantité', value: 70 },
  { metric: 'Tri', value: 65 },
  { metric: 'Réemploi', value: 50 },
  { metric: 'Recyclage', value: 60 },
  { metric: 'Sensibilisation', value: 55 },
];

const savingsData = [
  { month: 'S1', cost: 1200, revenue: 150 },
  { month: 'S2', cost: 1100, revenue: 180 },
  { month: 'S3', cost: 900, revenue: 220 },
  { month: 'S4', cost: 850, revenue: 260 },
  { month: 'S5', cost: 780, revenue: 300 },
  { month: 'S6', cost: 740, revenue: 320 },
];

export function SmartWasteSection(): React.JSX.Element {
  const [view, setView] = React.useState<'KPIs' | 'Économies' | 'ROI'>('KPIs');
  return (
    <section id="dechets" aria-label="Système de Gestion des Déchets Intelligent">
      <Section
        title="Gestion des déchets — intelligente & mesurable"
        subtitle="Bacs connectés, points écologiques, économies et revenus — indicateurs clairs."
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {(['KPIs', 'Économies', 'ROI'] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setView(k)}
              className={`rounded-full border px-3 py-1 text-xs ${
                view === k ? 'border-white/40 bg-white/10' : 'border-white/10 bg-white/5'
              }`}
              aria-pressed={view === k}
            >
              {k}
            </button>
          ))}
        </div>

        {view === 'KPIs' ? (
          <div className="h-72">
            <ResponsiveContainer>
              <RadarChart outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                {/* @ts-ignore */}
                <Radar dataKey="value" stroke="#6a00ff" fill="#6a00ff" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={savingsData}>
                {/* @ts-ignore */}
                <Area type="monotone" dataKey="cost" stroke="#ff5b5b" fill="#ff5b5b33" />
                {/* @ts-ignore */}
                <Area type="monotone" dataKey="revenue" stroke="#00ffd0" fill="#00ffd033" />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </Section>
    </section>
  );
}
