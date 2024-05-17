import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByRole("link", {
        name: "Sign In"
    }).click();

    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();

})


test("should allow user to add hotel", async ({ page }) => {
    await page.goto(`${UI_URL}/add-hotel`);

})





