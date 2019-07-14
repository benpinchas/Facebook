import HttpService from './HttpService.js'
import { async } from 'q';

export default {
    save,
    query,
    getLinkDetails,
    toggleLike,
    addComment
}

async function getLinkDetails(txt) {
    return {
        "iframe": `<iframe width="100%" height="280px" style="border:none" src="https://www.youtube.com/embed/tgbNymZ7vqY"> </iframe>`,
        "title": "Google",
        "description": "Search webpages, images, videos and more.",
        "image": "https:\/\/www.google.com\/images\/logo.png",
        "url": "https:\/\/www.google.com"
    }
}


async function save(post) {
    let savedPost = await HttpService.ajax('api/post', 'post', post)
    console.log('service:', savedPost);

    return savedPost
}

async function toggleLike({ userId, postId }) {
    await HttpService.ajax('api/post/like', 'post', { userId, postId })
    console.log('like toggled')
}


async function addComment({comment, postId}) {
    await HttpService.ajax('api/post/comment', 'post', {comment, postId})
    console.log('comment added')
}




async function query(filterBy) {
    let posts = await HttpService.ajax('api/post', 'get')
    return posts
}





