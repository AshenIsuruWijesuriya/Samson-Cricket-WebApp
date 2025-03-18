import React from 'react';

import FinanceHeader from './FinanceHeader/FinanceHeader';


const FinanceDashboard = () => {
    return (
        <div>
            <FinanceHeader/>
        <div className="dashboard">
            <div className="main-content">
                <h1>Finance Manager Dashboard</h1>
            </div>
        </div>
        </div>
    );
};

export default FinanceDashboard;