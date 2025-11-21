'use client';

import * as React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Section } from '@/components/section';

const data = [
  { name: 'M1', etablissements: 2, bracelets: 50, ca: 8 },
  { name: 'M2', etablissements: 4, bracelets: 120, ca: 16 },
  { name: 'M3', etablissements: 7, bracelets: 250, ca: 28 },
  { name: 'M4', etablissements: 10, bracelets: 420, ca: 42 },
  { name: 'M5', etablissements: 14, bracelets: 650, ca: 58 },
  { name: 'M6', etablissements: 18, bracelets: 900, ca: 76 },
];

export function KPIsRoadmapSection(): React.JSX.Element {
  return (
    <section id="kpis" aria-label="KPIs & Roadmap">
      <Section
        title="KPIs & Roadmap"
        subtitle="Phases de déploiement et projections Année 1—2. Objectifs: établissements, bracelets, CA."
      >
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={data} stackOffset="sign">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="name" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="etablissements"
                stackId="a"
                fill="#00ffd0"
                radius={[6, 6, 0, 0]}
                name="Établissements"
              />
              <Bar
                dataKey="bracelets"
                stackId="a"
                fill="#6a00ff"
                radius={[6, 6, 0, 0]}
                name="Bracelets"
              />
              <Bar
                dataKey="ca"
                stackId="a"
                fill="#ffaa00"
                radius={[6, 6, 0, 0]}
                name="CA (×10k€)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-foreground/80 mt-6 text-sm">
          Timeline: Découverte → Pilote → Déploiement ville → Extension multi‑pays.
        </div>
      </Section>
    </section>
  );
}
