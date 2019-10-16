import UserService from '../services/UserService.js'
import socket from '../services/SocketService.js'

export default {
    state: {
        loggedInUser: UserService.getLoggedInUser(),
        activeUsers: []
    },
    getters: {
        loggedInUser(state) {
            return state.loggedInUser
        },
        activeUsers(state) {
            return state.activeUsers
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedInUser = user
        },
        setActiveUsers(state, {activeUsers}) {
            state.activeUsers = activeUsers
        }
    },
    actions: { 
        async login(context, { credentials }) {
            await UserService.login(credentials)
            setTimeout(() => {
                location.reload()
            }, 2300)
        },
        async signup(context, { credentials }) {
            try {
                await UserService.signup(credentials)
                context.dispatch({ type: 'login', credentials })
            } catch (err) {
              alert('User Already Exist, Please use different email')
            }
        },
        async logout(context) {
            try {
                socket.emit("user inActive", context.getters.loggedInUser._id);
                // context.commit({ type: 'setUser', user: null })
                await UserService.logout()
                location.reload()
            } catch (err) {
                console.log(err);
            }
            // location.reload();
        },
        async saveUser(context, { user }) {
            console.log(user, "UESER")
            try {
                let updatedUser = await UserService.update(user)
                context.commit({ type: 'setUser', user: updatedUser })
            } catch (err) {
                throw err  
            }
        },

        async listenSocketEvents(context) {
            socket.on('activeUsers changed', activeUsers =>  {
                context.commit({type: 'setActiveUsers', activeUsers})
            })
        }
    }
}