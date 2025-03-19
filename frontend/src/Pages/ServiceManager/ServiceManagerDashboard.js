import React from 'react';
import ServiceManagerHeader from "../ServiceManager/ServicemanagerHeader/ServiceManagerHeader";
import "./ServiceManagerDashboard.css"; // Import CSS file



const ServiceManagerDashboard = () => {
    return (
        <div className="sm-dashboard-container">
            <ServiceManagerHeader />

            {/* Dashboard Title */}
            <div className="sm-dashboard-title">Service Management</div>

            {/* Service Cards */}
            <div className="sm-card-container">
                <a href="/servicedashboard/manage-repairs" className="sm-card-link">
                    <div className="sm-card sm-repair-card">
                        <span className="sm-card-text">Manage Repairs</span>
                    </div>
                </a>
                <a href="/servicemanager/manage-inventory" className="sm-card-link">
                    <div className="sm-card sm-inventory-card">
                        <span className="sm-card-text">Repair Inventory</span>
                    </div>
                </a>
                <a href="/servicemanager/generate-reports" className="sm-card-link">
                    <div className="sm-card sm-reports-card">
                        <span className="sm-card-text">Generate Reports</span>
                    </div>
                </a>
                <a href="/servicemanager/analysis" className="sm-card-link">
                    <div className="sm-card sm-analysis-card">
                        <span className="sm-card-text">Analysis</span>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default ServiceManagerDashboard;