import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page
    .getByRole("link", {
      name: "Sign In",
    })
    .click();

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await page.locator("[name=email]").fill("sehgaldival@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Login Successfully")).toBeVisible();
});

test("should allow user to add hotel", async ({ page }) => {
  await page.goto(UI_URL);

  await page
    .getByRole("link", {
      name: "Sign In",
    })
    .click();

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await page.locator("[name=email]").fill("sehgaldival@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Login Successfully")).toBeVisible();
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");

  await page.locator('[name="city"]').fill("Test city");

  await page.locator('[name="country"]').fill("Test country");
  await page
    .locator('[name="description"]')
    .fill("Test descriptiondescriptiondescription");

  await page.locator('[name="pricePerNight"]').fill("1000");

  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").click();

  await page.locator('[name="adultCount"]').fill("4");
  await page.locator('[name="childCount"]').fill("2");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "dummy.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  //await expect(page.getByText("Hotel Added Successfully")).toBeVisible();

  await page.waitForSelector("text=Hotel Added Successfully");
});
