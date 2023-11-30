import { test, expect } from "@playwright/test";
import { TEST_USER, BASE_URL } from "../../../playwright.config";

const TEST_TWEET = "Test tweet";

/*
Tests:
- login, create a tweet, like a tweet
- login, comment a tweet, like a tweet
*/

test.describe("Create a tweet", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByText("Login").click();
    await page.getByPlaceholder("Email").fill(TEST_USER.mail);
    await page.getByPlaceholder("Password").fill(TEST_USER.password);

    await page.getByText("Sign In").click();

    await expect(page.getByText("Logout")).toBeVisible();
  });

  test("It should create new tweet", async ({ page }) => {
    await page.getByText("Tweet").nth(0).click();
    await page.getByPlaceholder("What's happening?").fill(TEST_TWEET);
    await page.getByRole("button", { name: "Tweet" }).click();

    await expect(page.getByText("Tweet created")).toBeVisible();

    await expect(page.getByText("Test tweet").first()).toBeVisible();
  });
});
