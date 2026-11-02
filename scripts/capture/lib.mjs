// Outils de capture de l'app EasyClub OS pour le site : une instance locale de l'app
// (base de démonstration « restaurant pilote »), pilotée par Playwright à la taille d'un iPad.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('../../apps/web/node_modules/playwright');

export const APP = process.env.APP_URL ?? 'http://localhost:4100';
export const IPAD = { width: 1180, height: 820 }; // iPad Air, paysage

/** L'heure des captures : le jeu de données est généré autour de ce samedi soir de service. */
export const SERVICE_TIME = new Date(process.env.CAPTURE_NOW ?? '2026-10-31T21:45:00');

export async function open({ scale = 2, video, flowing = false, voice } = {}) {
  // `voice` : un fichier WAV joué comme s'il venait du micro de l'iPad (la phrase dite à Easy)
  const args = voice
    ? [
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        `--use-file-for-fake-audio-capture=${voice}`,
      ]
    : [];
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args });
  const context = await browser.newContext({
    viewport: IPAD,
    deviceScaleFactor: scale,
    ...(video ? { recordVideo: video } : {}),
  });
  if (voice) await context.grantPermissions(['microphone'], { origin: APP });
  const page = await context.newPage();
  // l'horloge du navigateur à l'heure du jeu de données (figée pour les photos, qui avance pour les vidéos)
  if (flowing) {
    await page.clock.install({ time: SERVICE_TIME });
    await page.clock.resume();
  } else {
    await page.clock.setFixedTime(SERVICE_TIME);
  }
  // Easy tel qu'en service : le serveur de capture n'a pas de clé de modèle, on annonce l'agent disponible
  await page.route('**/api/v1/agent/status', (route) =>
    route.fulfill({ json: { available: true, model: 'claude', voice: true } }),
  );
  // pas de curseur de saisie qui clignote, ni la bannière « Nouvelle version disponible » (l'instance de
  // capture sert une app recompilée) : elle est masquée dès qu'elle apparaît, pendant toute la capture
  await page.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      const css = document.createElement('style');
      css.textContent = '*{caret-color:transparent!important}';
      document.head.appendChild(css);
      const hide = () => {
        for (const el of document.querySelectorAll('button')) {
          if (/Nouvelle version disponible/.test(el.textContent ?? '')) el.style.display = 'none';
        }
      };
      new MutationObserver(hide).observe(document.body, { childList: true, subtree: true });
      hide();
    });
  });
  return { browser, context, page };
}

/** La bannière « Nouvelle version disponible » (l'instance de capture tourne sur une app recompilée). */
export async function hideBanners(page) {
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('button')) {
      if (/Nouvelle version disponible/.test(el.textContent ?? '')) el.style.display = 'none';
    }
  });
}

/** Ouvre la session de `name` si l'écran est verrouillé, et la garde ouverte pendant la capture. */
export async function login(page, name = 'Camille', pin = '3101') {
  await page.goto(APP + '/');
  const lock = page.getByText(/Qui prend la main/i);
  await lock
    .or(page.getByRole('button', { name: 'Ouvrir Easy' }))
    .first()
    .waitFor({ timeout: 20000 });
  if (await lock.count()) {
    await page
      .getByRole('button', { name: new RegExp(`\\b${name}\\b`) })
      .first()
      .click();
    for (const d of pin) {
      await page.getByRole('button', { name: d, exact: true }).click();
      await page.waitForTimeout(90);
    }
    await page.waitForTimeout(1200);
  }
  const keep = page.getByRole('button', { name: 'Garder la session ouverte' });
  if ((await keep.count()) && (await keep.getAttribute('aria-pressed')) !== 'true')
    await keep.click();
  await page.waitForTimeout(300);
  await hideBanners(page);
}

export async function launch(page, label) {
  await page.getByRole('button', { name: label, exact: true }).first().click();
  await page.waitForTimeout(1000);
  await hideBanners(page);
}

export async function home(page) {
  const btn = page.getByRole('button', { name: "Écran d'accueil" });
  if (await btn.count()) await btn.first().click();
  await page.waitForTimeout(700);
}
