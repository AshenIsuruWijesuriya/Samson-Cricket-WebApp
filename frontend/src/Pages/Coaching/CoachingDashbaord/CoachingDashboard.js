import React from 'react';
import CoachingHeader from '../CoachingHeader/CoachingHeader';
import './CoachingDashboard.css';
import { FaUsers, FaBoxes, FaChartLine, FaCommentDots } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
// import usersImage from '../../../assets/images/adminbg.jpg';
// import inventoryImage from '../../../assets/images/adminbg.jpg';
// import reportsImage from '../../../assets/images/adminbg.jpg';
// import feedbackImage from '../../../assets/images/adminbg.jpg';


const CoachingDashboard = () => {
        const navigate = useNavigate(); 
    
        const handleManageUsersClick = () => {
            navigate('/coachingdashboard/manage-users');
        };
    
        const handleManageInventoryClick = () => {
            navigate('/coachingdashboard/manage-sessions');
        };
    
        const handleGenerateReportsClick = () => {
            navigate('/coachingdashboard/manage-reports');
        };
    
        const handleManageFeedbackClick = () => {
            navigate('/coachingdashboard/manage-Feedbacks');
        };
    return (
        <div className='coaching-bg'>
            <CoachingHeader />

            <div className='coaching-title'>Select a Service</div>
            <div className="coaching-container">
                <div className="coaching-card-link" onClick={handleManageUsersClick}>
                    <div className="coaching-card coaching-card-users">
                        <FaUsers className="coaching-card-icon" />
                        Manage Coaches
                    </div>
                </div>
                <div className="coaching-card-link" onClick={handleManageInventoryClick}>
                    <div className="coaching-card coaching-card-inventory">
                        <FaBoxes className="coaching-card-icon" />
                        Manage Bookings
                    </div>
                </div>
                <div className="coaching-card-link" onClick={handleGenerateReportsClick}>
                    <div className="coaching-card coaching-card-reports">
                        <FaChartLine className="coaching-card-icon" />
                        Generate Reports
                    </div>
                </div>
                <div className="coaching-card-link" onClick={handleManageFeedbackClick}>
                    <div className="coaching-card coaching-card-feedback">
                        <FaCommentDots className="coaching-card-icon" />
                        Manage Feedbacks
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachingDashboard;