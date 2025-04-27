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
        if (activeComponent === 'dashboard') {
            return ;
        } else {
            const titles = {
                'manage-consultant': 'Manage Consultant',
                'manage-consulting-session': 'Manage Consulting Sessions',
                'manage-questions': 'Q & A Section'
            };
            return (
                <div className="breadcrumbs">
                    <button className="back-button" onClick={() => setActiveComponent('dashboard')}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
                    </button>
                    <h2>{titles[activeComponent]}</h2>
                </div>
            );
        }
    };

    const renderComponent = () => {
        switch(activeComponent) {
            case 'manage-consultant':
                return <ManageConsultant onBack={() => setActiveComponent('dashboard')} />;
            case 'manage-consulting-session':
                return <ManageConsultingSession onBack={() => setActiveComponent('dashboard')} />;
            case 'manage-questions':
                return <div className="content-area"><h1>Q & A Section</h1></div>;
            default:
                return (
                    <div className="dashboard-content">
                        <p className="dashboard-welcome">Welcome! Select an option below to manage your consulting services.</p>
                        
                        <div className="dashboard-cards">
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
        <div className='container'>
            <ConsultingHeader/>
            <div className="dashboard-container">
                {renderBreadcrumbs()}
                {renderComponent()}
            </div>
        </div>
    );
};

export default ConsultantDashboard;