export const slogan =
  "EasyClub n'est pas qu'une application, c'est la révolution de la vie nocturne. Née à Monaco, conçue pour le monde.";

export const navItems = [
  { href: '#fundamentaux', label: 'Fundamentaux' },
  { href: '#securite', label: 'Sécurité' },
  { href: '#bracelet', label: 'Bracelet' },
  { href: '#marketplace', label: 'Marketplace' },
  { href: '#merch', label: 'Merch' },
  { href: '#navettes', label: 'Navettes' },
  { href: '#dechets', label: 'Déchets' },
  { href: '#kpis', label: 'KPIs' },
  { href: '#contact', label: 'Contact' },
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

export const sections = [
  { id: 'fundamentaux', title: 'Fundamentaux', subtitle: 'Mission, piliers, conformité' },
  { id: 'securite', title: 'Sécurité', subtitle: 'Vérification CNI, fraude, historique' },
  { id: 'bracelet', title: 'Bracelet', subtitle: 'Estimation, alertes, points' },
  { id: 'marketplace', title: 'Marketplace Pro', subtitle: 'Ressources & notations' },
  { id: 'merch', title: 'Marketplace Merch', subtitle: 'On‑demand & 360°' },
  { id: 'navettes', title: 'Navettes VIP', subtitle: 'Revenus & confort' },
  { id: 'dechets', title: 'Déchets', subtitle: 'KPIs & ROI' },
  { id: 'kpis', title: 'KPIs & Roadmap', subtitle: 'Phases et projections' },
  { id: 'contact', title: 'Contact', subtitle: 'Demande de démo' },
] as const;

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
