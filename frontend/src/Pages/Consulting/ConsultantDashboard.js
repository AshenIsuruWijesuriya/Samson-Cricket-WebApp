import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ConsultingHeader from './ConsultingHeader/ConsultingHeader';
import './ConsultantDashboard.css';
import ManageConsultant from './ManageConsultant/manageConsultant';
import ManageConsultingSession from './ManageConsultingSession/manageConsultingSession';

const ConsultantDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard');

    const renderBreadcrumbs = () => {
        return null;
    };

    const renderComponent = () => {
        switch(activeComponent) {
            case 'manage-consultant':
                return <ManageConsultant onBack={() => setActiveComponent('dashboard')} />;
            case 'manage-consulting-session':
                return <ManageConsultingSession onBack={() => setActiveComponent('dashboard')} />;
            case 'manage-questions':
                return <div className="consultant-content-area"><h1>Q & A Section</h1></div>;
            default:
                return (
                    <div className="consultant-dashboard-content">
                        <p className="consultant-dashboard-welcome">Welcome! Select an option below to manage your consulting services.</p>
                        
                        <div className="consultant-dashboard-cards">
                            <div className="con-card-link" onClick={() => setActiveComponent('manage-consultant')}>
                                <div className="con-card">
                                    <FontAwesomeIcon icon={faUsers} className="card-icon" />
                                    <h3>Manage Consultant</h3>
                                    <p>Add, edit, or remove consultant profiles</p>
                                </div>
                            </div>
                            
                            <div className="con-card-link" onClick={() => setActiveComponent('manage-consulting-session')}>
                                <div className="con-card">
                                    <FontAwesomeIcon icon={faCalendarCheck} className="card-icon" />
                                    <h3>Manage Consulting Sessions</h3>
                                    <p>Schedule and organize consulting appointments</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className='consultant-container'>
            <ConsultingHeader/>
            <div className="consultant-dashboard-container">
                {renderBreadcrumbs()}
                {renderComponent()}
            </div>
        </div>
    );
};

export default ConsultantDashboard;