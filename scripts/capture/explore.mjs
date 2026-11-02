// Tour rapide de toutes les apps (vérification avant capture) : node scripts/capture/explore.mjs <dossier>
import { open, login, launch, home } from './lib.mjs';

const out = process.argv[2];
const { browser, page } = await open({ scale: 1 });
await login(page);
await page.screenshot({ path: `${out}/00-home.png` });
const apps = [
  'Vente Directe',
  'Tables',
  'Caisse',
  'Réservations',
  'Rapports',
  'Stock',
  'Fidélité',
  'En ligne',
  'Événements',
  'Marketing',
  'Staff',
  'Réglages',
];
for (const [i, label] of apps.entries()) {
  await home(page);
  try {
    await launch(page, label);
    await page.screenshot({ path: `${out}/${String(i + 1).padStart(2, '0')}-${label}.png` });
  } catch (e) {
    console.log(label, 'failed', e.message.split('\n')[0]);
  }
}
await browser.close();
