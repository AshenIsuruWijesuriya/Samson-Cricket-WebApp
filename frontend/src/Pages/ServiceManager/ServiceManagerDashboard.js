import React from 'react';
import './ServiceManagerDashboard.css'; // Import the CSS file
import ServiceManagerHeader from "../ServiceManager/ServicemanagerHeader/ServiceManagerHeader";


const ServiceManagerDashboard = () => {
    return (
        <div>
            <ServiceManagerHeader/>
            <div className='servicebgimg'></div>
            <div className='sm-title'>Select a Service</div>
            <div className="dashboard-container">
                <a href='/servicemanager/manage-repairs' className="card-link">
                    <div className="card">
                        Manage Repairs
                    </div>
                </a>
                <a href='/servicemanager/manage-inventory' className="card-link">
                    <div className="card">
                        Manage Inventory
                    </div>
                </a>
                <a href='/servicemanager/generate-reports' className="card-link">
                    <div className="card">
                        Generate Reports
                    </div>
                </a>
            </div>
        </div>
    );
};

export default ServiceManagerDashboard;
