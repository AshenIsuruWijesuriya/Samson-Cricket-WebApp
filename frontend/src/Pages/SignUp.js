import React, { useState } from 'react';
import axios from 'axios';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state
        try {
            // formData.role = "Admin";
            const response = await axios.post( api +'/api/users/register', formData);
            console.log('User  registered:', response.data);
            // Handle successful registration (e.g., redirect or show message)
        } catch (error) {
            console.error('Error registering user:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
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
                                    required 
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
                                    required 
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
                                required 
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
                                required 
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