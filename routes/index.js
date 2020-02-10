const bookModel = require("../models/Books");
const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/addBooks", (req, res, next) => {
  const book = req.body;
  console.log("book", req.body);
  bookModel
    .create(book)
    .then(() => {
      res.render("addBook");
    })
    .catch(next);
});
router.get("/addBooks", (req, res, next) => {
  res.render("addBook");
});

module.exports = router;
