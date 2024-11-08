import { storageService } from "./async-storage.service"
import { utilService } from "./util.services"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'userDb'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    loadDemoUsers
}

window.userService = userService

async function getUsers() {
    let users = await storageService.query(STORAGE_KEY)
    console.log(users);
    if (!users || !users.length) {
        await loadDemoUsers()
        users = await storageService.query(STORAGE_KEY)
    }
    console.log('from getUsers', users)
    return users
}

async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY, userId)
    return user
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY, userId)
}

async function update(user) {
    if(user._id === updatedUser._id) saveLocalUser(user)
    return user
}


async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username.toLowerCase() === userCred.username.toLowerCase())
    if (user) return saveLocalUser(user)
}

async function signup(userCred) {
    let users = await getUsers()
    const isUsernameTaken = users.some(existingUser => existingUser.username.toLowerCase() === userCred.username.toLowerCase())
    if (isUsernameTaken) {
        console.error('Username is already taken');
        return;
    }
    try {
        const user = await storageService.post(STORAGE_KEY, userCred)
        return saveLocalUser(user)
    } catch (err) {
        console.error('Failed to sign up user:', err);
    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, username: user.username}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function loadDemoUsers() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([
    { fullname: 'Sahar', username: 'w', password: '123' },
    { fullname: 'Admin', username: 'Admin', password: '123', isAdmin: true },
    { fullname: 'check', username: 'Check', password: '123' }]
    ))
    console.log('Demo users loaded')
}
 