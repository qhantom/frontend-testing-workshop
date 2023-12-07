import { test, expect } from "@playwright/test";
import { BASE_URL } from "../../playwright.config";

const TEST_USER = {};

/*
Write tests for following workflows:
login -> edit user
login -> follow user -> unfollow user
*/

test.describe("User Management", () => {
  // Login with test-user and open gerrits profile before each test
  // Click on follow/unfollow and expect success notification and button change
});
