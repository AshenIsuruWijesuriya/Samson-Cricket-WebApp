import React from "react";
import Logo from '../../../assets/images/logo1.png'; 
import './AdminHeader.css'; 

const AdminHeader = () => {
    return (
        <header>
            <a href="/" className="adminheader-content">
                <img src={Logo} alt="Samson Cricket Logo" /> 
                <h1>SAMSON CRICKET</h1>
            </a>
            <div className="welcome-text2"><a href="/admindashboard">Admin Dashboard</a></div>
            <div className="welcome-text">Welcome!</div>
            <div className="adminheader-actions">
                <a href="/logout" className="logout">Logout</a>
            </div>
        </header>
    );
}

export default AdminHeader;