const bookModel = require("../models/Books");
const userModel = require("../models/Users");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//router.get("/dashboard/:id", (req, res, next) => {

router.get("/dashboard", (req, res, next) => {
  userModel
    .findById(req.session.currentUser._id)
    .populate({
      path: "books",
      match: { isAvailable: true }
    })
    .then(dbresult => {
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
          req.session.currentUser._id,
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

router.post("/editBook/:id", (req, res, next) => {
  bookModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/auth/dashboard");
    })
    .catch(next);
});
router.get("/printBookDetailled/:id", (req, res, next) => {
  console.log("hello");
  bookModel
    .findById(req.params.id)
    .then(book => {
      console.log(book);
      res.render("printBookDetailled", { book });
    })
    .catch(next);
});

router.get("/editBook/:id", (req, res, next) => {
  console.log("hello");
  bookModel
    .findById(req.params.id)
    .then(book => {
      console.log(book);
      res.render("editBook", { book });
    })
    .catch(next);
});

router.get("/deleteBook/:id", (req, res, next) => {
  bookModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      userModel
        .findByIdAndUpdate(
          req.session.currentUser._id,
          { $pull: { books: req.params.id } },
          { new: true }
        )
        .then(userModified => {
          res.redirect("/auth/dashboard");
        });
    })
    .catch(next);
});
// SIGNUP

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  const user = req.body; // req.body contains the submited informations (out of post request)
  // if (req.file) user.avatar = req.file.secure_url;
  if (!user.email || !user.password) {
    res.redirect("/auth/signup");
    return;
  } else {
    userModel
      .findOne({ email: user.email })
      .then(dbRes => {
        if (dbRes) {
          return res.redirect("/auth/signup"); //
        }

        const salt = bcrypt.genSaltSync(10); // https://en.wikipedia.org/wiki/Salt_(cryptography)
        const hashed = bcrypt.hashSync(user.password, salt); // generates a secured random hashed password
        user.password = hashed; // new user is ready for db

        userModel.create(user).then(() => res.redirect("/auth/signin"));
      })
      .catch(next);
  }
});

// SIGNIN

router.get("/signin", (req, res, next) => {
  res.render("signin");
});

router.post("/signin", (req, res, next) => {
  const user = req.body;
  if (!user.email || !user.password) {
    // one or more field is missing
    return res.redirect("/auth/signin");
  }
  userModel
    .findOne({ email: user.email })
    .then(dbRes => {
      if (!dbRes) {
        // no user found with this email
        return res.redirect("/auth/signin");
      }
      // user has been found in DB !
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        // encryption says : password match success
        const { _doc: clone } = { ...dbRes }; // make a clone of db user
        delete clone.password; // remove password from clone
        // console.log(clone);
        req.session.currentUser = clone;
        console.log("iciciciicic", req.session.currentUser._id); // user is now in session... until session.destroy
        return res.redirect("/books/all");
      } else {
        // encrypted password match failed
        return res.redirect("/auth/signin");
      }
    })
    .catch(next);
});

// LOG OUT

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.locals.isLoggedIn = undefined;
    res.redirect("/auth/signin");
  });
});

// BUY A BOOK

router.get("/buyBook/:id", (req, res, next) => {
  console.log("the id ", req.params.id);
  bookModel
    .findById(req.params.id) // ADD USER ID WITH SESSION
    .then(dbRes => {
      console.log("on a bine suprime le livre", dbRes);
      res.redirect("/");
    })
    .catch(next);
});

module.exports = router;
