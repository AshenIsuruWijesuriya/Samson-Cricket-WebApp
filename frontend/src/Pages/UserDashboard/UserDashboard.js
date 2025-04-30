import React, { useState } from 'react';
import UserHeader from '../UserDashboard/UserDashboardHeader/UserHeader';
import './UserDashboard.css';

import EditProfile from '../../Components/UserDashboard/EditProfile';
import MyOrder from '../../Components/UserDashboard/MyOrders';
import MyServices from '../../Components/UserDashboard/MyServices';
import MyFeedbacks from '../../Components/UserDashboard/MyFeedbacks';
import UserBookings from '../Coaching/ViewCoaches/UserBookings';

import YourConsultingAppointments from '../Consulting/UserComponents/YourConsultingAppoiments';

import { FaUserEdit, FaShoppingCart, FaChalkboardTeacher, FaCalendarAlt, FaWrench, FaCommentDots } from 'react-icons/fa';

const UserDashboard = () => {
    document.title = 'User Dashboard';
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
                return <div><UserBookings/></div>;
            case 'myConsulting':
                return <div><YourConsultingAppointments/></div>;
            case 'myServices':
                return <div><MyServices/></div>;
            case 'myFeedbacks':
                return <div><MyFeedbacks/></div>;
            default:
                return <div><EditProfile/></div>;
        }
    };

    return (
        <div className="ud-container">
            <UserHeader />
            <div className="ud-main-layout">
                <div className="ud-sidebar">
                    <button 
                        className={`ud-sidebar-btn ${selectedOption === 'editProfile' ? 'active' : ''}`} 
                        onClick={() => handleOptionClick('editProfile')}
                    >
                        <FaUserEdit className="ud-sidebar-icon" /> Edit Profile
                    </button>
                    <button 
                        className={`ud-sidebar-btn ${selectedOption === 'myOrders' ? 'active' : ''}`} 
                        onClick={() => handleOptionClick('myOrders')}
                    >
                        <FaShoppingCart className="ud-sidebar-icon" /> My Orders
                    </button>
                    <button 
                        className={`ud-sidebar-btn ${selectedOption === 'myCoaching' ? 'active' : ''}`} 
                        onClick={() => handleOptionClick('myCoaching')}
                    >
                        <FaChalkboardTeacher className="ud-sidebar-icon" /> My Coaching
                    </button>
                    <button 
                        className={`ud-sidebar-btn ${selectedOption === 'myConsulting' ? 'active' : ''}`} 
                        onClick={() => handleOptionClick('myConsulting')}
                    >
                        <FaCalendarAlt className="ud-sidebar-icon" /> My Consulting
                    </button>
                    <button 
                        className={`ud-sidebar-btn ${selectedOption === 'myServices' ? 'active' : ''}`} 
                        onClick={() => handleOptionClick('myServices')}
                    >
                        <FaWrench className="ud-sidebar-icon" /> My Services
                    </button>
                    <button 
                        className={`ud-sidebar-btn ${selectedOption === 'myFeedbacks' ? 'active' : ''}`} 
                        onClick={() => handleOptionClick('myFeedbacks')}
                    >
                        <FaCommentDots className="ud-sidebar-icon" /> My Feedbacks
                    </button>
                </div>
                <div className="ud-content-area">
                    {renderPreview()}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;