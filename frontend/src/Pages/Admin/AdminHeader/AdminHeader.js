import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo1 from '../../../assets/images/logo1.png';
import './AdminHeader.css';

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
            navigate('/signIn');
        };


    return (
        <header className="header">
            <div className="header-left">
                <a href="/" className="header-content">
                    <img src={logo1} alt="Samson Cricket Logo" />
                    <h1 className="titlename">SAMSON CRICKET</h1>
                </a>
            </div>
            <a href="/admindashboard">
                <div className="admindashboard-title">Admin Dashboard</div>
            </a>
            <div className="admin-username">
                <h1 className="admindashboard-username">Welcome, {userName}</h1>
            </div>
            <div className="header-right">
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        </header>
    );
}

export default AdminHeader;