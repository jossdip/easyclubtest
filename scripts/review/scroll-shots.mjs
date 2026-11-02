// Revue visuelle du site : descend la page pas à pas (les animations se déclenchent au défilement)
// et photographie chaque écran.   node scripts/review/scroll-shots.mjs <url> <dossier> [largeur] [hauteur]
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('../../apps/web/node_modules/playwright');
const [url, out, w = '1440', h = '900'] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 1,
  locale: process.env.LOCALE ?? 'fr-FR',
});
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(2800);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
let y = 0;
let i = 0;
while (y < total && i < 60) {
  await page.screenshot({ path: `${out}/${String(i).padStart(2, '0')}.png` });
  y += Number(h) * 0.85;
  await page.mouse.wheel(0, Number(h) * 0.85);
  await page.waitForTimeout(1300);
  i++;
}
console.log(`${i} écrans, page de ${total}px`);
await browser.close();
