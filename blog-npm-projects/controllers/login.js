const bcrypt = require("bcrypt");
const User = require("../models/user");
const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response) => {
  const saltRounds = 10;
  const username = request.body.username;
  const password = request.body.password;
});

module.exports = loginRouter;
