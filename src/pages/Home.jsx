import { useEffect } from "react"
import { Link } from "react-router-dom"
import { userService } from "../services/user.service"


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
            <Link to="/admin">Go to Admin Page</Link>
        </div>
    )
}