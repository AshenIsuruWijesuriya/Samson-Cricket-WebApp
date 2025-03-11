import React from "react";
import logo1 from '../../assets/images/logo1.png'; 
import './signHeader.css'; 

const signHeader = () => {
    return (
        <header>
            <a href="/" className="header-content">
                <img src={logo1} alt="Samson Cricket Logo" /> 
                <h1>SAMSON CRICKET</h1>
            </a>
        </header>
    );
}
export default signHeader;