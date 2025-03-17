import React from "react";
import ConsultingHeader from './ConsultingHeader/ConsultingHeader';
import './ConsultantDashboard.css'


const ConsultantDashboard = () => {
    return (
        <div className='container'>
        <ConsultingHeader/>
       
        <div className="dashboard-container">
            <a href='/consultantdashboard/manage-consultant' className="con-card-link">
                <div className="con-card">
                  Manage Consultant
                </div>
            </a>
            <a href='/consultantdashboard/manage-consulting-session' className="con-card-link">
                <div className="con-card">
                    Manage Consulting Sessions
                </div>
            </a>
            <a href='/consultantdashboard/manage-questions' className="con-card-link">
                <div className="con-card">
                    Q & A
                </div>
            </a>
        </div>
        </div>
        
    );
};

export default ConsultantDashboard;



