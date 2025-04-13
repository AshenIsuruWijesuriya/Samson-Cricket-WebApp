import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import Swal from 'sweetalert2';

const api = process.env.REACT_APP_BASE_URL;

const EditProfile = () => {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!userId || !token) {
                    throw new Error('User ID or token not found');
                }

                const response = await fetch(api + `/api/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const message = await response.text();
                    throw new Error(`Could not fetch user profile: ${message}`);
                }

                const data = await response.json();
                setProfileData({
                    firstName: data.firstname || '',
                    lastName: data.lastname || '',
                    email: data.email || '',
                    password: '',
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId, token]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (!userId || !token) {
                throw new Error('User ID or token not found');
            }

            const updateData = {
                firstname: profileData.firstName,
                lastname: profileData.lastName,
            };

            if (profileData.password) {
                updateData.password = profileData.password;
            }

            const response = await fetch(api + `/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error(`Could not update profile: ${message}`);
            }

            const data = await response.json();
            console.log('Profile updated:', data);

            Swal.fire({
                title: 'Profile Updated!',
                text: 'Your profile has been updated successfully.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (err) {
            setError(err.message);
            Swal.fire({
                title: 'Update Failed',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="ep-container">
            <form onSubmit={handleProfileSubmit} className="ep-form">
                <h2 className="ep-title">Edit Profile</h2>
                <div className="ep-form-group">
                    <label htmlFor="ep-firstName" className="ep-label">First Name</label>
                    <input
                        type="text"
                        id="ep-firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        className="ep-input"
                    />
                </div>
                <div className="ep-form-group">
                    <label htmlFor="ep-lastName" className="ep-label">Last Name</label>
                    <input
                        type="text"
                        id="ep-lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        className="ep-input"
                    />
                </div>
                <div className="ep-form-group">
                    <label htmlFor="ep-email" className="ep-label">Email</label>
                    <input
                        type="email"
                        id="ep-email"
                        name="email"
                        value={profileData.email}
                        className="ep-input"
                        disabled // Disabled email input
                    />
                </div>
                <div className="ep-form-group">
                    <label htmlFor="ep-password" className="ep-label">Password</label>
                    <input
                        type="password"
                        id="ep-password"
                        name="password"
                        placeholder="Keep empty for no password change"
                        value={profileData.password}
                        onChange={handleProfileChange}
                        className="ep-input"
                    />
                </div>
                <button type="submit" className="ep-save-button">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;