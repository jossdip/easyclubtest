'use client';

import { motion } from 'framer-motion';
import { Check, X, Wallet, Receipt, Printer, Tablet, CreditCard, BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Section } from '@/components/section';
import { Card } from '@/components/ui/card';

export function BusinessModelSection() {
  const t = useTranslations('BusinessModel');

  const traditionalCosts = [
    { icon: Receipt, key: 'subscriptions' },
    { icon: Wallet, key: 'pos_subscription' },
    { icon: Printer, key: 'paper_costs' },
    { icon: Tablet, key: 'hardware_costs' },
    { icon: BarChart3, key: 'maintenance' },
  ];

  const easyClubBenefits = [
    { icon: Check, key: 'free_hardware' },
    { icon: Check, key: 'free_software' },
    { icon: Check, key: 'maintenance_included' },
    { icon: Check, key: 'no_subscription' },
    { icon: Check, key: 'paper_included' },
  ];

  return (
    <Section
      id="business-model"
      title={t('title')}
      subtitle={t('subtitle')}
      className="relative overflow-hidden"
    >
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* Traditional Model */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="relative h-full overflow-hidden border-red-500/20 bg-red-500/5 p-8 backdrop-blur-sm">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

            <h3 className="mb-2 text-2xl font-bold text-red-400">{t('traditional_title')}</h3>
            <p className="text-muted-foreground mb-8">{t('traditional_description')}</p>

            <ul className="space-y-4">
              {traditionalCosts.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-red-200/80">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                    <X className="h-4 w-4" />
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm font-medium md:text-base">
                      {t(`costs.${item.key}`)}
                    </span>
                    <item.icon className="h-4 w-4 opacity-50" />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-red-500/20 pt-6">
              <p className="text-center text-sm font-medium text-red-400">
                {t('traditional_summary')}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* EasyClub Model */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="relative h-full overflow-hidden border-emerald-500/20 bg-emerald-500/5 p-8 ring-1 ring-emerald-500/20 backdrop-blur-sm">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

            <h3 className="mb-2 text-2xl font-bold text-emerald-400">{t('easyclub_title')}</h3>
            <p className="text-muted-foreground mb-8">{t('easyclub_description')}</p>

            <ul className="space-y-4">
              {easyClubBenefits.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-emerald-100/90">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium md:text-base">
                    {t(`benefits.${item.key}`)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl bg-emerald-500/10 p-6 text-center">
              <div className="mb-2 flex justify-center">
                <CreditCard className="h-8 w-8 text-emerald-400" />
              </div>
              <p className="text-lg font-bold text-emerald-400">{t('commission_rate')}</p>
              <p className="text-sm text-emerald-200/70">{t('commission_details')}</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
