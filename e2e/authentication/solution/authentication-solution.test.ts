import { test, expect, Page } from "@playwright/test";
import { BASE_URL } from "../../../playwright.config";

const TEST_USER = {
  mail: "andi.dulli@test.com",
  password: "testTestTest",
  name: "Andi Dulli",
  username: "Dr. Dulli",
};

/*
Write tests for following workflows:
register -> logout -> login -> delete user
*/

test.describe.configure({ mode: "serial" });

test.describe("User Registration, Login, Logout, and Deletion", () => {
  test.beforeEach("Visit page", async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("Register a new user and login", async ({ page }) => {
    // Register a new user
    await page.getByText("Register").click();
    await fillRegistrationForm(page);
    await page.getByRole("button", { name: "Register" }).nth(0).click();
    await page.waitForLoadState();
    await expect(page.getByText("Logout")).toBeVisible();
    await page.getByText("Logout").click();

    // Login as the registered user
    await loginUser(page);
    await expect(page.getByText("Logout")).toBeVisible();
  });

  test.describe("Logout and delete user", () => {
    test.beforeEach(async ({ page }) => {
      await loginUser(page);
    });

    test("Logout the user", async ({ page }) => {
      await page.getByText("Logout").click();
      await expect(page.getByText("Login")).toBeVisible();
    });

    test("Delete the created user", async ({ page }) => {
      // Navigate to user profile and initiate delete
      await page.getByText("Profile").click();
      await page.getByRole("button", { name: "Edit" }).click();
      await expect(page.getByText("Delete")).toBeVisible();
      await page.getByRole("button", { name: "Delete" }).click();

      // Verify redirection to the home page after deletion
      await expect(page).toHaveURL(BASE_URL);
      await expect(page.getByText("Login")).toBeVisible();
    });
  });
});

// Helper functions for reusability
async function fillRegistrationForm(page: Page) {
  await page.getByPlaceholder("Email").fill(TEST_USER.mail);
  await page.getByPlaceholder("Name", { exact: true }).fill(TEST_USER.name);
  await page.getByPlaceholder("Username").fill(TEST_USER.username);
  await page.getByPlaceholder("Password").fill(TEST_USER.password);
}

async function loginUser(page: Page) {
  // Login
  await page.getByText("Login").click();
  await page.getByPlaceholder("Email").fill(TEST_USER.mail);
  await page.getByPlaceholder("Password").fill(TEST_USER.password);
  await expect(page.getByText("Sign In")).toBeVisible();
  await page.getByText("Sign In").click();
  await expect(page.getByText("Logout")).toBeVisible();
}
