var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

io.on('connection', function(socket){
  console.log('got a connection');
  socket.on('sendmessage', function(msg){
    console.log('in chat message event');
    io.emit('receivemessage', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

