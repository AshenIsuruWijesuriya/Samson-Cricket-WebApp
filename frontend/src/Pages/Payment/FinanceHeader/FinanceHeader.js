import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo1 from '../../../assets/images/logo1.png';
import './FinanceHeader.css';
import Swal from 'sweetalert2'; 

const FinanceHeader = () => {
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
        <header className="fin-header-main-container">
            <div className="fin-header-brand-area">
                <a href="/" className="fin-header-brand-link">
                    <img src={logo1} alt="Samson Cricket Logo" className="fin-header-brand-logo" />
                    <h1 className="fin-header-brand-title">SAMSON CRICKET</h1>
                </a>
            </div>
            <a href="/admindashboard" className="fin-header-dashboard-link">
                <div className="fin-header-dashboard-title">Finance Dashboard</div>
            </a>
            
            <div className="fin-header-user-actions">
                <h1 className="fin-header-user-name">{userName}</h1>
                <button onClick={handleLogout} className="fin-header-logout-btn">Logout</button>
            </div>
        </header>
    );
}

export default FinanceHeader;