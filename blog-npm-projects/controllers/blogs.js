const blogsRouter = require("express").Router();
const blogs = require("../models/blogs");
const Blog = require("../models/blogs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  if (request.body.url === undefined || request.body.title === undefined) {
    response.status(400).json({ error: "url or title is missing" });
    return;
  }
  if (request.body.likes === undefined) request.body.likes = 0;
  const user = request.user;
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  });
  const savedBlog = await blog.save().catch((e) => next(e));

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const userId = request.user.id;

    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).end();
    }
    if (userId === null || userId !== blog.user.toString()) {
      return response
        .status(401)
        .json({ error: "User does not match user who created the blog" });
    }
    await blog.deleteOne();
    response.status(204).end();
  },
);

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }
  blog.title = request.body.title;
  blog.author = request.body.author;
  blog.url = request.body.url;
  blog.likes = request.body.likes;
  const savedBlog = await blog.save().catch((e) => next(e));
  response.status(200).json(savedBlog);
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
