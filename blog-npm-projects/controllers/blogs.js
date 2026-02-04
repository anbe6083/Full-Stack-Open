const blogsRouter = require("express").Router();
const blogs = require("../models/blogs");
const Blog = require("../models/blogs");
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", (request, response) => {
  if (request.body.url === undefined || request.body.title === undefined) {
    response.status(400).end();
    return;
  }
  if (request.body.likes === undefined) request.body.likes = 0;
  const blog = new Blog(request.body);
  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;
