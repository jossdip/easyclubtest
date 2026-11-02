import {
  Armchair,
  BarChart3,
  Boxes,
  Building2,
  CalendarClock,
  Disc3,
  Gift,
  Heart,
  Megaphone,
  Settings,
  Smartphone,
  Ticket,
  Timer,
  Truck,
  Vault,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export const SITE_URL = 'https://easyclub.fr';

export const CONTACT = {
  email: 'contact@easyclub.fr',
  phone: '+33 6 51 70 76 53',
  tel: '+33651707653',
} as const;

/**
 * Écrans de l'app (iPad, 2360 × 1640) capturés sur la base de démonstration « restaurant pilote »,
 * un samedi soir de service : scripts/capture/screens.mjs. Chaque écran existe en 1180 px (`-1180`).
 */
export type Shot =
  | 'lock'
  | 'home'
  | 'home-day'
  | 'vd-categories'
  | 'vd-cocktails'
  | 'tables'
  | 'tables-day'
  | 'table'
  | 'caisse'
  | 'reservations'
  | 'rapports'
  | 'rapports-insights'
  | 'rapports-day'
  | 'stock'
  | 'en-ligne'
  | 'staff'
  | 'fidelite'
  | 'marketing'
  | 'evenements'
  | 'reglages-apps'
  | 'easy';

export function shot(name: Shot): { src: string; srcSet: string } {
  return {
    src: `/media/app/${name}.webp`,
    srcSet: `/media/app/${name}-1180.webp 1180w, /media/app/${name}.webp 2360w`,
  };
}

/** Vidéos de l'app filmées sur la même base (scripts/capture/record.mjs). */
export const VIDEOS = {
  easy: '/media/video/easy.mp4',
  venteDirecte: '/media/video/vente-directe.mp4',
  poster: '/media/video/poster-home.webp',
} as const;

/** Les seize apps d'EasyClub OS, avec l'icône et le dégradé de leur tuile dans l'app. */
export type AppId =
  | 'vente-directe'
  | 'tables'
  | 'caisse'
  | 'reservations'
  | 'rapports'
  | 'stock'
  | 'achats'
  | 'clients'
  | 'fidelite'
  | 'marketing'
  | 'evenements'
  | 'online'
  | 'staff'
  | 'franchise'
  | 'promos'
  | 'reglages';

export const APPS: Array<{ id: AppId; icon: LucideIcon; gradient: string; shot?: Shot }> = [
  {
    id: 'vente-directe',
    icon: Zap,
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #D946EF 100%)',
    shot: 'vd-cocktails',
  },
  {
    id: 'tables',
    icon: Armchair,
    gradient: 'linear-gradient(135deg, #B45309 0%, #E8B84B 100%)',
    shot: 'table',
  },
  {
    id: 'caisse',
    icon: Vault,
    gradient: 'linear-gradient(135deg, #047857 0%, #34D399 100%)',
    shot: 'caisse',
  },
  {
    id: 'reservations',
    icon: CalendarClock,
    gradient: 'linear-gradient(135deg, #1D4ED8 0%, #60A5FA 100%)',
    shot: 'reservations',
  },
  {
    id: 'rapports',
    icon: BarChart3,
    gradient: 'linear-gradient(135deg, #0E7490 0%, #22D3EE 100%)',
    shot: 'rapports-insights',
  },
  {
    id: 'stock',
    icon: Boxes,
    gradient: 'linear-gradient(135deg, #9F1239 0%, #FB7185 100%)',
    shot: 'stock',
  },
  { id: 'achats', icon: Truck, gradient: 'linear-gradient(135deg, #C2410C 0%, #FDBA74 100%)' },
  { id: 'clients', icon: Heart, gradient: 'linear-gradient(135deg, #BE185D 0%, #F472B6 100%)' },
  {
    id: 'fidelite',
    icon: Gift,
    gradient: 'linear-gradient(135deg, #BE123C 0%, #FDA4AF 100%)',
    shot: 'fidelite',
  },
  {
    id: 'marketing',
    icon: Megaphone,
    gradient: 'linear-gradient(135deg, #B91C1C 0%, #FCA5A5 100%)',
    shot: 'marketing',
  },
  {
    id: 'evenements',
    icon: Disc3,
    gradient: 'linear-gradient(135deg, #6D28D9 0%, #F0ABFC 100%)',
    shot: 'evenements',
  },
  {
    id: 'online',
    icon: Smartphone,
    gradient: 'linear-gradient(135deg, #0F766E 0%, #5EEAD4 100%)',
    shot: 'en-ligne',
  },
  {
    id: 'staff',
    icon: Timer,
    gradient: 'linear-gradient(135deg, #4338CA 0%, #818CF8 100%)',
    shot: 'staff',
  },
  {
    id: 'franchise',
    icon: Building2,
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #93C5FD 100%)',
  },
  { id: 'promos', icon: Ticket, gradient: 'linear-gradient(135deg, #9A3412 0%, #FDBA74 100%)' },
  {
    id: 'reglages',
    icon: Settings,
    gradient: 'linear-gradient(135deg, #374151 0%, #9CA3AF 100%)',
    shot: 'reglages-apps',
  },
];

/** Écran montré à chaque étape du tour de l'app (même ordre que `tour.steps` dans les messages). */
export const TOUR_MEDIA: Array<{ shot: Shot; video?: string }> = [
  { shot: 'vd-cocktails', video: VIDEOS.venteDirecte },
  { shot: 'tables' },
  { shot: 'caisse' },
  { shot: 'reservations' },
  { shot: 'rapports-insights' },
  { shot: 'stock' },
];
