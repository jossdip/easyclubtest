'use client';

import { motion } from 'framer-motion';
import * as React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Section } from '@/components/section';

function useShuttleData(persons: number, price: number) {
  const nightly = persons * price;
  const monthly = Math.round(nightly * 12);
  const nights = [
    { name: 'Jeu', revenue: Math.round(nightly * 0.8) },
    { name: 'Ven', revenue: nightly },
    { name: 'Sam', revenue: Math.round(nightly * 1.15) },
  ];
  const months = Array.from({ length: 6 }).map((_, i) => ({
    name: `M${i + 1}`,
    revenue: Math.round(monthly * (0.7 + 0.1 * i)),
  }));
  return { nights, months };
}

export function VIPShuttlesSection(): React.JSX.Element {
  const [persons, setPersons] = React.useState(24);
  const [price, setPrice] = React.useState(40);
  const { nights, months } = useShuttleData(persons, price);

  return (
    <Section
      id="navettes"
      title="Navettes VIP"
      subtitle="Confort, sécurité et revenus additionnels — par soirée et mensuels"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-4"
        >
          <div className="mb-3 font-medium">Revenus par soirée</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nights}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#60a5fa" radius={[8, 8, 0, 0]} />
              </BarChart>
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
          <div className="mb-3 font-medium">Revenus mensuels</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={months}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#34d399" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-4 grid gap-4 sm:grid-cols-2"
      >
        <div>
          <label htmlFor="persons" className="text-sm">
            Personnes par navette
          </label>
          <input
            id="persons"
            type="range"
            min={4}
            max={40}
            step={1}
            value={persons}
            onChange={(e) => setPersons(Number(e.currentTarget.value))}
            className="accent-primary h-2 w-full rounded-full bg-white/10"
          />
          <div className="text-foreground/70 text-sm">{persons} personnes</div>
        </div>
        <div>
          <label htmlFor="price" className="text-sm">
            Prix par personne (€)
          </label>
          <input
            id="price"
            type="range"
            min={10}
            max={100}
            step={5}
            value={price}
            onChange={(e) => setPrice(Number(e.currentTarget.value))}
            className="accent-primary h-2 w-full rounded-full bg-white/10"
          />
          <div className="text-foreground/70 text-sm">{price}€</div>
        </div>
      </motion.div>
    </Section>
  );
}
