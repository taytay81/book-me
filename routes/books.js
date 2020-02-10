const bookModel = require("../models/Books");
const express = require("express");
const router = express.Router();

/* GET all books page */

router.get("/all", (req, res, next) => {
    bookModel
      .find()
      .then(dbResults => {
        console.log(dbResults);
        res.render("all-books", {
          books: dbResults
        });
      })
      .catch(next);
  });

  router.post("/all", (req, res, next) => {
    bookModel
      .find()
      .then(dbResults => {
        console.log(dbResults);
        res.render("all-books", {
          books: dbResults
        });
      })
      .catch(next);
  });

  // router.get("/", (req, res, next) => {
  //   artistModel
  //     .find({ name: { $regex: req.query.q, $options: "i" } })
  //     .then(dbRes => res.json(dbRes))
  //     .catch(next);
  // });

module.exports = router;