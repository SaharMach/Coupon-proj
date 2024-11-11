import { userService } from "../../services/user.service"

export function AdminMenu({ setType, type, setLoggedInUser }) {
    
    const menuItems = ['Users', 'Coupons', 'Reports']

    function onLogout() {
        userService.logout()
        setLoggedInUser(null)
    }
    return (
        <nav className="admin-menu">
            <ul>
                {menuItems.map((item) => (
                    <li 
                        key={item}
                        onClick={() => setType(item)}
                        className={type === item ? 'active' : ''}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            <span className="admin-menu-signout" onClick={onLogout}>Sign out
                <span className="material-symbols-outlined">
                    logout
                </span>
            </span>
        </nav>
    )
}