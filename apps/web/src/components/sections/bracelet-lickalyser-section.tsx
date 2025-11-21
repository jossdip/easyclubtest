'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as React from 'react';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip as ReTooltip,
} from 'recharts';

import { Section } from '@/components/section';
import { cn } from '@/lib/utils';

function BraceletModel() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      {/* torus as bracelet */}
      <torusGeometry args={[1.1, 0.18, 32, 100]} />
      {/* @ts-ignore */}
      <meshStandardMaterial color="#00ffd0" metalness={0.15} roughness={0.25} />
    </mesh>
  );
}

export function BraceletLickalyserSection(): React.JSX.Element {
  const [bac, setBac] = React.useState(0.2); // blood alcohol content estimate (mock)
  const percentage = Math.min(100, Math.max(0, Math.round(bac * 100)));
  const gaugeData = [
    { name: 'BAC', value: percentage, fill: percentage > 50 ? '#ff5b5b' : '#00ffd0' },
  ];
  return (
    <section id="bracelet" aria-label="Bracelet Lickalyser — prévention & social">
      <Section
        title="Bracelet Lickalyser — estimation et prévention"
        subtitle="Estimation d’alcoolémie, alertes amis, points, historique — données locales et anonymisées."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border-border bg-card/60 shadow-elev-1 relative overflow-hidden rounded-2xl border p-6 backdrop-blur">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3] }}>
                {/* @ts-ignore */}
                <ambientLight intensity={0.4} />
                {/* @ts-ignore */}
                <directionalLight position={[2, 2, 2]} intensity={1.2} />
                {/* @ts-ignore */}
                <pointLight position={[-2, -1, -1]} intensity={0.6} color="#6a00ff" />
                <BraceletModel />
                <OrbitControls enablePan={false} enableZoom={false} />
              </Canvas>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="border-border rounded-lg border p-3">
                Estimation alcoolémie
                <div className="text-foreground mt-1 text-lg font-semibold">
                  {(bac * 1.0).toFixed(2)} g/L
                </div>
              </div>
              <div className="border-border rounded-lg border p-3">Alertes amis: activées</div>
              <div className="border-border rounded-lg border p-3">Points: 120</div>
              <div className="border-border rounded-lg border p-3">
                Historique: 3 dernières soirées
              </div>
            </div>
          </div>
          <div className="border-border bg-card/60 shadow-elev-1 relative overflow-hidden rounded-2xl border p-6 backdrop-blur">
            <label htmlFor="bac" className="text-sm font-medium">
              Niveau alcoolémie estimé
            </label>
            <input
              id="bac"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={bac}
              onChange={(e) => setBac(parseFloat(e.target.value))}
              className="accent-primary mt-2 w-full"
            />
            <div className="mt-6 h-64">
              <ResponsiveContainer>
                <RadialBarChart
                  innerRadius="75%"
                  outerRadius="100%"
                  data={gaugeData}
                  startAngle={180}
                  endAngle={0}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <ReTooltip />
                  {/* @ts-ignore */}
                  <RadialBar dataKey="value" cornerRadius={8} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <motion.div
              className={cn(
                'mt-3 rounded-md px-3 py-2 text-sm',
                percentage > 50
                  ? 'bg-red-500/10 text-red-300'
                  : 'bg-emerald-500/10 text-emerald-300',
              )}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {percentage > 50
                ? 'Attention: retour en VTC recommandé.'
                : 'OK: restez prudent et hydratez‑vous.'}
            </motion.div>
          </div>
        </div>
      </Section>
    </section>
  );
}
