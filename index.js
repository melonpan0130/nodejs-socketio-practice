var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer();

var io = socketio.listen(server);

server.listen(3000, function(){
  console.log('Server running at http://127.0.0.1:3000');
});

server.on('request', function (request, response){
  fs.readFile('HTMLPage.html', function (error, data){
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(data);
  });
});

io.sockets.on('connection', function (socket){
  var roomName = null;

  socket.on('join', function(data) {
    roomName = data;
    socket.join(data);

      console.log('방 접속!:' + roomName);
  });

  socket.on('message', function(data){
    io.sockets.in(roomName).emit('message', data);
    console.log('메시지 도착!:' + data + '/' + roomName);
  });
});
