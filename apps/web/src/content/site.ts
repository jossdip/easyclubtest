export const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/solution', label: 'Solution' },
  { href: '/fonctionnalites', label: 'Fonctionnalités' },
  { href: '/materiel', label: 'Matériel' },
  { href: '/conformite', label: 'Conformité' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/contact', label: 'Contact' },
] as const;

export const hero = {
  eyebrow: 'POS • IA • NF525',
  title: 'Point de vente Monaco‑grade.',
  subtitle:
    'Caisse certifiable NF525, assistant IA intégré et matériel pro. Pensé pour l’hôtellerie‑restauration où la précision et la vitesse ne se négocient pas.',
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
