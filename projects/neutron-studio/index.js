var express = require('express');
var serveStatic = require('serve-static');
var morgan = require('morgan');

app = express();
app.use(morgan('dev'));
app.use(serveStatic(__dirname + '/build'));

app.all('/*', function(req, res) {
  res.sendfile(__dirname + '/build/index.html');
});

var port = process.env.PORT || 8000;
app.listen(port);

console.log('server started '+ port);