const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  firstname: String,
  adress: String,
  telephone: Number,
  postcode: String,
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true
    }
  ]
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
