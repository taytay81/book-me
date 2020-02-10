const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  isbn: String,
  title: String,
  image: String,
  state: String
});

const bookModel = mongoose.model("Books", bookSchema);

module.exports = bookModel;
