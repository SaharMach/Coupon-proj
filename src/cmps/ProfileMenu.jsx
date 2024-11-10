export function ProfileMenu({loggedInUser}) {
    const img = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
    return <div className="admin-header-menu">
        <img src={img} alt="" />
        <span>{loggedInUser?.username}</span>

    </div>
}