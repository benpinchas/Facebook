
const socketIO = require('socket.io');   
const ChatService = require('../api/chat/chat.service')

var io;
let activeUsers = []

function setup(http) {
    io = socketIO(http);
    io.on('connection', function (socket) {
        let gUserId;
        socket.on('disconnect', () => {
            console.log('user disconnected', gUserId);
            let userIdx = activeUsers.findIndex(userId => userId === gUserId)
            if (userIdx !== -1) {
                activeUsers.splice(userIdx, 1)
                io.emit('activeUsers changed', activeUsers)
            }
        });

        socket.on('user inActive', (userId) => {
            console.log('user inActive', userId);
            let userIdx = activeUsers.findIndex(id => id === userId)
            if (userIdx !== -1) {
                activeUsers.splice(userIdx, 1)
                io.emit('activeUsers changed', activeUsers)
            }
        })

        socket.on('user active', (userId) => {
            console.log('user active', userId);
            gUserId = userId
            if (!activeUsers.find(id => id === userId)) {
                activeUsers.push(userId)
            }
            socket.join(userId);
            io.emit('activeUsers changed', activeUsers)
        });


        //CHAT
        socket.on('add msg', async ({msg, chatId, toUserId}) => {
            console.log(msg, chatId, toUserId)
            await ChatService.addMsg(msg, chatId)
            io.to(toUserId).emit('new msg', msg, chatId);
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