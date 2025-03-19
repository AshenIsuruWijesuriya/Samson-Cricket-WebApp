// Pages/Checkout/PaymentForm.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentForm.css';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import MainHeader from '../../../Common/mainHeader';
import { CartContext } from '../../../context/CartContext';

const PaymentForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();
    const api = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.id;

                if (!userId) {
                    throw new Error('User ID not found in token');
                }

                fetch(`${api}/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            if (response.status === 401) {
                                localStorage.removeItem('token');
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Session Expired',
                                    text: 'Your session has expired. Please log in again.',
                                }).then(() => {
                                    navigate('/signin');
                                });
                                return Promise.reject('Session expired');
                            }
                            return response.json().then((errorData) => {
                                console.error('Error response:', errorData);
                                return Promise.reject(`HTTP error! status: ${response.status}`);
                            });
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setFirstName(data.firstname || '');
                        setLastName(data.lastname || '');
                        setEmail(data.email || '');
                    })
                    .catch((error) => {
                        console.error('Error fetching user data:', error);
                        if (error !== 'Session expired') {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Failed to retrieve user information.',
                            });
                            navigate('/signin');
                        }
                    });
            } catch (error) {
                console.error('Error decoding token or fetching user:', error);
                localStorage.removeItem('token');
                Swal.fire({
                    icon: 'error',
                    title: 'Authentication Error',
                    text: 'Your session is invalid. Please log in again.',
                }).then(() => {
                    navigate('/signin');
                });
            }
        } else {
            navigate('/signin');
        }
    }, [navigate, api]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const paymentData = {
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
            deliveryAddress: deliveryAddress,
            phoneNumber: phoneNumber,
        };

        Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            text: 'Your payment has been processed.',
        }).then(() => {
            navigate('/');
        });

        console.log("payment data:", paymentData);
    };

    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    return (
        <div>
            <MainHeader />
            <div className="payment-page-container">
                <div className="cart-preview">
                    <h3>Cart Items</h3>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item._id} className="cart-item">
                                <img
                                    src={`${api}/uploads/${item.images[0]}`}
                                    alt={`${item.brand} ${item.model}`}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    {item.brand} {item.model} - Quantity: {item.quantity} - Price: LKR {(item.price * item.quantity).toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total:</strong> LKR {calculateTotal()}</p>
                </div>
                <div className="payment-form-container">
                    <h2>Payment Details</h2>
                    <div className="information-section">
                        <h3>Personal Information</h3>
                        <p><strong>Name:</strong> {firstName} {lastName}</p>
                        <p><strong>Email:</strong> {email}</p>
                    </div>
                    <div className="delivery-section">
                        <h3>Delivery Address</h3>
                        <textarea
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="Enter your delivery address"
                            className="delivery-textarea"
                        />
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                            className="phone-input"
                        />
                    </div>
                    <div className="card-section">
                        <h3>Card Information</h3>
                        <form onSubmit={handleSubmit} className="payment-form">
                            <div className="form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input type="text" id="cardNumber" onChange={(e) => setCardNumber(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expiryDate">Expiry Date</label>
                                <input type="text" id="expiryDate" placeholder="MM/YY" onChange={(e) => setExpiryDate(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" id="cvv" onChange={(e) => setCvv(e.target.value)} required />
                            </div>
                            <div className="total-preview">
                                <strong>Total to Pay:</strong> LKR {calculateTotal()}
                            </div>
                            <button type="submit" className="payment-button">Pay Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;