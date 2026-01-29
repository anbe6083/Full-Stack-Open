import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();

app.use(cors());
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
  res.writeHead(200, { "Content-type": "application/json" });
  res.end(JSON.stringify(persons));
});

app.get("/info", (req, res) => {
  const date = new Date();
  const count = persons.length;
  res.send(`Phonebook has info for ${count} people ${date}`);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }
  const personExists = persons.find(
    (p) => p.name === body.name || p.number === body.number,
  );
  if (personExists) {
    return res.status(400).json({
      error: "Name or number already exists",
    });
  }
  const person = {
    id: Math.floor(Math.random() * 100000) + 1,
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  console.log(persons);
  res.json(person);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT);
console.log("Server running on port", PORT);
