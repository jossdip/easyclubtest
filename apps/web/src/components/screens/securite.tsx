'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Bot, Radio, Shield } from 'lucide-react';
import * as React from 'react';

import { Section } from '@/components/section';

export function SecuriteSection(): React.JSX.Element {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <Section
        title="Sécurité — alerte, protocole, prévention IA"
        subtitle="Bouton alerte discret, protocole coordonné et prévention proactive assistée par IA."
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 lg:p-12">
          {/* Animated Background Pulse */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.3, 0.1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="h-[500px] w-[500px] rounded-full bg-red-500/5 blur-3xl"
            />
          </div>

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                  <Radio className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Déclenchement Discret</h3>
                  <p className="text-muted-foreground mt-2">
                    Bouton d'alerte silencieux accessible instantanément depuis n'importe quel
                    terminal. Alerte immédiate de la sécurité et du management.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Protocoles Coordonnés</h3>
                  <p className="text-muted-foreground mt-2">
                    Activation automatique des procédures d'urgence : éclairage, portes,
                    notifications aux services de secours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Prévention IA</h3>
                  <p className="text-muted-foreground mt-2">
                    Analyse comportementale et détection proactive des situations à risque avant
                    qu'elles ne dégénèrent.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Representation */}
            <div className="relative flex aspect-square min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent lg:aspect-auto lg:h-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_70%)]" />
              <div className="relative space-y-4 text-center">
                <div className="inline-flex h-24 w-24 animate-pulse items-center justify-center rounded-full border-4 border-red-500/10 bg-red-500/20 backdrop-blur-sm">
                  <AlertCircle className="h-10 w-10 text-red-500" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium uppercase tracking-widest text-red-400">
                    Status
                  </div>
                  <div className="text-2xl font-bold text-white">Monitoring Actif</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </motion.div>
  );
}
