import socket from '../services/SocketService.js'

export default {
    state: {
    },
    getters: {
       
    },
    mutations: {
    },
    actions: {
        socketListener(context) {
            console.log('LISTEN TO SOCKET')
            socket.emit('user login', this.getters.loggedInUser._id)
            
            socket.on('new notification', notification => {
              context.dispatch({type:'loadNotifications'})
            })

            socket.on('new friendship', () => {
                console.log('SOCKET FRIENDSHIP!')
                context.dispatch({type: 'loadFriendshipUsers'})
            })
          }
    }
}