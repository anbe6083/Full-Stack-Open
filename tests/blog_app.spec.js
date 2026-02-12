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
    likes: 0,
  };

  let blogId = -1;
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
    const loginResponse = await request.post(
      "http://localhost:3003/api/login",
      {
        data: {
          username: userCredentials.username,
          password: userCredentials.password,
        },
      },
    );
    const { token } = await loginResponse.json();
    const blogResponse = await request.post("http://localhost:3003/api/blogs", {
      data: blog,
      headers: { Authorization: `Bearer ${token}` },
    });
    blogId = blogResponse.id;
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

    describe("When logged in", () => {
      beforeEach(async ({ page, request }) => {
        const usernameInput = page.getByLabel("Username");
        await usernameInput.fill(userCredentials.username);
        const passwordInput = page.getByLabel("Password");
        await passwordInput.fill(userCredentials.password);
        const loginBtn = page.getByRole("button", { name: "Login" });
        await loginBtn.click();
        await expect(
          page.getByText(`${userCredentials.name} is logged in`),
        ).toBeVisible();
      });

      test("Should be able to create a new blog", async ({ page }) => {
        const blog = {
          title: "It",
          author: "Stephen King",
          url: "http://stephenking.com",
          likes: 1981,
        };

        await createBlog(page, blog);
        await expect(
          page.getByText(`${blog.title} ${blog.author}`),
        ).toBeVisible();
      });
    });
  });
});

const createBlog = async (page, blog) => {
  const createBlogBtn = page.getByRole("button", {
    name: "Create New Blog",
  });
  expect(createBlogBtn).toBeVisible();
  await createBlogBtn.click();
  const titleInput = await page.getByLabel("Title");

  await expect(titleInput).toBeVisible();
  await titleInput.fill(blog.title);
  const authorInput = await page.getByLabel("Author");
  await expect(authorInput).toBeVisible();
  await authorInput.fill(blog.author);
  const urlInput = await page.getByLabel("Url");
  await expect(urlInput).toBeVisible();
  await urlInput.fill(blog.url);

  const createBtn = page.getByRole("button", { name: "Create" });
  await expect(createBtn).toBeVisible();
  await createBtn.click();
};
