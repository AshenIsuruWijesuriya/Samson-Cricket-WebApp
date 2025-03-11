import React from 'react';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li className="navbar-item"><a href="shop">Shop</a></li>
                <li className="navbar-item"><a href="services">Services</a></li>
                <li className="navbar-item"><a href="coaching">Coaching</a></li>
                <li className="navbar-item"><a href="consulting">Consulting</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;