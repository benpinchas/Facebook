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
            state.posts.unshift(post)
        },
        toggleLike(state, {postId, loggedInUser}) {
            const userId = loggedInUser._id
            const username = loggedInUser.username
            let post = state.posts.find(post => post._id === postId)
            if (!post) return
            let likeIdx = post.likedBy.findIndex(like => like.userId === userId)
            if (likeIdx === -1) {
                post.likedBy.unshift({ userId, username })
            } else {
                post.likedBy.splice(likeIdx, 1)
            }
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
        //    context.commit({type: 'save', post: savedPost})
       },
       async toggleLike({commit,getters}, {userId, postId}) {
           //TODO: remove userId from the payload
           let loggedInUser = getters.loggedInUser
           commit('toggleLike', {postId, loggedInUser})
           await PostService.toggleLike({postId, loggedInUser})
       },
       async saveComment(context, {comment}) {
           let savedComment = await PostService.saveComment(comment)
           console.log(savedComment)
           context.commit({type: 'saveComment', comment: savedComment})
       }
    }
}