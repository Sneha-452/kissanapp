import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import './Login.css';

const ROLES = [
  { value: 'farmer',   label: '👨‍🌾 Farmer',   desc: 'Grow crops, soil & water tools' },
  { value: 'provider', label: '🏡 Provider',  desc: 'Rent land, machinery, warehouse' },
  { value: 'buyer',    label: '🛒 Buyer',     desc: 'Buy crops & hire transport' },
];

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '', email: '', password: '', role: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, role } = signupInfo;
        if (!name || !email || !password) return handleError('Name, email and password are required');
        if (!role) return handleError('Please select your role');
        try {
            const response = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate('/login'), 1000);
            } else if (error) {
                handleError(error?.details[0].message);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError('Something went wrong');
        }
    }

    return (
        <div className="auth-page">

            {/* ── Left branding panel ── */}
            <div className="auth-brand-panel">
                <div className="auth-brand-inner">
                    <div className="auth-logo">🌾 KissanApp</div>
                    <h2 className="auth-brand-title">Join KissanApp!</h2>
                    <p className="auth-brand-sub">
                        Connect with farmers, providers &amp; buyers across India. One platform for all your agri needs.
                    </p>
                    <ul className="auth-features">
                        <li>👨‍🌾 Farmers — manage crops &amp; get advisory</li>
                        <li>🏡 Providers — list land, machinery &amp; storage</li>
                        <li>🛒 Buyers — source crops &amp; hire transport</li>
                        <li>🌦️ Real-time weather &amp; soil tools</li>
                        <li>🔒 Secure &amp; easy to use</li>
                    </ul>
                </div>
            </div>

            {/* ── Right form panel ── */}
            <div className="auth-form-panel">
                <div className="auth-form-card">
                    <div className="auth-form-header">
                        <h1 className="auth-form-title">Create Account</h1>
                        <p className="auth-form-sub">Pick your role, then fill in your details</p>
                    </div>
                    <form onSubmit={handleSignup} className="auth-form">

                        {/* Role Selector */}
                        <div className="auth-field role-selector-section">
                            <label className="role-selector-label">I am a…</label>
                            <div className="role-cards">
                                {ROLES.map(r => (
                                    <div
                                        key={r.value}
                                        className={`role-card ${signupInfo.role === r.value ? 'role-card--active' : ''}`}
                                        onClick={() => setSignupInfo(prev => ({ ...prev, role: r.value }))}
                                    >
                                        <span className="role-card-title">{r.label}</span>
                                        <span className="role-card-desc">{r.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="auth-field">
                            <label>Full Name</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='name'
                                autoFocus
                                placeholder='Enter your name'
                                value={signupInfo.name}
                            />
                        </div>
                        <div className="auth-field">
                            <label>Email Address</label>
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder='you@example.com'
                                value={signupInfo.email}
                            />
                        </div>
                        <div className="auth-field">
                            <label>Password</label>
                            <input
                                onChange={handleChange}
                                type='password'
                                name='password'
                                placeholder='Create a password'
                                value={signupInfo.password}
                            />
                        </div>
                        <button type='submit' className="auth-submit-btn">Create Account →</button>
                        <p className="auth-switch">
                            Already have an account? <Link to="/login">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Signup

