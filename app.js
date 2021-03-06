const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    console.log('Client connected...');

    //var date = new Date();
    //var time = date.getTime() + 15000;
    io.emit('startOfQuiz', 15000);

    client.on('disconnect', function(){
        console.log('Client disconnected...');
    });

    client.on('chat message', function(msg) {
        console.log('chat message: ' + msg);
        io.emit('chat message', msg);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`))