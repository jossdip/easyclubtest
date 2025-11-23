'use client';

import { motion, useAnimation } from 'framer-motion';
import { AlertCircle, Bot, Radio, Shield, Bell } from 'lucide-react';
import * as React from 'react';

import { Section } from '@/components/section';
import { cn } from '@/lib/utils';

export function SecuriteSection(): React.JSX.Element {
  const [isAlertActive, setIsAlertActive] = React.useState(false);
  const controls = useAnimation();

  const handleAlertClick = () => {
    setIsAlertActive(true);
    controls.start({
      scale: [1, 0.95, 1],
      transition: { duration: 0.1 },
    });

    // Simulate alert duration
    setTimeout(() => setIsAlertActive(false), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <Section
        title="Sécurité"
        subtitle="Bouton alerte discret, protocole coordonné et prévention proactive assistée par IA."
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 lg:p-12">
          {/* Animated Background Pulse */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{
                scale: isAlertActive ? [1, 2, 3] : [1, 1.5, 2],
                opacity: isAlertActive ? [0.6, 0.3, 0] : [0.3, 0.1, 0],
              }}
              transition={{
                duration: isAlertActive ? 1 : 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className={cn(
                'h-[500px] w-[500px] rounded-full blur-3xl transition-colors duration-300',
                isAlertActive ? 'bg-red-500/20' : 'bg-red-500/5',
              )}
            />
          </div>

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="group flex items-start gap-4 transition-all hover:translate-x-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 transition-colors group-hover:bg-red-500/30 group-hover:text-red-300">
                  <Radio className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Déclenchement Discret</h3>
                  <p className="text-muted-foreground mt-2">
                    Bouton d'alerte silencieux accessible instantanément. Essayez la simulation
                    interactive ci-contre.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 transition-all hover:translate-x-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 transition-colors group-hover:bg-blue-500/30 group-hover:text-blue-300">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Protocoles Coordonnés</h3>
                  <p className="text-muted-foreground mt-2">
                    Activation automatique des procédures d'urgence : éclairage, portes,
                    notifications aux services de secours.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 transition-all hover:translate-x-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 transition-colors group-hover:bg-purple-500/30 group-hover:text-purple-300">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Prévention IA</h3>
                  <p className="text-muted-foreground mt-2">
                    Analyse comportementale et détection proactive des situations à risque avant
                    qu'elles ne dégénèrent.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Visual Representation */}
            <div className="relative flex aspect-square min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent lg:aspect-auto lg:h-full">
              <div
                className={cn(
                  'absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_70%)] transition-opacity duration-300',
                  isAlertActive ? 'opacity-100' : 'opacity-50',
                )}
              />

              <div className="relative space-y-8 text-center">
                <motion.button
                  animate={controls}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAlertClick}
                  className={cn(
                    'group relative inline-flex h-32 w-32 items-center justify-center rounded-full border-4 backdrop-blur-sm transition-all duration-300 focus:outline-none',
                    isAlertActive
                      ? 'border-red-500 bg-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)]'
                      : 'border-red-500/30 bg-red-500/10 hover:border-red-500/50 hover:bg-red-500/20',
                  )}
                >
                  {isAlertActive ? (
                    <Bell className="h-12 w-12 animate-bounce text-white" />
                  ) : (
                    <AlertCircle className="h-12 w-12 text-red-500 transition-colors group-hover:text-red-400" />
                  )}

                  {/* Ripple rings */}
                  <span
                    className={cn(
                      'absolute inset-0 -z-10 rounded-full border border-red-500/20',
                      isAlertActive ? 'animate-ping' : 'scale-110 opacity-0',
                    )}
                  />
                </motion.button>

                <div className="space-y-1">
                  <div
                    className={cn(
                      'text-sm font-medium uppercase tracking-widest transition-colors duration-300',
                      isAlertActive ? 'text-red-500' : 'text-red-400/60',
                    )}
                  >
                    Status
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {isAlertActive ? 'ALERTE EN COURS' : 'Monitoring Actif'}
                  </div>
                  {isAlertActive && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400"
                    >
                      Signal envoyé aux équipes de sécurité
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </motion.div>
  );
}
