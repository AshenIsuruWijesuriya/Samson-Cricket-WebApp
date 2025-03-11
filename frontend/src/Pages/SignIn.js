import React, { useState } from 'react';
import './SignIn.css'; // Import the CSS file
import SignHeader from '../Components/SignHeader/signHeader'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign-in logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleForgotPassword = () => {
        // Handle forgot password logic here
        console.log('Forgot Password clicked');
    };

    return (
        <div>
        <SignHeader />
        <div className="sign-in-container">
            
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="sign-in-form">
                <div className="input-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <button type="submit" className="button">Login</button>
            </form>
            <div className="forgot-password">
                <button onClick={handleForgotPassword} className="link">
                    Forgot Password?
                </button>
            </div>
        </div>
        </div>
    );
};

export default SignIn;