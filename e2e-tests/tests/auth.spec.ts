import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173";

test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", {
    name: "Sign In"
  }).click();

  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  await page.locator("[name=email]").fill("sehgaldival@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Login Successfully')).toBeVisible();

  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();

})


