import React, { useState } from 'react';
import './SignIn.css';
import MainHeader from '../Common/mainHeader';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const api = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(api + '/api/users/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);

            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome back, ' + user.firstname + '!',
                icon: 'success',
                showConfirmButton: false, // Remove the OK button
                timer: 1500, // Close after 1.5 seconds
            }).then(() => {
                // Navigate directly after the timer
                if (user.role === 'Admin') {
                    navigate('/admindashboard');
                } else if (user.role === 'Consultant') {
                    navigate('/consultantdashboard');
                } else if (user.role === 'ServiceManager') {
                    navigate('/servicedashboard');
                } else {
                    navigate('/userdashboard');
                }
            });
        } catch (err) {
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
            <MainHeader />
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
                            className="signIn-input"
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
                            className="signIn-input"
                        />
                    </div>
                    <div className="forgot-password">
                        <a href='/forgot-password'>Forgot Password?</a>
                    </div>
                    <button type="submit" className="signIn-button">Sign In</button>
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