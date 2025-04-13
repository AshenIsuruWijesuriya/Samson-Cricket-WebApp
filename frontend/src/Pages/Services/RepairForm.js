import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import "./RepairForm.css";
import { jwtDecode } from 'jwt-decode';

const api = process.env.REACT_APP_BASE_URL;

const RepairForm = ({ closeForm, onRepairRequestAdded }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        repairType: "",
        details: "",
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                                    window.location.href = '/signin';
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
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            name: `${data.firstname || ''} ${data.lastname || ''}`,
                            email: data.email || '',
                        }));
                    })
                    .catch((error) => {
                        console.error('Error fetching user data:', error);
                        if (error !== 'Session expired') {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Failed to retrieve user information.',
                            }).then(() => {
                                window.location.href = '/signin';
                            });
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
                    window.location.href = '/signin';
                });
            }
        } else {
            window.location.href = '/signin';
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.phoneNumber || !formData.repairType || !formData.details) {
            Swal.fire({ title: 'Error!', text: 'All fields are required.', icon: 'error', confirmButtonText: 'OK' });
            return;
        }

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const userId = decoded.id;

            const requestData = {
                ...formData,
                userId: userId,
                firstName: formData.name.split(' ')[0],
                lastName: formData.name.split(' ')[1] || '',
            };

            const response = await axios.post(`${api}/api/services/create-repair`, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Repair request submitted:', response.data);
            Swal.fire({ title: 'Success!', text: 'Repair request successfully submitted!', icon: 'success', confirmButtonText: 'OK' });
            if (onRepairRequestAdded) {
                onRepairRequestAdded(response.data);
            }
            closeForm();
        } catch (error) {
            console.error('Error submitting repair request:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to submit repair request.',
            });

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="repair-form-overlay">
            <div className="repair-form">
                <h2>Request a Bat Repair</h2>
                {error && <div className="repair-form-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />

                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                    />

                    <label>Repair Type:</label>
                    <select
                        name="repairType"
                        value={formData.repairType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Repair Type</option>
                        <option>Handle Replacement</option>
                        <option>Crack Sealing</option>
                        <option>Weight Adjustment</option>
                        <option>General Clean-Up</option>
                        <option>Grip & Sticker Replacement</option>
                    </select>

                    <label>Additional Details:</label>
                    <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        placeholder="Describe the issue in detail"
                        required
                    ></textarea>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                </form>

                <button className="close-btn" onClick={closeForm}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default RepairForm;