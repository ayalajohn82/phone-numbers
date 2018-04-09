import { addNumberToList } from './archiveHelpers';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const sockets = require('socket.io')(http);
const archive = require('./archiveHelpers');

/**
 * Disconnects all open sockets
 */
sockets.terminate = function() {
  Object.keys(sockets.sockets.sockets).forEach(function(s) {
    sockets.sockets.sockets[s].disconnect(true);
  });
};

/**
 * validates if number is good for archiving
 * @param {string} number - number to be validated
 * @returns {boolean} - whether number is valid
 */
sockets.isValidNumber = function(number) {
  if(number === 'terminate') {
    this.terminate();
  } else if(!isNaN(number)) {
    return false;
  } else if(number.length === 9) {
    return true;
  } else {
    return false;
  }
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

sockets.on('connection', function(socket){
  console.log('a user connected');
  socket.on('phone number', function(number){
    console.log('received number:', number)
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});


