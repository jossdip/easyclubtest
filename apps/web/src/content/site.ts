export const navItems = [
  { href: '#pos', label: 'Caisse' },
  { href: '#reservations', label: 'Réservations' },
  { href: '#avenir-bracelet', label: 'Bracelet (R&D)' },
  { href: '#securite', label: 'Sécurité' },
  { href: '#durabilite', label: 'Durabilité' },
  { href: '#transport', label: 'Transport' },
  { href: '#modele-1pct', label: 'Modèle 1%' },
  { href: '#conformite', label: 'Conformité' },
  { href: '/contact', label: 'Contact' },
] as const;

export const hero = {
  eyebrow: 'POS • IA • NF525',
  title: 'EasyClub — POS “Monaco‑grade”.',
  subtitle:
    'SaaS nightlife‑grade : NF525, assistant IA embarqué, offline‑first, matériel pro. Modèle simple : 1% à l’acquéreur, pas d’abonnement.',
  ctas: [
    { href: '/contact', label: 'Demandez une démo', variant: 'default' as const },
    { href: '/contact', label: 'Contact', variant: 'outline' as const },
  ],
};

export const valueProps = [
  {
    title: 'Conformité NF525',
    description: 'Scellement, clôtures, archivage, audit et traçabilité avancée.',
  },
  {
    title: 'Assistant IA',
    description:
      'Commandes vocales, actions contextuelles, monitoring des coûts, continuité hors‑ligne.',
  },
  {
    title: 'Modèle 1%',
    description: '1% du paiement split à l’acquéreur. Pas d’abonnement.',
  },
  {
    title: 'Matériel pro',
    description:
      'Écrans tactiles, imprimantes thermiques, TPE Ingenico/Verifone, scanners, tiroir‑caisse.',
  },
] as const;

export const footer = {
  rights: '© ' + new Date().getFullYear() + ' EasyClub. Tous droits réservés.',
};
