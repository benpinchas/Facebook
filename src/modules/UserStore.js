// import UserService from '../services/user.service.js';


export default { 
    state: {
       user: {fullname: 'ben pinchas', }

    },
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        login(state, {loggedInUser}) {
            console.log(loggedInUser, 'IN MUTATIONS')
            state.user = loggedInUser
        },
        logout(state) {
            state.user = null
        }
    },
    actions: {
        async login(context, {credentials}) {
            try {
              let loggedInUser = await UserService.login(credentials)
              context.commit({type: 'login', loggedInUser})
            }catch(err) {
                console.log('ERROR: cant login')
            }   
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
            context.commit({type: 'logout'})
        }
    }
}