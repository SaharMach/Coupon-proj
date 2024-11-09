import { useState, useEffect } from "react"
import { useNavigate } from 'react-router'
import { userService } from "../services/user.service"
import { AdminHeader } from "../cmps/AdminHeader"
import { AdminMenu } from "../cmps/AdminMenu"
import { DynamicCmp } from "../cmps/DynamicCmp"

export function AdminPage() {
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedinUser())
    const [type, setType] = useState('Users')
    const navigate = useNavigate()

   
    if(!loggedInUser || !loggedInUser.isAdmin) {
        navigate('/login')
    }


    return (
        <div className="admin-con"> 
            <AdminHeader loggedInUser={loggedInUser}/>
           
            <section className="admin-con-content">
                <AdminMenu setType={setType} type={type} setLoggedInUser={setLoggedInUser}/>
                <DynamicCmp type={type}/>
            </section>
        </div>
    )

}