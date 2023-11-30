import { test, expect } from "@playwright/test";
import { BASE_URL } from "../../playwright.config";

/*
Write tests for following workflows:
register -> logout -> login -> delete user
*/

export const TEST_USER = {};

test.describe("Register and login user", () => {
  // visit page before each test
  // register new user and expect logout to be visible
  // login and expect logout to be visible
});

test.describe("Logout and delete user", () => {
  // visit page and login before each test
  // logout and expect login to be visible
  // visit profile, click on edit, delete user and expect login to be visible
});
