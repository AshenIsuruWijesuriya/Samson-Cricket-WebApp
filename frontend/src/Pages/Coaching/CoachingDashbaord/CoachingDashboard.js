import React from 'react';
import CoachingHeader from '../CoachingHeader/CoachingHeader';
import './CoachingDashboard.css';
import { FaUsers, FaBoxes, FaChartLine, FaCommentDots } from 'react-icons/fa';
// import usersImage from '../../../assets/images/adminbg.jpg';
// import inventoryImage from '../../../assets/images/adminbg.jpg';
// import reportsImage from '../../../assets/images/adminbg.jpg';
// import feedbackImage from '../../../assets/images/adminbg.jpg';

const CoachingDashboard = () => {
    return (
        <div className='coaching-bg'>
            <CoachingHeader />

            <div className='coaching-title'>Select a Service</div>
            <div className="coaching-container">
                <a href='/coachingdashboard/manage-users' className="coaching-card-link">
                    <div className="coaching-card coaching-card-users">
                        <FaUsers className="coaching-card-icon" />
                        Manage Coaches
                    </div>
                </a>
                <a href='/coachingdashboard/manage-inventory' className="coaching-card-link">
                    <div className="coaching-card coaching-card-inventory">
                        <FaBoxes className="coaching-card-icon" />
                        Manage Bookings
                    </div>
                </a>
                <a href='/coachingdashboard/generate-reports' className="coaching-card-link">
                    <div className="coaching-card coaching-card-reports">
                        <FaChartLine className="coaching-card-icon" />
                        Generate Reports
                    </div>
                </a>
                <a href='/coachingdashboard/manage-feedback' className="coaching-card-link">
                    <div className="coaching-card coaching-card-feedback">
                        <FaCommentDots className="coaching-card-icon" />
                        Manage Feedbacks
                    </div>
                </a>
            </div>
        </div>
    );
};

export default CoachingDashboard;