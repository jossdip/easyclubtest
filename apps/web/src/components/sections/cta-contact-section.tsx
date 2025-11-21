'use client';

import * as React from 'react';

import { CtaContactSection as Legacy } from '@/components/screens/cta-contact';

export function CTAContactSection(): JSX.Element {
  return (
    <section id="contact" aria-label="Contact">
      <Legacy />
    </section>
  );
}
