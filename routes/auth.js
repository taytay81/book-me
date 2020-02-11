const bookModel = require("../models/Books");
const userModel = require("../models/Users");
const express = require("express");
const router = express.Router();

//router.get("/dashboard/:id", (req, res, next) => {

router.get("/dashboard", (req, res, next) => {
  userModel
    .findById("5e41ac75e3d87e5aecbe71a9")
    .populate({
      path: "books",
      match: { isAvailable: true }
    })
    .then(dbresult => {
      console.log(dbresult, "ici");
      res.render("dashboard", { user: dbresult, books: dbresult.books });
    })
    .catch(next);
});

router.post("/addBooks", (req, res, next) => {
  const data = {
    js: ["dashboard"]
  };
  const book = req.body;
  bookModel
    .create(book)
    .then(createdBook => {
      userModel
        .findByIdAndUpdate(
          "5e41ac75e3d87e5aecbe71a9",
          { $push: { books: createdBook._id } },
          { new: true }
        )
        .then(updatedBook => {
          res.redirect("/auth/dashboard");
        });
    })
    .catch(next);
});
router.get("/addBooks", (req, res, next) => {
  const data = {
    js: ["addBook"]
  };
  res.render("addBook", data);
});

router.get("/deleteBook/:id", (req, res, next) => {
  console.log("the id ", req.params.id);
  bookModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      console.log("on a bine suprime le livre");
      userModel
        .findByIdAndUpdate(
          "5e41ac75e3d87e5aecbe71a9",
          { $pull: { books: req.params.id } },
          { new: true }
        )
        .then(userModified => {
          console.log("userModified", userModified);
          res.redirect("/auth/dashboard");
        });
    })
    .catch(next);
});

module.exports = router;

// {title: { $regex: req.body, $options: "i" } }
