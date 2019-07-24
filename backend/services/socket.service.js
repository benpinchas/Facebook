
const socketIO = require('socket.io');   
// const roomService = require('./RoomService');

var io;
var activeUsersCount = 0;

function setup(http) {
    io = socketIO(http);
    io.on('connection', function (socket) {
        console.log('a user connected');
        var room;
        activeUsersCount++;

        socket.on('disconnect', () => {
            console.log('user disconnected');
            activeUsersCount--;
        });

        socket.on('user login', (userId) => {
            console.log('socket: user login', userId)
            socket.join(userId);
        });

        socket.on('chat msg', (msg, userId) => {
            console.log('message: ' + msg);
            io.to(userId).emit('chat newMsg', msg);
        });
    });
}

function emit(room, type, data) {
    io.to(room).emit(type, data)
    console.log(room, type, data)
}


module.exports = {
    setup,
    emit
}