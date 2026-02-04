const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const blogsRouter = require("./controllers/blogs");

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, { family: 4 });

app.use(express.json());
app.use("/api/blogs", blogsRouter);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
