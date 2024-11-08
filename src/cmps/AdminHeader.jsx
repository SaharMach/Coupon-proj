import { ProfileMenu } from "./ProfileMenu"

export function AdminHeader() {

    return (
        <section className="admin-header">
            <span>Dashboard</span>
            <ProfileMenu />            
        </section>
    )
}