import socket from '../services/SocketService.js'

export default {
    state: {
        chats:[],
        msgs: [{ from: "Avi", txt: "Rollaa" }, { from: "Kobi", txt: "bolla" }]
    },
    getters: {
        msgs(state) {
            return state.msgs; 
        }
    },
    mutations: {
        addMsg(state, {msg}) {
            state.msgs.push(msg);
        }
    },
    actions: {
        chatJoin(context, {userId}) {
        },
        sendMsg(context, {msg, roomId}) {
            socket.emit('chat msg', msg, roomId)
        },
        
    }
}