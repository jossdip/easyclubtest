// Audit complet d'une page : erreurs de console, requêtes en échec, images cassées, vidéos qui ne
// chargent pas, ancres et liens internes morts, débordement horizontal. Plusieurs profils de visite.
//   node scripts/review/audit.mjs <url>
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium, devices } = require('../../apps/web/node_modules/playwright');
const base = process.argv[2] ?? 'http://localhost:8788/';
const origin = new URL(base).origin;

const profils = [
  {
    nom: 'portable 1280 FR',
    ctx: { viewport: { width: 1280, height: 800 }, extraHTTPHeaders: { 'cf-ipcountry': 'FR' } },
  },
  {
    nom: 'bureau FR',
    ctx: { viewport: { width: 1440, height: 900 }, extraHTTPHeaders: { 'cf-ipcountry': 'FR' } },
  },
  {
    nom: 'bureau EN (US)',
    ctx: { viewport: { width: 1440, height: 900 }, extraHTTPHeaders: { 'cf-ipcountry': 'US' } },
  },
  {
    nom: 'iPhone FR',
    ctx: { ...devices['iPhone 13'], extraHTTPHeaders: { 'cf-ipcountry': 'FR' } },
  },
  {
    nom: 'iPad EN (GB)',
    ctx: { ...devices['iPad Pro 11'], extraHTTPHeaders: { 'cf-ipcountry': 'GB' } },
  },
  {
    nom: 'moins d’animations',
    ctx: {
      viewport: { width: 1280, height: 800 },
      reducedMotion: 'reduce',
      extraHTTPHeaders: { 'cf-ipcountry': 'FR' },
    },
  },
];

const browser = await chromium.launch({ channel: 'chrome' });
let problemes = 0;
for (const { nom, ctx } of profils) {
  const context = await browser.newContext(ctx);
  const page = await context.newPage();
  const erreurs = [];
  page.on('pageerror', (e) => erreurs.push(`exception : ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && erreurs.push(`console : ${m.text()}`));
  page.on(
    'response',
    (r) =>
      r.status() >= 400 &&
      r.url().startsWith(origin) &&
      erreurs.push(`HTTP ${r.status()} ${r.url()}`),
  );
  page.on(
    'requestfailed',
    (r) =>
      !/net::ERR_ABORTED/.test(r.failure()?.errorText ?? '') &&
      erreurs.push(`échec ${r.url()} ${r.failure()?.errorText}`),
  );
  await page.goto(base, { waitUntil: 'networkidle' });
  // on descend toute la page pour déclencher le chargement paresseux et les animations
  const hauteur = await page.evaluate(() => document.documentElement.scrollHeight);
  const pas = Math.round((ctx.viewport?.height ?? 800) * 0.8);
  for (let y = 0; y < hauteur; y += pas) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(250);
  }
  await page.waitForTimeout(1200);
  const etat = await page.evaluate(() => {
    const imgs = [...document.images]
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src);
    const videos = [...document.querySelectorAll('video')].map((v) => ({
      src: v.currentSrc || v.src,
      err: v.error?.code ?? null,
    }));
    const ancres = [...document.querySelectorAll('a[href^="#"], a[href^="/#"]')]
      .map((a) => a.getAttribute('href').replace(/^\/?#/, ''))
      .filter((id) => id && !document.getElementById(id));
    const liens = [
      ...new Set(
        [...document.querySelectorAll('a[href^="/"]')]
          .map((a) => a.getAttribute('href').split('#')[0])
          .filter(Boolean),
      ),
    ];
    const deborde = document.documentElement.scrollWidth > window.innerWidth + 1;
    return {
      imgs,
      videos,
      ancres,
      liens,
      deborde,
      lang: document.documentElement.lang,
      h1: document.querySelector('h1')?.textContent,
    };
  });
  for (const i of etat.imgs) erreurs.push(`image cassée ${i}`);
  for (const v of etat.videos.filter((v) => v.err))
    erreurs.push(`vidéo en erreur ${v.src} (${v.err})`);
  for (const a of etat.ancres) erreurs.push(`ancre sans cible #${a}`);
  if (etat.deborde) erreurs.push('la page déborde horizontalement');
  for (const l of etat.liens) {
    const r = await page.request.get(origin + l);
    if (r.status() >= 400) erreurs.push(`lien mort ${l} (${r.status()})`);
  }
  console.log(
    `${erreurs.length ? '✗' : '✓'} ${nom} — lang=${etat.lang}, « ${etat.h1} », ${etat.videos.length} vidéo(s), liens ${etat.liens.join(' ')}`,
  );
  for (const e of [...new Set(erreurs)]) console.log(`    ${e}`);
  problemes += erreurs.length;
  await context.close();
}
await browser.close();
process.exit(problemes ? 1 : 0);
