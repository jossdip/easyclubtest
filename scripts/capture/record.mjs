// Vidéos de l'app pour le site : la scène est jouée dans l'app (instance de capture), filmée image par
// image (screencast de Chrome), puis encodée en H.264/MP4 par Chrome lui-même (WebCodecs + mp4-muxer).
//   node scripts/capture/record.mjs <scène> <sortie.mp4>   scènes : caisse, rapport, planning (Easy à la voix), vente
// Prérequis : scripts/capture/reset-db.sh, puis l'instance de capture sur :4100, et `npm i` dans ce dossier.
// La voix : la phrase est dite par la voix française du Mac (`say`) et jouée comme le micro de l'iPad ;
// l'app l'enregistre et détecte la fin de phrase comme en service. Seule la transcription est rejouée.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { scriptEasy, scriptVoice } from './easy.mjs';
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
  console.error('usage : node record.mjs <caisse|rapport|planning|vente> <sortie.mp4>');
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

/** Repères de la scène (en secondes de vidéo) : début de l'écoute, phrase entendue, réponse d'Easy. */
const marks = {};
const mark = (name) => {
  marks[name] = Date.now() / 1000;
};

const button = (page, name) =>
  page.getByRole('button', { name, exact: typeof name === 'string' }).first();

/** La phrase dite à Easy, en WAV : 0,6 s de silence, la phrase, 8 s de silence (la fin de phrase). */
function voiceWav(text) {
  const dir = mkdtempSync(join(tmpdir(), 'easyclub-voix-'));
  execFileSync('say', ['-v', 'Flo (Français (France))', '-o', join(dir, 'v.aiff'), text]);
  execFileSync('afconvert', [
    '-f',
    'WAVE',
    '-d',
    'LEI16@48000',
    '-c',
    '1',
    join(dir, 'v.aiff'),
    join(dir, 'raw.wav'),
  ]);
  const raw = readFileSync(join(dir, 'raw.wav'));
  let p = 12;
  let pcm = Buffer.alloc(0);
  while (p < raw.length) {
    const id = raw.toString('ascii', p, p + 4);
    const size = raw.readUInt32LE(p + 4);
    if (id === 'data') pcm = raw.subarray(p + 8, p + 8 + size);
    p += 8 + size + (size % 2);
  }
  const rate = 48000;
  const silence = (s) => Buffer.alloc(Math.round(rate * s) * 2);
  const data = Buffer.concat([silence(0.6), pcm, silence(8)]);
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write('WAVEfmt ', 8);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(rate, 24);
  header.writeUInt32LE(rate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(data.length, 40);
  const out = join(dir, 'voix.wav');
  writeFileSync(out, Buffer.concat([header, data]));
  return { file: out, speech: pcm.length / 2 / rate };
}

/** Le planning d'une semaine (10 → 15 novembre), créneau par créneau, comme Easy le demande à l'app. */
function weekShifts() {
  const soir = (d, who, end = '00:30') => ({
    name: 'plan_shift',
    input: {
      operator: who,
      start: `2026-11-${d}T18:00`,
      end: `2026-11-${String(Number(d) + 1)}T${end}`,
    },
  });
  const midi = (d, who) => ({
    name: 'plan_shift',
    input: { operator: who, start: `2026-11-${d}T11:00`, end: `2026-11-${d}T15:30` },
  });
  const accueil = (d, end = '00:30') => ({
    name: 'plan_shift',
    input: {
      operator: 'Hugo',
      start: `2026-11-${d}T19:00`,
      end: `2026-11-${String(Number(d) + 1)}T${end}`,
    },
  });
  return [
    soir('10', 'Inès'),
    soir('10', 'Nora'),
    midi('10', 'Théo'),
    soir('11', 'Lucas'),
    soir('11', 'Nora'),
    midi('11', 'Théo'),
    soir('12', 'Inès'),
    soir('12', 'Lucas'),
    soir('12', 'Nora'),
    accueil('12'),
    soir('13', 'Inès', '01:00'),
    soir('13', 'Lucas', '01:00'),
    soir('13', 'Théo', '01:00'),
    soir('13', 'Nora', '01:00'),
    accueil('13', '01:00'),
    soir('14', 'Inès', '01:00'),
    soir('14', 'Lucas', '01:00'),
    soir('14', 'Théo', '01:00'),
    soir('14', 'Nora', '01:00'),
    accueil('14', '01:00'),
    soir('14', 'Camille', '01:00'),
    midi('15', 'Théo'),
    midi('15', 'Lucas'),
  ];
}

const SCENES = {
  // Faire la caisse, à la voix : Easy compte les espèces, voit l'écart et les tables encore ouvertes,
  // puis attend la validation à l'écran (une clôture est scellée et irréversible)
  caisse: {
    voice: {
      say: 'Fais la caisse. J’ai compté trois cent quatre-vingt-seize euros cinquante en espèces.',
      heard: 'Fais la caisse, j’ai compté 396,50 € en espèces.',
    },
    async setup(page) {
      await scriptEasy(page, [
        { delay: 1300, tools: [{ name: 'close_register', input: { counted_euros: 396.5 } }] },
        { delay: 600, text: 'Caisse clôturée.' },
      ]);
    },
    async play(page) {
      await page.waitForTimeout(700);
      await tap(page, button(page, 'Caisse'));
      await page.waitForTimeout(1000);
      await tap(page, button(page, 'Ouvrir Easy'));
      await page.waitForTimeout(700);
      await tap(page, button(page, 'Parler'));
      mark('listen');
      await page
        .getByText(/^Fais la caisse/)
        .last()
        .waitFor({ timeout: 20000 });
      mark('heard');
      await page.getByText('Clôturer la caisse').last().waitFor({ timeout: 20000 });
      mark('answer');
      await page.waitForTimeout(3600);
    },
  },

  // Le rapport de la semaine, à la voix : Easy lit les ventes de la semaine et de la précédente, et résume
  rapport: {
    voice: {
      say: 'Fais-moi le rapport de la semaine.',
      heard: 'Fais-moi le rapport de la semaine.',
    },
    async setup(page) {
      await scriptEasy(page, [
        {
          delay: 1500,
          tools: [
            {
              name: 'get_sales_report',
              input: { from: '2026-10-25', to: '2026-10-31', group_by: 'jour' },
            },
            { name: 'get_sales_report', input: { from: '2026-10-18', to: '2026-10-24' } },
            {
              name: 'get_sales_report',
              input: { from: '2026-10-25', to: '2026-10-31', group_by: 'produit', limit: 3 },
            },
          ],
        },
        {
          delay: 900,
          // les chiffres sont ceux que l'app renvoie pour ces trois lectures (base de capture)
          text: 'Semaine du 25 au 31 octobre : 36 945,70 € TTC sur 206 tickets, 1,5 % de moins que la semaine d’avant, mais un panier moyen en hausse à 179,64 € (+4,7 %). Meilleur soir : vendredi, 6 545,60 €. En tête des ventes : le menu complet midi (48 vendus), puis le champagne rosé.',
        },
      ]);
    },
    async play(page) {
      await page.waitForTimeout(700);
      await tap(page, button(page, 'Rapports'));
      await page.waitForTimeout(1000);
      await tap(page, button(page, 'Ouvrir Easy'));
      await page.waitForTimeout(700);
      await tap(page, button(page, 'Parler'));
      mark('listen');
      await page
        .getByText(/^Fais-moi le rapport/)
        .last()
        .waitFor({ timeout: 20000 });
      mark('heard');
      await page
        .getByText(/Semaine du 25 au 31 octobre/)
        .last()
        .waitFor({ timeout: 20000 });
      mark('answer');
      await page.waitForTimeout(4200);
    },
  },

  // Le planning de la semaine du 9 novembre, à la voix : Easy pose les créneaux, l'équipe les verra publiés
  planning: {
    voice: {
      say: 'Prépare le planning de la semaine du neuf novembre.',
      heard: 'Prépare le planning de la semaine du 9 novembre.',
    },
    async setup(page) {
      const shifts = weekShifts();
      await scriptEasy(page, [
        { delay: 1500, tools: shifts },
        {
          delay: 700,
          text: `Planning du 10 au 15 novembre prêt : ${shifts.length} créneaux pour 6 personnes, du mardi au dimanche, en brouillon. Il ne reste qu’à le publier.`,
        },
      ]);
    },
    async play(page) {
      await page.waitForTimeout(700);
      await tap(page, button(page, 'Staff'));
      await page.waitForTimeout(1000);
      await tap(page, button(page, 'Planning'));
      await page.waitForTimeout(900);
      await tap(page, button(page, 'Ouvrir Easy'));
      await page.waitForTimeout(700);
      await tap(page, button(page, 'Parler'));
      mark('listen');
      await page
        .getByText(/^Prépare le planning/)
        .last()
        .waitFor({ timeout: 20000 });
      mark('heard');
      await page
        .getByText(/Planning du 10 au 15 novembre prêt/)
        .last()
        .waitFor({ timeout: 25000 });
      mark('answer');
      await page.waitForTimeout(2600);
      // on referme Easy et on descend jusqu'à la nouvelle semaine, en brouillon
      await tap(page, button(page, 'Replier'));
      await page.waitForTimeout(600);
      // la liste du planning commence deux semaines en arrière : défilement doux jusqu'au bout
      await page.evaluate(async () => {
        const list = [...document.querySelectorAll('.scroll-quiet')].sort(
          (a, b) => b.scrollHeight - a.scrollHeight,
        )[0];
        if (!list) return;
        const from = list.scrollTop;
        const to = list.scrollHeight - list.clientHeight;
        const t0 = performance.now();
        await new Promise((done) => {
          const step = (t) => {
            const k = Math.min(1, (t - t0) / 2200);
            const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
            list.scrollTop = from + (to - from) * e;
            if (k < 1) requestAnimationFrame(step);
            else done();
          };
          requestAnimationFrame(step);
        });
      });
      await page.waitForTimeout(2600);
    },
  },

  // Vente directe : un tour de cocktails et un dessert, en quelques touches
  vente: {
    async setup() {},
    async play(page) {
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
    },
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

const def = SCENES[scene];
if (!def) {
  console.error(`scène inconnue : ${scene}`);
  process.exit(2);
}
const wav = def.voice ? voiceWav(def.voice.say) : null;
const { browser, context, page } = await open({ scale: 2, flowing: true, voice: wav?.file });
page.setDefaultTimeout(10000);
if (def.voice) await scriptVoice(page, [def.voice.heard]);
await def.setup(page);
const play = () => def.play(page);
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
if (def.voice) {
  // le sous-titrage de la voix sur le site : src/lib/site.ts lit ce fichier
  const at = (k) => (marks[k] ? Math.round((marks[k] - frames[0].t) * 100) / 100 : null);
  const cues = {
    said: def.voice.heard,
    listen: at('listen'),
    speechStart: Math.round(((at('listen') ?? 0) + 0.6) * 100) / 100,
    speechEnd: Math.round(((at('listen') ?? 0) + 0.6 + wav.speech) * 100) / 100,
    heard: at('heard'),
    answer: at('answer'),
    duration: Math.round((n / FPS) * 100) / 100,
  };
  writeFileSync(outFile.replace(/\.mp4$/, '.json'), JSON.stringify(cues, null, 2) + '\n');
  console.log('repères', JSON.stringify(cues));
}
console.log(
  `${scene} : ${n} images (${(n / FPS).toFixed(1)} s, ${frames.length} vues uniques), ${(buffer.length / 1e6).toFixed(2)} Mo → ${outFile}`,
);
await browser.close();
