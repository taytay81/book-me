const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  lastname: { type: String},
  password: { type: String, required: true },
  firstname: String,
  adress: String,
  telephone: Number,
  postcode: String,
  city: String,
  avatar: String,
  points: {type: String, default: 50},
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true,
      default: 0
    }
  ],
  books_bought: [
    {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true,
      default: 0
    }
  ]
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
