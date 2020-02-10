const bookModel = require("../models/Books");
const express = require("express");
const router = express.Router();

/* GET all books page */

// router.get("/all", (req, res, next) => {
//   const book = req.body;
//     bookModel
//       .find({ title: { $regex: req.body, $options: "i" } })
//       .then(dbResults => {
//         console.log(dbResults);
//         res.render("all-books", {
//           books: res.json(dbResults)
//         });
//       })
//       .catch(next);
//   });

  router.post("/all", (req, res, next) => {
    const titleInput = req.body.title;
    const regexp = new RegExp(titleInput,"gi") 
    const titleRegex = {$regex : regexp};
    console.log("///////");
    bookModel
      .find({title: titleRegex}) //ADD REGEX HERE
      // .find({title: { $regex: /titleInput/, $options: "i" }})
      .then(dbResults => {
        console.log(dbResults);
        res.render("all-books", {
          books: dbResults
        });
      })
      .catch(next);
  });

  router.get("/", (req, res, next) => {
    artistModel
      .find({ name: { $regex: req.query.q, $options: "i" } })
      .then(dbRes => res.json(dbRes))
      .catch(next);
  });

module.exports = router;

// {title: { $regex: req.body, $options: "i" } }