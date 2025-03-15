import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './SignUp.css'; 
import MainHeader from '../Common/mainHeader';

const api = process.env.REACT_APP_BASE_URL;

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const { firstname, lastname, email, password } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state

        // Validation checks
        if (!firstname || !lastname || !email || !password) {
            Swal.fire({
                title: 'Error!',
                text: 'All fields are required.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (!validateEmail(email)) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid email address.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (password.length < 8) {
            Swal.fire({
                title: 'Error!',
                text: 'Password must be at least 8 characters long.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const response = await axios.post(api + '/api/users/register', formData);
            console.log('User  registered:', response.data);
            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'You have successfully registered!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            // Optionally, redirect or reset form here
        } catch (error) {
            console.error('Error registering user:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'An error occurred. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div>
            <div className="signup-bg">
                <MainHeader />
                <div className="signup-wrapper">
                    <h2>Create an Account for Samson Cricket</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className='names-align'>
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    name="firstname" 
                                    value={firstname} 
                                    onChange={handleChange} 
                                    placeholder="First Name" 
                                    className="input-field-first"
                                />
                            </div>
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    name="lastname" 
                                    value={lastname} 
                                    onChange={handleChange} 
                                    placeholder="Last Name" 
                                    className="input-field-last"
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <input 
                                type="email" 
                                name="email" 
                                value={email} 
                                onChange={handleChange} 
                                placeholder="Email" 
                                className="input-field"
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="password" 
                                name="password" 
                                value={password} 
                                onChange={handleChange} 
                                placeholder="Password" 
                                className="input-field"
                            />
                        </div>
                        <button type="submit" className="signup-button">Sign Up</button>
                        <div className="signIn-links">
                            <p>Already have an Account?</p>
                            <a href='/signIn'>Sign In</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;