import React from "react";
import logo1 from '../assets/images/logo1.png'; 
import './mainHeader.css'; 

const MainHeader = () => {
    return (
        <header className="mainHeader">
            <a href="/" className="header-content">
                <img src={logo1} alt="Samson Cricket Logo" /> 
                <h1 className="titlename">SAMSON CRICKET</h1>
            </a>
            <div className="header-actions">
                <a href="/signIn" className="signIn">Sign In</a>
            </div>
        </header>
    );
}

export default MainHeader;