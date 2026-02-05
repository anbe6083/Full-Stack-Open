const logger = require("./logger");
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
  }
  next();
};

module.exports = { errorHandler };
