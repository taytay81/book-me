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
  avatar: { type: String, default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Fgemmerich%2F8431890328%2Flightbox%2F&psig=AOvVaw2e_ekI0sRncusNemNzKIgD&ust=1581604161263000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMChpuOczOcCFQAAAAAdAAAAABAS"},
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
