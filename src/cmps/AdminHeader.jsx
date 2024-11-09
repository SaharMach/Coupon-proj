import { ProfileMenu } from "./ProfileMenu"

export function AdminHeader({loggedInUser}) {

    return (
        <section className="admin-header">
            <h3>Panel</h3>
            <ProfileMenu loggedInUser={loggedInUser}/>            
        </section>
    )
}