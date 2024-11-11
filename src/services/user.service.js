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
    loadDemoUsers
}

window.userService = userService

async function getUsers() {
    try {

        let users = await storageService.query(STORAGE_KEY)
        console.log(users);
        if (!users || !users.length) {
            await loadDemoUsers()
            users = await storageService.query(STORAGE_KEY)
        }
        console.log('from getUsers', users)
        return users
    } catch (err) {
        console.log("Can't get users");
        throw err
    }
}

async function getById(userId) {
    try {

        const user = await storageService.get(STORAGE_KEY, userId)
        return user
    } catch (err) {
        console.log("Can't fetch user by id")
        throw err
    }
}

function remove(userId) {
    try {
        return storageService.remove(STORAGE_KEY, userId)
    } catch (err) {
        console.log("Can't remove user");
        throw err
    }
}


async function login(userCred) {
    console.log(userCred);
    try {
        const users = await storageService.query(STORAGE_KEY)
        console.log(users);
        const user = users.find(user => user.username.toLowerCase() === userCred.username.toLowerCase())
        console.log("user",user);
        if (!user || user.password.toLowerCase() !== userCred.password.toLowerCase()) {
            throw new Error
        }
        return saveLocalUser(user)
    } catch (err) {
        console.log('Invalid username or password', err)
        throw err
    }
}

async function signup(userCred) {
    console.log(userCred);
    
    let users = await getUsers()
    const isUsernameTaken = users.some(existingUser => existingUser.username.toLowerCase() === userCred.username.toLowerCase())
    if (isUsernameTaken) {
        console.error('Username is already taken');
        return;
    }
    try {
        const user = await storageService.post(STORAGE_KEY, userCred)
        //saveLocalUser(user) //Check it!
        return user 
    } catch (err) {
        console.error('Failed to sign up user:', err);
        throw err
    }
}

async function logout() {
    console.log('logged out!')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function saveLocalUser(user) {
    user = { _id: user._id, username: user.username, isAdmin: user.isAdmin}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function loadDemoUsers() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([
        {_id:utilService.makeId(),  username: 'Sahar', password: '1111111' },
        {_id:utilService.makeId(), username: 'Admin', password: 'admin', isAdmin: true },
        {_id:utilService.makeId(), username: 'Check', password: '12aqwse3' },
        {_id:utilService.makeId(), username: '4sdfre23', password: '29084' },
        {_id:utilService.makeId(), username: 'chzxczxeck', password: 'ewruo' },
        {_id:utilService.makeId(), username: 'Chcvbeck', password: '123werwa' },
        {_id:utilService.makeId(), username: 'asdxcv', password: '2SVBFTR' },
        {_id:utilService.makeId(), username: 'zxcs', password: 'ASD1QWEN' },
        {_id:utilService.makeId(), username: 'hhdfg', password: '123ASDF' },
        {_id:utilService.makeId(), username: 'cvbsdf', password: 'asdasdfdsafdsf' },
        {_id:utilService.makeId(), username: 'wer21', password: '123124dvc' },
        {_id:utilService.makeId(), username: 'rtygrgh', password: '123asd' },
        {_id:utilService.makeId(), username: '34fnvc', password: '123asd' },
    ]))
    console.log('Demo users loaded')
}
 