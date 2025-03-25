import React, { useState } from 'react';
import UserHeader from '../UserDashboard/UserDashboardHeader/UserHeader';
import './UserDashboard.css';

import EditProfile from '../../Components/UserDashboard/EditProfile';
import MyOrder from '../../Components/UserDashboard/MyOrders';
import MyServices from '../../Components/UserDashboard/MyServices';

const UserDashboard = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const renderPreview = () => {
        switch (selectedOption) {
            case 'editProfile':
                return <div><EditProfile/></div>;
            case 'myOrders':
                return <div><MyOrder/></div>;
            case 'myCoaching':
                return <div><h2>My Coaching</h2><p>Your coaching sessions.</p></div>;
            case 'myConsulting':
                return <div><h2>My Consulting</h2><p>Your consulting appointments.</p></div>;
            case 'myServices':
                return <div><MyServices/></div>;
            default:
                return <div><h2>Welcome to your Dashboard</h2><p>Please select an option from the left.</p></div>;
        }
    };

    return (
        <div className="ud-container">
            <UserHeader />
            <div className="ud-main-layout">
                <div className="ud-sidebar">
                    <button className="ud-sidebar-btn" onClick={() => handleOptionClick('editProfile')}>Edit Profile</button>
                    <button className="ud-sidebar-btn" onClick={() => handleOptionClick('myOrders')}>My Orders</button>
                    <button className="ud-sidebar-btn" onClick={() => handleOptionClick('myCoaching')}>My Coaching</button>
                    <button className="ud-sidebar-btn" onClick={() => handleOptionClick('myConsulting')}>My Consulting</button>
                    <button className="ud-sidebar-btn" onClick={() => handleOptionClick('myServices')}>My Services</button>
                </div>
                <div className="ud-content-area">
                    {renderPreview()}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;