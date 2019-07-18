// import PostService from '../services/PostService.js'
import UserService from '../services/UserService.js'

import FriendshipService from '../services/FriendshipService.js'

export default { 
    state: {
       friendships: [],
    //    friendshipRequests: [],
       suggests: []
    },
    getters: {
        friendships(state) {
            return state.friendships
        },
        friendshipRequests(state, getters, rootState, rootGetters) {
            return state.friendships.filter(friendship => {
                return friendship.user2._id === rootGetters.loggedInUser._id && !friendship.isApproved
            })
        },
        friendshipsSents(state, getters, rootState, rootGetters) {
            return state.friendships.filter(friendship => {
                return friendship.user1.userId === rootGetters.loggedInUser._id && !friendship.isApproved
            })
        },
        unseenFriendshipRequests(state, getters) {
            return getters.friendshipRequests.filter(friendship => !friendship.isSeen)
        },
        suggests(state) {
            return state.suggests
        },
        approvedFriendships(state) {
            return state.friendships.filter(friendship => friendship.isApproved)
        }
    },
    mutations: {
        setFriendships(state, {friendships}) {
            state.friendships = friendships
            console.log(state.friendships);
        },
        setSuggests(state, {suggests}) {
            state.suggests = suggests
        }
    },
    actions: {
        async addFriendship(context, {friendship}) {
            let addedFriendship = await FriendshipService.add(friendship)
            console.log(addedFriendship)
        },
        async loadFriendships(context) {
            let friendships = await FriendshipService.query()
            console.log('friendships store action:', friendships)
            context.commit({type: 'setFriendships', friendships})
        },

        async saveFriendship(context, {friendship}) {
            let savedFriendship = await FriendshipService.save(friendship)
            console.log('savedFriendship',savedFriendship)
        },






         async loadSuggests(context ,{fiterBy}) {
            let suggests = await UserService.getUsers()
            // console.log('suggests', suggests)
            context.commit({type: 'setSuggests', suggests})
        },

    }
}