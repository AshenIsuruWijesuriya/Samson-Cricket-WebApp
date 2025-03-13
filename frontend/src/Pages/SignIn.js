import React, { useState } from 'react';
import './SignIn.css';
import MainHeader from '../Common/mainHeader'; 

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign-in logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div>
            <div className="sign-in-bg"></div>
            <MainHeader/>
        <div className="sign-in-container">
            
            <h2>Sign In to your Samson Cricket Account</h2>
            <form onSubmit={handleSubmit} className="sign-in-form">
                <div className="input-group">
                    <label htmlFor="email"></label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email Address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="forgot-password">
                <a href='/forgot-password'>Fogot Password?</a>
                </div>
                <button type="submit" className="button">Sign In</button>
                <div className="signUp">
                <p>Dont have an Account?</p>
                <a href='/signUp'>Sign Up</a>
                </div>
            </form>
        </div>
        </div>
    );
};

export default SignIn;