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
        suggests(state) {
            return state.suggests.filter(user => {
                return !user.friendship
            })
        },
        requestingUsers(state) {
            return state.friendshipUsers.filter(user => {
                console.log(user.friendship.isApproved, user.friendship.user1Id ===  user._id)
                return !user.friendship.isApproved && user.friendship.user1Id ===  user._id
            })
        },
        approvedUsers(state) {

        }
    },
    mutations: {
        setSuggests(state, {suggests}) {
            state.suggests = suggests
        },
        setFriendshipUsers(state, {friendshipUsers}) {
            state.friendshipUsers = friendshipUsers
        }
    },
    actions: {
        async addFriendship(context, {friendship}) {
            let addedFriendship = await FriendshipService.add(friendship)
            console.log(addedFriendship)
        },
        async saveFriendship(context, {friendship}) {
            let savedFriendship = await FriendshipService.save(friendship)
            console.log('savedFriendship',savedFriendship)
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
            let suggests = await UserService.getUsers()
            console.log('suggests', suggests)

            context.commit({type: 'setSuggests', suggests})
        },

    }
}