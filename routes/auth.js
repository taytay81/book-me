const bookModel = require("../models/Books");
const userModel = require("../models/Users");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const uploadCloud = require("../config/cloudinary");

//router.get("/dashboard/:id", (req, res, next) => {

router.get("/dashboard", (req, res, next) => {
  console.log(req.session.currentUser._id);
  userModel
    .findById(req.session.currentUser._id)
    .populate(
      [{path: "books",
      match: { isAvailable: true }},
      {path: "books_bought",
      match: { isAvailable: false }}
    ])
    .then(dbresult => {
      res.render("dashboard", { user: dbresult, books: dbresult.books, books_bought: dbresult.books_bought});
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
  const currentBookId = req.params.id;
  const currentUserId = req.session.currentUser;

  Promise.all([
    bookModel.findById(currentBookId),
    userModel.findById(currentUserId)
  ])
  .then(dbRes => {
    if (dbRes[1].points >= dbRes[0].points) {
      const newPoints = dbRes[1].points - dbRes[0].points;
      console.log("user has enough points");
      Promise.all([
        userModel.findByIdAndUpdate(currentUserId, {points : newPoints}),
        bookModel.findByIdAndUpdate(currentBookId, {isAvailable : false}),
        userModel.findByIdAndUpdate(currentUserId, { $push: { books_bought: currentBookId } },
          { new: true })
      ])
      .then(added_Book => {
      // res.render("dashboard", {books_bought: dbRes[0]})
      res.redirect("/auth/dashboard")
      })
    }  
      else {
        console.log("Unfortunately, you don't have enough points to buy this book. Add your used book to the platform to gain some points");
        res.redirect("/books/all");
      }
      // return(
      // console.log("Unfortunately, you don't have enough points to buy this book. Add your used book to the platform to gain some points :) ")
      // )
  })
  .catch(next);
});

// GET MY PROFILE

router.get("/myprofile", (req, res, next) => {
  res.render("myProfile");
});

// POST MY PROFILE

router.post("/myprofile", uploadCloud.single("avatar"), (req, res, next) => {
  const user = req.body;
  console.log("ici c'est l'avatar", user);
  if (req.file) user.avatar = req.file.secure_url;
  userModel
    .create(user)
    .then(() => {
      res.redirect("/auth/myprofile");
    })
    .catch(next);
});

  // Promise.all([
  //   bookModel.findByIdAndUpdate(req.params.id, {isAvailable : false}),
  //   userModel.findByIdAndUpdate(req.session.currentUser, )
  // ])
//     .then(dbRes => {
//       // dbRes[0].isAvailable = false;
//       // dbRes[1].books_bought.push(req.params.id);
//       console.log("la", dbRes[0].isAvailable);
//       console.log("icii", dbRes[1].books_bought);
//       res.redirect("/auth/dashboard");
//     })
//     .catch(next);
// });


module.exports = router;
