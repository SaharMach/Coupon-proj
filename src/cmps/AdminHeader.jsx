import { ProfileMenu } from "./ProfileMenu"
import { Link } from "react-router-dom"
export function AdminHeader({loggedInUser}) {

    return (
        <section className="admin-header">
            <h3><Link to={"/"}>Panel</Link></h3>
            <ProfileMenu loggedInUser={loggedInUser}/>            
        </section>
    )
}