class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.api = axios.create({
      baseURL: baseUrl
    });
  }
}
function printlikesNumber(e) {
  //e.target.className
  //target.setAttribute("style", "background-color:blue;");
}

window.addEventListener("load", () => {
  console.log("IronGenerator JS imported successfully!");
  console.log("super on est ici ");
  event.preventDefault();
  var likesButton = document.getElementsByClassName("like-link");

  for (let i = 0; i < likesButton.length; i++) {
    likesButton[i].addEventListener("mouseover", function(event) {
      event.preventDefault();
      console.log(likesButton[i]);
      var bookId = likesButton[i].attributes["custom-book-id"].textContent;
      axios
        .get("http://localhost:3000/getLikes/" + bookId)
        .then(response => {
          console.log(response.data.likes);
          likesButton[i].setAttribute("title", response.data.likes + "likes");
        })
        .catch(error => {
          console.log("Oh No! Error is: ", error);
        });

      console.log(bookId);
    });
  }
});

/*
document.getElementById("post-wall-e").onclick = function() {
  // Create an object with data to submit
  const characterInfo = {
     name:       'WALL-E',
     occupation: 'Waste Allocation Robot',
     weapon:     'Head laser'
   };
   // Make a POST request
   axios.post('https://ih-crud-api.herokuapp.com/characters',characterInfo)
     .then(response => {
         console.log('post successful and the response is: ',response );
     })
     .catch(error => {
         console.log('Oh No! Error is: ', error);  
     })
 } */
