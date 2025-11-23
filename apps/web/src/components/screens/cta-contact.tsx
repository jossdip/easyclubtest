'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CtaContactSection(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="cta-contact"
      aria-label="Contact et démo"
      className="relative overflow-hidden py-24"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-[10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute -right-[10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-md sm:p-12 md:p-16"
        >
          {/* Interactive Gradient Border */}
          <div className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-sm"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span>L'expérience commence ici</span>
            </motion.div>

            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Prêt à voir{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                EasyClub
              </span>{' '}
              en action ?
            </h2>

            <p className="text-muted-foreground mb-10 max-w-2xl text-lg sm:text-xl">
              Rejoignez les clubs les plus exclusifs. Demandez une démo personnalisée ou contactez
              notre équipe pour transformer votre établissement.
            </p>

            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'group relative overflow-hidden bg-white text-black hover:bg-white/90',
                )}
                role="button"
              >
                <span className="relative z-10 flex items-center gap-2 font-semibold">
                  Demander une démo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-white/20 bg-transparent text-white hover:bg-white/10',
                )}
                role="button"
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Nous contacter
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
