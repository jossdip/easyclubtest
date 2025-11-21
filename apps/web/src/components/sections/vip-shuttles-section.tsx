'use client';

import * as React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Section } from '@/components/section';

type RevenuePoint = { name: string; revenue: number };

function generateEventRevenue(persons: number, price: number): RevenuePoint[] {
  // mock 6 pickup slots
  const base = [0.8, 1.2, 1.5, 1.1, 0.9, 0.7];
  return base.map((m, i) => ({
    name: `T${i + 1}`,
    revenue: Math.round(persons * price * (m / base.length)),
  }));
}

function generateMonthlyRevenue(persons: number, price: number): RevenuePoint[] {
  const base = [1, 0.8, 1.1, 1.3, 1.05, 0.95];
  return base.map((m, i) => ({
    name: `S${i + 1}`,
    revenue: Math.round(persons * price * 6 * m),
  }));
}

export function VIPShuttlesSection(): React.JSX.Element {
  const [persons, setPersons] = React.useState(80);
  const [price, setPrice] = React.useState(30);
  const eventData = React.useMemo(() => generateEventRevenue(persons, price), [persons, price]);
  const monthlyData = React.useMemo(() => generateMonthlyRevenue(persons, price), [persons, price]);
  return (
    <section id="navettes" aria-label="Système de Navettes VIP">
      <Section
        title="Navettes VIP — confort, sécurité, revenus"
        subtitle="Plan simple, ambiance club, simulation temps réel — revenus/soirée et mensuels."
      >
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="flex items-center gap-2">
            <span className="text-sm">Personnes/soirée</span>
            <input
              type="number"
              min={10}
              max={400}
              value={persons}
              onChange={(e) => setPersons(Number(e.target.value))}
              className="border-border bg-background/60 w-24 rounded-md border px-2 py-1 text-sm"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="text-sm">Prix trajet (€)</span>
            <input
              type="number"
              min={5}
              max={200}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="border-border bg-background/60 w-24 rounded-md border px-2 py-1 text-sm"
            />
          </label>
          <div className="self-center text-sm">
            Revenu estimé/soirée:{' '}
            <span className="font-semibold">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
                eventData.reduce((s, d) => s + d.revenue, 0),
              )}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border-border bg-card/60 shadow-elev-1 rounded-2xl border p-4">
            <div className="text-foreground/80 mb-2 text-sm font-semibold">Revenus par soirée</div>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={eventData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#00ffd0" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="border-border bg-card/60 shadow-elev-1 rounded-2xl border p-4">
            <div className="text-foreground/80 mb-2 text-sm font-semibold">Revenus mensuels</div>
            <div className="h-64">
              <ResponsiveContainer>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip />
                  {/* @ts-ignore */}
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6a00ff"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
