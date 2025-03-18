import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo1 from '../../../../assets/images/logo1.png';
import './CoachingHeader.css';
import Swal from 'sweetalert2'; 

const CoachingHeader = () => {
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
        <header className="ch-main-header">
            <div className="ch-brand-container">
                <a href="/" className="ch-brand-link">
                    <img src={logo1} alt="Samson Cricket Logo" className="ch-brand-logo" />
                    <h1 className="ch-brand-title">SAMSON CRICKET</h1>
                </a>
            </div>
            <a href="/admindashboard" className="ch-dashboard-link">
                <div className="ch-dashboard-title">Coaching Dashboard</div>
            </a>
            
            <div className="ch-user-profile">
                <h1 className="ch-user-display-name">{userName}</h1>
                <button onClick={handleLogout} className="ch-logout-button">Logout</button>
            </div>
        </header>
    );
}

export default CoachingHeader;