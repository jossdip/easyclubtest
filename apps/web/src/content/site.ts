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
  title: 'Révolutionnez votre vie nocturne',
  subtitle: 'Simplicité. Sécurité. Sérénité.',
  ctas: [{ href: '/fonctionnalites', label: 'Découvrir', variant: 'default' as const }],
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
    title: 'Matériel pro',
    description:
      'Écrans tactiles, imprimantes thermiques, TPE Ingenico/Verifone, scanners, tiroir‑caisse.',
  },
] as const;

export const footer = {
  rights: '© ' + new Date().getFullYear() + ' EasyClub. Tous droits réservés.',
};
