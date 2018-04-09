const express = require('express');
const app = express();
const http = require('http').Server(app);
const sockets = require('socket.io')(http);
const archive = require('./archiveHelpers');
const State = require('./state');

console.log(State);
const state = new State();

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
  } else if(state.isDuplicateNumber(number)) {
    state.incrementDuplicates();
    return false;
  } else if(number.length === 9 && !isNaN(number)) {
    return true;
  } else {
    return false;
  }
};

/**
 * Reports state and resets unique and duplicates
 */
sockets.report = function() {
  sockets.emit('report', state.getState());
  state.resetTemp();
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

sockets.on('connection', function(socket){
  console.log('a user connected');
  socket.on('phone number', function(number){
    console.log('received input:', number)
    if(sockets.isValidNumber(number)) {
      archive.addNumber(number);
      state.incrementTotalAndUnique();
    } else {
      socket.disconnect(true);
    }
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(4000, function(){
  archive.init();
  setInterval(sockets.report, 5000);
  console.log('listening on *:4000');
});


