'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Le nom est trop court').max(80),
  email: z.string().email('Email invalide'),
  company: z.string().min(1, "Nom de l'établissement requis"),
  message: z.string().min(10, 'Votre message est un peu court').max(2000),
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
    <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm md:p-12">
      <div className="mb-10 text-center">
        <h3 className="text-2xl font-bold text-white">Contactez l&apos;équipe</h3>
        <p className="text-muted-foreground mt-2">
          Vous êtes gérant d&apos;établissement ou investisseur ? Écrivez-nous.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-xs font-medium uppercase tracking-wider text-white/60"
            >
              Nom complet
            </Label>
            <Input
              id="name"
              placeholder="Josselin Diperi"
              autoComplete="name"
              className="focus:border-primary/50 border-white/10 bg-white/5 transition-colors focus:bg-white/10"
              {...register('name')}
              aria-invalid={!!errors.name}
            />
            {errors.name ? <p className="text-xs text-red-400">{errors.name.message}</p> : null}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-wider text-white/60"
            >
              Email professionnel
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="contact@easyclub.app"
              autoComplete="email"
              className="focus:border-primary/50 border-white/10 bg-white/5 transition-colors focus:bg-white/10"
              {...register('email')}
              aria-invalid={!!errors.email}
            />
            {errors.email ? <p className="text-xs text-red-400">{errors.email.message}</p> : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="company"
            className="text-xs font-medium uppercase tracking-wider text-white/60"
          >
            Établissement / Société
          </Label>
          <Input
            id="company"
            placeholder="Le Jimmy'z, Twiga..."
            className="focus:border-primary/50 border-white/10 bg-white/5 transition-colors focus:bg-white/10"
            {...register('company')}
            aria-invalid={!!errors.company}
          />
          {errors.company ? <p className="text-xs text-red-400">{errors.company.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="message"
            className="text-xs font-medium uppercase tracking-wider text-white/60"
          >
            Votre message
          </Label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Dites-nous en plus sur vos besoins..."
            className="focus:border-primary/50 resize-none border-white/10 bg-white/5 transition-colors focus:bg-white/10"
            {...register('message')}
            aria-invalid={!!errors.message}
          />
          {errors.message ? <p className="text-xs text-red-400">{errors.message.message}</p> : null}
        </div>

        {/* Honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          {...register('website')}
        />

        <div className="pt-4">
          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            className={cn(
              buttonVariants({ size: 'lg' }),
              'shadow-primary/20 hover:shadow-primary/40 w-full gap-2 font-semibold shadow-lg transition-all',
              status === 'sent' && 'bg-green-500 text-white hover:bg-green-600',
            )}
          >
            {status === 'sending' ? (
              'Envoi en cours...'
            ) : status === 'sent' ? (
              'Message envoyé !'
            ) : (
              <>
                Envoyer le message <Send className="h-4 w-4" />
              </>
            )}
          </button>

          {status === 'error' ? (
            <p className="mt-4 text-center text-sm text-red-400">
              Une erreur est survenue. Veuillez réessayer.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
