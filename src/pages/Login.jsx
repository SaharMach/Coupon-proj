import { useState } from 'react'
import { useNavigate } from 'react-router'

import { userService } from '../services/user.service'

import toast from 'react-hot-toast'

export function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    function clearState() {
        setCredentials({ username: '', password: '' })
    }

    function handleChange(e) {
        const field = e.target.name
        const value = e.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    //Handle the form submission and attempt to log the user in
    async function onConnect(event) {
        event.preventDefault()
        try {
            if (!credentials.username || !credentials.password) return
            const user = await userService.login(credentials)
            if (user.isAdmin) {
                navigate('/admin')
                clearState()
            } else {
                navigate('/')
                clearState()
            }
            toast.success("You are in!")
        } catch (err) {
            console.log('Could not set user', err)
            toast.error("Username or password invalid")
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
            
        </div>
    )
}
