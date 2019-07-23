// import PostService from '../services/PostService.js'
import UserService from '../services/UserService.js'

import FriendshipService from '../services/FriendshipService.js'
import { stat } from 'fs';

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
                console.log(user.friendship.isApproved, user.friendship.user1Id ===  user._id)
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
        // async addFriendship(context, {friendship}) {
        //     let addedFriendship = await FriendshipService.add(friendship)
        //     console.log(addedFriendship)
        // },
        async saveFriendship(context, {friendship}) {
            console.log('user store' , friendship)
            let savedFriendship = await FriendshipService.save(friendship)
            console.log('savedFriendship', savedFriendship)
            // context.commit('saveUserFriendship', user)
        },

        async loadFriendshipUsers(context) {
            let filterBy = {
                isFriendship: true
            }
            let friendshipUsers = await UserService.query(filterBy)
            console.log('friendshipUsers', friendshipUsers)
            context.commit({type: 'setFriendshipUsers', friendshipUsers})
        },


         async loadSuggests(context ,{fiterBy}) {
            let suggests = await UserService.query()
            console.log('suggests', suggests)

            context.commit({type: 'setSuggests', suggests})
        },

    }
}