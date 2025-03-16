import React from "react";
import logo1 from '../../../assets/images/logo1.png'; 
import './AdminHeader.css'; 
import LogoutButton from "../../../services/LogoutService";

const AdminHeader = () => {
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
                <h1 className="admindashboard-username">Welcome</h1>
            </div>
            <div className="header-right">
                <p>Logout<LogoutButton/></p>
            </div>
        </header>
    );
}

export default AdminHeader;