import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("Missing password");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://andrewberumen1991_db_user:${password}@cluster0.hfpw6mn.mongodb.net/phonebook?appName=Cluster0`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

if (process.argv.length === 3) {
  console.log("Phonebook:");
  Person.find({}).then((res) => {
    res.forEach((p) => {
      console.log(p);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length < 5) {
  console.log("Missing person name or phone number");
  process.exit(1);
} else {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name,
    number,
  });

  person.save().then((res) => {
    console.log(`Added ${person}, Number: ${number} to phonebook`);
    mongoose.connection.close();
  });
}
