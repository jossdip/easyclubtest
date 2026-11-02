// Vérifie les interactions du site et en garde une image : console d'Easy, démos, comparateur, apps, langue.
//   node scripts/review/interactions.mjs <url> <dossier>
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('../../apps/web/node_modules/playwright');
const [url, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: 'fr-FR' });
page.setDefaultTimeout(8000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
await page.goto(url, { waitUntil: 'networkidle' });
const to = async (sel) => {
  await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'start' }), sel);
  await page.waitForTimeout(1500);
};
const ok = (label) => console.log('✓', label);

// Easy : on choisit « Ferme la caisse », la réponse demande validation, on valide
await to('#easy');
await page.getByRole('button', { name: 'Ferme la caisse' }).click();
await page.waitForTimeout(3500);
await page.getByRole('button', { name: 'Valider' }).click();
await page.waitForTimeout(400);
await page.locator('#easy').screenshot({ path: `${out}/easy.png` });
ok('Easy : demande sensible validée');

// Synchro : deux spritz ajoutés apparaissent sur les trois iPads
await to('#nuit');
await page.getByRole('button', { name: 'Ajouter un spritz' }).click();
await page.waitForTimeout(900);
await page.getByRole('button', { name: 'Ajouter un spritz' }).click();
await page.waitForTimeout(900);
const spritz = await page.locator('#nuit li', { hasText: 'Spritz' }).count();
console.log(spritz === 6 ? '✓' : '✗', 'synchro :', spritz, 'lignes Spritz (attendu 6)');

// Hors ligne : on coupe, on encaisse deux fois, on rétablit
await page.getByRole('switch').click();
await page.getByRole('button', { name: 'Encaisser' }).click();
await page.getByRole('button', { name: 'Encaisser' }).click();
await page.waitForTimeout(300);
const queued = await page.getByText('2 en attente').count();
await page.getByRole('switch').click();
await page.waitForTimeout(1300);
const synced = await page.getByText('synchronisé').count();
console.log(queued && synced ? '✓' : '✗', 'hors ligne : 2 en attente puis synchronisé');
await page.locator('#nuit').screenshot({ path: `${out}/nuit.png` });

// Comparateur nuit/jour au clavier
const slider = page.getByRole('slider');
await slider.focus();
for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowLeft');
ok(`comparateur : ${await slider.getAttribute('aria-valuenow')} %`);

// Apps : la fiche Caisse s'ouvre et se ferme avec Échap
await to('#apps');
await page.locator('#apps').getByRole('button', { name: 'Caisse' }).click();
await page.waitForTimeout(800);
await page.screenshot({ path: `${out}/app-caisse.png` });
const dialog = await page.getByRole('dialog').count();
await page.keyboard.press('Escape');
await page.waitForTimeout(500);
console.log(
  dialog && !(await page.getByRole('dialog').count()) ? '✓' : '✗',
  'apps : fiche ouverte puis fermée',
);

// Langue : EN
await page.evaluate(() => window.scrollTo(0, 0));
await page.getByRole('button', { name: 'en', exact: true }).first().click();
await page.waitForTimeout(2500);
const h1 = await page.locator('h1').innerText();
console.log(/built for the night/i.test(h1) ? '✓' : '✗', 'anglais :', h1.replace(/\n/g, ' '));
await page.screenshot({ path: `${out}/en.png` });
await page.getByRole('button', { name: 'fr', exact: true }).first().click();
await page.waitForTimeout(1500);

console.log(
  errors.length
    ? `✗ erreurs : ${errors.slice(0, 5).join(' | ')}`
    : '✓ aucune erreur dans la console',
);
await browser.close();
