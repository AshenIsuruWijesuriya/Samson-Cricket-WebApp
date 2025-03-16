import React from 'react';
import ConsultingHeader from '../ConsultingHeader/ConsultingHeader';
import './BookSessions.css'


const BookSessions = () => {

    return(
        <div className='container'>
        <ConsultingHeader/>
        <h1 className='booking-title'>Book A Consultation Session</h1>

        <div className="dashboard-container">
            <a href='/batting-consulting' className="book-card-link">
                <div className="book-card">
                   Batting Consulting
                </div>
            </a>
            <a href='/bawling-consulting' className="book-card-link">
                <div className="book-card">
                    Bawling Consulting
                </div>
            </a>
            <a href='/fielding-consulting' className="book-card-link">
                <div className="book-card">
                    Fielding Consulting
                </div>
            </a>
            <a href='/physical-consulting' className="book-card-link">
                <div className="book-card">
                    Physical Consulting
                </div>
            </a>
        </div>
        </div>
    );
};

export default BookSessions;