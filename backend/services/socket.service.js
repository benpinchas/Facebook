
const socketIO = require('socket.io');   
// const roomService = require('./RoomService');

var io;
let activeUsers = []

function setup(http) {
    io = socketIO(http);
    io.on('connection', function (socket) {
        console.log('a user connected');
        let gUserId = null
        socket.on('disconnect', () => {
            console.log('user disconnected');
            console.log('gUserId ::', gUserId )
            let userIdx = activeUsers.findIndex(userId => userId === gUserId)
            if (userIdx !== -1) {
                activeUsers.splice(userIdx, 1)
                io.emit('activeUsers changed', activeUsers)
            }
        });

        socket.on('logout', () => {
            console.log('user logout', gUserId);
            let userIdx = activeUsers.findIndex(userId => userId === gUserId)
            if (userIdx !== -1) {
                activeUsers.splice(userIdx, 1)
                io.emit('activeUsers changed', activeUsers)
            }
        })

        socket.on('user login', (userId) => {
            console.log('socket: user login', userId)
            gUserId = userId
            if (!activeUsers.find(id => id === userId)) {
                activeUsers.push(userId)
            }
            socket.join(userId);
            io.emit('activeUsers changed', activeUsers)
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