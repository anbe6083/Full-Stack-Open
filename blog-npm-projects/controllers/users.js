const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();

usersRouter.post("/", async (request, response) => {
  const { username, password, name } = request.body;
  if (password.length < 3) {
    return await response
      .status(400)
      .json({ error: "Password length must be greater than 3 characters" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
    name,
  });

  await user.save();

  response.status(201).json(user);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});

  response.status(200).json(users);
});

module.exports = usersRouter;
