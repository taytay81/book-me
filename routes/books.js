const bookModel = require("../models/Books");
const express = require("express");
const router = express.Router();

/* GET all books page */

router.get("/all", (req, res, next) => {
  const titleInput = req.body.query;
  const regexptitle = new RegExp(titleInput, "gi");
  const authorInput = req.body.query;
  const regexpauthor = new RegExp(authorInput, "gi");
  bookModel
    .find({
      $and: [
        {
          $or: [
            { title: { $regex: regexptitle } },
            { author: { $regex: regexpauthor } }
          ]
        },
        { isAvailable: true }
      ]
    })
    .then(dbResults => {
      res.render("all-books", { books: dbResults });
    })
    .catch(next);
});

router.post("/all", (req, res, next) => {
  const titleInput = req.body.query;
  const regexptitle = new RegExp(titleInput, "gi");
  const authorInput = req.body.query;
  const regexpauthor = new RegExp(authorInput, "gi");
  bookModel
    .find({
      $and: [
        {
          $or: [
            { title: { $regex: regexptitle } },
            { author: { $regex: regexpauthor } }
          ]
        },
        { isAvailable: true }
      ]
    })
    .then(dbResults => {
      res.render("all-books", {
        books: dbResults
      });
    })
    .catch(next);
});

module.exports = router;
