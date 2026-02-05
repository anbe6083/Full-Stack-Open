const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id).catch((e) => next(e));
  if (note) {
    response.json(note);
  } else {
    response.status(400).send({ error: "malformed id" });
  }
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.decode(getTokenFrom(request), process.env.SECRET);
  if (decodedToken === null || !decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id,
  });
  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

notesRouter.put("/:id", (req, res, next) => {
  const { content, important } = req.body;
  Note.findById(req.params.id).then((note) => {
    if (!note) {
      return res.status(404).end();
    }
    note.content = content;
    note.important = important;

    return note
      .save()
      .then((updatedNote) => {
        res.json(updatedNote);
      })
      .catch((err) => next(err));
  });
});

module.exports = notesRouter;
