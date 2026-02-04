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

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }
  blog.title = request.body.title;
  blog.author = request.body.author;
  blog.url = request.body.url;
  blog.likes = request.body.likes;
  blog
    .save()
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((e) => next(e));
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).catch((e) => next(e));
  if (blog) {
    response.json(blog);
  } else {
    response.status(400).send({ error: "malformed id" });
  }
});

module.exports = blogsRouter;
