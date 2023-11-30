import { test, expect } from "@playwright/test";
import { BASE_URL } from "../../../playwright.config";

export const TEST_USER = {
  mail: "andi.dulli@test.com",
  password: "testTestTest",
  name: "Andi Dulli",
  username: "Dr. Dulli",
};

/*
Tests:
- register, login, logout, delete user
*/

test.describe("Register and login user", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("It should register a new user", async ({ page }) => {
    await page.getByText("Register").click();
    await page.getByPlaceholder("Email").fill(TEST_USER.mail);
    await page.getByPlaceholder("Name", { exact: true }).fill(TEST_USER.name);
    await page.getByPlaceholder("Username").fill(TEST_USER.username);
    await page.getByPlaceholder("Password").fill(TEST_USER.password);
    await page.getByRole("button", { name: "Register" }).nth(0).click();

    await expect(page.getByText("Logout")).toBeVisible();
  });

  test("It should login as new user", async ({ page }) => {
    await page.getByText("Login").click();
    await page.getByPlaceholder("Email").fill(TEST_USER.mail);
    await page.getByPlaceholder("Password").fill(TEST_USER.password);

    await expect(page.getByText("Sign In")).toBeVisible();

    await page.getByText("Sign In").click();

    await expect(page.getByText("Logout")).toBeVisible();
  });
});

test.describe("Logout and delete user", () => {
  test.beforeEach("It should login the user", async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByText("Login").click();
    await page.getByPlaceholder("Email").fill(TEST_USER.mail);
    await page.getByPlaceholder("Password").fill(TEST_USER.password);

    await expect(page.getByText("Sign In")).toBeVisible();

    await page.getByText("Sign In").click();

    await expect(page.getByText("Logout")).toBeVisible();
  });

  test("It should logout the user", async ({ page }) => {
    await page.getByText("Logout").click();

    await expect(page.getByText("Login")).toBeVisible();
  });

  test("It should delete the created user", async ({ page }) => {
    await page.getByText("Profile").click();
    await page.getByRole("button", { name: "Edit" }).click();

    await expect(page.getByText("Delete")).toBeVisible();

    await page.getByRole("button", { name: "Delete" }).click();

    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(BASE_URL);
    await expect(page.getByText("Login")).toBeVisible();
  });
});
