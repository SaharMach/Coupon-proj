import { useEffect, useState } from "react";
import { userService } from "../../services/user.service";
import toast from "react-hot-toast";
import { UserForm } from "./UserForm";

export function UserList() {
    const [users, setUsers] = useState([])
    const [hoveredUser, setHoveredUser] = useState({})
    const [toggleDialog, setToggleDialog] = useState(false);


    useEffect(() => {
        fetchUsers()
    }, [])
     
    async function fetchUsers() {
        try {
            const usersData = await userService.getUsers()
            setUsers(usersData)
        } catch (err) {
            console.log('couldnt fetch users', err)
        }
    }
    
    function handleMouseEnter(userId){
        setHoveredUser(userId)
    }

    function handleMouseLeave() {
        setHoveredUser({})
    }

    async function onDeleteUser(userId) {
        try {
            
            await userService.remove(userId)
            const usersToSave = users.filter(u => u._id !== userId)
            setUsers(usersToSave)
            toast.success('Successfully deleted!')

        } catch (err) {
            console.log('couldnt delete user')
            toast.error("This didn't work.")
        }
    }
    
    async function onCreateUser(e, newUser) {
        e.preventDefault()
        if (!newUser.username || !newUser.password) {
            toast.error("Please fill in all fields!")
            return
        }
        try {
            const createdUser = await userService.signup(newUser)
            setUsers(prevUsers => [...prevUsers, createdUser]);
            setToggleDialog(false)
            toast.success("User created successfully!")
        } catch (err) {
            toast.error("User creation failed.")
            console.log("Couldn't create user", err)
        }
    }

    return (
        <section className="user-list-con">
            <section className="user-list-con-header">
                <h3>Users list</h3>
                <button onClick={() => setToggleDialog(true)}>
                    Create user
                </button>
            </section>
            <ul className="user-list">
                {users?.length > 0 ? (
                    users.map((user) => (
                        <li
                            key={user._id}
                            className="user-item"
                            onMouseEnter={() => handleMouseEnter(user._id)} 
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className="userId">{user._id}</span>
                            <span className="username">
                                {user.isAdmin ? 
                                <span className="material-symbols-outlined">
                                    shield_person
                                </span>
                                : <span className="material-symbols-outlined">
                                person
                                </span>}
                                {user.username}
                            </span>
                            <span className="demo-email">{`${user.username}@gmail.com`}</span>
                            <span className="password">{hoveredUser === user._id ? user.password : '********'}</span>
                            <button
                                className="delete-btn"
                                onClick={() => onDeleteUser(user._id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </ul>
            {toggleDialog && (
                <div className="create-dialog">
                    <button className="close-btn" onClick={() => setToggleDialog(false)}>x</button>
                    <UserForm onCreateUser={onCreateUser} />
                </div>
            )}
        </section>
    )
}