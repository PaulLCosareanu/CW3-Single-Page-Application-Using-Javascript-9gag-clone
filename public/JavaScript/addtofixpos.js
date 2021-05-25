window.onscroll = function() {myFunction()};

var header = document.getElementById("rightadds");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky-17) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}