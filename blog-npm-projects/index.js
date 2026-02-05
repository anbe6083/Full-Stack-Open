const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const blogsRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const { config } = require("dotenv");

const mongoUrl = process.env.MONGODB_URI;
logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => {
    logger.info("connected to mongoDB");
  })
  .catch((e) => {
    logger.info("Error connecting to mongoDB: ", e.message);
  });

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
// app.use("/api/login", loginRouter);

app.use(middleware.errorHandler);
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
