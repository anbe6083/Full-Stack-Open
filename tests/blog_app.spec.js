const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  const userCredentials = {
    name: "Jon Snow",
    username: "myUser123",
    password: "password123",
  };
  const blog = {
    title: "Infinite Jest",
    author: "Walter Goggins",
    url: "http://asdf.com",
    likes: 9999,
  };
  beforeEach(async ({ page, request }) => {
    await page.goto("http://localhost:5173");
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: userCredentials.username,
        password: userCredentials.password,
        name: userCredentials.name,
      },
    });
    await request.post("http://localhost:3003/api/blogs", {
      data: blog,
    });
  });
  test("front page can be opened and login form should be visible", async ({
    page,
  }) => {
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  describe("Login", () => {
    test("Should succeed with the correct credentials", async ({ page }) => {
      const usernameInput = page.getByLabel("Username");
      await expect(usernameInput).toBeVisible();
      await usernameInput.fill(userCredentials.username);
      const passwordInput = page.getByLabel("Password");
      await expect(passwordInput).toBeVisible();
      await passwordInput.fill(userCredentials.password);
      const loginBtn = page.getByRole("button", { name: "Login" });
      await expect(loginBtn).toBeVisible();
      await loginBtn.click();
      await expect(
        page.getByText(`${userCredentials.name} is logged in`),
      ).toBeVisible();
    });
    test("Should fail with incorrect credentials", async ({ page }) => {
      const usernameInput = page.getByLabel("Username");
      await expect(usernameInput).toBeVisible();
      await usernameInput.fill("incorrect_username");
      const passwordInput = page.getByLabel("Password");
      await expect(passwordInput).toBeVisible();
      await passwordInput.fill("incorrectPassword");
      const loginBtn = page.getByRole("button", { name: "Login" });
      await expect(loginBtn).toBeVisible();
      await loginBtn.click();
      await expect(
        page.getByText(`Incorrect username or password`),
      ).toBeVisible();
    });
  });
});
