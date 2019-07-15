import HttpService from './HttpService.js'

export default {
    login,
    logout,
    signup,
    getLoggedInUser,
    getUsers,
    getById
}

const USER_KEY = 'loggedInUser10'
var loggedInUser = JSON.parse(sessionStorage.getItem(USER_KEY))

function getLoggedInUser() {
    return loggedInUser
}

async function login(userCred) {
    try {
        let user = await HttpService.ajax('api/auth/login', 'post', userCred)
        loggedInUser = user
        sessionStorage.setItem(USER_KEY, JSON.stringify(loggedInUser))
        return loggedInUser
    } catch (err) {
        console.log('err');
    }

}

async function signup(userCred) {
    return HttpService.ajax('api/auth/signup', 'post', userCred)
}

function logout() {
    HttpService.ajax('api/auth/logout', 'post')
        .then(res => {
            console.log(res)
            loggedInUser = null
            sessionStorage.setItem(USER_KEY, null)
        })
}




async function getUsers() {
    return  HttpService.ajax('api/user', 'get')
}

async function getById(userId) {
    return HttpService.ajax(`api/user/${userId}`, 'get')
}




