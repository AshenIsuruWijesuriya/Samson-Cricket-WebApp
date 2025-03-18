import React, { useState } from 'react';  // Import useState from React
import './FieldingConsulting.css';
import MainHeader from '../../../Common/mainHeader';

const FieldingConsulting = () => {
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
         <div className="fieldingfullpage-container"></div>
        <MainHeader/>
        <div className='fieldingcontainer'>
            <h2 className='fieldingtitle'>Fielding Consulting</h2>
            <div className='fieldingpara'>
                <p>
                Fielding consulting enhances players' agility, catching, and throwing techniques. Our experts provide personalized 
                drills to improve reflexes and positioning. Book a session to sharpen your defensive skills on the field.
                </p>
            </div>

            <div className='fieldingpara2'>
                <h2>Book a Fielding Consulting</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="fieldingconsulting-form">
                <div className="fieldingform-group">
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

                <div className="fieldingform-group">
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

                <div className="fieldingform-group">
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

                <div className="fieldingform-group">
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

                <div className="fieldingform-group">
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
                <div className="fieldingform-group">
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

                <button type="submit" className="fieldingsubmit-btn">Submit</button>
            </form>
        </div>
        </>
    );
};

export default FieldingConsulting;
