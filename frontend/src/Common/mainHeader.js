import React from "react";
import logo1 from '../assets/images/logo1.png'; 
import './mainHeader.css';

const mainHeader = () => {
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
                    <li className="navbar-item"><a href="shop">Shop</a></li>
                    <li className="navbar-item"><a href="services">Services</a></li>
                    <li className="navbar-item"><a href="coaching">Coaching</a></li>
                    <li className="navbar-item"><a href="consulting">Consulting</a></li>
                    <li className="navbar-item"><a href="about">About Us</a></li>
                </ul>
            </nav>
            <div className="header-right">
                <a href="/signIn" className="signIn">Sign In</a>
            </div>
        </header>
    );
}

export default mainHeader;