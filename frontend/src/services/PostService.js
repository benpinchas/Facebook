import HttpService from './HttpService.js'
import { async } from 'q';

export default {
    save,
    query,
    toggleLike,
    saveComment,
    getById,
    saveReact,
    removeReact
}



async function getById(postId) {
    return HttpService.get(`api/post/${postId}`)
}

async function save(post) {
    let savedPost = await HttpService.post('api/post', post)
    console.log('service:', savedPost);

    return savedPost
}

async function toggleLike({ userId, postId }) {
    return await HttpService.post('api/post/like', { userId, postId })
}

async function saveReact(postId, react) {
    return await HttpService.post('api/post/react', {postId, react})
}

async function removeReact(postId) {
    return await HttpService.delete('api/post/react', {postId})
}

async function saveComment(comment) {
    return await HttpService.post('api/post/comment', comment)
    console.log('comment saved!')
}


async function query(filterBy) {
    let posts = await HttpService.get('api/post', filterBy)
    return posts
}





