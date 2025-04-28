import React from 'react';
import './mainFooter.css';
import logo1 from '../assets/images/logo.png'; // Import the logo
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const MainFooter = () => {
  return (
    <footer className="mf-footer">
      <div className="mf-container">
        <div className="mf-section mf-footer-branding">
          <a href="/" className="mf-footer-branding-link">
            <img src={logo1} alt="Samson Cricket Logo" className="mf-footer-logo" />
          </a>
        </div>
        <div className="mf-section">
          <h3 className="mf-title">Quick Links</h3>
          <ul className="mf-list">
            <li><a href="/shop" className="mf-link">Shop</a></li>
            <li><a href="/services" className="mf-link">Services</a></li>
            <li><a href="/coaching" className="mf-link">Coaching</a></li>
            <li><a href="/consulting" className="mf-link">Consulting</a></li>
            <li><a href="/community" className="mf-link">Community</a></li>
          </ul>
        </div>
        <div className="mf-section">
          <h3 className="mf-title">Contact Us</h3>
          <ul className="mf-list">
            <li><a href="mailto:info@samsoncricket.com" className="mf-link">cricketsamson@gmail.com</a></li>
            <li><a href="tel:+11234567890" className="mf-link">+1 (123) 456-7890</a></li>
            <li>123 Cricket Lane, Sportsville, CA 90001</li>
          </ul>
        </div>
        <div className="mf-section">
          <h3 className="mf-title">Follow Us</h3>
          <div className="mf-social-icons">
            <a href="https://www.facebook.com/" className="mf-social-link" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.twitter.com/" className="mf-social-link" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com/" className="mf-social-link" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/" className="mf-social-link" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="mailto:cricketsamson@gmail.com" className="mf-social-link"><FaEnvelope /></a>
          </div>
        </div>
      </div>
      <div className="mf-copyright">
        <p>&copy; {new Date().getFullYear()} Samson Cricket. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default MainFooter;