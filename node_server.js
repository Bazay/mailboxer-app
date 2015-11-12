var http = require('http'),
  fs = require('fs'),
  port = 1337;

var app = http.Server().listen(port);

var io = require('socket.io').listen(app);
console.log('Server listening on port: %d', port)

io.sockets.on('connection', function(socket) {
  console.log('Connection detected.');
  socket.on('message_to_conversation_server', function(data) {
    io.sockets.emit('conversation_'+data['conversation_id'], { message: data['message'], username: data['username'] });
    console.log('Sent message to : \'conversation_'+data['conversation_id']+'\'');
  });
});