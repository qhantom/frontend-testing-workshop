import { test, expect } from "@playwright/test";
import { TEST_USER, BASE_URL } from "../../playwright.config";

/*
Write tests for following workflows:
login -> edit user
login -> follow user -> unfollow user
*/

test.describe("Follow and unfollow user", () => {
  // Login with test-user and open gerrits profile before each test
  // Click on follow/unfollow and expect success notification and button change
});

test.describe("Edit user", () => {
  // Login with test-user
  // Open profile
  // Edit user and expect updated notification/changes to be done
});
