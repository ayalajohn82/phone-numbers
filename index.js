const express = require('express');
const app = express();
const http = require('http').Server(app);
const sockets = require('socket.io')(http);
const archive = require('./archiveHelpers');

// Disconnects all open sockets
sockets.terminate = function() {
  Object.keys(sockets.sockets.sockets).forEach(function(s) {
    sockets.sockets.sockets[s].disconnect(true);
  });
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

sockets.on('connection', function(socket){
  console.log('a user connected');
  socket.on('phone number', function(number){
    if(number === 'terminate') {
      sockets.terminate();
    }
    console.log('received number:', number)
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});


