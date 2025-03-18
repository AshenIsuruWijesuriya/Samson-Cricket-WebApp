import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo1 from '../../../assets/images/logo1.png';
import './AdminHeader.css';
import Swal from 'sweetalert2'; 

const AdminHeader = () => {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUserName(payload.firstname || "User"); 
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        Swal.fire({
            title: 'Logout Successful!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500, // Close after 1.5 seconds
        }).then(() => {
            navigate('/');
        });
    };

    return (
        <header className="admin-header-container">
            <div className="admin-header-left-section">
                <a href="/" className="admin-header-logo-link">
                    <img src={logo1} alt="Samson Cricket Logo" className="admin-header-logo-image" />
                    <h1 className="admin-header-title-text">SAMSON CRICKET</h1>
                </a>
            </div>
            <a href="/admindashboard" className="admin-dashboard-link">
                <div className="admin-dashboard-title-text">Admin Dashboard</div>
            </a>
            
            <div className="admin-header-right-section">
                <h1 className="admin-username-display">{userName}</h1>
                <button onClick={handleLogout} className="admin-logout-button">Logout</button>
            </div>
        </header>
    );
}

export default AdminHeader;