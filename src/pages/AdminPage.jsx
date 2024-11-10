import { useState, useEffect } from "react"
import { useNavigate } from 'react-router'

import { userService } from "../services/user.service"
import { couponService } from "../services/coupon.service"

import { AdminHeader } from "../cmps/AdminHeader"
import { AdminMenu } from "../cmps/AdminMenu"
import { DynamicCmp } from "../cmps/DynamicCmp"

export function AdminPage() {
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedinUser())
    const [type, setType] = useState('Users')
    const [coupons, setCoupons] = useState([])
    const navigate = useNavigate()
   
    if(!loggedInUser || !loggedInUser.isAdmin) {
        navigate('/login')
    }

    useEffect(() => {
        fetchCoupons()
    }, [])

    async function fetchCoupons() {
        try {
            const couponsData = await couponService.getCoupons()
            
            setCoupons(couponsData)
        } catch (err) {
            console.log('couldnt fetch users', err)
        }
    }
    

    return (
        <div className="admin-con"> 
            <AdminHeader loggedInUser={loggedInUser}/>
            <section className="admin-con-content">
                <AdminMenu setType={setType} type={type} setLoggedInUser={setLoggedInUser}/>
                <DynamicCmp type={type} coupons={coupons} setCoupons={setCoupons}/>
            </section>
        </div>
    )

}