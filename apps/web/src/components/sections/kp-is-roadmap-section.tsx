'use client';

import { motion } from 'framer-motion';
import * as React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Section } from '@/components/section';

const data = [
  { name: 'T1', etablissements: 5, bracelets: 200, ca: 12 },
  { name: 'T2', etablissements: 12, bracelets: 600, ca: 35 },
  { name: 'T3', etablissements: 20, bracelets: 1200, ca: 60 },
  { name: 'T4', etablissements: 30, bracelets: 2100, ca: 95 },
];

export function KPIsRoadmapSection(): JSX.Element {
  return (
    <Section
      id="kpis"
      title="KPIs & Roadmap"
      subtitle="Phases, projections Année 1/2 et jalons prioritaires"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-4"
        >
          <div className="mb-3 font-medium">Etablissements & Bracelets</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="etablissements" stackId="a" fill="#60a5fa" radius={[8, 8, 0, 0]} />
                <Bar dataKey="bracelets" stackId="a" fill="#34d399" radius={[8, 8, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-4"
        >
          <div className="mb-3 font-medium">Chiffre d’affaires (M€)</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ca" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-4"
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { q: 'T1', label: 'Pilotes Monaco & Riviera' },
            { q: 'T2', label: 'Marketplace pro & merch' },
            { q: 'T3', label: 'Navettes VIP & déchets' },
            { q: 'T4', label: 'Déploiement EU' },
          ].map((s) => (
            <li
              key={s.q}
              className="border-border/60 bg-card/60 rounded-xl border p-4 backdrop-blur"
            >
              <div className="text-foreground/70 text-sm">{s.q}</div>
              <div className="font-medium">{s.label}</div>
            </li>
          ))}
        </ol>
      </motion.div>
    </Section>
  );
}
