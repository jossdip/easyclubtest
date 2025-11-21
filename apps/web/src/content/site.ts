export const navItems = [
  { href: '#fundamentaux', label: 'Fundamentaux' },
  { href: '#securite', label: 'Sécurité' },
  { href: '#bracelet', label: 'Bracelet' },
  { href: '#marketplace', label: 'Marketplace Pro' },
  { href: '#merch', label: 'Merch' },
  { href: '#navettes', label: 'Navettes VIP' },
  { href: '#dechets', label: 'Déchets' },
  { href: '#kpis', label: 'KPIs & Roadmap' },
  { href: '#contact', label: 'Contact' },
] as const;

export const slogan =
  "EasyClub n'est pas qu'une application, c'est la révolution de la vie nocturne. Née à Monaco, conçue pour le monde.";

export const hero = {
  eyebrow: 'POS • IA • NF525',
  title: 'EasyClub — POS “Monaco‑grade”.',
  subtitle:
    'Fundamentaux: mission, valeur, conformité, sécurité, durabilité. Modèle simple: 1% à l’acquéreur, pas d’abonnement.',
  ctas: [
    { href: '#fundamentaux', label: 'Découvrir la plateforme', variant: 'default' as const },
    { href: '/contact', label: 'Nous contacter', variant: 'outline' as const },
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

export const sections = [
  { id: 'fundamentaux', title: 'Fundamentaux', icon: 'ShieldCheck' },
  { id: 'securite', title: 'Sécurité', icon: 'Shield' },
  { id: 'bracelet', title: 'Bracelet', icon: 'Activity' },
  { id: 'marketplace', title: 'Marketplace Pro', icon: 'Store' },
  { id: 'merch', title: 'Merch', icon: 'ShoppingBag' },
  { id: 'navettes', title: 'Navettes VIP', icon: 'Bus' },
  { id: 'dechets', title: 'Déchets', icon: 'Recycle' },
  { id: 'kpis', title: 'KPIs & Roadmap', icon: 'ChartBar' },
  { id: 'contact', title: 'Contact', icon: 'Mail' },
] as const;
