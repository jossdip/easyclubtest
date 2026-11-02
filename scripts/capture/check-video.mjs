// Planche de contrôle d'une vidéo : la lit dans Chrome (lecture réelle, pas de saut) et photographie
// l'écran à intervalles réguliers.   node scripts/capture/check-video.mjs <vidéo.mp4> <planche.png> [n]
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('../../apps/web/node_modules/playwright');
const [file, out, count = '8'] = process.argv.slice(2);
const n = Number(count);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 400, height: 278 } });
await page.route('http://localhost:4100/__video.mp4', (r) =>
  r.fulfill({ body: readFileSync(file), contentType: 'video/mp4' }),
);
await page.route('http://localhost:4100/__check', (r) =>
  r.fulfill({
    contentType: 'text/html',
    body: '<body style="margin:0;background:#111"><video id=v src="/__video.mp4" muted playsinline style="width:400px;height:278px;object-fit:contain"></video></body>',
  }),
);
await page.goto('http://localhost:4100/__check');
const duration = await page.evaluate(async () => {
  const v = document.getElementById('v');
  await v.play();
  return v.duration;
});
const shots = [];
for (let i = 0; i < n; i++) {
  await page.waitForTimeout(((duration * 1000) / n) * (i === 0 ? 0.5 : 1));
  shots.push(await page.screenshot());
}
// assemblage en grille, dans une page
const sheet = await browser.newPage({
  viewport: { width: 4 * 408 + 8, height: Math.ceil(n / 4) * 286 + 8 },
});
await sheet.setContent(
  `<body style="margin:0;padding:4px;background:#222;display:grid;grid-template-columns:repeat(4,400px);gap:8px">${shots
    .map((b) => `<img src="data:image/png;base64,${b.toString('base64')}" style="width:400px">`)
    .join('')}</body>`,
);
writeFileSync(out, await sheet.screenshot({ fullPage: true }));
console.log(`${file} : ${duration.toFixed(2)} s`);
await browser.close();
