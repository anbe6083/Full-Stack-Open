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

test("Should be able to delete a blog", async () => {
  const blogs = await api.get("/api/blogs");
  const blogToBeDeleted = blogs.body[0];
  await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(204);
  const blogsAtEnd = await Blog.find({});
  const ids = blogsAtEnd.map((b) => b.id);
  assert(!ids.includes(blogToBeDeleted.id));
});

test("Should be able to update a blog", async () => {
  const blogs = await api.get("/api/blogs");
  const blogToBeUpdated = blogs.body[0];
  const expected = 99999;
  blogToBeUpdated.likes = expected;
  await api
    .put(`/api/blogs/${blogToBeUpdated.id}`)
    .send(blogToBeUpdated)
    .expect(200);
  const blogAfter = await api.get(`/api/blogs/${blogToBeUpdated.id}`);
  assert.strictEqual(blogAfter.body.likes, expected);
});

test("Should return a 404 if updating a note that doesnt exist", async () => {
  const blogs = await api.get("/api/blogs");
  const blogToBeUpdated = blogs.body[0];
  const newLikes = 99999;
  await api.delete(`/api/blogs/${blogToBeUpdated.id}`);
  blogToBeUpdated.likes = newLikes;
  await api
    .put(`/api/blogs/${blogToBeUpdated.id}`)
    .send(blogToBeUpdated)
    .expect(404);
});
