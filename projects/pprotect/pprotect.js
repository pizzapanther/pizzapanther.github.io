document.write("<style>\
  body {\
    visibility: hidden;\
  }\
  body.active {\
    visibility: visible;\
  }\
</style>");

document.addEventListener("DOMContentLoaded", function() {
  var s = document.querySelector("#pprotect");
  var encoded = s.attributes.src.value;
  var url = new URL(encoded, location.href);
  var b64s = url.searchParams.getAll('p');
  //console.log(atob(b64));


  var password = localStorage.password;
  var decoded = [];
  b64s.forEach(function (b64) {
    decoded.push(atob(b64));
  });
  while (1) {
    if (decoded.indexOf(password) > -1) {
      localStorage.password = password;
      break;
    }
    password = prompt('Page Password?');
  }

  var d = document.querySelector('body');
  d.classList.add('active');
});
