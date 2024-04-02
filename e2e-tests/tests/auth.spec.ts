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


test('should allow user to register', async ({ page }) => {
  const test_email = `textregister${(Math.random() * 9000) + 10000}@gmail.com`

  await page.goto(UI_URL);

  await page.getByRole("link", {
    name: "Sign In"
  }).click();

  await page.getByRole("link", {
    name: "Create an account here"
  }).click();

  await expect(page.getByRole('heading', { name: 'Create An Account' })).toBeVisible();
  await page.locator("[name=email]").fill(test_email);
  await page.locator("[name=lastName]").fill("sehgal");
  await page.locator("[name=firstName]").fill("dival");
  await page.locator("[name=password]").fill("1234567");
  await page.locator("[name=confirmPassword]").fill("1234567");
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByText('Registration Successfully')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();

})



