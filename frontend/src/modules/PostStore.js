import PostService from '../services/PostService.js'

export default { 
    state: {
       posts: []
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        async loadPosts(context, {filterBy}) {
            let posts = await PostService.query(filterBy)
            console.log('store: posts', posts);
        },
       async addPost(context, {post}) {
           console.log('store:', post);
           let addedPost = await PostService.add(post)
           console.log('addedPost store:', addedPost);
       }
    }
}