import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import './Login.css';

function Login() {

    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) return handleError('Email and password are required');
        try {
            const response = await fetch("https://kissanapp.onrender.com/auth/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, role, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('userRole', role);
                window.location.reload();
                setTimeout(() => navigate('/home'), 1000);
            } else if (error) {
                handleError(error?.details[0].message);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className="auth-page">

            {/* ── Left branding panel ── */}
            <div className="auth-brand-panel">
                <div className="auth-brand-inner">
                    <div className="auth-logo">🌾 KissanApp</div>
                    <h2 className="auth-brand-title">Welcome Back!</h2>
                    <p className="auth-brand-sub">
                        Your complete farming companion — manage crops, land, machinery &amp; more from one place.
                    </p>
                    <ul className="auth-features">
                        <li>🌱 Crop &amp; Soil Management</li>
                        <li>🏡 Land &amp; Warehouse Rental</li>
                        <li>🌦️ Real-time Weather Alerts</li>
                        <li>💡 Personal Agri Advisory</li>
                        <li>🚜 Machinery &amp; Transport</li>
                    </ul>
                </div>
            </div>

            {/* ── Right form panel ── */}
            <div className="auth-form-panel">
                <div className="auth-form-card">
                    <div className="auth-form-header">
                        <h1 className="auth-form-title">Sign In</h1>
                        <p className="auth-form-sub">Enter your credentials to continue</p>
                    </div>
                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="auth-field">
                            <label>Email Address</label>
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder='you@example.com'
                                value={loginInfo.email}
                            />
                        </div>
                        <div className="auth-field">
                            <label>Password</label>
                            <input
                                onChange={handleChange}
                                type='password'
                                name='password'
                                placeholder='Enter your password'
                                value={loginInfo.password}
                            />
                        </div>
                        <button type='submit' className="auth-submit-btn">Sign In →</button>
                        <p className="auth-switch">
                            Don't have an account? <Link to="/signup">Create one</Link>
                        </p>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Login

