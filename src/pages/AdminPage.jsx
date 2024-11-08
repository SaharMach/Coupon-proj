import { useState, useEffect } from "react"
import { userService } from "../services/user.service"
export function AdminPage() {
    const [users, setUsers] = useState([])
    
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
    
    return (
        <div> 
            {users.length > 0 ? (
            users.map(user => (
                <div key={user._id}>
                    <p>{user.fullname}</p>
                    <p>{user.username}</p>
                </div>
            ))
            ) : (
                <p>No users found</p>
            )} 
        </div>
    )

}