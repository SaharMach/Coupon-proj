export function AdminMenu({ setType }) {
    return (
        <nav className="admin-menu">
            <ul>
                <li onClick={() => setType('Users')}>Users</li>
                <li onClick={() => setType('Coupons')}>Coupons</li>
                <li onClick={() => setType('Reports')}>Reports</li>
            </ul>
        </nav>
    )
}