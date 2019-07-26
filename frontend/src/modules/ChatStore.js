import ChatService from '../services/ChatService.js'
import socket from '../services/SocketService.js'

export default {
    state: {
        chats:[],
    },
    getters: {
        chats(state) {
            return state.chats
        }
    },
    mutations: {
        addMsg(state, {msg}) {
            state.msgs.push(msg);
        },
        setChat(state, {chat}) {
            state.chats.push(chat)
        }
    },
    actions: {
       async loadChat(context, {userId}) {
            let chat = await ChatService.loadChat({userId})
            console.log('CHAT', chat)
            context.commit('setChat', chat)
       },
        sendMsg(context, {msg, roomId}) {
            socket.emit('chat msg', msg, roomId)
        },
        
    }
}