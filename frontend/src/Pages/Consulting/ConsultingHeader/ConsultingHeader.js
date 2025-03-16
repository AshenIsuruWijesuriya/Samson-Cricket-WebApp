import React from "react";
import { useNavigate } from 'react-router-dom';
import logo1 from '../../../assets/images/logo1.png'; 
import './ConsultingHeader.css'; 

const ConsultingHeader = () => {

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
            <a href="/consultantdashboard">
                <div className="consultantdashboard-title">Consultant Dashboard</div>
            </a>
            <div className="consultantdashboard-username">
                <h1 className="consultantdashboard-username">Welcome</h1>
            </div>
            <div className="header-right">
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        </header>
    );
}

export default ConsultingHeader;