import React from 'react';
import MainHeader from '../../Common/mainHeader';
import './Coaching.css';

// Import coach images (replace with actual image paths)
import coach1 from '../../assets/images/coach1.jpg';
import coach2 from '../../assets/images/coach2.jpg';
import coach3 from '../../assets/images/coach3.jpg';
import coach4 from '../../assets/images/coach4.jpg';
import coach5 from '../../assets/images/coach5.jpg';
import coach6 from '../../assets/images/coach6.jpg';


const Coaching = () => {
  const coaches = [
    { id: 1, name: 'Coach John', description: 'Expert in personal development', image: coach1 },
    { id: 2, name: 'Coach Sarah', description: 'Specializes in academic coaching', image: coach2 },
    { id: 3, name: 'Coach Mike', description: 'Fitness and wellness coach', image: coach3 },
    { id: 4, name: 'Coach Emily', description: 'Leadership and team building', image: coach4 },
    { id: 5, name: 'Coach David', description: 'Expert in personal and academic development', image: coach5 },
    { id: 6, name: 'Coach David', description: 'Expert in personal development', image: coach6 }
  ];

  return (
    <div className="coaching-page">
      <MainHeader />
      <div className="coaching-content">
        {/* Coaching Description Section */}
        <div className="coaching-description">
          <h1>Welcome to Samson Cricket Coaching</h1>
          <p>
            At Samson Cricket Coaching, we offer personalized coaching sessions, online coaching sessions and 
            academic coaching sessions to help you achieve your goals. 
            Whether you're looking to improve your skills, advance your career, or enhance your fitness, our 
            expert coaches are here to guide you every step of the way. Book a session today and take the 
            first step towards your success!
          </p>
        </div>

        {/* Book a Coach Section */}
        <h1 className="coaching-title" style={{ color: '#000000' }}>Book a Coach</h1>
        <div className="coach-list">
          {coaches.map((coach) => (
            <div key={coach.id} className="coach-card">
              <img src={coach.image} alt={coach.name} className="coach-image" />
              <h2>{coach.name}</h2>
              <p>{coach.description}</p>
              <button onClick={() => alert(`Booking ${coach.name}`)}>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coaching;