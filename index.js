var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer( function (request, response){
  fs.readFile('HTMLPage.html', function (error, data){
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(data);
  });
}).listen(3000, function(){
  console.log('Server running at http://127.0.0.1:3000');
});
var io = socketio.listen(server);

io.sockets.on('connection', function (socket){
  socket.on('message', function(data){
    io.sockets.emit('message', data);
  });
});
