const bookModel = require("../models/Books");
const userModel = require("../models/Users");
const express = require("express");
const router = express.Router();

router.post("/dahboard", (req, res, next) => {
  const titleInput = req.body.title;
  const regexp = new RegExp(titleInput, "gi");
  const titleRegex = { $regex: regexp };
  console.log("///////");
  bookModel
    .find({ title: titleRegex }) //ADD REGEX HERE
    // .find({title: { $regex: /titleInput/, $options: "i" }})
    .then(dbResults => {
      console.log(dbResults);
      res.render("all-books", {
        books: dbResults
      });
    })
    .catch(next);
});
//router.get("/dashboard/:id", (req, res, next) => {

router.get("/dashboard", (req, res, next) => {
  Promise.all([
    userModel.findById(/*req.params.id*/ { _id: "5e41ac75e3d87e5aecbe71a9" }),
    bookModel.find()
  ])
    .then(dbres => {
      console.log(dbres[0]);
      console.log(dbres[1]);
      res.render("dashboard" /*, { user: dbRes[0], books: dbRes[1] }*/);
    })
    .catch(next);
});

router.post("/addBooks", (req, res, next) => {
  const data = {
    js: ["addBook"]
  };
  const book = req.body;
  console.log("book", req.body);
  bookModel
    .create(book)
    .then(() => {
      res.render("addBook", data);
    })
    .catch(next);
});
router.get("/addBooks", (req, res, next) => {
  const data = {
    js: ["addBook"]
  };
  res.render("addBook", data);
});

module.exports = router;

// {title: { $regex: req.body, $options: "i" } }
