import { useState, useEffect } from "react"
import { useNavigate } from 'react-router'
import { userService } from "../services/user.service"
import { AdminHeader } from "../cmps/AdminHeader"
import { AdminMenu } from "../cmps/AdminMenu"
import { DynamicCmp } from "../cmps/DynamicCmp"

export function AdminPage() {
    const [users, setUsers] = useState([])
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedinUser())
    const [type, setType] = useState('Users')
    const navigate = useNavigate()

    if(!loggedInUser || !loggedInUser.isAdmin) {
        navigate('/login')
    }

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
        <div className="admin-con"> 
            <AdminHeader />
            {/* {users.length > 0 ? (
            users.map(user => (
                <div key={user._id}>
                    <p>full name: {user.fullname} username: {user.username}</p>
                </div>
            ))
            ) : (
                <p>No users found</p>
            )}  */}
            <section className="admin-con-content">
                <AdminMenu setType={setType}/>
                <DynamicCmp props={type}/>
            </section>
        </div>
    )

}