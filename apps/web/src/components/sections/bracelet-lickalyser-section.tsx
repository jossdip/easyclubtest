'use client';

import { motion } from 'framer-motion';
import * as React from 'react';
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';

import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BraceletLickalyserSection(): React.JSX.Element {
  const [bac, setBac] = React.useState(0.4); // g/L estimation
  const percent = Math.min(100, Math.max(0, (bac / 3) * 100));
  const color = bac < 0.5 ? '#34d399' : bac < 1.2 ? '#f59e0b' : '#ef4444';

  const data = [{ name: 'Bac', value: percent, fill: color }];

  return (
    <Section
      id="bracelet"
      title="Bracelet Lickalyser"
      subtitle="Estimation immédiate, alertes amis, points et historique"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              barSize={24}
              data={data}
              startAngle={220}
              endAngle={-40}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background dataKey="value" cornerRadius={12} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color }}>
                {bac.toFixed(2)} g/L
              </div>
              <p className="text-foreground/70 mt-1 text-sm">Niveau estimé</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="flex flex-col justify-center gap-4"
        >
          <label htmlFor="bac" className="text-sm">
            Niveau d’alcoolémie estimé
          </label>
          <input
            id="bac"
            type="range"
            min={0}
            max={3}
            step={0.05}
            value={bac}
            onChange={(e) => setBac(Number(e.currentTarget.value))}
            aria-valuemin={0}
            aria-valuemax={3}
            aria-valuenow={bac}
            className="accent-primary h-2 w-full rounded-full bg-white/10"
          />
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { title: 'Alertes amis', desc: 'Ping de sécurité si seuil dépassé' },
              { title: 'Points', desc: 'Score sobriété et récompenses' },
              { title: 'Historique', desc: 'Courbe quotidienne' },
              { title: 'Conseils', desc: 'Hydratation, pause, taxi' },
            ].map((c) => (
              <div
                key={c.title}
                className="border-border/60 bg-card/60 rounded-xl border p-4 backdrop-blur"
              >
                <div className="font-medium">{c.title}</div>
                <div className="text-foreground/70 text-sm">{c.desc}</div>
              </div>
            ))}
          </div>
          <div className="pt-1">
            <button
              className={cn(buttonVariants({ variant: 'outline' }))}
              onClick={() => setBac(0.0)}
              type="button"
            >
              Réinitialiser
            </button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
