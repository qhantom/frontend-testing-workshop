import { test, expect } from "@playwright/test";
import { TEST_USER, BASE_URL } from "../../../playwright.config";

/*
Tests:
- login, edit user
- login, follow user, unfollow user
*/

test.describe("Edit user", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByText("Login").click();
    await page.getByPlaceholder("Email").fill(TEST_USER.mail);
    await page.getByPlaceholder("Password").fill(TEST_USER.password);

    await expect(page.getByText("Sign In")).toBeVisible();

    await page.getByText("Sign In").click();

    await expect(page.getByText("Logout")).toBeVisible();
  });

  test("It should edit the test user", async ({ page }) => {
    await page.getByText("Profile").click();
    await page.getByText("Edit").click();

    await expect(page.getByText("Save")).toBeVisible();

    await page
      .getByPlaceholder("Name", { exact: true })
      .fill("Test User Edited");
    await page.getByPlaceholder("Username").fill("Test Moin");
    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByPlaceholder("Name", { exact: true })).toHaveValue(
      "Test User Edited"
    );
    await expect(page.getByPlaceholder("Username")).toHaveValue("Test Moin");

    await page.getByPlaceholder("Name", { exact: true }).fill(TEST_USER.name);
    await page.getByPlaceholder("Username").fill(TEST_USER.username);
  });

  test("It should follow a user named Gerrit", async ({ page }) => {
    await page.getByText("Gerrit").click();

    await expect(page.getByText("Follow")).toBeVisible();

    await page.getByText("Follow").click();

    await expect(page.getByText("Success")).toBeVisible();
    await expect(page.getByText("Unfollow")).toBeVisible();
  });

  test("It should unfollow a user named Gerrit", async ({ page }) => {
    await page.getByText("Gerrit").click();

    await expect(page.getByText("Unfollow")).toBeVisible();

    await page.getByText("Unfollow").click();

    await expect(page.getByText("Success")).toBeVisible();
    await expect(page.getByText("Follow")).toBeVisible();
  });
});
