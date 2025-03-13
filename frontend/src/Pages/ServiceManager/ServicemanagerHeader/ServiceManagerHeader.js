import React from 'react';
import './ServiceManagerHeader.css';

const ServiceManagerHeader = () => {
    return (
        <header className="sm-header">
            <h1>Service Manager Dashboard</h1>
            <nav>
                <ul>
                    <li><a href="/servicemanager/manage-repairs">Manage Repairs</a></li>
                    <li><a href="/servicemanager/manage-inventory">Manage Inventory</a></li>
                    <li><a href="/servicemanager/generate-reports">Generate Reports</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default ServiceManagerHeader;
