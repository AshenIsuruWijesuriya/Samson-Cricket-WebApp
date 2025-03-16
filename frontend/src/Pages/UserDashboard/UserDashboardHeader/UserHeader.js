import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo1 from '../../../assets/images/logo1.png';
import './UserHeader.css';
import Swal from 'sweetalert2';

const AdminHeader = () => {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUserName(payload.firstname || "User"); // Access firstname from payload
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
    }


    return (
        <header className="header">
            <div className="header-left">
                <a href="/" className="header-content">
                    <img src={logo1} alt="Samson Cricket Logo" />
                    <h1 className="titlename">SAMSON CRICKET</h1>
                </a>
            </div>
            <a href="/userdashboard">
                <div className="userdashboard-title">User Dashboard</div>
            </a>
            <div className="user-username">
                <h1 className="userdashboard-username">Welcome, {userName}</h1>
            </div>
            <div className="header-right">
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        </header>
    );
}

export default AdminHeader;