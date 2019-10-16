const bcrypt = require('bcryptjs')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10
  
async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`)
    if (!email || !password) return Promise.reject('email and password are required!')

    const user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')
    delete user.password;
    return user;
}

async function signup(user) {
    // logger.debug(`auth.service - signup with email: ${email}, username: ${username}`)
    if (!user.email || !user.password || !user.username) return Promise.reject('email, username and password are required!')
    
    //check if not exist 
    const _user = await userService.getByEmail(user.email )
    console.log('test123', _user, user.email)
    if (_user) return Promise.reject('User Already Exist')
    console.log('User Already Exist')

    const hash = await bcrypt.hash(user.password, saltRounds)
    const addedUser = await userService.add({...user, password: hash})
    console.log('user signup service:', addedUser);    
    delete addedUser.password;

    return addedUser;
}

module.exports = {
    signup,
    login,
}