import PostService from '../services/PostService.js'
import router from '../router.js'
export default { 
    state: {
       posts: []
    },
    getters: {
        posts(state) {
            return state.posts
        }
    },
    mutations: {
        setPosts(state, {posts}) {
            state.posts = posts
        },
        save(state, {post}) {
            let postIdx = state.posts.findIndex(currPost => currPost._id === post._id)
            if (postIdx >= 0) state.posts.splice(postIdx, 1, post)
            else state.posts.unshift(post)
            return post
        },
        saveReact(state, {postId, react}) {
            console.log(postId, react)
            let post = state.posts.find(post => post._id === postId)
            if (!post) return
            
            let reactIdx = post.reactions.findIndex(currReact => currReact.userId === react.userId)
            if (reactIdx === -1) {
                post.reactions.unshift(react)
            } else {
                post.reactions.splice(reactIdx, 1, react)
                let reactIdx = post.reactions.findIndex(currReact => currReact.userId === react.userId)
                console.log('GOOOFFFFFFF')
            }
        },
        removeReact(state, {postId, loggedInUserId}) {
            let post = state.posts.find(post => post._id === postId)
            if (!post) return
            let reactIdx = post.reactions.findIndex(currReact => currReact.userId === loggedInUserId)
            if (reactIdx >= 0) post.reactions.splice(reactIdx, 1)

        },
        saveComment(state, {comment}) {
            let post = state.posts.find(post => post._id === comment.postId)
            if (!post) return
            let commentIdx = post.comments.findIndex(currComment => currComment._id === comment._id)
            if (commentIdx >= 0) {
                post.comments.splice(commentIdx, 1, comment)
            } else {
                post.comments.push(comment)
            }
        }
    },
    actions: {
        async loadPosts(context, {filterBy={}}) {
            filterBy.user2Id = router.app._route.params.userId
            console.log('filterBy', filterBy)
            let posts = await PostService.query(filterBy)
            context.commit({type: 'setPosts', posts})
        },
       async addPost(context, {post}) { //TODO: rename to save
           let savedPost = await PostService.save(post)
           context.dispatch({type: 'loadPosts'})
       },
       async toggleLike({commit,getters}, {userId, postId}) {
           //TODO: remove userId from the payload
           let loggedInUser = getters.loggedInUser
           commit('toggleLike', {postId, loggedInUser})
           await PostService.toggleLike({postId, loggedInUser})
       },
       async saveReact({commit}, { postId, react}) {
            commit({type: 'saveReact', postId, react })
            await PostService.saveReact(postId, react)
       },
       async removeReact({commit}, {postId, loggedInUserId}) {
            commit({type: 'removeReact', postId, loggedInUserId})
            await PostService.removeReact(postId)
       },
       async saveComment(context, {comment}) {
           let savedComment = await PostService.saveComment(comment)
           console.log(savedComment)
           context.commit({type: 'saveComment', comment: savedComment})
       },
       async getById(context, {postId}) {
           let post = await PostService.getById(postId)
           console.log('post', post )
           context.commit({type: 'save', post})
           return post
       }
    }
}