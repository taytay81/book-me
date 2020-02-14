const APIHandler = axios.create({
  baseURL: "https://book-swap1234.herokuapp.com"
});
/*const APIHandler = axios.create({
  baseURL: "http://localhost:3000"
});*/

function printlikesNumber(e) {
  //e.target.className
  //target.setAttribute("style", "background-color:blue;");
}

window.addEventListener("load", () => {
  event.preventDefault();
  var likesButton = document.getElementsByClassName("like-link");
  for (let i = 0; i < likesButton.length; i++) {
    likesButton[i].addEventListener("mouseover", function(event) {
      event.preventDefault();
      var bookId = likesButton[i].attributes["custom-book-id"].textContent;

      APIHandler.get(`/getLikes/${bookId}`)
        .then(response => {
          likesButton[i].setAttribute("title", response.data.likes + "likes");
        })
        .catch(error => {
          console.log("Error is: ", error);
        });
    });
    likesButton[i].addEventListener("click", function(event) {
      event.preventDefault();
      console.log(likesButton[i]);
      var bookId = likesButton[i].attributes["custom-book-id"].textContent;
      APIHandler.post(`/getLikes/${bookId}`)
        .then(response => {
          console.log(response.data.likes);
          likesButton[i].setAttribute("title", response.data.likes + "likes");
        })
        .catch(error => {
          console.log("Error is: ", error);
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
