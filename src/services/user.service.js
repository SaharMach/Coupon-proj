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
    remove,
    loadDemoUsers
}

window.userService = userService

//Fetchs all users from storage or load demo users if no users are present
async function getUsers() {
    try {
        let users = await storageService.query(STORAGE_KEY)
        if (!users || !users.length) {
            await loadDemoUsers()
            users = await storageService.query(STORAGE_KEY)
        }
        return users
    } catch (err) {
        console.log("Can't get users");
        throw err
    }
}

//Removes a user by userId
function remove(userId) {
    try {
        return storageService.remove(STORAGE_KEY, userId)
    } catch (err) {
        console.log("Can't remove user");
        throw err
    }
}

//Login function to check user credentials and set the logged-in user in sessionStorage
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

//Signup function to add a new user to storage if the username is not already taken
async function signup(userCred) {
    let users = await getUsers()
    const isUsernameTaken = users.some(existingUser => existingUser.username.toLowerCase() === userCred.username.toLowerCase())
    if (isUsernameTaken) {
        console.error('Username is already taken');
        return;
    }
    try {
        const user = await storageService.post(STORAGE_KEY, userCred)
        return user 
    } catch (err) {
        console.error('Failed to sign up user:', err);
        throw err
    }
}

//Logout function to remove the logged-in user from sessionStorage
async function logout() {
    console.log('logged out!')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

//Save the logged-in user data to sessionStorage
async function saveLocalUser(user) {
    user = { _id: user._id, username: user.username, isAdmin: user.isAdmin}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

//Fetchs logged-in user from sessionStorage
function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

//Demo users
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
 