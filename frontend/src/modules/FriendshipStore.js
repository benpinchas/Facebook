import UserService from '../services/UserService.js'
import FriendshipService from '../services/FriendshipService.js'
import socket from '../services/SocketService.js'
export default { 
    state: {
       suggests: [],
       friendshipUsers: [],

    },
    getters: {
        suggests(state, getters) { //TODO: improve
            return state.suggests.filter(user => {
                return !user.friendship && user._id !== getters.loggedInUser._id
            })
        },
        requestingUsers(state) {
            return state.friendshipUsers.filter(user => {
                return !user.friendship.isApproved && user.friendship.user1Id ===  user._id
            })
        },
        approvedUsers(state) {
            return state.friendshipUsers.filter(user => user.friendship.isApproved)
        }
    },
    mutations: {
        setSuggests(state, {suggests}) {
            state.suggests = suggests
        },
        setFriendshipUsers(state, {friendshipUsers}) {
            state.friendshipUsers = friendshipUsers
        },
        saveUserFriendship(state, {user}) {
            // let user = state.friendshipUsers.find(curruser => user.)
        }
    },
    actions: {
        async saveFriendship(context, {friendship}) {
            console.log('user store' , friendship)
            let savedFriendship = await FriendshipService.save(friendship)
            console.log('savedFriendship', savedFriendship)
        },

        async loadFriendshipUsers(context) {
            let filterBy = {
                isFriendship: true
            }
            let friendshipUsers = await UserService.query(filterBy)
            context.commit({type: 'setFriendshipUsers', friendshipUsers})
        },


         async loadSuggests(context ,{fiterBy}) {
            let suggests = await UserService.query()

            context.commit({type: 'setSuggests', suggests})
        },

        async listenSocketEvents(context) {
            socket.on('new friendship', () => {
                console.log('new friendship')
                context.dispatch({type: 'loadFriendshipUsers'})
            })
        }

    }
}