import { useEffect, useState } from "react"

import { userService } from "../../services/user.service"

import { Chart } from "chart.js"
import { Bar } from "react-chartjs-2"

export function ReportInfo({coupons}) {

    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        usersCount()
    }, [])
    
    // Finding the most used coupon
    function mostUsedCoupon() {
        if(!coupons.length) return 
        let mostUsed = coupons[0]
        for(let i = 1; i < coupons.length; i++) {
            if(mostUsed.usedCount < coupons[i].usedCount){
                mostUsed = coupons[i]
            }
        }
        
        return mostUsed
    }

    // Finding the most unused coupon
    function mostUnusedCoupon() {
        if(!coupons.length) return 
        let mostUnused = coupons[0]
        for(let i = 1; i < coupons.length; i++) {
            if(mostUnused.usedCount > coupons[i].usedCount){
                mostUnused = coupons[i]
            }
        }
        return mostUnused
    }

    // Sets user count
    async function usersCount() {
        try {
            let users = await userService.getUsers()
            setUserCount(users.length)            
        } catch(err) {
            console.log("Can't count users")
            throw err
        }
    }
    const mostUsed = mostUsedCoupon()
    const mostUnused = mostUnusedCoupon()
    return (
        <div className="report-info">
            <section className="trending-up">
                <span>Most used coupon: {mostUsed?.code}</span>
                <span className="material-symbols-outlined">
                    trending_up
                </span>
            </section>
             <section className="trending-down">
                <span>Most unused coupon: {mostUnused?.code}</span>
                <span className="material-symbols-outlined">
                    trending_down
                </span>
             </section>
             <section className="users-amount">
                <span>Number of users: {userCount}</span>
                <span className="material-symbols-outlined">
                    group
                </span>  
             </section>
             <section className="coupons-amount">
                <span>Number of coupons: {coupons?.length}</span>
                <span className="material-symbols-outlined">
                    redeem
                </span>
             </section>
        </div>
   )
}