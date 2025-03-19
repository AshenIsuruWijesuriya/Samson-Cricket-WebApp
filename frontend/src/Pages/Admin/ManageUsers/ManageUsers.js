import React from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import { FaRegUser, FaUserCog, FaUserTie, FaUserShield, FaMoneyBillAlt } from "react-icons/fa";
import './ManageUsers.css';

const ManageUsers = () => {
    return (
        <div className='adminbgimg'>
            <AdminHeader />

            <div className="navigation-path-admindb">
                <a href="/admindashboard">Admin Dashboard</a> / Manage Users
            </div>

            <h2 className='manage-users-heading'>Select user type you want</h2>
            <div className="manage-users-container">
                <a href='/admindashboard/manage-users/customer-users' className="manage-user-link">
                    <div className="manage-user-box manage-customers">
                        <FaRegUser className="user-box-icon" />
                        <h2>Manage Customers</h2>
                    </div>
                </a>
                <a href='/admindashboard/manage-users/admin-users' className="manage-user-link">
                    <div className="manage-user-box manage-administrators">
                        <FaUserShield className="user-box-icon" />
                        <h2>Manage Administrators</h2>
                    </div>
                </a>
                <a href='/' className="manage-user-link">
                    <div className="manage-user-box manage-service-managers">
                        <FaUserCog className="user-box-icon" />
                        <h2>Manage Service Managers</h2>
                    </div>
                </a>
                <a href='/' className="manage-user-link">
                    <div className="manage-user-box manage-coaching-managers">
                        <FaUserTie className="user-box-icon" />
                        <h2>Manage Coaching Managers</h2>
                    </div>
                </a>
                <a href='/' className="manage-user-link">
                    <div className="manage-user-box manage-consultation-managers">
                        <FaUserTie className="user-box-icon" />
                        <h2>Manage Consulting Managers</h2>
                    </div>
                </a>
                <a href='/' className="manage-user-link">
                    <div className="manage-user-box manage-finance-managers">
                        <FaMoneyBillAlt className="user-box-icon" />
                        <h2>Manage Finance Managers</h2>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default ManageUsers;