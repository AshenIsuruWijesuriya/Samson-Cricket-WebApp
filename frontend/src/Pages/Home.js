import React from 'react';
import MainHeader from '../Common/mainHeader';
import './Home.css'; // Import your CSS file
import shopImage from '../assets/images/shopbghome.png';
import coachingImage from '../assets/images/adminbg.jpg';
import servicesImage from '../assets/images/adminbg.jpg';
import consultingImage from '../assets/images/signInbg.jpg';

const Home = () => {
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
        </div>
    );
};

export default Home;