import { useState } from "react";

export function UserForm({ onCreateUser }) {
    const [newUser, setNewUser] = useState({ username: "", password: "" });

    function handleInputChange(e) {
        const { name, value } = e.target
        setNewUser(prevState => ({...prevState, [name]: value}))
    }

    return (
        <form onSubmit={(e) => onCreateUser(e, newUser)}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button type="submit">Create User</button>
        </form>
    );
}