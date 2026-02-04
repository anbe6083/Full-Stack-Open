const logger = require("./utils/logger");
const mongoose = require("mongoose");
if (process.argv.length < 3) {
  logger.info("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://andrewberumen1991_db_user:${password}@cluster0.hfpw6mn.mongodb.net/noteApp?appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

Note.find({ important: true }).then((res) => {
  res.forEach((n) => {
    logger.info(n);
  });
  mongoose.connection.close();
});
