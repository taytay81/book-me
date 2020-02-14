const API_KEY = "AIzaSyAmkiU-t8tGWmTQhcI-FS4noSZZ2g-v-sI";
let bookContainer = document.getElementById("search_results");
let searchBooks = document.getElementById("search_box");
let btnsearch = document.getElementById("btn_search");

const getBooks = async isbn => {
  var url;
  if (isbn.length >= 10) {
    if (isbn.length == 13) {
      url = `https://www.googleapis.com/books/v1/volumes?q=ISBN_13:${isbn}&key=${API_KEY}`;
    } else if (isbn.length == 10) {
      url = `https://www.googleapis.com/books/v1/volumes?q=ISBN_10:${isbn}&key=${API_KEY}`;
    } else if (isbn.length > 13) {
      url = `https://www.googleapis.com/books/v1/volumes?q=${isbn}&key=${API_KEY}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    printHtmlBook(data);

    //return data
  } else {
    console.log(
      "isbn number is not correct we are expecting a minimum of 10 number can't search for the book"
    );
  }
};

function retrieveTheBestBook(data) {
  for (let i = 0; i < data.totalItems; i++) {
    if (data.items[i].saleInfo.saleability === "FOR_SALE") {
      return data.items[i];
    }
  }
  return data.items[0];
}
function calculatePoints(price, page_count, state) {
  var finalPoints = 10;
  finalPoints = finalPoints + (price / 5 + page_count / 10);
  console.log(state);
  if (state == "as new") {
    finalPoints = finalPoints + 30;
  } else if (state == "very good") {
    finalPoints = finalPoints + 21;
  } else if (state == "good") {
    finalPoints = finalPoints + 9;
  } else if (state == "acceptable") {
    finalPoints = finalPoints + 5;
  }
  printHtmlPoints(Math.round(finalPoints));
}
function printHtmlPoints(points) {
  document.getElementById("points_id").value = points;
}
//function that get the result of the googleapi and prin it inside the form
function printHtmlBook(data) {
  if (data.totalItems > 0) {
    const myform = document.getElementById("form-book");
    myform.style.visibility = "visible";
    const mybook = retrieveTheBestBook(data);
    const isbn = document.getElementById("isbn_id");
    const title = document.getElementById("title_id");
    const img = document.getElementById("img_id");
    const authors = document.getElementById("author_id");
    const publisher = document.getElementById("publisher_id");
    const price = document.getElementById("price_id");
    const description = document.getElementById("description_id");
    const category = document.getElementById("category_id");
    const publishedDate = document.getElementById("published_date_id");
    const pages = document.getElementById("page_count_id");

    const language = document.getElementById("language_id");

    title.value = mybook.volumeInfo.title;
    title.style.width = mybook.volumeInfo.title.length + "ch";

    isbn.value = mybook.volumeInfo.industryIdentifiers[0].identifier;
    isbn.style.width = isbn.value.length + 2 + "ch";

    img.src = extractThumbnail(mybook.volumeInfo);
    image_value_id.value = extractThumbnail(mybook.volumeInfo);

    publishedDate.value = mybook.volumeInfo.publishedDate.substring(0, 10);
    publishedDate.style.width = publishedDate.value.length + "ch";

    pages.value = mybook.volumeInfo.pageCount;
    pages.style.width = pages.value.length + 2 + "ch";

    category.value = mybook.volumeInfo.categories[0];
    category.style.width = category.value.length + "ch";

    language.value = mybook.volumeInfo.language;
    language.style.width = language.value.length + "ch";

    price.value = mybook.saleInfo.listPrice.amount;
    price.style.width = price.value.length + 2 + "ch";

    description.value = mybook.volumeInfo.description;
    //description.style.width = description.value.length + "ch";
    if (mybook.volumeInfo.authors.length > 1) {
      const authorsSection = document.getElementById("authors_section");
      var authorsInnerhtml = `<label for="">Authors</label>`;
      for (let i = 0; i < mybook.volumeInfo.authors.length; i++) {
        authorsInnerhtml += `<input id="author_id" type="text" value=" ${mybook.volumeInfo.authors[i]} " name="author"></input>`;
      }
      authorsSection.innerHTML = authorsInnerhtml;
    } else {
      authors.value = mybook.volumeInfo.authors[0];
    }
    authors.style.width = authors.value.length + "ch";

    publisher.value = mybook.volumeInfo.publisher;
    publisher.style.width = publisher.value.length + 1 + "ch";
  } else {
    const myform = document.getElementById("form-book");
    myform.style.visibility = "hidden";
    const message = document.getElementById("messageFromApi");
    message.innerHTML =
      "The Isbn has not been found , try with another one or enter manually the data";
    console.log("we could not find the book there is no return element");
  }
}

window.addEventListener("load", () => {
  event.preventDefault();
  const myform = document.getElementById("form-book");
  myform.style.visibility = "hidden";

  document
    .getElementById("btn_search")
    .addEventListener("click", function(event) {
      event.preventDefault();
      var test = getBooks(searchBooks.value);
    });

  document
    .getElementById("state_id")
    .addEventListener("change", function(event) {
      event.preventDefault();
      const price = document.getElementById("price_id").value;
      const page_count = document.getElementById("page_count_id").value;
      const state = document.getElementById("state_id").value;
      console.log(price, page_count, state);
      calculatePoints(price, page_count, state);
    });
});

const extractThumbnail = volumeInfo => {
  const DEFAULT_THUMBNAIL = "images/favicon.ico";
  if (!volumeInfo.imageLinks || !volumeInfo.imageLinks.thumbnail) {
    return DEFAULT_THUMBNAIL;
  }
  return volumeInfo.imageLinks.thumbnail.replace("http://", "https://");
};
