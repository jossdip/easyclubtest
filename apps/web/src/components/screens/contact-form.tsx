'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  company: z.string().min(1),
  message: z.string().min(10).max(2000),
  website: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

export function ContactForm(): React.JSX.Element {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    if (values.website) {
      return; // spam
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error('Request failed');
      }
      setStatus('sent');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <Label htmlFor="name">Nom</Label>
        <Input id="name" autoComplete="name" {...register('name')} aria-invalid={!!errors.name} />
        {errors.name ? <p className="mt-1 text-sm text-red-400">Nom invalide.</p> : null}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email ? <p className="mt-1 text-sm text-red-400">Email invalide.</p> : null}
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="company">Établissement</Label>
        <Input id="company" {...register('company')} aria-invalid={!!errors.company} />
        {errors.company ? <p className="mt-1 text-sm text-red-400">Requis.</p> : null}
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" rows={5} {...register('message')} aria-invalid={!!errors.message} />
        {errors.message ? (
          <p className="mt-1 text-sm text-red-400">Ajoutez quelques détails.</p>
        ) : null}
      </div>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register('website')}
      />
      <div className="mt-2 flex items-center gap-3 md:col-span-2">
        <button
          type="submit"
          className={cn(buttonVariants({ size: 'md' }))}
          disabled={status === 'sending'}
          aria-busy={status === 'sending'}
        >
          {status === 'sending' ? 'Envoi…' : 'Envoyer'}
        </button>
        {status === 'sent' ? (
          <span role="status" className="text-sm text-green-400">
            Message envoyé.
          </span>
        ) : null}
        {status === 'error' ? (
          <span role="status" className="text-sm text-red-400">
            Une erreur est survenue.
          </span>
        ) : null}
        <a
          href="mailto:contact@easyclub.app"
          className="text-foreground/70 text-sm underline-offset-4 hover:underline"
        >
          Ou écrivez‑nous
        </a>
      </div>
    </form>
  );
}
