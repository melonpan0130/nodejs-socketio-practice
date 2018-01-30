var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function (request, response){
  fs.readFile('HTMLPage.html', function (error, data){
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(data);
  });
}).listen(3000, function(){
  console.log('Server running at http://127.0.0.1:3000');
});
var id = 0;
var io = socketio.listen(server);
io.sockets.on('connection', function (socket){
  //id를 설정합니다.
  id = socket.id;

  // rint 이벤트
  socket.on('rint', function (data){
    //클라이언트가 전송한 데이터를 출력합니다.
    console.log('Client Send Data: ', data);
    //클라이언트에 smart
    //socket.emit('smart', data); //private
    //io.sockets.emit('smart', data);  //public
    //socket.broadcast.emit('smart', data); //broadcast
    io.sockets.to(id).emit('smart', data);
  });
});
