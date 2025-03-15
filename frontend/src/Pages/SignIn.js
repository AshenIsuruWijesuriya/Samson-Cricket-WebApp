import React, { useState } from 'react';
import './SignIn.css';
import MainHeader from '../Common/mainHeader'; 
import axios from 'axios'; // Make sure to install axios
import Swal from 'sweetalert2'; // Import SweetAlert2

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const api = process.env.REACT_APP_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(api + '/api/users/login', { email, password });
            const { token, user } = response.data;

            // Store token in local storage or state management
            localStorage.setItem('token', token);

            // Show success alert
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome back, ' + user.firstname + '!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Redirect based on user role
                if (user.role === 'Admin') {
                    window.location.href = '/admindashboard'; 
                } else {
                    window.location.href = '/userdashboard'; 
                }
            });
        } catch (err) {
            // Show error alert
            Swal.fire({
                title: 'Login Failed',
                text: err.response.data.message || 'An error occurred. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
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
                        <a href='/forgot-password'>Forgot Password?</a>
                    </div>
                    <button type="submit" className="button">Sign In</button>
                    <div className="signUp">
                        <p>Don't have an Account?</p>
                        <a href='/signUp'>Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;