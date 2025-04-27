// AddServiceUserModal.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddServiceUserModal.css';

const api = process.env.REACT_APP_BASE_URL;

const AddServiceUserModal = ({ onClose, onUserAdded }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        serviceType: '', // Added serviceType field
    });
    const [error, setError] = useState('');

    const { firstname, lastname, email, password} = formData;

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

        if (!firstname || !lastname || !email || !password ) {
            Swal.fire({ title: 'Error!', text: 'All fields are required.', icon: 'error', confirmButtonText: 'OK' });
            return;
        }

        if (!validateEmail(email)) {
            Swal.fire({ title: 'Error!', text: 'Please enter a valid email address.', icon: 'error', confirmButtonText: 'OK' });
            return;
        }

        if (password.length < 8) {
            Swal.fire({ title: 'Error!', text: 'Password must be at least 8 characters long.', icon: 'error', confirmButtonText: 'OK' });
            return;
        }

        try {
            const response = await axios.post(`${api}/api/users/register`, {
                ...formData,
                role: 'ServiceManager', // Changed role to ServiceManager
            });
            console.log('Service user registered:', response.data);
            Swal.fire({ title: 'Success!', text: 'Service user successfully added!', icon: 'success', confirmButtonText: 'OK' });
            onUserAdded();
            onClose();
        } catch (error) {
            console.error('Error registering service user:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
            Swal.fire({ title: 'Error!', text: error.response?.data?.message || 'An error occurred. Please try again.', icon: 'error', confirmButtonText: 'OK' });
        }
    };

    return (
        <div className="service-user-modal-overlay">
            <div className="service-user-modal-content">
                <h2 className="service-user-modal-title">Add New Service User</h2>
                {error && <div className="service-user-modal-error">{error}</div>}
                <form className="service-user-modal-form" onSubmit={handleSubmit}>
                    <div className="service-user-modal-names">
                        <div className="service-user-modal-input-group">
                            <input
                                type="text"
                                name="firstname"
                                value={firstname}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="service-user-modal-input service-user-modal-input-first"
                            />
                        </div>
                        <div className="service-user-modal-input-group">
                            <input
                                type="text"
                                name="lastname"
                                value={lastname}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="service-user-modal-input service-user-modal-input-last"
                            />
                        </div>
                    </div>
                    <div className="service-user-modal-input-group">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="service-user-modal-input service-user-modal-input-email"
                        />
                    </div>
                    <div className="service-user-modal-input-group">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="service-user-modal-input service-user-modal-input-password"
                        />
                    </div>
                    <div className="service-user-modal-actions">
                        <button type="submit" className="service-user-modal-button service-user-modal-button-add">
                            Add Service User
                        </button>
                        <button type="button" className="service-user-modal-button service-user-modal-button-cancel" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddServiceUserModal;