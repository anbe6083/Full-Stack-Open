const supertest = require("supertest");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const app = require("../index.js");
const api = supertest(app);
const assert = require("node:assert");
const Blog = require("../models/blogs.js");
const initialData = [
  {
    title: "Infinite Jest",
    author: "David Foster Wallace",
    likes: 9000,
    url: "http://google.com",
  },
  {
    title: "It",
    author: "Stephen King",
    likes: 1000,
    url: "http://google.com",
  },
];

after(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialData);
});

test("GET /api/blogs should return the correct number of blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialData.length);
});

test("Blog posts should have unique identifier id", async () => {
  const response = await api.get("/api/blogs");
  const ids = response.body.map((b) => b.id);
  for (const id of ids) {
    assert.notStrictEqual(id, undefined);
  }
});

test("POST /api/blogs should return an additional blog", async () => {
  const newBlog = {
    title: "1984",
    author: "George Orwell",
    url: "http://google.com",
    likes: 1984,
  };
  await api.post("/api/blogs").send(newBlog).expect(201);

  const getBlogs = await api.get("/api/blogs");
  assert.strictEqual(getBlogs.body.length, initialData.length + 1);
});

test("If the likes property is missing, it should default to 0", async () => {
  await Blog.deleteMany({});
  const newBlog = {
    title: "1984",
    author: "George Orwell",
    url: "http://google.com",
  };
  await api.post("/api/blogs").send(newBlog);
  const getBlogs = await (await api.get("/api/blogs")).body;
  assert.strictEqual(getBlogs[0].likes, 0);
});

test("If title is missing return 400", async () => {
  const newBlog = {
    author: "George Orwell",
    url: "http://google.com",
    likes: 1000,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("If url is missing return 400", async () => {
  const request = new Blog({
    title: "1984",
    author: "George Orwell",
    likes: 1000,
  });
  await api.post("/api/blogs").send(request).expect(400);
});
