// Pages/Checkout/OtpVerification.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import './OtpVerification.css';

const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const paymentData = location.state?.paymentData;
    const api = process.env.REACT_APP_BASE_URL;

    if (!paymentData) {
        navigate('/checkout'); // Redirect if payment data is missing
        return null;
    }

    const handleVerifyOtp = async () => {
        try {
            const response = await fetch(`${api}/api/payments/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ ...paymentData, otp }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'OTP Verification Failed',
                    text: errorData.message || 'Invalid OTP.',
                });
                return;
            }

            Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                text: 'Your payment has been processed.',
            }).then(() => {
                navigate('/payment-success');
            });
        } catch (error) {
            console.error('Error verifying OTP:', error);
            Swal.fire({
                icon: 'error',
                title: 'Verification Error',
                text: 'An unexpected error occurred.',
            });
        }
    };

    return (
        <div className="otp-verification-container">
            <h2>Enter OTP</h2>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="otp-input"
            />
            <button onClick={handleVerifyOtp} className="verify-button">Verify OTP</button>
        </div>
    );
};

export default OtpVerification;