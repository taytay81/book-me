const buyButton = document.getElementsByClassName("fa-plus-square");
const bookModel = require("../models/Books");
const userModel = require("../models/Users");

function checkuserpoints(user, book) {
  if (user.points >= book.points) {
    user.points -= book.points;
    console.log("succesfull book added");
  } else {
    return alert(
      "Unfortunately, you don't have enough points to buy this book. Add your used book to the platform to gain some points :) "
    );
  }
}

buyButton.onclick = checkuserpoints;
