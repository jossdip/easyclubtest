// Vidéos de l'app pour le site : la scène est jouée dans l'app (instance de capture), filmée image par
// image (screencast de Chrome), puis encodée en H.264/MP4 par Chrome lui-même (WebCodecs + mp4-muxer).
//   node scripts/capture/record.mjs <scène> <sortie.mp4>        scènes : easy, vente
// Prérequis : scripts/capture/reset-db.sh, puis l'instance de capture sur :4100, et `npm i` dans ce dossier.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { scriptEasy } from './easy.mjs';
import { APP, hideBanners, home, launch, login, open } from './lib.mjs';

const MUXER = fileURLToPath(
  new URL('./node_modules/mp4-muxer/build/mp4-muxer.js', import.meta.url),
);
const FPS = 30;
const W = 1600; // 1600 × 1112 : l'iPad à 1,36× — net dans la maquette, léger à charger
const H = 1112;
const BITRATE = 3_500_000;

const [scene, outFile] = process.argv.slice(2);
if (!scene || !outFile) {
  console.error('usage : node record.mjs <easy|vente> <sortie.mp4>');
  process.exit(2);
}

// ─────────────────────────────── tournage

/** Un doigt qui touche l'écran : un disque qui s'efface, là où l'on tape (l'iPad n'a pas de curseur). */
async function tap(page, locator) {
  const box = await locator.boundingBox();
  if (box) {
    await page.evaluate(
      ({ x, y }) => {
        const d = document.createElement('div');
        d.style.cssText = `position:fixed;left:${x - 22}px;top:${y - 22}px;width:44px;height:44px;border-radius:50%;
        background:rgba(255,255,255,.55);box-shadow:0 0 0 2px rgba(255,255,255,.35);pointer-events:none;z-index:2147483647;
        transition:transform .45s cubic-bezier(.2,.8,.2,1),opacity .45s ease`;
        document.body.appendChild(d);
        requestAnimationFrame(() => {
          d.style.transform = 'scale(1.6)';
          d.style.opacity = '0';
        });
        setTimeout(() => d.remove(), 600);
      },
      { x: box.x + box.width / 2, y: box.y + box.height / 2 },
    );
    await page.waitForTimeout(90);
  }
  await locator.click();
}

const button = (page, name) =>
  page.getByRole('button', { name, exact: typeof name === 'string' }).first();

const SCENES = {
  // Easy : une phrase, l'app ouvre la table et ajoute la commande ; puis « envoie » — au bar
  async easy(page) {
    await scriptEasy(page, [
      {
        delay: 1100,
        tools: [
          {
            name: 'add_to_table',
            input: {
              table: 'T7',
              items: [
                { product: 'spritz', qty: 2 },
                { product: 'negroni', qty: 1 },
              ],
            },
          },
          { name: 'navigate', input: { app: 'tables', table: 'T7' } },
        ],
      },
      {
        delay: 700,
        text: 'C’est noté : 2 Spritz et 1 Negroni sur la table T7. Je les envoie au bar ?',
      },
      {
        delay: 900,
        tools: [{ name: 'send_round', input: { table: 'T7', dest: 'bar' } }],
      },
      { delay: 600, text: 'Envoyé au bar : 2 Spritz et 1 Negroni pour la T7.' },
    ]);
    return async () => {
      await page.waitForTimeout(900);
      await tap(page, button(page, 'Ouvrir Easy'));
      await page.waitForTimeout(700);
      const input = page.getByPlaceholder('Écrire à Easy…');
      await input.pressSequentially('Deux spritz et un negroni à la table T7', { delay: 48 });
      await page.waitForTimeout(350);
      await input.press('Enter');
      await page.waitForTimeout(4200);
      await input.pressSequentially('Oui, envoie', { delay: 60 });
      await page.waitForTimeout(300);
      await input.press('Enter');
      await page.waitForTimeout(4000);
    };
  },

  // Vente directe : un tour de cocktails et un dessert, en quelques touches
  async vente(page) {
    return async () => {
      await page.waitForTimeout(800);
      await tap(page, button(page, 'Vente Directe'));
      await page.waitForTimeout(900);
      await tap(page, button(page, 'Cocktails'));
      await page.waitForTimeout(500);
      await tap(page, button(page, /^Spritz/));
      await page.waitForTimeout(380);
      await tap(page, button(page, /^Spritz/));
      await page.waitForTimeout(380);
      await tap(page, button(page, /^Negroni/));
      await page.waitForTimeout(600);
      await tap(page, button(page, 'Remonter'));
      await page.waitForTimeout(500);
      await tap(page, button(page, 'Desserts'));
      await page.waitForTimeout(500);
      await tap(page, page.locator('button').filter({ hasText: /€/ }).nth(1));
      await page.waitForTimeout(900);
      await tap(page, button(page, /^Encaisser/));
      await page.waitForTimeout(1300);
      await tap(page, page.getByRole('button', { name: /^Carte$/ }).last());
      await page.waitForTimeout(1300);
      await tap(page, page.getByRole('button', { name: /Paiement accepté/ }).last());
      await page.waitForTimeout(2000);
    };
  },
};

// ─────────────────────────────── encodage

async function encode(context, frames, tail) {
  // une image source pour chaque instant, à cadence fixe (Chrome n'envoie une image que quand l'écran change) ;
  // l'horodatage du screencast a sa propre origine : seuls les écarts entre images comptent
  const start = frames[0].t;
  const n = Math.ceil((frames.at(-1).t - start + tail) * FPS);
  const repeats = new Array(frames.length).fill(0);
  let j = 0;
  for (let k = 0; k < n; k++) {
    const t = start + k / FPS;
    while (j + 1 < frames.length && frames[j + 1].t <= t) j++;
    repeats[j]++;
  }
  const page = await context.newPage();
  await page.goto(APP + '/__encodage'); // une origine localhost : WebCodecs exige un contexte sécurisé
  await page.addScriptTag({ path: MUXER });
  await page.evaluate(
    ({ W, H, FPS, BITRATE }) => {
      const { Muxer, ArrayBufferTarget } = window.Mp4Muxer;
      const muxer = new Muxer({
        target: new ArrayBufferTarget(),
        video: { codec: 'avc', width: W, height: H },
        fastStart: 'in-memory',
      });
      const encoder = new VideoEncoder({
        output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
        error: (e) => (window.__erreur = String(e)),
      });
      encoder.configure({
        codec: 'avc1.640028',
        width: W,
        height: H,
        bitrate: BITRATE,
        framerate: FPS,
        avc: { format: 'avc' },
      });
      const canvas = new OffscreenCanvas(W, H);
      const ctx = canvas.getContext('2d');
      window.__enc = { muxer, encoder, canvas, ctx, k: 0 };
    },
    { W, H, FPS, BITRATE },
  );
  for (let i = 0; i < frames.length; i++) {
    if (!repeats[i]) continue;
    await page.evaluate(
      async ({ data, count, FPS, W, H }) => {
        const s = window.__enc;
        const blob = await (await fetch(`data:image/jpeg;base64,${data}`)).blob();
        const bmp = await createImageBitmap(blob);
        s.ctx.drawImage(bmp, 0, 0, W, H);
        bmp.close();
        for (let r = 0; r < count; r++) {
          const frame = new VideoFrame(s.canvas, {
            timestamp: Math.round((s.k * 1e6) / FPS),
            duration: Math.round(1e6 / FPS),
          });
          s.encoder.encode(frame, { keyFrame: s.k % (FPS * 2) === 0 });
          frame.close();
          s.k++;
        }
        while (s.encoder.encodeQueueSize > 8) await new Promise((r) => setTimeout(r, 5));
      },
      { data: frames[i].data, count: repeats[i], FPS, W, H },
    );
  }
  const b64 = await page.evaluate(async () => {
    const s = window.__enc;
    await s.encoder.flush();
    s.muxer.finalize();
    if (window.__erreur) throw new Error(window.__erreur);
    const bytes = new Uint8Array(s.muxer.target.buffer);
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000)
      bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  });
  await page.close();
  return { buffer: Buffer.from(b64, 'base64'), frames: n };
}

// ─────────────────────────────── main

const { browser, context, page } = await open({ scale: 2, flowing: true });
page.setDefaultTimeout(10000);
const play = await SCENES[scene](page);
await login(page);
await hideBanners(page);

const cdp = await context.newCDPSession(page);
const frames = [];
cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
  frames.push({ t: metadata.timestamp, data });
  await cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
});
await cdp.send('Page.startScreencast', {
  format: 'jpeg',
  quality: 92,
  maxWidth: W,
  maxHeight: H,
  everyNthFrame: 1,
});
await page.waitForTimeout(300);
const t0 = Date.now();
await play();
const lastFrameAt = Date.now();
await cdp.send('Page.stopScreencast');
frames.sort((a, b) => a.t - b.t);
// la fin de la scène peut être immobile (aucune image) : on la tient jusqu'au bout du tournage
const shot = (lastFrameAt - t0) / 1000;
const tail = Math.max(0.4, shot - (frames.at(-1).t - frames[0].t));

if (process.env.DUMP_FRAMES) {
  // contrôle : quelques images brutes du tournage
  for (const q of [0, 0.25, 0.5, 0.75, 0.99]) {
    const f = frames[Math.floor(q * (frames.length - 1))];
    writeFileSync(
      `${process.env.DUMP_FRAMES}/brut-${Math.round(q * 100)}.jpg`,
      Buffer.from(f.data, 'base64'),
    );
  }
  console.log('écarts', frames[0].t, frames.at(-1).t, 'durée tournage', shot.toFixed(1), 's');
}
const { buffer, frames: n } = await encode(context, frames, tail);
writeFileSync(outFile, buffer);
console.log(
  `${scene} : ${n} images (${(n / FPS).toFixed(1)} s, ${frames.length} vues uniques), ${(buffer.length / 1e6).toFixed(2)} Mo → ${outFile}`,
);
await browser.close();
