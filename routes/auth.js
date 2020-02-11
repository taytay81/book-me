const bookModel = require("../models/Books");
const userModel = require("../models/Users");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/dashboard", (req, res, next) => {
  const titleInput = req.body.title;
  const regexp = new RegExp(titleInput, "gi");
  const titleRegex = { $regex: regexp };
  console.log("///////");
  bookModel
    .find({ title: titleRegex }) //ADD REGEX HERE
    // .find({title: { $regex: /titleInput/, $options: "i" }})
    .then(dbResults => {
      console.log(dbResults);
      res.render("all-books", {
        books: dbResults
      });
    })
    .catch(next);
});
//router.get("/dashboard/:id", (req, res, next) => {

router.get("/dashboard", (req, res, next) => {
  Promise.all([
    userModel.findById(/*req.params.id*/ { _id: "5e41ac75e3d87e5aecbe71a9" }),
    bookModel.find()
  ])
    .then(dbres => {
      console.log(dbres[0]);
      console.log(dbres[1]);
      res.render("dashboard" /*, { user: dbRes[0], books: dbRes[1] }*/);
    })
    .catch(next);
});

router.post("/addBooks", (req, res, next) => {
  const data = {
    js: ["addBook"]
  };
  const book = req.body;
  console.log("book", req.body);
  bookModel
    .create(book)
    .then(createdBook => {
      console.log("the data ", createdBook);
      userModel
        .findByIdAndUpdate(
          "5e41ac75e3d87e5aecbe71a9",
          { $push: { books: createdBook._id } },
          { new: true }
        )
        .then(updatedBook => {
          console.log("updatedBook", updatedBook);
          res.render("dashboard");
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
        console.log("iccccccci", dbRes);
        if (dbRes) {
          return res.redirect("/auth/signup"); //
        }

        const salt = bcrypt.genSaltSync(10); // https://en.wikipedia.org/wiki/Salt_(cryptography)
        const hashed = bcrypt.hashSync(user.password, salt); // generates a secured random hashed password
        user.password = hashed; // new user is ready for db
    
        userModel.create(user).then(() => res.redirect("/auth/signin"));
        // .catch(dbErr => console.log(dbErr));
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
        req.session.currentUser = clone; // user is now in session... until session.destroy
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



module.exports = router;

