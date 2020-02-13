const bookModel = require("../models/Books");
const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log("dans le get ");
  bookModel
    .find()
    .sort({ likes: -1 })
    .limit(5)
    .then(books => {
      res.render("index", { books });
    })
    .catch(next);
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
