const jwt = require("jsonwebtoken");
const logger = require("./logger");
const User = require("../models/user");
const errorHandler = (error, request, response, next) => {
  logger.error("Error message:", error.message);
  logger.error("Error name:", error.name);
  if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "Expected `username` to be unique" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      error:
        "Username and password is not valid. Must be greater than 3 characters",
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  }
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.decode(request.token, process.env.SECRET);
  if (decodedToken === null || !decodedToken.id) {
    return response.status(401).json({ error: "Token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }
  request.user = user;
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
