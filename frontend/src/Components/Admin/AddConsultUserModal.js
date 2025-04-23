// AddConsultUserModal.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddAdminUserModal.css';

const api = process.env.REACT_APP_BASE_URL;

const AddConsultUserModal = ({ onClose, onUserAdded }) => {
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
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!firstname || !lastname || !email || !password) {
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
                role: 'Consultant',
            });
            console.log('Consultant user registered:', response.data);
            Swal.fire({ title: 'Success!', text: 'Consultant user successfully added!', icon: 'success', confirmButtonText: 'OK' });
            onUserAdded();
            onClose();
        } catch (error) {
            console.error('Error registering consultant user:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
            Swal.fire({ title: 'Error!', text: error.response?.data?.message || 'An error occurred. Please try again.', icon: 'error', confirmButtonText: 'OK' });
        }
    };

    return (
        <div className="admin-user-modal-overlay">
            <div className="admin-user-modal-content">
                <h2 className="admin-user-modal-title">Add New Consultant User</h2>
                {error && <div className="admin-user-modal-error">{error}</div>}
                <form className="admin-user-modal-form" onSubmit={handleSubmit}>
                    <div className="admin-user-modal-names">
                        <div className="admin-user-modal-input-group">
                            <input
                                type="text"
                                name="firstname"
                                value={firstname}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="admin-user-modal-input admin-user-modal-input-first"
                            />
                        </div>
                        <div className="admin-user-modal-input-group">
                            <input
                                type="text"
                                name="lastname"
                                value={lastname}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="admin-user-modal-input admin-user-modal-input-last"
                            />
                        </div>
                    </div>
                    <div className="admin-user-modal-input-group">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="admin-user-modal-input admin-user-modal-input-email"
                        />
                    </div>
                    <div className="admin-user-modal-input-group">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="admin-user-modal-input admin-user-modal-input-password"
                        />
                    </div>
                    <div className="admin-user-modal-actions">
                        <button type="submit" className="admin-user-modal-button admin-user-modal-button-add">
                            Add Consultant User
                        </button>
                        <button type="button" className="admin-user-modal-button admin-user-modal-button-cancel" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddConsultUserModal;