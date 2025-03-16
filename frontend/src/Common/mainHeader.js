import React, { useEffect, useState } from "react";
import logo1 from '../assets/images/logo1.png';
import './mainHeader.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MainHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setIsLoggedIn(true);
                setUserName(payload.firstname || "User");
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
                    <button onClick={handleUserNameClick} className="signIn">
                        {userName}
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