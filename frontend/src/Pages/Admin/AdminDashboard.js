import React from 'react';
import './AdminDashboard.css';
import AdminHeader from './AdminHeader/AdminHeader';
import { FaUsers, FaBoxes, FaChartLine, FaCommentDots, FaShoppingCart } from 'react-icons/fa';

import usersImage from '../../assets/images/adminbg.jpg'; 
import inventoryImage from '../../assets/images/adminbg.jpg';
import reportsImage from '../../assets/images/adminbg.jpg';
import feedbackImage from '../../assets/images/adminbg.jpg';
import ordersImage from '../../assets/images/adminbg.jpg'; // Assuming you have an image for orders

const AdminDashboard = () => {
    return (
        <div className='adminbgimg'>
            <AdminHeader />

            {/* <div className="navigation-path-admindb">
                Admin Dashboard
            </div> */}
            <div className='ad-title'>Select a Service</div>
            <div className="dashboard-container">
                <a href='/admindashboard/manage-users' className="admin-card-link">
                    <div className="admin-card" style={{ backgroundImage: `url(${usersImage})` }}>
                        <FaUsers className="admin-card-icon" />
                        Manage Users
                    </div>
                </a>
                <a href='/admindashboard/manage-inventory' className="admin-card-link">
                    <div className="admin-card" style={{ backgroundImage: `url(${inventoryImage})` }}>
                        <FaBoxes className="admin-card-icon" />
                        Manage Inventory
                    </div>
                </a>
                <a href='/admindashboard/manage-orders' className="admin-card-link">
                    <div className="admin-card" style={{ backgroundImage: `url(${ordersImage})` }}>
                        <FaShoppingCart className="admin-card-icon" />
                        Manage Orders
                    </div>
                </a>
                <a href='/admindashboard/generate-reports' className="admin-card-link">
                    <div className="admin-card" style={{ backgroundImage: `url(${reportsImage})` }}>
                        <FaChartLine className="admin-card-icon" />
                        Generate Reports
                    </div>
                </a>
                <a href='/admindashboard/manage-feedback' className="admin-card-link">
                    <div className="admin-card" style={{ backgroundImage: `url(${feedbackImage})` }}>
                        <FaCommentDots className="admin-card-icon" />
                        Manage Feedbacks
                    </div>
                </a>
            </div>
        </div>
    );
};

export default AdminDashboard;