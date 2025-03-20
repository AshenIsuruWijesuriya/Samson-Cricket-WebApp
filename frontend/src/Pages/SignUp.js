import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './SignUp.css';
import MainHeader from '../Common/mainHeader';
import MainFooter from "../Common/mainFooter";
import { useNavigate } from 'react-router-dom';

const api = process.env.REACT_APP_BASE_URL;

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    // const [emailToVerify, setEmailToVerify] = useState(''); // Removed unused variable
    const navigate = useNavigate();

    const { firstname, lastname, email, password } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!firstname || !lastname || !email || !password) {
            Swal.fire({
                title: 'Error!',
                text: 'All fields are required.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        if (!validateEmail(email)) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid email address.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        if (password.length < 8) {
            Swal.fire({
                title: 'Error!',
                text: 'Password must be at least 8 characters long.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        // Store the email to be verified
        // setEmailToVerify(email);  // Removed setting of unused variable
        // Generate and send OTP
        try {
            const response = await axios.post(`${api}/api/auth/generate-otp`, { email });
            setGeneratedOtp(response.data.otp);
            setOtpModalOpen(true); // Open the OTP modal
        } catch (err) {
            console.error('Error generating OTP:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
            Swal.fire({
                title: 'Error!',
                text: err.response?.data?.message || 'Failed to send OTP. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleVerifyOtp = async () => {
        if (otp === generatedOtp) {
            setOtpModalOpen(false); // Close the modal
            // Proceed with registration
            try {
                const response = await axios.post(api + '/api/users/register', formData);
                console.log('User registered:', response.data);
                Swal.fire({
                    title: 'Success!',
                    text: 'You have successfully registered!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/signin');
                });
            } catch (error) {
                console.error('Error registering user:', error.response?.data || error.message);
                setError(error.response?.data?.message || 'An error occurred. Please try again.');
                Swal.fire({
                    title: 'Error!',
                    text: error.response?.data?.message || 'An error occurred. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Incorrect OTP. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            setOtp(''); // Clear the OTP input
        }
    };

    return (
        <div>
            <div className="signup-page-bg-container">
                <div className="signup-page-bg"></div>
                <MainHeader />
                <div className="signup-page-wrapper">
                    <h2 className="signup-page-title">Create an Account for Samson Cricket</h2>
                    {error && <div className="signup-page-error-message">{error}</div>}
                    <form className="signup-page-form" onSubmit={handleSubmit}>
                        <div className='signup-page-names-align'>
                            <div className="signup-page-input-group">
                                <input
                                    type="text"
                                    name="firstname"
                                    value={firstname}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="signup-page-input-field-first"
                                />
                            </div>
                            <div className="signup-page-input-group">
                                <input
                                    type="text"
                                    name="lastname"
                                    value={lastname}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="signup-page-input-field-last"
                                />
                            </div>
                        </div>
                        <div className="signup-page-input-group">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="signup-page-input-field"
                            />
                        </div>
                        <div className="signup-page-input-group">
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="signup-page-input-field"
                            />
                        </div>
                        <button type="submit" className="signup-page-button">Sign Up</button>
                        <div className="signup-page-signin-links">
                            <p className="signup-page-signin-text">Already have an Account?</p>
                            <a href='/signIn' className="signup-page-signin-link">Sign In</a>
                        </div>
                    </form>
                </div>
            </div>
            {otpModalOpen && (
                <div className="otp-modal">
                    <div className="otp-modal-content">
                        <h2>Verify OTP</h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button onClick={handleVerifyOtp}>Verify</button>
                    </div>
                </div>
            )}
            <MainFooter/>
        </div>
    );
};

export default SignUpPage;
