import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainHeader from '../Common/mainHeader';
import './Home.css';
import shopImage from '../assets/images/shophome.png';
import coachingImage from '../assets/images/coaching.png';
import servicesImage from '../assets/images/servhome.jpeg';
import consultingImage from '../assets/images/consulthome.png';
import MainFooter from '../Common/mainFooter';

const Home = () => {
    const [bats, setBats] = useState([]);
    const api = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchBats = async () => {
            try {
                const response = await axios.get(`${api}/api/bats`); 
                setBats(response.data.slice(0, 5)); 
            } catch (error) {
                console.error('Error fetching bats:', error);
            }
        };
        fetchBats();
    }, [api]);

    return (
        <div>
            <MainHeader />
            <main className="home-content">
                <section className="home-section shop-section">
                    <div className="section-content">
                        <img src={shopImage} alt="Shop" className="section-image" />
                        <div className="section-text">
                            <h2>Shop Our Premium Cricket Gear</h2>
                            <p>Discover a wide range of high-quality cricket bats, balls, protective gear, and accessories. Gear up for your next match with the best equipment.</p>
                            <a href="/shop" className="section-button">Explore Shop</a>
                        </div>
                    </div>
                </section>

                {/* Preview Bats Section */}
                <section className="home-section preview-bats-section">
                    <div className="preview-bats-content">
                        <h2 className='preview-title'>Featured Bats</h2>
                        <div className="preview-bats-grid">
                            {bats.map((bat) => (
                                <div key={bat._id} className="preview-bat-item">
                                    <div className="preview-bat-image-container">
                                        {bat.images && bat.images.length > 0 && (
                                            <img
                                                src={`${api}/uploads/${bat.images[0]}`}
                                                alt={bat.model}
                                                className="preview-bat-image"
                                            />
                                        )}
                                    </div>
                                    <div className="preview-bat-details">
                                        <h3>{bat.brand} {bat.model}</h3>
                                        <p>LKR {bat.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a href="/shop/bats" className="section-button">View All Bats</a>
                    </div>
                </section>

                <section className="home-section coaching-section">
                    <div className="section-content">
                        <div className="section-text">
                            <h2>Expert Cricket Coaching</h2>
                            <p>Enhance your skills with our professional coaching programs. Whether you're a beginner or an advanced player, our coaches will help you reach your full potential.</p>
                            <a href="/coaching" className="section-button">Learn More</a>
                        </div>
                        <img src={coachingImage} alt="Coaching" className="section-image" />
                    </div>
                </section>

                <section className="home-section services-section">
                    <div className="section-content">
                        <img src={servicesImage} alt="Services" className="section-image" />
                        <div className="section-text">
                            <h2>Comprehensive Cricket Services</h2>
                            <p>From pitch maintenance to equipment repairs, we offer a variety of services to support your cricket needs. Trust our experts to keep your gear and facilities in top condition.</p>
                            <a href="/services" className="section-button">View Services</a>
                        </div>
                    </div>
                </section>

                <section className="home-section consulting-section">
                    <div className="section-content">
                        <div className="section-text">
                            <h2>Personalized Cricket Consulting</h2>
                            <p>Get tailored advice and strategies from our cricket consultants. Whether you need help with your technique or match planning, we're here to guide you.</p>
                            <a href="/consulting" className="section-button">Book a Session</a>
                        </div>
                        <img src={consultingImage} alt="Consulting" className="section-image" />
                    </div>
                </section>
            </main>
            <MainFooter/>
        </div>
    );
};

export default Home;