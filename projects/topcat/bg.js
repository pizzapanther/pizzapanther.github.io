function create_win () {
  chrome.app.window.create('topcat.html', {
    id: 'topcat-' + Date.now(),
    resizable: true,
    alwaysOnTop: true,
    bounds: {
      'width': 480,
      'height': 270
    }
  });
}

chrome.app.runtime.onLaunched.addListener(function () {
  create_win();
});
