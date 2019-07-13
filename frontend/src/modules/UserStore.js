import UserService from '../services/UserService.js'

export default { 
    state: {
       loggedInUser: UserService.getLoggedInUser(),

    },
    getters: {
        loggedInUser(state) {
            return state.loggedInUser
        }
    },
    mutations: {
        setUser(state, {user}) {
            state.loggedInUser = user
        },
    },
    actions: {
        async login(context, {credentials}) {
           let user = await UserService.login(credentials)
            context.commit({type: 'setUser', user})
        },
        async signup(context, {credentials}) {
            try {
              await UserService.signup(credentials)
              context.dispatch({type: 'login', credentials})
            }catch(err) {
                console.log('ERROR: cant login')
            }   
        },
        async logout(context) {
            try {
                await UserService.logout()
                context.commit({type: 'setUser', user:null})
            }catch(err) {
                console.log(err);
            }

        }
    }
}