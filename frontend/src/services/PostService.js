import HttpService from './HttpService.js'
import { async } from 'q';

export default {
    save,
    query,
    toggleLike,
    saveComment,
    getById
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
    await HttpService.post('api/post/like', { userId, postId })
    console.log('like toggled')
}


async function saveComment(comment) {
    return await HttpService.post('api/post/comment', comment)
    console.log('comment saved!')
}


async function query(filterBy) {
    let posts = await HttpService.get('api/post', filterBy)
    return posts
}





