import express from "express";
const app = express();
const persons = [
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
const PORT = 3003;
app.listen(PORT);
console.log("Server running on port", PORT);
