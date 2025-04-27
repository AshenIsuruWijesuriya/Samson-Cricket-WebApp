import React, { useEffect, useState, useContext } from "react";
import logo1 from '../assets/images/logo1.png';
import './mainHeader.css';
import { useNavigate } from 'react-router-dom';
import { FaRegUser, FaUserCog, FaUserTie, FaUserShield, FaMoneyBillAlt, FaShoppingCart } from "react-icons/fa";
import { CartContext } from '../context/CartContext'; 

const MainHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext); // Access cartItems from context
  const [cartItemCount, setCartItemCount] = useState(0);

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

  useEffect(() => {
    let totalItems = 0;
    cartItems.forEach(item => totalItems += item.quantity);
    setCartItemCount(totalItems);
  }, [cartItems]);

  const handleUserNameClick = () => {
    if (userRole === 'Admin') {
      navigate('/admindashboard');
    } else if (userRole === 'ServiceManager') {
      navigate('/servicedashboard');
    } else if (userRole === 'Consultant') {
      navigate('/consultantdashboard');
    } else if (userRole === 'Coach') {
      navigate('/coachingdashboard');
    } else if (userRole === 'Finance') {
      navigate('/financedashboard');
    } else {
      navigate('/userdashboard');
    }
  };

  const getUserIcon = () => {
    switch (userRole) {
      case 'Admin':
        return <FaUserShield className="mh-user-icon" />;
      case 'ServiceManager':
        return <FaUserCog className="mh-user-icon" />;
      case 'Consultant':
        return <FaUserTie className="mh-user-icon" />;
      case 'Finance':
        return <FaMoneyBillAlt className="mh-user-icon" />;
      case 'Coach':
        return <FaUserTie className="mh-user-icon" />;
      default:
        return <FaRegUser className="mh-user-icon" />;
    }
  };

  return (
    <header className="mh-header">
      <div className="mh-header-left">
        <a href="/" className="mh-header-content">
          <img src={logo1} alt="Samson Cricket Logo" className="mh-logo-img" />
          <h1 className="mh-titlename">SAMSON CRICKET</h1>
        </a>
      </div>
      <nav className="mh-navbar">
        <ul className="mh-navbar-menu">
          <li className="mh-navbar-item"><a href="/shop" className="mh-nav-link">Shop</a></li>
          <li className="mh-navbar-item"><a href="/services" className="mh-nav-link">Services</a></li>
          <li className="mh-navbar-item"><a href="/coaching" className="mh-nav-link">Coaching</a></li>
          <li className="mh-navbar-item"><a href="/consulting" className="mh-nav-link">Consulting</a></li>
          <li className="mh-navbar-item"><a href="/community" className="mh-nav-link">Community</a></li>
        </ul>
      </nav>
      <div className="mh-header-right">
        <div className="mh-cart-container">
          <a href="/cart" className="mh-cart-icon">
            <FaShoppingCart />
            {cartItemCount > 0 && <span className="mh-cart-count">{cartItemCount}</span>}
          </a>
        </div>
        {isLoggedIn ? (
          <button onClick={handleUserNameClick} className="mh-user-profile-button">
            {getUserIcon()}
          </button>
        ) : (
          <a href="/signIn" className="mh-sign-in">
            Sign In
          </a>
        )}
      </div>
    </header>
  );
};

export default MainHeader;