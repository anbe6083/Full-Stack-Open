const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

test("dummy returns 1", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

test("totalLikes should return 100", () => {
  const blogs = [
    {
      title: "It",
      author: "Stephen King",
      url: "http://google.com",
      likes: 50,
    },
    {
      title: "Pet Semetary",
      author: "Stephen King",
      url: "http://google.com",
      likes: 50,
    },
  ];
  const result = listHelper.totalLikes(blogs);
  assert.strictEqual(result, 100);
});

test("Favorite blog should return It", () => {
  const blogs = [
    {
      title: "It",
      author: "Stephen King",
      url: "http://google.com",
      likes: 100,
    },
    {
      title: "Pet Semetary",
      author: "Stephen King",
      url: "http://google.com",
      likes: 50,
    },
  ];

  const result = listHelper.favoriteBlog(blogs);
  assert.deepEqual(result, {
    title: "It",
    author: "Stephen King",
    url: "http://google.com",
    likes: 100,
  });
});
