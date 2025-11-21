import { test, expect } from '@playwright/test';

test('home loads and CTA visible', async ({ page }) => {
  await page.goto('/');
  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toBeVisible();
  await expect(h1).toContainText(
    "EasyClub n'est pas qu'une application, c'est la révolution de la vie nocturne.",
  );
  await expect(h1).toContainText('Née à Monaco, conçue pour le monde.');
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
    { label: /fundamentaux/i, id: 'fundamentaux' },
    { label: /sécurité/i, id: 'securite' },
    { label: /bracelet/i, id: 'bracelet' },
    { label: /marketplace/i, id: 'marketplace' },
    { label: /merch/i, id: 'merch' },
    { label: /navettes/i, id: 'navettes' },
    { label: /déchets/i, id: 'dechets' },
    { label: /kpis/i, id: 'kpis' },
  ];
  for (const { label, id } of anchors) {
    await page.getByRole('link', { name: label }).first().click();
    await expect.poll(async () => page.url()).toContain(`#${id}`);
    await expect(page.locator(`section#${id} h2`).first()).toBeVisible();
  }
});
