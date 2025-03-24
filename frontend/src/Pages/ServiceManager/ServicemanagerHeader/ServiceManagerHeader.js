import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo1 from '../../../assets/images/logo1.png';
import './ServiceManagerHeader.css'; 
import Swal from 'sweetalert2';

const ServiceManagerHeader = () => {
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
        <header className="sm-header"> 
            <div className="sm-header-brand-area">
                <a href="/" className="sm-header-brand-link">
                    <img src={logo1} alt="Samson Cricket Logo" className="sm-header-brand-logo" />
                    <h1 className="sm-header-brand-title">SAMSON CRICKET</h1>
                </a>
            </div>
            <a href="/servicedashboard" className="sm-header-dashboard-link">
                <div className="sm-header-dashboard-title">Service Manager Dashboard</div>
            </a>
            
            <div className="sm-header-user-actions">
                <h1 className="sm-header-user-name">{userName}</h1>
                <button onClick={handleLogout} className="sm-header-logout-btn">Logout</button>
            </div>
        </header>
    );
};

export default ServiceManagerHeader;