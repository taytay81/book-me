const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  isbn: { type: String, required: true },
  title: { type: String, required: true },
  author: [String],
  publisher: String,
  price: Number,
  description: String,
  category: String,
  publishedDate: Date,
  pageCount: Number,
  language: String,
  image: String,
  state: {
    type: String,
    enum: ["as new", "very good", "good", "acceptable", ""]
  },
  points: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  likes: { type: Number, default: 0 }
});

const bookModel = mongoose.model("Books", bookSchema);

module.exports = bookModel;
