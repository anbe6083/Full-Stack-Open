import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, { family: 4 })
  .then((res) => {
    console.log("connected to MongoDB");
  })
  .catch((e) => {
    console.log("Problem connecting to mongodb: ", e.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v),
      message: (props) => `${props.value} is not a valid US phone number!`,
      name: "ValidationError",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    ((returnedObject.id = returnedObject._id.toString()),
      delete returnedObject._id);
    delete returnedObject.__v;
  },
});

export default mongoose.model("Person", personSchema);
