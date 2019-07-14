import HttpService from './HttpService.js'

export default {
    add,
    query
}

async function add(post) {
    console.log('service:', post);
    let addedPost = await HttpService.ajax('api/post', 'post', post)
    console.log('service:', addedPost);
    
    return addedPost
}


async function query(filterBy) {
    let posts =  await HttpService.ajax('api/post', 'get')
    return posts
}





