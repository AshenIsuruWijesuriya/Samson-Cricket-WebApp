import React from 'react';
import MainHeader from '../../Common/mainHeader';
import './Consulting.css'; // Updated unique CSS file

const Consulting= () => {
    return (
        <div className="consulting-management">
            <MainHeader />
            <h1 className="consulting-title">Consulting</h1>

            <div className="consulting-description">
                <p>
                    Consulting Management in a website allows users to book specialized coaching sessions 
                    in four categories:Bowling, Batting, Physical, and Fielding. Users can 
                    schedule appointments with expert consultants to improve their cricket skills and 
                    overall performance. The system provides an easy-to-use interface for booking, managing, 
                    and canceling consultations. Coaches can oversee scheduled sessions, track progress, 
                    and communicate with players. This platform ensures a seamless experience for both 
                    players and consultants, enhancing training efficiency.
                </p>
            </div>

            <h2 className="consulting-subtitle">Select a Consulting Type</h2>

            <div className="consulting-dashboard">
                <a href='/batting-consulting' className="consulting-card-link">
                    <div className="consulting-card">Batting Consulting</div>
                </a>
                <a href='/bawling-consulting' className="consulting-card-link">
                    <div className="consulting-card">Bawling Consulting</div>
                </a>
                <a href='/fielding-consulting' className="consulting-card-link">
                    <div className="consulting-card">Fielding Consulting</div>
                </a>
                <a href='/physical-consulting' className="consulting-card-link">
                    <div className="consulting-card">Physical Consulting</div>
                </a>
               
            </div>
        </div>
    );
};

export default Consulting;
