var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("book");
  if (n + 2 > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
  x[slideIndex].style.display = "block";
  x[slideIndex + 1].style.display = "block";
}

document.querySelector(".button-left").onclick = () => {
  event.preventDefault();
  plusDivs(-1);
};
document.querySelector(".button-right").onclick = () => {
  event.preventDefault();
  plusDivs(1);
};
