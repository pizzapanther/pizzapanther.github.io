function goto (event) {
  event.preventDefault();
  
  var el = document.getElementById('url');
  
  var html = `<webview id="webview" allowpopups src="${el.value}" style="width: 100%; height: 100%;"></webview>`;
  
  var body = document.getElementById('main-body');
  body.innerHTML = html;
  
  return false;
}

document.getElementById('url-form').addEventListener('submit', goto);
