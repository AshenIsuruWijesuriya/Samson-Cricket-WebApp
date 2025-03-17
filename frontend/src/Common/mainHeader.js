import React, { useEffect, useState } from "react";
import logo1 from '../assets/images/logo1.png';
import './mainHeader.css';
import { useNavigate } from 'react-router-dom';
import { FaRegUser, FaUserCog, FaUserTie, FaUserShield } from "react-icons/fa"; // Import different icons

const MainHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setIsLoggedIn(true);
                setUserRole(payload.role);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleUserNameClick = () => {
        if (userRole === 'Admin') {
            navigate('/admindashboard');
        } else if (userRole === 'ServiceManager') {
            navigate('/servicedashboard');
        } else if (userRole === 'Consultant') {
            navigate('/consultantdashboard');
        } else {
            navigate('/userdashboard');
        }
    };

    const getUserIcon = () => {
        switch (userRole) {
            case 'Admin':
                return <FaUserShield className="user-icon" />;
            case 'ServiceManager':
                return <FaUserCog className="user-icon" />;
            case 'Consultant':
                return <FaUserTie className="user-icon" />;
            default:
                return <FaRegUser className="user-icon" />;
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <a href="/" className="header-content">
                    <img src={logo1} alt="Samson Cricket Logo" />
                    <h1 className="titlename">SAMSON CRICKET</h1>
                </a>
            </div>
            <nav className="navbar">
                <ul className="navbar-menu">
                    <li className="navbar-item"><a href="/shop">Shop</a></li>
                    <li className="navbar-item"><a href="/services">Services</a></li>
                    <li className="navbar-item"><a href="/coaching">Coaching</a></li>
                    <li className="navbar-item"><a href="/consulting">Consulting</a></li>
                    <li className="navbar-item"><a href="/about">About Us</a></li>
                </ul>
            </nav>
            <div className="header-right">
                {isLoggedIn ? (
                    <button onClick={handleUserNameClick} className="user-profile-button">
                        {getUserIcon()}
                    </button>
                ) : (
                    <a href="/signIn" className="signIn">
                        Sign In
                    </a>
                )}
            </div>
        </header>
    );
}

export default MainHeader;