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
