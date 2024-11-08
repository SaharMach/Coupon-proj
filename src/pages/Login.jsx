import { useState } from 'react'
import { useNavigate } from 'react-router'
import { userService } from '../services/user.service' 

export function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    function clearState() {
        setCredentials({ username: '', password: '' })
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onConnect(event) {
        event.preventDefault()
        try {
            if (!credentials.username || !credentials.password) return
            const user = await userService.login(credentials)
            if (user) {
                navigate('/admin')
                clearState()
            }
        } catch (err) {
            console.log('Could not set user', err)
        }
    }

    return (
        <div className="login-page-container">
            <div className='login-page'>
                <div className='login-page-titles'>
                    <p className='welcome-title'>Log in to continue</p>
                </div>
                <form className="login-page-form" onSubmit={onConnect}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                    />
                    <button className='sign-btn'>Login</button>
                </form>
            </div>
            <footer className='login-footer'>
            </footer>
        </div>
    )
}
