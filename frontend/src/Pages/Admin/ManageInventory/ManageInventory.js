import React from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import { GiCricketBat, GiAmericanFootballHelmet, GiRunningShoe, GiPoloShirt } from "react-icons/gi";
import './ManageInventory.css';

const ManageInventory = () => {
    return (
        <div className='adminbgimg'>
            <AdminHeader />

            <div className="navigation-path-admindb">
                <a href="/admindashboard">Admin Dashboard</a> / Manage Inventory
            </div>

            <h2 className='manage-inventory-heading'>Select inventory type you want</h2>
            <div className="manage-inventory-container">
                <a href='/admindashboard/manage-inventory/manage-bats' className="manage-inventory-link">
                    <div className="manage-inventory-box manage-bats">
                        <GiCricketBat className="inventory-box-icon" />
                        <h2>Manage Bats</h2>
                    </div>
                </a>
                <a href='/admindashboard/manage-inventory/manage-protections' className="manage-inventory-link">
                    <div className="manage-inventory-box manage-protections">
                        <GiAmericanFootballHelmet className="inventory-box-icon" />
                        <h2>Manage Protections</h2>
                    </div>
                </a>
                <a href='/admindashboard/manage-inventory/manage-merchandise' className="manage-inventory-link">
                    <div className="manage-inventory-box manage-merchandise">
                        <GiPoloShirt className="inventory-box-icon" />
                        <h2>Manage Merchandise</h2>
                    </div>
                </a>
                <a href='/admindashboard/manage-inventory/manage-shoes' className="manage-inventory-link">
                    <div className="manage-inventory-box manage-shoes">
                        <GiRunningShoe className="inventory-box-icon" />
                        <h2>Manage Shoes</h2>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default ManageInventory;