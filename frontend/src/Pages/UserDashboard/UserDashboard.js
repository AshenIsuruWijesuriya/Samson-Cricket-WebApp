import React from 'react';

import UserHeader from '../UserDashboard/UserDashboardHeader/UserHeader'

import './UserDashboard.css'; // Create a CSS file for styling

const UserDashboard = () => {
    return (
        <div>
            <UserHeader/>
        <div className="dashboard">
            <div className="main-content">
                <h1>User Dashboard</h1>
            </div>
        </div>
        </div>
    );
};

export default UserDashboard;