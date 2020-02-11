const buyButton = document.getElementsByClassName("fa-plus-square");
const bookModel = require("../models/Books");
const userModel = require("../models/Users");

function displayAddBtn() {
    if ()
}


function buyBook(){
    if (this.user.points >= this.book.points) {
        this.user.points -=  this.book.points;
        console.log("succesfull book added");
    }
    else {
        return alert("Unfortunately, you don't have enough points to buy this book. Add your used book to the platform to gain some points :) ");
    }
}

buyButton.onclick = buyBook