import "dotenv/config";
import express from "express";
import morgan from "morgan";
import Person from "./models/person.js";
const app = express();

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "CastError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(express.static("dist"));
app.use(express.json());
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  //   morgan(":method :url :status :res[content-length] - :response-time ms"),
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  }),
);
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.get("/info", (req, res) => {
  const date = new Date();
  Person.find({}).then((persons) => {
    const count = persons.length;
    res.send(`Phonebook has info for ${count} people ${date}`);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

app.put("/api/persons/:id", (req, res) => {
  const { name, number } = req.body;
  console.log(req.body);
  Person.findById(req.params.id).then((person) => {
    if (!person) {
      return res.status(404).end();
    }
    person.name = name;
    person.number = number;
    return person.save().then((updatedPerson) => {
      res.json(updatedPerson);
    });
  });
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((e) => next(e));
});

const unknownEndpoint = (req, res) => {
  res.status(303).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {});
console.log("Server running on port", PORT);
