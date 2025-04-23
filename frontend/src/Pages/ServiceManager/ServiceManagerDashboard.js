import React from 'react';
import ServiceManagerHeader from "../ServiceManager/ServicemanagerHeader/ServiceManagerHeader";
import "./ServiceManagerDashboard.css"; 



const ServiceManagerDashboard = () => {
    return (
        <div className="sm-dashboard-container">
            <ServiceManagerHeader />

            
            <div className="sm-dashboard-title">Service Management</div>

          
            <div className="sm-card-container">
                <a href="/servicedashboard/manage-repairs" className="sm-card-link">
                    <div className="sm-card sm-repair-card">
                        <span className="sm-card-text">Manage Repairs</span>
                    </div>
                </a>
                <a href="/servicemanager/manage-inventory" className="sm-card-link">
                    <div className="sm-card sm-inventory-card">
                        <span className="sm-card-text">Technician Management</span>
                    </div>
                </a>
                <a href="/servicemanager/generate-reports" className="sm-card-link">
                    <div className="sm-card sm-reports-card">
                        <span className="sm-card-text">Generate Reports</span>
                    </div>
                </a>
                
            </div>
        </div>
    );
};

export default ServiceManagerDashboard;