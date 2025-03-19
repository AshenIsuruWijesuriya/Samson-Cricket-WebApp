import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo1 from '../../../assets/images/logo1.png';
import './UserHeader.css'; // Assuming you'll create UserHeader.css
import Swal from 'sweetalert2';

const UserHeader = () => {
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
            timer: 1500,
        }).then(() => {
            navigate('/');
        });
    };

    return (
        <header className="user-header-container">
            <div className="user-header-left-section">
                <a href="/" className="user-header-logo-link">
                    <img src={logo1} alt="Samson Cricket Logo" className="user-header-logo-image" />
                    <h1 className="user-header-title-text">SAMSON CRICKET</h1>
                </a>
            </div>
            <a href="/userdashboard" className="user-dashboard-link">
                <div className="user-dashboard-title-text">User Dashboard</div>
            </a>
            
            <div className="user-header-right-section">
                <h1 className="user-username-display">{userName}</h1>
                <button onClick={handleLogout} className="user-logout-button">Logout</button>
            </div>
        </header>
    );
}

export default UserHeader;