import { test, expect } from "@playwright/test";
import { TEST_USER, BASE_URL } from "../../../playwright.config";

/*
Write tests for following workflows:
login -> edit user
login -> follow user -> unfollow user
*/

test.describe.configure({ mode: "parallel" });

test.describe("User Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    // Login
    await page.getByText("Login").click();
    await page.getByPlaceholder("Email").fill(TEST_USER.mail);
    await page.getByPlaceholder("Password").fill(TEST_USER.password);
    await expect(page.getByText("Sign In")).toBeVisible();
    await page.getByText("Sign In").click();
    await expect(page.getByText("Logout")).toBeVisible();
  });

  test("Edit User Profile", async ({ page }) => {
    // Edit user profile
    await page.getByText("Profile").click();
    await page.getByRole("button", { name: "Edit" }).click();
    await expect(page.getByText("Save")).toBeVisible();

    // Perform profile edit
    await page
      .getByPlaceholder("Name", { exact: true })
      .fill("Test User Edited");
    await page.getByPlaceholder("Username").fill("TestUsername");
    await page.getByRole("button", { name: "Save" }).click();

    // Verify the update
    await expect(page.getByText("Updated")).toBeVisible();

    // Revert the changes
    await page.getByRole("button", { name: "Edit" }).click();
    await expect(page.getByPlaceholder("Name", { exact: true })).toHaveValue(
      "Test User Edited"
    );
    await expect(
      page.getByPlaceholder("Username", { exact: true })
    ).toHaveValue("TestUsername");
    await page.getByPlaceholder("Name", { exact: true }).fill(TEST_USER.name);
    await page.getByPlaceholder("Username").fill(TEST_USER.username);
  });

  test("Follow/Unfollow User", async ({ page }) => {
    // Follow a user named Gerrit
    await page.getByText("Gerrit", { exact: true }).click();
    await expect(page.getByRole("button", { name: "Follow" })).toBeVisible();
    await page.getByRole("button", { name: "Follow" }).click();
    await expect(page.getByText("Success")).toBeVisible();
    await expect(page.getByText("Unfollow")).toBeVisible();

    // Unfollow the user named Gerrit
    await page.getByRole("button", { name: "Unfollow" }).click();
    await expect(page.getByText("Success")).toBeVisible();
    await expect(page.getByRole("button", { name: "Follow" })).toBeVisible();
  });
});
