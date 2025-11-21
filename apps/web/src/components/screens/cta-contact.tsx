'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';

import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CtaContactSection(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="cta-contact" aria-label="Contact et démo">
      <Section
        title="Prêt à voir EasyClub en action ?"
        subtitle="Demandez une démo ou contactez-nous."
      >
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
            role="button"
          >
            Demandez une démo
          </Link>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            role="button"
          >
            Contact
          </Link>
        </motion.div>
      </Section>
    </section>
  );
}
