import { expect, test } from '@playwright/test';

test('accueil : le titre, la vidéo de l’app et la demande de démo', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('La caisse');
  await expect(page.locator('video').first()).toHaveAttribute('src', /easy\.mp4$/);
  await expect(page.getByRole('link', { name: /demander une démo/i }).first()).toBeVisible();
});

test('les ancres mènent aux sections', async ({ page }) => {
  await page.goto('/');
  for (const id of ['easy', 'app', 'nuit', 'apps', 'monaco', 'contact']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test('la démo se demande par e-mail ou par téléphone', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('link', { name: /écrire à l’équipe/i })).toHaveAttribute(
    'href',
    /^mailto:contact@easyclub\.fr/,
  );
  await expect(page.getByRole('link', { name: /appeler/i })).toHaveAttribute('href', /^tel:/);
});

test('anglais', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'en', exact: true }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('built for the night');
});
