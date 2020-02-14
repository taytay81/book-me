const bookModel = require("../models/Books");
const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  bookModel
    .find({ isAvailable: true })
    .sort({ likes: -1 })
    .limit(5)
    .then(books => {
      res.render("index", { books: books, js: "slideShow" });
    })
    .catch(next);
});
router.get("/infos", (req, res, next) => {
  res.render("infos");
});

router.get("/getLikes/:id", (req, res, next) => {
  bookModel
    .findById(req.params.id)
    .then(book => {
      res.json(book);
    })
    .catch(next);
});

router.post("/getLikes/:id", (req, res, next) => {
  bookModel
    .findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } })
    .then(book => {
      res.json(book);
    })
    .catch(next);
});

module.exports = router;
