
/**
 * Module dependencies.
 */


var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ws = require('websocket.io')
  , server = ws.listen(4000)
var app = express();



// all environments
app.engine('html', require('ejs').renderFile);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'client/public'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'client')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);


server.on('connection', function (socket) {
  socket.on('message', function () { });
  socket.on('close', function () { });
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
