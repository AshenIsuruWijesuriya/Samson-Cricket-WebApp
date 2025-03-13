import React from 'react';
import './AdminDashboard.css'; // Import the CSS file
import AdminHeader from './AdminHeader/AdminHeader';

const AdminDashboard = () => {
    return (
        <div className='adminbgimg'>
        <AdminHeader/>
        <div className='ad-title'>Select a Service</div>
        <div className="dashboard-container">
            <a href='/admindashboard/manage-users' className="admin-card-link">
                <div className="admin-card">
                    Manage Users
                </div>
            </a>
            <a href='/admindashboard/manage-inventory' className="admin-card-link">
                <div className="admin-card">
                    Manage Inventory
                </div>
            </a>
            <a href='/admindashboard/manage-inventory' className="admin-card-link">
                <div className="admin-card">
                    Generate Reports
                </div>
            </a>
        </div>
        </div>
    );
};

export default AdminDashboard;