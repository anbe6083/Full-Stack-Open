const supertest = require("supertest");
const app = require("../index.js");
const api = supertest(app);
const { test, after } = require("node:test");
const mongoose = require("mongoose");
const User = require("../models/user.js");

after(async () => {
  await mongoose.connection.close();
});

test("Should get a 400 if username and password is less than 3 characters", async () => {
  const user = {
    username: "a",
    password: "newPassword",
    name: "Andrew",
  };

  await api.post("/api/users").send(user).expect(400);
  user.password = "a";
  user.username = "longusername";
  await api.post("/api/users").send(user).expect(400);
});
