import React from "react";
import ConsultingHeader from './ConsultingHeader/ConsultingHeader';
import './ConsultantDashboard.css'


const ConsultantDashboard = () => {
    return (
        <div className='container'>
        <ConsultingHeader/>
        <div className='con-title'>Select a Service</div>
        <div className="dashboard-container">
            <a href='/consultantdashboard/book-sessions' className="con-card-link">
                <div className="con-card">
                   Book a session
                </div>
            </a>
            <a href='/consultantdashboard/manage-session' className="con-card-link">
                <div className="con-card">
                    Manage sessions
                </div>
            </a>
            <a href='/consultantdashboard/communication' className="con-card-link">
                <div className="con-card">
                    Communication
                </div>
            </a>
        </div>
        </div>
        
    );
};

export default ConsultantDashboard;



