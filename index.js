const express = require('express');
const socketIo = require('socket.io');

var app = express();
app.use(express.static('public'));
// PORT NUMBER, callback function
var server = app.listen(4500,function(){
console.log('4500 - Server is running');
});



var socketIoWithServer = socketIo(server);

// event name, callback
socketIoWithServer.on('connection', function(socketIo){

    console.log("Connected - "+ socketIo.id);

    //  In Creating event-> on method: eventname, what to do
    socketIo.on('chatWithServer',function(){

        console.log('Called from client');
    });
    socketIo.on('chatWithServerWithMessage',function(data){
        console.log('Called from client for message',data);

        // socketIo.emit('chatWithClientWithMessage',data);
        // socketIo.emit('chatWithClientWithMessage',data);
        socketIoWithServer.sockets.emit('chatWithClientWithMessage',data);
    });

});