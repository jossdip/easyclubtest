// Revue des moments animés : sous-titre de la voix sur la vidéo, absorption des abonnements, console
// d'Easy en cours, frise « Tout relié » allumée.   node scripts/review/moments.mjs <url> <dossier> [largeur] [hauteur]
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('../../apps/web/node_modules/playwright');
const [url, out, w = '1440', h = '900'] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  locale: process.env.LOCALE ?? 'fr-FR',
});
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

// la vidéo du haut de page : on la place sur l'instant où la phrase est dite
for (const [name, at] of [
  ['voix-ecoute', 3.4],
  ['voix-parle', 6.6],
  ['voix-dite', 10.5],
]) {
  await page.evaluate((t) => {
    const v = document.querySelector('video');
    v.pause();
    v.currentTime = t;
  }, at);
  await page.waitForTimeout(700);
  await page.evaluate(() =>
    window.scrollTo(
      0,
      document.querySelector('video').getBoundingClientRect().top + window.scrollY - 120,
    ),
  );
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/${name}.png` });
}

// Gratuit : début, milieu, fin de l'absorption
const free = await page.evaluate(() => {
  const s = document.getElementById('gratuit');
  return {
    top: s.getBoundingClientRect().top + window.scrollY,
    height: s.firstElementChild.offsetHeight,
  };
});
for (const [name, k] of [
  ['gratuit-1', 0.2],
  ['gratuit-2', 0.47],
  ['gratuit-3', 0.85],
]) {
  await page.evaluate((y) => window.scrollTo(0, y), free.top + (free.height - Number(h)) * k);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/${name}.png` });
}

// Easy : la console, en pleine écoute puis avec la réponse
await page.evaluate(() =>
  document.querySelector('[aria-pressed]')?.closest('.glass')?.scrollIntoView({ block: 'center' }),
);
await page.waitForTimeout(400);
const chips = page.locator('#easy button[aria-pressed]');
await chips.nth(1).click();
await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}/console-ecoute.png` });
await page.waitForTimeout(3500);
await page.screenshot({ path: `${out}/console-reponse.png` });

// Tout relié : la frise, en cours
await page.evaluate(() => document.getElementById('relie').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(5500);
await page.screenshot({ path: `${out}/relie.png` });

// Stock : trois Negroni servis
await page.evaluate(() => document.getElementById('stock').scrollIntoView({ block: 'center' }));
await page.waitForTimeout(800);
for (let i = 0; i < 3; i++) {
  await page
    .locator('#stock button', { hasText: /Negroni/ })
    .first()
    .click();
  await page.waitForTimeout(400);
}
await page.waitForTimeout(700);
await page.screenshot({ path: `${out}/stock.png` });
console.log(errors.length ? `erreurs : ${errors.join(' | ')}` : 'aucune erreur');
await browser.close();
