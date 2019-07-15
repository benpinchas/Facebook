// import PostService from '../services/PostService.js'
import UserService from '../services/UserService.js'

import FriendshipService from '../services/FriendshipService.js'

export default { 
    state: {
       friendships: [],
       suggests: []
    },
    getters: {
        friendships(state) {
            return state.friendships
        },
        suggests(state) {
            return state.suggests
        }
    },
    mutations: {
        setSuggests(state, {suggests}) {
            state.suggests = suggests
            // console.log(state.suggests);
        }
    },
    actions: {
        async addFriendship(context, {friendship}) {
            console.log('store friendship', friendship);
            let addedFriendship = await FriendshipService.add(friendship)
            console.log(addedFriendship)
        },
        async loadSuggests(context ,{fiterBy}) {
            let suggests = await UserService.getUsers()
            // console.log('suggests', suggests)
            context.commit({type: 'setSuggests', suggests})
        }
        // async loadFriendships(context ,{fiterBy}) {
        //     let suggests = await UserService.getUsers()
        //     console.log('suggests', suggests)
        //     context.commit()
        // }
    }
}