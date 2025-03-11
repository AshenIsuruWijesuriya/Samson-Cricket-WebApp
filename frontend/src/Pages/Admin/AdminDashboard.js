import React from 'react';
import './AdminDashboard.css'; // Import the CSS file
import AdminHeader from './AdminHeader/AdminHeader';

const AdminDashboard = () => {
    return (
        <div>
        <AdminHeader/>
        <div className='adminbgimg'></div>
        <div className='ad-title'>Select a Service</div>
        <div className="dashboard-container">
            <a href='/admindashboard/manage-users' className="card-link">
                <div className="card">
                    Manage Users
                </div>
            </a>
            <a href='/admindashboard/manage-inventory' className="card-link">
                <div className="card">
                    Manage Inventory
                </div>
            </a>
        </div>
        </div>
    );
};

export default AdminDashboard;