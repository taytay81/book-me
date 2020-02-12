const bookModel = require("../models/Books");
const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/getLikes/:id", (req, res, next) => {
  console.log("on est bien la ");
  bookModel
    .findById(req.params.id)
    .then(book => {
      res.json(book);
    })
    .catch(next);
});

module.exports = router;
