import PostService from '../services/PostService.js'

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
            // console.log('state', state.posts)
        },
        save(state, {post}) {
            state.posts.unshift(post)
        }
    },
    actions: {
        async loadPosts(context, {filterBy}) {
            let posts = await PostService.query(filterBy)
            context.commit({type: 'setPosts', posts})
        },
       async addPost(context, {post}) {
           post = await PostService.save(post)
           context.commit({type: 'save', post})
       },
       async toggleLike(context, {userId, postId}) {
           console.log({postId, userId})
           await PostService.toggleLike({postId, userId})
       },
       async addComment(context, {txt, postId}) {
           await PostService.addComment({txt, postId})
       }
    }
}