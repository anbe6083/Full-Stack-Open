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

  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await createUser(request, userCredentials);
    const loginResponse = await loginUser(request, userCredentials);
    const { token } = await loginResponse.json();
    await createBlogRequest(request, blog, token);
  });
  test("front page can be opened and login form should be visible", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  describe("Login", () => {
    test("Should succeed with the correct credentials", async ({ page }) => {
      await page.goto("http://localhost:5173");
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
      await page.goto("http://localhost:5173");
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
      test("Should be able to create a new blog", async ({ page }) => {
        const blog = {
          title: "It",
          author: "Stephen King",
          url: "http://stephenking.com",
          likes: 1981,
        };

        await page.goto("http://localhost:5173");
        await loginWithCredentials(page, userCredentials);
        await createBlog(page, blog);
        await expect(
          page.getByText(`${blog.title} ${blog.author}`),
        ).toBeVisible();
      });

      test("Should be able to delete a blog", async ({ page }) => {
        await page.goto("http://localhost:5173");
        await loginWithCredentials(page, userCredentials);
        await expect(
          page.getByText(`${blog.title} ${blog.author}`),
        ).toBeVisible();
        await page.getByRole("button", { name: "Show" }).click();
        const removeBtn = page.getByRole("button", { name: "Remove" });
        await expect(removeBtn).toBeVisible();
        await removeBtn.click();
        page.on("dialog", (dialog) => dialog.accept());
        await Promise.all([
          page.waitForResponse(
            (res) => res.url().includes("/api/blogs") && res.status() === 204,
          ),
        ]);
        page.reload();
        await expect(
          page.getByText(`${blog.title} ${blog.author}`),
        ).toHaveCount(0);
      });
      test("Should be able to like a blog", async ({ page }) => {
        await page.goto("http://localhost:5173");
        await loginWithCredentials(page, userCredentials);
        await expect(
          page.getByText(`${blog.title} ${blog.author}`),
        ).toBeVisible();
        await page.getByRole("button", { name: "Show" }).click();
        const likeBtn = page.getByRole("button", { name: "Like" });
        await expect(likeBtn).toBeVisible();
        await likeBtn.click();
        page.on("dialog", (dialog) => dialog.accept());
        await Promise.all([
          page.waitForResponse((res) => res.url().includes("/api/blogs")),
        ]);
        page.reload();
        await expect(
          page.getByText(`Likes: 1`, { exact: false }),
        ).toBeVisible();
      });

      test("Only users who created a blog should see a blog delete button", async ({
        page,
        request,
      }) => {
        const secondUserCredentials = {
          name: "James Bond",
          username: "jamesBond123",
          password: "password123",
        };
        const secondBlog = {
          title: "Harry Potter",
          author: "JK Rowling",
          like: 100,
          url: "http://amazon.com",
        };
        await createUser(request, secondUserCredentials);
        await page.goto("http://localhost:5173");
        await loginWithCredentials(page, secondUserCredentials);
        await createBlog(page, secondBlog);
        await page.getByRole("button", { name: "Log out" }).click();
        await loginWithCredentials(page, userCredentials);
        await expect(
          page.getByText(`${secondBlog.title} ${secondBlog.author}`),
        ).toBeVisible();
        await page.getByRole("button", { name: "Show" }).last().click();
        await expect(page.getByText(`${secondBlog.url}`)).toBeVisible();
        const removeBtn = page.getByRole("button", { name: "Remove" });
        expect(removeBtn).toHaveCount(0);
      });

      test("Blogs should be ordered by number of likes", async ({
        page,
        request,
      }) => {
        const blogs = [
          {
            title: "harry potter",
            author: "jk rowling",
            likes: 100,
            url: "http://amazon.com",
          },
          {
            title: "Moby Dick",
            author: "Charles Dickens",
            likes: 300,
            url: "http://dickens.com",
          },
        ];
        const loginResponse = await loginUser(request, userCredentials);
        const { token } = await loginResponse.json();
        for (const b of blogs) {
          await createBlogRequest(request, b, token);
        }
        await page.goto("http://localhost:5173");
        await loginWithCredentials(page, userCredentials);

        const likesElements = await page.getByText("Likes: ").allTextContents();
        const numberOfLikes = likesElements.map((text) => {
          const numberText = text.split(":")[2].replace("likeRemove", "");
          const number = parseInt(numberText);
          return number;
        });
        const sortedLikes = numberOfLikes.sort((a, b) => {
          return a > b;
        });
        expect(numberOfLikes).toStrictEqual(sortedLikes);
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
async function createBlogRequest(request, blog, token) {
  await request.post("http://localhost:3003/api/blogs", {
    data: blog,
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function loginUser(request, userCredentials) {
  return await request.post("http://localhost:3003/api/login", {
    data: {
      username: userCredentials.username,
      password: userCredentials.password,
    },
  });
}

async function createUser(request, userCredentials) {
  await request.post("http://localhost:3003/api/users", {
    data: {
      username: userCredentials.username,
      password: userCredentials.password,
      name: userCredentials.name,
    },
  });
}

async function loginWithCredentials(page, userCredentials) {
  await fillLoginForm(page, userCredentials);
  const loginBtn = page.getByRole("button", { name: "Login" });
  await loginBtn.click();
  await expect(
    page.getByText(`${userCredentials.name} is logged in`),
  ).toBeVisible();
}

async function fillLoginForm(page, userCredentials) {
  const usernameInput = page.getByLabel("Username");
  await usernameInput.fill(userCredentials.username);
  const passwordInput = page.getByLabel("Password");
  await passwordInput.fill(userCredentials.password);
}
