import React, { useState } from 'react';  // Import useState from React

import './BattingConsulting.css';
import MainHeader from '../../../Common/mainHeader';

const BattingConsulting = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        date: '',
        time: '',
        consultingType: ''  // Add consulting type to the formData state
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Data was submitted successfully!');
        setFormData({
            name: '',
            email: '',
            contact: '',
            date: '',
            time: '',
            consultingType: ''
        });
    };

    return (

       

        <>
         <div className="battingfullpage-container"></div>
        <MainHeader/>
        <div className='battingcontainer'>
            <h2 className='battingtitle'>Batting Consulting</h2>
            <div className='battingpara'>
                <p>
                    Our batting consultation service is designed to help players improve their technique, footwork, and shot selection. 
                    Whether you're a beginner or an advanced player, our expert coaches will provide personalized guidance to enhance your game.
                </p>
            </div>

            <div className='battingpara2'>
                <h2>Book a Batting Consulting</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="battingconsulting-form">
                <div className="battingform-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="battingform-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="battingform-group">
                    <label htmlFor="contact">Contact Number:</label>
                    <input 
                        type="text" 
                        id="contact" 
                        name="contact" 
                        value={formData.contact} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="battingform-group">
                    <label htmlFor="date">Select Date:</label>
                    <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="battingform-group">
                    <label htmlFor="time">Select Time:</label>
                    <input 
                        type="time" 
                        id="time" 
                        name="time" 
                        value={formData.time} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* New field for selecting consulting type */}
                <div className="battingform-group">
                    <label htmlFor="consultingType">Consulting Type:</label>
                    <select 
                        id="consultingType" 
                        name="consultingType" 
                        value={formData.consultingType} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select Consulting Type</option>
                        <option value="Batting">Batting</option>
                        <option value="Bowling">Bowling</option>
                        <option value="Physical">Physical</option>
                        <option value="Fielding">Fielding</option>
                    </select>
                </div>

                <button type="submit" className="battingsubmit-btn">Submit</button>
            </form>
         
        </div>
        </>
    );
};

export default BattingConsulting;
