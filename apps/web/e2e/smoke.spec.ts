import { test, expect } from '@playwright/test';

test('home loads and CTA visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: /demandez une démo/i })).toBeVisible();
});

test('contact form validates', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Nom').fill('A');
  await page.getByRole('button', { name: /envoyer/i }).click();
  await expect(page.getByText(/Nom invalide/i)).toBeVisible();
});

test('nav anchors scroll to sections', async ({ page }) => {
  await page.goto('/');
  // Map labels to ids we expect in the page
  const anchors: Array<{ label: RegExp; id: string }> = [
    { label: /caisse/i, id: 'pos' },
    { label: /réservations/i, id: 'reservations' },
    { label: /bracelet/i, id: 'avenir-bracelet' },
    { label: /sécurité/i, id: 'securite' },
    { label: /durabilité/i, id: 'durabilite' },
    { label: /transport/i, id: 'transport' },
    { label: /modèle 1%/i, id: 'modele-1pct' },
    { label: /conformité/i, id: 'conformite' },
  ];
  for (const { label, id } of anchors) {
    await page.getByRole('link', { name: label }).first().click();
    await expect.poll(async () => page.url()).toContain(`#${id}`);
    await expect(page.locator(`section#${id} h2`).first()).toBeVisible();
  }
});
