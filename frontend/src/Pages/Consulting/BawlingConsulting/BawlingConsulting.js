import React, { useState } from 'react';  // Import useState from React
import './BawlingConsulting.css';

const BawlingConsulting = () => {
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
            <div className="bawlingfullpage-container"></div>
        
       
        <div className='bawlingcontainer'>
            <h2 className='bawlingtitle'>Bawling Consulting</h2>
            <div className='bawlingpara'>
                <p>
                Bowling Consulting helps players refine their bowling techniques with expert guidance. Our coaches provide personalized feedback to improve speed, accuracy, and strategy. Book a session to elevate your bowling performance today!
                </p>
            </div>

            <div className='bawlingpara2'>
                <h2>Book a Bawling Consulting</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="bawlingconsulting-form">
                <div className="bawlingform-group">
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

                <div className="bawlingform-group">
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

                <div className="bawlingform-group">
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

                <div className="bawlingform-group">
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

                <div className="bawlingform-group">
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
                <div className="bawlingform-group">
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

                <button type="submit" className="bawlingsubmit-btn">Submit</button>
            </form>
        </div>
        </>
    );
};

export default BawlingConsulting;
