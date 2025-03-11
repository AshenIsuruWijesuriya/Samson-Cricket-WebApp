import React from "react";
import logo1 from '../assets/images/logo1.png'; 
import './mainHeader.css'; 

const MainHeader = () => {
    return (
        <header>
            <a href="/" className="header-content">
                <img src={logo1} alt="Samson Cricket Logo" /> 
                <h1>SAMSON CRICKET</h1>
            </a>
            <div className="header-actions">
                <button className="login-button">
                    Sign In
                </button>
                <button className="cart-button">
                    Cart
                </button>
            </div>
        </header>
    );
}

export default MainHeader;