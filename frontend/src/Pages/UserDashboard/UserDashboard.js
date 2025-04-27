import React, { useState } from 'react';
import UserHeader from '../UserDashboard/UserDashboardHeader/UserHeader';
import './UserDashboard.css';

import EditProfile from '../../Components/UserDashboard/EditProfile';
import MyOrder from '../../Components/UserDashboard/MyOrders';
import MyServices from '../../Components/UserDashboard/MyServices';
import YourConsultingAppointments from '../Consulting/UserComponents/YourConsultingAppoiments';

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
                return <div><YourConsultingAppointments/></div>;
            case 'myServices':
                return <div><MyServices/></div>;
            case 'myFeedbacks':
                return <div><h2>My Feedbacks</h2><p>Your coaching sessions.</p></div>;
            default:
                return <div><EditProfile/></div>;
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
                    <button className="ud-sidebar-btn" onClick={() => handleOptionClick('myFeedbacks')}>My Feedbacks</button>
                </div>
                <div className="ud-content-area">
                    {renderPreview()}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;