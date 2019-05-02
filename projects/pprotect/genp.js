function genpass () {
  var p = document.getElementById('password').value;
  var encode = '';
  p.split(',').forEach(function (e) {
    encode += 'p=' + encodeURIComponent(btoa(e)) + '&';
  });

  var s = document.getElementById('stag');
  s.value = '<script id="pprotect" src="http://www.pizzapanther.com/projects/pprotect/pprotect.js?' + encode + '"></script>';

  return false;
}
