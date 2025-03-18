import React, { useState } from 'react';  // Import useState from React
import './PhysicalConsulting.css';
import MainHeader from '../../../Common/mainHeader';

const PhysicalConsulting = () => {
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
         <div className="physicalfullpage-container"></div>
        <MainHeader/>
        <div className='physicalcontainer'>
            <h2 className='physicaltitle'>Physical Consulting</h2>
            <div className='physicalpara'>
                <p>
                Physical consulting focuses on fitness, strength, and conditioning tailored for cricket performance. Our experts provide 
                personalized training plans to enhance endurance, agility, 
                and injury prevention. Optimize your physical capabilities to excel on the field.
                </p>
            </div>

            <div className='physicalpara2'>
                <h2>Book a Physical Consulting</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="physicalconsulting-form">
                <div className="physicalform-group">
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

                <div className="physicalform-group">
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

                <div className="physicalform-group">
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

                <div className="physicalform-group">
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

                <div className="physicalform-group">
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
                <div className="physicalform-group">
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

                <button type="submit" className="physicalsubmit-btn">Submit</button>
            </form>
        </div>
        </>
    );
};

export default PhysicalConsulting;
