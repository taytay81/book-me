const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  isbn: String,
  title: String,
  author: String,
  publisher: String,
  price: Number,
  description: String,
  category: String,
  publishedDate: Date,
  pageCount: Number,
  language: String,
  image: String,
  state: {type: String, enum: ["as new", "very good", "good", "acceptable"]}
});

const bookModel = mongoose.model("Books", bookSchema);

module.exports = bookModel;
