// Photos de l'app pour le site, à la résolution d'un iPad Retina (2360 × 1640).
//   node scripts/capture/screens.mjs <dossier de sortie>
// Prérequis : l'instance de capture (launch.json « site-capture » du dépôt de l'app) sur :4100.
import { mkdirSync } from 'node:fs';

import { APP, hideBanners, home, launch, login, open } from './lib.mjs';

const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });
const { browser, page } = await open({ scale: 2 });
page.setDefaultTimeout(10000);

async function shot(name) {
  await hideBanners(page);
  await page.waitForTimeout(350);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log('✓', name);
}
async function tap(name, opts = {}) {
  await page
    .getByRole('button', { name, exact: typeof name === 'string', ...opts })
    .first()
    .click();
  await page.waitForTimeout(450);
}
async function attempt(label, fn) {
  try {
    await fn();
  } catch (e) {
    console.log('✗', label, e.message.split('\n')[0]);
  }
}

// verrouillage
await page.goto(APP + '/');
await page.getByText(/Qui prend la main/i).waitFor();
await page.waitForTimeout(2500);
await shot('lock');

await login(page);
await shot('home');

// vente directe : catégories, un tour de cocktails, une viande avec sa cuisson, un dessert
await attempt('vente directe', async () => {
  await launch(page, 'Vente Directe');
  await shot('vd-categories');
  await tap('Cocktails');
  await tap(/^Spritz/);
  await tap(/^Spritz/);
  await tap(/^Negroni/);
  await shot('vd-cocktails');
  await tap('Remonter'); // retour aux catégories
  await tap('Viandes');
  await tap(/^Entrecôte/);
  if (await page.getByRole('dialog').count()) {
    await shot('vd-choix');
    await page.getByRole('dialog').getByRole('button', { name: /point/i }).first().click();
    await page.waitForTimeout(300);
    const ok = page.getByRole('dialog').getByRole('button', { name: /Ajouter|Valider|OK/i });
    if (await ok.count()) await ok.first().click();
    await page.waitForTimeout(400);
  }
  await tap('Remonter');
  await tap('Desserts');
  await page.locator('button').filter({ hasText: /€/ }).nth(2).click();
  await page.waitForTimeout(400);
  await shot('vd-ticket');
});

await attempt('tables', async () => {
  await home(page);
  await launch(page, 'Tables');
  await shot('tables');
  await page
    .locator('div.select-none')
    .filter({ has: page.getByText('T7', { exact: true }) })
    .first()
    .click();
  await page.waitForTimeout(800);
  await shot('table');
});

for (const [app, name] of [
  ['Caisse', 'caisse'],
  ['Réservations', 'reservations'],
  ['Rapports', 'rapports'],
  ['Stock', 'stock'],
  ['En ligne', 'en-ligne'],
  ['Staff', 'staff'],
  ['Fidélité', 'fidelite'],
  ['Marketing', 'marketing'],
  ['Événements', 'evenements'],
]) {
  await attempt(name, async () => {
    await home(page);
    await launch(page, app);
    await shot(name);
  });
}
await attempt('planning', async () => {
  await home(page);
  await launch(page, 'Staff');
  await tap('Planning');
  // la liste commence deux semaines en arrière : on la montre sur la semaine à venir
  await page.evaluate(() => {
    const list = [...document.querySelectorAll('.scroll-quiet')].sort(
      (a, b) => b.scrollHeight - a.scrollHeight,
    )[0];
    if (list) list.scrollTop = list.scrollHeight;
  });
  await page.waitForTimeout(500);
  await shot('staff-planning');
});
await attempt('reglages', async () => {
  await home(page);
  await launch(page, 'Réglages');
  await tap(/^Apps$/);
  await shot('reglages-apps');
});

await browser.close();
