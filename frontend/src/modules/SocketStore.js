import socket from '../services/SocketService.js'

export default {
    state: {
    },
    getters: {
       
    },
    mutations: {
    },
    actions: {
        listenSocketEvents(context) {
            socket.emit('user login', this.getters.loggedInUser._id)
            
            socket.on('activeUsers changed', activeUsers =>  {
                console.log('activeUsers', activeUsers)
                context.commit({type: 'setActiveUsers', activeUsers})
            })

            socket.on('new notification', notification => {
              console.log('SOCKET NOTIFICATION!')
              context.dispatch({type:'loadNotifications'})
            })

            socket.on('new friendship', () => {
                console.log('SOCKET FRIENDSHIP!')
                context.dispatch({type: 'loadFriendshipUsers'})
            })
          }
    }
}