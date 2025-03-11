import React from "react";
import logo1 from '../assets/images/logo1.png'; 
import './mainHeader.css';

const MainHeader = () => {
    return (
        <header>
            <div className="header-content">
                <img src={logo1} alt="Samson Cricket Logo" /> 
                <h1>SAMSON CRICKET</h1>
            </div>
            <div className="header-actions">
                <button className="cart-button">🛒 Cart</button>
                <button className="login-button">Login</button>
            </div>
        </header>
    );
}

export default MainHeader;