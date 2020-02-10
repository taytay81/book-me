//require("dotenv").config();
//import APIHandler from "./APIHandler.js";
//const myBookAPI = new APIHandler("http://localhost:3000");

const API_KEY = "AIzaSyAmkiU-t8tGWmTQhcI-FS4noSZZ2g-v-sI";
let bookContainer = document.getElementById("search_results");
let searchBooks = document.getElementById("search_box");
let btnsearch = document.getElementById("btn_search");

const getBooks = async isbn => {
  console.log("entering the get books function");
  var url;
  if (isbn.length >= 10) {
    if (isbn.length == 13) {
      url = `https://www.googleapis.com/books/v1/volumes?q=ISBN_13:${isbn}&key=${API_KEY}`;
    } else if (isbn.length == 10)
      url = `https://www.googleapis.com/books/v1/volumes?q=ISBN_10:${isbn}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("the data", data);
    printHtmlBook(data);

    //return data
  } else {
    console.log(
      "isbn number is not correct we are expecting a minimum of 10 number can't search for the book"
    );
  }
};
//function that get the result of the googleapi and prin it inside the form
function printHtmlBook(data) {
  if (data.totalItems > 0) {
    const mybook = data.items[0].volumeInfo;
    const isbn = document.getElementById("isbn_id");
    const title = document.getElementById("title_id");
    const img = document.getElementById("img_id");
    const authors = document.getElementById("author_id");
    const publishers = document.getElementById("publisher_id");
    const price = document.getElementById("price_id");
    const description = document.getElementById("description_id");
    const category = document.getElementById("category_id");
    const publishedDate = document.getElementById("published_date_id");
    const page = document.getElementById("page_count_id");
    const points = document.getElementById("points_id");

    title.value = mybook.title;
    isbn.value = mybook.industryIdentifiers[0].identifier;
    img.src = extractThumbnail(mybook);
    //image_value_id.value = mybook.imageLinks.thumbnail;

    if (mybook.authors.length > 1) {
      const authorsSection = document.getElementById("authors_section");
      var authorsInnerhtml = `<label for="">Authors</label>`;
      for (let i = 0; i < mybook.authors.length; i++) {
        authorsInnerhtml += `<input id="author_id" type="text" value=" ${mybook.authors[i]} " name="author"></input>`;
      }
      authorsSection.innerHTML = authorsInnerhtml;
    } else {
      authors.value = mybook.authors[0];
    }
  } else {
    const message = document.getElementById("messageFromApi");
    message.innerHTML =
      "The Isbn has not been found , try with another one or enter manually the data";
    console.log("we could not find the book there is no return element");
  }
}

window.addEventListener("load", () => {
  console.log("IronGenerator JS imported successfully!");
  console.log("super on est ici ");
  event.preventDefault();

  document
    .getElementById("btn_search")
    .addEventListener("click", function(event) {
      event.preventDefault();
      console.log("salut");
      var test = getBooks(searchBooks.value);
      //console.log(returndata);
    });
});

const extractThumbnail = volumeInfo => {
  const DEFAULT_THUMBNAIL = "images/favicon.ico";
  if (!volumeInfo.imageLinks || !volumeInfo.imageLinks.thumbnail) {
    return DEFAULT_THUMBNAIL;
  }
  return volumeInfo.imageLinks.thumbnail.replace("http://", "https://");
};
