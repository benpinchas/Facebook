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
            let user = await UserService.login(credentials)
            context.commit({ type: 'setUser', user })

            socket.emit('user login', context.state.loggedInUser._id)
        },
        async signup(context, { credentials }) {
            try {
                await UserService.signup(credentials)
                context.dispatch({ type: 'login', credentials })
            } catch (err) {
                console.log('ERROR: cant login')
            }
        },
        async logout(context) {
            try {
                await UserService.logout()
                context.commit({ type: 'setUser', user: null })
                socket.emit('logout')
            } catch (err) {
                console.log(err);
            }

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
    }
}