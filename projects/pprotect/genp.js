function genpass () {
  var p = document.getElementById('password').value;
  p = encodeURIComponent(btoa(p));

  var s = document.getElementById('stag');
  s.innerText = '<script id="pprotect" src="http://www.pizzapanther.com/projects/pprotect/pprotect.js?p=' + p + '"></script>';

  return false;
}
