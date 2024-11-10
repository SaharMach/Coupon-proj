import { useEffect } from "react"
import { Link } from "react-router-dom"
import { userService } from "../services/user.service"
import { OrderPanel } from "../cmps/OrderPanel"

export function Home() {
    useEffect(() => {
        init()
    }, [])  

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
                <Link to="/admin" className="admin-link">Go to Admin Page</Link>
            </div>
            <OrderPanel />
        </div>
    )
}