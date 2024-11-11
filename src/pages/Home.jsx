import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { userService } from "../services/user.service"
import { OrderPanel } from "../cmps/OrderPanel"

export function Home() {
    const [user, setUser] = useState(userService.getLoggedinUser())
    useEffect(() => {
        init()
    }, [user])  

    async function init() {
        try {
            await userService.loadDemoUsers()
        } catch (err) {
            console.log('Cant load app', err)
        }
    }

   

    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Welcome to Our Store</h1>
                {user && user.isAdmin ? (
                    <Link to="/admin" className="admin-link">
                    Go to Admin Page
                    </Link>
                ) : user ? (
                    <button className="admin-link" onClick={async () => {
                        await userService.logout()
                        setUser(null)
                    }
                    }>
                    Logout
                    </button>
                ) : (
                    <Link to="/login" className="admin-link">
                    Login
                    </Link>
                )}
            </div>
            <OrderPanel />
        </div>
    )
}