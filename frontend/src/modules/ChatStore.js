import ChatService from '../services/ChatService.js'
import socket from '../services/SocketService.js'

export default {
    state: {
        chats: []
    },
    getters: {
        chats(state) {
            console.log( state.chats.length)
            return state.chats
        },
        chatsForDesktop(state)  {
            return state.chats.slice(0, 2)
        }
    },
    mutations: {
        addMsg(state, {msg, chatId}) {
            let chat = state.chats.find(chat => chat._id === chatId)
            // if (!chat) await 
            chat.msgs.push(msg)
        },
        pushChat(state, {chat}) {
            let chatIdx = state.chats.findIndex(currChat => currChat._id === chat._id) 
            if (chatIdx >= 0) state.chats.splice(chatIdx, 1) 
            state.chats.unshift(chat)
        }
    },
    actions: {
       async loadChatWith(context, {userId}) {
            let chat = await ChatService.loadChatWith({userId})
            console.log('CHAT', chat)
            context.commit({type: 'pushChat', chat})
       },
       addMsg(context, {msg, chatId, toUserId}) {
           context.commit({type: 'addMsg', msg, chatId})
           socket.emit('add msg', {msg, chatId, toUserId})
        },
        listenSocketEvents(context) {
            console.log('CHAT STORE SOCKET')
            socket.on('new msg', async (msg, chatId) => {
                console.log(msg)
                if (_isChatExist(chatId)) context.commit({type: 'addMsg', msg, chatId})
                else  await context.dispatch({type: 'loadChatWith', userId: msg.userId})  
              
            })

            function _isChatExist(chatId) {
                console.log('context', context)
                return context.getters.chats.find(chat => chat._id === chatId)
            }
        }
    }
}