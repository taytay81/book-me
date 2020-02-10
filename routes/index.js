const bookModel = require("../models/Books");
const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// SEARCH FOR ALL BOOKS



router.post("/index/add-books", (req, res, next) => {
  const book = req.body;
  console.log("book", req.body);
  bookModel
    .create(book)
    .then(() => {
      res.render("index");
    })
    .catch(next);
});


module.exports = router;
